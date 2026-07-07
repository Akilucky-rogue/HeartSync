"use client"

// AuthContext — the single source of truth for session state.
//
// Exposes the Firebase user, their profile document (users/{uid}), and their
// couple (found by membership query, so pairing updates propagate live to both
// partners). localStorage plays no role in auth anymore.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { collection, doc, limit, onSnapshot, query, setDoc, where } from "firebase/firestore"
import { getFirebase, isFirebaseConfigured } from "@/lib/firebase"

export interface UserProfile {
  displayName?: string
  firstName?: string
  lastName?: string
  email?: string
  coupleId?: string | null
  invitedPartnerEmail?: string | null
  consent?: { version: string; acceptedAt?: unknown }
}

export interface Couple {
  id: string
  members: string[]
  memberNames?: Record<string, string>
  createdAt?: unknown
  relationshipStart?: string | null
}

interface AuthContextValue {
  /** False when NEXT_PUBLIC_FIREBASE_* env vars are missing. */
  configured: boolean
  /** True while the initial auth state is being resolved. */
  loading: boolean
  user: User | null
  profile: UserProfile | null
  couple: Couple | null
  /** True while the couple membership query is resolving. */
  coupleLoading: boolean
}

const AuthContext = createContext<AuthContextValue>({
  configured: false,
  loading: true,
  user: null,
  profile: null,
  couple: null,
  coupleLoading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [couple, setCouple] = useState<Couple | null>(null)
  const [coupleLoading, setCoupleLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      setCoupleLoading(false)
      return
    }
    const { auth } = getFirebase()
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
      if (!u) {
        setProfile(null)
        setCouple(null)
        setCoupleLoading(false)
      }
    })
  }, [])

  useEffect(() => {
    if (!user || !isFirebaseConfigured) return
    const { db } = getFirebase()

    const unsubProfile = onSnapshot(doc(db, "users", user.uid), (snap) => {
      setProfile((snap.data() as UserProfile | undefined) ?? null)
    })

    setCoupleLoading(true)
    const unsubCouple = onSnapshot(
      query(collection(db, "couples"), where("members", "array-contains", user.uid), limit(1)),
      (snap) => {
        const d = snap.docs[0]
        const next = d ? ({ id: d.id, ...(d.data() as Omit<Couple, "id">) } as Couple) : null
        setCouple(next)
        setCoupleLoading(false)
        // Self-heal the denormalized coupleId on our own user doc (the redeem
        // transaction can only write the redeemer's doc under the rules).
        if (next) {
          setDoc(doc(db, "users", user.uid), { coupleId: next.id }, { merge: true }).catch(() => {})
        }
      },
      () => setCoupleLoading(false),
    )

    return () => {
      unsubProfile()
      unsubCouple()
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{ configured: isFirebaseConfigured, loading, user, profile, couple, coupleLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

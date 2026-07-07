// Auth service — sign-up (with consent recording), sign-in, password reset,
// sign-out, and friendly error mapping. All functions are browser-only.

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { getFirebase } from "@/lib/firebase"

/** Bump when Terms/Privacy change materially; users accept this version at signup. */
export const CONSENT_VERSION = "2026-07-06"

export async function registerWithEmail(opts: {
  firstName: string
  lastName: string
  email: string
  password: string
  partnerEmail?: string
}) {
  const { auth, db } = getFirebase()
  const cred = await createUserWithEmailAndPassword(auth, opts.email, opts.password)
  const displayName = `${opts.firstName} ${opts.lastName}`.trim()
  await updateProfile(cred.user, { displayName })
  // Consent gate: record the accepted Terms/Privacy version with a server timestamp.
  await setDoc(doc(db, "users", cred.user.uid), {
    displayName,
    firstName: opts.firstName,
    lastName: opts.lastName,
    email: opts.email,
    invitedPartnerEmail: opts.partnerEmail?.trim() || null,
    coupleId: null,
    consent: { version: CONSENT_VERSION, acceptedAt: serverTimestamp() },
    createdAt: serverTimestamp(),
  })
  return cred.user
}

export async function signInWithEmail(email: string, password: string) {
  const { auth } = getFirebase()
  return signInWithEmailAndPassword(auth, email, password)
}

/**
 * Anti-enumeration by contract: callers must show the same neutral success
 * message whether or not the account exists. This function only throws for
 * genuinely actionable problems (bad email format, network).
 */
export async function requestPasswordReset(email: string) {
  const { auth } = getFirebase()
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: unknown) {
    const code = (error as { code?: string }).code
    if (code === "auth/user-not-found") return // pretend success — don't leak account existence
    throw error
  }
}

export async function signOutUser() {
  const { auth } = getFirebase()
  await firebaseSignOut(auth)
}

export function friendlyAuthError(error: unknown): string {
  const code = (error as { code?: string }).code ?? ""
  switch (code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Incorrect email or password."
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead."
    case "auth/invalid-email":
      return "That doesn't look like a valid email address."
    case "auth/weak-password":
      return "Password is too weak — use at least 6 characters."
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again."
    case "auth/network-request-failed":
      return "Network error — check your connection and try again."
    default:
      return error instanceof Error ? error.message : "Something went wrong. Please try again."
  }
}

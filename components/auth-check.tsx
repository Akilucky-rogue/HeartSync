"use client"

import { useEffect, type ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { useAuth } from "@/context/auth-context"

/**
 * Client-side route guard for /dashboard/*.
 * Gates on the real Firebase session (no user data is ever server-rendered,
 * so a client guard is sufficient — see docs/TECH_SPEC.md §2.2).
 */
export function AuthCheck({ children }: { children: ReactNode }) {
  const { configured, loading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (configured && !loading && !user) {
      router.replace("/login")
    }
  }, [configured, loading, user, router])

  if (!configured) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <Heart className="h-10 w-10 text-rose-500" />
        <h1 className="text-2xl font-bold">HeartSync isn&apos;t connected to Firebase yet</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Accounts and shared data need a Firebase project. Copy <code>.env.example</code> to{" "}
          <code>.env.local</code>, fill in your Firebase web app keys, and restart the dev server.
          The full walkthrough lives in <code>docs/FIREBASE_SETUP.md</code>.
        </p>
        <Link href="/" className="text-sm text-rose-500 hover:underline">
          Back to home
        </Link>
      </div>
    )
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return <>{children}</>
}

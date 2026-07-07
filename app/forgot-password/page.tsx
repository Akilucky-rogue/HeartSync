"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { friendlyAuthError, requestPasswordReset } from "@/services/auth"

const RESEND_COOLDOWN_SECONDS = 30

export default function ForgotPasswordPage() {
  const { configured } = useAuth()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (!configured) {
      toast.error("Firebase isn't configured yet", {
        description: "Add your Firebase web keys to .env.local — see docs/FIREBASE_SETUP.md",
      })
      return
    }

    setIsLoading(true)
    try {
      // Anti-enumeration: the same neutral confirmation is shown whether or
      // not an account exists for this address.
      await requestPasswordReset(email)
      setSentTo(email)
      setCooldown(RESEND_COOLDOWN_SECONDS)
    } catch (error) {
      toast.error("Couldn't send reset email", { description: friendlyAuthError(error) })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold md:left-12 md:top-12">
        <Heart className="h-6 w-6 text-rose-500" />
        <span className="text-xl">HeartSync</span>
      </Link>

      <Card className="mx-auto w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
            <CardDescription>
              {sentTo
                ? "Check your inbox"
                : "Enter your email and we'll send you a link to reset your password."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sentTo ? (
              <p className="text-sm text-muted-foreground">
                If an account exists for <span className="font-medium text-foreground">{sentTo}</span>, a
                reset link is on its way. It can take a minute — check your spam folder too.
              </p>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full bg-rose-500 hover:bg-rose-600"
              type="submit"
              disabled={isLoading || cooldown > 0}
            >
              {isLoading
                ? "Sending..."
                : sentTo
                  ? cooldown > 0
                    ? `Resend link (${cooldown}s)`
                    : "Resend link"
                  : "Send reset link"}
            </Button>
            <div className="text-center text-sm">
              Remembered it?{" "}
              <Link href="/login" className="text-rose-500 hover:underline">
                Back to sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Copy, Heart, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import { createInvite, redeemInvite } from "@/services/invites"

export default function PairPage() {
  const router = useRouter()
  const { configured, loading, user, profile, couple, coupleLoading } = useAuth()

  const [myCode, setMyCode] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [codeInput, setCodeInput] = useState("")
  const [redeeming, setRedeeming] = useState(false)

  // Must be signed in; already-paired users (including the inviter the moment
  // their partner redeems — the couple query is live) go to the dashboard.
  useEffect(() => {
    if (!configured) return
    if (!loading && !user) router.replace("/login")
    if (!coupleLoading && couple) router.replace("/dashboard")
  }, [configured, loading, user, couple, coupleLoading, router])

  const myName = profile?.displayName ?? user?.displayName ?? user?.email ?? "Your partner"

  const handleCreate = async () => {
    if (!user) return
    setCreating(true)
    try {
      const code = await createInvite({ uid: user.uid, name: myName })
      setMyCode(code)
    } catch (error) {
      toast.error("Couldn't create an invite", {
        description: error instanceof Error ? error.message : "Please try again.",
      })
    } finally {
      setCreating(false)
    }
  }

  const handleCopy = async () => {
    if (!myCode) return
    try {
      await navigator.clipboard.writeText(myCode)
      toast.success("Code copied to clipboard")
    } catch {
      toast.error("Couldn't copy automatically", { description: "Select the code and copy it manually." })
    }
  }

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !codeInput.trim()) return
    setRedeeming(true)
    try {
      await redeemInvite(codeInput, { uid: user.uid, name: myName })
      toast.success("You're linked!", { description: "Your shared space is ready." })
      router.push("/dashboard")
    } catch (error) {
      toast.error("Couldn't redeem that code", {
        description: error instanceof Error ? error.message : "Please try again.",
      })
    } finally {
      setRedeeming(false)
    }
  }

  if (!configured) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <Heart className="h-10 w-10 text-rose-500" />
        <p className="max-w-md text-sm text-muted-foreground">
          Pairing needs Firebase. See <code>docs/FIREBASE_SETUP.md</code>.
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 py-12">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold md:left-12 md:top-12">
        <Heart className="h-6 w-6 text-rose-500" />
        <span className="text-xl">HeartSync</span>
      </Link>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Link with your partner</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            HeartSync is a space for two. Share a code — or redeem the one your partner sent you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invite your partner</CardTitle>
            <CardDescription>
              {profile?.invitedPartnerEmail
                ? `Send this code to ${profile.invitedPartnerEmail} — or anyone you'd rather grow old with.`
                : "Generate a code and send it to your partner any way you like."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {myCode ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md border bg-muted px-4 py-3 text-center font-mono text-2xl tracking-[0.3em]">
                    {myCode}
                  </div>
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy code</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  The code stays valid until it's used. This page updates by itself the moment your
                  partner redeems it.
                </p>
              </>
            ) : (
              <Button
                className="w-full bg-rose-500 hover:bg-rose-600"
                onClick={handleCreate}
                disabled={creating}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {creating ? "Generating..." : "Generate invite code"}
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <Card>
          <form onSubmit={handleRedeem}>
            <CardHeader>
              <CardTitle className="text-lg">Have a code?</CardTitle>
              <CardDescription>Enter the 6-character code your partner sent you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="invite-code">Invite code</Label>
                <Input
                  id="invite-code"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  maxLength={6}
                  autoComplete="off"
                  className="text-center font-mono text-lg uppercase tracking-[0.3em]"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="w-full"
                disabled={redeeming || codeInput.trim().length !== 6}
              >
                {redeeming ? "Linking..." : "Link us up"}
              </Button>
            </CardContent>
          </form>
        </Card>

        <div className="text-center">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">
            Skip for now — I'll explore solo
          </Link>
        </div>
      </div>
    </div>
  )
}

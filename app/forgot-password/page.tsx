import type { Metadata } from "next"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Reset Password | HeartSync",
  description: "Reset your HeartSync password.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold md:left-12 md:top-12">
        <Heart className="h-6 w-6 text-rose-500" />
        <span className="text-xl">HeartSync</span>
      </Link>

      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
          <CardDescription>Password reset isn&apos;t available in the preview yet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            HeartSync is currently an early preview: accounts are simulated on this device only, so there&apos;s
            no stored password to reset. Any email and password combination will sign you in. Email-based
            password reset will arrive together with real accounts.
          </p>
          <Button className="w-full bg-rose-500 hover:bg-rose-600" asChild>
            <Link href="/login">Back to sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

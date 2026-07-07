"use client"

import Link from "next/link"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"

/** Shown on the dashboard while the account isn't linked with a partner yet. */
export function PairBanner() {
  const { configured, user, couple, coupleLoading } = useAuth()
  if (!configured || !user || coupleLoading || couple) return null

  return (
    <Card className="mb-8 border-rose-200 bg-rose-50/50">
      <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-medium">Your space is waiting for your partner</p>
          <p className="text-sm text-muted-foreground">
            HeartSync is built for two — send your partner an invite code to start sharing.
          </p>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600" asChild>
          <Link href="/pair">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite your partner
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

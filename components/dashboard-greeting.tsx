"use client"

import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"

export function DashboardGreeting() {
  const { user, profile, couple } = useAuth()

  const fullName = profile?.displayName ?? user?.displayName ?? ""
  const firstName = profile?.firstName ?? (fullName ? fullName.split(" ")[0] : "there")

  const partnerUid = couple && user ? couple.members.find((uid) => uid !== user.uid) : undefined
  const partnerName = partnerUid ? (couple?.memberNames?.[partnerUid] ?? "your partner") : null

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {firstName}</h1>
        <p className="text-muted-foreground mt-1">
          "Love is not about how many days, months, or years you have been together. Love is about how
          much you love each other every single day."
        </p>
      </div>
      {partnerName && (
        <Badge variant="outline" className="bg-rose-50 text-rose-500 border-rose-200">
          <Heart className="mr-1 h-3 w-3 fill-rose-500" /> Together with {partnerName}
        </Badge>
      )}
    </div>
  )
}

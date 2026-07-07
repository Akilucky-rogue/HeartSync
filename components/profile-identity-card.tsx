"use client"

import Link from "next/link"
import { Edit, Heart, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"

export function ProfileIdentityCard() {
  const { user, profile, couple, coupleLoading } = useAuth()

  const displayName = profile?.displayName ?? user?.displayName ?? "—"
  const email = profile?.email ?? user?.email ?? ""
  const initial = displayName.charAt(0).toUpperCase()

  const partnerUid = couple && user ? couple.members.find((uid) => uid !== user.uid) : undefined
  const partnerName = partnerUid ? (couple?.memberNames?.[partnerUid] ?? "Partner") : null

  const memberSince = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—"

  return (
    <Card className="md:col-span-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <Avatar className="mb-4 h-32 w-32">
            <AvatarImage src={user?.photoURL ?? "/placeholder.svg?height=128&width=128"} alt={displayName} />
            <AvatarFallback className="text-4xl">{initial}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{displayName}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
          <Badge variant="outline" className="mt-2 border-rose-200 bg-rose-50 text-rose-500">
            <Heart className="mr-1 h-3 w-3 fill-rose-500" />
            {partnerName ? `Together with ${partnerName}` : "Flying solo (for now)"}
          </Badge>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link href="/dashboard/settings">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Partner</h3>
            {partnerName ? (
              <div className="mt-2 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={partnerName} />
                  <AvatarFallback>{partnerName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="font-medium">{partnerName}</p>
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  {coupleLoading ? "Checking..." : "Not linked yet."}
                </p>
                {!coupleLoading && (
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href="/pair">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite your partner
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Anniversary</h3>
            <p className="mt-1">{couple?.relationshipStart ?? "Not set yet"}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
            <p className="mt-1">{memberSince}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

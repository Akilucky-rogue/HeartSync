"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import { signOutUser } from "@/services/auth"

export function SettingsIdentityCard() {
  const router = useRouter()
  const { user, profile } = useAuth()

  const displayName = profile?.displayName ?? user?.displayName ?? "—"
  const email = profile?.email ?? user?.email ?? ""

  const handleSignOut = async () => {
    try {
      await signOutUser()
      toast.success("Logged out", { description: "You have been successfully logged out." })
      router.push("/")
    } catch {
      toast.error("Couldn't log out", { description: "Please try again." })
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center py-4">
          <Avatar className="mb-4 h-24 w-24">
            <AvatarImage src={user?.photoURL ?? "/placeholder.svg?height=96&width=96"} alt={displayName} />
            <AvatarFallback className="text-2xl">{displayName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{displayName}</h2>
          <p className="break-all text-center text-sm text-muted-foreground">{email}</p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link href="/dashboard/profile">
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Link>
          </Button>
        </div>
        <Separator className="my-4" />
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  )
}

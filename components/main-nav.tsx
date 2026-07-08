"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Heart, Bell, Settings, LogOut } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"
import { signOutUser } from "@/services/auth"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile } = useAuth()

  const displayName = profile?.displayName ?? user?.displayName ?? user?.email ?? "You"

  const handleLogout = async () => {
    try {
      await signOutUser()
      toast.success("Logged out", {
        description: "You have been successfully logged out.",
      })
      router.push("/")
    } catch {
      toast.error("Couldn't log out", { description: "Please try again." })
    }
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/timeline", label: "Timeline" },
    { href: "/dashboard/chat", label: "Chat" },
    { href: "/dashboard/photos", label: "Photos" },
    { href: "/dashboard/goals", label: "Goals" },
    { href: "/dashboard/quests", label: "Love Quests" },
    { href: "/dashboard/calendar", label: "Calendar" },
  ]

  return (
    <>
      <div className="flex items-center gap-2 font-bold">
        <Heart className="h-6 w-6 text-rose-500" />
        <Link href="/dashboard" className="text-xl">
          HeartSync
        </Link>
      </div>
      <nav className="ml-6 hidden lg:flex lg:gap-5 xl:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/settings">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage src={user.photoURL ?? "/placeholder.svg?height=40&width=40"} alt={displayName} />
                  <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{displayName}</span>
                  {user.email && <span className="text-xs font-normal text-muted-foreground">{user.email}</span>}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  )
}

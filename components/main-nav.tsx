"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Heart, Bell, Settings, LogOut } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    // Redirect to home page
    router.push("/")
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 font-bold">
          <Heart className="h-6 w-6 text-rose-500" />
          <Link href="/dashboard" className="text-xl">
            HeartSync
          </Link>
        </div>
        <nav className="ml-6 hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
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
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
      </div>
    </header>
  )
}

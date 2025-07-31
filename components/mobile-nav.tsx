"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Heart, Menu, Home, Clock, MessageSquare, Image, Target, Gift, Calendar, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")

    setOpen(false)

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    // Redirect to home page
    router.push("/")
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/timeline", label: "Timeline", icon: Clock },
    { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
    { href: "/dashboard/photos", label: "Photos", icon: Image },
    { href: "/dashboard/goals", label: "Goals", icon: Target },
    { href: "/dashboard/quests", label: "Love Quests", icon: Gift },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center gap-2 font-bold mb-4">
          <Heart className="h-6 w-6 text-rose-500" />
          <span className="text-xl">HeartSync</span>
        </div>
        <Separator className="mb-4" />
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                  pathname === item.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}

          <Separator className="my-2" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-red-500 hover:bg-red-100 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

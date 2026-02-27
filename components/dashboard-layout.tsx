"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { useAuth } from "@/lib/hooks/use-auth"
import { useAppContext } from "@/lib/context/app-context"
import { useEffect } from "react"
import { useTheme } from "next-themes"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated } = useAuth()
  const { state } = useAppContext()
  const { setTheme } = useTheme()

  // Set theme based on user preferences
  useEffect(() => {
    if (state.settings?.theme) {
      setTheme(state.settings.theme)
    }
  }, [state.settings?.theme, setTheme])

  if (!isAuthenticated) {
    return null // Auth hook will redirect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">{children}</main>
      <footer className="border-t py-4 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HeartSync. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground">Made with ❤️ for couples everywhere</p>
        </div>
      </footer>
    </div>
  )
}

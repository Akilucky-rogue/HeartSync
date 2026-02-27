import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { AuthCheck } from "@/components/auth-check"
import { PageTransition } from "@/components/page-transition"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 py-6">
          <div className="container">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
    </AuthCheck>
  )
}


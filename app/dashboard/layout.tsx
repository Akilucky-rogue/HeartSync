import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { AuthCheck } from "@/components/auth-check"

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
          <div className="container">{children}</div>
        </main>
      </div>
    </AuthCheck>
  )
}

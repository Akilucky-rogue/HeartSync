import type { Metadata } from "next"
import Link from "next/link"
import { Bell, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

export const metadata: Metadata = {
  title: "Notifications | HeartSync",
  description: "Stay updated on your relationship activities",
}

export default function NotificationsPage() {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="ml-2 text-3xl font-bold">Notifications</h1>
      </div>

      <EmptyState
        icon={Bell}
        title="All caught up"
        description="Nothing new right now. Messages, event reminders, and quest updates from your partner will show up here."
      />
    </>
  )
}

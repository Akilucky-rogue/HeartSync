import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

export const metadata: Metadata = {
  title: "Mood Tracker | HeartSync",
  description: "Track and enhance your emotional connection",
}

export default function MoodTrackerPage() {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="ml-2 text-3xl font-bold">Mood Tracker</h1>
      </div>

      <p className="mb-6 text-muted-foreground">Track your emotional journey together</p>

      <EmptyState
        icon={Smile}
        title="No mood check-ins yet"
        description="Daily check-ins from you and your partner will build a shared picture of how you're both doing. Mood logging arrives in the next update."
      />
    </>
  )
}

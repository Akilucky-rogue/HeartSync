import type { Metadata } from "next"
import { Clock, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

export const metadata: Metadata = {
  title: "Timeline | HeartSync",
  description: "Your relationship timeline",
}

export default function TimelinePage() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Our Story Timeline</h1>
          <p className="text-muted-foreground">Relive your most precious moments together</p>
        </div>
        <Button disabled title="Adding memories arrives in the next update">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Memory
        </Button>
      </div>

      <EmptyState
        icon={Clock}
        title="Your story starts here"
        description="Memories, milestones, and special dates you add will build an interactive timeline of your relationship. Adding memories arrives in the next update."
      />
    </>
  )
}

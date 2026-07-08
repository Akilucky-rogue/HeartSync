import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Plus, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

export const metadata: Metadata = {
  title: "Relationship Goals | HeartSync",
  description: "Set and achieve goals together",
}

export default function GoalsPage() {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="ml-2 text-3xl font-bold">Relationship Goals</h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground">Set and achieve meaningful goals together</p>
        <Button disabled title="Creating goals arrives in a coming update">
          <Plus className="mr-2 h-4 w-4" />
          Create New Goal
        </Button>
      </div>

      <EmptyState
        icon={Target}
        title="No goals yet"
        description="Dream something up together — savings targets, skills to learn, places to visit. Creating goals arrives in a coming update."
      />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Heart, Plus, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthGrid } from "@/components/month-grid"

export const metadata: Metadata = {
  title: "Calendar | HeartSync",
  description: "Track important dates and events",
}

export default function CalendarPage() {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="ml-2 text-3xl font-bold">Calendar</h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground">Track important dates and upcoming events</p>
        <Button disabled title="Adding events arrives in the next update">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <MonthGrid />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Special moments to look forward to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-8 text-center">
              <CalendarIcon className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No events yet. Anniversaries, birthdays, and date nights you add will show up here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
            <CardDescription>Never forget these special moments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-8 text-center">
              <Heart className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No important dates yet. Your first date, anniversary, and other milestones will live here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

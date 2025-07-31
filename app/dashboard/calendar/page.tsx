import type { Metadata } from "next"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight, Plus, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Calendar | HeartSync",
  description: "Track important dates and events",
}

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl">HeartSync</span>
          </div>
          <nav className="ml-6 hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground">
              Dashboard
            </Link>
            <Link href="/dashboard/timeline" className="text-sm font-medium text-muted-foreground">
              Timeline
            </Link>
            <Link href="/dashboard/chat" className="text-sm font-medium text-muted-foreground">
              Chat
            </Link>
            <Link href="/dashboard/quests" className="text-sm font-medium text-muted-foreground">
              Love Quests
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold ml-2">Calendar</h1>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground">Track important dates and upcoming events</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>March 2025</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                <div className="text-center text-sm font-medium text-muted-foreground">Sun</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Mon</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Tue</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Wed</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Thu</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Fri</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Sat</div>

                {/* Calendar days */}
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1
                  const hasEvent = [3, 15, 22].includes(day)
                  const isToday = day === 18

                  return (
                    <div key={i} className={`aspect-square p-1 ${isToday ? "bg-rose-100 rounded-md" : ""}`}>
                      <div className="h-full w-full rounded-md p-1">
                        <div className="flex flex-col h-full">
                          <div className={`text-right text-sm ${isToday ? "font-bold text-rose-500" : ""}`}>{day}</div>
                          {hasEvent && (
                            <div className="mt-auto">
                              <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mx-auto"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Special moments to look forward to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                      <CalendarIcon className="h-6 w-6 text-rose-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Anniversary</p>
                        <Badge variant="outline" className="text-xs">
                          23 days
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">April 10, 2025</p>
                      <p className="text-sm text-muted-foreground">Dinner reservation at 7:30 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <CalendarIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Alex's Birthday</p>
                        <Badge variant="outline" className="text-xs">
                          5 days
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">March 23, 2025</p>
                      <p className="text-sm text-muted-foreground">Surprise party at home</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CalendarIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Weekend Getaway</p>
                        <Badge variant="outline" className="text-xs">
                          12 days
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">March 30, 2025</p>
                      <p className="text-sm text-muted-foreground">Cabin in the mountains</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Dates</CardTitle>
                <CardDescription>Never forget these special moments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <Heart className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">First Date</p>
                      <p className="text-sm text-muted-foreground">June 15, 2023</p>
                      <p className="text-sm text-muted-foreground">Coffee shop downtown</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                      <Heart className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Relationship Anniversary</p>
                      <p className="text-sm text-muted-foreground">September 3, 2023</p>
                      <p className="text-sm text-muted-foreground">The day we became official</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                      <Heart className="h-6 w-6 text-pink-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">First Trip Together</p>
                      <p className="text-sm text-muted-foreground">December 10, 2023</p>
                      <p className="text-sm text-muted-foreground">Weekend trip to the beach</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

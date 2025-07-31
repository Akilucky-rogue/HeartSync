import type { Metadata } from "next"
import Link from "next/link"
import { Heart, Calendar, Smile, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Mood Tracker | HeartSync",
  description: "Track and enhance your emotional connection",
}

export default function MoodTrackerPage() {
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
            <h1 className="text-3xl font-bold ml-2">Mood Tracker</h1>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground">Track your emotional journey together</p>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="month">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Mood History</CardTitle>
                  <Badge variant="outline">March 2025</Badge>
                </div>
                <CardDescription>See how your mood has changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="text-xs text-muted-foreground mb-1">{i + 1}</div>
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${getMoodColor(i)}`}>
                          <Smile className="h-6 w-6" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Happy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Calm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-xs">Loved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="text-xs">Tired</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-xs">Stressed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partner's Mood History</CardTitle>
                <CardDescription>See how your partner has been feeling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="text-xs text-muted-foreground mb-1">{i + 1}</div>
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center ${getPartnerMoodColor(i)}`}
                        >
                          <Smile className="h-6 w-6" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Happy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Calm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-xs">Loved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="text-xs">Tired</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-xs">Stressed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Mood Insights</CardTitle>
                <CardDescription>Understanding your emotional patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Mood Patterns</h3>
                    <p className="text-sm text-muted-foreground">
                      You've been feeling mostly happy and calm this month. Your partner has been experiencing more
                      stress than usual. Consider planning a relaxing activity together this weekend.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Connection Opportunities</h3>
                    <p className="text-sm text-muted-foreground">
                      You both felt loved on the same days when you spent quality time together. Try to schedule more
                      date nights or shared activities to strengthen your connection.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Suggested Activities</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-rose-500" />
                        <span>Plan a relaxing weekend getaway</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-rose-500" />
                        <span>Try a new restaurant together</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-rose-500" />
                        <span>Take a couples yoga class</span>
                      </li>
                    </ul>
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

// Helper functions to generate random mood colors for demo
function getMoodColor(day: number) {
  const colors = [
    "bg-yellow-100 text-yellow-500",
    "bg-blue-100 text-blue-500",
    "bg-purple-100 text-purple-500",
    "bg-gray-100 text-gray-500",
    "bg-red-100 text-red-500",
  ]

  // Use a deterministic pattern based on the day
  if (day % 7 === 0 || day % 7 === 1) return colors[0] // Happy
  if (day % 7 === 2 || day % 7 === 3) return colors[1] // Calm
  if (day % 7 === 4) return colors[2] // Loved
  if (day % 7 === 5) return colors[3] // Tired
  return colors[4] // Stressed
}

function getPartnerMoodColor(day: number) {
  const colors = [
    "bg-yellow-100 text-yellow-500",
    "bg-blue-100 text-blue-500",
    "bg-purple-100 text-purple-500",
    "bg-gray-100 text-gray-500",
    "bg-red-100 text-red-500",
  ]

  // Use a different deterministic pattern for partner
  if (day % 7 === 3 || day % 7 === 4) return colors[0] // Happy
  if (day % 7 === 5) return colors[1] // Calm
  if (day % 7 === 6) return colors[2] // Loved
  if (day % 7 === 0) return colors[3] // Tired
  return colors[4] // Stressed
}

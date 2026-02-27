import type { Metadata } from "next"
import Link from "next/link"
import { Heart, ArrowRight, CheckCircle, Circle, Gift, Calendar, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Love Quests | HeartSync",
  description: "Personalized adventures for your relationship",
}

export default function QuestsPage() {
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
            <Link href="/dashboard/quests" className="text-sm font-medium text-primary">
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Love Quests</h1>
              <p className="text-muted-foreground">Personalized adventures to strengthen your bond</p>
            </div>
            <Button>
              <Gift className="mr-2 h-4 w-4" />
              New Quest
            </Button>
          </div>

          <Tabs defaultValue="active" className="mb-6">
            <TabsList>
              <TabsTrigger value="active">Active Quests</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>
                      <p className="text-sm text-muted-foreground">2/5 steps completed</p>
                    </div>
                    <CardTitle className="mt-2">Weekend Surprise</CardTitle>
                    <CardDescription>Plan a surprise activity for your partner</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={40} className="h-2 mb-4" />
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Choose an activity</p>
                          <p className="text-sm text-muted-foreground">Select something your partner would enjoy</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Set a date and time</p>
                          <p className="text-sm text-muted-foreground">Find a time that works for both of you</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Make reservations</p>
                          <p className="text-sm text-muted-foreground">Book the activity or restaurant</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Prepare a small gift</p>
                          <p className="text-sm text-muted-foreground">
                            Something thoughtful to enhance the experience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Surprise your partner</p>
                          <p className="text-sm text-muted-foreground">Enjoy the activity together</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Continue Quest
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Just Started</Badge>
                      <p className="text-sm text-muted-foreground">0/3 steps completed</p>
                    </div>
                    <CardTitle className="mt-2">Memory Lane</CardTitle>
                    <CardDescription>Recreate your first date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={0} className="h-2 mb-4" />
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Plan the recreation</p>
                          <p className="text-sm text-muted-foreground">Think about how to recreate your first date</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Add personal touches</p>
                          <p className="text-sm text-muted-foreground">
                            Include elements that show how far you've come
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Capture the moment</p>
                          <p className="text-sm text-muted-foreground">Take photos to compare with your first date</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Start Quest
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
                      <p className="text-sm text-muted-foreground">January 15, 2025</p>
                    </div>
                    <CardTitle className="mt-2">Love Language Discovery</CardTitle>
                    <CardDescription>Learn and practice each other's love languages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={100} className="h-2 mb-4" />
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Take the love language quiz</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Discuss your results</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Practice each other's love language</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Reflect on the experience</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="suggestions" className="mt-4">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 mb-2">
                      <Calendar className="h-6 w-6 text-rose-500" />
                    </div>
                    <CardTitle>Date Night Challenge</CardTitle>
                    <CardDescription>Plan 5 unique date nights, one for each week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Take turns planning creative date nights that break from your usual routine.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Start This Quest
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-2">
                      <Map className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle>Bucket List Builder</CardTitle>
                    <CardDescription>Create a shared relationship bucket list</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Brainstorm and document experiences you want to share together.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Start This Quest
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-2">
                      <Gift className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle>Appreciation Week</CardTitle>
                    <CardDescription>Show appreciation in different ways for 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Express gratitude and appreciation for your partner in creative ways each day.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Start This Quest
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

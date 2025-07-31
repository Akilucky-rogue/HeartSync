import type { Metadata } from "next"
import Link from "next/link"
import {
  Heart,
  Calendar,
  MessageSquare,
  Image,
  Smile,
  Gift,
  Target,
  Clock,
  ChevronRight,
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FeatureCard } from "@/components/feature-card"

export const metadata: Metadata = {
  title: "Dashboard | HeartSync",
  description: "Your relationship dashboard",
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Jamie</h1>
          <p className="text-muted-foreground mt-1">
            "Love is not about how many days, months, or years you have been together. Love is about how much you love
            each other every single day."
          </p>
        </div>
        <Badge variant="outline" className="bg-rose-50 text-rose-500 border-rose-200">
          <Heart className="mr-1 h-3 w-3 fill-rose-500" /> 2 Years, 3 Months Together
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Special moments to look forward to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                  <Calendar className="h-6 w-6 text-rose-500" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Anniversary</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">In 23 days</p>
                    <Progress value={70} className="h-2 w-20" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Gift className="h-6 w-6 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Alex's Birthday</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">In 5 days</p>
                    <Progress value={90} className="h-2 w-20" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/calendar">
                View All Events
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mood Check-in</CardTitle>
            <CardDescription>How are you feeling today?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 py-2">
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <Smile className="h-6 w-6 text-yellow-500 mb-1" />
                <span className="text-xs">Happy</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <Smile className="h-6 w-6 text-blue-500 mb-1" />
                <span className="text-xs">Calm</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <Smile className="h-6 w-6 text-purple-500 mb-1" />
                <span className="text-xs">Loved</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <Smile className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-xs">Tired</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <Smile className="h-6 w-6 text-red-500 mb-1" />
                <span className="text-xs">Stressed</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/mood-tracker">
                View Mood History
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Stay connected with your partner</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Partner" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Alex</p>
                  <p className="text-sm text-muted-foreground">Can't wait to see you tonight! ❤️</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">You</p>
                  <p className="text-sm text-muted-foreground">Me too! I'm leaving work early today.</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/chat">
                Open Chat
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recent Memories</h2>
          <Button asChild>
            <Link href="/dashboard/photos">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Memory
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Memory"
                className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <p className="text-sm font-medium">Beach Day</p>
            <p className="text-xs text-muted-foreground">2 days ago</p>
          </div>
          <div className="space-y-2">
            <div className="overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Memory"
                className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <p className="text-sm font-medium">Dinner Date</p>
            <p className="text-xs text-muted-foreground">1 week ago</p>
          </div>
          <div className="space-y-2">
            <div className="overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Memory"
                className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <p className="text-sm font-medium">Hiking Trip</p>
            <p className="text-xs text-muted-foreground">2 weeks ago</p>
          </div>
          <div className="space-y-2">
            <div className="overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Memory"
                className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <p className="text-sm font-medium">Movie Night</p>
            <p className="text-xs text-muted-foreground">3 weeks ago</p>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/timeline">
              View All Memories
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">All Features</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="Timeline"
            description="Capture and revisit your most precious moments together"
            icon={Clock}
            href="/dashboard/timeline"
            buttonText="View Timeline"
            iconColor="text-amber-500"
            iconBgColor="bg-amber-100"
          />
          <FeatureCard
            title="Chat"
            description="Stay connected with real-time messaging"
            icon={MessageSquare}
            href="/dashboard/chat"
            buttonText="Open Chat"
            iconColor="text-blue-500"
            iconBgColor="bg-blue-100"
          />
          <FeatureCard
            title="Photo Albums"
            description="Organize and share your favorite memories"
            icon={Image}
            href="/dashboard/photos"
            buttonText="View Albums"
            iconColor="text-green-500"
            iconBgColor="bg-green-100"
          />
          <FeatureCard
            title="Relationship Goals"
            description="Set and achieve meaningful goals together"
            icon={Target}
            href="/dashboard/goals"
            buttonText="View Goals"
            iconColor="text-purple-500"
            iconBgColor="bg-purple-100"
          />
          <FeatureCard
            title="Love Quests"
            description="Embark on adventures designed to strengthen your bond"
            icon={Gift}
            href="/dashboard/quests"
            buttonText="View Quests"
            iconColor="text-rose-500"
            iconBgColor="bg-rose-100"
          />
          <FeatureCard
            title="Calendar"
            description="Keep track of important dates and events"
            icon={Calendar}
            href="/dashboard/calendar"
            buttonText="View Calendar"
            iconColor="text-cyan-500"
            iconBgColor="bg-cyan-100"
          />
        </div>
      </div>
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import {
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
import { EmptyState } from "@/components/empty-state"
import { FeatureCard } from "@/components/feature-card"
import { DashboardGreeting } from "@/components/dashboard-greeting"
import { PairBanner } from "@/components/pair-banner"

export const metadata: Metadata = {
  title: "Dashboard | HeartSync",
  description: "Your relationship dashboard",
}

export default function DashboardPage() {
  return (
    <>
      <DashboardGreeting />

      <PairBanner />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Special moments to look forward to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-6 text-center">
              <Calendar className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No events yet. Anniversaries and special dates you add will count down here.
              </p>
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
            <div className="flex flex-col items-center py-6 text-center">
              <MessageSquare className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No messages yet. Your private conversation will preview here.
              </p>
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
        <EmptyState
          icon={Image}
          title="No memories yet"
          description="Photos and moments you save will appear here — your recent highlights at a glance."
        />
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

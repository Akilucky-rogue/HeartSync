"use client"

import { Input } from "@/components/ui/input"

import { useAppContext } from "@/lib/context/app-context"
import { useAuth } from "@/lib/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FeatureCard } from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import {
  CalendarIcon,
  HeartIcon,
  ImageIcon,
  ListTodoIcon,
  MessageSquareIcon,
  MoonIcon,
  TargetIcon,
  MapPinIcon,
} from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { state } = useAppContext()

  // Protect this route
  useAuth()

  // Calculate stats
  const completedTasks = state.tasks.filter((task) => task.completed).length
  const totalTasks = state.tasks.length
  const upcomingEvents = state.events.filter((event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    const inNextWeek = new Date()
    inNextWeek.setDate(today.getDate() + 7)
    return eventDate >= today && eventDate <= inNextWeek
  }).length

  const latestMood = state.moodEntries[0]?.mood || "neutral"

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {state.user?.name || "Partner"}</h1>
            <p className="text-muted-foreground">Here's what's happening in your relationship</p>
          </div>

          {/* Partner Connection Status */}
          {!state.user?.partner && (
            <Card className="border-pink-200 dark:border-pink-900">
              <CardHeader>
                <CardTitle className="text-pink-600 dark:text-pink-400">Connect with your partner</CardTitle>
                <CardDescription>Invite your partner to join HeartSync</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Input value="https://heartsync.app/invite/ABC123" readOnly className="flex-1" />
                  <Button className="bg-pink-600 hover:bg-pink-700">Copy Invite Link</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <ListTodoIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedTasks}/{totalTasks}
                </div>
                <p className="text-xs text-muted-foreground">
                  {totalTasks > 0
                    ? `${Math.round((completedTasks / totalTasks) * 100)}% completion rate`
                    : "No tasks yet"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingEvents}</div>
                <p className="text-xs text-muted-foreground">
                  {upcomingEvents === 0
                    ? "No upcoming events"
                    : upcomingEvents === 1
                      ? "In the next 7 days"
                      : "In the next 7 days"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Photo Memories</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{state.photos.length}</div>
                <p className="text-xs text-muted-foreground">
                  {state.photos.length === 0 ? "No photos yet" : `Across ${state.albums.length} albums`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Mood</CardTitle>
                <MoonIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{latestMood}</div>
                <p className="text-xs text-muted-foreground">Based on your latest mood entry</p>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <h2 className="text-2xl font-semibold mt-6">Features</h2>
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <FeatureCard
              title="Chat"
              description="Send messages to your partner"
              icon={<MessageSquareIcon className="h-8 w-8" />}
              href="/chat"
              color="bg-blue-500"
            />

            <FeatureCard
              title="Calendar"
              description="Schedule dates and events"
              icon={<CalendarIcon className="h-8 w-8" />}
              href="/calendar"
              color="bg-purple-500"
            />

            <FeatureCard
              title="Photo Albums"
              description="Share and view photos together"
              icon={<ImageIcon className="h-8 w-8" />}
              href="/albums"
              color="bg-green-500"
            />

            <FeatureCard
              title="Relationship Goals"
              description="Set and track goals together"
              icon={<TargetIcon className="h-8 w-8" />}
              href="/goals"
              color="bg-yellow-500"
            />

            <FeatureCard
              title="Shared Tasks"
              description="Manage tasks and to-dos together"
              icon={<ListTodoIcon className="h-8 w-8" />}
              href="/tasks"
              color="bg-red-500"
            />

            <FeatureCard
              title="Date Ideas"
              description="Discover new date ideas"
              icon={<HeartIcon className="h-8 w-8" />}
              href="/date-ideas"
              color="bg-pink-500"
            />

            <FeatureCard
              title="Mood Tracker"
              description="Track your moods and emotions"
              icon={<MoonIcon className="h-8 w-8" />}
              href="/mood"
              color="bg-indigo-500"
            />

            <FeatureCard
              title="Love Quests"
              description="Complete fun challenges together"
              icon={<MapPinIcon className="h-8 w-8" />}
              href="/quests"
              color="bg-orange-500"
            />
          </motion.div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}

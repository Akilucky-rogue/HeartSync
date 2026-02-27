"use client"

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
  Lightbulb,
  CheckSquare,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FeatureCard } from "@/components/feature-card"
import { AnniversaryCountdown } from "@/components/anniversary-countdown"
import { PageTransition } from "@/components/page-transition"

export default function DashboardClientPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <AnniversaryCountdown
          anniversaryDate="2025-04-10"
          title="Anniversary Countdown"
          description="Time until your next special day together"
        />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="h-full">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Mood Check-in</CardTitle>
              <CardDescription>How are you feeling today?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2 py-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" className="flex flex-col items-center p-3 h-auto w-full">
                    <Smile className="h-6 w-6 text-yellow-500 mb-1" />
                    <span className="text-xs">Happy</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" className="flex flex-col items-center p-3 h-auto w-full">
                    <Smile className="h-6 w-6 text-blue-500 mb-1" />
                    <span className="text-xs">Calm</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" className="flex flex-col items-center p-3 h-auto w-full">
                    <Smile className="h-6 w-6 text-purple-500 mb-1" />
                    <span className="text-xs">Loved</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" className="flex flex-col items-center p-3 h-auto w-full">
                    <Smile className="h-6 w-6 text-gray-500 mb-1" />
                    <span className="text-xs">Tired</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" className="flex flex-col items-center p-3 h-auto w-full">
                    <Smile className="h-6 w-6 text-red-500 mb-1" />
                    <span className="text-xs">Stressed</span>
                  </Button>
                </motion.div>
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="h-full">
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recent Memories</h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild>
              <Link href="/dashboard/photos">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Memory
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} className="space-y-2">
              <div className="overflow-hidden rounded-md">
                <motion.img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Memory"
                  className="aspect-square h-auto w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-sm font-medium">
                {i === 1 ? "Beach Day" : i === 2 ? "Dinner Date" : i === 3 ? "Hiking Trip" : "Movie Night"}
              </p>
              <p className="text-xs text-muted-foreground">
                {i === 1 ? "2 days ago" : i === 2 ? "1 week ago" : i === 3 ? "2 weeks ago" : "3 weeks ago"}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" asChild>
              <Link href="/dashboard/timeline">
                View All Memories
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">All Features</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Timeline",
              description: "Capture and revisit your most precious moments together",
              icon: Clock,
              href: "/dashboard/timeline",
              buttonText: "View Timeline",
              iconColor: "text-amber-500",
              iconBgColor: "bg-amber-100",
              delay: 0.1,
            },
            {
              title: "Chat",
              description: "Stay connected with real-time messaging",
              icon: MessageSquare,
              href: "/dashboard/chat",
              buttonText: "Open Chat",
              iconColor: "text-blue-500",
              iconBgColor: "bg-blue-100",
              delay: 0.2,
            },
            {
              title: "Photo Albums",
              description: "Organize and share your favorite memories",
              icon: Image,
              href: "/dashboard/photos",
              buttonText: "View Albums",
              iconColor: "text-green-500",
              iconBgColor: "bg-green-100",
              delay: 0.3,
            },
            {
              title: "Relationship Goals",
              description: "Set and achieve meaningful goals together",
              icon: Target,
              href: "/dashboard/goals",
              buttonText: "View Goals",
              iconColor: "text-purple-500",
              iconBgColor: "bg-purple-100",
              delay: 0.4,
            },
            {
              title: "Love Quests",
              description: "Embark on adventures designed to strengthen your bond",
              icon: Gift,
              href: "/dashboard/quests",
              buttonText: "View Quests",
              iconColor: "text-rose-500",
              iconBgColor: "bg-rose-100",
              delay: 0.5,
            },
            {
              title: "Calendar",
              description: "Keep track of important dates and events",
              icon: Calendar,
              href: "/dashboard/calendar",
              buttonText: "View Calendar",
              iconColor: "text-cyan-500",
              iconBgColor: "bg-cyan-100",
              delay: 0.6,
            },
            {
              title: "Date Ideas",
              description: "Discover new and exciting date ideas for your relationship",
              icon: Lightbulb,
              href: "/dashboard/date-ideas",
              buttonText: "Explore Ideas",
              iconColor: "text-amber-500",
              iconBgColor: "bg-amber-100",
              delay: 0.7,
            },
            {
              title: "Shared Tasks",
              description: "Manage your shared to-do list and keep track of important tasks",
              icon: CheckSquare,
              href: "/dashboard/shared-tasks",
              buttonText: "View Tasks",
              iconColor: "text-blue-500",
              iconBgColor: "bg-blue-100",
              delay: 0.8,
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.5 }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                href={feature.href}
                buttonText={feature.buttonText}
                iconColor={feature.iconColor}
                iconBgColor={feature.iconBgColor}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageTransition>
  )
}


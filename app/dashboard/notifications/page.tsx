import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Heart, Calendar, MessageSquare, Gift, Bell, Settings, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Notifications | HeartSync",
  description: "Stay updated on your relationship activities",
}

export default function NotificationsPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold ml-2">Notifications</h1>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
        </div>

        <TabsContent value="all" className="mt-4">
          <div className="space-y-1">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Partner" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Alex sent you a message</p>
                  <Badge variant="outline" className="ml-2">
                    New
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">"Can't wait to see you tonight! ❤️"</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>10 minutes ago</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                <Calendar className="h-5 w-5 text-rose-500" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Upcoming Anniversary</p>
                <p className="text-sm text-muted-foreground">
                  Your anniversary is in 23 days. Start planning something special!
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>1 hour ago</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Gift className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Quest Progress Update</p>
                <p className="text-sm text-muted-foreground">Alex completed a step in "Weekend Surprise" quest.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Gift className="h-3 w-3" />
                  <span>3 hours ago</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Image className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">New Photos Added</p>
                <p className="text-sm text-muted-foreground">Alex added 5 new photos to "Beach Day" album.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Image className="h-3 w-3" />
                  <span>Yesterday</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Heart className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Relationship Milestone</p>
                <p className="text-sm text-muted-foreground">You've been together for 2 years and 3 months today!</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Heart className="h-3 w-3" />
                  <span>2 days ago</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Settings className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">Account Update</p>
                <p className="text-sm text-muted-foreground">Your profile information was updated successfully.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Settings className="h-3 w-3" />
                  <span>3 days ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          <div className="space-y-1">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Partner" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Alex sent you a message</p>
                  <Badge variant="outline" className="ml-2">
                    New
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">"Can't wait to see you tonight! ❤️"</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>10 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mentions" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No mentions yet</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              When your partner mentions you in a message or comment, you'll see it here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

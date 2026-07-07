import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Camera, Edit, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileIdentityCard } from "@/components/profile-identity-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Profile | HeartSync",
  description: "Your HeartSync profile",
}

export default function ProfilePage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold ml-2">Your Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ProfileIdentityCard />

        <div className="md:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="w-full">
              <TabsTrigger value="activity" className="flex-1">
                Activity
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex-1">
                Photos
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex-1">
                Goals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Heart className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Updated mood to "Happy"</p>
                        <p className="text-sm text-muted-foreground">Today at 9:30 AM</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Camera className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Added 3 photos to "Beach Day" album</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 4:15 PM</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <Edit className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Updated goal progress for "Weekend Getaway"</p>
                        <p className="text-sm text-muted-foreground">March 15, 2025</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Photos</CardTitle>
                  <CardDescription>Photos you've recently added</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="overflow-hidden rounded-md">
                        <img
                          src={`/placeholder.svg?height=150&width=150&text=Photo ${i + 1}`}
                          alt={`Photo ${i + 1}`}
                          className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/photos">View All Photos</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Goals</CardTitle>
                  <CardDescription>Goals you're currently working on</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <Heart className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">Save for a Weekend Getaway</p>
                          <p className="text-xs text-muted-foreground">Financial Goal</p>
                        </div>
                      </div>
                      <Badge>65% Complete</Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                          <Heart className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Learn to Cook Together</p>
                          <p className="text-xs text-muted-foreground">Skill Development</p>
                        </div>
                      </div>
                      <Badge>20% Complete</Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                          <Heart className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <p className="font-medium">Visit 5 New Places Together</p>
                          <p className="text-xs text-muted-foreground">Travel & Adventure</p>
                        </div>
                      </div>
                      <Badge>20% Complete</Badge>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/goals">View All Goals</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

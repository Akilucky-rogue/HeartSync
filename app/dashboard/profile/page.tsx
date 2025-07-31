import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Camera, Edit, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User" />
                  <AvatarFallback className="text-4xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold">Jamie Doe</h2>
              <p className="text-sm text-muted-foreground">jamie.doe@example.com</p>
              <Badge variant="outline" className="mt-2 bg-rose-50 text-rose-500 border-rose-200">
                <Heart className="mr-1 h-3 w-3 fill-rose-500" /> 2 Years, 3 Months Together
              </Badge>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/dashboard/settings">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Partner</h3>
                <div className="flex items-center gap-3 mt-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Partner" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Lee</p>
                    <p className="text-xs text-muted-foreground">alex.lee@example.com</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Anniversary</h3>
                <p className="mt-1">September 3, 2023</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                <p className="mt-1">June 15, 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>

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

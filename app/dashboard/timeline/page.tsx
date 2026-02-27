import type { Metadata } from "next"
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Timeline | HeartSync",
  description: "Your relationship timeline",
}

export default function TimelinePage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Our Story Timeline</h1>
          <p className="text-muted-foreground">Relive your most precious moments together</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Memory
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Memories</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="dates">Special Dates</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="space-y-8">
            <div className="flex items-center justify-center">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Earlier
              </Button>
              <Badge variant="outline" className="mx-4 px-4 py-1.5">
                2025
              </Badge>
              <Button variant="outline" size="sm">
                Later
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="relative border-l border-muted pl-6 ml-4">
              <div className="absolute -left-1.5 top-3 h-3 w-3 rounded-full border border-rose-500 bg-rose-500"></div>
              <div className="mb-10">
                <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">March 12, 2025</time>
                <h3 className="text-lg font-semibold">Weekend Getaway</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Card>
                    <CardContent className="p-0">
                      <img
                        src="/placeholder.svg?height=300&width=500"
                        alt="Weekend Getaway"
                        className="w-full h-auto rounded-t-lg"
                      />
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">
                          Our amazing weekend trip to the mountains. The views were breathtaking!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="absolute -left-1.5 top-[13rem] h-3 w-3 rounded-full border border-rose-500 bg-rose-500"></div>
              <div className="mb-10">
                <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">February 14, 2025</time>
                <h3 className="text-lg font-semibold">Valentine's Day Dinner</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Card>
                    <CardContent className="p-0">
                      <img
                        src="/placeholder.svg?height=300&width=500"
                        alt="Valentine's Day"
                        className="w-full h-auto rounded-t-lg"
                      />
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">
                          Romantic dinner at our favorite restaurant. The food was amazing!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="absolute -left-1.5 top-[23rem] h-3 w-3 rounded-full border border-rose-500 bg-rose-500"></div>
              <div>
                <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">January 1, 2025</time>
                <h3 className="text-lg font-semibold">New Year's Celebration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Card>
                    <CardContent className="p-0">
                      <img
                        src="/placeholder.svg?height=300&width=500"
                        alt="New Year's"
                        className="w-full h-auto rounded-t-lg"
                      />
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">
                          Ringing in the new year together with friends and family. Making resolutions for our
                          relationship.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="photos" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Memory"
                  className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <p className="text-sm font-medium">Weekend Getaway</p>
              <p className="text-xs text-muted-foreground">March 12, 2025</p>
            </div>
            <div className="space-y-2">
              <div className="overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Memory"
                  className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <p className="text-sm font-medium">Valentine's Day</p>
              <p className="text-xs text-muted-foreground">February 14, 2025</p>
            </div>
            <div className="space-y-2">
              <div className="overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Memory"
                  className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <p className="text-sm font-medium">New Year's Eve</p>
              <p className="text-xs text-muted-foreground">January 1, 2025</p>
            </div>
            <div className="space-y-2">
              <div className="overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Memory"
                  className="aspect-square h-auto w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <p className="text-sm font-medium">Christmas Together</p>
              <p className="text-xs text-muted-foreground">December 25, 2024</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="milestones" className="mt-4">
          <div className="relative border-l border-muted pl-6 ml-4">
            <div className="absolute -left-1.5 top-3 h-3 w-3 rounded-full border border-rose-500 bg-rose-500"></div>
            <div className="mb-10">
              <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">June 15, 2023</time>
              <h3 className="text-lg font-semibold">First Date</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Our first date at the coffee shop downtown. We talked for hours!
              </p>
            </div>

            <div className="absolute -left-1.5 top-[8rem] h-3 w-3 rounded-full border border-rose-500 bg-rose-500"></div>
            <div className="mb-10">
              <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">September 3, 2023</time>
              <h3 className="text-lg font-semibold">Became Official</h3>
              <p className="text-sm text-muted-foreground mt-2">
                The day we decided to make our relationship official.
              </p>
            </div>

            <div className="absolute -left-1.5 top-[13rem] h-3 w-3 rounded-full border border-rose-500 bg-rose-500"></div>
            <div>
              <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">December 24, 2023</time>
              <h3 className="text-lg font-semibold">First Holiday Together</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Our first Christmas together. We exchanged gifts and spent time with family.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="dates" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <Calendar className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Anniversary</h3>
                    <p className="text-sm text-muted-foreground">September 3</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  The day we became official. We celebrate this day every year.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Alex's Birthday</h3>
                    <p className="text-sm text-muted-foreground">April 15</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Alex's special day. We usually plan a surprise party or trip.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Calendar className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Jamie's Birthday</h3>
                    <p className="text-sm text-muted-foreground">November 22</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Jamie's birthday celebration. Usually involves cake and friends.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

function Calendar(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


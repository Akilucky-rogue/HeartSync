import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Plus, CheckCircle, Circle, Target, Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Relationship Goals | HeartSync",
  description: "Set and achieve goals together",
}

export default function GoalsPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold ml-2">Relationship Goals</h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">Set and achieve meaningful goals together</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Goal
        </Button>
      </div>

      <Tabs defaultValue="active" className="mb-6">
        <TabsList>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">2 months left</p>
                  </div>
                </div>
                <CardTitle className="mt-2">Save for a Weekend Getaway</CardTitle>
                <CardDescription>Financial Goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>$1,000</span>
                    </div>
                    <span className="font-medium">$650 saved</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium mb-2">Next Steps</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm">Set up a joint savings account</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm">Research destination options</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">Book accommodations</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Update Progress
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Just Started</Badge>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Started 2 weeks ago</p>
                  </div>
                </div>
                <CardTitle className="mt-2">Learn to Cook Together</CardTitle>
                <CardDescription>Skill Development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>Master 10 recipes</span>
                    </div>
                    <span className="font-medium">2 completed</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium mb-2">Next Steps</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm">Take an online cooking class</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm">Create a recipe collection</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">Schedule weekly cooking nights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Update Progress
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Long-term</Badge>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">1 year plan</p>
                  </div>
                </div>
                <CardTitle className="mt-2">Visit 5 New Places Together</CardTitle>
                <CardDescription>Travel & Adventure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>5 destinations</span>
                    </div>
                    <span className="font-medium">1 visited</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium mb-2">Destinations</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm">Beach weekend (March 2025)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">Mountain retreat (Planned for July)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">City exploration (TBD)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Update Progress
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Add Another Goal</h3>
                <p className="text-sm text-muted-foreground mb-4">Create a new goal to work on together</p>
                <Button>Create Goal</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">January 2025</p>
                  </div>
                </div>
                <CardTitle className="mt-2">Start a Weekly Date Night</CardTitle>
                <CardDescription>Relationship Ritual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>8 consecutive weeks</span>
                    </div>
                    <span className="font-medium">Achieved!</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-medium mb-2">Reflection</h4>
                    <p className="text-sm text-muted-foreground">
                      We successfully established our weekly date night routine. It's become something we both look
                      forward to each week and has significantly improved our communication.
                    </p>
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

        <TabsContent value="categories" className="mt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-blue-500"
                  >
                    <path d="M12 6v12" />
                    <path d="M6 12h12" />
                  </svg>
                </div>
                <CardTitle>Financial Goals</CardTitle>
                <CardDescription>Save for your future together</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Set savings targets, plan for big purchases, or create a budget together.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Financial Goals
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-green-500"
                  >
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                    <path d="M12 13v8" />
                    <path d="M6 13v2" />
                    <path d="M18 13v2" />
                  </svg>
                </div>
                <CardTitle>Travel & Adventure</CardTitle>
                <CardDescription>Explore new places together</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Plan trips, create a travel bucket list, or set adventure goals as a couple.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Travel Goals
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-500"
                  >
                    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M12 2v2" />
                    <path d="M12 22v-2" />
                    <path d="m17 20.66-1-1.73" />
                    <path d="M11 10.27 7 3.34" />
                    <path d="m20.66 17-1.73-1" />
                    <path d="m3.34 7 1.73 1" />
                    <path d="M14 12h8" />
                    <path d="M2 12h2" />
                    <path d="m20.66 7-1.73 1" />
                    <path d="m3.34 17 1.73-1" />
                    <path d="m17 3.34-1 1.73" />
                    <path d="m7 20.66 1-1.73" />
                  </svg>
                </div>
                <CardTitle>Personal Growth</CardTitle>
                <CardDescription>Develop new skills together</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn new skills, take classes together, or support each other's personal development.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Growth Goals
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

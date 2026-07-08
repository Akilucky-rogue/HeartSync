import type { Metadata } from "next"
import { Calendar, CheckCircle, Gift, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"

export const metadata: Metadata = {
  title: "Love Quests | HeartSync",
  description: "Personalized adventures for your relationship",
}

// Static quest templates (product content, not user data).
const SUGGESTIONS = [
  {
    icon: Calendar,
    iconClass: "bg-rose-100 text-rose-500",
    title: "Date Night Challenge",
    tagline: "Plan 5 unique date nights, one for each week",
    description: "Take turns planning creative date nights that break from your usual routine.",
  },
  {
    icon: Map,
    iconClass: "bg-blue-100 text-blue-500",
    title: "Bucket List Builder",
    tagline: "Create a shared relationship bucket list",
    description: "Brainstorm and document experiences you want to share together.",
  },
  {
    icon: Gift,
    iconClass: "bg-purple-100 text-purple-500",
    title: "Appreciation Week",
    tagline: "Show appreciation in different ways for 7 days",
    description: "Express gratitude and appreciation for your partner in creative ways each day.",
  },
]

export default function QuestsPage() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Love Quests</h1>
          <p className="text-muted-foreground">Personalized adventures to strengthen your bond</p>
        </div>
      </div>

      <Tabs defaultValue="suggestions" className="mb-6">
        <TabsList>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="active">Active Quests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SUGGESTIONS.map((quest) => {
              const Icon = quest.icon
              return (
                <Card key={quest.title}>
                  <CardHeader>
                    <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${quest.iconClass.split(" ")[0]}`}>
                      <Icon className={`h-6 w-6 ${quest.iconClass.split(" ")[1]}`} />
                    </div>
                    <CardTitle>{quest.title}</CardTitle>
                    <CardDescription>{quest.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{quest.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" disabled title="Starting quests arrives in a coming update">
                      Start This Quest
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <EmptyState
            icon={Gift}
            title="No active quests"
            description="Pick a suggestion to start your first quest together. Starting quests arrives in a coming update."
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <EmptyState
            icon={CheckCircle}
            title="Nothing completed yet"
            description="Quests you finish together will be celebrated here."
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { Activity, Camera, ChevronLeft, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { ProfileIdentityCard } from "@/components/profile-identity-card"

export const metadata: Metadata = {
  title: "Profile | HeartSync",
  description: "Your HeartSync profile",
}

export default function ProfilePage() {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="ml-2 text-3xl font-bold">Your Profile</h1>
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
              <EmptyState
                icon={Activity}
                title="No activity yet"
                description="Mood check-ins, new memories, and goal progress will appear here as you use HeartSync."
              />
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <EmptyState
                icon={Camera}
                title="No photos yet"
                description="Photos you add will show up here. Uploads arrive in a coming update."
              />
            </TabsContent>

            <TabsContent value="goals" className="mt-6">
              <EmptyState
                icon={Target}
                title="No goals yet"
                description="Goals you're working on together will appear here."
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

"use client"

import { useAppContext } from "@/lib/context/app-context"
import { useAuth } from "@/lib/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const { state, updateSettings } = useAppContext()
  const { toast } = useToast()

  // Protect this route
  useAuth()

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    updateSettings({ theme })

    toast({
      title: "Theme updated",
      description: `Theme set to ${theme}`,
    })
  }

  const handleNotificationToggle = (key: keyof typeof state.settings.notifications, value: boolean) => {
    updateSettings({
      notifications: {
        ...state.settings.notifications,
        [key]: value,
      },
    })

    toast({
      title: "Notification settings updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${value ? "enabled" : "disabled"}`,
    })
  }

  const handlePrivacyToggle = (key: keyof typeof state.settings.privacy, value: boolean) => {
    updateSettings({
      privacy: {
        ...state.settings.privacy,
        [key]: value,
      },
    })

    toast({
      title: "Privacy settings updated",
      description: `Setting updated successfully`,
    })
  }

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="mt-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how HeartSync looks on your device</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Light Theme</Label>
                          <p className="text-sm text-muted-foreground">Use light mode</p>
                        </div>
                        <Button
                          variant={state.settings.theme === "light" ? "default" : "outline"}
                          onClick={() => handleThemeChange("light")}
                          className={state.settings.theme === "light" ? "bg-pink-600 hover:bg-pink-700" : ""}
                        >
                          {state.settings.theme === "light" ? "Active" : "Activate"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dark Theme</Label>
                          <p className="text-sm text-muted-foreground">Use dark mode</p>
                        </div>
                        <Button
                          variant={state.settings.theme === "dark" ? "default" : "outline"}
                          onClick={() => handleThemeChange("dark")}
                          className={state.settings.theme === "dark" ? "bg-pink-600 hover:bg-pink-700" : ""}
                        >
                          {state.settings.theme === "dark" ? "Active" : "Activate"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>System Theme</Label>
                          <p className="text-sm text-muted-foreground">Match your system theme</p>
                        </div>
                        <Button
                          variant={state.settings.theme === "system" ? "default" : "outline"}
                          onClick={() => handleThemeChange("system")}
                          className={state.settings.theme === "system" ? "bg-pink-600 hover:bg-pink-700" : ""}
                        >
                          {state.settings.theme === "system" ? "Active" : "Activate"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={state.settings.notifications.email}
                          onCheckedChange={(checked) => handleNotificationToggle("email", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={state.settings.notifications.push}
                          onCheckedChange={(checked) => handleNotificationToggle("push", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reminder-notifications">Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive reminders for upcoming events and tasks
                          </p>
                        </div>
                        <Switch
                          id="reminder-notifications"
                          checked={state.settings.notifications.reminders}
                          onCheckedChange={(checked) => handleNotificationToggle("reminders", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="privacy" className="mt-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy</CardTitle>
                    <CardDescription>Manage your privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-mood">Share Mood</Label>
                          <p className="text-sm text-muted-foreground">Allow your partner to see your mood entries</p>
                        </div>
                        <Switch
                          id="show-mood"
                          checked={state.settings.privacy.showMoodToPartner}
                          onCheckedChange={(checked) => handlePrivacyToggle("showMoodToPartner", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="share-calendar">Share Calendar</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically share calendar events with your partner
                          </p>
                        </div>
                        <Switch
                          id="share-calendar"
                          checked={state.settings.privacy.shareCalendarWithPartner}
                          onCheckedChange={(checked) => handlePrivacyToggle("shareCalendarWithPartner", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-share-photos">Auto-Share Photos</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically share new photos with your partner
                          </p>
                        </div>
                        <Switch
                          id="auto-share-photos"
                          checked={state.settings.privacy.autoSharePhotos}
                          onCheckedChange={(checked) => handlePrivacyToggle("autoSharePhotos", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          <Card className="mt-6 border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions that affect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}


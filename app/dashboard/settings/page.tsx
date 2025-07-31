import type { Metadata } from "next"
import Link from "next/link"
import { Heart, ChevronLeft, User, Bell, Lock, Palette, Globe, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Settings | HeartSync",
  description: "Customize your HeartSync experience",
}

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl">HeartSync</span>
          </div>
          <nav className="ml-6 hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground">
              Dashboard
            </Link>
            <Link href="/dashboard/timeline" className="text-sm font-medium text-muted-foreground">
              Timeline
            </Link>
            <Link href="/dashboard/chat" className="text-sm font-medium text-muted-foreground">
              Chat
            </Link>
            <Link href="/dashboard/photos" className="text-sm font-medium text-muted-foreground">
              Photos
            </Link>
            <Link href="/dashboard/goals" className="text-sm font-medium text-muted-foreground">
              Goals
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold ml-2">Settings</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center py-4">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">Jamie Doe</h2>
                    <p className="text-sm text-muted-foreground">jamie.doe@example.com</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Edit Profile
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <nav className="flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="#account" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="#notifications" className="flex items-center">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="#privacy" className="flex items-center">
                        <Lock className="mr-2 h-4 w-4" />
                        Privacy & Security
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="#appearance" className="flex items-center">
                        <Palette className="mr-2 h-4 w-4" />
                        Appearance
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="#language" className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Language
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start text-red-500 hover:text-red-600 hover:bg-red-100">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="privacy">Privacy</TabsTrigger>
                      <TabsTrigger value="appearance">Appearance</TabsTrigger>
                      <TabsTrigger value="language">Language</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="mt-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Personal Information</h3>
                          <p className="text-sm text-muted-foreground">
                            Update your personal details and contact information.
                          </p>
                        </div>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name">First name</Label>
                              <Input id="first-name" placeholder="Jamie" defaultValue="Jamie" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last-name">Last name</Label>
                              <Input id="last-name" placeholder="Doe" defaultValue="Doe" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="jamie.doe@example.com"
                              defaultValue="jamie.doe@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="birthday">Birthday</Label>
                            <Input id="birthday" type="date" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Save Changes</Button>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Relationship Information</h3>
                          <p className="text-sm text-muted-foreground">Update details about your relationship.</p>
                        </div>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="partner-email">Partner's Email</Label>
                            <Input
                              id="partner-email"
                              type="email"
                              placeholder="alex@example.com"
                              defaultValue="alex@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="anniversary">Anniversary Date</Label>
                            <Input id="anniversary" type="date" defaultValue="2023-09-03" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Save Changes</Button>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Change Password</h3>
                          <p className="text-sm text-muted-foreground">
                            Update your password to keep your account secure.
                          </p>
                        </div>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current password</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Update Password</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="mt-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Notification Preferences</h3>
                          <p className="text-sm text-muted-foreground">Choose how and when you want to be notified.</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="message-notifications">Message Notifications</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive notifications when your partner sends you a message.
                              </p>
                            </div>
                            <Switch id="message-notifications" defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="mood-reminders">Mood Check-in Reminders</Label>
                              <p className="text-sm text-muted-foreground">Get daily reminders to update your mood.</p>
                            </div>
                            <Switch id="mood-reminders" defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="event-reminders">Event Reminders</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive reminders about upcoming events and anniversaries.
                              </p>
                            </div>
                            <Switch id="event-reminders" defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="quest-updates">Quest Updates</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified when your partner completes a quest step.
                              </p>
                            </div>
                            <Switch id="quest-updates" defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="email-notifications">Email Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive important updates via email.</p>
                            </div>
                            <Switch id="email-notifications" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Save Preferences</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="privacy" className="mt-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Privacy Settings</h3>
                          <p className="text-sm text-muted-foreground">
                            Control your privacy and security preferences.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                              <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account.
                              </p>
                            </div>
                            <Switch id="two-factor" />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="data-sharing">Data Sharing</Label>
                              <p className="text-sm text-muted-foreground">
                                Allow HeartSync to use your data to improve the service.
                              </p>
                            </div>
                            <Switch id="data-sharing" defaultChecked />
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label htmlFor="session-management">Session Management</Label>
                            <p className="text-sm text-muted-foreground">
                              Manage your active sessions and sign out from other devices.
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Manage Sessions
                            </Button>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label htmlFor="data-export">Download Your Data</Label>
                            <p className="text-sm text-muted-foreground">Export all your data in a portable format.</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Request Data Export
                            </Button>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label htmlFor="account-deletion" className="text-red-500">
                              Delete Account
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete your account and all associated data.
                            </p>
                            <Button variant="destructive" size="sm" className="mt-2">
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="appearance" className="mt-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Appearance Settings</h3>
                          <p className="text-sm text-muted-foreground">Customize how HeartSync looks and feels.</p>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Theme</Label>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="flex flex-col items-center gap-2">
                                <div className="border rounded-md p-2 w-full aspect-video bg-white"></div>
                                <Label className="text-sm">Light</Label>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div className="border rounded-md p-2 w-full aspect-video bg-slate-950"></div>
                                <Label className="text-sm">Dark</Label>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div className="border rounded-md p-2 w-full aspect-video bg-gradient-to-r from-white to-slate-950"></div>
                                <Label className="text-sm">System</Label>
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label>Accent Color</Label>
                            <div className="grid grid-cols-5 gap-4">
                              <div className="flex flex-col items-center gap-2">
                                <div className="border rounded-full p-2 w-8 h-8 bg-rose-500"></div>
                                <Label className="text-xs">Rose</Label>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div className="border rounded-full p-2 w-8 h-8 bg-blue-500"></div>
                                <Label className="text-xs">Blue</Label>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div className="border rounded-full p-2 w-8 h-8 bg-green-500"></div>
                                <Label className="text-xs">Green</Label>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div className="border rounded-full p-2 w-8 h-8 bg-purple-500"></div>
                                <Label className="text-xs">Purple</Label>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div className="border rounded-full p-2 w-8 h-8 bg-amber-500"></div>
                                <Label className="text-xs">Amber</Label>
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label>Font Size</Label>
                            <Select defaultValue="medium">
                              <SelectTrigger>
                                <SelectValue placeholder="Select font size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Save Preferences</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="language" className="mt-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Language Settings</h3>
                          <p className="text-sm text-muted-foreground">
                            Choose your preferred language and regional settings.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="language">Application Language</Label>
                            <Select defaultValue="en-US">
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en-US">English (United States)</SelectItem>
                                <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                                <SelectItem value="ja">Japanese</SelectItem>
                                <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label htmlFor="date-format">Date Format</Label>
                            <Select defaultValue="MM/DD/YYYY">
                              <SelectTrigger>
                                <SelectValue placeholder="Select date format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label htmlFor="time-format">Time Format</Label>
                            <Select defaultValue="12h">
                              <SelectTrigger>
                                <SelectValue placeholder="Select time format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                                <SelectItem value="24h">24-hour</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label htmlFor="first-day">First Day of Week</Label>
                            <Select defaultValue="sunday">
                              <SelectTrigger>
                                <SelectValue placeholder="Select first day" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sunday">Sunday</SelectItem>
                                <SelectItem value="monday">Monday</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Save Preferences</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, User, Bell, Lock, Palette, Globe, LogOut, Check, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { PageTransition } from "@/components/page-transition"

export default function SettingsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // User profile state
  const [profile, setProfile] = useState({
    firstName: "Jamie",
    lastName: "Doe",
    email: "jamie.doe@example.com",
    phone: "+1 (555) 123-4567",
    birthday: "1990-05-15",
    partnerEmail: "alex@example.com",
    anniversary: "2023-09-03",
  })

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    messages: true,
    moodReminders: true,
    eventReminders: true,
    questUpdates: true,
    emailNotifications: false,
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    twoFactor: false,
    dataSharing: true,
  })

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "light",
    accentColor: "rose",
    fontSize: "medium",
  })

  // Language settings
  const [language, setLanguage] = useState({
    appLanguage: "en-US",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    firstDay: "sunday",
  })

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile")
    const savedNotifications = localStorage.getItem("notifications")
    const savedPrivacy = localStorage.getItem("privacy")
    const savedAppearance = localStorage.getItem("appearance")
    const savedLanguage = localStorage.getItem("language")

    if (savedProfile) setProfile(JSON.parse(savedProfile))
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
    if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy))
    if (savedAppearance) {
      const parsedAppearance = JSON.parse(savedAppearance)
      setAppearance(parsedAppearance)
      setTheme(parsedAppearance.theme)
    }
    if (savedLanguage) setLanguage(JSON.parse(savedLanguage))
  }, [setTheme])

  // Handle profile update
  const handleProfileUpdate = () => {
    localStorage.setItem("profile", JSON.stringify(profile))

    // Update user data in localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      user.name = `${profile.firstName} ${profile.lastName}`
      user.email = profile.email
      localStorage.setItem("user", JSON.stringify(user))
    }

    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    })
  }

  // Handle password update
  const handlePasswordUpdate = () => {
    // Validate passwords
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      })
      return
    }

    if (passwords.new.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call an API to update the password
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })

    // Reset password fields
    setPasswords({
      current: "",
      new: "",
      confirm: "",
    })
  }

  // Handle notification preferences update
  const handleNotificationsUpdate = () => {
    localStorage.setItem("notifications", JSON.stringify(notifications))

    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    })
  }

  // Handle privacy settings update
  const handlePrivacyUpdate = () => {
    localStorage.setItem("privacy", JSON.stringify(privacy))

    toast({
      title: "Privacy settings saved",
      description: "Your privacy settings have been updated.",
    })
  }

  // Handle appearance settings update
  const handleAppearanceUpdate = () => {
    localStorage.setItem("appearance", JSON.stringify(appearance))
    setTheme(appearance.theme)

    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated.",
    })
  }

  // Handle language settings update
  const handleLanguageUpdate = () => {
    localStorage.setItem("language", JSON.stringify(language))

    toast({
      title: "Language settings saved",
      description: "Your language settings have been updated.",
    })
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    router.push("/login")
  }

  return (
    <PageTransition>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold ml-2">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          className="md:w-1/4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center py-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback className="text-2xl">
                      {profile.firstName.charAt(0)}
                      {profile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <h2 className="text-xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="mt-4">
                    Edit Profile
                  </Button>
                </motion.div>
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
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-500 hover:text-red-600 hover:bg-red-100 w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </motion.div>
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="md:w-3/4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
                          <Input
                            id="first-name"
                            placeholder="Jamie"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input
                            id="last-name"
                            placeholder="Doe"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jamie.doe@example.com"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthday">Birthday</Label>
                        <Input
                          id="birthday"
                          type="date"
                          value={profile.birthday}
                          onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleProfileUpdate}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </motion.div>
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
                          value={profile.partnerEmail}
                          onChange={(e) => setProfile({ ...profile, partnerEmail: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="anniversary">Anniversary Date</Label>
                        <Input
                          id="anniversary"
                          type="date"
                          value={profile.anniversary}
                          onChange={(e) => setProfile({ ...profile, anniversary: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleProfileUpdate}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </motion.div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <p className="text-sm text-muted-foreground">Update your password to keep your account secure.</p>
                    </div>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handlePasswordUpdate}>
                          <Lock className="mr-2 h-4 w-4" />
                          Update Password
                        </Button>
                      </motion.div>
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
                        <Switch
                          id="message-notifications"
                          checked={notifications.messages}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mood-reminders">Mood Check-in Reminders</Label>
                          <p className="text-sm text-muted-foreground">Get daily reminders to update your mood.</p>
                        </div>
                        <Switch
                          id="mood-reminders"
                          checked={notifications.moodReminders}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, moodReminders: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="event-reminders">Event Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive reminders about upcoming events and anniversaries.
                          </p>
                        </div>
                        <Switch
                          id="event-reminders"
                          checked={notifications.eventReminders}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, eventReminders: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="quest-updates">Quest Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when your partner completes a quest step.
                          </p>
                        </div>
                        <Switch
                          id="quest-updates"
                          checked={notifications.questUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, questUpdates: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive important updates via email.</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, emailNotifications: checked })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleNotificationsUpdate}>
                          <Bell className="mr-2 h-4 w-4" />
                          Save Preferences
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="privacy" className="mt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Privacy Settings</h3>
                      <p className="text-sm text-muted-foreground">Control your privacy and security preferences.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                          </p>
                        </div>
                        <Switch
                          id="two-factor"
                          checked={privacy.twoFactor}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, twoFactor: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-sharing">Data Sharing</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow HeartSync to use your data to improve the service.
                          </p>
                        </div>
                        <Switch
                          id="data-sharing"
                          checked={privacy.dataSharing}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, dataSharing: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label htmlFor="session-management">Session Management</Label>
                        <p className="text-sm text-muted-foreground">
                          Manage your active sessions and sign out from other devices.
                        </p>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                          <Button variant="outline" size="sm" className="mt-2">
                            Manage Sessions
                          </Button>
                        </motion.div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label htmlFor="data-export">Download Your Data</Label>
                        <p className="text-sm text-muted-foreground">Export all your data in a portable format.</p>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                          <Button variant="outline" size="sm" className="mt-2">
                            Request Data Export
                          </Button>
                        </motion.div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label htmlFor="account-deletion" className="text-red-500">
                          Delete Account
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data.
                        </p>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                          <Button variant="destructive" size="sm" className="mt-2">
                            Delete Account
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handlePrivacyUpdate}>
                          <Lock className="mr-2 h-4 w-4" />
                          Save Settings
                        </Button>
                      </motion.div>
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
                          <motion.div
                            className={`flex flex-col items-center gap-2 cursor-pointer ${appearance.theme === "light" ? "ring-2 ring-primary rounded-md" : ""}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAppearance({ ...appearance, theme: "light" })}
                          >
                            <div className="border rounded-md p-2 w-full aspect-video bg-white relative">
                              {appearance.theme === "light" && (
                                <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                                  <Check className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                            <Label className="text-sm">Light</Label>
                          </motion.div>
                          <motion.div
                            className={`flex flex-col items-center gap-2 cursor-pointer ${appearance.theme === "dark" ? "ring-2 ring-primary rounded-md" : ""}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAppearance({ ...appearance, theme: "dark" })}
                          >
                            <div className="border rounded-md p-2 w-full aspect-video bg-slate-950 relative">
                              {appearance.theme === "dark" && (
                                <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                                  <Check className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                            <Label className="text-sm">Dark</Label>
                          </motion.div>
                          <motion.div
                            className={`flex flex-col items-center gap-2 cursor-pointer ${appearance.theme === "system" ? "ring-2 ring-primary rounded-md" : ""}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAppearance({ ...appearance, theme: "system" })}
                          >
                            <div className="border rounded-md p-2 w-full aspect-video bg-gradient-to-r from-white to-slate-950 relative">
                              {appearance.theme === "system" && (
                                <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                                  <Check className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                            <Label className="text-sm">System</Label>
                          </motion.div>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Accent Color</Label>
                        <div className="grid grid-cols-5 gap-4">
                          {[
                            { name: "Rose", value: "rose", color: "bg-rose-500" },
                            { name: "Blue", value: "blue", color: "bg-blue-500" },
                            { name: "Green", value: "green", color: "bg-green-500" },
                            { name: "Purple", value: "purple", color: "bg-purple-500" },
                            { name: "Amber", value: "amber", color: "bg-amber-500" },
                          ].map((color) => (
                            <motion.div
                              key={color.value}
                              className={`flex flex-col items-center gap-2 cursor-pointer ${appearance.accentColor === color.value ? "scale-110" : ""}`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setAppearance({ ...appearance, accentColor: color.value })}
                            >
                              <div className={`border rounded-full p-2 w-8 h-8 ${color.color} relative`}>
                                {appearance.accentColor === color.value && (
                                  <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <Check className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                              <Label className="text-xs">{color.name}</Label>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Select
                          value={appearance.fontSize}
                          onValueChange={(value) => setAppearance({ ...appearance, fontSize: value })}
                        >
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
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleAppearanceUpdate}>
                          <Palette className="mr-2 h-4 w-4" />
                          Save Preferences
                        </Button>
                      </motion.div>
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
                        <Select
                          value={language.appLanguage}
                          onValueChange={(value) => setLanguage({ ...language, appLanguage: value })}
                        >
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
                        <Select
                          value={language.dateFormat}
                          onValueChange={(value) => setLanguage({ ...language, dateFormat: value })}
                        >
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
                        <Select
                          value={language.timeFormat}
                          onValueChange={(value) => setLanguage({ ...language, timeFormat: value })}
                        >
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
                        <Select
                          value={language.firstDay}
                          onValueChange={(value) => setLanguage({ ...language, firstDay: value })}
                        >
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
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleLanguageUpdate}>
                          <Globe className="mr-2 h-4 w-4" />
                          Save Preferences
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}

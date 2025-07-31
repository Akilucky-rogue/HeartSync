"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    partnerEmail: "",
    terms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to register
      // For demo purposes, we'll just simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if required fields are filled
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        throw new Error("Please fill in all required fields")
      }

      // Check if terms are accepted
      if (!formData.terms) {
        throw new Error("You must accept the Terms of Service and Privacy Policy")
      }

      // For demo purposes, create a user account
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          avatar: "/placeholder.svg?height=40&width=40",
        }),
      )

      toast({
        title: "Registration successful",
        description: "Welcome to HeartSync! Your account has been created.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your information and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold md:left-12 md:top-12">
        <Heart className="h-6 w-6 text-rose-500" />
        <span className="text-xl">HeartSync</span>
      </Link>

      <Card className="mx-auto max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Enter your information to create your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="firstName"
                  placeholder="Jamie"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-email">Partner's Email (Optional)</Label>
              <Input
                id="partner-email"
                name="partnerEmail"
                type="email"
                placeholder="partner.email@example.com"
                value={formData.partnerEmail}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                We'll send an invitation to your partner to join your relationship space.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={formData.terms} onCheckedChange={handleCheckboxChange} required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-rose-500 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-rose-500 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-rose-500 hover:bg-rose-600" type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-rose-500 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

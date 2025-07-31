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
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll just simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email and password are filled
      if (!formData.email || !formData.password) {
        throw new Error("Please enter both email and password")
      }

      // For demo purposes, accept any email/password
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Jamie Doe",
          email: formData.email,
          avatar: "/placeholder.svg?height=40&width=40",
        }),
      )

      toast({
        title: "Login successful",
        description: "Welcome back to HeartSync!",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
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
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to sign in to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-rose-500 hover:bg-rose-600" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-rose-500 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

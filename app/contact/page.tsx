import type { Metadata } from "next"
import Link from "next/link"
import { Heart, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact | HeartSync",
  description: "Get in touch with the HeartSync team.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold md:left-12 md:top-12">
        <Heart className="h-6 w-6 text-rose-500" />
        <span className="text-xl">HeartSync</span>
      </Link>

      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Contact us</CardTitle>
          <CardDescription>
            HeartSync is an independent project. For questions, feedback, or privacy requests, email us and
            we&apos;ll get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-rose-500 hover:bg-rose-600" asChild>
            <a href="mailto:akshatbvora@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              akshatbvora@gmail.com
            </a>
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/" className="text-rose-500 hover:underline">
              Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

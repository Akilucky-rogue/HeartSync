import Link from "next/link"
import { ArrowRight, Heart, MessageSquare, Calendar, Image, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl">HeartSync</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Celebrate Your Love Story
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A personalized space for you and your partner to connect, share memories, and make everyday moments
                    special.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline">
                      Explore Features
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px]">
                  <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100 sm:h-[400px] sm:w-[400px]"></div>
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="App Preview"
                    className="absolute left-1/2 top-1/2 h-[320px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg sm:h-[420px] sm:w-[230px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to nurture and celebrate your relationship
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5 text-rose-500" />
                    Our Story Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Capture and revisit your most precious moments together in an interactive timeline.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-rose-500" />
                    Private Couple's Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Stay connected with real-time messaging, rich media sharing, and personalized chat themes.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-rose-500" />
                    Milestone Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Never miss an important date with anniversary countdowns and special event reminders.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    Love Language Enhancer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Discover and nurture your love languages with personalized activities and suggestions.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Smile className="h-5 w-5 text-rose-500" />
                    Mood Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track moods and receive personalized content to enhance your emotional connection.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-rose-500" />
                    Personalized Love Quests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Embark on customizable adventures designed to strengthen your bond and create new memories.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Your Journey Today
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your shared digital space and begin writing your love story together.
                </p>
              </div>
              <Link href="/register">
                <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                  Create Your Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            <p className="text-sm text-muted-foreground">© 2025 HeartSync. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

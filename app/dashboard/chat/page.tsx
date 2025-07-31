import type { Metadata } from "next"
import Link from "next/link"
import { Heart, Send, Image, Smile, Paperclip, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Chat | HeartSync",
  description: "Private couple's chat",
}

export default function ChatPage() {
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
            <Link href="/dashboard/chat" className="text-sm font-medium text-primary">
              Chat
            </Link>
            <Link href="/dashboard/quests" className="text-sm font-medium text-muted-foreground">
              Love Quests
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
      <main className="flex-1 flex flex-col">
        <div className="border-b bg-background p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Partner" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">Alex</h2>
              <p className="text-xs text-muted-foreground">Online now</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Partner" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">Good morning! How did you sleep?</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">8:30 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-[80%] ml-auto flex-row-reverse">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-lg bg-rose-100 p-3">
                  <p className="text-sm">Good morning! I slept really well, thanks for asking. How about you?</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">8:32 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Partner" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">Not too bad! I'm excited for our dinner plans tonight.</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">8:35 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Partner" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">I made a reservation at that new Italian place you wanted to try.</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">8:36 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-[80%] ml-auto flex-row-reverse">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-lg bg-rose-100 p-3">
                  <p className="text-sm">That's amazing! I can't wait. What time is the reservation?</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">8:40 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Partner" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">7:30 PM. I'll pick you up from work?</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">8:42 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-[80%] ml-auto flex-row-reverse">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-lg bg-rose-100 p-3">
                  <p className="text-sm">Perfect! I'll be ready. Can't wait to see you! ❤️</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">8:45 AM</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t bg-background p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Image className="h-5 w-5" />
            </Button>
            <Input placeholder="Type a message..." className="flex-1" />
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
            <Button size="icon" className="bg-rose-500 hover:bg-rose-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

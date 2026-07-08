"use client"

import Link from "next/link"
import { ChevronLeft, MessageSquare, Send, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"

export default function ChatPage() {
  const { user, couple, coupleLoading } = useAuth()

  const partnerUid = couple && user ? couple.members.find((uid) => uid !== user.uid) : undefined
  const partnerName = partnerUid ? (couple?.memberNames?.[partnerUid] ?? "Partner") : null

  return (
    <div className="flex h-[calc(100dvh-8.5rem)] min-h-[420px] flex-col overflow-hidden rounded-lg border bg-background">
      <div className="border-b bg-background p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          {partnerName ? (
            <>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={partnerName} />
                <AvatarFallback>{partnerName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">{partnerName}</h2>
              </div>
            </>
          ) : (
            <h2 className="font-medium">Chat</h2>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        {coupleLoading ? (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        ) : partnerName ? (
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
              <MessageSquare className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="font-medium">No messages yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Your private conversation with {partnerName} will live here. Real-time messaging arrives in
              a coming update.
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
              <UserPlus className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="font-medium">No partner linked yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Chat is a private space for the two of you — link with your partner to open it up.
            </p>
            <Button className="mt-4 bg-rose-500 hover:bg-rose-600" asChild>
              <Link href="/pair">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite your partner
              </Link>
            </Button>
          </>
        )}
      </div>

      <div className="border-t bg-background p-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Type a message..." className="flex-1" disabled />
          <Button size="icon" className="bg-rose-500 hover:bg-rose-600" disabled title="Messaging arrives in a coming update">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

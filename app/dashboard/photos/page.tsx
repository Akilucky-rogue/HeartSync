import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

export const metadata: Metadata = {
  title: "Photo Albums | HeartSync",
  description: "Share and cherish your memories together",
}

export default function PhotosPage() {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="ml-2 text-3xl font-bold">Photo Albums</h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground">Share and cherish your memories together</p>
        <Button disabled title="Photo uploads arrive in a coming update">
          <Upload className="mr-2 h-4 w-4" />
          Upload Photos
        </Button>
      </div>

      <EmptyState
        icon={ImageIcon}
        title="No photos yet"
        description="Albums and photos you and your partner add will live here. Uploads arrive in a coming update."
      />
    </>
  )
}

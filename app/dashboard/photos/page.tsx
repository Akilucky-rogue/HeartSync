import type { Metadata } from "next"
import Link from "next/link"
import { Upload, Grid, List, Filter, ChevronLeft, Plus, ImageIcon, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Photo Albums | HeartSync",
  description: "Share and cherish your memories together",
}

export default function PhotosPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold ml-2">Photo Albums</h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">Share and cherish your memories together</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search photos..." className="w-full md:w-[200px] pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Date: Newest First</DropdownMenuItem>
              <DropdownMenuItem>Date: Oldest First</DropdownMenuItem>
              <DropdownMenuItem>Album: A-Z</DropdownMenuItem>
              <DropdownMenuItem>Album: Z-A</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photos
          </Button>
        </div>
      </div>

      <Tabs defaultValue="albums" className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="albums" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative group">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Romantic Getaways"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary">View Album</Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Romantic Getaways</h3>
                    <Badge variant="outline">24 photos</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Our favorite trips together</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative group">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Date Nights"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary">View Album</Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Date Nights</h3>
                    <Badge variant="outline">18 photos</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Special evenings out</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative group">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Anniversaries"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary">View Album</Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Anniversaries</h3>
                    <Badge variant="outline">12 photos</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Celebrating our milestones</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-dashed flex flex-col items-center justify-center h-full min-h-[300px]">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Create New Album</h3>
                <p className="text-sm text-muted-foreground mb-4">Organize your photos into a new collection</p>
                <Button>Create Album</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="relative group aspect-square overflow-hidden rounded-md">
                <img
                  src={`/placeholder.svg?height=200&width=200&text=Photo ${i + 1}`}
                  alt={`Photo ${i + 1}`}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm" className="mr-2">
                    <Heart className="h-4 w-4 mr-1" />
                    Like
                  </Button>
                  <Button variant="secondary" size="sm">
                    <ImageIcon className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                  March 2025
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-8">
            <Button variant="outline">Load More Photos</Button>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="relative group aspect-square overflow-hidden rounded-md">
                <img
                  src={`/placeholder.svg?height=200&width=200&text=Favorite ${i + 1}`}
                  alt={`Favorite ${i + 1}`}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm" className="mr-2">
                    <Heart className="h-4 w-4 mr-1 fill-rose-500" />
                    Unlike
                  </Button>
                  <Button variant="secondary" size="sm">
                    <ImageIcon className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                  February 2025
                </div>
                <div className="absolute top-2 right-2">
                  <Heart className="h-5 w-5 fill-rose-500 text-white" />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

"use client"

import { useState } from "react"
import { useAppContext } from "@/lib/context/app-context"
import { useAuth } from "@/lib/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeartIcon, BookmarkIcon, SearchIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DateIdeasPage() {
  const { state, saveDateIdea } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [costFilter, setCostFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Protect this route
  useAuth()

  // Get unique categories
  const categories = Array.from(new Set(state.dateIdeas.map((idea) => idea.category)))

  // Filter date ideas
  const filteredDateIdeas = state.dateIdeas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCost = costFilter === "all" || idea.cost === costFilter
    const matchesLocation = locationFilter === "all" || idea.location === locationFilter
    const matchesCategory = categoryFilter === "all" || idea.category === categoryFilter

    return matchesSearch && matchesCost && matchesLocation && matchesCategory
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Date Ideas</h1>
            <p className="text-muted-foreground">Discover new and exciting date ideas for you and your partner</p>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search date ideas..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <Select value={costFilter} onValueChange={setCostFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by cost" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Costs</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="low">Low Cost</SelectItem>
                        <SelectItem value="medium">Medium Cost</SelectItem>
                        <SelectItem value="high">High Cost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="indoor">Indoor</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                        <SelectItem value="both">Indoor & Outdoor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Ideas Grid */}
          <AnimatePresence>
            {filteredDateIdeas.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="rounded-full bg-muted p-6">
                  <HeartIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No date ideas found</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search term</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredDateIdeas.map((idea) => (
                  <motion.div key={idea.id} variants={item}>
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-48">
                        <img
                          src={idea.imageUrl || "/placeholder.svg"}
                          alt={idea.title}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                          onClick={() => saveDateIdea(idea.id)}
                        >
                          <BookmarkIcon
                            className={`h-5 w-5 ${idea.saved ? "fill-pink-500 text-pink-500" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{idea.title}</CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            {idea.category}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            {idea.cost === "free"
                              ? "Free"
                              : idea.cost === "low"
                                ? "Low Cost"
                                : idea.cost === "medium"
                                  ? "Medium Cost"
                                  : "High Cost"}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            {idea.location === "indoor"
                              ? "Indoor"
                              : idea.location === "outdoor"
                                ? "Outdoor"
                                : "Indoor & Outdoor"}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4 flex-grow">
                        <p className="text-muted-foreground">{idea.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={() => saveDateIdea(idea.id)}>
                          {idea.saved ? "Saved to Favorites" : "Save to Favorites"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}

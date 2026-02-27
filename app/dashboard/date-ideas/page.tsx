"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, Heart, MapPin, Calendar, Filter, ChevronDown, Shuffle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample date ideas
const dateIdeas = [
  {
    id: 1,
    title: "Sunset Picnic",
    description:
      "Pack a basket with your favorite snacks and drinks, and find a scenic spot to watch the sunset together.",
    category: "Outdoor",
    cost: "Low",
    duration: "2-3 hours",
    image: "/placeholder.svg?height=200&width=300",
    saved: true,
    location: "Local park or beach",
  },
  {
    id: 2,
    title: "Cooking Class",
    description: "Learn to cook a new cuisine together. Many cooking schools offer couples classes.",
    category: "Indoor",
    cost: "Medium",
    duration: "3-4 hours",
    image: "/placeholder.svg?height=200&width=300",
    saved: false,
    location: "Local cooking school",
  },
  {
    id: 3,
    title: "Stargazing",
    description: "Drive to a spot away from city lights, bring a blanket, and gaze at the stars together.",
    category: "Outdoor",
    cost: "Free",
    duration: "2-3 hours",
    image: "/placeholder.svg?height=200&width=300",
    saved: false,
    location: "Countryside or observatory",
  },
  {
    id: 4,
    title: "Museum Tour",
    description: "Explore a local museum or art gallery together. Many offer special evening events.",
    category: "Indoor",
    cost: "Low",
    duration: "2-3 hours",
    image: "/placeholder.svg?height=200&width=300",
    saved: true,
    location: "Local museum or gallery",
  },
  {
    id: 5,
    title: "Wine Tasting",
    description: "Visit a local winery or wine bar for a tasting experience.",
    category: "Indoor",
    cost: "Medium",
    duration: "2-3 hours",
    image: "/placeholder.svg?height=200&width=300",
    saved: false,
    location: "Winery or wine bar",
  },
  {
    id: 6,
    title: "Hiking Adventure",
    description: "Find a scenic trail and enjoy nature together.",
    category: "Outdoor",
    cost: "Free",
    duration: "3-5 hours",
    image: "/placeholder.svg?height=200&width=300",
    saved: false,
    location: "Local hiking trail",
  },
]

export default function DateIdeasPage() {
  const [ideas, setIdeas] = useState(dateIdeas)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const toggleSaved = (id: number) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, saved: !idea.saved } : idea)))
  }

  const getRandomIdea = () => {
    const randomIndex = Math.floor(Math.random() * ideas.length)
    const randomIdea = ideas[randomIndex]

    // Scroll to the random idea card
    const element = document.getElementById(`idea-${randomIdea.id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })

      // Highlight the card temporarily
      element.classList.add("ring-4", "ring-rose-500", "ring-opacity-50")
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-rose-500", "ring-opacity-50")
      }, 2000)
    }
  }

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" || (activeTab === "saved" && idea.saved) || activeTab === idea.category.toLowerCase()

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Lightbulb className="h-8 w-8 text-amber-500" />
          Date Ideas
        </h1>
        <p className="text-muted-foreground">
          Discover new and exciting date ideas to keep your relationship fresh and fun.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Input
            placeholder="Search date ideas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-[300px]"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Filter by
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setActiveTab("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("saved")}>Saved</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("indoor")}>Indoor</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("outdoor")}>Outdoor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={getRandomIdea} className="w-full sm:w-auto">
              <Shuffle className="mr-2 h-4 w-4" />
              Random Idea
            </Button>
          </motion.div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="indoor">Indoor</TabsTrigger>
          <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredIdeas.map((idea) => (
            <motion.div
              key={idea.id}
              id={`idea-${idea.id}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="transition-all duration-300"
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={idea.image || "/placeholder.svg"}
                    alt={idea.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSaved(idea.id)}
                      className={`rounded-full p-2 ${
                        idea.saved ? "bg-rose-500 text-white" : "bg-white/80 text-gray-600"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${idea.saved ? "fill-white" : ""}`} />
                    </motion.button>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{idea.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {idea.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{idea.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200">
                      {idea.category}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-500 border-green-200">
                      {idea.cost}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-500 border-purple-200">
                      {idea.duration}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Plan This Date
                    </motion.a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="border-2 border-dashed rounded-lg flex items-center justify-center p-6 h-full min-h-[300px]"
        >
          <div className="text-center">
            <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Add Your Own Idea</h3>
            <p className="text-sm text-muted-foreground mb-4">Have a unique date idea? Add it to your collection.</p>
            <Button>Create New Idea</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


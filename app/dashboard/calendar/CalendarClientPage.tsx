"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ChevronLeft, ChevronRight, Plus, CalendarIcon, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/page-transition"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Sample events data
const initialEvents = [
  {
    id: 1,
    title: "Anniversary",
    date: "2025-04-10",
    time: "19:30",
    description: "Dinner reservation at 7:30 PM",
    type: "anniversary",
    reminder: true,
  },
  {
    id: 2,
    title: "Alex's Birthday",
    date: "2025-03-23",
    time: "18:00",
    description: "Surprise party at home",
    type: "birthday",
    reminder: true,
  },
  {
    id: 3,
    title: "Weekend Getaway",
    date: "2025-03-30",
    time: "10:00",
    description: "Cabin in the mountains",
    type: "trip",
    reminder: true,
  },
  {
    id: 4,
    title: "Movie Night",
    date: "2025-03-15",
    time: "20:00",
    description: "Watch the new Marvel movie",
    type: "date",
    reminder: false,
  },
  {
    id: 5,
    title: "Dinner with Friends",
    date: "2025-03-22",
    time: "19:00",
    description: "At the Italian restaurant downtown",
    type: "social",
    reminder: true,
  },
]

// Important dates
const importantDates = [
  {
    id: 1,
    title: "First Date",
    date: "2023-06-15",
    description: "Coffee shop downtown",
    type: "milestone",
  },
  {
    id: 2,
    title: "Relationship Anniversary",
    date: "2023-09-03",
    description: "The day we became official",
    type: "anniversary",
  },
  {
    id: 3,
    title: "First Trip Together",
    date: "2023-12-10",
    description: "Weekend trip to the beach",
    type: "trip",
  },
]

export default function CalendarClientPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState(initialEvents)
  const [currentMonth, setCurrentMonth] = useState(2) // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEventId, setEditingEventId] = useState<number | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    type: "date",
    reminder: true,
  })

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear)

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Check if a day has an event
  const hasEvent = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.some((event) => event.date === dateString)
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((event) => event.date === dateString)
  }

  // Handle adding or updating an event
  const handleAddOrUpdateEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: "Missing information",
        description: "Please provide a title and date for the event.",
        variant: "destructive",
      })
      return
    }

    if (editingEventId) {
      // Update existing event
      setEvents(events.map((event) => (event.id === editingEventId ? { ...event, ...newEvent } : event)))
      toast({
        title: "Event updated",
        description: "Your event has been updated successfully.",
      })
    } else {
      // Add new event
      const id = Math.max(0, ...events.map((event) => event.id)) + 1
      setEvents([...events, { id, ...newEvent }])
      toast({
        title: "Event added",
        description: "Your new event has been added to the calendar.",
      })
    }

    // Reset form and close dialog
    setNewEvent({
      title: "",
      date: "",
      time: "",
      description: "",
      type: "date",
      reminder: true,
    })
    setEditingEventId(null)
    setIsDialogOpen(false)
  }

  // Handle editing an event
  const handleEditEvent = (id: number) => {
    const eventToEdit = events.find((event) => event.id === id)
    if (eventToEdit) {
      setNewEvent({
        title: eventToEdit.title,
        date: eventToEdit.date,
        time: eventToEdit.time,
        description: eventToEdit.description,
        type: eventToEdit.type,
        reminder: eventToEdit.reminder,
      })
      setEditingEventId(id)
      setIsDialogOpen(true)
    }
  }

  // Handle deleting an event
  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar.",
    })
  }

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "anniversary":
        return "bg-rose-100 text-rose-500 border-rose-200"
      case "birthday":
        return "bg-blue-100 text-blue-500 border-blue-200"
      case "trip":
        return "bg-green-100 text-green-500 border-green-200"
      case "date":
        return "bg-purple-100 text-purple-500 border-purple-200"
      case "social":
        return "bg-amber-100 text-amber-500 border-amber-200"
      case "milestone":
        return "bg-cyan-100 text-cyan-500 border-cyan-200"
      default:
        return "bg-gray-100 text-gray-500 border-gray-200"
    }
  }

  // Get event type icon
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "anniversary":
      case "milestone":
        return <Heart className="h-6 w-6" />
      case "birthday":
      case "date":
      case "social":
      case "trip":
      default:
        return <CalendarIcon className="h-6 w-6" />
    }
  }

  return (
    <PageTransition>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold ml-2">Calendar</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground">Track important dates and upcoming events</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingEventId ? "Edit Event" : "Add New Event"}</DialogTitle>
              <DialogDescription>
                {editingEventId ? "Update the details of your event." : "Fill in the details for your new event."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time (optional)</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Enter event description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="date">Date Night</SelectItem>
                      <SelectItem value="trip">Trip</SelectItem>
                      <SelectItem value="social">Social Event</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reminder">Set Reminder</Label>
                  <Select
                    value={newEvent.reminder ? "yes" : "no"}
                    onValueChange={(value) => setNewEvent({ ...newEvent, reminder: value === "yes" })}
                  >
                    <SelectTrigger id="reminder">
                      <SelectValue placeholder="Set reminder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditingEventId(null)
                  setNewEvent({
                    title: "",
                    date: "",
                    time: "",
                    description: "",
                    type: "date",
                    reminder: true,
                  })
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddOrUpdateEvent}>{editingEventId ? "Update Event" : "Add Event"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>
                {monthNames[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              <div className="text-center text-sm font-medium text-muted-foreground">Sun</div>
              <div className="text-center text-sm font-medium text-muted-foreground">Mon</div>
              <div className="text-center text-sm font-medium text-muted-foreground">Tue</div>
              <div className="text-center text-sm font-medium text-muted-foreground">Wed</div>
              <div className="text-center text-sm font-medium text-muted-foreground">Thu</div>
              <div className="text-center text-sm font-medium text-muted-foreground">Fri</div>
              <div className="text-center text-sm font-medium text-muted-foreground">Sat</div>

              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-1"></div>
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayHasEvent = hasEvent(day)
                const isToday = day === 18 // For demo purposes, let's say today is the 18th
                const dayEvents = getEventsForDay(day)

                return (
                  <motion.div
                    key={`day-${day}`}
                    className={`aspect-square p-1 relative ${isToday ? "bg-rose-100 rounded-md" : ""}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className="h-full w-full rounded-md p-1 cursor-pointer"
                      onClick={() => {
                        setNewEvent({
                          ...newEvent,
                          date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
                        })
                        setIsDialogOpen(true)
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className={`text-right text-sm ${isToday ? "font-bold text-rose-500" : ""}`}>{day}</div>
                        {dayHasEvent && (
                          <div className="mt-auto">
                            <AnimatePresence>
                              {dayEvents.slice(0, 2).map((event, index) => (
                                <motion.div
                                  key={`event-${event.id}`}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  transition={{ delay: index * 0.1 }}
                                  className={`text-xs truncate mt-1 px-1 py-0.5 rounded ${getEventTypeColor(event.type)}`}
                                  title={event.title}
                                >
                                  {event.title}
                                </motion.div>
                              ))}
                              {dayEvents.length > 2 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-xs text-center mt-1 text-muted-foreground"
                                >
                                  +{dayEvents.length - 2} more
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Special moments to look forward to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence>
                  {events
                    .filter((event) => new Date(event.date) >= new Date())
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 3)
                    .map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${getEventTypeColor(event.type).split(" ")[0]}`}
                        >
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{event.title}</p>
                            <div className="flex gap-1">
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEditEvent(event.id)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Edit className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {new Date(event.date).toLocaleDateString()}
                            </Badge>
                            {event.time && (
                              <Badge variant="outline" className="text-xs">
                                {event.time}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
                {events.filter((event) => new Date(event.date) >= new Date()).length === 0 && (
                  <div className="text-center py-6">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                    <p className="text-sm text-muted-foreground mb-4">Add your first event to get started</p>
                    <Button onClick={() => setIsDialogOpen(true)}>Add Event</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
              <CardDescription>Never forget these special moments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence>
                  {importantDates.map((date, index) => (
                    <motion.div
                      key={date.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${getEventTypeColor(date.type).split(" ")[0]}`}
                      >
                        {getEventTypeIcon(date.type)}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{date.title}</p>
                        <p className="text-sm text-muted-foreground">{new Date(date.date).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">{date.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}

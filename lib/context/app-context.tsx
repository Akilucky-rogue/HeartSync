"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Partner = {
  id: string
  name: string
  avatar: string
  connectionDate: string
}

type User = {
  id: string
  name: string
  email: string
  avatar: string
  partner: Partner | null
}

type Task = {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  dueDate?: string
  assignedTo?: "me" | "partner" | "both"
  priority: "low" | "medium" | "high"
}

type DateIdea = {
  id: string
  title: string
  description: string
  category: string
  cost: "free" | "low" | "medium" | "high"
  location: "indoor" | "outdoor" | "both"
  saved: boolean
  imageUrl: string
}

type Goal = {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  targetDate?: string
  progress: number
  category: string
}

type Photo = {
  id: string
  url: string
  caption?: string
  date: string
  albumId: string
}

type Album = {
  id: string
  name: string
  coverUrl: string
  date: string
  photoCount: number
}

type CalendarEvent = {
  id: string
  title: string
  date: string
  time?: string
  description?: string
  location?: string
  type: "date" | "anniversary" | "birthday" | "other"
  reminder: boolean
}

type MoodEntry = {
  id: string
  mood: "happy" | "excited" | "content" | "neutral" | "sad" | "angry" | "anxious"
  note?: string
  date: string
  userId: string
}

type Notification = {
  id: string
  title: string
  message: string
  date: string
  read: boolean
  type: "message" | "reminder" | "system" | "goal" | "task"
  link?: string
}

type Settings = {
  theme: "light" | "dark" | "system"
  notifications: {
    email: boolean
    push: boolean
    reminders: boolean
  }
  privacy: {
    showMoodToPartner: boolean
    shareCalendarWithPartner: boolean
    autoSharePhotos: boolean
  }
}

type AppState = {
  user: User | null
  isAuthenticated: boolean
  tasks: Task[]
  dateIdeas: DateIdea[]
  goals: Goal[]
  albums: Album[]
  photos: Photo[]
  events: CalendarEvent[]
  moodEntries: MoodEntry[]
  notifications: Notification[]
  settings: Settings
}

type AppContextType = {
  state: AppState
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskComplete: (id: string) => void
  saveDateIdea: (id: string) => void
  addGoal: (goal: Omit<Goal, "id" | "createdAt">) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void
  deleteGoal: (id: string) => void
  updateGoalProgress: (id: string, progress: number) => void
  addEvent: (event: Omit<CalendarEvent, "id">) => void
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  addMoodEntry: (entry: Omit<MoodEntry, "id">) => void
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  updateSettings: (updates: Partial<Settings>) => void
  addPhoto: (photo: Omit<Photo, "id">) => void
  createAlbum: (album: Omit<Album, "id">) => void
}

const defaultSettings: Settings = {
  theme: "light",
  notifications: {
    email: true,
    push: true,
    reminders: true,
  },
  privacy: {
    showMoodToPartner: true,
    shareCalendarWithPartner: true,
    autoSharePhotos: true,
  },
}

const defaultState: AppState = {
  user: null,
  isAuthenticated: false,
  tasks: [],
  dateIdeas: [],
  goals: [],
  albums: [],
  photos: [],
  events: [],
  moodEntries: [],
  notifications: [],
  settings: defaultSettings,
}

// Sample data for initial state
const sampleData: Partial<AppState> = {
  dateIdeas: [
    {
      id: "1",
      title: "Picnic in the Park",
      description: "Pack a basket with your favorite snacks and enjoy a relaxing afternoon in the park.",
      category: "Outdoor",
      cost: "low",
      location: "outdoor",
      saved: false,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Cooking Class",
      description: "Learn to cook a new cuisine together with a professional chef.",
      category: "Learning",
      cost: "medium",
      location: "indoor",
      saved: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Stargazing",
      description: "Drive away from city lights and watch the stars together.",
      category: "Romantic",
      cost: "free",
      location: "outdoor",
      saved: false,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Museum Visit",
      description: "Explore a local museum and learn something new together.",
      category: "Cultural",
      cost: "low",
      location: "indoor",
      saved: false,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "5",
      title: "Home Movie Marathon",
      description: "Pick a movie series and have a cozy marathon at home with snacks.",
      category: "Relaxing",
      cost: "low",
      location: "indoor",
      saved: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "6",
      title: "Hiking Adventure",
      description: "Find a scenic trail and enjoy nature together.",
      category: "Adventure",
      cost: "free",
      location: "outdoor",
      saved: false,
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ],
  tasks: [
    {
      id: "1",
      title: "Plan weekend getaway",
      description: "Research destinations within driving distance",
      completed: false,
      createdAt: "2023-09-15T10:00:00Z",
      dueDate: "2023-09-20T00:00:00Z",
      assignedTo: "me",
      priority: "high",
    },
    {
      id: "2",
      title: "Buy anniversary gift",
      description: "Look for something meaningful",
      completed: false,
      createdAt: "2023-09-10T14:30:00Z",
      dueDate: "2023-09-25T00:00:00Z",
      assignedTo: "me",
      priority: "high",
    },
    {
      id: "3",
      title: "Schedule dinner reservation",
      description: "Call that new Italian restaurant",
      completed: true,
      createdAt: "2023-09-05T09:15:00Z",
      dueDate: "2023-09-12T00:00:00Z",
      assignedTo: "partner",
      priority: "medium",
    },
    {
      id: "4",
      title: "Plan movie night",
      description: "Pick movies and prepare snacks",
      completed: false,
      createdAt: "2023-09-14T16:45:00Z",
      dueDate: "2023-09-18T00:00:00Z",
      assignedTo: "both",
      priority: "low",
    },
  ],
  goals: [
    {
      id: "1",
      title: "Travel to 5 countries together",
      description: "Experience different cultures and create memories",
      completed: false,
      createdAt: "2023-01-15T10:00:00Z",
      targetDate: "2025-12-31T00:00:00Z",
      progress: 40,
      category: "Travel",
    },
    {
      id: "2",
      title: "Learn to dance",
      description: "Take salsa classes together",
      completed: false,
      createdAt: "2023-03-10T14:30:00Z",
      targetDate: "2023-12-31T00:00:00Z",
      progress: 20,
      category: "Skills",
    },
    {
      id: "3",
      title: "Read 10 books together",
      description: "One book per month and discuss",
      completed: false,
      createdAt: "2023-02-05T09:15:00Z",
      targetDate: "2024-02-05T00:00:00Z",
      progress: 60,
      category: "Personal Growth",
    },
  ],
  albums: [
    {
      id: "1",
      name: "Summer Vacation 2023",
      coverUrl: "/placeholder.svg?height=300&width=300",
      date: "2023-07-15",
      photoCount: 24,
    },
    {
      id: "2",
      name: "Anniversary Dinner",
      coverUrl: "/placeholder.svg?height=300&width=300",
      date: "2023-05-20",
      photoCount: 12,
    },
    {
      id: "3",
      name: "Weekend Getaway",
      coverUrl: "/placeholder.svg?height=300&width=300",
      date: "2023-08-05",
      photoCount: 18,
    },
  ],
  photos: [
    {
      id: "1",
      url: "/placeholder.svg?height=400&width=600",
      caption: "Beautiful sunset at the beach",
      date: "2023-07-16",
      albumId: "1",
    },
    {
      id: "2",
      url: "/placeholder.svg?height=400&width=600",
      caption: "Hiking in the mountains",
      date: "2023-07-17",
      albumId: "1",
    },
    {
      id: "3",
      url: "/placeholder.svg?height=400&width=600",
      caption: "Dinner by candlelight",
      date: "2023-05-20",
      albumId: "2",
    },
    {
      id: "4",
      url: "/placeholder.svg?height=400&width=600",
      caption: "Exploring the city",
      date: "2023-08-06",
      albumId: "3",
    },
  ],
  events: [
    {
      id: "1",
      title: "Anniversary Dinner",
      date: "2023-10-15",
      time: "19:00",
      description: "Reservation at La Bella Italia",
      location: "123 Main St",
      type: "anniversary",
      reminder: true,
    },
    {
      id: "2",
      title: "Movie Night",
      date: "2023-09-25",
      time: "20:00",
      description: "Watch the new Marvel movie",
      type: "date",
      reminder: true,
    },
    {
      id: "3",
      title: "Partner's Birthday",
      date: "2023-11-10",
      description: "Don't forget to buy a gift!",
      type: "birthday",
      reminder: true,
    },
  ],
  moodEntries: [
    {
      id: "1",
      mood: "happy",
      note: "Had a great day together",
      date: "2023-09-15",
      userId: "user1",
    },
    {
      id: "2",
      mood: "content",
      note: "Relaxing day at home",
      date: "2023-09-14",
      userId: "user1",
    },
    {
      id: "3",
      mood: "excited",
      note: "Planning our next trip",
      date: "2023-09-13",
      userId: "user1",
    },
    {
      id: "4",
      mood: "neutral",
      note: "Regular workday",
      date: "2023-09-12",
      userId: "user1",
    },
    {
      id: "5",
      mood: "sad",
      note: "Missing my partner",
      date: "2023-09-11",
      userId: "user1",
    },
  ],
  notifications: [
    {
      id: "1",
      title: "New Message",
      message: "You received a new message from your partner",
      date: "2023-09-15T10:30:00Z",
      read: false,
      type: "message",
      link: "/chat",
    },
    {
      id: "2",
      title: "Upcoming Anniversary",
      message: "Your anniversary is in 3 days",
      date: "2023-09-14T09:15:00Z",
      read: true,
      type: "reminder",
      link: "/calendar",
    },
    {
      id: "3",
      title: "Task Completed",
      message: 'Your partner completed the task "Schedule dinner reservation"',
      date: "2023-09-13T16:45:00Z",
      read: false,
      type: "task",
      link: "/tasks",
    },
    {
      id: "4",
      title: "Goal Progress",
      message: 'You\'re 60% through your "Read 10 books together" goal',
      date: "2023-09-12T14:20:00Z",
      read: false,
      type: "goal",
      link: "/goals",
    },
  ],
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    // Initialize with sample data for demo purposes
    return {
      ...defaultState,
      ...sampleData,
    }
  })

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem("heartSyncState")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        setState((prevState) => ({
          ...prevState,
          ...parsedState,
        }))
      } catch (error) {
        console.error("Failed to parse saved state:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("heartSyncState", JSON.stringify(state))
  }, [state])

  // Authentication functions
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept any email/password
    // In a real app, this would validate against a backend
    const user: User = {
      id: "user1",
      name: email.split("@")[0],
      email,
      avatar: "/placeholder.svg?height=100&width=100",
      partner: {
        id: "partner1",
        name: "Alex",
        avatar: "/placeholder.svg?height=100&width=100",
        connectionDate: "2022-05-15",
      },
    }

    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
    }))

    return true
  }

  const logout = () => {
    setState((prev) => ({
      ...prev,
      user: null,
      isAuthenticated: false,
    }))
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept any registration
    const user: User = {
      id: "user1",
      name,
      email,
      avatar: "/placeholder.svg?height=100&width=100",
      partner: null,
    }

    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
    }))

    return true
  }

  // Task functions
  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    setState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }))
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    }))
  }

  const deleteTask = (id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
    }))
  }

  const toggleTaskComplete = (id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  }

  // Date idea functions
  const saveDateIdea = (id: string) => {
    setState((prev) => ({
      ...prev,
      dateIdeas: prev.dateIdeas.map((idea) => (idea.id === id ? { ...idea, saved: !idea.saved } : idea)),
    }))
  }

  // Goal functions
  const addGoal = (goal: Omit<Goal, "id" | "createdAt">) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    setState((prev) => ({
      ...prev,
      goals: [...prev.goals, newGoal],
    }))
  }

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setState((prev) => ({
      ...prev,
      goals: prev.goals.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)),
    }))
  }

  const deleteGoal = (id: string) => {
    setState((prev) => ({
      ...prev,
      goals: prev.goals.filter((goal) => goal.id !== id),
    }))
  }

  const updateGoalProgress = (id: string, progress: number) => {
    setState((prev) => ({
      ...prev,
      goals: prev.goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress,
              completed: progress >= 100,
            }
          : goal,
      ),
    }))
  }

  // Calendar functions
  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    }

    setState((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }))
  }

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.map((event) => (event.id === id ? { ...event, ...updates } : event)),
    }))
  }

  const deleteEvent = (id: string) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.filter((event) => event.id !== id),
    }))
  }

  // Mood functions
  const addMoodEntry = (entry: Omit<MoodEntry, "id">) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
    }

    setState((prev) => ({
      ...prev,
      moodEntries: [...prev.moodEntries, newEntry],
    }))
  }

  // Notification functions
  const markNotificationAsRead = (id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    }))
  }

  const clearAllNotifications = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notification) => ({ ...notification, read: true })),
    }))
  }

  // Settings functions
  const updateSettings = (updates: Partial<Settings>) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...updates,
      },
    }))
  }

  // Photo and album functions
  const addPhoto = (photo: Omit<Photo, "id">) => {
    const newPhoto: Photo = {
      ...photo,
      id: Date.now().toString(),
    }

    setState((prev) => ({
      ...prev,
      photos: [...prev.photos, newPhoto],
      albums: prev.albums.map((album) =>
        album.id === photo.albumId ? { ...album, photoCount: album.photoCount + 1 } : album,
      ),
    }))
  }

  const createAlbum = (album: Omit<Album, "id">) => {
    const newAlbum: Album = {
      ...album,
      id: Date.now().toString(),
    }

    setState((prev) => ({
      ...prev,
      albums: [...prev.albums, newAlbum],
    }))
  }

  const contextValue: AppContextType = {
    state,
    login,
    logout,
    register,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    saveDateIdea,
    addGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
    addEvent,
    updateEvent,
    deleteEvent,
    addMoodEntry,
    markNotificationAsRead,
    clearAllNotifications,
    updateSettings,
    addPhoto,
    createAlbum,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

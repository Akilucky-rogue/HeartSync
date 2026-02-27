"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckSquare, Plus, Trash2, Edit, Calendar, Clock, User, Tag, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Sample tasks
const initialTasks = [
  {
    id: 1,
    title: "Book anniversary dinner",
    description: "Make a reservation at our favorite restaurant",
    dueDate: "2025-04-15",
    priority: "high",
    assignedTo: "both",
    category: "event",
    completed: false,
  },
  {
    id: 2,
    title: "Buy groceries for the week",
    description: "Get ingredients for meal prep",
    dueDate: "2025-04-02",
    priority: "medium",
    assignedTo: "alex",
    category: "household",
    completed: true,
  },
  {
    id: 3,
    title: "Plan weekend getaway",
    description: "Research hotels and activities",
    dueDate: "2025-04-10",
    priority: "medium",
    assignedTo: "jamie",
    category: "travel",
    completed: false,
  },
  {
    id: 4,
    title: "Pay utility bills",
    description: "Electricity, water, and internet",
    dueDate: "2025-04-05",
    priority: "high",
    assignedTo: "alex",
    category: "finance",
    completed: false,
  },
  {
    id: 5,
    title: "Schedule couples massage",
    description: "Book appointment at the spa",
    dueDate: "2025-04-20",
    priority: "low",
    assignedTo: "jamie",
    category: "wellness",
    completed: false,
  },
]

type Task = {
  id: number
  title: string
  description: string
  dueDate: string
  priority: string
  assignedTo: string
  category: string
  completed: boolean
}

export default function SharedTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "completed">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    assignedTo: "both",
    category: "household",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = tasks.find((task) => task.id === editingTaskId)
      if (taskToEdit) {
        const { id, completed, ...rest } = taskToEdit
        setNewTask(rest)
      }
    }
  }, [editingTaskId, tasks])

  const handleAddOrUpdateTask = () => {
    if (editingTaskId) {
      // Update existing task
      setTasks(tasks.map((task) => (task.id === editingTaskId ? { ...task, ...newTask } : task)))
      setEditingTaskId(null)
    } else {
      // Add new task
      const id = Math.max(0, ...tasks.map((task) => task.id)) + 1
      setTasks([...tasks, { id, ...newTask, completed: false }])
    }

    // Reset form and close dialog
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      assignedTo: "both",
      category: "household",
    })
    setIsDialogOpen(false)
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleEditTask = (id: number) => {
    setEditingTaskId(id)
    setIsDialogOpen(true)
  }

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "completed" && task.completed) ||
      (activeTab === "pending" && !task.completed) ||
      activeTab === task.category

    return matchesSearch && matchesTab
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-500 border-red-200"
      case "medium":
        return "bg-orange-50 text-orange-500 border-orange-200"
      case "low":
        return "bg-green-50 text-green-500 border-green-200"
      default:
        return "bg-gray-50 text-gray-500 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "event":
        return "bg-purple-50 text-purple-500 border-purple-200"
      case "household":
        return "bg-blue-50 text-blue-500 border-blue-200"
      case "travel":
        return "bg-amber-50 text-amber-500 border-amber-200"
      case "finance":
        return "bg-emerald-50 text-emerald-500 border-emerald-200"
      case "wellness":
        return "bg-pink-50 text-pink-500 border-pink-200"
      default:
        return "bg-gray-50 text-gray-500 border-gray-200"
    }
  }

  const getAssignedToLabel = (assignedTo: string) => {
    switch (assignedTo) {
      case "alex":
        return "Alex"
      case "jamie":
        return "Jamie"
      case "both":
        return "Both"
      default:
        return "Unassigned"
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CheckSquare className="h-8 w-8 text-blue-500" />
          Shared Tasks
        </h1>
        <p className="text-muted-foreground">
          Manage your shared to-do list and keep track of important tasks together.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-[300px]"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingTaskId ? "Edit Task" : "Add New Task"}</DialogTitle>
              <DialogDescription>
                {editingTaskId ? "Update the details of your task." : "Create a new task to share with your partner."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Select
                    value={newTask.assignedTo}
                    onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                  >
                    <SelectTrigger id="assignedTo">
                      <SelectValue placeholder="Select person" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alex</SelectItem>
                      <SelectItem value="jamie">Jamie</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTask.category}
                    onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="household">Household</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
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
                  setEditingTaskId(null)
                  setNewTask({
                    title: "",
                    description: "",
                    dueDate: "",
                    priority: "medium",
                    assignedTo: "both",
                    category: "household",
                  })
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddOrUpdateTask}>{editingTaskId ? "Update Task" : "Add Task"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="household">Household</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm ? "Try a different search term" : "Add a new task to get started"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Your First Task</Button>
                </DialogTrigger>
                <DialogContent>{/* Same content as above */}</DialogContent>
              </Dialog>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`transition-all duration-300 ${task.completed ? "opacity-70" : ""}`}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <CardTitle className={task.completed ? "line-through text-muted-foreground" : ""}>
                          {task.title}
                        </CardTitle>
                        <CardDescription className="mt-1">{task.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditTask(task.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </Badge>
                      <Badge variant="outline" className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                        <Clock className="h-3 w-3" />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {getAssignedToLabel(task.assignedTo)}
                      </Badge>
                      <Badge variant="outline" className={`flex items-center gap-1 ${getCategoryColor(task.category)}`}>
                        <Tag className="h-3 w-3" />
                        {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

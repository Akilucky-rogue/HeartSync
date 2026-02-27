"use client"

import { useState } from "react"
import { useAppContext } from "@/lib/context/app-context"
import { useAuth } from "@/lib/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon, TrashIcon, CalendarIcon, ClockIcon, ClipboardIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"

export default function TasksPage() {
  const { state, addTask, updateTask, deleteTask, toggleTaskComplete } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "me",
    priority: "medium",
  })
  const [filter, setFilter] = useState("all")

  // Protect this route
  useAuth()

  const handleAddTask = () => {
    addTask({
      title: newTask.title,
      description: newTask.description,
      completed: false,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : undefined,
      assignedTo: newTask.assignedTo as "me" | "partner" | "both",
      priority: newTask.priority as "low" | "medium" | "high",
    })

    // Reset form
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      assignedTo: "me",
      priority: "medium",
    })

    setIsDialogOpen(false)
  }

  // Filter tasks
  const filteredTasks = state.tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    if (filter === "me") return task.assignedTo === "me"
    if (filter === "partner") return task.assignedTo === "partner"
    if (filter === "both") return task.assignedTo === "both"
    if (filter === "high") return task.priority === "high"
    return true
  })

  // Sort tasks: high priority first, then by due date, then by completion status
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First by completion status
    if (a.completed && !b.completed) return 1
    if (!a.completed && b.completed) return -1

    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff

    // Then by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }
    if (a.dueDate) return -1
    if (b.dueDate) return 1

    return 0
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return ""
    }
  }

  const getAssigneeText = (assignedTo: string) => {
    switch (assignedTo) {
      case "me":
        return "You"
      case "partner":
        return state.user?.partner?.name || "Partner"
      case "both":
        return "Both"
      default:
        return ""
    }
  }

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Shared Tasks</h1>
            <p className="text-muted-foreground">Manage tasks and to-dos with your partner</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter tasks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="me">Assigned to Me</SelectItem>
                <SelectItem value="partner">Assigned to Partner</SelectItem>
                <SelectItem value="both">Assigned to Both</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>Create a new task for you and your partner</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter task description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date (Optional)</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <Select
                      value={newTask.assignedTo}
                      onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                    >
                      <SelectTrigger id="assignedTo">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="me">Me</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleAddTask} disabled={!newTask.title}>
                    Add Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <AnimatePresence>
            {sortedTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="rounded-full bg-muted p-6">
                  <ClipboardIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No tasks found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {filter === "all" ? "You haven't created any tasks yet." : "No tasks match the current filter."}
                </p>
                <Button className="mt-4 bg-pink-600 hover:bg-pink-700" onClick={() => setIsDialogOpen(true)}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add your first task
                </Button>
              </motion.div>
            ) : (
              <div className="grid gap-4">
                {sortedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    layout
                  >
                    <Card
                      className={`border-l-4 ${task.completed ? "border-l-green-500 opacity-70" : `border-l-${task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : "green"}-500`}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={() => toggleTaskComplete(task.id)}
                              className="mt-1"
                            />
                            <div>
                              <h3
                                className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                              >
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                              )}
                              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                <span
                                  className={`inline-flex items-center rounded-full border px-2 py-0.5 font-medium ${getPriorityColor(task.priority)}`}
                                >
                                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                </span>
                                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-muted-foreground">
                                  Assigned to: {getAssigneeText(task.assignedTo)}
                                </span>
                                {task.dueDate && (
                                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-muted-foreground">
                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                    Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                                  </span>
                                )}
                                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-muted-foreground">
                                  <ClockIcon className="mr-1 h-3 w-3" />
                                  Created: {format(new Date(task.createdAt), "MMM d, yyyy")}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(task.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}


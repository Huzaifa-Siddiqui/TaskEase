"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import {
  Plus,Trash, LogOut,CheckCircle,Circle,Search,TrendingUp,BarChart3,PieChartIcon,LayoutDashboard,CalendarDays,
} from "lucide-react"

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Add these imports at the top of the file
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

type Todo = {
  id: string
  text: string
  completed: boolean
}

// Add this function before the Page component
function generateMockHistoricalData(todos: Todo[]) {
  const today = new Date()
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Generate data for the last 7 days
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - i))
    const dayName = days[date.getDay()]

    // Simulate random completed and added tasks with some correlation to current state
    const completed = Math.floor(Math.random() * (todos.length > 10 ? 5 : 3))
    const added = Math.floor(Math.random() * 5) + (i === 6 ? todos.length / 3 : 0)

    return {
      day: dayName,
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      completed,
      added,
      active: todos.length - completed,
    }
  })
}

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    } else if (status === "authenticated" && session?.user) {
      fetchTodos()
    }
  }, [status, session, router])

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos")
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
      const data: Todo[] = await res.json()
      setTodos(data.map((todo) => ({ ...todo, completed: todo.completed || false })))
      setLoading(false)
    } catch (error) {
      console.error("Error fetching todos:", error)
      setLoading(false)
    }
  }

  const addTodo = async () => {
    if (!newTodo.trim()) return
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTodo }),
      })
      if (!res.ok) throw new Error(`Failed to add todo: ${res.status}`)
      const data: Todo = await res.json()
      setTodos([...todos, data])
      setNewTodo("")
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error(`Failed to delete todo: ${res.status}`)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  const toggleTodoCompletion = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id)
    if (!todoToUpdate) return

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))

    try {
      // Assuming you have an API endpoint to update todo status
      await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todoToUpdate.completed }),
      })
    } catch (error) {
      console.error("Error updating todo:", error)
      // Revert the change if the API call fails
      setTodos(todos)
    }
  }

  const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchQuery.toLowerCase()))
  const completedCount = todos.filter((todo) => todo.completed).length
  const pendingCount = todos.length - completedCount
  const completionRate = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0

  if (status === "loading") {
    return <div className="flex min-h-svh items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-svh bg-gradient-to-br from-background to-muted/30">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold shadow-sm">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-lg font-semibold flex items-center">
                  <LayoutDashboard className="h-4 w-4 mr-2 text-primary" />
                  Task Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">{session?.user?.name || "User"}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => signOut()} className="shadow-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Task Management */}
            <div className="md:col-span-2 space-y-6">
              {/* Add Task Card */}
              <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-muted/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Plus className="h-4 w-4 mr-2 text-primary" />
                    Create Task
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter task description..."
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTodo()}
                      className="flex-1 shadow-sm"
                    />
                    <Button
                      onClick={addTodo}
                      className="shadow-sm bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    >
                      Add Task
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Task List Card */}
              <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-muted/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                      Task List
                    </CardTitle>
                    <Badge variant="outline" className="shadow-sm">
                      {filteredTodos.length} {filteredTodos.length === 1 ? "task" : "tasks"}
                    </Badge>
                  </div>
                  <div className="relative mt-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search tasks..."
                      className="pl-8 shadow-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="text-center py-6">Loading tasks...</div>
                  ) : filteredTodos.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      {todos.length === 0 ? "No tasks yet. Add your first task above." : "No tasks match your search."}
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredTodos.map((todo) => (
                        <div
                          key={todo.id}
                          className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleTodoCompletion(todo.id)}
                            >
                              {todo.completed ? (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </Button>
                            <span className={todo.completed ? "line-through text-muted-foreground" : "font-medium"}>
                              {todo.text}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Weekly Activity Chart - Added back */}
              <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-muted/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                    Weekly Activity
                  </CardTitle>
                  <CardDescription>Tasks added and completed over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      added: {
                        label: "Added",
                        color: "hsl(var(--chart-3))",
                      },
                      completed: {
                        label: "Completed",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <BarChart
                      data={generateMockHistoricalData(todos)}
                      margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                      accessibilityLayer
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="added" fill="url(#colorAdded)" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="completed" fill="url(#colorCompleted)" radius={[4, 4, 0, 0]} barSize={20} />
                      <defs>
                        <linearGradient id="colorAdded" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0.5} />
                        </linearGradient>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.5} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Analytics */}
            <div className="space-y-6">
              {/* Task Statistics Card */}
              <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-muted/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                    Task Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 bg-muted/30 p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{todos.length}</p>
                    </div>
                    <div className="space-y-1 bg-muted/30 p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-primary">{completedCount}</p>
                    </div>
                    <div className="space-y-1 bg-muted/30 p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-primary/80">{pendingCount}</p>
                    </div>
                    <div className="space-y-1 bg-muted/30 p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-muted-foreground">Completion</p>
                      <p className="text-2xl font-bold text-primary/90">{completionRate}%</p>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  {/* Task Distribution Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center">
                      <PieChartIcon className="h-4 w-4 mr-2 text-primary" />
                      Task Distribution
                    </h4>
                    {todos.length > 0 ? (
                      <ChartContainer
                        config={{
                          completed: {
                            label: "Completed",
                            color: "hsl(var(--chart-1))",
                          },
                          pending: {
                            label: "Pending",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="mx-auto aspect-square max-h-[180px]"
                      >
                        <PieChart>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Pie
                            data={[
                              { name: "completed", value: completedCount, fill: "url(#colorPieCompleted)" },
                              { name: "pending", value: pendingCount, fill: "url(#colorPiePending)" },
                            ]}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={40}
                            outerRadius={70}
                            strokeWidth={4}
                            stroke="var(--background)"
                          />
                          <defs>
                            <linearGradient id="colorPieCompleted" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.9} />
                              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.7} />
                            </linearGradient>
                            <linearGradient id="colorPiePending" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.9} />
                              <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.7} />
                            </linearGradient>
                          </defs>
                        </PieChart>
                      </ChartContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[180px] text-muted-foreground">
                        No data to display
                      </div>
                    )}
                  </div>

                  <Separator className="my-2" />

                  {/* Task Trend Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Task Trend (7 Days)</h4>
                    <ChartContainer
                      config={{
                        active: {
                          label: "Active",
                          color: "hsl(var(--chart-2))",
                        },
                        completed: {
                          label: "Completed",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[160px]"
                    >
                      <LineChart
                        data={generateMockHistoricalData(todos)}
                        margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
                        accessibilityLayer
                      >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="active"
                          stroke="url(#colorLineActive)"
                          strokeWidth={3}
                          dot={{ r: 3, fill: "hsl(var(--chart-2))" }}
                          activeDot={{ r: 5, fill: "hsl(var(--chart-2))" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="url(#colorLineCompleted)"
                          strokeWidth={3}
                          dot={{ r: 3, fill: "hsl(var(--chart-1))" }}
                          activeDot={{ r: 5, fill: "hsl(var(--chart-1))" }}
                        />
                        <defs>
                          <linearGradient id="colorLineActive" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={1} />
                          </linearGradient>
                          <linearGradient id="colorLineCompleted" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


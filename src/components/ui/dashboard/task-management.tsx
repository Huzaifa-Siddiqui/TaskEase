"use client"

import { useState } from "react"
import { Plus, Trash, Search, BarChart3, CheckCircle, Circle, CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TaskChart } from './task-chart';

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TaskManagementProps {
  todos: Todo[]
  allTodos: Todo[]
  loading: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  addTodo: (text: string) => Promise<boolean>
  deleteTodo: (id: string) => void
  toggleTodoCompletion: (id: string) => void
  chartData: any[]
}

export function TaskManagement({
  todos,
  allTodos,
  loading,
  searchQuery,
  setSearchQuery,
  addTodo,
  deleteTodo,
  toggleTodoCompletion,
  chartData,
}: TaskManagementProps) {
  const [newTodo, setNewTodo] = useState<string>("")

  const handleAddTodo = async () => {
    const success = await addTodo(newTodo)
    if (success) {
      setNewTodo("")
    }
  }

  return (
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
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              className="flex-1 shadow-sm"
            />
            <Button
              onClick={handleAddTodo}
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
              {todos.length} {todos.length === 1 ? "task" : "tasks"}
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
          ) : todos.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              {allTodos.length === 0 ? "No tasks yet. Add your first task above." : "No tasks match your search."}
            </div>
          ) : (
            <div className="divide-y">
              {todos.map((todo) => (
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

      {/* Weekly Activity Chart */}
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            Weekly Activity
          </CardTitle>
          <CardDescription>Tasks added and completed over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskChart
            type="bar"
            data={chartData}
            height={200}
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
          />
        </CardContent>
      </Card>
    </div>
  )
}


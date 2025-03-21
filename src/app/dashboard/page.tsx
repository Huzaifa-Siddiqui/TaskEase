"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Analytics }  from './../../components/ui/dashboard/analytics';
import { DashboardHeader } from './../../components/ui/dashboard/dashboard-header';
import { generateMockHistoricalData } from './../../lib/chart-data';
import { TaskManagement } from './../../components/ui/dashboard/task-management';



type Todo = {
  id: string
  text: string
  completed: boolean
}

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [todos, setTodos] = useState<Todo[]>([])
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

  const addTodo = async (newTodo: string) => {
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
      return true
    } catch (error) {
      console.error("Error adding todo:", error)
      return false
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
  const chartData = generateMockHistoricalData(todos)

  if (status === "loading") {
    return <div className="flex min-h-svh items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-svh bg-gradient-to-br from-background to-muted/30">
      <div className="flex-1 flex flex-col">
        <DashboardHeader session={session} />

        <main className="flex-1 container py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskManagement
              todos={filteredTodos}
              allTodos={todos}
              loading={loading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              addTodo={addTodo}
              deleteTodo={deleteTodo}
              toggleTodoCompletion={toggleTodoCompletion}
              chartData={chartData}
            />

            <Analytics
              todos={todos}
              completedCount={completedCount}
              pendingCount={pendingCount}
              completionRate={completionRate}
              chartData={chartData}
            />
          </div>
        </main>
      </div>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import { Users, Trash, LogOut } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/users")
        if (!res.ok) throw new Error("Failed to fetch users")
        const data: User[] = await res.json()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Delete user function
  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      console.log("Deleting user with ID:", userId)

      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      const result = await res.json()
      console.log("Delete response:", result)

      if (!res.ok) throw new Error(result.error || "Failed to delete user")

      // Remove user from state after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Sidebar (simplified version) */}
      <div className="fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 -translate-x-full">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              <Users className="h-6 w-6" />
              <span>Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground"
            >
              <Users className="h-5 w-5" />
              User Management
            </a>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground">© 2025 Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8 md:ml-64">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users and system settings</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => signOut()}
                className="flex items-center px-4 py-2 rounded-md border bg-background hover:bg-accent text-sm font-medium shadow-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="text-sm font-medium text-muted-foreground">Total Users</div>
                <div className="text-2xl font-bold mt-1">{users.length}</div>
              </div>
            </div>
          
          </div>

          {/* Users Table */}
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h2 className="font-semibold">User Management</h2>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse text-center">
                      <p className="text-muted-foreground">Loading users...</p>
                    </div>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg bg-muted/50">
                    <p className="text-muted-foreground">No users found</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">{user.id}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                {getInitials(user.name)}
                              </div>
                              {user.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{user.email}</td>
                         
                          <td className="px-4 py-3 text-sm">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="flex items-center px-3 py-1 rounded-md border bg-background hover:bg-accent text-xs font-medium shadow-sm"
                            >
                              <Trash className="h-3 w-3 mr-2" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


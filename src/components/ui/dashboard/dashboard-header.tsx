"use client"

import { LayoutDashboard, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import type { Session } from "next-auth"

interface DashboardHeaderProps {
  session: Session | null
}

export function DashboardHeader({ session }: DashboardHeaderProps) {
  return (
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
  )
}


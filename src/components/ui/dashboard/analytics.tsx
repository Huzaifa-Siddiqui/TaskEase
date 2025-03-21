"use client"

import { TrendingUp, PieChartIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TaskChart } from './task-chart';

interface AnalyticsProps {
  todos: any[]
  completedCount: number
  pendingCount: number
  completionRate: number
  chartData: any[]
}

export function Analytics({ todos, completedCount, pendingCount, completionRate, chartData }: AnalyticsProps) {
  return (
    <div className="space-y-6">
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
              <TaskChart
                type="pie"
                data={[
                  { name: "completed", value: completedCount, fill: "url(#colorPieCompleted)" },
                  { name: "pending", value: pendingCount, fill: "url(#colorPiePending)" },
                ]}
                height={180}
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
              />
            ) : (
              <div className="flex items-center justify-center h-[180px] text-muted-foreground">No data to display</div>
            )}
          </div>

          <Separator className="my-2" />

          {/* Task Trend Chart */}
          <div>
            <h4 className="text-sm font-medium mb-3">Task Trend (7 Days)</h4>
            <TaskChart
              type="line"
              data={chartData}
              height={160}
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
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


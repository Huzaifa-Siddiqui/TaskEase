"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

interface TaskChartProps {
  type: "bar" | "line" | "pie"
  data: any[]
  height: number
  config: Record<string, { label: string; color: string }>
}

export function TaskChart({ type, data, height, config }: TaskChartProps) {
  if (type === "bar") {
    return (
      <ChartContainer config={config} className={`h-[${height}px]`}>
        <BarChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }} accessibilityLayer>
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
    )
  }

  if (type === "pie") {
    return (
      <ChartContainer config={config} className={`mx-auto aspect-square max-h-[${height}px]`}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={data}
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
    )
  }

  if (type === "line") {
    return (
      <ChartContainer config={config} className={`h-[${height}px]`}>
        <LineChart data={data} margin={{ left: 0, right: 0, top: 5, bottom: 5 }} accessibilityLayer>
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
    )
  }

  return null
}


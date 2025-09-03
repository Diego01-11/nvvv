"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const salesData = [
  { month: "Ene", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 139 },
  { month: "Mar", sales: 2000, orders: 980 },
  { month: "Abr", sales: 2780, orders: 390 },
  { month: "May", sales: 1890, orders: 480 },
  { month: "Jun", sales: 2390, orders: 380 },
  { month: "Jul", sales: 3490, orders: 430 },
]

const categoryData = [
  { category: "Camisetas", sales: 4000, percentage: 35 },
  { category: "Pantalones", sales: 3000, percentage: 26 },
  { category: "Sudaderas", sales: 2000, percentage: 17 },
  { category: "Calzado", sales: 1500, percentage: 13 },
  { category: "Otros", sales: 1000, percentage: 9 },
]

const revenueData = [
  { day: "Lun", revenue: 2400 },
  { day: "Mar", revenue: 1398 },
  { day: "Mié", revenue: 9800 },
  { day: "Jue", revenue: 3908 },
  { day: "Vie", revenue: 4800 },
  { day: "Sáb", revenue: 3800 },
  { day: "Dom", revenue: 4300 },
]

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas Mensuales</CardTitle>
        <CardDescription>Evolución de ventas y pedidos en los últimos 7 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Ventas",
              color: "hsl(var(--chart-1))",
            },
            orders: {
              label: "Pedidos",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="sales"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Categoría</CardTitle>
        <CardDescription>Distribución de ventas por categoría de productos</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Ventas",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="sales" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos Semanales</CardTitle>
        <CardDescription>Ingresos diarios de la semana actual</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Ingresos",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-4))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

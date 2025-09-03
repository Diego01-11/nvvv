"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SalesChart, CategoryChart, RevenueChart } from "@/components/dashboard-charts"
import { InventoryAlerts, TopProducts, RecentReviews } from "@/components/dashboard-widgets"

export default function AdminDashboard() {
  const metrics = [
    {
      title: "Ventas Totales",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Usuarios Activos",
      value: "2,350",
      change: "+180.1%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Productos",
      value: "12,234",
      change: "+19%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Pedidos Pendientes",
      value: "573",
      change: "-4.3%",
      trend: "down",
      icon: ShoppingCart,
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Ana García",
      email: "ana@email.com",
      status: "Pendiente",
      amount: "$250.00",
    },
    {
      id: "ORD-002",
      customer: "Carlos López",
      email: "carlos@email.com",
      status: "Enviado",
      amount: "$150.00",
    },
    {
      id: "ORD-003",
      customer: "María Rodríguez",
      email: "maria@email.com",
      status: "Entregado",
      amount: "$350.00",
    },
    {
      id: "ORD-004",
      customer: "Juan Pérez",
      email: "juan@email.com",
      status: "Pendiente",
      amount: "$120.00",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pendiente":
        return <Badge variant="secondary">Pendiente</Badge>
      case "Enviado":
        return <Badge className="bg-blue-100 text-blue-800">Enviado</Badge>
      case "Entregado":
        return <Badge className="bg-green-100 text-green-800">Entregado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Resumen general de tu tienda en línea</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                <span className="ml-1">desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de gráficos principales */}
      <div className="grid gap-6 md:grid-cols-2">
        <SalesChart />
        <CategoryChart />
      </div>

      {/* Gráfico de ingresos semanales y widgets */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <InventoryAlerts />
      </div>

      {/* Widgets de productos top y reseñas */}
      <div className="grid gap-6 md:grid-cols-2">
        <TopProducts />
        <RecentReviews />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recientes</CardTitle>
          <CardDescription>Últimos pedidos realizados en tu tienda</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar pedido
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

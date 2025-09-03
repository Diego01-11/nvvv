"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export function InventoryAlerts() {
  const lowStockItems = [
    { name: "Leche Entera 1L", stock: 5, minStock: 20, status: "critical" },
    { name: "Pan Integral", stock: 12, minStock: 30, status: "warning" },
    { name: "Yogurt Natural", stock: 8, minStock: 25, status: "critical" },
    { name: "Aceite de Oliva", stock: 15, minStock: 20, status: "warning" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600"
      case "warning":
        return "text-yellow-600"
      default:
        return "text-green-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          Alertas de Inventario
        </CardTitle>
        <CardDescription>Productos con stock bajo que requieren reposición</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowStockItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status)}
                <p className="text-sm font-medium leading-none">{item.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={(item.stock / item.minStock) * 100} className="flex-1 h-2" />
                <span className={`text-xs ${getStatusColor(item.status)}`}>
                  {item.stock}/{item.minStock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function TopProducts() {
  const topProducts = [
    { name: "Leche Entera 1L", sales: 1234, revenue: "$2,468", growth: "+12%" },
    { name: "Pan Blanco", sales: 987, revenue: "$1,974", growth: "+8%" },
    { name: "Huevos Docena", sales: 756, revenue: "$1,512", growth: "+15%" },
    { name: "Yogurt Fresa", sales: 654, revenue: "$1,308", growth: "+5%" },
    { name: "Queso Fresco", sales: 543, revenue: "$1,086", growth: "+20%" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Productos Más Vendidos
        </CardTitle>
        <CardDescription>Top 5 productos con mejor rendimiento este mes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.sales} unidades vendidas</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{product.revenue}</p>
              <Badge variant="secondary" className="text-xs text-green-600">
                {product.growth}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function RecentReviews() {
  const reviews = [
    {
      customer: "María González",
      product: "Leche Entera 1L",
      rating: 5,
      comment: "Excelente calidad, muy fresca",
      time: "hace 2 horas",
    },
    {
      customer: "Carlos Ruiz",
      product: "Pan Integral",
      rating: 4,
      comment: "Buen sabor, pero llegó un poco tarde",
      time: "hace 4 horas",
    },
    {
      customer: "Ana López",
      product: "Yogurt Natural",
      rating: 5,
      comment: "Perfecto, justo como esperaba",
      time: "hace 6 horas",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reseñas Recientes</CardTitle>
        <CardDescription>Últimas reseñas de clientes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {review.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{review.customer}</p>
                  <p className="text-xs text-muted-foreground">{review.product}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
            <p className="text-xs text-muted-foreground">{review.time}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

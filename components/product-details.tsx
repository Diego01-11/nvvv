"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, DollarSign, Calendar, Hash, BarChart3 } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  status: "active" | "inactive"
  image: string
  sku: string
  createdAt: string
}

interface ProductDetailsProps {
  product: Product
  onClose: () => void
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge variant="secondary">Inactivo</Badge>
    )
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Sin stock</Badge>
    } else if (stock < 20) {
      return <Badge className="bg-yellow-100 text-yellow-800">Stock bajo</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800">En stock</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con imagen y info básica */}
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-32 w-32 rounded-lg object-cover border"
          />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div className="flex items-center gap-4">
            {getStatusBadge(product.status)}
            {getStockBadge(product.stock)}
            <Badge variant="outline">{product.category}</Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Información detallada */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5" />
              Información de Precios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Precio de venta:</span>
              <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Precio sugerido:</span>
              <span className="text-muted-foreground">${(product.price * 1.2).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5" />
              Inventario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stock actual:</span>
              <span className="font-semibold">{product.stock} unidades</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stock mínimo:</span>
              <span className="text-muted-foreground">20 unidades</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Hash className="h-5 w-5" />
              Identificación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">SKU:</span>
              <span className="font-mono font-semibold">{product.sku}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID del producto:</span>
              <span className="font-mono text-sm">{product.id}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              Fechas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha de creación:</span>
              <span>{new Date(product.createdAt).toLocaleDateString("es-ES")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última actualización:</span>
              <span>Hoy</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas simuladas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Estadísticas de Ventas
          </CardTitle>
          <CardDescription>Rendimiento del producto en los últimos 30 días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Unidades vendidas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">${(156 * product.price).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Ingresos generados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground">Calificación promedio</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón de cerrar */}
      <div className="flex justify-end">
        <Button onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  )
}

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  User,
  MapPin,
  CreditCard,
  Calendar,
  Package,
  Truck,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: OrderItem[]
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod: string
  createdAt: string
  updatedAt: string
  trackingNumber?: string
}

interface OrderDetailsProps {
  order: Order
  onClose: () => void
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800", icon: Clock },
      processing: { label: "Procesando", className: "bg-blue-100 text-blue-800", icon: Package },
      shipped: { label: "Enviado", className: "bg-purple-100 text-purple-800", icon: Truck },
      delivered: { label: "Entregado", className: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { label: "Cancelado", className: "bg-red-100 text-red-800", icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge className={config.className}>
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.0
  const tax = subtotal * 0.1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pedido {order.id}</h2>
          <p className="text-muted-foreground">
            Creado el {new Date(order.createdAt).toLocaleDateString("es-ES")} a las{" "}
            {new Date(order.createdAt).toLocaleTimeString("es-ES")}
          </p>
        </div>
        {getStatusBadge(order.status)}
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{order.customer.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{order.customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{order.customer.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Dirección de Envío
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>{order.shippingAddress.zipCode}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Información de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Método de pago:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado del pago:</span>
                <Badge className="bg-green-100 text-green-800">Pagado</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Cronología del Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha de creación:</span>
                <span>{new Date(order.createdAt).toLocaleDateString("es-ES")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última actualización:</span>
                <span>{new Date(order.updatedAt).toLocaleDateString("es-ES")}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Número de seguimiento:</span>
                  <span className="font-mono text-sm">{order.trackingNumber}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Productos del Pedido
          </CardTitle>
          <CardDescription>{order.items.length} productos en este pedido</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead className="text-right">Precio Unitario</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator className="my-4" />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Envío:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Impuestos:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <Button>Imprimir Pedido</Button>
      </div>
    </div>
  )
}

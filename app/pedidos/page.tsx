"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingCart,
} from "lucide-react"
import { OrderDetails } from "@/components/order-details"
import { OrderStatusUpdate } from "@/components/order-status-update"

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

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "Ana García",
      email: "ana@email.com",
      phone: "+34 600 123 456",
    },
    items: [
      { id: "1", name: "Camiseta Básica Algodón", quantity: 2, price: 25.0, image: "/vintage-milk-bottle.png" },
      { id: "2", name: "Jeans Clásicos", quantity: 1, price: 89.9, image: "/whole-grain-bread.png" },
    ],
    status: "pending",
    total: 139.9,
    shippingAddress: {
      street: "Calle Mayor 123",
      city: "Madrid",
      state: "Madrid",
      zipCode: "28001",
    },
    paymentMethod: "Tarjeta de Crédito",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Carlos López",
      email: "carlos@email.com",
      phone: "+34 600 789 012",
    },
    items: [
      { id: "3", name: "Sudadera con Capucha", quantity: 3, price: 45.0, image: "/natural-yogurt.png" },
      { id: "5", name: "Chaqueta Denim", quantity: 1, price: 120.0, image: "/dozen-eggs-carton.jpg" },
    ],
    status: "shipped",
    total: 255.0,
    shippingAddress: {
      street: "Avenida de la Paz 45",
      city: "Barcelona",
      state: "Cataluña",
      zipCode: "08001",
    },
    paymentMethod: "PayPal",
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-15T09:20:00Z",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-003",
    customer: {
      name: "María Rodríguez",
      email: "maria@email.com",
      phone: "+34 600 345 678",
    },
    items: [
      { id: "4", name: "Zapatillas Deportivas", quantity: 1, price: 75.0, image: "/olive-oil-bottle.png" },
      { id: "1", name: "Camiseta Básica Algodón", quantity: 1, price: 25.0, image: "/vintage-milk-bottle.png" },
    ],
    status: "delivered",
    total: 100.0,
    shippingAddress: {
      street: "Plaza del Sol 8",
      city: "Valencia",
      state: "Valencia",
      zipCode: "46001",
    },
    paymentMethod: "Transferencia Bancaria",
    createdAt: "2024-01-13T12:15:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Juan Pérez",
      email: "juan@email.com",
      phone: "+34 600 901 234",
    },
    items: [{ id: "2", name: "Jeans Clásicos", quantity: 2, price: 89.9, image: "/whole-grain-bread.png" }],
    status: "cancelled",
    total: 179.8,
    shippingAddress: {
      street: "Calle de la Rosa 15",
      city: "Sevilla",
      state: "Andalucía",
      zipCode: "41001",
    },
    paymentMethod: "Tarjeta de Débito",
    createdAt: "2024-01-12T08:20:00Z",
    updatedAt: "2024-01-13T16:45:00Z",
  },
  {
    id: "ORD-005",
    customer: {
      name: "Laura Martín",
      email: "laura@email.com",
      phone: "+34 600 567 890",
    },
    items: [
      { id: "3", name: "Sudadera con Capucha", quantity: 2, price: 45.0, image: "/natural-yogurt.png" },
      { id: "5", name: "Chaqueta Denim", quantity: 2, price: 120.0, image: "/dozen-eggs-carton.jpg" },
      { id: "1", name: "Camiseta Básica Algodón", quantity: 1, price: 25.0, image: "/vintage-milk-bottle.png" },
    ],
    status: "processing",
    total: 235.0,
    shippingAddress: {
      street: "Paseo de Gracia 100",
      city: "Barcelona",
      state: "Cataluña",
      zipCode: "08008",
    },
    paymentMethod: "Tarjeta de Crédito",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-16T11:00:00Z",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)

  const statusOptions = [
    { value: "pending", label: "Pendiente" },
    { value: "processing", label: "Procesando" },
    { value: "shipped", label: "Enviado" },
    { value: "delivered", label: "Entregado" },
    { value: "cancelled", label: "Cancelado" },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsDialogOpen(true)
  }

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order)
    setIsStatusDialogOpen(true)
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus as Order["status"], updatedAt: new Date().toISOString() }
          : order,
      ),
    )
    setIsStatusDialogOpen(false)
  }

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    }
    return stats
  }

  const stats = getOrderStats()

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Pedidos</h1>
              <p className="text-muted-foreground">Administra y da seguimiento a todos los pedidos de tu tienda</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Procesando</CardTitle>
                  <Package className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enviados</CardTitle>
                  <Truck className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{stats.shipped}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Entregados</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros y Búsqueda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por ID, cliente o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Pedidos ({filteredOrders.length})</CardTitle>
                <CardDescription>Lista completa de pedidos realizados en tu tienda</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pedido</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 3).map((item, index) => (
                                <img
                                  key={index}
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="h-8 w-8 rounded-full border-2 border-background object-cover"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {order.items.length} producto{order.items.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString("es-ES")}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(order)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Actualizar estado
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
        </main>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido</DialogTitle>
            <DialogDescription>Información completa del pedido seleccionado</DialogDescription>
          </DialogHeader>
          {selectedOrder && <OrderDetails order={selectedOrder} onClose={() => setIsDetailsDialogOpen(false)} />}
        </DialogContent>
      </Dialog>

      {/* Order Status Update Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Estado del Pedido</DialogTitle>
            <DialogDescription>Cambia el estado del pedido {selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <OrderStatusUpdate
              order={selectedOrder}
              onUpdate={handleStatusUpdate}
              onClose={() => setIsStatusDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

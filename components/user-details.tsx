"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface UserDetailsProps {
  user: {
    id: string
    name: string
    email: string
    phone: string
    status: "active" | "blocked" | "pending"
    role: "customer" | "admin" | "editor"
    registeredAt: string
    lastLogin: string
    totalOrders: number
    totalSpent: number
  }
  onClose: () => void
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: { label: "Activo", className: "bg-green-100 text-green-800" },
    blocked: { label: "Bloqueado", className: "bg-red-100 text-red-800" },
    pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
  }

  const config = statusConfig[status as keyof typeof statusConfig]
  return <Badge className={config.className}>{config.label}</Badge>
}

const getRoleBadge = (role: string) => {
  const roleConfig = {
    customer: { label: "Cliente", className: "bg-blue-100 text-blue-800" },
    admin: { label: "Administrador", className: "bg-purple-100 text-purple-800" },
    editor: { label: "Editor", className: "bg-orange-100 text-orange-800" },
  }

  const config = roleConfig[role as keyof typeof roleConfig]
  return <Badge className={config.className}>{config.label}</Badge>
}

export function UserDetails({ user, onClose }: UserDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-lg font-medium">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            {getStatusBadge(user.status)}
            {getRoleBadge(user.role)}
          </div>
        </div>
      </div>

      <Separator />

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {/* User icon */}
            Información de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            {/* Mail icon */}
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Phone icon */}
            <span>{user.phone}</span>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {/* Calendar icon */}
              Información de la Cuenta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha de registro:</span>
              <span>{new Date(user.registeredAt).toLocaleDateString("es-ES")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Último acceso:</span>
              <span>{new Date(user.lastLogin).toLocaleDateString("es-ES")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID de usuario:</span>
              <span className="font-mono text-sm">{user.id}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {/* ShoppingBag icon */}
              Estadísticas de Compras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total de pedidos:</span>
              <span className="font-semibold">{user.totalOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total gastado:</span>
              <span className="font-semibold">${user.totalSpent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Promedio por pedido:</span>
              <span className="font-semibold">
                ${user.totalOrders > 0 ? (user.totalSpent / user.totalOrders).toFixed(2) : "0.00"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <Button>Ver Pedidos</Button>
      </div>
    </div>
  )
}

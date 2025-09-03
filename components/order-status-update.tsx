"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Package, Truck, CheckCircle, XCircle } from "lucide-react"

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  trackingNumber?: string
}

interface OrderStatusUpdateProps {
  order: Order
  onUpdate: (orderId: string, newStatus: string, trackingNumber?: string, notes?: string) => void
  onClose: () => void
}

export function OrderStatusUpdate({ order, onUpdate, onClose }: OrderStatusUpdateProps) {
  const [newStatus, setNewStatus] = useState(order.status)
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || "")
  const [notes, setNotes] = useState("")

  const statusOptions = [
    {
      value: "pending",
      label: "Pendiente",
      description: "El pedido está esperando ser procesado",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "processing",
      label: "Procesando",
      description: "El pedido está siendo preparado",
      icon: Package,
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "shipped",
      label: "Enviado",
      description: "El pedido ha sido enviado al cliente",
      icon: Truck,
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "delivered",
      label: "Entregado",
      description: "El pedido ha sido entregado exitosamente",
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
    },
    {
      value: "cancelled",
      label: "Cancelado",
      description: "El pedido ha sido cancelado",
      icon: XCircle,
      color: "bg-red-100 text-red-800",
    },
  ]

  const currentStatusOption = statusOptions.find((option) => option.value === order.status)
  const newStatusOption = statusOptions.find((option) => option.value === newStatus)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(order.id, newStatus, trackingNumber, notes)
  }

  const canAddTracking = newStatus === "shipped" || newStatus === "delivered"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estado Actual</CardTitle>
          <CardDescription>
            Pedido {order.id} - {order.customer.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStatusOption && (
            <div className="flex items-center gap-3">
              <currentStatusOption.icon className="h-5 w-5" />
              <Badge className={currentStatusOption.color}>{currentStatusOption.label}</Badge>
              <span className="text-sm text-muted-foreground">{currentStatusOption.description}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Status Selection */}
      <div className="space-y-3">
        <Label htmlFor="status">Nuevo Estado</Label>
        <Select value={newStatus} onValueChange={setNewStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona el nuevo estado" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {newStatusOption && <p className="text-sm text-muted-foreground">{newStatusOption.description}</p>}
      </div>

      {/* Tracking Number (only for shipped/delivered) */}
      {canAddTracking && (
        <div className="space-y-2">
          <Label htmlFor="tracking">Número de Seguimiento</Label>
          <Input
            id="tracking"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Ej: TRK123456789"
          />
          <p className="text-sm text-muted-foreground">Opcional. Se enviará al cliente por email si se proporciona.</p>
        </div>
      )}

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notas Internas (Opcional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Añade cualquier nota o comentario sobre este cambio de estado..."
          rows={3}
        />
      </div>

      {/* Preview of change */}
      {newStatus !== order.status && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Vista Previa del Cambio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-sm">El pedido cambiará de</span>
              {currentStatusOption && <Badge className={currentStatusOption.color}>{currentStatusOption.label}</Badge>}
              <span className="text-sm">a</span>
              {newStatusOption && <Badge className={newStatusOption.color}>{newStatusOption.label}</Badge>}
            </div>
            {canAddTracking && trackingNumber && (
              <p className="text-sm text-muted-foreground mt-2">
                Se añadirá el número de seguimiento: <span className="font-mono">{trackingNumber}</span>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={newStatus === order.status}>
          Actualizar Estado
        </Button>
      </div>
    </form>
  )
}

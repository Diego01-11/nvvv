"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Bell, MessageSquare } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
}

interface SendNotificationProps {
  user: User
  onSend: () => void
  onClose: () => void
}

export function SendNotification({ user, onSend, onClose }: SendNotificationProps) {
  const [notificationType, setNotificationType] = useState("email")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se enviaría la notificación
    onSend()
  }

  const notificationTemplates = [
    { id: "welcome", name: "Mensaje de Bienvenida", subject: "¡Bienvenido a nuestra tienda!" },
    { id: "promotion", name: "Promoción Especial", subject: "Oferta especial solo para ti" },
    { id: "order_update", name: "Actualización de Pedido", subject: "Actualización de tu pedido" },
    { id: "custom", name: "Mensaje Personalizado", subject: "" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Recipient Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Destinatario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Type */}
      <div className="space-y-3">
        <Label>Tipo de Notificación</Label>
        <Select value={notificationType} onValueChange={setNotificationType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </div>
            </SelectItem>
            <SelectItem value="push">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificación Push
              </div>
            </SelectItem>
            <SelectItem value="sms">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                SMS
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Template Selection */}
      <div className="space-y-3">
        <Label>Plantilla</Label>
        <Select
          onValueChange={(value) => {
            const template = notificationTemplates.find((t) => t.id === value)
            if (template) {
              setSubject(template.subject)
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una plantilla" />
          </SelectTrigger>
          <SelectContent>
            {notificationTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject">Asunto</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Escribe el asunto del mensaje"
          required
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          rows={6}
          required
        />
        <p className="text-sm text-muted-foreground">
          Puedes usar variables como {"{nombre}"} para personalizar el mensaje.
        </p>
      </div>

      {/* Preview */}
      {(subject || message) && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Vista Previa</CardTitle>
            <CardDescription>Así se verá tu notificación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="font-medium">{subject}</div>
              <div className="text-sm whitespace-pre-wrap">{message}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Enviar Notificación</Button>
      </div>
    </form>
  )
}

"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Settings, CreditCard, Palette, Shield, Users, Activity, Upload, Eye, Save } from "lucide-react"

export default function ConfigurationPage() {
  const [settings, setSettings] = useState({
    storeName: "Mi Tienda Online",
    storeDescription: "La mejor tienda de productos frescos",
    contactEmail: "contacto@mitienda.com",
    contactPhone: "+34 600 000 000",
    currency: "EUR",
    language: "es",
    enableNotifications: true,
    enableReviews: true,
    autoApproveReviews: false,
    maintenanceMode: false,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    paypal: { enabled: true, email: "payments@mitienda.com" },
    stripe: { enabled: true, publicKey: "pk_test_...", secretKey: "sk_test_..." },
    bankTransfer: { enabled: true, accountNumber: "ES12 3456 7890 1234 5678 9012" },
  })

  const activityLogs = [
    {
      id: "1",
      user: "Admin Principal",
      action: "Actualizó configuración de pagos",
      timestamp: "2024-01-16T15:30:00Z",
      ip: "192.168.1.100",
    },
    {
      id: "2",
      user: "Ana García",
      action: "Creó nuevo producto",
      timestamp: "2024-01-16T14:20:00Z",
      ip: "192.168.1.101",
    },
    {
      id: "3",
      user: "Carlos López",
      action: "Actualizó estado de pedido",
      timestamp: "2024-01-16T13:15:00Z",
      ip: "192.168.1.102",
    },
  ]

  const userRoles = [
    {
      id: "1",
      name: "Administrador",
      permissions: ["Acceso total", "Gestión de usuarios", "Configuración del sistema"],
      users: 2,
    },
    {
      id: "2",
      name: "Editor",
      permissions: ["Gestión de productos", "Gestión de pedidos", "Ver reportes"],
      users: 3,
    },
    {
      id: "3",
      name: "Cliente",
      permissions: ["Realizar pedidos", "Ver historial", "Escribir reseñas"],
      users: 150,
    },
  ]

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
              <h1 className="text-3xl font-bold text-foreground">Configuración del Sistema</h1>
              <p className="text-muted-foreground">Administra la configuración general de tu tienda</p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pagos
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Apariencia
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Usuarios
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Seguridad
                </TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de la Tienda</CardTitle>
                    <CardDescription>Configuración básica de tu tienda online</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="storeName">Nombre de la Tienda</Label>
                        <Input
                          id="storeName"
                          value={settings.storeName}
                          onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Email de Contacto</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeDescription">Descripción</Label>
                      <Textarea
                        id="storeDescription"
                        value={settings.storeDescription}
                        onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Teléfono</Label>
                        <Input
                          id="contactPhone"
                          value={settings.contactPhone}
                          onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Moneda</Label>
                        <Select
                          value={settings.currency}
                          onValueChange={(value) => setSettings({ ...settings, currency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                            <SelectItem value="USD">Dólar ($)</SelectItem>
                            <SelectItem value="GBP">Libra (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select
                          value={settings.language}
                          onValueChange={(value) => setSettings({ ...settings, language: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuraciones Avanzadas</CardTitle>
                    <CardDescription>Opciones adicionales para tu tienda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones por Email</Label>
                        <p className="text-sm text-muted-foreground">Enviar notificaciones automáticas</p>
                      </div>
                      <Switch
                        checked={settings.enableNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Sistema de Reseñas</Label>
                        <p className="text-sm text-muted-foreground">Permitir reseñas de productos</p>
                      </div>
                      <Switch
                        checked={settings.enableReviews}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableReviews: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-aprobar Reseñas</Label>
                        <p className="text-sm text-muted-foreground">Publicar reseñas automáticamente</p>
                      </div>
                      <Switch
                        checked={settings.autoApproveReviews}
                        onCheckedChange={(checked) => setSettings({ ...settings, autoApproveReviews: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Modo Mantenimiento</Label>
                        <p className="text-sm text-muted-foreground">Desactivar temporalmente la tienda</p>
                      </div>
                      <Switch
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Settings */}
              <TabsContent value="payments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pasarelas de Pago</CardTitle>
                    <CardDescription>Configura los métodos de pago disponibles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">PayPal</h3>
                            <p className="text-sm text-muted-foreground">Pagos con PayPal</p>
                          </div>
                        </div>
                        <Switch
                          checked={paymentSettings.paypal.enabled}
                          onCheckedChange={(checked) =>
                            setPaymentSettings({
                              ...paymentSettings,
                              paypal: { ...paymentSettings.paypal, enabled: checked },
                            })
                          }
                        />
                      </div>
                      {paymentSettings.paypal.enabled && (
                        <div className="ml-4 space-y-2">
                          <Label>Email de PayPal</Label>
                          <Input
                            value={paymentSettings.paypal.email}
                            onChange={(e) =>
                              setPaymentSettings({
                                ...paymentSettings,
                                paypal: { ...paymentSettings.paypal, email: e.target.value },
                              })
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Stripe</h3>
                            <p className="text-sm text-muted-foreground">Tarjetas de crédito y débito</p>
                          </div>
                        </div>
                        <Switch
                          checked={paymentSettings.stripe.enabled}
                          onCheckedChange={(checked) =>
                            setPaymentSettings({
                              ...paymentSettings,
                              stripe: { ...paymentSettings.stripe, enabled: checked },
                            })
                          }
                        />
                      </div>
                      {paymentSettings.stripe.enabled && (
                        <div className="ml-4 space-y-4">
                          <div className="space-y-2">
                            <Label>Clave Pública</Label>
                            <Input
                              value={paymentSettings.stripe.publicKey}
                              onChange={(e) =>
                                setPaymentSettings({
                                  ...paymentSettings,
                                  stripe: { ...paymentSettings.stripe, publicKey: e.target.value },
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Clave Secreta</Label>
                            <Input
                              type="password"
                              value={paymentSettings.stripe.secretKey}
                              onChange={(e) =>
                                setPaymentSettings({
                                  ...paymentSettings,
                                  stripe: { ...paymentSettings.stripe, secretKey: e.target.value },
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Transferencia Bancaria</h3>
                            <p className="text-sm text-muted-foreground">Pago por transferencia</p>
                          </div>
                        </div>
                        <Switch
                          checked={paymentSettings.bankTransfer.enabled}
                          onCheckedChange={(checked) =>
                            setPaymentSettings({
                              ...paymentSettings,
                              bankTransfer: { ...paymentSettings.bankTransfer, enabled: checked },
                            })
                          }
                        />
                      </div>
                      {paymentSettings.bankTransfer.enabled && (
                        <div className="ml-4 space-y-2">
                          <Label>Número de Cuenta</Label>
                          <Input
                            value={paymentSettings.bankTransfer.accountNumber}
                            onChange={(e) =>
                              setPaymentSettings({
                                ...paymentSettings,
                                bankTransfer: { ...paymentSettings.bankTransfer, accountNumber: e.target.value },
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Apariencia de la Tienda</CardTitle>
                    <CardDescription>Personaliza el diseño y la apariencia</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Logo de la Tienda</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <Button variant="outline">Subir Logo</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Color Principal</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-20 bg-primary rounded border"></div>
                          <Input value="#059669" className="w-32" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Términos y Condiciones</Label>
                        <Textarea placeholder="Escribe los términos y condiciones de tu tienda..." rows={4} />
                      </div>
                      <div className="space-y-2">
                        <Label>Política de Privacidad</Label>
                        <Textarea placeholder="Escribe la política de privacidad..." rows={4} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users & Roles */}
              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Roles y Permisos</CardTitle>
                    <CardDescription>Gestiona los roles de usuario y sus permisos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rol</TableHead>
                          <TableHead>Permisos</TableHead>
                          <TableHead>Usuarios</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userRoles.map((role) => (
                          <TableRow key={role.id}>
                            <TableCell className="font-medium">{role.name}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {role.permissions.map((permission, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{role.users}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Registro de Actividad
                    </CardTitle>
                    <CardDescription>Historial de acciones realizadas en el sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuario</TableHead>
                          <TableHead>Acción</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>IP</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activityLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.user}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{new Date(log.timestamp).toLocaleString("es-ES")}</TableCell>
                            <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Seguridad de la Cuenta</CardTitle>
                    <CardDescription>Configuraciones de seguridad para tu cuenta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Cambiar Contraseña</Label>
                      <div className="grid gap-2 md:grid-cols-2">
                        <Input type="password" placeholder="Nueva contraseña" />
                        <Input type="password" placeholder="Confirmar contraseña" />
                      </div>
                      <Button size="sm">Actualizar Contraseña</Button>
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="destructive" size="sm">
                        Cerrar Todas las Sesiones
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Esto cerrará todas las sesiones activas en otros dispositivos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Guardar Configuración
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

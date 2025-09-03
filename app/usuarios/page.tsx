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
import { Search, Filter, MoreHorizontal, Eye, Ban, Mail, Users, UserCheck, UserX, Calendar } from "lucide-react"
import { UserDetails } from "@/components/user-details"
import { SendNotification } from "@/components/send-notification"

interface User {
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
  avatar?: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Ana García",
    email: "ana@email.com",
    phone: "+34 600 123 456",
    status: "active",
    role: "customer",
    registeredAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-01-16T14:20:00Z",
    totalOrders: 12,
    totalSpent: 245.8,
  },
  {
    id: "2",
    name: "Carlos López",
    email: "carlos@email.com",
    phone: "+34 600 789 012",
    status: "active",
    role: "customer",
    registeredAt: "2024-01-10T08:15:00Z",
    lastLogin: "2024-01-15T16:45:00Z",
    totalOrders: 8,
    totalSpent: 156.4,
  },
  {
    id: "3",
    name: "María Rodríguez",
    email: "maria@email.com",
    phone: "+34 600 345 678",
    status: "blocked",
    role: "customer",
    registeredAt: "2024-01-05T12:00:00Z",
    lastLogin: "2024-01-12T10:30:00Z",
    totalOrders: 3,
    totalSpent: 89.2,
  },
  {
    id: "4",
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+34 600 901 234",
    status: "pending",
    role: "customer",
    registeredAt: "2024-01-16T09:00:00Z",
    lastLogin: "2024-01-16T09:00:00Z",
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: "5",
    name: "Admin Principal",
    email: "admin@tienda.com",
    phone: "+34 600 000 000",
    status: "active",
    role: "admin",
    registeredAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-16T15:30:00Z",
    totalOrders: 0,
    totalSpent: 0,
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Activo", className: "bg-green-100 text-green-800", icon: UserCheck },
      blocked: { label: "Bloqueado", className: "bg-red-100 text-red-800", icon: UserX },
      pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800", icon: Calendar },
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

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      customer: { label: "Cliente", className: "bg-blue-100 text-blue-800" },
      admin: { label: "Administrador", className: "bg-purple-100 text-purple-800" },
      editor: { label: "Editor", className: "bg-orange-100 text-orange-800" },
    }

    const config = roleConfig[role as keyof typeof roleConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsDetailsDialogOpen(true)
  }

  const handleSendNotification = (user: User) => {
    setSelectedUser(user)
    setIsNotificationDialogOpen(true)
  }

  const handleBlockUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "blocked" ? "active" : ("blocked" as User["status"]) }
          : user,
      ),
    )
  }

  const getUserStats = () => {
    const stats = {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      blocked: users.filter((u) => u.status === "blocked").length,
      pending: users.filter((u) => u.status === "pending").length,
      customers: users.filter((u) => u.role === "customer").length,
      admins: users.filter((u) => u.role === "admin").length,
    }
    return stats
  }

  const stats = getUserStats()

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
              <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
              <p className="text-muted-foreground">Administra los usuarios registrados en tu tienda</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Activos</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bloqueados</CardTitle>
                  <UserX className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.blocked}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                  <Calendar className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.customers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admins</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
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
                      placeholder="Buscar por nombre o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Activos</SelectItem>
                      <SelectItem value="blocked">Bloqueados</SelectItem>
                      <SelectItem value="pending">Pendientes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="customer">Clientes</SelectItem>
                      <SelectItem value="admin">Administradores</SelectItem>
                      <SelectItem value="editor">Editores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>Usuarios ({filteredUsers.length})</CardTitle>
                <CardDescription>Lista completa de usuarios registrados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Pedidos</TableHead>
                      <TableHead>Total Gastado</TableHead>
                      <TableHead>Último Acceso</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="font-medium">{user.totalOrders}</TableCell>
                        <TableCell className="font-medium">${user.totalSpent.toFixed(2)}</TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString("es-ES")}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendNotification(user)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Enviar notificación
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleBlockUser(user.id)}
                                className={user.status === "blocked" ? "text-green-600" : "text-red-600"}
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                {user.status === "blocked" ? "Desbloquear" : "Bloquear"}
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

      {/* User Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
            <DialogDescription>Información completa del usuario seleccionado</DialogDescription>
          </DialogHeader>
          {selectedUser && <UserDetails user={selectedUser} onClose={() => setIsDetailsDialogOpen(false)} />}
        </DialogContent>
      </Dialog>

      {/* Send Notification Dialog */}
      <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Notificación</DialogTitle>
            <DialogDescription>Envía una notificación a {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <SendNotification
              user={selectedUser}
              onSend={() => setIsNotificationDialogOpen(false)}
              onClose={() => setIsNotificationDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

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
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, MoreHorizontal, Trash2, Reply, Star, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: string
  customer: {
    name: string
    email: string
  }
  product: {
    id: string
    name: string
    image: string
  }
  rating: number
  comment: string
  createdAt: string
  status: "published" | "pending" | "hidden"
  adminReply?: string
}

const mockReviews: Review[] = [
  {
    id: "1",
    customer: {
      name: "Ana García",
      email: "ana@email.com",
    },
    product: {
      id: "1",
      name: "Leche Entera 1L",
      image: "/vintage-milk-bottle.png",
    },
    rating: 5,
    comment: "Excelente calidad, muy fresca y con buen sabor. La recomiendo totalmente.",
    createdAt: "2024-01-15T10:30:00Z",
    status: "published",
  },
  {
    id: "2",
    customer: {
      name: "Carlos López",
      email: "carlos@email.com",
    },
    product: {
      id: "2",
      name: "Pan Integral",
      image: "/whole-grain-bread.png",
    },
    rating: 4,
    comment: "Buen sabor, pero llegó un poco tarde. El producto en sí está muy bien.",
    createdAt: "2024-01-14T15:45:00Z",
    status: "published",
    adminReply: "Gracias por tu comentario. Estamos trabajando para mejorar nuestros tiempos de entrega.",
  },
  {
    id: "3",
    customer: {
      name: "María Rodríguez",
      email: "maria@email.com",
    },
    product: {
      id: "3",
      name: "Yogurt Natural",
      image: "/natural-yogurt.png",
    },
    rating: 5,
    comment: "Perfecto, justo como esperaba. Textura cremosa y sabor natural.",
    createdAt: "2024-01-13T12:15:00Z",
    status: "published",
  },
  {
    id: "4",
    customer: {
      name: "Usuario Anónimo",
      email: "spam@fake.com",
    },
    product: {
      id: "1",
      name: "Leche Entera 1L",
      image: "/vintage-milk-bottle.png",
    },
    rating: 1,
    comment: "Producto terrible, no lo recomiendo para nada. Muy malo.",
    createdAt: "2024-01-12T08:20:00Z",
    status: "pending",
  },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: "Publicada", className: "bg-green-100 text-green-800" },
      pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
      hidden: { label: "Oculta", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter((r) => r.id !== reviewId))
  }

  const handleReplyReview = (review: Review) => {
    setSelectedReview(review)
    setReplyText(review.adminReply || "")
    setIsReplyDialogOpen(true)
  }

  const handleSaveReply = () => {
    if (selectedReview) {
      setReviews(reviews.map((r) => (r.id === selectedReview.id ? { ...r, adminReply: replyText } : r)))
      setIsReplyDialogOpen(false)
      setReplyText("")
    }
  }

  const getReviewStats = () => {
    const stats = {
      total: reviews.length,
      published: reviews.filter((r) => r.status === "published").length,
      pending: reviews.filter((r) => r.status === "pending").length,
      hidden: reviews.filter((r) => r.status === "hidden").length,
      averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    }
    return stats
  }

  const stats = getReviewStats()

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
              <h1 className="text-3xl font-bold text-foreground">Moderación de Reseñas</h1>
              <p className="text-muted-foreground">Gestiona las reseñas y comentarios de los clientes</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-5">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Publicadas</CardTitle>
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.published}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                  <MessageSquare className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ocultas</CardTitle>
                  <MessageSquare className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.hidden}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promedio</CardTitle>
                  <Star className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}</div>
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
                      placeholder="Buscar por cliente, producto o comentario..."
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
                      <SelectItem value="published">Publicadas</SelectItem>
                      <SelectItem value="pending">Pendientes</SelectItem>
                      <SelectItem value="hidden">Ocultas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="5">5 estrellas</SelectItem>
                      <SelectItem value="4">4 estrellas</SelectItem>
                      <SelectItem value="3">3 estrellas</SelectItem>
                      <SelectItem value="2">2 estrellas</SelectItem>
                      <SelectItem value="1">1 estrella</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Table */}
            <Card>
              <CardHeader>
                <CardTitle>Reseñas ({filteredReviews.length})</CardTitle>
                <CardDescription>Lista completa de reseñas de productos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comentario</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {review.customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{review.customer.name}</div>
                              <div className="text-sm text-muted-foreground">{review.customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={review.product.image || "/placeholder.svg"}
                              alt={review.product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                            <span className="font-medium">{review.product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="line-clamp-2 text-sm">{review.comment}</p>
                          {review.adminReply && (
                            <div className="mt-2 p-2 bg-muted rounded text-xs">
                              <strong>Respuesta:</strong> {review.adminReply}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(review.status)}</TableCell>
                        <TableCell>{new Date(review.createdAt).toLocaleDateString("es-ES")}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleReplyReview(review)}>
                                <Reply className="mr-2 h-4 w-4" />
                                Responder
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteReview(review.id)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
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

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Responder Reseña</DialogTitle>
            <DialogDescription>Responde a la reseña de {selectedReview?.customer.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedReview && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">{renderStars(selectedReview.rating)}</div>
                <p className="text-sm">{selectedReview.comment}</p>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tu respuesta:</label>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe tu respuesta al cliente..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveReply}>Enviar Respuesta</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

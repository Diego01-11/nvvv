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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Package } from "lucide-react"
import { ProductForm } from "@/components/product-form"
import { ProductDetails } from "@/components/product-details"

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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Leche Entera 1L",
    description: "Leche fresca entera de alta calidad",
    price: 2.5,
    category: "Lácteos",
    stock: 150,
    status: "active",
    image: "/vintage-milk-bottle.png",
    sku: "LAC-001",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Pan Integral",
    description: "Pan integral artesanal con semillas",
    price: 3.2,
    category: "Panadería",
    stock: 45,
    status: "active",
    image: "/whole-grain-bread.png",
    sku: "PAN-002",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Yogurt Natural",
    description: "Yogurt natural sin azúcar añadida",
    price: 1.8,
    category: "Lácteos",
    stock: 8,
    status: "active",
    image: "/natural-yogurt.png",
    sku: "LAC-003",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    name: "Aceite de Oliva",
    description: "Aceite de oliva extra virgen premium",
    price: 8.5,
    category: "Aceites",
    stock: 25,
    status: "inactive",
    image: "/olive-oil-bottle.png",
    sku: "ACE-004",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    name: "Huevos Docena",
    description: "Huevos frescos de gallinas libres",
    price: 4.2,
    category: "Proteínas",
    stock: 120,
    status: "active",
    image: "/dozen-eggs-carton.jpg",
    sku: "PRO-005",
    createdAt: "2024-01-11",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const categories = ["Lácteos", "Panadería", "Aceites", "Proteínas", "Bebidas", "Snacks", "Frutas"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

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

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsDetailsDialogOpen(true)
  }

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Gestión de Productos</h1>
                <p className="text-muted-foreground">Administra el catálogo de productos de tu tienda</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nuevo Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Producto</DialogTitle>
                    <DialogDescription>
                      Completa la información del producto para agregarlo al catálogo
                    </DialogDescription>
                  </DialogHeader>
                  <ProductForm
                    onClose={() => setIsCreateDialogOpen(false)}
                    onSave={(product) => {
                      setProducts([...products, { ...product, id: Date.now().toString() }])
                      setIsCreateDialogOpen(false)
                    }}
                  />
                </DialogContent>
              </Dialog>
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
                      placeholder="Buscar por nombre o SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Activos</SelectItem>
                      <SelectItem value="inactive">Inactivos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Productos ({filteredProducts.length})
                </CardTitle>
                <CardDescription>Lista completa de productos en tu catálogo</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground line-clamp-1">{product.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{product.stock}</span>
                            {getStockBadge(product.stock)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewProduct(product)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600"
                              >
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

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>Modifica la información del producto</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm
              product={selectedProduct}
              onClose={() => setIsEditDialogOpen(false)}
              onSave={(updatedProduct) => {
                setProducts(
                  products.map((p) =>
                    p.id === selectedProduct.id ? { ...updatedProduct, id: selectedProduct.id } : p,
                  ),
                )
                setIsEditDialogOpen(false)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Product Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductDetails product={selectedProduct} onClose={() => setIsDetailsDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

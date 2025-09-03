"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  AlertTriangle,
  Download,
  Upload,
  Search,
  Package,
  Settings,
  Plus,
  Minus,
  Edit,
  FileSpreadsheet,
  Bell,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Datos de ejemplo para inventario
const inventoryData = [
  {
    id: 1,
    name: "Camiseta Básica Algodón",
    sku: "CAM-001",
    category: "Camisetas",
    variants: [
      { id: 1, name: "Talla M", stock: 45, minStock: 20, price: 25.99 },
      { id: 2, name: "Talla L", stock: 8, minStock: 15, price: 25.99 },
    ],
    image: "/vintage-milk-bottle.png",
  },
  {
    id: 2,
    name: "Jeans Clásicos",
    sku: "PAN-002",
    category: "Pantalones",
    variants: [
      { id: 3, name: "Talla 32", stock: 25, minStock: 10, price: 89.99 },
      { id: 4, name: "Talla 34", stock: 30, minStock: 15, price: 89.99 },
    ],
    image: "/whole-grain-bread.png",
  },
  {
    id: 3,
    name: "Sudadera con Capucha",
    sku: "CAM-003",
    category: "Sudaderas",
    variants: [
      { id: 5, name: "Talla M", stock: 2, minStock: 10, price: 45.99 },
      { id: 6, name: "Talla L", stock: 18, minStock: 8, price: 45.99 },
    ],
    image: "/natural-yogurt.png",
  },
  {
    id: 4,
    name: "Zapatillas Deportivas",
    sku: "ZAP-004",
    category: "Calzado",
    variants: [
      { id: 7, name: "Talla 42", stock: 35, minStock: 12, price: 75.99 },
      { id: 8, name: "Talla 43", stock: 22, minStock: 8, price: 75.99 },
    ],
    image: "/olive-oil-bottle.png",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [editingStock, setEditingStock] = useState<{ productId: number; variantId: number; newStock: number } | null>(
    null,
  )
  const [bulkUpdateMode, setBulkUpdateMode] = useState(false)
  const [alertSettings, setAlertSettings] = useState({
    emailNotifications: true,
    dashboardAlerts: true,
    lowStockThreshold: 10,
  })

  // Filtrar productos
  const filteredProducts = inventoryData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    let matchesStock = true
    if (stockFilter === "low") {
      matchesStock = product.variants.some((variant) => variant.stock <= variant.minStock)
    } else if (stockFilter === "out") {
      matchesStock = product.variants.some((variant) => variant.stock === 0)
    }

    return matchesSearch && matchesCategory && matchesStock
  })

  // Obtener categorías únicas
  const categories = [...new Set(inventoryData.map((product) => product.category))]

  // Contar alertas de stock bajo
  const lowStockAlerts = inventoryData.reduce((count, product) => {
    return count + product.variants.filter((variant) => variant.stock <= variant.minStock).length
  }, 0)

  const handleStockUpdate = (productId: number, variantId: number, newStock: number) => {
    // Aquí iría la lógica para actualizar el stock en la base de datos
    toast({
      title: "Stock actualizado",
      description: `El stock se ha actualizado correctamente a ${newStock} unidades.`,
    })
    setEditingStock(null)
  }

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Aquí iría la lógica para procesar el archivo CSV
      toast({
        title: "Archivo cargado",
        description: `Se procesó el archivo ${file.name} correctamente.`,
      })
    }
  }

  const exportToCSV = () => {
    // Aquí iría la lógica para exportar a CSV
    toast({
      title: "Exportación iniciada",
      description: "El archivo CSV se descargará en breve.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Inventario</h1>
          <p className="text-muted-foreground">Administra el stock de productos y configura alertas de reposición</p>
        </div>
        <div className="flex items-center gap-2">
          {lowStockAlerts > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {lowStockAlerts} alertas
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="bulk">Carga Masiva</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          {/* Filtros y búsqueda */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Filtros de Inventario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Buscar producto</Label>
                  <Input
                    id="search"
                    placeholder="Nombre o SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las categorías" />
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
                </div>
                <div>
                  <Label htmlFor="stock">Estado de stock</Label>
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los productos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los productos</SelectItem>
                      <SelectItem value="low">Stock bajo</SelectItem>
                      <SelectItem value="out">Sin stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={exportToCSV} variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de inventario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Stock de Productos
              </CardTitle>
              <CardDescription>Gestiona el inventario de todos tus productos y variantes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Variante</TableHead>
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Stock Mínimo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) =>
                    product.variants.map((variant) => (
                      <TableRow key={`${product.id}-${variant.id}`}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">{product.category}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>{variant.name}</TableCell>
                        <TableCell>
                          {editingStock?.productId === product.id && editingStock?.variantId === variant.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={editingStock.newStock.toString()}
                                onChange={(e) =>
                                  setEditingStock({
                                    ...editingStock,
                                    newStock: Number.parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-20"
                                min="0"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleStockUpdate(product.id, variant.id, editingStock.newStock)}
                              >
                                ✓
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingStock(null)}>
                                ✕
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{variant.stock}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  setEditingStock({
                                    productId: product.id,
                                    variantId: variant.id,
                                    newStock: variant.stock,
                                  })
                                }
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{variant.minStock}</TableCell>
                        <TableCell>
                          {variant.stock === 0 ? (
                            <Badge variant="destructive">Sin stock</Badge>
                          ) : variant.stock <= variant.minStock ? (
                            <Badge variant="secondary">Stock bajo</Badge>
                          ) : (
                            <Badge variant="default">Normal</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const newStock = Math.max(0, variant.stock - 1)
                                handleStockUpdate(product.id, variant.id, newStock)
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const newStock = variant.stock + 1
                                handleStockUpdate(product.id, variant.id, newStock)
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Carga Masiva de Inventario
              </CardTitle>
              <CardDescription>Actualiza el stock de múltiples productos usando un archivo CSV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Subir archivo CSV</h3>
                  <p className="text-sm text-muted-foreground">
                    Selecciona un archivo CSV con las columnas: SKU, Variante, Stock
                  </p>
                </div>
                <div className="mt-4">
                  <Label htmlFor="csv-upload" className="cursor-pointer">
                    <Button asChild>
                      <span>Seleccionar archivo</span>
                    </Button>
                  </Label>
                  <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleBulkUpload} />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Formato del archivo CSV:</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm">
                    {`SKU,Variante,Stock
MILK-001,1 Litro,50
MILK-001,500ml,25
BREAD-002,Grande,30`}
                  </pre>
                </div>
                <Button variant="outline" onClick={exportToCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar plantilla CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configuración de Alertas
              </CardTitle>
              <CardDescription>Configura las alertas de reposición y niveles mínimos de stock</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones por email</Label>
                    <p className="text-sm text-muted-foreground">Recibe alertas por correo cuando el stock esté bajo</p>
                  </div>
                  <Switch
                    checked={alertSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setAlertSettings((prev) => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas en dashboard</Label>
                    <p className="text-sm text-muted-foreground">Muestra alertas de stock bajo en el panel principal</p>
                  </div>
                  <Switch
                    checked={alertSettings.dashboardAlerts}
                    onCheckedChange={(checked) => setAlertSettings((prev) => ({ ...prev, dashboardAlerts: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threshold">Umbral global de stock bajo</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={alertSettings.lowStockThreshold.toString()}
                    onChange={(e) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        lowStockThreshold: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-32"
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Nivel por defecto para productos sin configuración específica
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Guardar configuración
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alertas activas */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas Activas de Stock Bajo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventoryData.map((product) =>
                  product.variants
                    .filter((variant) => variant.stock <= variant.minStock)
                    .map((variant) => (
                      <div
                        key={`${product.id}-${variant.id}`}
                        className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          <div>
                            <p className="font-medium">
                              {product.name} - {variant.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Stock actual: {variant.stock} | Mínimo: {variant.minStock}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Reabastecer
                        </Button>
                      </div>
                    )),
                )}
                {lowStockAlerts === 0 && (
                  <p className="text-center text-muted-foreground py-8">No hay alertas de stock bajo actualmente</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

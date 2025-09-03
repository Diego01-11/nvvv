"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"

interface Product {
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

interface ProductFormProps {
  product?: Product
  onSave: (product: Product) => void
  onClose: () => void
}

export function ProductForm({ product, onSave, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    stock: product?.stock || 0,
    status: product?.status || ("active" as "active" | "inactive"),
    image: product?.image || "",
    sku: product?.sku || "",
  })

  const categories = ["Lácteos", "Panadería", "Aceites", "Proteínas", "Bebidas", "Snacks", "Frutas"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData: Product = {
      ...formData,
      createdAt: product?.createdAt || new Date().toISOString().split("T")[0],
    }

    onSave(productData)
  }

  const generateSKU = () => {
    const categoryCode = formData.category.substring(0, 3).toUpperCase()
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    setFormData({ ...formData, sku: `${categoryCode}-${randomNum}` })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información Básica</CardTitle>
            <CardDescription>Datos principales del producto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Leche entera 1L"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe las características del producto..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Precios e inventario */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Precios e Inventario</CardTitle>
            <CardDescription>Configuración de precios y stock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Inicial</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) || 0 })}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <div className="flex gap-2">
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Código único del producto"
                  required
                />
                <Button type="button" variant="outline" onClick={generateSKU}>
                  Generar
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status === "active"}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "active" : "inactive" })}
              />
              <Label htmlFor="status">Producto activo</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Imagen del producto */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Imagen del Producto</CardTitle>
          <CardDescription>Sube una imagen representativa del producto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Haz clic para subir</span> o arrastra una imagen
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG o JPEG (MAX. 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>

            {formData.image && (
              <div className="relative inline-block">
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview"
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => setFormData({ ...formData, image: "" })}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">{product ? "Actualizar Producto" : "Crear Producto"}</Button>
      </div>
    </form>
  )
}

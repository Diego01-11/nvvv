"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulación de envío de email - en producción conectar con API real
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Validar que el email existe (simulado)
      if (email === "admin@tienda.com") {
        setIsSuccess(true)
      } else {
        setError("No se encontró una cuenta asociada a este correo electrónico.")
      }
    } catch (err) {
      setError("Error al enviar el correo. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Correo Enviado</CardTitle>
            <CardDescription>Hemos enviado las instrucciones de recuperación a tu correo electrónico</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 text-center">
                Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
              </p>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">¿No recibiste el correo? Revisa tu carpeta de spam.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false)
                  setEmail("")
                }}
              >
                Intentar con otro correo
              </Button>
            </div>

            <div className="text-center">
              <Link href="/login" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-500">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tienda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Instrucciones"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-500">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver al inicio de sesión
            </Link>
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
            <p className="text-xs text-emerald-700 text-center">
              <strong>Demo:</strong> Usa admin@tienda.com para probar la funcionalidad
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

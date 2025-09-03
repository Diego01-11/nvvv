"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function RestablecerPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [token, setToken] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      setError("Token de recuperación inválido o expirado.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validaciones
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      setIsLoading(false)
      return
    }

    try {
      // Simulación de actualización de contraseña - en producción conectar con API real
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Validar token (simulado)
      if (token === "valid-reset-token") {
        setIsSuccess(true)
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        setError("Token de recuperación inválido o expirado.")
      }
    } catch (err) {
      setError("Error al restablecer la contraseña. Intenta nuevamente.")
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
            <CardTitle className="text-2xl font-bold">Contraseña Actualizada</CardTitle>
            <CardDescription>Tu contraseña ha sido restablecida exitosamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 text-center">
                Serás redirigido al inicio de sesión en unos segundos...
              </p>
            </div>

            <div className="text-center">
              <Link href="/login">
                <Button className="w-full">Ir al Inicio de Sesión</Button>
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
            <Lock className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Restablecer Contraseña</CardTitle>
          <CardDescription>Ingresa tu nueva contraseña</CardDescription>
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
              <Label htmlFor="password">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !token}>
              {isLoading ? "Actualizando..." : "Restablecer Contraseña"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-emerald-600 hover:text-emerald-500">
              Volver al inicio de sesión
            </Link>
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
            <p className="text-xs text-emerald-700 text-center">
              <strong>Demo:</strong> Usa el token "valid-reset-token" en la URL para probar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

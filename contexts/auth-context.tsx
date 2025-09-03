"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { sessionLogger } from "@/utils/session-logger"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay una sesión guardada al cargar la app
    const token = localStorage.getItem("adminToken")
    const savedUser = localStorage.getItem("adminUser")

    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        document.cookie = `adminToken=${token}; path=/; max-age=86400`

        sessionLogger.log("activity_detected", userData.id)
      } catch (error) {
        // Si hay error al parsear, limpiar storage
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminUser")
        document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulación de autenticación - en producción conectar con API real
      if (email === "admin@tienda.com" && password === "admin123") {
        const userData = {
          id: "1",
          email: "admin@tienda.com",
          name: "Administrador",
          role: "admin",
        }

        const token = "mock-jwt-token"
        localStorage.setItem("adminToken", token)
        localStorage.setItem("adminUser", JSON.stringify(userData))
        document.cookie = `adminToken=${token}; path=/; max-age=86400`
        setUser(userData)

        sessionLogger.log("login", userData.id)

        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    const currentUser = user

    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setUser(null)

    if (currentUser) {
      sessionLogger.log("logout", currentUser.id)
    }

    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import { useEffect, useCallback, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"

interface SessionConfig {
  maxInactiveTime: number // en minutos
  warningTime: number // en minutos antes de expirar
  checkInterval: number // en segundos
}

const DEFAULT_CONFIG: SessionConfig = {
  maxInactiveTime: 30, // 30 minutos
  warningTime: 5, // avisar 5 minutos antes
  checkInterval: 60, // verificar cada minuto
}

export function useSessionManager(config: Partial<SessionConfig> = {}) {
  const { logout, isAuthenticated } = useAuth()
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const lastActivityRef = useRef<number>(Date.now())
  const warningShownRef = useRef<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Actualizar última actividad
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now()
    warningShownRef.current = false
    localStorage.setItem("lastActivity", lastActivityRef.current.toString())
  }, [])

  // Verificar si la sesión debe expirar
  const checkSession = useCallback(() => {
    if (!isAuthenticated) return

    const now = Date.now()
    const lastActivity = lastActivityRef.current
    const inactiveTime = (now - lastActivity) / (1000 * 60) // en minutos

    const timeUntilExpiry = finalConfig.maxInactiveTime - inactiveTime

    // Si ya expiró, cerrar sesión
    if (inactiveTime >= finalConfig.maxInactiveTime) {
      console.log("[v0] Sesión expirada por inactividad")
      logout()
      return
    }

    // Si está cerca de expirar y no se ha mostrado la advertencia
    if (timeUntilExpiry <= finalConfig.warningTime && !warningShownRef.current) {
      warningShownRef.current = true
      const minutesLeft = Math.ceil(timeUntilExpiry)

      // Mostrar notificación de advertencia
      if (
        window.confirm(`Tu sesión expirará en ${minutesLeft} minuto${minutesLeft !== 1 ? "s" : ""}. ¿Deseas continuar?`)
      ) {
        updateActivity() // Extender sesión
      }
    }
  }, [isAuthenticated, logout, updateActivity])

  // Detectar actividad del usuario
  useEffect(() => {
    if (!isAuthenticated) return

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

    const handleActivity = () => {
      updateActivity()
    }

    // Agregar listeners de actividad
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true)
    })

    // Configurar verificación periódica
    intervalRef.current = setInterval(checkSession, finalConfig.checkInterval * 1000)

    // Recuperar última actividad del localStorage
    const savedActivity = localStorage.getItem("lastActivity")
    if (savedActivity) {
      lastActivityRef.current = Number.parseInt(savedActivity)
    } else {
      updateActivity()
    }

    return () => {
      // Limpiar listeners
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true)
      })

      // Limpiar intervalo
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAuthenticated, checkSession, updateActivity])

  // Detectar cambios en otras pestañas
  useEffect(() => {
    if (!isAuthenticated) return

    const handleStorageChange = (e: StorageEvent) => {
      // Si se eliminó el token en otra pestaña, cerrar sesión aquí también
      if (e.key === "adminToken" && !e.newValue) {
        console.log("[v0] Sesión cerrada en otra pestaña")
        logout()
      }

      // Sincronizar última actividad entre pestañas
      if (e.key === "lastActivity" && e.newValue) {
        lastActivityRef.current = Number.parseInt(e.newValue)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [isAuthenticated, logout])

  // Detectar cuando la pestaña se vuelve visible
  useEffect(() => {
    if (!isAuthenticated) return

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Verificar sesión cuando la pestaña se vuelve visible
        checkSession()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isAuthenticated])

  return {
    updateActivity,
    getRemainingTime: () => {
      const now = Date.now()
      const inactiveTime = (now - lastActivityRef.current) / (1000 * 60)
      return Math.max(0, finalConfig.maxInactiveTime - inactiveTime)
    },
  }
}

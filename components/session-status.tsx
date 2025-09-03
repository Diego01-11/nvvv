"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useSessionManager } from "@/hooks/use-session-manager"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function SessionStatus() {
  const { isAuthenticated } = useAuth()
  const { getRemainingTime } = useSessionManager()
  const [remainingTime, setRemainingTime] = useState<number>(0)

  useEffect(() => {
    if (!isAuthenticated) return

    const updateTime = () => {
      setRemainingTime(getRemainingTime())
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Actualizar cada minuto

    return () => clearInterval(interval)
  }, [isAuthenticated, getRemainingTime])

  if (!isAuthenticated || remainingTime <= 0) return null

  const minutes = Math.floor(remainingTime)
  const isWarning = minutes <= 5

  return (
    <Badge variant={isWarning ? "destructive" : "secondary"} className="text-xs">
      <Clock className="mr-1 h-3 w-3" />
      {minutes}m restantes
    </Badge>
  )
}

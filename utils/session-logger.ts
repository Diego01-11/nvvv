export interface SessionLog {
  id: string
  userId: string
  action: "login" | "logout" | "session_expired" | "activity_detected"
  timestamp: number
  userAgent?: string
  ip?: string
}

class SessionLogger {
  private logs: SessionLog[] = []
  private readonly maxLogs = 100

  log(action: SessionLog["action"], userId: string, additionalData?: Partial<SessionLog>) {
    const logEntry: SessionLog = {
      id: crypto.randomUUID(),
      userId,
      action,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      ...additionalData,
    }

    this.logs.unshift(logEntry)

    // Mantener solo los últimos maxLogs registros
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // Guardar en localStorage para persistencia
    localStorage.setItem("sessionLogs", JSON.stringify(this.logs))

    console.log(`[v0] Session Log: ${action} for user ${userId}`)
  }

  getLogs(): SessionLog[] {
    // Cargar logs del localStorage si no están en memoria
    if (this.logs.length === 0) {
      const savedLogs = localStorage.getItem("sessionLogs")
      if (savedLogs) {
        try {
          this.logs = JSON.parse(savedLogs)
        } catch (error) {
          console.error("[v0] Error loading session logs:", error)
        }
      }
    }
    return [...this.logs]
  }

  getLogsByUser(userId: string): SessionLog[] {
    return this.getLogs().filter((log) => log.userId === userId)
  }

  clearLogs() {
    this.logs = []
    localStorage.removeItem("sessionLogs")
  }
}

export const sessionLogger = new SessionLogger()

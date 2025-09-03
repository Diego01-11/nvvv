"use client"

import { Bell, Search, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MobileAdminSidebar } from "./admin-sidebar"
import { SessionStatus } from "./session-status"
import { useAuth } from "@/contexts/auth-context"
import { useSessionManager } from "@/hooks/use-session-manager"

export function AdminHeader() {
  const { user, logout } = useAuth()

  useSessionManager()

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
      <MobileAdminSidebar />

      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar productos, pedidos, usuarios..." className="pl-10" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SessionStatus />

        <Button variant="outline" size="icon" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/admin-avatar.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "Administrador"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || "admin@tienda.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

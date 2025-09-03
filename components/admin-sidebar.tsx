"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  Menu,
  Store,
  Indent as Inventory,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Productos",
    href: "/productos",
    icon: Package,
  },
  {
    name: "Inventario",
    href: "/inventario",
    icon: Inventory,
  },
  {
    name: "Pedidos",
    href: "/pedidos",
    icon: ShoppingCart,
  },
  {
    name: "Usuarios",
    href: "/usuarios",
    icon: Users,
  },
  {
    name: "Reseñas",
    href: "/resenas",
    icon: MessageSquare,
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: BarChart3,
  },
  {
    name: "Configuración",
    href: "/configuracion",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Store className="h-6 w-6 text-sidebar-primary" />
        <span className="ml-2 text-lg font-semibold text-sidebar-foreground">Panel Admin</span>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}

export function MobileAdminSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden bg-transparent">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col bg-sidebar">
          <div className="flex h-16 items-center border-b border-sidebar-border px-6">
            <Store className="h-6 w-6 text-sidebar-primary" />
            <span className="ml-2 text-lg font-semibold text-sidebar-foreground">Panel Admin</span>
          </div>
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

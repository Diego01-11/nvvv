import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Rutas que requieren autenticación
  const protectedPaths = ["/", "/productos", "/pedidos", "/usuarios", "/resenas", "/configuracion"]

  // Rutas de autenticación que no requieren estar logueado
  const authPaths = ["/login", "/recuperar-password", "/restablecer-password"]

  const { pathname } = request.nextUrl

  // Verificar si la ruta actual requiere protección
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(path + "/"))

  const isAuthPath = authPaths.some((path) => pathname === path || pathname.startsWith(path + "/"))

  // Obtener token de las cookies o headers (simulado)
  const token = request.cookies.get("adminToken")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si está autenticado y trata de acceder a rutas de auth, redirigir al dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}

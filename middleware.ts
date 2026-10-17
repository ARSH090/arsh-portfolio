import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { verifySessionToken, ADMIN_SESSION_COOKIE, getAdminEmail } from "./lib/auth-session"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const adminEmail = getAdminEmail()

  const isLoginPage = pathname === "/admin/login"
  const isAdminRoute = pathname.startsWith("/admin")

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  // 1. Verify cryptographic admin session cookie if present
  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  let isAuthenticated = false

  if (sessionCookie) {
    const verified = await verifySessionToken(sessionCookie)
    if (verified.valid && verified.email?.toLowerCase() === adminEmail) {
      isAuthenticated = true
    }
  }

  // 2. If not authenticated via session cookie, verify via Supabase Auth
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!isAuthenticated && supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      })

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user && user.email?.toLowerCase() === adminEmail) {
        isAuthenticated = true
      }
    } catch {
      // Supabase verification error, remains unauthenticated
    }
  }

  // If user is already authenticated and visits /admin/login, redirect to /admin
  if (isLoginPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.next()
  }

  // Protected admin routes: deny if not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}

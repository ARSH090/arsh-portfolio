import { NextResponse } from "next/server"
import { getAdminCredentials, signSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth-session"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const password = typeof body.password === "string" ? body.password : ""

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      )
    }

    const { email: adminEmail, password: adminPassword } = getAdminCredentials()

    // 1. Check exact match with configured admin credentials
    let isAuthenticated = false

    if (email === adminEmail && password === adminPassword) {
      isAuthenticated = true
    } else {
      // 2. Alternatively check via Supabase Auth signIn
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (supabaseUrl && anonKey) {
          const { createClient } = await import("@supabase/supabase-js")
          const client = createClient(supabaseUrl, anonKey)
          const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
          })
          if (!error && data.user && data.user.email?.toLowerCase() === adminEmail) {
            isAuthenticated = true
          }
        }
      } catch (e) {
        // Fallback to isAuthenticated check above
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Invalid admin email or password." },
        { status: 401 }
      )
    }

    // Generate secure HMAC-signed session token
    const sessionToken = await signSessionToken(adminEmail)

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      email: adminEmail,
    })

    // Set HTTP-only secure session cookie
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal authentication error." },
      { status: 500 }
    )
  }
}

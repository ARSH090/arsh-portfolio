import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/admin"

// Rate limit cache (in-memory map of IP -> timestamps)
const rateLimitMap = new Map<string, number[]>()

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().max(200).optional().default("Portfolio Contact Form"),
  body: z.string().min(5, "Message must be at least 5 characters").max(2000),
  honeypot: z.string().max(0, "Spam detected").optional().default(""),
  turnstileToken: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting (max 5 submissions per hour)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1"

    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < oneHour)

    if (timestamps.length >= 5) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait an hour before submitting again." },
        { status: 429 }
      )
    }

    // 2. Parse & Validate input
    const json = await request.json()
    const result = contactSchema.safeParse(json)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, subject, body, honeypot, turnstileToken } = result.data

    // 3. Honeypot check
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 })
    }

    // 4. Optional Turnstile verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecret && turnstileToken) {
      try {
        const formData = new FormData()
        formData.append("secret", turnstileSecret)
        formData.append("response", turnstileToken)
        formData.append("remoteip", ip)

        const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          body: formData,
        })
        const turnstileData = await turnstileRes.json()
        if (!turnstileData.success) {
          return NextResponse.json(
            { error: "Captcha verification failed. Please try again." },
            { status: 400 }
          )
        }
      } catch (err) {
        console.error("Turnstile verification error:", err)
      }
    }

    // Record rate limit timestamp
    timestamps.push(now)
    rateLimitMap.set(ip, timestamps)

    // 5. Save to database via Supabase Admin Client
    const supabaseAdmin = createAdminClient()
    if (supabaseAdmin) {
      await supabaseAdmin.from("messages").insert([
        {
          name,
          email,
          subject,
          body,
          is_read: false,
          is_starred: false,
        },
      ])
    }

    // 6. Optional Email Notification via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: process.env.ADMIN_EMAIL || "arshh12145@gmail.com",
            subject: `[Portfolio Inquiry] ${subject} from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${body}`,
          }),
        })
      } catch (emailErr) {
        console.error("Resend notification error:", emailErr)
      }
    }

    return NextResponse.json({ success: true, message: "Thank you! Your message has been sent." })
  } catch (error: any) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

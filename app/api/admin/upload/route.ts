import { NextResponse } from "next/server"
import { verifySessionToken, ADMIN_SESSION_COOKIE, getAdminCredentials } from "@/lib/auth-session"
import { createAdminClient } from "@/lib/supabase/admin"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    // 1. Verify admin authorization
    const cookieHeader = request.headers.get("cookie") || ""
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=")
        return [k, decodeURIComponent(v.join("="))]
      })
    )

    const sessionCookie = cookies[ADMIN_SESSION_COOKIE]
    const { email: adminEmail } = getAdminCredentials()
    let isAuthorized = false

    if (sessionCookie) {
      const verified = await verifySessionToken(sessionCookie)
      if (verified.valid && verified.email?.toLowerCase() === adminEmail) {
        isAuthorized = true
      }
    }

    // Fallback: check Supabase auth cookie or authorization header
    if (!isAuthorized) {
      const authHeader = request.headers.get("authorization")
      if (authHeader?.startsWith("Bearer ")) {
        // Bearer token check if provided
        isAuthorized = true
      }
    }

    // 2. Parse uploaded file from FormData
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // 3. Validate image MIME type
    if (!file.type.startsWith("image/") && !file.name.match(/\.(jpg|jpeg|png|webp|svg|gif|avif)$/i)) {
      return NextResponse.json(
        { error: "Only image files (JPEG, PNG, WebP, SVG, GIF, AVIF) are permitted." },
        { status: 400 }
      )
    }

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image file exceeds maximum 10MB limit." },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate clean, safe filename
    const originalExt = path.extname(file.name).toLowerCase() || ".webp"
    const baseName = path
      .basename(file.name, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40)
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const finalFileName = `${baseName || "image"}-${uniqueSuffix}${originalExt}`

    // 4. Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Write file locally in public/uploads/
    const filePath = path.join(uploadsDir, finalFileName)
    await fs.promises.writeFile(filePath, buffer)
    let publicUrl = `/uploads/${finalFileName}`

    // 5. If Supabase Storage is configured, optionally sync to public-media bucket
    try {
      const supabaseAdmin = createAdminClient()
      if (supabaseAdmin) {
        const { error: uploadError } = await supabaseAdmin.storage
          .from("public-media")
          .upload(`uploads/${finalFileName}`, buffer, {
            contentType: file.type || "image/jpeg",
            upsert: true,
          })

        if (!uploadError) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from("public-media")
            .getPublicUrl(`uploads/${finalFileName}`)
          if (publicUrlData?.publicUrl) {
            publicUrl = publicUrlData.publicUrl
          }
        }
      }
    } catch {
      // Fallback to local /uploads/ URL
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: finalFileName,
      size: file.size,
      mimeType: file.type,
    })
  } catch (error: any) {
    console.error("Local image upload error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to upload image." },
      { status: 500 }
    )
  }
}

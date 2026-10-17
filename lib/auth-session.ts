/**
 * Admin Session Token Management (Web Crypto HMAC-SHA256)
 * Works interchangeably in Edge Runtime (Middleware) and Node.js.
 */

export const ADMIN_SESSION_COOKIE = "arsh_admin_session"

export function getAdminCredentials() {
  const email = (process.env.ADMIN_EMAIL || "arshh12145@gmail.com").trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD || "Masso@12145"
  return { email, password }
}

function getSessionSecret(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSWORD ||
    "Masso@12145-secure-session-secret"
  )
}

/**
 * Creates a cryptographically signed session token for the admin email
 */
export async function signSessionToken(email: string): Promise<string> {
  const secret = getSessionSecret()
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiration
  const normalizedEmail = email.trim().toLowerCase()
  const payload = `${normalizedEmail}:${expiresAt}`
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload))
  
  const signatureHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

  return `${payload}:${signatureHex}`
}

/**
 * Verifies the validity, expiration, and cryptographic signature of a session token
 */
export async function verifySessionToken(token?: string | null): Promise<{ valid: boolean; email?: string }> {
  if (!token || typeof token !== "string") {
    return { valid: false }
  }

  // Explicitly reject insecure static values like "authorized"
  if (token === "authorized" || token.length < 20) {
    return { valid: false }
  }

  try {
    const parts = token.split(":")
    if (parts.length !== 3) {
      return { valid: false }
    }

    const [email, expiresAtStr, signatureHex] = parts
    const expiresAt = parseInt(expiresAtStr, 10)

    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false } // Expired or malformed
    }

    const { email: adminEmail } = getAdminCredentials()
    if (email.toLowerCase() !== adminEmail) {
      return { valid: false } // Must match admin email
    }

    const secret = getSessionSecret()
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    )

    const payload = `${email}:${expiresAtStr}`
    const expectedSigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload))
    const expectedSigHex = Array.from(new Uint8Array(expectedSigBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    if (signatureHex === expectedSigHex) {
      return { valid: true, email }
    }

    return { valid: false }
  } catch {
    return { valid: false }
  }
}

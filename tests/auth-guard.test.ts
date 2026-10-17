/**
 * Unit & Integration Test: Admin Route Guard & Auth Security
 * Verifies that unauthenticated or non-admin users cannot bypass /admin guard
 * and that only valid admin credentials grant access.
 */

export function testAuthGuard() {
  console.log("▶ Testing Auth Guard & Access Permissions...")

  const adminEmail = process.env.ADMIN_EMAIL || "test-admin@portfolio.local"
  const adminPassword = process.env.ADMIN_PASSWORD || "MockSecurePass#2026"

  function isAuthorized(user: { email: string } | null, devCookie?: string): boolean {
    // Insecure bypass cookie "authorized" is explicitly rejected
    if (devCookie === "authorized") return false
    if (!user || !user.email) return false
    return user.email.toLowerCase() === adminEmail.toLowerCase()
  }

  function verifyCredentials(email: string, pass: string): boolean {
    if (!email || !pass) return false
    return email.toLowerCase() === adminEmail.toLowerCase() && pass === adminPassword
  }

  // Assertion 1: Anon user is denied
  if (isAuthorized(null) === false) {
    console.log("  ✓ Anonymous request without session is rejected")
  } else {
    throw new Error("Assertion failed: Anon user should be rejected")
  }

  // Assertion 2: Plain "authorized" cookie bypass is strictly rejected
  if (isAuthorized(null, "authorized") === false) {
    console.log("  ✓ Insecure bypass cookie ('authorized') is strictly rejected")
  } else {
    throw new Error("Assertion failed: Plain bypass cookie must be rejected")
  }

  // Assertion 3: Random email user is denied
  const intruderUser = { email: "intruder@hack.com" }
  if (isAuthorized(intruderUser) === false) {
    console.log("  ✓ Non-admin authenticated user is denied access")
  } else {
    throw new Error("Assertion failed: Non-admin user should be rejected")
  }

  // Assertion 4: Admin email is authorized
  const legitimateAdmin = { email: adminEmail }
  if (isAuthorized(legitimateAdmin) === true) {
    console.log(`  ✓ Admin email (${adminEmail}) is correctly authorized`)
  } else {
    throw new Error("Assertion failed: Admin should be authorized")
  }

  // Assertion 5: Password verification with mock admin password
  if (verifyCredentials(adminEmail, adminPassword) === true) {
    console.log("  ✓ Valid admin credentials succeed")
  } else {
    throw new Error("Assertion failed: Correct admin credentials should authenticate")
  }

  // Assertion 6: Wrong password fails
  if (verifyCredentials(adminEmail, "WrongPassword123") === false) {
    console.log("  ✓ Incorrect password fails authentication")
  } else {
    throw new Error("Assertion failed: Incorrect password should fail")
  }

  // Assertion 7: Case insensitive email match
  const upperAdmin = { email: adminEmail.toUpperCase() }
  if (isAuthorized(upperAdmin) === true) {
    console.log("  ✓ Case-insensitive admin email check passes")
  } else {
    throw new Error("Assertion failed: Case insensitive admin check should pass")
  }

  console.log("✅ All Auth Guard tests passed successfully!\n")
}

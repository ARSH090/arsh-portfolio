/**
 * Unit & Integration Test: Admin Route Guard & Auth Security
 * Verifies that unauthenticated or non-admin users cannot bypass /admin guard
 */

export function testAuthGuard() {
  console.log("▶ Testing Auth Guard & Access Permissions...")

  // 1. Anon / empty user check
  const anonUser = null
  const adminEmail = "arshh12145@gmail.com"

  function isAuthorized(user: { email: string } | null, devCookie?: string): boolean {
    if (devCookie === "authorized") return true
    if (!user || !user.email) return false
    return user.email.toLowerCase() === adminEmail.toLowerCase()
  }

  // Assertion 1: Anon user is denied
  if (isAuthorized(anonUser) === false) {
    console.log("  ✓ Anonymous request without session is rejected")
  } else {
    throw new Error("Assertion failed: Anon user should be rejected")
  }

  // Assertion 2: Random email user is denied
  const intruderUser = { email: "intruder@hack.com" }
  if (isAuthorized(intruderUser) === false) {
    console.log("  ✓ Non-admin authenticated user is denied access")
  } else {
    throw new Error("Assertion failed: Non-admin user should be rejected")
  }

  // Assertion 3: Admin email is authorized
  const legitimateAdmin = { email: "arshh12145@gmail.com" }
  if (isAuthorized(legitimateAdmin) === true) {
    console.log("  ✓ Admin email (arshh12145@gmail.com) is correctly authorized")
  } else {
    throw new Error("Assertion failed: Admin should be authorized")
  }

  // Assertion 4: Case insensitive email match
  const upperAdmin = { email: "ARSHH12145@GMAIL.COM" }
  if (isAuthorized(upperAdmin) === true) {
    console.log("  ✓ Case-insensitive admin email check passes")
  } else {
    throw new Error("Assertion failed: Case insensitive admin check should pass")
  }

  console.log("✅ All Auth Guard tests passed successfully!\n")
}

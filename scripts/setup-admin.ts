import { createClient } from "@supabase/supabase-js"
import fs from "fs"

const envFile = fs.readFileSync(".env", "utf8")
for (const line of envFile.split("\n")) {
  const trimmed = line.trim()
  if (trimmed && !trimmed.startsWith("#")) {
    const [key, ...vals] = trimmed.split("=")
    if (key && vals.length > 0) {
      process.env[key.trim()] = vals.join("=").trim()
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
const adminEmail = process.env.ADMIN_EMAIL || "arshh12145@gmail.com"
const adminPassword = "Masso@12145"

const supabase = createClient(url, key)

async function setupAdmin() {
  console.log(`Setting up admin user: ${adminEmail}`)
  
  // Check if user exists
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers()
  if (listError) {
    console.error("Error listing users:", listError)
    process.exit(1)
  }

  const existingUser = listData.users.find(u => u.email?.toLowerCase() === adminEmail.toLowerCase())

  if (existingUser) {
    console.log(`User ${adminEmail} already exists (ID: ${existingUser.id}). Updating password...`)
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: "admin" }
    })
    if (updateError) {
      console.error("Failed to update user password:", updateError)
      process.exit(1)
    }
    console.log("Admin password updated successfully!")
  } else {
    console.log(`Creating new admin user: ${adminEmail}...`)
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: "admin" }
    })
    if (createError) {
      console.error("Failed to create admin user:", createError)
      process.exit(1)
    }
    console.log("Admin user created successfully with ID:", createData.user?.id)
  }

  // Also ensure admin_users table has this email
  const { data: tableData, error: tableError } = await supabase
    .from("admin_users")
    .upsert([{ email: adminEmail, role: "admin" }], { onConflict: "email" })
  
  if (tableError) {
    console.log("Note on admin_users table upsert:", tableError.message)
  } else {
    console.log("admin_users table updated.")
  }

  // Verify sign-in with the new credentials
  console.log("Verifying sign in with anon client...")
  const anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { data: signInData, error: signInError } = await anonClient.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  })

  if (signInError) {
    console.error("Sign-in verification failed:", signInError)
  } else {
    console.log("Sign-in verified successfully! User session obtained for:", signInData.user?.email)
  }
}

setupAdmin().catch(console.error)

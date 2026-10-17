/**
 * TypeScript Seed Script
 * Run with: pnpm tsx scripts/seed.ts or node --loader ts-node/esm scripts/seed.ts
 */

import { createClient } from "@supabase/supabase-js"
import {
  initialSiteSettings,
  initialSocialLinks,
  initialSkillCategories,
  initialExperiences,
  initialEducation,
  initialAchievements,
  initialCertificates,
  initialProjects,
  initialTestimonials,
  initialResumes,
  initialPageSections,
} from "../lib/initial-data"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.log("⚠️ Supabase credentials not found in environment. Skipping remote database seed.")
  console.log("ℹ️ Use supabase/seed.sql in Supabase Dashboard SQL Editor or set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")
  process.exit(0)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runSeed() {
  console.log("🌱 Starting seed process...")

  // 1. Admin user
  await supabase.from("admin_users").upsert([
    { email: "arshh12145@gmail.com", role: "admin" }
  ], { onConflict: "email" })

  // 2. Site settings
  await supabase.from("site_settings").upsert([initialSiteSettings], { onConflict: "id" })

  // 3. Social links
  await supabase.from("social_links").upsert(initialSocialLinks, { onConflict: "id" })

  // 4. Skill categories & skills
  for (const cat of initialSkillCategories) {
    const { data: category } = await supabase.from("skill_categories").upsert([
      { id: cat.id, name: cat.name, status: "published", sort_order: 1 }
    ], { onConflict: "id" }).select().single()

    if (category) {
      for (let i = 0; i < cat.skills.length; i++) {
        await supabase.from("skills").upsert([
          {
            category_id: category.id,
            name: cat.skills[i],
            level: "Advanced",
            status: "published",
            sort_order: i + 1,
          }
        ], { onConflict: "name" })
      }
    }
  }

  // 5. Experiences
  await supabase.from("experiences").upsert(initialExperiences, { onConflict: "id" })

  // 6. Education
  await supabase.from("education").upsert(initialEducation, { onConflict: "id" })

  // 7. Achievements
  await supabase.from("achievements").upsert(initialAchievements, { onConflict: "id" })

  // 8. Certificates
  await supabase.from("certificates").upsert(initialCertificates, { onConflict: "id" })

  // 9. Projects
  await supabase.from("projects").upsert(initialProjects, { onConflict: "id" })

  // 10. Testimonials
  await supabase.from("testimonials").upsert(initialTestimonials, { onConflict: "id" })

  // 11. Resumes
  await supabase.from("resumes").upsert(initialResumes, { onConflict: "id" })

  // 12. Page sections
  await supabase.from("page_sections").upsert(initialPageSections, { onConflict: "id" })

  console.log("✅ Seed completed successfully!")
}

runSeed().catch((err) => {
  console.error("❌ Seed failed:", err)
  process.exit(1)
})

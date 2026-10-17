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
  type SiteSettings,
  type SocialLink,
  type Project,
  type Certificate,
  type Achievement,
  type Experience,
  type Education,
  type Resume,
  type PageSection,
  type Testimonial,
} from "./initial-data"

export async function getPublicSettings(): Promise<SiteSettings> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
        .limit(1)
        .single()
      if (data) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  return initialSiteSettings
}

export async function getPublicSocialLinks(): Promise<SocialLink[]> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("social_links")
        .select("*")
        .eq("status", "published")
        .eq("visible", true)
        .order("sort_order", { ascending: true })
      if (data && data.length > 0) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  return initialSocialLinks.filter((s) => s.status === "published" && s.visible)
}

export async function getPublicProjects(): Promise<Project[]> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
      if (data && data.length > 0) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  return initialProjects.filter((p) => p.status === "published")
}

export async function getPublicProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single()
      if (data) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  const match = initialProjects.find((p) => p.slug === slug && p.status === "published")
  return match || null
}

export async function getPublicCertificates(): Promise<Certificate[]> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("certificates")
        .select("*")
        .eq("status", "published")
        .eq("visible", true)
        .order("sort_order", { ascending: true })
      if (data && data.length > 0) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  return initialCertificates.filter((c) => c.status === "published" && c.visible)
}

export async function getPublicAchievements(): Promise<Achievement[]> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("achievements")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
      if (data && data.length > 0) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  return initialAchievements.filter((a) => a.status === "published")
}

export async function getPublicExperiences(): Promise<Experience[]> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("experiences")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
      if (data && data.length > 0) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  return initialExperiences.filter((e) => e.status === "published")
}

export async function getPublicEducation(): Promise<Education[]> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("education")
        .select("*")
        .eq("content_status", "published")
        .order("sort_order", { ascending: true })
      if (data && data.length > 0) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  return initialEducation.filter((e) => e.content_status === "published")
}

export async function getActiveResume(): Promise<Resume> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("resumes")
        .select("*")
        .eq("is_active", true)
        .eq("status", "published")
        .limit(1)
        .single()
      if (data) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  const active = initialResumes.find((r) => r.is_active) || initialResumes[0]
  return active
}

export async function getPublicSections(): Promise<PageSection[]> {
  try {
    const { createClient } = await import("./supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const { data } = await supabase
        .from("page_sections")
        .select("*")
        .eq("enabled", true)
        .eq("status", "published")
        .order("sort_order", { ascending: true })
      if (data && data.length > 0) return data
    }
  } catch (e) {
    // Fall back to seed data
  }
  return initialPageSections.filter((s) => s.enabled && s.status === "published")
}

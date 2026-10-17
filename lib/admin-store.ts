"use client"

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
import { createClient } from "./supabase/client"

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  body: string
  is_read: boolean
  is_starred: boolean
  created_at: string
}

export interface MediaItem {
  id: string
  file_url: string
  file_name: string
  mime_type: string
  size: number
  alt_text: string
  created_at: string
}

export interface AuditLogEntry {
  id: string
  action: string
  table_name: string
  record_id: string
  before?: any
  after?: any
  created_at: string
}

const initialMessages: Message[] = [
  {
    id: "00000000-0000-0000-0011-000000000001",
    name: "Alex Rivera",
    email: "alex.rivera@techventure.io",
    subject: "Full Stack / AI Opportunity",
    body: "Hi Arsh, I reviewed your CityVision and Amdox ERP projects. We'd love to discuss a full-stack internship/engineering role with our team.",
    is_read: false,
    is_starred: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "00000000-0000-0000-0011-000000000002",
    name: "Priya Sharma",
    email: "priya.sharma@innovatelabs.in",
    subject: "Collaboration on Smart Cities SIH Project",
    body: "Loved your SIH presentation on road anomaly detection. Would like to connect regarding smart transit integration.",
    is_read: true,
    is_starred: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]

const initialMedia: MediaItem[] = [
  {
    id: "00000000-0000-0000-0012-000000000001",
    file_url: "/profile/arsh-profile.jpg",
    file_name: "arsh-profile.jpg",
    mime_type: "image/jpeg",
    size: 245000,
    alt_text: "Md Arsh Eqbal Profile Picture",
    created_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0012-000000000002",
    file_url: "/projects/taskflow-ai.jpg",
    file_name: "taskflow-ai.jpg",
    mime_type: "image/jpeg",
    size: 320000,
    alt_text: "TaskFlow AI Project Banner",
    created_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0012-000000000003",
    file_url: "/projects/pdf-wizard.jpg",
    file_name: "pdf-wizard.jpg",
    mime_type: "image/jpeg",
    size: 280000,
    alt_text: "PDF Wizard Screenshot",
    created_at: new Date().toISOString(),
  },
]

const initialAuditLogs: AuditLogEntry[] = [
  {
    id: "00000000-0000-0000-0013-000000000001",
    action: "UPDATE",
    table_name: "site_settings",
    record_id: "00000000-0000-0000-0000-000000000001",
    after: { availability_text: "Open to internships and full-time roles" },
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "00000000-0000-0000-0013-000000000002",
    action: "INSERT",
    table_name: "projects",
    record_id: "00000000-0000-0000-0007-000000000001",
    after: { title: "Amdox AI Cloud ERP" },
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
]

// Storage helper functions
function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const item = localStorage.getItem(`arsh_portfolio_${key}`)
    return item ? JSON.parse(item) : fallback
  } catch (e) {
    return fallback
  }
}

function setStorage<T>(key: string, data: T) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(`arsh_portfolio_${key}`, JSON.stringify(data))
    window.dispatchEvent(new Event("portfolio_data_updated"))
  } catch (e) {
    console.error("Failed to save to localStorage", e)
  }
}

// ==============================================================================
// PUBLIC GETTERS & CRUD METHODS
// ==============================================================================

export const AdminStore = {
  // --- Site Settings ---
  getSettings(): SiteSettings {
    const settings = getStorage("site_settings", initialSiteSettings)
    if (!settings.photo_url || settings.photo_url === "/placeholder-user.jpg" || settings.photo_url === "/placeholder.jpg") {
      settings.photo_url = initialSiteSettings.photo_url
    }
    return settings
  },
  saveSettings(settings: SiteSettings) {
    setStorage("site_settings", settings)
    this.syncSupabase("site_settings", [settings])
    this.addAuditLog("UPDATE", "site_settings", settings.id, settings)
  },

  // --- Social Links ---
  getSocialLinks(): SocialLink[] {
    return getStorage("social_links", initialSocialLinks)
  },
  saveSocialLinks(links: SocialLink[]) {
    setStorage("social_links", links)
    this.syncSupabase("social_links", links)
  },

  // --- Projects ---
  getProjects(): Project[] {
    const stored = getStorage("projects", initialProjects)
    // Intelligent auto-heal: if localStorage retains old placeholder paths, merge with new real assets
    return stored.map((p) => {
      const match = initialProjects.find((ip) => ip.id === p.id || ip.slug === p.slug)
      if (match) {
        const isStale =
          !p.cover_url ||
          p.cover_url === "/placeholder.jpg" ||
          (p.cover_url === "/projects/taskflow-ai.jpg" && match.cover_url !== "/projects/taskflow-ai.jpg") ||
          (p.cover_url === "/projects/pdf-wizard.jpg" && match.cover_url !== "/projects/pdf-wizard.jpg")

        if (isStale) {
          return {
            ...p,
            cover_url: match.cover_url,
            gallery: match.gallery && match.gallery.length > 0 ? match.gallery : p.gallery,
          }
        }
      }
      return p
    })
  },
  saveProjects(projects: Project[]) {
    setStorage("projects", projects)
    this.syncSupabase("projects", projects)
  },
  saveProject(project: Project) {
    const current = this.getProjects()
    const index = current.findIndex((p) => p.id === project.id)
    let updated: Project[]
    if (index >= 0) {
      updated = [...current]
      updated[index] = project
      this.addAuditLog("UPDATE", "projects", project.id, project)
    } else {
      updated = [project, ...current]
      this.addAuditLog("INSERT", "projects", project.id, project)
    }
    this.saveProjects(updated)
  },
  deleteProject(id: string) {
    const current = this.getProjects()
    const project = current.find((p) => p.id === id)
    const updated = current.filter((p) => p.id !== id)
    this.saveProjects(updated)
    this.addAuditLog("DELETE", "projects", id, project)
  },

  // --- Certificates ---
  getCertificates(): Certificate[] {
    const stored = getStorage("certificates", initialCertificates)
    return stored.map((c) => {
      const match = initialCertificates.find((ic) => ic.id === c.id || ic.credential_id === c.credential_id)
      if (match) {
        if (!c.file_url || c.file_url === "/placeholder.jpg") {
          return { ...c, file_url: match.file_url }
        }
      }
      return c
    })
  },
  saveCertificates(certs: Certificate[]) {
    setStorage("certificates", certs)
    this.syncSupabase("certificates", certs)
  },
  saveCertificate(cert: Certificate) {
    const current = this.getCertificates()
    const index = current.findIndex((c) => c.id === cert.id)
    let updated: Certificate[]
    if (index >= 0) {
      updated = [...current]
      updated[index] = cert
      this.addAuditLog("UPDATE", "certificates", cert.id, cert)
    } else {
      updated = [cert, ...current]
      this.addAuditLog("INSERT", "certificates", cert.id, cert)
    }
    this.saveCertificates(updated)
  },
  deleteCertificate(id: string) {
    const current = this.getCertificates()
    const cert = current.find((c) => c.id === id)
    const updated = current.filter((c) => c.id !== id)
    this.saveCertificates(updated)
    this.addAuditLog("DELETE", "certificates", id, cert)
  },

  // --- Achievements ---
  getAchievements(): Achievement[] {
    return getStorage("achievements", initialAchievements)
  },
  saveAchievements(items: Achievement[]) {
    setStorage("achievements", items)
    this.syncSupabase("achievements", items)
  },
  saveAchievement(item: Achievement) {
    const current = this.getAchievements()
    const index = current.findIndex((a) => a.id === item.id)
    const updated = index >= 0 ? [...current] : [item, ...current]
    if (index >= 0) updated[index] = item
    this.saveAchievements(updated)
  },
  deleteAchievement(id: string) {
    const updated = this.getAchievements().filter((a) => a.id !== id)
    this.saveAchievements(updated)
  },

  // --- Skills & Categories ---
  getSkillCategories() {
    return getStorage("skill_categories", initialSkillCategories)
  },
  saveSkillCategories(categories: typeof initialSkillCategories) {
    setStorage("skill_categories", categories)
  },

  // --- Experiences ---
  getExperiences(): Experience[] {
    return getStorage("experiences", initialExperiences)
  },
  saveExperiences(items: Experience[]) {
    setStorage("experiences", items)
    this.syncSupabase("experiences", items)
  },
  saveExperience(item: Experience) {
    const current = this.getExperiences()
    const index = current.findIndex((e) => e.id === item.id)
    const updated = index >= 0 ? [...current] : [item, ...current]
    if (index >= 0) updated[index] = item
    this.saveExperiences(updated)
  },
  deleteExperience(id: string) {
    const updated = this.getExperiences().filter((e) => e.id !== id)
    this.saveExperiences(updated)
  },

  // --- Education ---
  getEducation(): Education[] {
    return getStorage("education", initialEducation)
  },
  saveEducation(items: Education[]) {
    setStorage("education", items)
    this.syncSupabase("education", items)
  },
  saveEducationItem(item: Education) {
    const current = this.getEducation()
    const index = current.findIndex((e) => e.id === item.id)
    const updated = index >= 0 ? [...current] : [item, ...current]
    if (index >= 0) updated[index] = item
    this.saveEducation(updated)
  },
  deleteEducation(id: string) {
    const updated = this.getEducation().filter((e) => e.id !== id)
    this.saveEducation(updated)
  },

  // --- Resumes ---
  getResumes(): Resume[] {
    return getStorage("resumes", initialResumes)
  },
  saveResumes(items: Resume[]) {
    setStorage("resumes", items)
    this.syncSupabase("resumes", items)
  },
  setActiveResume(id: string) {
    const current = this.getResumes()
    const updated = current.map((r) => ({
      ...r,
      is_active: r.id === id,
    }))
    this.saveResumes(updated)
    this.addAuditLog("UPDATE", "resumes", id, { action: "mark_active" })
  },
  getActiveResume(): Resume {
    const resumes = this.getResumes()
    return resumes.find((r) => r.is_active) || resumes[0] || initialResumes[0]
  },

  // --- Messages ---
  getMessages(): Message[] {
    return getStorage("messages", initialMessages)
  },
  saveMessages(items: Message[]) {
    setStorage("messages", items)
  },
  addMessage(msg: Omit<Message, "id" | "created_at" | "is_read" | "is_starred">) {
    const current = this.getMessages()
    const newMsg: Message = {
      ...msg,
      id: crypto.randomUUID ? crypto.randomUUID() : `msg-${Date.now()}`,
      is_read: false,
      is_starred: false,
      created_at: new Date().toISOString(),
    }
    const updated = [newMsg, ...current]
    this.saveMessages(updated)
    this.syncSupabase("messages", [newMsg])
    return newMsg
  },
  toggleMessageRead(id: string) {
    const updated = this.getMessages().map((m) =>
      m.id === id ? { ...m, is_read: !m.is_read } : m
    )
    this.saveMessages(updated)
  },
  toggleMessageStar(id: string) {
    const updated = this.getMessages().map((m) =>
      m.id === id ? { ...m, is_starred: !m.is_starred } : m
    )
    this.saveMessages(updated)
  },
  deleteMessage(id: string) {
    const updated = this.getMessages().filter((m) => m.id !== id)
    this.saveMessages(updated)
  },

  // --- Media Library ---
  getMedia(): MediaItem[] {
    return getStorage("media", initialMedia)
  },
  saveMedia(items: MediaItem[]) {
    setStorage("media", items)
  },
  addMedia(item: Omit<MediaItem, "id" | "created_at">) {
    const current = this.getMedia()
    const newItem: MediaItem = {
      ...item,
      id: crypto.randomUUID ? crypto.randomUUID() : `media-${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    this.saveMedia([newItem, ...current])
    return newItem
  },
  deleteMedia(id: string) {
    const updated = this.getMedia().filter((m) => m.id !== id)
    this.saveMedia(updated)
  },

  // --- Page Sections ---
  getSections(): PageSection[] {
    return getStorage("page_sections", initialPageSections)
  },
  saveSections(sections: PageSection[]) {
    setStorage("page_sections", sections)
    this.syncSupabase("page_sections", sections)
  },

  // --- Audit Logs ---
  getAuditLogs(): AuditLogEntry[] {
    return getStorage("audit_logs", initialAuditLogs)
  },
  addAuditLog(action: string, table_name: string, record_id: string, after?: any) {
    const current = this.getAuditLogs()
    const entry: AuditLogEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : `log-${Date.now()}`,
      action,
      table_name,
      record_id,
      after,
      created_at: new Date().toISOString(),
    }
    setStorage("audit_logs", [entry, ...current.slice(0, 49)])
  },

  // --- Supabase Background Sync ---
  async syncSupabase(table: string, records: any[]) {
    try {
      const supabase = createClient()
      if (!supabase) return
      await supabase.from(table).upsert(records)
    } catch (e) {
      // Offline fallback: ignore remote error
    }
  },
}

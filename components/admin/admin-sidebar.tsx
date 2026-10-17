"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Share2,
  FolderGit2,
  Award,
  Trophy,
  Wrench,
  Briefcase,
  GraduationCap,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Layers,
  Search,
  BarChart3,
  History,
  ShieldCheck,
  ExternalLink,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Profile & Settings", href: "/admin/profile", icon: User },
  { label: "Social Links", href: "/admin/socials", icon: Share2 },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2, badge: "Core" },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Achievements", href: "/admin/achievements", icon: Trophy },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Resume", href: "/admin/resumes", icon: FileText },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Home Sections", href: "/admin/sections", icon: Layers },
  { label: "SEO & Meta", href: "/admin/seo", icon: Search },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Audit Log", href: "/admin/audit-log", icon: History },
  { label: "Account & Security", href: "/admin/account", icon: ShieldCheck },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    // Delete dev cookie and signOut
    document.cookie = "arsh_admin_session=; path=/; max-age=0"
    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      if (supabase) {
        await supabase.auth.signOut()
      }
    } catch (e) {
      // ignore
    }
    window.location.href = "/admin/login"
  }

  return (
    <>
      {/* Mobile Top Bar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="border-white/10 text-white hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin CMS
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Link href="/" target="_blank">
            <Button size="sm" variant="outline" className="border-white/10 text-white/80 hover:bg-white/10 text-xs">
              View Site <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900/95 border-r border-white/10 flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-purple-500/30">
              AE
            </div>
            <div>
              <h1 className="font-bold text-base text-white tracking-wide">Md Arsh Eqbal</h1>
              <p className="text-xs text-purple-300/80">Portfolio Admin CMS</p>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-hide">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white font-medium border-l-2 border-purple-400 pl-2.5"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-purple-400" : "text-white/50 group-hover:text-purple-300"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1">
                  {item.badge && (
                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-[10px] py-0 px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-purple-400" />}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" target="_blank" className="w-full block">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/10 text-white/80 hover:bg-white/10 justify-start"
            >
              <ExternalLink className="w-4 h-4 mr-2 text-purple-400" />
              View Live Site
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full text-white/60 hover:text-red-400 hover:bg-red-500/10 justify-start text-xs"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  FolderGit2,
  Award,
  Wrench,
  MessageSquare,
  Eye,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { initialProjects, initialCertificates, initialSkills, initialSiteSettings } from "@/lib/initial-data"

export default function AdminDashboardPage() {
  const [projectsCount, setProjectsCount] = useState(initialProjects.length)
  const [certsCount, setCertsCount] = useState(initialCertificates.length)
  const [skillsCount, setSkillsCount] = useState(40)
  const [unreadMessages, setUnreadMessages] = useState(2)

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-purple-600/20 to-pink-900/30 border border-white/10 p-6 md:p-8">
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-3" variant="outline">
            <Sparkles className="w-3 h-3 mr-1 text-yellow-400" /> Admin Control Center
          </Badge>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Welcome back, Md Arsh Eqbal
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-2">
            Manage your full portfolio from this dashboard. Changes save directly to your database with instant revalidation on the public site.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/admin/projects">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20">
                <Plus className="w-4 h-4 mr-2" /> Add New Project
              </Button>
            </Link>
            <Link href="/admin/certificates">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                <Award className="w-4 h-4 mr-2 text-purple-400" /> Upload Certificate
              </Button>
            </Link>
            <Link href="/" target="_blank">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5">
                <ExternalLink className="w-4 h-4 mr-2" /> Preview Public Site
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/60">Total Projects</p>
                <h3 className="text-3xl font-bold text-white mt-2">{projectsCount}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <FolderGit2 className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-xs text-purple-300 mt-4">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>4 Featured on Homepage</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/60">Certifications</p>
                <h3 className="text-3xl font-bold text-white mt-2">{certsCount}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-xs text-pink-300 mt-4">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              <span>All Verified & Active</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/60">Tech Skills</p>
                <h3 className="text-3xl font-bold text-white mt-2">{skillsCount}+</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Wrench className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-xs text-purple-300 mt-4">
              <span>Across 6 Categories</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/60">New Messages</p>
                <h3 className="text-3xl font-bold text-white mt-2">{unreadMessages}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center text-xs text-blue-300 mt-4">
              <Link href="/admin/messages" className="hover:underline flex items-center">
                Open inbox <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two-Column Module Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Recent Projects preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
            <Link href="/admin/projects" className="text-xs text-purple-400 hover:text-purple-300 flex items-center">
              View All <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="space-y-3">
            {initialProjects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                    <img
                      src={project.cover_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                    <p className="text-xs text-white/60 line-clamp-1">{project.summary}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-[10px] py-0">
                        {project.category}
                      </Badge>
                      {project.award_badge && (
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-[10px] py-0">
                          {project.award_badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Link href={`/admin/projects`}>
                  <Button size="sm" variant="outline" className="border-white/10 text-white/80 hover:bg-white/10 text-xs">
                    Edit
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 col: System Security & Quick Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">System & Security</h2>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-white">Row Level Security (RLS)</h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    15 tables protected. Public users can only read published records.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-white">Audit Logging Active</h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    All inserts, updates, and deletes are recorded in the audit_log table.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-white">Zero Palette Deviation</h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    Locked to tokens in docs/DESIGN_LOCK.md.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Target Admin:</span>
                  <span className="font-mono text-purple-300">arshh12145@gmail.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

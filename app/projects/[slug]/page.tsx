"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  User,
  Layers,
  Award,
  Sparkles,
  Code,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ParticleBackground from "@/components/particle-background"
import { initialProjects, type Project } from "@/lib/initial-data"
import { AdminStore } from "@/lib/admin-store"

export default function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const allProjects = typeof window !== "undefined"
    ? AdminStore.getProjects().filter((p) => p.status === "published")
    : initialProjects.filter((p) => p.status === "published")

  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const project = allProjects[currentIndex] || initialProjects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-white/60 mb-6">The requested case study could not be located or is in draft mode.</p>
        <Link href="/projects">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </Button>
        </Link>
      </div>
    )
  }

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 pb-24 text-white relative">
      <ParticleBackground />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/projects">
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-white/80 hover:bg-white/10 text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Projects
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/30 text-purple-300 border-purple-500/40 text-xs">
              {project.category}
            </Badge>
            {project.award_badge && (
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                🏆 {project.award_badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Case Study Header */}
        <div className="space-y-4 mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight"
          >
            {project.title}
          </motion.h1>

          <p className="text-lg md:text-xl text-purple-200/90 leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 pt-2">
            <div className="flex items-center">
              <User className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              <span>Role: <strong className="text-white">{project.role}</strong></span>
            </div>
            {project.start_date && (
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-pink-400" />
                <span>{project.start_date} {project.end_date ? `- ${project.end_date}` : ""}</span>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-3">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 text-sm">
                  <ExternalLink className="w-4 h-4 mr-2" /> Live Application
                </Button>
              </a>
            )}
            {project.repo_url && project.repo_url !== "#" && (
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm">
                  <Github className="w-4 h-4 mr-2" /> GitHub Repository
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Featured Cover Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950/80 shadow-2xl mb-12 flex items-center justify-center p-3 sm:p-6 min-h-[300px]">
          <img
            src={project.cover_url || "/placeholder.jpg"}
            alt={project.title}
            className="w-auto h-auto max-h-[520px] max-w-full object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Deep Dive Sections: Overview & Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6 md:p-8 space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" /> Architecture Overview
              </h2>
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                {project.overview || project.summary}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6 md:p-8 space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-pink-400" /> The Challenge & Problem
              </h2>
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                {project.problem || "Engineered to eliminate high latency, streamline operations, and deliver hardened production reliability."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Points & Features List */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 mb-12">
          <CardContent className="p-6 md:p-8 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Key Engineering Features & Highlights
            </h2>

            <div className="space-y-4">
              {project.key_features.map((feature, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack Breakdown */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 mb-12">
          <CardContent className="p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Code className="w-5 h-5 mr-2 text-purple-400" /> Technologies & Tools
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech_stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-purple-600/20 text-purple-200 border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Previous and Next Project Navigation */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-white/10 text-white/80 hover:bg-white/10 text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-2 text-purple-400" />
                Previous: {prevProject.title}
              </Button>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link href={`/projects/${nextProject.slug}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-white/10 text-white/80 hover:bg-white/10 text-xs">
                Next: {nextProject.title}
                <ArrowRight className="w-3.5 h-3.5 ml-2 text-purple-400" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

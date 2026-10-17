"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Search,
  ExternalLink,
  Github,
  Code,
  CheckCircle2,
  Filter,
  Star,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ParticleBackground from "@/components/particle-background"
import { initialProjects, type Project } from "@/lib/initial-data"
import { AdminStore } from "@/lib/admin-store"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProjects(AdminStore.getProjects().filter((p) => p.status === "published"))
    }
  }, [])

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "Full Stack", name: "Full Stack" },
    { id: "AI/ML", name: "AI / ML" },
    { id: "FinTech", name: "FinTech" },
    { id: "AI", name: "AI & Automation" },
    { id: "Frontend", name: "Frontend" },
    { id: "Tools", name: "Web Tools" },
  ]

  // Collect unique tech tags
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tech_stack)))

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech_stack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      categoryFilter === "all" || project.category.toLowerCase() === categoryFilter.toLowerCase()

    const matchesTag = !selectedTag || project.tech_stack.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24 text-white relative">
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        {/* Header Nav */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <Link href="/">
              <Button
                variant="outline"
                className="border-white/10 text-white/80 hover:bg-white/10 mb-4 md:mb-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              All Projects & Case Studies
            </motion.h1>
            <p className="text-white/70 text-sm md:text-base mt-2">
              Explore enterprise ERPs, computer vision architectures, AI tools, and civic platforms.
            </p>
          </div>

          <div className="relative mt-4 md:mt-0 w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={categoryFilter === cat.id ? "default" : "outline"}
              className={`rounded-full flex-shrink-0 text-xs sm:text-sm ${
                categoryFilter === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border-white/10 text-white/80 hover:bg-white/10"
              }`}
              onClick={() => {
                setCategoryFilter(cat.id)
                setSelectedTag(null)
              }}
            >
              {categoryFilter === cat.id && <Filter className="w-3.5 h-3.5 mr-1.5" />}
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Filter by Tech Stack Tag pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-10 pb-4 border-b border-white/10">
          <span className="text-xs text-white/50 mr-2">Filter by Tech:</span>
          {allTags.slice(0, 16).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                selectedTag === tag
                  ? "bg-purple-600 text-white font-medium shadow-md shadow-purple-500/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs text-pink-400 hover:underline ml-2"
            >
              Clear tag filter
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 h-full flex flex-col justify-between group">
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-800">
                    <img
                      src={project.cover_url || "/placeholder.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-purple-600/80 text-white backdrop-blur-md text-[10px]">
                          {project.category}
                        </Badge>
                        {project.award_badge && (
                          <Badge className="bg-yellow-500/90 text-slate-900 font-semibold backdrop-blur-md text-[10px]">
                            🏆 {project.award_badge}
                          </Badge>
                        )}
                      </div>

                      {project.featured && (
                        <div className="self-start">
                          <span className="flex items-center text-[10px] text-yellow-300 font-medium bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-yellow-500/30">
                            <Star className="w-2.5 h-2.5 mr-1 fill-yellow-400" /> Featured Work
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech_stack.slice(0, 4).map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="text-[11px] text-white/50 self-center">
                          +{project.tech_stack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-white/10 flex items-center justify-between">
                  <Link href={`/projects/${project.slug}`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs"
                    >
                      Case Study <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>

                  <div className="flex items-center space-x-2">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 text-xs px-2.5"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    )}
                    {project.repo_url && project.repo_url !== "#" && (
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 text-xs px-2.5"
                          title="GitHub Code"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/60 text-lg">No projects found matching your criteria.</p>
          <Button
            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            onClick={() => {
              setSearchTerm("")
              setCategoryFilter("all")
              setSelectedTag(null)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  </div>
  )
}

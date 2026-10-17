"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  FolderGit2,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Copy,
  Star,
  Eye,
  GripVertical,
  CheckCircle2,
  X,
  Sparkles,
  Save,
  ArrowUpDown,
  Tag,
  ListPlus,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminConfirmDialog from "@/components/admin/admin-confirm-dialog"
import AdminEmptyState from "@/components/admin/admin-empty-state"
import { AdminStore } from "@/lib/admin-store"
import { type Project } from "@/lib/initial-data"
import { toast } from "sonner"

const SUGGESTED_TECH = [
  "React", "Next.js", "TypeScript", "JavaScript", "Python", "FastAPI", "NestJS", "Node.js",
  "Tailwind CSS", "Framer Motion", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Firebase",
  "Gemini AI", "OpenAI API", "YOLOv8", "PyTorch", "Hugging Face", "React Native (Expo)"
]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [newKeyPoint, setNewKeyPoint] = useState("")
  const [newTechInput, setNewTechInput] = useState("")

  useEffect(() => {
    setProjects(AdminStore.getProjects())
  }, [])

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tech_stack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCat = categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCat
  })

  const handleOpenCreate = () => {
    const newProj: Project = {
      id: crypto.randomUUID ? crypto.randomUUID() : `proj-${Date.now()}`,
      title: "",
      slug: "",
      summary: "",
      category: "Full Stack",
      overview: "",
      problem: "",
      role: "Lead Developer",
      key_features: [],
      tech_stack: ["React", "TypeScript"],
      cover_url: "/placeholder.jpg",
      gallery: [],
      live_url: "",
      repo_url: "",
      award_badge: "",
      featured: false,
      status: "published",
      sort_order: projects.length + 1,
    }
    setEditingProject(newProj)
    setDialogOpen(true)
  }

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project })
    setDialogOpen(true)
  }

  const handleDuplicate = (project: Project) => {
    const duplicated: Project = {
      ...project,
      id: crypto.randomUUID ? crypto.randomUUID() : `proj-${Date.now()}`,
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy-${Date.now().toString().slice(-4)}`,
      sort_order: projects.length + 1,
    }
    AdminStore.saveProject(duplicated)
    setProjects(AdminStore.getProjects())
    toast.success("Project duplicated successfully!")
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      AdminStore.deleteProject(deleteId)
      setProjects(AdminStore.getProjects())
      setDeleteId(null)
      toast.success("Project deleted.")
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return
    if (!editingProject.title.trim()) {
      toast.error("Title is required")
      return
    }

    // Auto-generate slug if empty
    let slug = editingProject.slug.trim()
    if (!slug) {
      slug = editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    }

    const updated = {
      ...editingProject,
      slug,
    }

    AdminStore.saveProject(updated)
    setProjects(AdminStore.getProjects())
    setDialogOpen(false)
    setEditingProject(null)
    toast.success("Project saved successfully!")
  }

  const toggleFeatured = (project: Project) => {
    const updated = { ...project, featured: !project.featured }
    AdminStore.saveProject(updated)
    setProjects(AdminStore.getProjects())
    toast.success(`Project ${updated.featured ? "marked as featured" : "unfeatured"}`)
  }

  const toggleStatus = (project: Project) => {
    const newStatus = project.status === "published" ? "draft" : "published"
    const updated = { ...project, status: newStatus as "draft" | "published" }
    AdminStore.saveProject(updated)
    setProjects(AdminStore.getProjects())
    toast.success(`Project status changed to ${newStatus}`)
  }

  // Key features helpers
  const addKeyPoint = () => {
    if (!newKeyPoint.trim() || !editingProject) return
    setEditingProject({
      ...editingProject,
      key_features: [...editingProject.key_features, newKeyPoint.trim()],
    })
    setNewKeyPoint("")
  }

  const removeKeyPoint = (index: number) => {
    if (!editingProject) return
    const updated = [...editingProject.key_features]
    updated.splice(index, 1)
    setEditingProject({ ...editingProject, key_features: updated })
  }

  // Tech stack helpers
  const addTechTag = (tag: string) => {
    if (!editingProject || !tag.trim()) return
    if (!editingProject.tech_stack.includes(tag.trim())) {
      setEditingProject({
        ...editingProject,
        tech_stack: [...editingProject.tech_stack, tag.trim()],
      })
    }
    setNewTechInput("")
  }

  const removeTechTag = (tag: string) => {
    if (!editingProject) return
    setEditingProject({
      ...editingProject,
      tech_stack: editingProject.tech_stack.filter((t) => t !== tag),
    })
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Projects Manager"
        description="Add, edit, reorder, and configure your featured case studies and portfolio projects."
        actionLabel="New Project"
        onAction={handleOpenCreate}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search projects or tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-white/30 text-sm"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["all", "Full Stack", "AI/ML", "FinTech", "AI", "Frontend", "Tools"].map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter.toLowerCase() === cat.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(cat)}
              className={
                categoryFilter.toLowerCase() === cat.toLowerCase()
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs whitespace-nowrap"
                  : "border-white/10 text-white/70 hover:bg-white/10 text-xs whitespace-nowrap"
              }
            >
              {cat === "all" ? "All Categories" : cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <AdminEmptyState
          icon={FolderGit2}
          title="No projects found"
          description="Try adjusting your search criteria or create a brand new portfolio project."
          actionLabel="Create Project"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project, idx) => (
            <Card
              key={project.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200 overflow-hidden"
            >
              <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10">
                    <img
                      src={project.cover_url || "/placeholder.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{project.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          project.status === "published"
                            ? "bg-green-500/20 text-green-300 border-green-500/30 text-[10px]"
                            : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-[10px]"
                        }
                      >
                        {project.status}
                      </Badge>
                      {project.featured && (
                        <Badge className="bg-purple-600/30 text-purple-300 border-purple-500/40 text-[10px]">
                          <Star className="w-2.5 h-2.5 mr-1 fill-purple-300" /> Featured
                        </Badge>
                      )}
                      {project.award_badge && (
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-[10px]">
                          🏆 {project.award_badge}
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-white/60 line-clamp-1 max-w-xl">{project.summary}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech_stack.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-white/70 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFeatured(project)}
                    className="text-white/60 hover:text-yellow-400 text-xs px-2"
                    title="Toggle Featured"
                  >
                    <Star className={`w-4 h-4 ${project.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleStatus(project)}
                    className="text-white/60 hover:text-green-400 text-xs px-2"
                    title="Toggle Publish Status"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  <Link href={`/projects/${project.slug}`} target="_blank">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white/60 hover:text-purple-400 text-xs px-2"
                      title="Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDuplicate(project)}
                    className="text-white/60 hover:text-white text-xs px-2"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(project)}
                    className="border-white/10 text-white/80 hover:bg-white/10 text-xs"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1 text-purple-400" /> Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteId(project.id)}
                    className="text-white/40 hover:text-red-400 hover:bg-red-500/10 text-xs px-2"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit / Create Dialog */}
      {editingProject && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {editingProject.id ? "Edit Project" : "Create New Project"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Project Title *</Label>
                  <Input
                    required
                    value={editingProject.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setEditingProject({
                        ...editingProject,
                        title,
                        slug: editingProject.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      })
                    }}
                    placeholder="e.g. Amdox AI Cloud ERP"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">URL Slug *</Label>
                  <Input
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="e.g. amdox-ai-cloud-erp"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Category</Label>
                  <Input
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="Full Stack, AI/ML, etc."
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Role</Label>
                  <Input
                    value={editingProject.role}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    placeholder="Lead Developer / Engineer"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Award Badge</Label>
                  <Input
                    value={editingProject.award_badge || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, award_badge: e.target.value })}
                    placeholder="e.g. 1st Place SIH"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Summary (One-line preview)</Label>
                <Input
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  placeholder="Concise high-level summary of the application..."
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Overview (Markdown Supported)</Label>
                  <Textarea
                    rows={4}
                    value={editingProject.overview}
                    onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                    placeholder="Detailed overview of what the platform solves..."
                    className="bg-white/5 border-white/10 text-white text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Problem Statement (Markdown Supported)</Label>
                  <Textarea
                    rows={4}
                    value={editingProject.problem}
                    onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                    placeholder="The core problem and domain challenges addressed..."
                    className="bg-white/5 border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Key Features Line-by-Line Editor */}
              <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <Label className="text-white text-xs font-semibold flex items-center justify-between">
                  <span>Key Features & Deliverables ({editingProject.key_features.length})</span>
                </Label>

                <div className="flex gap-2">
                  <Input
                    value={newKeyPoint}
                    onChange={(e) => setNewKeyPoint(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyPoint())}
                    placeholder="Add a new bullet point feature..."
                    className="bg-slate-900 border-white/10 text-white text-xs"
                  />
                  <Button type="button" size="sm" onClick={addKeyPoint} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Add
                  </Button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {editingProject.key_features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-white/80"
                    >
                      <span className="flex-1 pr-2 line-clamp-2">• {feat}</span>
                      <button
                        type="button"
                        onClick={() => removeKeyPoint(i)}
                        className="text-white/40 hover:text-red-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Tag Input */}
              <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <Label className="text-white text-xs font-semibold">Tech Stack</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTechInput}
                    onChange={(e) => setNewTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechTag(newTechInput))}
                    placeholder="Type a technology and press enter..."
                    className="bg-slate-900 border-white/10 text-white text-xs"
                  />
                  <Button type="button" size="sm" onClick={() => addTechTag(newTechInput)} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Add Tag
                  </Button>
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-white/40 self-center mr-1">Suggestions:</span>
                  {SUGGESTED_TECH.slice(0, 10).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => addTechTag(t)}
                      className="px-2 py-0.5 rounded text-[10px] bg-purple-600/10 hover:bg-purple-600/30 text-purple-300 border border-purple-500/20"
                    >
                      + {t}
                    </button>
                  ))}
                </div>

                {/* Current tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {editingProject.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-purple-600/20 text-purple-300 border border-purple-500/30"
                    >
                      {t}
                      <button type="button" onClick={() => removeTechTag(t)} className="hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Cover Image URL</Label>
                  <Input
                    value={editingProject.cover_url}
                    onChange={(e) => setEditingProject({ ...editingProject, cover_url: e.target.value })}
                    placeholder="/projects/taskflow-ai.jpg"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Live Demo URL</Label>
                  <Input
                    value={editingProject.live_url || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                    placeholder="https://..."
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">GitHub Repository URL</Label>
                  <Input
                    value={editingProject.repo_url || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, repo_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingProject.featured}
                    onCheckedChange={(checked) => setEditingProject({ ...editingProject, featured: checked })}
                  />
                  <Label className="text-white/80 text-xs cursor-pointer">Feature on Homepage</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingProject.status === "published"}
                    onCheckedChange={(checked) =>
                      setEditingProject({
                        ...editingProject,
                        status: checked ? "published" : "draft",
                      })
                    }
                  />
                  <Label className="text-white/80 text-xs cursor-pointer">Published Status</Label>
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Project
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Project?"
        description="Are you sure you want to delete this project? This change will be permanently logged in the audit trail."
        confirmText="Delete Project"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

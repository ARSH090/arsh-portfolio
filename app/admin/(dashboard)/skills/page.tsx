"use client"

import { useState, useEffect } from "react"
import {
  Wrench,
  Plus,
  Trash2,
  Save,
  FolderPlus,
  Sparkles,
  Tag,
  CheckCircle2,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminConfirmDialog from "@/components/admin/admin-confirm-dialog"
import { AdminStore } from "@/lib/admin-store"
import { initialSkillCategories } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<typeof initialSkillCategories>([])
  const [newSkillName, setNewSkillName] = useState<{ [catId: string]: string }>({})
  const [newCatOpen, setNewCatOpen] = useState(false)
  const [newCatName, setNewCatName] = useState("")

  useEffect(() => {
    setCategories(AdminStore.getSkillCategories())
  }, [])

  const handleAddSkill = (catId: string) => {
    const val = (newSkillName[catId] || "").trim()
    if (!val) return

    const updated = categories.map((cat) => {
      if (cat.id === catId && !cat.skills.includes(val)) {
        return { ...cat, skills: [...cat.skills, val] }
      }
      return cat
    })

    AdminStore.saveSkillCategories(updated)
    setCategories(AdminStore.getSkillCategories())
    setNewSkillName({ ...newSkillName, [catId]: "" })
    toast.success(`Added ${val}`)
  }

  const handleRemoveSkill = (catId: string, skill: string) => {
    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        return { ...cat, skills: cat.skills.filter((s) => s !== skill) }
      }
      return cat
    })

    AdminStore.saveSkillCategories(updated)
    setCategories(AdminStore.getSkillCategories())
    toast.success(`Removed ${skill}`)
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return

    const newCat = {
      id: crypto.randomUUID ? crypto.randomUUID() : `cat-${Date.now()}`,
      name: newCatName.trim(),
      skills: [],
    }

    const updated = [...categories, newCat]
    AdminStore.saveSkillCategories(updated)
    setCategories(AdminStore.getSkillCategories())
    setNewCatOpen(false)
    setNewCatName("")
    toast.success(`Created category "${newCat.name}"`)
  }

  const handleDeleteCategory = (catId: string) => {
    const updated = categories.filter((c) => c.id !== catId)
    AdminStore.saveSkillCategories(updated)
    setCategories(AdminStore.getSkillCategories())
    toast.success("Category deleted.")
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Skills & Technologies"
        description="Organize your technical competencies into categories. Add, remove, or modify skills shown on your homepage and project filters."
        actionLabel="New Category"
        onAction={() => setNewCatOpen(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-white text-base">{category.name}</h3>
                  <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-[10px]">
                    {category.skills.length} skills
                  </Badge>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-white/40 hover:text-red-400 text-xs px-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Add skill input */}
              <div className="flex gap-2">
                <Input
                  value={newSkillName[category.id] || ""}
                  onChange={(e) =>
                    setNewSkillName({ ...newSkillName, [category.id]: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill(category.id))}
                  placeholder={`Add a skill to ${category.name}...`}
                  className="bg-slate-900 border-white/10 text-white text-xs"
                />
                <Button
                  size="sm"
                  onClick={() => handleAddSkill(category.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add
                </Button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1 min-h-[60px]">
                {category.skills.length === 0 ? (
                  <p className="text-xs text-white/40 italic">No skills in this category yet.</p>
                ) : (
                  category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-white/5 hover:bg-white/10 text-white/90 border-white/15 px-3 py-1 text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(category.id, skill)}
                        className="text-white/40 hover:text-red-400 ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Category Dialog */}
      <Dialog open={newCatOpen} onOpenChange={setNewCatOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white">Create Skill Category</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddCategory} className="space-y-4 pt-3">
            <div className="space-y-2">
              <Label className="text-white/80 text-xs">Category Name *</Label>
              <Input
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Mobile Development, DevOps, Web3"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <DialogFooter className="pt-2 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewCatOpen(false)}
                className="border-white/10 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Create Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

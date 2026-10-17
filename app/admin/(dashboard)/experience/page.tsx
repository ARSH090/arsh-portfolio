"use client"

import { useState, useEffect } from "react"
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Save,
  CheckCircle2,
  X,
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
import { type Experience } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [newBullet, setNewBullet] = useState("")

  useEffect(() => {
    setExperiences(AdminStore.getExperiences())
  }, [])

  const handleOpenCreate = () => {
    const newExp: Experience = {
      id: crypto.randomUUID ? crypto.randomUUID() : `exp-${Date.now()}`,
      role: "",
      company: "",
      type: "Internship",
      location: "Remote",
      start_date: "",
      end_date: "Present",
      is_current: true,
      bullets: [],
      logo_url: "/placeholder-logo.png",
      status: "published",
      sort_order: experiences.length + 1,
    }
    setEditingExp(newExp)
    setDialogOpen(true)
  }

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp({ ...exp })
    setDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingExp) return
    if (!editingExp.role || !editingExp.company) {
      toast.error("Role and Company are required")
      return
    }

    AdminStore.saveExperience(editingExp)
    setExperiences(AdminStore.getExperiences())
    setDialogOpen(false)
    setEditingExp(null)
    toast.success("Experience record saved!")
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      AdminStore.deleteExperience(deleteId)
      setExperiences(AdminStore.getExperiences())
      setDeleteId(null)
      toast.success("Experience removed.")
    }
  }

  const addBullet = () => {
    if (!newBullet.trim() || !editingExp) return
    setEditingExp({
      ...editingExp,
      bullets: [...editingExp.bullets, newBullet.trim()],
    })
    setNewBullet("")
  }

  const removeBullet = (index: number) => {
    if (!editingExp) return
    const updated = [...editingExp.bullets]
    updated.splice(index, 1)
    setEditingExp({ ...editingExp, bullets: updated })
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Work & Internship Experience"
        description="Showcase your professional engineering background, enterprise internships, and roles."
        actionLabel="Add Experience"
        onAction={handleOpenCreate}
      />

      {experiences.length === 0 ? (
        <AdminEmptyState
          icon={Briefcase}
          title="No experience records"
          description="Add your internship or software engineering experience."
          actionLabel="Add Experience"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                        <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-[10px]">
                          {exp.type}
                        </Badge>
                        {exp.is_current && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-[10px]">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/70">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEdit(exp)}
                      className="border-white/10 text-white/80 hover:bg-white/10 text-xs px-2.5"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1 text-purple-400" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeleteId(exp.id)}
                      className="text-white/40 hover:text-red-400 text-xs px-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-white/60 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-purple-400" />
                    <span>{exp.start_date} - {exp.end_date}</span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-pink-400" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-1.5 text-xs text-white/80 list-disc list-inside">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      {editingExp && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white">
                {editingExp.id ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Role Title *</Label>
                  <Input
                    required
                    value={editingExp.role}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    placeholder="e.g. Software Engineering Intern"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Company / Organization *</Label>
                  <Input
                    required
                    value={editingExp.company}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    placeholder="e.g. Amdox Technologies"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Employment Type</Label>
                  <Input
                    value={editingExp.type}
                    onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value })}
                    placeholder="Internship, Full-time, etc."
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Duration / Start</Label>
                  <Input
                    value={editingExp.start_date}
                    onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                    placeholder="e.g. 3 months / Jan 2024"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">End Date</Label>
                  <Input
                    value={editingExp.end_date}
                    onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                    placeholder="Present / Month Year"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <Label className="text-white text-xs font-semibold">Accomplishment Bullets</Label>
                <div className="flex gap-2">
                  <Input
                    value={newBullet}
                    onChange={(e) => setNewBullet(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBullet())}
                    placeholder="Add an achievement bullet..."
                    className="bg-slate-900 border-white/10 text-white text-xs"
                  />
                  <Button type="button" size="sm" onClick={addBullet} className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
                    Add
                  </Button>
                </div>
                <div className="space-y-1.5 pt-1">
                  {editingExp.bullets.map((b, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-900/50 text-xs text-white/80">
                      <span className="line-clamp-2">• {b}</span>
                      <button type="button" onClick={() => removeBullet(i)} className="text-white/40 hover:text-red-400 ml-2">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <Label className="text-white/80 text-xs">Currently working in this role</Label>
                <Switch
                  checked={editingExp.is_current}
                  onCheckedChange={(checked) => setEditingExp({ ...editingExp, is_current: checked })}
                />
              </div>

              <DialogFooter className="pt-2 border-t border-white/10">
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
                  <Save className="w-4 h-4 mr-2" /> Save Experience
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Experience Entry?"
        description="Are you sure you want to remove this experience record?"
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

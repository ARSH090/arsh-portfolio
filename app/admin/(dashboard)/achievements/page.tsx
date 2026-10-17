"use client"

import { useState, useEffect } from "react"
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Save,
  CheckCircle2,
  ExternalLink,
  Award,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminConfirmDialog from "@/components/admin/admin-confirm-dialog"
import AdminEmptyState from "@/components/admin/admin-empty-state"
import { AdminStore } from "@/lib/admin-store"
import { type Achievement } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [editingAch, setEditingAch] = useState<Achievement | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setAchievements(AdminStore.getAchievements())
  }, [])

  const handleOpenCreate = () => {
    const newAch: Achievement = {
      id: crypto.randomUUID ? crypto.randomUUID() : `ach-${Date.now()}`,
      title: "",
      position: "Winner",
      event: "",
      organizer: "",
      year: "2024",
      description: "",
      link_url: "",
      status: "published",
      sort_order: achievements.length + 1,
    }
    setEditingAch(newAch)
    setDialogOpen(true)
  }

  const handleOpenEdit = (ach: Achievement) => {
    setEditingAch({ ...ach })
    setDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAch) return
    if (!editingAch.title || !editingAch.event) {
      toast.error("Title and Event are required")
      return
    }

    AdminStore.saveAchievement(editingAch)
    setAchievements(AdminStore.getAchievements())
    setDialogOpen(false)
    setEditingAch(null)
    toast.success("Achievement saved!")
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      AdminStore.deleteAchievement(deleteId)
      setAchievements(AdminStore.getAchievements())
      setDeleteId(null)
      toast.success("Achievement removed.")
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Hackathon & Competition Achievements"
        description="Showcase your hackathon victories, positions, and awards."
        actionLabel="Add Achievement"
        onAction={handleOpenCreate}
      />

      {achievements.length === 0 ? (
        <AdminEmptyState
          icon={Trophy}
          title="No achievements listed"
          description="Add hackathon wins, competitive ranks, or awards."
          actionLabel="Add Achievement"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="space-y-4">
          {achievements.map((ach) => (
            <Card
              key={ach.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold flex-shrink-0">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{ach.title}</h3>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-[10px]">
                        {ach.position}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] border-white/10 text-white/60">
                        {ach.year}
                      </Badge>
                    </div>
                    <p className="text-sm text-purple-300/90 font-medium mt-0.5">{ach.event}</p>
                    <p className="text-xs text-white/50">{ach.organizer}</p>
                    <p className="text-xs text-white/70 mt-2">{ach.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(ach)}
                    className="border-white/10 text-white/80 hover:bg-white/10 text-xs px-2.5"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1 text-purple-400" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteId(ach.id)}
                    className="text-white/40 hover:text-red-400 text-xs px-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      {editingAch && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white">
                {editingAch.id ? "Edit Achievement" : "Add Achievement"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-3">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Award / Title *</Label>
                <Input
                  required
                  value={editingAch.title}
                  onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                  placeholder="e.g. 1st Position / Top 30 Finalist"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Position / Rank</Label>
                  <Input
                    value={editingAch.position}
                    onChange={(e) => setEditingAch({ ...editingAch, position: e.target.value })}
                    placeholder="e.g. Winner, 1st Runner Up"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Year</Label>
                  <Input
                    value={editingAch.year}
                    onChange={(e) => setEditingAch({ ...editingAch, year: e.target.value })}
                    placeholder="2024"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Event Name *</Label>
                <Input
                  required
                  value={editingAch.event}
                  onChange={(e) => setEditingAch({ ...editingAch, event: e.target.value })}
                  placeholder="e.g. Smart India Hackathon (SIH) Internal"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Organizer</Label>
                <Input
                  value={editingAch.organizer}
                  onChange={(e) => setEditingAch({ ...editingAch, organizer: e.target.value })}
                  placeholder="e.g. Google Developer Group Ranchi"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Description</Label>
                <Textarea
                  rows={3}
                  value={editingAch.description}
                  onChange={(e) => setEditingAch({ ...editingAch, description: e.target.value })}
                  placeholder="Details of the winning project and evaluation..."
                  className="bg-white/5 border-white/10 text-white text-xs"
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
                  <Save className="w-4 h-4 mr-2" /> Save
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
        title="Delete Achievement?"
        description="Are you sure you want to remove this achievement from your records?"
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

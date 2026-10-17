"use client"

import { useState, useEffect } from "react"
import {
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Save,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminConfirmDialog from "@/components/admin/admin-confirm-dialog"
import AdminEmptyState from "@/components/admin/admin-empty-state"
import { AdminStore } from "@/lib/admin-store"
import { type Education } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminEducationPage() {
  const [educationList, setEducationList] = useState<Education[]>([])
  const [editingEdu, setEditingEdu] = useState<Education | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setEducationList(AdminStore.getEducation())
  }, [])

  const handleOpenCreate = () => {
    const newEdu: Education = {
      id: crypto.randomUUID ? crypto.randomUUID() : `edu-${Date.now()}`,
      institution: "",
      degree: "B.Tech",
      field: "Computer Science Engineering",
      start_year: "2023",
      end_year: "2027",
      grade: "Pursuing",
      status: "pursuing",
      content_status: "published",
      sort_order: educationList.length + 1,
    }
    setEditingEdu(newEdu)
    setDialogOpen(true)
  }

  const handleOpenEdit = (edu: Education) => {
    setEditingEdu({ ...edu })
    setDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEdu) return
    if (!editingEdu.institution || !editingEdu.degree) {
      toast.error("Institution and Degree are required")
      return
    }

    AdminStore.saveEducationItem(editingEdu)
    setEducationList(AdminStore.getEducation())
    setDialogOpen(false)
    setEditingEdu(null)
    toast.success("Education record saved!")
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      AdminStore.deleteEducation(deleteId)
      setEducationList(AdminStore.getEducation())
      setDeleteId(null)
      toast.success("Education entry removed.")
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Education History"
        description="Manage your degree credentials, universities, boards, and academic standing."
        actionLabel="Add Education"
        onAction={handleOpenCreate}
      />

      {educationList.length === 0 ? (
        <AdminEmptyState
          icon={GraduationCap}
          title="No education records"
          description="Add your degree, university, or intermediate school."
          actionLabel="Add Education"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="space-y-4">
          {educationList.map((edu) => (
            <Card
              key={edu.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">
                        {edu.degree} in {edu.field}
                      </h3>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-[10px]">
                        {edu.grade}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/70">{edu.institution}</p>
                    <div className="flex items-center text-xs text-white/50 mt-1">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-purple-400" />
                      <span>{edu.start_year} - {edu.end_year} ({edu.status})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(edu)}
                    className="border-white/10 text-white/80 hover:bg-white/10 text-xs px-2.5"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1 text-purple-400" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteId(edu.id)}
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
      {editingEdu && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white">
                {editingEdu.id ? "Edit Education" : "Add Education"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-3">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Institution / University *</Label>
                <Input
                  required
                  value={editingEdu.institution}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  placeholder="e.g. Netaji Subhas University"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Degree *</Label>
                  <Input
                    required
                    value={editingEdu.degree}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                    placeholder="e.g. B.Tech"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Field / Major</Label>
                  <Input
                    value={editingEdu.field}
                    onChange={(e) => setEditingEdu({ ...editingEdu, field: e.target.value })}
                    placeholder="e.g. CSE"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Start Year</Label>
                  <Input
                    value={editingEdu.start_year}
                    onChange={(e) => setEditingEdu({ ...editingEdu, start_year: e.target.value })}
                    className="bg-white/5 border-white/10 text-white text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">End Year</Label>
                  <Input
                    value={editingEdu.end_year}
                    onChange={(e) => setEditingEdu({ ...editingEdu, end_year: e.target.value })}
                    className="bg-white/5 border-white/10 text-white text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Grade / %</Label>
                  <Input
                    value={editingEdu.grade}
                    onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                    className="bg-white/5 border-white/10 text-white text-xs"
                  />
                </div>
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
                  <Save className="w-4 h-4 mr-2" /> Save Record
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
        title="Delete Education Record?"
        description="Are you sure you want to remove this academic history entry?"
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

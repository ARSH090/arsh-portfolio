"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Plus,
  CheckCircle2,
  Download,
  Trash2,
  ExternalLink,
  Save,
  Radio,
  FileCheck,
  AlertCircle,
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
import { type Resume } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newLabel, setNewLabel] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setResumes(AdminStore.getResumes())
  }, [])

  const handleSetActive = (id: string) => {
    AdminStore.setActiveResume(id)
    setResumes(AdminStore.getResumes())
    toast.success("Active resume updated! All download links now point to this version.")
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLabel.trim() || !newUrl.trim()) {
      toast.error("Label and file URL are required")
      return
    }

    const isFirst = resumes.length === 0
    const newResume: Resume = {
      id: crypto.randomUUID ? crypto.randomUUID() : `resume-${Date.now()}`,
      label: newLabel.trim(),
      file_url: newUrl.trim(),
      is_active: isFirst,
      status: "published",
      sort_order: resumes.length + 1,
    }

    const updated = [newResume, ...resumes]
    AdminStore.saveResumes(updated)
    setResumes(AdminStore.getResumes())
    setDialogOpen(false)
    setNewLabel("")
    setNewUrl("")
    toast.success("Resume added successfully!")
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      const remaining = resumes.filter((r) => r.id !== deleteId)
      // If we deleted the active resume and have remaining ones, make the first one active
      if (resumes.find((r) => r.id === deleteId)?.is_active && remaining.length > 0) {
        remaining[0].is_active = true
      }
      AdminStore.saveResumes(remaining)
      setResumes(AdminStore.getResumes())
      setDeleteId(null)
      toast.success("Resume removed.")
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Resume & CV Versions"
        description="Manage your resume documents. The currently active resume is automatically served on all public 'Download CV' buttons."
        actionLabel="Upload New Version"
        onAction={() => setDialogOpen(true)}
      />

      <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-start space-x-3 text-purple-200 text-xs">
        <FileCheck className="w-5 h-5 flex-shrink-0 text-purple-400 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Active Resume Routing:</span> Whichever version you mark as "Active" will automatically be served whenever a recruiter or visitor clicks "Download CV" anywhere across your portfolio.
        </div>
      </div>

      {resumes.length === 0 ? (
        <AdminEmptyState
          icon={FileText}
          title="No resumes uploaded"
          description="Upload your latest CV in PDF format to enable public downloads."
          actionLabel="Upload Resume"
          onAction={() => setDialogOpen(true)}
        />
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <Card
              key={resume.id}
              className={`bg-white/5 backdrop-blur-md transition-all duration-200 overflow-hidden ${
                resume.is_active
                  ? "border-purple-500/50 shadow-lg shadow-purple-500/10 bg-purple-900/10"
                  : "border-white/10 hover:bg-white/10"
              }`}
            >
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      resume.is_active
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/5 border border-white/10 text-white/50"
                    }`}
                  >
                    <FileText className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{resume.label}</h3>
                      {resume.is_active && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px]">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Active on Public Site
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-white/50 font-mono mt-1 line-clamp-1 max-w-lg">
                      {resume.file_url}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  {!resume.is_active && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSetActive(resume.id)}
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20 text-xs"
                    >
                      Mark as Active
                    </Button>
                  )}

                  <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 text-white/80 hover:bg-white/10 text-xs px-2.5"
                    >
                      <Download className="w-3.5 h-3.5 mr-1 text-purple-400" /> Preview
                    </Button>
                  </a>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteId(resume.id)}
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

      {/* Add Resume Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white">Upload / Add Resume Version</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-3">
            <div className="space-y-2">
              <Label className="text-white/80 text-xs">Resume Label *</Label>
              <Input
                required
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g. Md Arsh Eqbal - Full Stack Resume 2025"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-xs">PDF Document URL / Google Drive Direct Link *</Label>
              <Input
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://drive.google.com/... or /resumes/cv.pdf"
                className="bg-white/5 border-white/10 text-white text-xs font-mono"
              />
              <p className="text-[11px] text-white/50">
                You can host your PDF in Google Drive, Supabase Storage (`public-media`), or Vercel /public.
              </p>
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
                <Save className="w-4 h-4 mr-2" /> Save Resume
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Remove Resume Version?"
        description="Are you sure you want to delete this resume version?"
        confirmText="Delete Resume"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

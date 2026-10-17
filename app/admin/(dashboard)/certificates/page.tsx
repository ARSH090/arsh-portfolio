"use client"

import { useState, useEffect } from "react"
import {
  Award,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  FileCheck,
  Save,
  Eye,
  CheckCircle2,
  FileText,
  Clock,
  User,
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
import { type Certificate } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [issuerFilter, setIssuerFilter] = useState("all")
  const [editingCert, setEditingCert] = useState<Certificate | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    setCertificates(AdminStore.getCertificates())
  }, [])

  const issuers = Array.from(new Set(certificates.map((c) => c.issuer)))

  const filteredCerts = certificates.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.credential_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIssuer = issuerFilter === "all" || c.issuer.toLowerCase() === issuerFilter.toLowerCase()
    return matchesSearch && matchesIssuer
  })

  const handleOpenCreate = () => {
    const newCert: Certificate = {
      id: crypto.randomUUID ? crypto.randomUUID() : `cert-${Date.now()}`,
      title: "",
      issuer: "Udemy",
      issue_date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      credential_id: "",
      credential_url: "",
      file_url: "/placeholder.jpg",
      file_type: "image",
      category: "development",
      visible: true,
      skills: [],
      instructor: "",
      duration: "",
      description: "",
      status: "published",
      sort_order: certificates.length + 1,
    }
    setEditingCert(newCert)
    setDialogOpen(true)
  }

  const handleOpenEdit = (cert: Certificate) => {
    setEditingCert({ ...cert })
    setDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      AdminStore.deleteCertificate(deleteId)
      setCertificates(AdminStore.getCertificates())
      setDeleteId(null)
      toast.success("Certificate removed.")
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCert) return
    if (!editingCert.title.trim() || !editingCert.issuer.trim()) {
      toast.error("Title and Issuer are required")
      return
    }

    AdminStore.saveCertificate(editingCert)
    setCertificates(AdminStore.getCertificates())
    setDialogOpen(false)
    setEditingCert(null)
    toast.success("Certificate saved successfully!")
  }

  const addSkill = () => {
    if (!newSkill.trim() || !editingCert) return
    if (!editingCert.skills.includes(newSkill.trim())) {
      setEditingCert({ ...editingCert, skills: [...editingCert.skills, newSkill.trim()] })
    }
    setNewSkill("")
  }

  const removeSkill = (skill: string) => {
    if (!editingCert) return
    setEditingCert({
      ...editingCert,
      skills: editingCert.skills.filter((s) => s !== skill),
    })
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Certificates & Credentials"
        description="Upload, verify, and manage your verified certifications and course credentials."
        actionLabel="New Certificate"
        onAction={handleOpenCreate}
      />

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search certificate or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-white/30 text-sm"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button
            variant={issuerFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setIssuerFilter("all")}
            className={
              issuerFilter === "all"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs"
                : "border-white/10 text-white/70 hover:bg-white/10 text-xs"
            }
          >
            All Issuers
          </Button>
          {issuers.map((iss) => (
            <Button
              key={iss}
              variant={issuerFilter.toLowerCase() === iss.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setIssuerFilter(iss)}
              className={
                issuerFilter.toLowerCase() === iss.toLowerCase()
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs whitespace-nowrap"
                  : "border-white/10 text-white/70 hover:bg-white/10 text-xs whitespace-nowrap"
              }
            >
              {iss}
            </Button>
          ))}
        </div>
      </div>

      {/* Certificates Grid */}
      {filteredCerts.length === 0 ? (
        <AdminEmptyState
          icon={Award}
          title="No certificates found"
          description="Upload course credentials and certifications to display in your portfolio."
          actionLabel="Add Certificate"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <Card
              key={cert.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-slate-800 border-b border-white/10">
                  <img
                    src={cert.file_url || "/placeholder.jpg"}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-purple-600/80 text-white text-[10px] backdrop-blur-md">
                      {cert.issuer}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-semibold text-white text-base leading-snug line-clamp-2">
                    {cert.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-white/60">
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-2 text-purple-400" />
                      <span>{cert.issue_date}</span>
                    </div>
                    {cert.credential_id && (
                      <div className="flex items-center font-mono">
                        <FileCheck className="w-3.5 h-3.5 mr-2 text-pink-400" />
                        <span className="truncate">ID: {cert.credential_id}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {cert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/70 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(cert)}
                    className="border-white/10 text-white/80 hover:bg-white/10 text-xs px-2.5"
                  >
                    <Edit className="w-3 h-3 mr-1 text-purple-400" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteId(cert.id)}
                    className="text-white/40 hover:text-red-400 text-xs px-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {cert.credential_url ? (
                  <a href={cert.credential_url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300 text-xs px-2">
                      Verify <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </a>
                ) : (
                  <Badge variant="outline" className="text-[10px] border-white/10 text-white/40">
                    Self-Hosted
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit / Create Dialog */}
      {editingCert && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {editingCert.id ? "Edit Certificate" : "Add Certificate"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Course / Certificate Title *</Label>
                <Input
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. 2025 Python Crash Course For Absolute Beginners"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Issuer Organization *</Label>
                  <Input
                    required
                    value={editingCert.issuer}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    placeholder="e.g. Udemy, FosterAI, Coursera"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Issue Date</Label>
                  <Input
                    value={editingCert.issue_date}
                    onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                    placeholder="e.g. January 10, 2025"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Credential ID</Label>
                  <Input
                    value={editingCert.credential_id}
                    onChange={(e) => setEditingCert({ ...editingCert, credential_id: e.target.value })}
                    placeholder="e.g. UC-9ecd1405-..."
                    className="bg-white/5 border-white/10 text-white font-mono text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 text-xs">Verification URL</Label>
                  <Input
                    value={editingCert.credential_url || ""}
                    onChange={(e) => setEditingCert({ ...editingCert, credential_url: e.target.value })}
                    placeholder="https://udemy.com/certificate/..."
                    className="bg-white/5 border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Certificate Image / PDF File URL</Label>
                <Input
                  value={editingCert.file_url}
                  onChange={(e) => setEditingCert({ ...editingCert, file_url: e.target.value })}
                  placeholder="/certificates/python-crash-course.jpg"
                  className="bg-white/5 border-white/10 text-white text-xs"
                />
              </div>

              {/* Skills gained */}
              <div className="space-y-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <Label className="text-white text-xs font-semibold">Skills Gained</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="Type skill and press enter..."
                    className="bg-slate-900 border-white/10 text-white text-xs"
                  />
                  <Button type="button" size="sm" onClick={addSkill} className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {editingCert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-xs bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center gap-1"
                    >
                      {s}
                      <button type="button" onClick={() => removeSkill(s)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingCert.visible}
                    onCheckedChange={(checked) => setEditingCert({ ...editingCert, visible: checked })}
                  />
                  <Label className="text-white/80 text-xs cursor-pointer">Visible on Public Site</Label>
                </div>
              </div>

              <DialogFooter className="pt-3 border-t border-white/10">
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
                  <Save className="w-4 h-4 mr-2" /> Save Certificate
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
        title="Delete Certificate?"
        description="Are you sure you want to delete this certificate? It will be removed from your public gallery."
        confirmText="Delete Certificate"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import {
  Share2,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Save,
  CheckCircle2,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  Globe,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminConfirmDialog from "@/components/admin/admin-confirm-dialog"
import AdminEmptyState from "@/components/admin/admin-empty-state"
import { AdminStore } from "@/lib/admin-store"
import { type SocialLink } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminSocialsPage() {
  const [socials, setSocials] = useState<SocialLink[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setSocials(AdminStore.getSocialLinks())
  }, [])

  const handleOpenCreate = () => {
    const newSocial: SocialLink = {
      id: crypto.randomUUID ? crypto.randomUUID() : `social-${Date.now()}`,
      platform: "GitHub",
      label: "",
      url: "https://",
      icon: "Github",
      visible: true,
      status: "published",
      sort_order: socials.length + 1,
    }
    setEditingSocial(newSocial)
    setDialogOpen(true)
  }

  const handleOpenEdit = (social: SocialLink) => {
    setEditingSocial({ ...social })
    setDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSocial) return
    if (!editingSocial.platform || !editingSocial.url) {
      toast.error("Platform and URL are required")
      return
    }

    const current = AdminStore.getSocialLinks()
    const index = current.findIndex((s) => s.id === editingSocial.id)
    const updated = index >= 0 ? [...current] : [editingSocial, ...current]
    if (index >= 0) updated[index] = editingSocial

    AdminStore.saveSocialLinks(updated)
    setSocials(AdminStore.getSocialLinks())
    setDialogOpen(false)
    setEditingSocial(null)
    toast.success("Social link saved successfully!")
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      const updated = socials.filter((s) => s.id !== deleteId)
      AdminStore.saveSocialLinks(updated)
      setSocials(AdminStore.getSocialLinks())
      setDeleteId(null)
      toast.success("Social link removed.")
    }
  }

  const toggleVisibility = (social: SocialLink) => {
    const updated = socials.map((s) =>
      s.id === social.id ? { ...s, visible: !s.visible } : s
    )
    AdminStore.saveSocialLinks(updated)
    setSocials(AdminStore.getSocialLinks())
    toast.success(`Visibility updated for ${social.platform}`)
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Social & Profile Links"
        description="Manage the social profiles and contact handles displayed across the header, hero, and contact sections."
        actionLabel="Add Social Link"
        onAction={handleOpenCreate}
      />

      {socials.length === 0 ? (
        <AdminEmptyState
          icon={Share2}
          title="No social links configured"
          description="Add your GitHub, LinkedIn, WhatsApp, or Instagram links."
          actionLabel="Add Social Link"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="space-y-3">
          {socials.map((social) => (
            <Card
              key={social.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Share2 className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-base">{social.platform}</h3>
                      <Badge
                        variant="outline"
                        className={
                          social.visible
                            ? "bg-green-500/20 text-green-300 border-green-500/30 text-[10px]"
                            : "bg-white/10 text-white/50 border-white/10 text-[10px]"
                        }
                      >
                        {social.visible ? "Visible" : "Hidden"}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60 font-mono mt-0.5 truncate max-w-sm sm:max-w-md">
                      {social.url}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleVisibility(social)}
                    className="text-xs text-white/60 hover:text-white"
                  >
                    {social.visible ? "Hide" : "Show"}
                  </Button>

                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300 text-xs px-2">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(social)}
                    className="border-white/10 text-white/80 hover:bg-white/10 text-xs px-2.5"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1 text-purple-400" /> Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteId(social.id)}
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
      {editingSocial && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white">
                {editingSocial.id ? "Edit Social Link" : "Add Social Link"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-3">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Platform Name *</Label>
                <Input
                  required
                  value={editingSocial.platform}
                  onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                  placeholder="e.g. GitHub, LinkedIn, Twitter"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Label / Display Text</Label>
                <Input
                  value={editingSocial.label}
                  onChange={(e) => setEditingSocial({ ...editingSocial, label: e.target.value })}
                  placeholder="e.g. github.com/arsh090"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Destination URL *</Label>
                <Input
                  required
                  value={editingSocial.url}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  placeholder="https://..."
                  className="bg-white/5 border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <Label className="text-white/80 text-xs">Display on public site</Label>
                <Switch
                  checked={editingSocial.visible}
                  onCheckedChange={(checked) => setEditingSocial({ ...editingSocial, visible: checked })}
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
                  <Save className="w-4 h-4 mr-2" /> Save Link
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
        title="Remove Social Link?"
        description="Are you sure you want to remove this profile link?"
        confirmText="Remove"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

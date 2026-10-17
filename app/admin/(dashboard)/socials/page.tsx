"use client"

import { useState, useEffect } from "react"
import {
  Share2,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Save,
  ArrowUp,
  ArrowDown,
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
import { getSocialIconConfig, detectSocialIconName, COMMON_PLATFORMS } from "@/lib/social-icons"
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
      url: "https://github.com/",
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

  const handleSelectPreset = (preset: (typeof COMMON_PLATFORMS)[0]) => {
    if (!editingSocial) return
    const currentUrl = editingSocial.url || ""
    const shouldReplaceUrl = !currentUrl || currentUrl === "https://" || COMMON_PLATFORMS.some((p) => currentUrl === p.prefix)

    setEditingSocial({
      ...editingSocial,
      platform: preset.name,
      icon: preset.icon,
      url: shouldReplaceUrl ? preset.prefix : currentUrl,
    })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSocial) return
    if (!editingSocial.platform || !editingSocial.url) {
      toast.error("Platform and URL are required")
      return
    }

    const cleanedSocial: SocialLink = {
      ...editingSocial,
      platform: editingSocial.platform.trim(),
      url: editingSocial.url.trim(),
      icon: editingSocial.icon || detectSocialIconName(editingSocial.platform),
    }

    const current = AdminStore.getSocialLinks()
    const index = current.findIndex((s) => s.id === cleanedSocial.id)
    const updated = index >= 0 ? [...current] : [...current, cleanedSocial]
    if (index >= 0) updated[index] = cleanedSocial

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
    toast.success(`${social.platform} is now ${social.visible ? "hidden" : "visible"}`)
  }

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= socials.length) return

    const newSocials = [...socials]
    const temp = newSocials[index]
    newSocials[index] = newSocials[targetIndex]
    newSocials[targetIndex] = temp

    // Update sort_order
    newSocials.forEach((item, idx) => {
      item.sort_order = idx + 1
    })

    AdminStore.saveSocialLinks(newSocials)
    setSocials(AdminStore.getSocialLinks())
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Social & Profile Links"
        description="Manage the social profiles and contact handles displayed across the header, hero, contact, and footer sections."
        actionLabel="Add Social Link"
        onAction={handleOpenCreate}
      />

      {socials.length === 0 ? (
        <AdminEmptyState
          icon={Share2}
          title="No social links configured"
          description="Add your GitHub, LinkedIn, WhatsApp, Instagram, or custom profile links."
          actionLabel="Add Social Link"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="space-y-3">
          {socials.map((social, idx) => {
            const { Icon: PlatformIcon, brandColor, brandBg } = getSocialIconConfig(social.platform, social.icon)
            return (
              <Card
                key={social.id}
                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${brandBg} border border-white/10 flex items-center justify-center ${brandColor} flex-shrink-0`}>
                      <PlatformIcon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-base truncate">{social.platform}</h3>
                        {social.label && (
                          <span className="text-xs text-white/50 truncate hidden sm:inline">
                            ({social.label})
                          </span>
                        )}
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
                      <p className="text-xs text-white/60 font-mono mt-0.5 truncate max-w-xs sm:max-w-md">
                        {social.url}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={idx === 0}
                      onClick={() => moveItem(idx, "up")}
                      className="text-white/40 hover:text-white text-xs px-1.5 h-8 disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={idx === socials.length - 1}
                      onClick={() => moveItem(idx, "down")}
                      className="text-white/40 hover:text-white text-xs px-1.5 h-8 disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleVisibility(social)}
                      className="text-xs text-white/60 hover:text-white hidden sm:inline-flex"
                    >
                      {social.visible ? "Hide" : "Show"}
                    </Button>

                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300 text-xs px-2 h-8" title="Open Link">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEdit(social)}
                      className="border-white/10 text-white/80 hover:bg-white/10 text-xs px-2.5 h-8"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1 text-purple-400" /> Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeleteId(social.id)}
                      className="text-white/40 hover:text-red-400 text-xs px-2 h-8"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Edit / Create Dialog */}
      {editingSocial && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md bg-slate-900 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white">
                {editingSocial.id && socials.some((s) => s.id === editingSocial.id)
                  ? "Edit Social Link"
                  : "Add Social Link"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              {/* Quick platform presets */}
              <div className="space-y-1.5">
                <Label className="text-white/60 text-xs">Quick Presets</Label>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_PLATFORMS.map((preset) => {
                    const isSelected = editingSocial.platform.toLowerCase() === preset.name.toLowerCase()
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                          isSelected
                            ? "bg-purple-600/30 border-purple-500 text-purple-300"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {preset.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Platform Name *</Label>
                <Input
                  required
                  value={editingSocial.platform}
                  onChange={(e) => {
                    const val = e.target.value
                    setEditingSocial({
                      ...editingSocial,
                      platform: val,
                      icon: detectSocialIconName(val),
                    })
                  }}
                  placeholder="e.g. GitHub, LinkedIn, Twitter"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Label / Display Text (optional)</Label>
                <Input
                  value={editingSocial.label || ""}
                  onChange={(e) => setEditingSocial({ ...editingSocial, label: e.target.value })}
                  placeholder="e.g. github.com/arsh090 or @arsh090"
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
                <div>
                  <Label className="text-white/90 text-xs font-medium">Display on public site</Label>
                  <p className="text-[11px] text-white/50">Show this link in header, hero, and contact</p>
                </div>
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
        description="Are you sure you want to remove this profile link from your portfolio?"
        confirmText="Remove"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import {
  User,
  Save,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Image as ImageIcon,
  Globe,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import AdminPageHeader from "@/components/admin/admin-page-header"
import ImageUploadField from "@/components/admin/image-upload-field"
import { AdminStore } from "@/lib/admin-store"
import { type SiteSettings, initialSiteSettings } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminProfilePage() {
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setSettings(AdminStore.getSettings())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    AdminStore.saveSettings(settings)
    setTimeout(() => {
      setSaving(false)
      toast.success("Profile & Site Settings saved successfully!")
    }, 300)
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Profile & Site Settings"
        description="Edit your personal details, biography, contact information, availability badge, and SEO settings."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center">
              <User className="w-4 h-4 mr-2 text-purple-400" /> Personal Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Full Name *</Label>
                <Input
                  required
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Headline / Professional Title</Label>
                <Input
                  value={settings.headline}
                  onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
                  placeholder="e.g. Full Stack Web Developer & AI Enthusiast"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-xs">Tagline / Mission</Label>
              <Input
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                placeholder="Passionate about building practical tools that solve real-world problems..."
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-xs">Full Biography (Markdown Supported)</Label>
              <Textarea
                rows={4}
                value={settings.bio}
                onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                className="bg-white/5 border-white/10 text-white text-xs"
              />
            </div>

            <div className="space-y-4">
              <ImageUploadField
                label="Profile Picture (Avatar)"
                value={settings.photo_url}
                onChange={(url) => setSettings({ ...settings, photo_url: url })}
                placeholder="/profile/arsh-profile.jpg"
                aspectRatio="avatar"
                description="Upload your personal headshot from your device or media library."
              />

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Location</Label>
                <Input
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  placeholder="e.g. Jamshedpur, India"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Availability */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center">
              <Mail className="w-4 h-4 mr-2 text-pink-400" /> Contact & Availability
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Email Address</Label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Phone / WhatsApp Number</Label>
                <Input
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Availability Badge</h4>
                  <p className="text-xs text-white/60">Display a live status pill in the hero section</p>
                </div>
                <Switch
                  checked={settings.show_availability}
                  onCheckedChange={(checked) => setSettings({ ...settings, show_availability: checked })}
                />
              </div>

              {settings.show_availability && (
                <div className="space-y-2 pt-2">
                  <Label className="text-white/80 text-xs">Badge Text</Label>
                  <Input
                    value={settings.availability_text}
                    onChange={(e) => setSettings({ ...settings, availability_text: e.target.value })}
                    placeholder="e.g. Open to internships and full-time roles"
                    className="bg-slate-900 border-white/10 text-white text-xs"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-xs">Footer Copyright Text</Label>
              <Input
                value={settings.footer_text}
                onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Global SEO & Social Sharing */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center">
              <Globe className="w-4 h-4 mr-2 text-purple-400" /> Default SEO & Social Graph (Open Graph)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Meta Title Tag</Label>
                <Input
                  value={settings.meta_title}
                  onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <ImageUploadField
                  label="Open Graph Image"
                  value={settings.og_image_url}
                  onChange={(url) => setSettings({ ...settings, og_image_url: url })}
                  placeholder="https://.../og-image.jpg"
                  aspectRatio="video"
                  description="Social preview image (1200x630px recommended)."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-xs">Meta Description</Label>
              <Textarea
                rows={3}
                value={settings.meta_description}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                className="bg-white/5 border-white/10 text-white text-xs"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg shadow-purple-500/20"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving Changes..." : "Save Profile Settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}

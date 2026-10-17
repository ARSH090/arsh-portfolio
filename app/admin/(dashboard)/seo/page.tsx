"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Save,
  Globe,
  FileCode,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import AdminPageHeader from "@/components/admin/admin-page-header"
import ImageUploadField from "@/components/admin/image-upload-field"
import { AdminStore } from "@/lib/admin-store"
import { type SiteSettings, initialSiteSettings } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminSeoPage() {
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings)
  const [siteUrl, setSiteUrl] = useState("https://arsh-port.netlify.app")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setSettings(AdminStore.getSettings())
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    AdminStore.saveSettings(settings)
    setTimeout(() => {
      setSaving(false)
      toast.success("SEO settings saved!")
    }, 200)
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/projects</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/certificates</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/resume</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="SEO & Search Engine Indexing"
        description="Configure search engine metadata, Open Graph cards for Twitter & LinkedIn, and preview your XML sitemap."
      />

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center">
              <Globe className="w-4 h-4 mr-2 text-purple-400" /> Global Search Metadata
            </h3>

            <div className="space-y-2">
              <Label className="text-white/80 text-xs">Primary Meta Title (max 60 chars recommended)</Label>
              <Input
                value={settings.meta_title}
                onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
              <p className="text-[11px] text-white/50">
                Current length: {settings.meta_title.length} characters
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 text-xs">Meta Description (150-160 chars recommended)</Label>
              <Textarea
                rows={3}
                value={settings.meta_description}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                className="bg-white/5 border-white/10 text-white text-xs"
              />
              <p className="text-[11px] text-white/50">
                Current length: {settings.meta_description.length} characters
              </p>
            </div>

            <ImageUploadField
              label="Open Graph / Twitter Card Image"
              value={settings.og_image_url}
              onChange={(url) => setSettings({ ...settings, og_image_url: url })}
              placeholder="https://.../og-image.jpg"
              aspectRatio="video"
              description="Social preview thumbnail when your portfolio link is shared on Twitter, LinkedIn, and Discord."
            />

            {/* Google Search Result Preview */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">
                Google Search Result Preview
              </span>
              <p className="text-xs text-purple-400 truncate">{siteUrl}</p>
              <h4 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                {settings.meta_title}
              </h4>
              <p className="text-xs text-white/70 line-clamp-2">{settings.meta_description}</p>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" /> Save Metadata
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* XML Sitemap Live Preview */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center">
                <FileCode className="w-4 h-4 mr-2 text-pink-400" /> Sitemap Preview (sitemap.xml)
              </h3>
              <a href="/sitemap.xml" target="_blank">
                <Button size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/10 text-xs">
                  View sitemap.xml <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </a>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-purple-300 border border-white/10 overflow-x-auto max-h-56">
              <pre>{sitemapXml}</pre>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

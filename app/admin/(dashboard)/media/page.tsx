"use client"

import { useState, useEffect } from "react"
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Trash2,
  ExternalLink,
  Check,
  Search,
  Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminConfirmDialog from "@/components/admin/admin-confirm-dialog"
import AdminEmptyState from "@/components/admin/admin-empty-state"
import { AdminStore, type MediaItem } from "@/lib/admin-store"
import { toast } from "sonner"

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setMediaItems(AdminStore.getMedia())
  }, [])

  const filteredMedia = mediaItems.filter(
    (m) =>
      m.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.alt_text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.file_url)
    setCopiedId(item.id)
    toast.success("Image URL copied to clipboard!")
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Client-side WebP conversion and compression
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height

          // Cap max width to 1920px for web optimization
          if (width > 1920) {
            height = (height * 1920) / width
            width = 1920
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            // Convert to WebP format with 0.85 quality
            const webpDataUrl = canvas.toDataURL("image/webp", 0.85)
            resolve(webpDataUrl)
          } else {
            resolve(e.target?.result as string)
          }
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const dataUrl = await processImageFile(file)
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "")

        AdminStore.addMedia({
          file_url: dataUrl,
          file_name: `${nameWithoutExt}.webp`,
          mime_type: "image/webp",
          size: Math.round(dataUrl.length * 0.75),
          alt_text: nameWithoutExt,
        })
      }
      setMediaItems(AdminStore.getMedia())
      toast.success(`${files.length} file(s) converted to WebP and added!`)
    } catch (err) {
      toast.error("Error processing file.")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      AdminStore.deleteMedia(deleteId)
      setMediaItems(AdminStore.getMedia())
      setDeleteId(null)
      toast.success("Media item deleted.")
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Media Library"
        description="Upload photos, project covers, and screenshots with automatic WebP conversion and client-side compression."
      >
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            type="button"
            disabled={uploading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Compressing & Uploading..." : "Upload Images"}
          </Button>
        </label>
      </AdminPageHeader>

      {/* Search and dropzone info */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-white/30 text-sm"
          />
        </div>

        <div className="text-xs text-purple-300/80 flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-yellow-400" />
          Auto-compressed to next-gen WebP
        </div>
      </div>

      {filteredMedia.length === 0 ? (
        <AdminEmptyState
          icon={ImageIcon}
          title="No media files found"
          description="Upload images to use them in your projects, certificates, and site banners."
          actionLabel="Upload Media"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <Card
              key={item.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img
                  src={item.file_url}
                  alt={item.alt_text}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 space-y-1">
                <p className="font-medium text-xs text-white truncate" title={item.file_name}>
                  {item.file_name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-white/50">
                  <span>{formatBytes(item.size)}</span>
                  <Badge variant="outline" className="border-white/10 text-[9px] py-0">
                    {item.mime_type}
                  </Badge>
                </div>
              </div>

              <div className="p-2 border-t border-white/10 flex items-center justify-between">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopyUrl(item)}
                  className="text-xs text-purple-400 hover:text-purple-300 px-2 h-7"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3 h-3 mr-1 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 mr-1" />
                  )}
                  {copiedId === item.id ? "Copied" : "Copy URL"}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeleteId(item.id)}
                  className="text-white/40 hover:text-red-400 px-1.5 h-7"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Media File?"
        description="Are you sure you want to permanently delete this media file?"
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Trash2,
  ExternalLink,
  Check,
  Search,
  Sparkles,
  Loader2,
  Plus,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // Client-side WebP compression fallback
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height

          if (width > 1920) {
            height = (height * 1920) / width
            width = 1920
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
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

  const handleUploadFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return

    setUploading(true)
    const toastId = toast.loading(`Uploading ${files.length} local image(s) from device...`)

    try {
      let successCount = 0

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file.type.startsWith("image/")) continue

        try {
          // Attempt server-side upload to /uploads/
          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          })

          if (response.ok) {
            const data = await response.json()
            AdminStore.addMedia({
              file_url: data.url,
              file_name: data.fileName,
              mime_type: data.mimeType || file.type,
              size: data.size || file.size,
              alt_text: file.name.replace(/\.[^/.]+$/, ""),
            })
            successCount++
            continue
          }
        } catch {
          // Fall through to client WebP conversion
        }

        // Fallback: local WebP conversion
        const dataUrl = await processImageFile(file)
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "")

        AdminStore.addMedia({
          file_url: dataUrl,
          file_name: `${nameWithoutExt}.webp`,
          mime_type: "image/webp",
          size: Math.round(dataUrl.length * 0.75),
          alt_text: nameWithoutExt,
        })
        successCount++
      }

      setMediaItems(AdminStore.getMedia())
      toast.success(`Successfully uploaded ${successCount} local image(s) from device!`, { id: toastId })
    } catch (err) {
      toast.error("Error processing local images.", { id: toastId })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUploadFiles(e.target.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      handleUploadFiles(e.dataTransfer.files)
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
        description="Add local images from your device, organize assets, and use them throughout your portfolio."
      >
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <Button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {uploading ? "Uploading..." : "Add Images from Device"}
          </Button>
        </div>
      </AdminPageHeader>

      {/* Local Image Dropzone Banner */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDragging
            ? "border-purple-400 bg-purple-500/10 scale-[1.01]"
            : "border-white/10 hover:border-purple-400/50 bg-white/[0.02] hover:bg-white/[0.04]"
        }`}
      >
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">
              Drag & Drop Local Images Here
            </h4>
            <p className="text-xs text-white/50 mt-0.5">
              Supports JPEG, PNG, WebP, SVG, and GIF up to 10MB each
            </p>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-xs flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Browse Files on Device
        </Button>
      </div>

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
          Auto-compressed & stored locally in /uploads/
        </div>
      </div>

      {filteredMedia.length === 0 ? (
        <AdminEmptyState
          icon={ImageIcon}
          title="No media files found"
          description="Upload local images from your device to use in projects, certificates, and site banners."
          actionLabel="Choose from Device"
          onAction={() => fileInputRef.current?.click()}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <Card
              key={item.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              <div
                onClick={() => setPreviewItem(item)}
                className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer"
              >
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

      {/* Image Preview Modal */}
      <Dialog open={!!previewItem} onOpenChange={(open) => !open && setPreviewItem(null)}>
        <DialogContent className="max-w-3xl bg-slate-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold truncate">
              {previewItem?.file_name}
            </DialogTitle>
          </DialogHeader>
          {previewItem && (
            <div className="space-y-4">
              <div className="max-h-[60vh] overflow-hidden rounded-xl bg-black flex items-center justify-center">
                <img
                  src={previewItem.file_url}
                  alt={previewItem.alt_text}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs space-y-0.5">
                  <p className="text-white font-mono truncate max-w-md">{previewItem.file_url}</p>
                  <p className="text-white/50">{formatBytes(previewItem.size)} • {previewItem.mime_type}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleCopyUrl(previewItem)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
                >
                  <Copy className="w-3 h-3 mr-1.5" />
                  Copy URL
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

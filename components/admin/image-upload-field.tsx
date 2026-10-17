"use client"

import { useState, useRef, useEffect } from "react"
import {
  Upload,
  Image as ImageIcon,
  X,
  FolderOpen,
  Link as LinkIcon,
  Check,
  Loader2,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AdminStore, type MediaItem } from "@/lib/admin-store"
import { toast } from "sonner"

interface ImageUploadFieldProps {
  label: string
  value?: string
  onChange: (url: string) => void
  description?: string
  placeholder?: string
  aspectRatio?: "video" | "square" | "avatar" | "auto"
  className?: string
}

export default function ImageUploadField({
  label,
  value = "",
  onChange,
  description,
  placeholder = "/placeholder.jpg",
  aspectRatio = "auto",
  className = "",
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [customUrl, setCustomUrl] = useState(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setCustomUrl(value)
  }, [value])

  const loadMediaLibrary = () => {
    setMediaItems(AdminStore.getMedia())
  }

  // Upload file to server /uploads/ and update AdminStore
  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WebP, SVG, GIF).")
      return
    }

    setUploading(true)
    const toastId = toast.loading(`Uploading ${file.name} from your device...`)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      // Add to AdminStore for persistent media management
      AdminStore.addMedia({
        file_url: data.url,
        file_name: data.fileName,
        mime_type: data.mimeType || file.type,
        size: data.size || file.size,
        alt_text: file.name.replace(/\.[^/.]+$/, ""),
      })

      onChange(data.url)
      setCustomUrl(data.url)
      toast.success("Image uploaded from device successfully!", { id: toastId })
    } catch (err: any) {
      console.warn("Server upload failed, falling back to local base64/data URL:", err)

      // Fallback: convert file to local WebP data URL
      try {
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
              onChange(webpDataUrl)
              setCustomUrl(webpDataUrl)
              AdminStore.addMedia({
                file_url: webpDataUrl,
                file_name: `${file.name.replace(/\.[^/.]+$/, "")}.webp`,
                mime_type: "image/webp",
                size: Math.round(webpDataUrl.length * 0.75),
                alt_text: file.name,
              })
              toast.success("Image saved locally from device!", { id: toastId })
            }
          }
          img.src = e.target?.result as string
        }
        reader.readAsDataURL(file)
      } catch (fallbackErr) {
        toast.error("Failed to process local image file.", { id: toastId })
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadFile(file)
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
    const file = e.dataTransfer.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handleClear = () => {
    onChange("")
    setCustomUrl("")
  }

  const handleApplyUrl = () => {
    onChange(customUrl.trim())
    setShowUrlInput(false)
    toast.success("Image URL updated")
  }

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "video":
        return "aspect-video"
      case "square":
        return "aspect-square max-w-[200px]"
      case "avatar":
        return "w-24 h-24 rounded-full"
      default:
        return "h-40"
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-white/80 text-xs font-medium flex items-center">
          <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
          {label}
        </Label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              loadMediaLibrary()
              setShowLibrary(true)
            }}
            className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center transition-colors"
          >
            <FolderOpen className="w-3 h-3 mr-1" />
            Media Library
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-white/50 hover:text-white/80 flex items-center transition-colors"
          >
            <LinkIcon className="w-3 h-3 mr-1" />
            {showUrlInput ? "Hide URL" : "Paste URL"}
          </button>
        </div>
      </div>

      {description && (
        <p className="text-[11px] text-white/50">{description}</p>
      )}

      {/* Manual URL Input mode */}
      {showUrlInput && (
        <div className="flex gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
          <Input
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder={placeholder}
            className="bg-slate-900 border-white/10 text-white text-xs h-8"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleApplyUrl}
            className="h-8 px-3 bg-purple-600 hover:bg-purple-700 text-white text-xs"
          >
            Apply
          </Button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image Preview & Local Upload Zone */}
      {value ? (
        <div className="relative group rounded-xl border border-white/10 bg-slate-950/60 overflow-hidden p-2">
          <div className="flex items-center gap-3">
            <div
              className={`relative overflow-hidden rounded-lg bg-slate-900 flex-shrink-0 flex items-center justify-center ${
                aspectRatio === "avatar"
                  ? "w-16 h-16 rounded-full border border-purple-500/40"
                  : "w-28 h-20 p-1 border border-white/10"
              }`}
            >
              <img
                src={value}
                alt={label}
                className={
                  aspectRatio === "avatar"
                    ? "w-full h-full object-cover object-top"
                    : "max-h-full max-w-full w-auto h-auto object-contain"
                }
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = placeholder
                }}
              />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <p className="text-xs font-mono text-white/80 truncate">{value}</p>
              <p className="text-[10px] text-white/40 mt-0.5">
                Local image active • Ready to publish
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="h-7 text-xs border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-2.5"
                >
                  {uploading ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Upload className="w-3 h-3 mr-1" />
                  )}
                  Upload New from Device
                </Button>
                {value.startsWith("http") || value.startsWith("/") ? (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-white/40 hover:text-white flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> View
                  </a>
                ) : null}
              </div>
            </div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleClear}
              className="text-white/40 hover:text-red-400 hover:bg-red-500/10 h-7 w-7 rounded-lg"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        /* Empty Dropzone for picking from device */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 p-5 text-center flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? "border-purple-400 bg-purple-500/10"
              : "border-white/10 hover:border-purple-400/50 bg-white/[0.02] hover:bg-white/[0.04]"
          }`}
        >
          {uploading ? (
            <div className="py-2 flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
              <p className="text-xs text-purple-300 font-medium">
                Uploading local image from device...
              </p>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  Click to add local image from device
                </p>
                <p className="text-[11px] text-white/40 mt-0.5">
                  or drag & drop here (PNG, JPG, WebP, SVG, max 10MB)
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                className="mt-1 h-7 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-xs border border-purple-500/30"
              >
                <Upload className="w-3 h-3 mr-1.5" />
                Browse Device
              </Button>
            </>
          )}
        </div>
      )}

      {/* Media Library Dialog */}
      <Dialog open={showLibrary} onOpenChange={setShowLibrary}>
        <DialogContent className="max-w-3xl bg-slate-900 border-white/10 text-white max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center">
              <FolderOpen className="w-5 h-5 mr-2 text-purple-400" />
              Select from Media Library
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <p className="text-xs text-white/60">
              Choose an existing image or upload a new one directly.
            </p>
            <Button
              type="button"
              size="sm"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-8"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              Upload from Device
            </Button>
          </div>

          <div className="overflow-y-auto flex-1 py-3">
            {mediaItems.length === 0 ? (
              <div className="text-center py-12 text-white/50 text-xs">
                No images uploaded yet. Click &quot;Upload from Device&quot; to add your first image.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {mediaItems.map((item) => {
                  const isSelected = value === item.file_url
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        onChange(item.file_url)
                        setCustomUrl(item.file_url)
                        setShowLibrary(false)
                        toast.success("Image selected from library")
                      }}
                      className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all aspect-video bg-slate-950 flex flex-col justify-end ${
                        isSelected
                          ? "border-purple-500 ring-2 ring-purple-500/50"
                          : "border-white/10 hover:border-purple-400/50"
                      }`}
                    >
                      <img
                        src={item.file_url}
                        alt={item.alt_text}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                      <div className="relative z-10 p-2">
                        <p className="text-[10px] text-white font-medium truncate">
                          {item.file_name}
                        </p>
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-purple-600 rounded-full p-0.5 shadow-lg">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

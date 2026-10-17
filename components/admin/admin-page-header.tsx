"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminPageHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  children?: React.ReactNode
}

export default function AdminPageHeader({
  title,
  description,
  actionLabel,
  onAction,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h2>
        {description && <p className="text-sm text-white/60 mt-1">{description}</p>}
      </div>

      <div className="flex items-center space-x-3">
        {children}
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

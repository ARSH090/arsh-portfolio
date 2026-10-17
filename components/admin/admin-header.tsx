"use client"

import Link from "next/link"
import { ExternalLink, ShieldCheck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AdminHeaderProps {
  title?: string
  subtitle?: string
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div>
        {title && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            {title}
          </h1>
        )}
        {subtitle && <p className="text-xs text-white/60 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-3">
        <Badge
          variant="outline"
          className="hidden sm:inline-flex bg-green-500/10 text-green-300 border-green-500/30 text-xs py-1"
        >
          <ShieldCheck className="w-3.5 h-3.5 mr-1 text-green-400" /> Admin Authorized
        </Badge>

        <div className="hidden md:flex items-center space-x-2 text-xs text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1">
          <User className="w-3 h-3 text-purple-400" />
          <span>arshh12145@gmail.com</span>
        </div>

        <Link href="/" target="_blank">
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 text-white hover:bg-white/10 text-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1 text-purple-400" />
            <span className="hidden sm:inline">View Site</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}

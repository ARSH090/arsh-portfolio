"use client"

import { useState, useEffect } from "react"
import {
  Layers,
  Save,
  GripVertical,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import AdminPageHeader from "@/components/admin/admin-page-header"
import { AdminStore } from "@/lib/admin-store"
import { type PageSection } from "@/lib/initial-data"
import { toast } from "sonner"

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<PageSection[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setSections(AdminStore.getSections())
  }, [])

  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= sections.length) return

    const updated = [...sections]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    // Update sort_order
    updated.forEach((s, idx) => {
      s.sort_order = idx + 1
    })

    setSections(updated)
    AdminStore.saveSections(updated)
    toast.success("Section reordered.")
  }

  const toggleSection = (id: string) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    )
    setSections(updated)
    AdminStore.saveSections(updated)
    toast.success("Section visibility updated.")
  }

  const updateSectionText = (id: string, field: "title" | "subtitle", value: string) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    )
    setSections(updated)
  }

  const handleSaveAll = () => {
    setSaving(true)
    AdminStore.saveSections(sections)
    setTimeout(() => {
      setSaving(false)
      toast.success("All section titles and settings saved!")
    }, 200)
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Homepage Sections & Layout"
        description="Enable or disable homepage sections, reorder their visual layout, and customize their titles and subheadings."
      >
        <Button
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Layout"}
        </Button>
      </AdminPageHeader>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card
            key={section.id}
            className={`backdrop-blur-md transition-all duration-200 border-white/10 ${
              section.enabled ? "bg-white/5 hover:bg-white/10" : "bg-white/[0.02] opacity-60"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col space-y-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={index === 0}
                      onClick={() => moveSection(index, "up")}
                      className="h-6 w-6 text-white/50 hover:text-white disabled:opacity-20"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={index === sections.length - 1}
                      onClick={() => moveSection(index, "down")}
                      className="h-6 w-6 text-white/50 hover:text-white disabled:opacity-20"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <span className="w-6 text-center font-mono text-xs text-white/40">
                    #{index + 1}
                  </span>

                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-purple-400">
                      key: {section.key}
                    </span>
                    <Input
                      value={section.title}
                      onChange={(e) => updateSectionText(section.id, "title", e.target.value)}
                      placeholder="Section Title"
                      className="bg-slate-900/60 border-white/10 text-white font-semibold text-sm h-8"
                    />
                  </div>
                </div>

                <div className="flex-1 md:px-4">
                  <Input
                    value={section.subtitle}
                    onChange={(e) => updateSectionText(section.id, "subtitle", e.target.value)}
                    placeholder="Section Subtitle / Description"
                    className="bg-slate-900/40 border-white/10 text-white/70 text-xs h-8"
                  />
                </div>

                <div className="flex items-center space-x-3 self-end md:self-center">
                  <Label className="text-white/70 text-xs cursor-pointer">
                    {section.enabled ? "Enabled" : "Disabled"}
                  </Label>
                  <Switch
                    checked={section.enabled}
                    onCheckedChange={() => toggleSection(section.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

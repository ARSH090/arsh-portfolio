"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code2,
  Server,
  Cloud,
  Cpu,
  Database,
  Terminal,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export interface SkillCategoryData {
  id: string
  name: string
  skills: string[]
}

interface SkillsCloudProps {
  categories: SkillCategoryData[]
}

// Visual theme configurations per category
const CATEGORY_THEMES: Record<
  string,
  {
    icon: any
    color: string
    borderColor: string
    bgGradient: string
    badgeBg: string
    badgeBorder: string
    badgeText: string
    dotColor: string
    glowColor: string
  }
> = {
  Frontend: {
    icon: Code2,
    color: "from-cyan-400 to-blue-500",
    borderColor: "border-cyan-500/30 hover:border-cyan-400/60",
    bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    badgeBg: "bg-cyan-500/10 hover:bg-cyan-500/20",
    badgeBorder: "border-cyan-500/30 hover:border-cyan-400/60",
    badgeText: "text-cyan-200",
    dotColor: "bg-cyan-400",
    glowColor: "shadow-cyan-500/20",
  },
  Backend: {
    icon: Server,
    color: "from-emerald-400 to-teal-500",
    borderColor: "border-emerald-500/30 hover:border-emerald-400/60",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    badgeBg: "bg-emerald-500/10 hover:bg-emerald-500/20",
    badgeBorder: "border-emerald-500/30 hover:border-emerald-400/60",
    badgeText: "text-emerald-200",
    dotColor: "bg-emerald-400",
    glowColor: "shadow-emerald-500/20",
  },
  "Cloud and DevOps": {
    icon: Cloud,
    color: "from-sky-400 to-indigo-500",
    borderColor: "border-sky-500/30 hover:border-sky-400/60",
    bgGradient: "from-sky-500/10 via-indigo-500/5 to-transparent",
    badgeBg: "bg-sky-500/10 hover:bg-sky-500/20",
    badgeBorder: "border-sky-500/30 hover:border-sky-400/60",
    badgeText: "text-sky-200",
    dotColor: "bg-sky-400",
    glowColor: "shadow-sky-500/20",
  },
  "AI and Automation": {
    icon: Cpu,
    color: "from-pink-400 to-rose-500",
    borderColor: "border-pink-500/30 hover:border-pink-400/60",
    bgGradient: "from-pink-500/10 via-rose-500/5 to-transparent",
    badgeBg: "bg-pink-500/10 hover:bg-pink-500/20",
    badgeBorder: "border-pink-500/30 hover:border-pink-400/60",
    badgeText: "text-pink-200",
    dotColor: "bg-pink-400",
    glowColor: "shadow-pink-500/20",
  },
  Database: {
    icon: Database,
    color: "from-amber-400 to-orange-500",
    borderColor: "border-amber-500/30 hover:border-amber-400/60",
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    badgeBg: "bg-amber-500/10 hover:bg-amber-500/20",
    badgeBorder: "border-amber-500/30 hover:border-amber-400/60",
    badgeText: "text-amber-200",
    dotColor: "bg-amber-400",
    glowColor: "shadow-amber-500/20",
  },
  Languages: {
    icon: Terminal,
    color: "from-purple-400 to-violet-500",
    borderColor: "border-purple-500/30 hover:border-purple-400/60",
    bgGradient: "from-purple-500/10 via-violet-500/5 to-transparent",
    badgeBg: "bg-purple-500/10 hover:bg-purple-500/20",
    badgeBorder: "border-purple-500/30 hover:border-purple-400/60",
    badgeText: "text-purple-200",
    dotColor: "bg-purple-400",
    glowColor: "shadow-purple-500/20",
  },
}

const DEFAULT_THEME = {
  icon: Layers,
  color: "from-purple-400 to-pink-500",
  borderColor: "border-purple-500/30 hover:border-purple-400/60",
  bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  badgeBg: "bg-purple-500/10 hover:bg-purple-500/20",
  badgeBorder: "border-purple-500/30 hover:border-purple-400/60",
  badgeText: "text-purple-200",
  dotColor: "bg-purple-400",
  glowColor: "shadow-purple-500/20",
}

export default function SkillsCloud({ categories }: SkillsCloudProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Filter categories based on selected tab and search query
  const filteredCategories = categories
    .filter((cat) => (selectedCategory === "all" ? true : cat.name === selectedCategory))
    .map((cat) => {
      if (!searchQuery.trim()) return cat
      const matchingSkills = cat.skills.filter((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
      return {
        ...cat,
        skills: matchingSkills,
      }
    })
    .filter((cat) => cat.skills.length > 0)

  const totalSkillsCount = categories.reduce((sum, c) => sum + c.skills.length, 0)

  return (
    <div className="space-y-10">
      {/* Category Filter Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Interactive Category Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 border ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30 scale-105"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Clouds</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-white/90">
              {totalSkillsCount}
            </span>
          </button>

          {categories.map((cat) => {
            const theme = CATEGORY_THEMES[cat.name] || DEFAULT_THEME
            const Icon = theme.icon
            const isSelected = selectedCategory === cat.name
            return (
              <button
                key={cat.id || cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30 scale-105"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-purple-300" />
                <span>{cat.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-white/80">
                  {cat.skills.length}
                </span>
              </button>
            )
          })}
        </div>

        {/* Live Filter Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter skills..."
            className="pl-9 h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-xs rounded-full focus:border-purple-400"
          />
        </div>
      </div>

      {/* Categorized Skill Clouds Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCategories.map((cat, catIdx) => {
            const theme = CATEGORY_THEMES[cat.name] || DEFAULT_THEME
            const Icon = theme.icon

            return (
              <motion.div
                key={cat.id || cat.name}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: catIdx * 0.05 }}
              >
                <Card
                  className={`relative overflow-hidden bg-white/5 backdrop-blur-xl border ${theme.borderColor} transition-all duration-300 hover:shadow-xl ${theme.glowColor} h-full flex flex-col justify-between`}
                >
                  {/* Glowing Top Ambient Accent */}
                  <div
                    className={`h-1.5 bg-gradient-to-r ${theme.color}`}
                  />

                  <CardContent className="p-6 space-y-5">
                    {/* Cloud Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.bgGradient} border border-white/10 flex items-center justify-center text-white shadow-md`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            {cat.name}
                          </h3>
                          <p className="text-[11px] text-white/50">
                            {cat.skills.length} specialized technologies
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className="border-white/10 text-[10px] text-white/60 uppercase tracking-wider py-0.5"
                      >
                        Cloud
                      </Badge>
                    </div>

                    {/* Skill Cloud Pills Cluster */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {cat.skills.map((skill, skillIdx) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.03 * skillIdx, duration: 0.3 }}
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText} transition-all duration-200 shadow-sm cursor-default select-none`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${theme.dotColor} animate-pulse`}
                            />
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-white/50 text-xs">
          No skills match &quot;{searchQuery}&quot;. Try a different search term or category.
        </div>
      )}
    </div>
  )
}

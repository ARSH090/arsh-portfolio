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
  X,
  Zap,
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

const CATEGORY_THEMES: Record<
  string,
  {
    icon: any
    color: string
    borderColor: string
    badgeBg: string
    badgeBorder: string
    badgeText: string
    dotColor: string
    glowColor: string
    ambientBg: string
  }
> = {
  Frontend: {
    icon: Code2,
    color: "from-cyan-400 via-sky-400 to-blue-500",
    borderColor: "border-cyan-500/30 hover:border-cyan-400/70",
    badgeBg: "bg-cyan-500/10 hover:bg-cyan-500/20",
    badgeBorder: "border-cyan-500/25 hover:border-cyan-400/60",
    badgeText: "text-cyan-200",
    dotColor: "bg-cyan-400",
    glowColor: "group-hover:shadow-cyan-500/20",
    ambientBg: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  Backend: {
    icon: Server,
    color: "from-emerald-400 via-teal-400 to-green-500",
    borderColor: "border-emerald-500/30 hover:border-emerald-400/70",
    badgeBg: "bg-emerald-500/10 hover:bg-emerald-500/20",
    badgeBorder: "border-emerald-500/25 hover:border-emerald-400/60",
    badgeText: "text-emerald-200",
    dotColor: "bg-emerald-400",
    glowColor: "group-hover:shadow-emerald-500/20",
    ambientBg: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  "Cloud and DevOps": {
    icon: Cloud,
    color: "from-sky-400 via-indigo-400 to-purple-500",
    borderColor: "border-sky-500/30 hover:border-sky-400/70",
    badgeBg: "bg-sky-500/10 hover:bg-sky-500/20",
    badgeBorder: "border-sky-500/25 hover:border-sky-400/60",
    badgeText: "text-sky-200",
    dotColor: "bg-sky-400",
    glowColor: "group-hover:shadow-sky-500/20",
    ambientBg: "from-sky-500/10 via-indigo-500/5 to-transparent",
  },
  "AI and Automation": {
    icon: Cpu,
    color: "from-pink-400 via-rose-400 to-purple-500",
    borderColor: "border-pink-500/30 hover:border-pink-400/70",
    badgeBg: "bg-pink-500/10 hover:bg-pink-500/20",
    badgeBorder: "border-pink-500/25 hover:border-pink-400/60",
    badgeText: "text-pink-200",
    dotColor: "bg-pink-400",
    glowColor: "group-hover:shadow-pink-500/20",
    ambientBg: "from-pink-500/10 via-rose-500/5 to-transparent",
  },
  Database: {
    icon: Database,
    color: "from-amber-400 via-orange-400 to-yellow-500",
    borderColor: "border-amber-500/30 hover:border-amber-400/70",
    badgeBg: "bg-amber-500/10 hover:bg-amber-500/20",
    badgeBorder: "border-amber-500/25 hover:border-amber-400/60",
    badgeText: "text-amber-200",
    dotColor: "bg-amber-400",
    glowColor: "group-hover:shadow-amber-500/20",
    ambientBg: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  Languages: {
    icon: Terminal,
    color: "from-purple-400 via-fuchsia-400 to-pink-500",
    borderColor: "border-purple-500/30 hover:border-purple-400/70",
    badgeBg: "bg-purple-500/10 hover:bg-purple-500/20",
    badgeBorder: "border-purple-500/25 hover:border-purple-400/60",
    badgeText: "text-purple-200",
    dotColor: "bg-purple-400",
    glowColor: "group-hover:shadow-purple-500/20",
    ambientBg: "from-purple-500/10 via-fuchsia-500/5 to-transparent",
  },
}

const DEFAULT_THEME = {
  icon: Layers,
  color: "from-purple-400 to-pink-500",
  borderColor: "border-purple-500/30 hover:border-purple-400/70",
  badgeBg: "bg-purple-500/10 hover:bg-purple-500/20",
  badgeBorder: "border-purple-500/25 hover:border-purple-400/60",
  badgeText: "text-purple-200",
  dotColor: "bg-purple-400",
  glowColor: "group-hover:shadow-purple-500/20",
  ambientBg: "from-purple-500/10 via-pink-500/5 to-transparent",
}

export default function SkillsCloud({ categories }: SkillsCloudProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

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
    <div className="space-y-10 relative">
      {/* Decorative Animated Glowing Background Orbs */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />

      {/* Filter and Search Bar with Animated Pill Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-lg relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
              selectedCategory === "all"
                ? "text-white shadow-md shadow-purple-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {selectedCategory === "all" && (
              <motion.div
                layoutId="activeSkillTab"
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Sparkles className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">All Skills</span>
            <span className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-white/90">
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
                className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  isSelected
                    ? "text-white shadow-md shadow-purple-500/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10 text-purple-300" />
                <span className="relative z-10">{cat.name}</span>
                <span className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-white/80">
                  {cat.skills.length}
                </span>
              </button>
            )
          })}
        </div>

        {/* Live Filter Search */}
        <div className="relative w-full md:w-64 pr-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technology..."
            className="pl-10 pr-8 h-10 bg-slate-900/60 border-white/10 text-white placeholder:text-white/30 text-xs rounded-xl focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Categorized Animated Skill Cards */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {filteredCategories.map((cat, catIdx) => {
            const theme = CATEGORY_THEMES[cat.name] || DEFAULT_THEME
            const Icon = theme.icon

            return (
              <motion.div
                key={cat.id || cat.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: catIdx * 0.06 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <Card
                  className={`group relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border ${theme.borderColor} transition-all duration-300 rounded-2xl shadow-xl hover:shadow-2xl ${theme.glowColor} h-full flex flex-col justify-between`}
                >
                  {/* Glowing Animated Top Accent Bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${theme.color}`} />

                  {/* Radial Ambient Glow */}
                  <div
                    className={`absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br ${theme.ambientBg} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}
                  />

                  <CardContent className="p-6 space-y-5 relative z-10 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white shadow-lg"
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-base font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                              {cat.name}
                            </h3>
                            <p className="text-[11px] text-white/50">
                              {cat.skills.length} specialized tools
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className="border-white/10 text-[10px] text-white/60 bg-white/5 py-0.5"
                        >
                          <Zap className="w-2.5 h-2.5 mr-1 text-yellow-400" /> Core
                        </Badge>
                      </div>

                      {/* Interactive Animated Skill Tags */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {cat.skills.map((skill, skillIdx) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.02 * skillIdx, duration: 0.25 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onHoverStart={() => setHoveredSkill(skill)}
                            onHoverEnd={() => setHoveredSkill(null)}
                          >
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText} transition-all duration-200 shadow-sm cursor-pointer select-none backdrop-blur-md ${
                                hoveredSkill === skill
                                  ? "ring-2 ring-purple-400/50 shadow-lg shadow-purple-500/20"
                                  : ""
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${theme.dotColor} animate-pulse`}
                              />
                              {skill}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status Indicator */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
                      <span>Production Ready</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Active
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16 text-white/50 text-sm bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md">
          <p>No skills found matching &quot;{searchQuery}&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
            className="mt-3 text-xs text-purple-400 hover:text-purple-300 underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

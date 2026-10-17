"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  FileText,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ParticleBackground from "@/components/particle-background"
import { initialResumes, type Resume } from "@/lib/initial-data"
import { AdminStore } from "@/lib/admin-store"

export default function ResumePage() {
  const [activeResume, setActiveResume] = useState<Resume>(initialResumes[0])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveResume(AdminStore.getActiveResume())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24 text-white relative">
      <ParticleBackground />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <Link href="/">
            <Button
              variant="outline"
              className="border-white/10 text-white/80 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <a href={activeResume.file_url} target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20">
              <Download className="w-4 h-4 mr-2" /> Download Official CV
            </Button>
          </a>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-3" variant="outline">
            <Sparkles className="w-3 h-3 mr-1 text-yellow-400" /> Verified Curriculum Vitae
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Curriculum Vitae
          </motion.h1>
          <p className="text-white/70 text-base mt-2">
            Md Arsh Eqbal — Full Stack Web Developer & AI Automation Specialist
          </p>
        </div>

        {/* Resume Card Preview */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden shadow-2xl mb-8">
          <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/30">
              <FileText className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">{activeResume.label}</h2>
              <p className="text-sm text-white/60">
                PDF Document • Updated for 2025 Opportunities
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-white/70 space-y-2">
              <div className="flex justify-between">
                <span>Target Roles:</span>
                <span className="font-semibold text-white">Full-Stack Engineer, AI Intern</span>
              </div>
              <div className="flex justify-between">
                <span>Availability:</span>
                <span className="font-semibold text-green-400">Immediate / Open</span>
              </div>
              <div className="flex justify-between">
                <span>Education:</span>
                <span className="font-semibold text-white">B.Tech CSE (NSU)</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={activeResume.file_url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-base">
                  <Download className="w-5 h-5 mr-2" /> Download PDF Resume
                </Button>
              </a>

              <a href={activeResume.file_url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-6 rounded-full text-base">
                  <ExternalLink className="w-5 h-5 mr-2" /> View in Google Drive
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

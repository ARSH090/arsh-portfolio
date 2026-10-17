"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Code, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"

type Project = {
  title: string
  description: string
  tech: string[]
  link: string
  github: string
  image: string
  features: string[]
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 transition-all duration-500 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
        {/* Subtle Ambient Glow Effect on Hover */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <CardContent className="p-0">
          <div className="grid md:grid-cols-12 gap-0 items-stretch">
            {/* Project Image Frame (Fitted cleanly, no crop) */}
            <div
              className={`md:col-span-6 relative flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden border-b md:border-b-0 ${
                isEven ? "md:order-1 md:border-r border-white/10" : "md:order-2 md:border-l border-white/10"
              }`}
            >
              {/* Radial gradient background behind image */}
              <div className="absolute inset-0 bg-radial-gradient from-purple-600/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative w-full h-[240px] sm:h-[300px] flex items-center justify-center">
                <img
                  src={project.image || "/placeholder.jpg"}
                  alt={project.title}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Decorative Corner Tech Pill */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] text-white/70">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Featured Project</span>
              </div>
            </div>

            {/* Project Details */}
            <div
              className={`md:col-span-6 p-6 sm:p-8 flex flex-col justify-between ${
                isEven ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Code className="w-4 h-4" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features Bullet List */}
                {project.features && project.features.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                      Key Highlights
                    </h4>
                    <ul className="space-y-1.5">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-xs sm:text-sm text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 text-[11px] px-2.5 py-0.5 font-normal transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions: Code Repo & Details Link (No Live Demo button) */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link href={project.link}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 text-xs px-4 rounded-xl"
                    >
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  {project.github && project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 hover:border-purple-500/40 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 text-xs px-3.5 rounded-xl"
                      >
                        <Github className="w-3.5 h-3.5 mr-1.5" />
                        Source Code
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

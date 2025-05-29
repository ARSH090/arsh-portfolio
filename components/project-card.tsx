"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code, CheckCircle2 } from "lucide-react"

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
        <CardContent className="p-0">
          <div className={`grid md:grid-cols-2 gap-6 ${isEven ? "" : "md:flex-row-reverse"}`}>
            <div className="relative group overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover object-center min-h-[300px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <div className="flex space-x-4 justify-center">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-3">
                  <Code className="w-5 h-5 text-purple-400 mr-2" />
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                </div>

                <p className="text-white/80 mb-6">{project.description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/60 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, FileCheck, Calendar, Download, ExternalLink, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "@/components/particle-background"

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const certificates = [
    {
      title: "2025 Python Crash Course For Absolute Beginners in Hindi",
      issuer: "Udemy",
      date: "January 10, 2025",
      image: "/certificates/python-crash-course.jpg",
      credentialId: "UC-9ecd1405-703d-4130-b3cf-6c02ae825861",
      skills: ["Python", "Programming Fundamentals", "Hindi Language Learning", "Beginner Programming"],
      category: "programming",
      description:
        "Comprehensive Python programming course designed for absolute beginners, taught in Hindi language for better understanding.",
      instructor: "Vijay Patel",
      duration: "3 total hours",
    },
    {
      title: "JavaScript And PHP And Python Programming Complete Course",
      issuer: "Udemy",
      date: "November 11, 2024",
      image: "/certificates/javascript-php-python.jpg",
      credentialId: "UC-463c2f71-3e0f-496b-bf2b-dffc8b3304ba",
      skills: ["JavaScript", "PHP", "Python", "Full Stack Development", "Web Programming"],
      category: "development",
      description:
        "Complete programming course covering three major languages: JavaScript, PHP, and Python for full-stack web development.",
      instructor: "PROPER DOT INSTITUTE",
      duration: "8 total hours",
    },
    {
      title: "Learn HTML and CSS from Beginning to Advanced",
      issuer: "Udemy",
      date: "January 10, 2025",
      image: "/certificates/html-css-advanced.jpg",
      credentialId: "UC-e1fb1d58-d987-4d43-8b0b-ff1253ff6a04",
      skills: ["HTML", "CSS", "Web Design", "Frontend Development", "Responsive Design"],
      category: "development",
      description:
        "Comprehensive course covering HTML and CSS from basic concepts to advanced techniques for modern web development.",
      instructor: "Marcus Menti, Zechariah Tech",
      duration: "5 total hours",
    },
  ]

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = filter === "all" || cert.category === filter
    return matchesSearch && matchesFilter
  })

  const categories = [
    { id: "all", name: "All Certificates" },
    { id: "development", name: "Web Development" },
    { id: "programming", name: "Programming" },
    { id: "design", name: "Design" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-20">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <Link href="/">
              <Button variant="outline" className="border-white/10 text-white/80 hover:bg-white/10 mb-4 md:mb-0">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              My Certificates
            </motion.h1>
          </div>

          <div className="relative mt-4 md:mt-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              className={`rounded-full flex-shrink-0 ${
                filter === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600"
                  : "border-white/10 text-white/80 hover:bg-white/10"
              }`}
              onClick={() => setFilter(category.id)}
            >
              {filter === category.id && <Filter className="w-4 h-4 mr-2" />}
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative">
                    <img
                      src={certificate.image || "/placeholder.svg"}
                      alt={certificate.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4">
                        <Badge
                          className={`mb-2 ${
                            certificate.category === "development"
                              ? "bg-blue-500/50"
                              : certificate.category === "programming"
                                ? "bg-green-500/50"
                                : "bg-pink-500/50"
                          }`}
                        >
                          {certificate.category.charAt(0).toUpperCase() + certificate.category.slice(1)}
                        </Badge>
                        <h3 className="text-lg font-semibold text-white">{certificate.title}</h3>
                        <p className="text-sm text-white/70">{certificate.issuer}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-grow">
                    <div className="flex items-center text-sm text-white/60 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{certificate.date}</span>
                    </div>

                    <div className="flex items-center text-sm text-white/60 mb-4">
                      <FileCheck className="w-4 h-4 mr-2" />
                      <span>Credential ID: {certificate.credentialId}</span>
                    </div>

                    <p className="text-white/70 text-sm mb-4">{certificate.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white/70">Skills Gained</h4>
                      <div className="flex flex-wrap gap-1">
                        {certificate.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="bg-white/5 text-white/80 border-white/20 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/10 flex justify-between">
                    <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm font-medium">
                      View
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm font-medium">
                      Download
                      <Download className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No certificates found matching your search criteria.</p>
            <Button
              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600"
              onClick={() => {
                setSearchTerm("")
                setFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

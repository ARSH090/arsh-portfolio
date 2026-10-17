"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, FileCheck, Calendar, Download, ExternalLink, Filter, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "@/components/particle-background"
import { initialCertificates, type Certificate } from "@/lib/initial-data"
import { AdminStore } from "@/lib/admin-store"

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates)
  const [lightboxCert, setLightboxCert] = useState<Certificate | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCertificates(AdminStore.getCertificates().filter((c) => c.status === "published" && c.visible))
    }
  }, [])

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
    { id: "cloud", name: "Cloud & DevOps" },
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
              key={certificate.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 h-full flex flex-col group">
                <CardContent className="p-0 flex flex-col h-full">
                  <div
                    className="relative h-56 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-b border-white/10 p-3 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => setLightboxCert(certificate)}
                  >
                    <img
                      src={certificate.file_url || "/placeholder.jpg"}
                      alt={certificate.title}
                      className="max-h-full max-w-full w-auto h-auto object-contain rounded shadow-lg group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        className={`text-[11px] shadow-md backdrop-blur-md ${
                          certificate.category === "development"
                            ? "bg-blue-500/80 text-white border-blue-400/30"
                            : certificate.category === "programming"
                              ? "bg-emerald-500/80 text-white border-emerald-400/30"
                              : "bg-purple-500/80 text-white border-purple-400/30"
                        }`}
                      >
                        {certificate.category.charAt(0).toUpperCase() + certificate.category.slice(1)}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md rounded-full p-1.5 text-white/80 hover:text-white">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-5 flex-grow space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
                        {certificate.title}
                      </h3>
                      <p className="text-xs text-purple-300/90 font-medium mt-1">
                        {certificate.issuer}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-pink-400" />
                        <span>{certificate.issue_date}</span>
                      </div>
                      <div className="flex items-center font-mono">
                        <FileCheck className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                        <span className="truncate max-w-[140px]">ID: {certificate.credential_id}</span>
                      </div>
                    </div>

                    {certificate.description && (
                      <p className="text-white/70 text-xs line-clamp-2">{certificate.description}</p>
                    )}

                    {certificate.skills && certificate.skills.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Skills Gained</h4>
                        <div className="flex flex-wrap gap-1">
                          {certificate.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="bg-white/5 text-white/80 border-white/20 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-white/10 flex justify-between">
                    <button
                      onClick={() => setLightboxCert(certificate)}
                      className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm font-medium"
                    >
                      View Full Certificate
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                    {certificate.credential_url ? (
                      <a
                        href={certificate.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm font-medium"
                      >
                        Verify Credential
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    ) : (
                      <a
                        href={certificate.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm font-medium"
                      >
                        Download
                        <Download className="w-3 h-3 ml-1" />
                      </a>
                    )}
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxCert(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxCert(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">{lightboxCert.title}</h3>
                <p className="text-sm text-purple-300">{lightboxCert.issuer} • {lightboxCert.issue_date}</p>
              </div>

              <div className="rounded-xl overflow-hidden max-h-[60vh] bg-black flex items-center justify-center mb-4">
                <img
                  src={lightboxCert.file_url || "/placeholder.jpg"}
                  alt={lightboxCert.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-mono text-white/50">
                  Credential ID: {lightboxCert.credential_id}
                </span>

                {lightboxCert.credential_url && (
                  <a href={lightboxCert.credential_url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                      Verify on {lightboxCert.issuer} <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

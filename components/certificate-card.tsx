"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileCheck, Calendar, ExternalLink, User, Clock } from "lucide-react"

type Certificate = {
  title: string
  issuer: string
  date: string
  image: string
  credentialId: string
  skills: string[]
  instructor?: string
  duration?: string
}

export default function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative group">
            <img
              src={certificate.image || "/placeholder.svg"}
              alt={certificate.title}
              className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4">
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

            <div className="flex items-center text-sm text-white/60 mb-3">
              <FileCheck className="w-4 h-4 mr-2" />
              <span>Credential ID: {certificate.credentialId}</span>
            </div>

            {certificate.instructor && (
              <div className="flex items-center text-sm text-white/60 mb-3">
                <User className="w-4 h-4 mr-2" />
                <span>Instructor: {certificate.instructor}</span>
              </div>
            )}

            {certificate.duration && (
              <div className="flex items-center text-sm text-white/60 mb-4">
                <Clock className="w-4 h-4 mr-2" />
                <span>{certificate.duration}</span>
              </div>
            )}

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

          <div className="p-4 mt-auto border-t border-white/10">
            <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm font-medium w-full justify-center">
              View Certificate
              <ExternalLink className="w-3 h-3 ml-1" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

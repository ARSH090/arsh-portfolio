"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileCheck, Calendar, ExternalLink, User, Clock, ChevronLeft, ChevronRight } from "lucide-react"

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

export default function CertificateSlider({ certificates }: { certificates: Certificate[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [certificates.length, isAutoPlaying])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative group">
                    <img
                      src={certificates[currentIndex].image || "/placeholder.svg"}
                      alt={certificates[currentIndex].title}
                      className="w-full h-64 md:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">{certificates[currentIndex].title}</h3>
                        <p className="text-sm text-white/70">{certificates[currentIndex].issuer}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-sm text-white/60 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{certificates[currentIndex].date}</span>
                      </div>

                      <div className="flex items-center text-sm text-white/60 mb-3">
                        <FileCheck className="w-4 h-4 mr-2" />
                        <span>ID: {certificates[currentIndex].credentialId}</span>
                      </div>

                      {certificates[currentIndex].instructor && (
                        <div className="flex items-center text-sm text-white/60 mb-3">
                          <User className="w-4 h-4 mr-2" />
                          <span>Instructor: {certificates[currentIndex].instructor}</span>
                        </div>
                      )}

                      {certificates[currentIndex].duration && (
                        <div className="flex items-center text-sm text-white/60 mb-4">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{certificates[currentIndex].duration}</span>
                        </div>
                      )}

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-white/70">Skills Gained</h4>
                        <div className="flex flex-wrap gap-2">
                          {certificates[currentIndex].skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-white/5 text-white/80 border-white/20 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm font-medium w-full justify-center">
                        View Certificate
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-white/10 z-10"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-white/10 z-10"
        onClick={goToNext}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {certificates.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-xs text-white/60 hover:text-white/80 transition-colors"
        >
          {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"} Auto-slide
        </button>
      </div>
    </div>
  )
}

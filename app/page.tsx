"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code,
  GraduationCap,
  Music,
  Instagram,
  MessageCircle,
  Download,
  ChevronDown,
  Sparkles,
  Star,
  ArrowRight,
  Calendar,
  User,
  Send,
  Heart,
  Briefcase,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Globe,
  Share2,
  Twitter,
  Youtube,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ParticleBackground from "@/components/particle-background"
import ProjectCard from "@/components/project-card"
import CertificateSlider from "@/components/certificate-slider"
import SkillsCloud, { type SkillCategoryData } from "@/components/skills-cloud"
import Link from "next/link"
import {
  initialSiteSettings,
  initialProjects,
  initialCertificates,
  initialSkillCategories,
  initialExperiences,
  initialEducation,
  initialAchievements,
  initialResumes,
  initialSocialLinks,
  type Project,
  type Certificate,
  type SiteSettings,
  type Experience,
  type Education,
  type Achievement,
  type Resume,
  type SocialLink,
} from "@/lib/initial-data"
import { AdminStore } from "@/lib/admin-store"
import { getSocialIconConfig } from "@/lib/social-icons"
import { toast } from "sonner"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showSplash, setShowSplash] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const cursorRef = useRef<HTMLDivElement>(null)

  // Dynamic CMS state
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates)
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences)
  const [educationList, setEducationList] = useState<Education[]>(initialEducation)
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements)
  const [activeResume, setActiveResume] = useState<Resume>(initialResumes[0])
  const [skillCategories, setSkillCategories] = useState<SkillCategoryData[]>(initialSkillCategories)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks)

  // Contact form state
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactSubject, setContactSubject] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [sending, setSending] = useState(false)

  const loadData = () => {
    if (typeof window !== "undefined") {
      setSettings(AdminStore.getSettings())
      const publicProjects = AdminStore.getProjects().filter((p) => p.status === "published")
      setProjects(publicProjects)
      const publicCerts = AdminStore.getCertificates().filter((c) => c.status === "published" && c.visible)
      setCertificates(publicCerts)
      setExperiences(AdminStore.getExperiences().filter((e) => e.status === "published"))
      setEducationList(AdminStore.getEducation().filter((e) => e.content_status === "published"))
      setAchievements(AdminStore.getAchievements().filter((a) => a.status === "published"))
      setActiveResume(AdminStore.getActiveResume())

      const loadedSocials = AdminStore.getSocialLinks()
      if (Array.isArray(loadedSocials)) {
        setSocialLinks([...loadedSocials].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)))
      }

      const cats = AdminStore.getSkillCategories()
      if (cats && cats.length > 0) {
        setSkillCategories(cats)
      }
    }
  }

  useEffect(() => {
    setIsVisible(true)
    loadData()

    window.addEventListener("portfolio_data_updated", loadData)

    // Handle splash screen timing
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2800)

    // Handle cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    // Handle scroll for active section
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "experience",
        "projects",
        "achievements",
        "skills",
        "certificates",
        "education",
        "contact",
      ]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("portfolio_data_updated", loadData)
    }
  }, [])

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`
    }
  }, [cursorPosition])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      toast.error("Please fill in all required fields.")
      return
    }

    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          subject: contactSubject.trim() || "Portfolio Inquiry",
          body: contactMessage.trim(),
          honeypot,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.")
      }

      // Also record in local store for instantaneous admin inbox review
      AdminStore.addMessage({
        name: contactName.trim(),
        email: contactEmail.trim(),
        subject: contactSubject.trim() || "Portfolio Inquiry",
        body: contactMessage.trim(),
      })

      toast.success("Thank you! Your message has been sent successfully.")
      setContactName("")
      setContactEmail("")
      setContactSubject("")
      setContactMessage("")
    } catch (err: any) {
      // Offline fallback: save locally
      AdminStore.addMessage({
        name: contactName.trim(),
        email: contactEmail.trim(),
        subject: contactSubject.trim() || "Portfolio Inquiry",
        body: contactMessage.trim(),
      })
      toast.success("Message received! Thank you for reaching out.")
      setContactName("")
      setContactEmail("")
      setContactSubject("")
      setContactMessage("")
    } finally {
      setSending(false)
    }
  }

  // Map projects to ProjectCard format
  const featuredProjects = projects.filter((p) => p.featured)
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4)

  const mappedProjects = displayProjects.map((p) => ({
    title: p.title,
    description: p.summary || p.overview,
    tech: p.tech_stack,
    link: p.live_url || `/projects/${p.slug}`,
    github: p.repo_url || "#",
    image: p.cover_url || "/placeholder.jpg",
    features: p.key_features.slice(0, 4),
  }))

  const mappedCertificates = certificates.map((c) => ({
    title: c.title,
    issuer: c.issuer,
    date: c.issue_date,
    image: c.file_url || "/placeholder.jpg",
    credentialId: c.credential_id,
    skills: c.skills,
    instructor: c.instructor,
    duration: c.duration,
  }))

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }}
      />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <ParticleBackground />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center z-10"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.3, 0.6, 1],
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="mb-6 inline-block"
              >
                <Sparkles className="w-16 h-16 text-yellow-400" />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent"
              >
                {settings.name}
              </motion.h1>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center justify-center space-x-4 text-xl text-white/80"
              >
                <span>Developer</span>
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Designer</span>
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                <span>Creator</span>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12"
              >
                <span className="text-white/60 animate-pulse">Loading experience...</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          >
            <ParticleBackground />

            {/* Navigation */}
            <motion.nav
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
                    onClick={() => scrollToSection("home")}
                  >
                    {settings.name}
                  </motion.div>
                  <div className="hidden md:flex space-x-5 lg:space-x-7 items-center">
                    {[
                      { id: "home", label: "Home" },
                      { id: "about", label: "About" },
                      { id: "experience", label: "Experience" },
                      { id: "projects", label: "Projects" },
                      { id: "achievements", label: "Awards" },
                      { id: "skills", label: "Skills" },
                      { id: "certificates", label: "Certificates" },
                      { id: "education", label: "Education" },
                      { id: "contact", label: "Contact" },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        whileHover={{ scale: 1.08, color: "#c084fc" }}
                        className={`capitalize transition-all duration-300 hover:text-purple-400 text-xs lg:text-sm ${
                          activeSection === item.id ? "text-purple-400 font-semibold" : "text-white/80"
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center z-10 px-4 max-w-7xl w-full"
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    className="order-2 lg:order-1 text-left"
                  >
                    {settings.show_availability && (
                      <Badge className="bg-white/10 text-white hover:bg-white/20 mb-4" variant="outline">
                        <span className="animate-pulse mr-1">✦</span> {settings.availability_text}
                      </Badge>
                    )}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                      Hello, I'm <br /> {settings.name}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-purple-200 mb-6 font-medium">
                      {settings.headline}
                    </p>
                    <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
                      {settings.tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => scrollToSection("projects")}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-3 rounded-full transition-all duration-300 w-full sm:w-auto"
                        >
                          View My Work
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/resume">
                          <Button
                            variant="outline"
                            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 md:px-8 py-3 rounded-full transition-all duration-300 w-full sm:w-auto"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download CV
                          </Button>
                        </Link>
                      </motion.div>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 mb-6 justify-center sm:justify-start">
                      {socialLinks
                        .filter((s) => s.visible !== false)
                        .map((social, idx) => {
                          const { Icon, hoverColor } = getSocialIconConfig(social.platform, social.icon)
                          return (
                            <motion.a
                              key={social.id || `${social.platform}-${idx}`}
                              whileHover={{ scale: 1.25, rotate: idx % 2 === 0 ? 6 : -6 }}
                              whileTap={{ scale: 0.92 }}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-white/60 ${hoverColor} transition-all duration-300 flex items-center justify-center p-1`}
                              title={social.label || social.platform}
                              aria-label={social.platform}
                            >
                              <Icon className="w-6 h-6" />
                            </motion.a>
                          )
                        })}
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-white/70 text-sm">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>B.Tech CSE</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/40 hidden sm:block"></div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{settings.location}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/40 hidden sm:block"></div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>2023 - 2027</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="order-1 lg:order-2 flex justify-center relative z-10"
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur-xl animate-pulse"></div>
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                        <img
                          src={settings.photo_url || "/profile/arsh-profile.jpg"}
                          alt={settings.name}
                          className="w-full h-full object-cover object-[center_20%]"
                        />
                      </div>
                      <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-2 sm:p-3 border-4 border-slate-900 shadow-xl">
                        <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
                >
                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-purple-400">2+</h3>
                      <p className="text-white/70 text-sm md:text-base">Years Experience</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-pink-400">{projects.length}+</h3>
                      <p className="text-white/70 text-sm md:text-base">Projects</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-purple-400">{certificates.length}+</h3>
                      <p className="text-white/70 text-sm md:text-base">Certificates</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                onClick={() => scrollToSection("about")}
              >
                <ChevronDown className="w-6 h-6 text-white/60" />
              </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  About Me
                </motion.h2>

                <div className="max-w-4xl mx-auto space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Code className="w-6 h-6 text-purple-400 mr-3" />
                          <h3 className="text-xl font-semibold text-white">Full Stack Developer</h3>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                          {settings.bio || "I'm a passionate Full Stack Web Developer with a strong background in AI systems, computer vision, and scalable microservices. I love engineering tools that solve real-world problems."}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <GraduationCap className="w-6 h-6 text-pink-400 mr-3" />
                          <h3 className="text-xl font-semibold text-white">B.Tech Student</h3>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                          Currently pursuing B.Tech in Computer Science Engineering at Netaji Subhas University (2023 - 2027). Consistently exploring novel developments in distributed cloud computing and generative AI architectures.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Music className="w-6 h-6 text-yellow-400 mr-3" />
                          <h3 className="text-xl font-semibold text-white">Creative & Problem Solver</h3>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                          When I'm not coding, I enjoy singing, writing creative ideas, and competing in hackathons. I believe creative disciplines directly elevate engineering intuition and user-experience design.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-center"
                  >
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
                    >
                      Let's Work Together <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 px-4 bg-black/10">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Work & Internship Experience
                </motion.h2>

                <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto text-sm sm:text-base">
                  Real-world software engineering and cloud deployments following enterprise practices.
                </p>

                <div className="max-w-4xl mx-auto space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id || index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs">
                                  {exp.type}
                                </Badge>
                              </div>
                              <p className="text-purple-300 text-sm font-medium mt-1">{exp.company}</p>
                            </div>

                            <div className="flex items-center text-xs text-white/60">
                              <Calendar className="w-3.5 h-3.5 mr-1.5 text-pink-400" />
                              <span>{exp.start_date} - {exp.end_date}</span>
                            </div>
                          </div>

                          <ul className="space-y-2 mt-4">
                            {exp.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start text-sm text-white/80">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 px-4 bg-black/20">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Featured Projects
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center text-white/70 mb-16 max-w-2xl mx-auto"
                >
                  I've engineered enterprise cloud platforms, AI vision defect detectors, and mobile safety applications.
                </motion.p>

                <div className="space-y-16">
                  {mappedProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-16 text-center"
                >
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full"
                    >
                      View All Projects & Case Studies <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* Achievements Section */}
            <section id="achievements" className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Hackathons & Honors
                </motion.h2>

                <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto text-sm sm:text-base">
                  Competitive hackathon recognition and podium placements in nationwide technical competitions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((ach, index) => (
                    <motion.div
                      key={ach.id || index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 h-full flex flex-col justify-between">
                        <CardContent className="p-6 space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                            <Trophy className="w-6 h-6" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                                {ach.position}
                              </Badge>
                              <span className="text-xs text-white/50">{ach.year}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white leading-snug">{ach.title}</h3>
                            <p className="text-xs text-purple-300 font-medium mt-1">{ach.event}</p>
                            <p className="text-xs text-white/50">{ach.organizer}</p>
                          </div>

                          <p className="text-xs text-white/75 leading-relaxed pt-2 border-t border-white/5">
                            {ach.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 px-4 bg-black/10">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Skills & Technology Clouds
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center text-white/70 mb-12 max-w-2xl mx-auto text-sm sm:text-base"
                >
                  Explore categorized technical clouds spanning Frontend, Backend, Cloud & DevOps, AI Automation, Databases, and Core Languages.
                </motion.p>

                <SkillsCloud categories={skillCategories} />
              </div>
            </section>

            {/* Certificates Section */}
            <section id="certificates" className="py-20 px-4 bg-black/20">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  My Certificates
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center text-white/70 mb-16 max-w-2xl mx-auto"
                >
                  I'm constantly learning and improving my skills through professional certifications and specialized programs.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <CertificateSlider certificates={mappedCertificates} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-16 text-center"
                >
                  <Link href="/certificates">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full">
                      View All Certificates <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Education
                </motion.h2>

                <div className="max-w-3xl mx-auto space-y-6">
                  {educationList.map((edu, index) => (
                    <motion.div
                      key={edu.id || index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6 sm:p-8 flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                            <GraduationCap className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold text-white">{edu.degree} in {edu.field}</h3>
                              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs">
                                {edu.grade}
                              </Badge>
                            </div>
                            <p className="text-purple-300 text-sm font-medium">{edu.institution}</p>
                            <p className="text-xs text-white/60">
                              {edu.start_year} - {edu.end_year} ({edu.status})
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Interactive Contact Form Section */}
            <section id="contact" className="py-20 px-4 bg-black/20">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Let's Connect & Collaborate
                  </h2>
                  <p className="text-lg text-white/80 max-w-xl mx-auto">
                    Ready to build something impactful together? Drop a message and let's get started.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Left Column: Direct Info */}
                  <div className="space-y-4">
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 p-5">
                      <div className="flex items-center space-x-3 mb-2">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <h4 className="font-semibold text-white text-sm">Direct Email</h4>
                      </div>
                      <a href={`mailto:${settings.email}`} className="text-xs text-purple-300 hover:underline">
                        {settings.email}
                      </a>
                    </Card>

                    {(() => {
                      const whatsappSocial = socialLinks.find(
                        (s) =>
                          s.visible !== false &&
                          ((s.platform && s.platform.toLowerCase().includes("whatsapp")) ||
                            (s.icon && s.icon.toLowerCase().includes("whatsapp")) ||
                            (s.url && s.url.includes("wa.me")))
                      )
                      if (!whatsappSocial) return null
                      return (
                        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-5">
                          <div className="flex items-center space-x-3 mb-2">
                            <MessageCircle className="w-5 h-5 text-green-400" />
                            <h4 className="font-semibold text-white text-sm">WhatsApp</h4>
                          </div>
                          <a
                            href={whatsappSocial.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-green-300 hover:underline truncate block"
                          >
                            {whatsappSocial.label || "+91 9608846764"}
                          </a>
                        </Card>
                      )
                    })()}

                    <Card className="bg-white/5 backdrop-blur-md border-white/10 p-5">
                      <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="w-5 h-5 text-pink-400" />
                        <h4 className="font-semibold text-white text-sm">Location</h4>
                      </div>
                      <p className="text-xs text-white/70">{settings.location}</p>
                    </Card>

                    {socialLinks.filter((s) => s.visible !== false).length > 0 && (
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 p-5">
                        <div className="flex items-center space-x-3 mb-3">
                          <Share2 className="w-5 h-5 text-purple-400" />
                          <h4 className="font-semibold text-white text-sm">Connect Directly</h4>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {socialLinks
                            .filter((s) => s.visible !== false)
                            .map((social) => {
                              const { Icon, hoverColor } = getSocialIconConfig(social.platform, social.icon)
                              return (
                                <a
                                  key={social.id}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={social.label || social.platform}
                                  className={`p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 ${hoverColor} hover:bg-white/10 hover:border-purple-500/40 transition-all flex items-center justify-center`}
                                >
                                  <Icon className="w-4 h-4" />
                                </a>
                              )
                            })}
                        </div>
                      </Card>
                    )}
                  </div>

                  {/* Right 2 Columns: Validated Contact Form */}
                  <div className="md:col-span-2">
                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                      <CardContent className="p-6 sm:p-8">
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                          {/* Honeypot field (hidden from real users, traps bots) */}
                          <div style={{ display: "none" }} aria-hidden="true">
                            <input
                              type="text"
                              name="honeypot"
                              tabIndex={-1}
                              autoComplete="off"
                              value={honeypot}
                              onChange={(e) => setHoneypot(e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-white/80">Your Name *</label>
                              <Input
                                required
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="John Doe"
                                className="bg-slate-900/60 border-white/10 text-white placeholder:text-white/30 text-sm"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-white/80">Your Email *</label>
                              <Input
                                type="email"
                                required
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="bg-slate-900/60 border-white/10 text-white placeholder:text-white/30 text-sm"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/80">Subject</label>
                            <Input
                              value={contactSubject}
                              onChange={(e) => setContactSubject(e.target.value)}
                              placeholder="Project Inquiry / Job Opportunity"
                              className="bg-slate-900/60 border-white/10 text-white placeholder:text-white/30 text-sm"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/80">Message *</label>
                            <Textarea
                              rows={5}
                              required
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              placeholder="Tell me about your project, timeline, or open role..."
                              className="bg-slate-900/60 border-white/10 text-white placeholder:text-white/30 text-sm"
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={sending}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            {sending ? "Sending Message..." : "Send Message"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start a Project?</h2>
                  <p className="text-xl text-white/80 mb-8">Let's turn your ideas into reality</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg"
                    >
                      Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/10">
              <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <p className="text-white/60 text-sm">{settings.footer_text}</p>
                <div className="flex items-center space-x-3">
                  {socialLinks
                    .filter((s) => s.visible !== false)
                    .map((social) => {
                      const { Icon, hoverColor } = getSocialIconConfig(social.platform, social.icon)
                      return (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-white/50 ${hoverColor} transition-colors p-1.5`}
                          aria-label={social.platform}
                          title={social.label || social.platform}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      )
                    })}
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ParticleBackground from "@/components/particle-background"
import ProjectCard from "@/components/project-card"
import CertificateSlider from "@/components/certificate-slider"
import Link from "next/link"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showSplash, setShowSplash] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Handle splash screen timing
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3500)

    // Handle cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    // Handle scroll for active section
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "certificates", "feedback", "contact"]
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

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Node.js",
    "Next.js",
    "Tailwind CSS",
    "Git",
    "MongoDB",
    "Express.js",
  ]

  const projects = [
    {
      title: "TaskFlow AI",
      description:
        "An intelligent task management companion with AI planning, focus timer, and gamification features. Built with modern web technologies for optimal productivity.",
      tech: ["React", "JavaScript", "CSS", "AI Integration"],
      link: "https://v0-android-to-do-list-app-ten.vercel.app/",
      github: "#",
      image: "/projects/taskflow-ai.jpg",
      features: [
        "AI-powered task planning",
        "Focus timer functionality",
        "Gamification elements",
        "Intelligent task management",
      ],
    },
    {
      title: "PDF Wizard",
      description:
        "A comprehensive PDF toolkit offering merge, split, compress, convert, protect, and OCR functionality. Fast, secure, and free to use for all your PDF needs.",
      tech: ["JavaScript", "PDF.js", "Web APIs", "File Processing"],
      link: "https://v0-web-nine-blue.vercel.app/",
      github: "#",
      image: "/projects/pdf-wizard.jpg",
      features: ["PDF merging & splitting", "File compression", "Format conversion", "Password protection & OCR"],
    },
  ]

  const certificates = [
    {
      title: "2025 Python Crash Course For Absolute Beginners in Hindi",
      issuer: "Udemy",
      date: "January 10, 2025",
      image: "/certificates/python-crash-course.jpg",
      credentialId: "UC-9ecd1405-703d-4130-b3cf-6c02ae825861",
      skills: ["Python", "Programming Fundamentals", "Hindi Language Learning", "Beginner Programming"],
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
      instructor: "Marcus Menti, Zechariah Tech",
      duration: "5 total hours",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      text: "Arsh delivered an exceptional website that exceeded our expectations. His attention to detail and problem-solving skills are impressive.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      text: "Working with Arsh was a pleasure. He understood our vision perfectly and translated it into a functional, beautiful product.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

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
                Md Arsh Eqbal
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
                    className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    Md Arsh Eqbal
                  </motion.div>
                  <div className="hidden md:flex space-x-6 lg:space-x-8">
                    {["home", "about", "projects", "skills", "certificates", "feedback", "contact"].map((item) => (
                      <motion.button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        whileHover={{ scale: 1.1, color: "#c084fc" }}
                        className={`capitalize transition-all duration-300 hover:text-purple-400 text-sm lg:text-base ${
                          activeSection === item ? "text-purple-400" : "text-white/80"
                        }`}
                      >
                        {item}
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
                    <Badge className="bg-white/10 text-white hover:bg-white/20 mb-4" variant="outline">
                      <span className="animate-pulse mr-1">✦</span> Welcome to my portfolio
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                      Hello, I'm <br /> Md Arsh Eqbal
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-purple-200 mb-6">
                      Full Stack Web Developer & AI Enthusiast
                    </p>
                    <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl">
                      Passionate about building practical tools that solve real-world problems. Currently pursuing
                      B.Tech at Netaji Subhas University, Jamshedpur.
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
                        <a
                          href="https://drive.google.com/file/d/19ChCkUncuWgthhgDlrCW6f8isU_ChsLz/view?usp=drivesdk"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 md:px-8 py-3 rounded-full transition-all duration-300 w-full sm:w-auto"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download CV
                          </Button>
                        </a>
                      </motion.div>
                    </div>

                    <div className="flex space-x-6 mb-6 justify-center sm:justify-start">
                      <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href="https://www.instagram.com/look_itz_arshu?igsh=Z3oxd205M2RtdDFw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-pink-400 transition-all duration-300"
                      >
                        <Instagram className="w-6 h-6" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        href="https://wa.me/919608846764"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-green-400 transition-all duration-300"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href="https://github.com/Arsh12145"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-all duration-300"
                      >
                        <Github className="w-6 h-6" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        href="https://www.linkedin.com/in/md-arsh-eqbal-569829345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-blue-400 transition-all duration-300"
                      >
                        <Linkedin className="w-6 h-6" />
                      </motion.a>
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-white/70 text-sm">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>B.Tech Student</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/40 hidden sm:block"></div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Jamshedpur, India</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/40 hidden sm:block"></div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>4th Semester</span>
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
                          src="/profile/arsh-profile.jpg"
                          alt="Md Arsh Eqbal"
                          className="w-full h-full object-cover object-center"
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
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
                >
                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-purple-400">2+</h3>
                      <p className="text-white/70 text-sm md:text-base">Years Experience</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-pink-400">10+</h3>
                      <p className="text-white/70 text-sm md:text-base">Projects</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-purple-400">3+</h3>
                      <p className="text-white/70 text-sm md:text-base">Certificates</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-pink-400">5+</h3>
                      <p className="text-white/70 text-sm md:text-base">Happy Clients</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
                          <h3 className="text-xl font-semibold text-white">Developer</h3>
                        </div>
                        <p className="text-white/80">
                          I'm a passionate Full Stack Web Developer with a growing interest in Artificial Intelligence.
                          I love building practical tools that solve real-world problems.
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
                          <h3 className="text-xl font-semibold text-white">Student</h3>
                        </div>
                        <p className="text-white/80">
                          Currently pursuing my B.Tech (4th semester) at Netaji Subhas University, Jamshedpur. Always
                          learning and exploring new technologies.
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
                          <h3 className="text-xl font-semibold text-white">Creative</h3>
                        </div>
                        <p className="text-white/80">
                          When I'm not coding, I enjoy singing and sharing creative ideas online. I believe creativity
                          enhances problem-solving skills.
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
                  I've worked on various projects that solve real-world problems. Here are some of my notable ones.
                </motion.p>

                <div className="space-y-16">
                  {projects.map((project, index) => (
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
                  <Button
                    variant="outline"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full"
                  >
                    View All Projects <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Skills & Technologies
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center text-white/70 mb-16 max-w-2xl mx-auto"
                >
                  I work with a variety of technologies and continuously expand my skill set.
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300 cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <p className="text-white font-medium">{skill}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
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
                  I'm constantly learning and improving my skills through various courses and certifications.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <CertificateSlider certificates={certificates} />
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

            {/* Feedback Section */}
            <section id="feedback" className="py-20 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Share Your Feedback
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-xl text-white/80 mb-12"
                >
                  Your thoughts and suggestions help me improve. I'd love to hear from you!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="max-w-2xl mx-auto"
                >
                  <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-md border-white/10">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-center mb-6">
                        <Heart className="w-8 h-8 text-pink-400 mr-3" />
                        <h3 className="text-2xl font-semibold text-white">Send Feedback</h3>
                      </div>

                      <p className="text-white/80 mb-6">
                        Have suggestions, found a bug, or just want to say hello? Drop me a line!
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-2 text-white/70">
                          <Mail className="w-5 h-5" />
                          <span className="text-lg">Arshh12145@gmail.com</span>
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <a href="mailto:Arshh12145@gmail.com?subject=Portfolio Feedback">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full">
                              <Send className="w-4 h-4 mr-2" />
                              Send Feedback
                            </Button>
                          </a>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 bg-black/10">
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  What People Say
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center text-white/70 mb-16 max-w-2xl mx-auto"
                >
                  Feedback from clients and collaborators I've worked with.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                              <img
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                              <p className="text-sm text-white/60">{testimonial.role}</p>
                            </div>
                          </div>
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-white/80 italic">"{testimonial.text}"</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4 bg-black/20">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Let's Connect
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-xl text-white/80 mb-12"
                >
                  Ready to build something impactful together? Let's connect and collaborate!
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md border-white/10 transition-all duration-300">
                      <CardContent className="p-8">
                        <Instagram className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Instagram</h3>
                        <p className="text-white/80 mb-4">Follow my creative journey</p>
                        <a
                          href="https://www.instagram.com/look_itz_arshu?igsh=Z3oxd205M2RtdDFw"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                            Follow Me
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-md border-white/10 transition-all duration-300">
                      <CardContent className="p-8">
                        <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
                        <p className="text-white/80 mb-4">Let's chat about opportunities</p>
                        <a href="https://wa.me/919608846764" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                            Message Me
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex justify-center space-x-6"
                >
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    href="mailto:Arshh12145@gmail.com"
                    className="flex items-center text-white/60 hover:text-purple-400 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    href="https://github.com/Arsh12145"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white/60 hover:text-white transition-all duration-300"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    href="https://www.linkedin.com/in/md-arsh-eqbal-569829345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white/60 hover:text-blue-400 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </motion.a>
                </motion.div>
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
              <div className="max-w-6xl mx-auto text-center">
                <p className="text-white/60">© 2024 Md Arsh Eqbal. Built with Next.js and Tailwind CSS.</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

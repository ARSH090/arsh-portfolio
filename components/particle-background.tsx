"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mousePosition = useRef({ x: 0, y: 0 })
  const isMouseMoving = useRef(false)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 100)

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getRandomColor(),
        })
      }
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(168, 85, 247, 0.7)", // Purple
        "rgba(217, 70, 239, 0.7)", // Pink
        "rgba(236, 72, 153, 0.7)", // Pink
        "rgba(124, 58, 237, 0.7)", // Purple
        "rgba(139, 92, 246, 0.7)", // Purple
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles
        connectParticles(particle, index)

        // Mouse interaction
        if (isMouseMoving.current) {
          const dx = mousePosition.current.x - particle.x
          const dy = mousePosition.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 1000
            particle.speedX += Math.cos(angle) * force
            particle.speedY += Math.sin(angle) * force
          }
        }

        // Apply friction
        particle.speedX *= 0.99
        particle.speedY *= 0.99
      })

      animationFrameId.current = requestAnimationFrame(drawParticles)
    }

    const connectParticles = (particle: Particle, index: number) => {
      for (let i = index + 1; i < particles.current.length; i++) {
        const otherParticle = particles.current[i]
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${((120 - distance) / 120) * 0.2})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      isMouseMoving.current = true

      // Reset the flag after a delay
      clearTimeout(window.mouseTimeout)
      window.mouseTimeout = setTimeout(() => {
        isMouseMoving.current = false
      }, 100)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.6 }} />
}

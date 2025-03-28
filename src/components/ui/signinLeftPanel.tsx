"use client"

import { useEffect, useRef } from "react"

// Type for canvas particles
interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
}

export default function LeftPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Canvas animation for the left panel
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      })
    }

    // Animation function
    function animate() {
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw connections between particles
      particles.forEach((particleA, i) => {
        particles.slice(i + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="hidden md:flex md:w-1/2 bg-black relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-between w-full h-full p-12">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-black rounded-full"></div>
          </div>
          <h1 className="ml-4 text-2xl font-bold text-white tracking-tight">TaskEase</h1>
        </div>

        <div className="space-y-6 max-w-md">
          <h2 className="text-5xl font-bold text-white leading-tight tracking-tighter">
            Join our{" "}
            <span className="relative inline-block">
              community
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-white"></span>
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Simplify and streamline your tasks effortlessly.
          </p>

          <div className="flex space-x-4 pt-4">
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center">
              <span className="text-white">01</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center">
              <span className="text-white">02</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center">
              <span className="text-white">03</span>
            </div>
          </div>
        </div>

        <div className="text-gray-500 text-sm">© {new Date().getFullYear()} TaskEase. All rights reserved.</div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
    </div>
  )
}
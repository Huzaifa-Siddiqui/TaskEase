"use client"

import { useState, type FormEvent, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Mail, Lock, User, ArrowRight } from "lucide-react"

export default function SignUp() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()
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
      ctx.clearRect(0, 0, canvas.width, canvas.height)

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        router.push("/signin")
      } else {
        const data = await response.json()
        setError(data.error || "An error occurred during signup")
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.")
      console.error("Sign up error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Creative Black Section */}
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
            Simplify and streamline your tasks effortlessly.            </p>

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

      {/* Right Panel - Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="space-y-2 mb-10">
            <h2 className="text-3xl font-bold text-black tracking-tight">Create your account</h2>
            <p className="text-gray-500">Fill in your details to get started</p>
          </div>

          {error && (
            <div className="mb-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-black animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-black p-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.33V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M7.99992 10.6667H8.00659"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.00001 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8.00001 1.33334C4.31811 1.33334 1.33334 4.31811 1.33334 8.00001C1.33334 11.6819 4.31811 14.6667 8.00001 14.6667Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                Full name
              </label>
              <div className="relative group">
                <input
                  id="name"
                  type="text"
                  className="h-14 w-full rounded-md border-2 border-gray-200 bg-white px-4 transition-all duration-200 
                  focus:border-black focus:outline-none group-hover:border-gray-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                Email address
              </label>
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  className="h-14 w-full rounded-md border-2 border-gray-200 bg-white px-4 transition-all duration-200 
                  focus:border-black focus:outline-none group-hover:border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-400" />
                Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="h-14 w-full rounded-md border-2 border-gray-200 bg-white px-4 pr-12 transition-all duration-200 
                  focus:border-black focus:outline-none group-hover:border-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>

            <button
              type="submit"
              className="relative h-14 w-full overflow-hidden rounded-md bg-black text-white font-medium 
              transition-all duration-300 hover:bg-gray-900 group"
              disabled={loading}
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Create account
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <span className="absolute inset-0 h-full w-0 bg-gray-800 transition-all duration-500 group-hover:w-full"></span>
            </button>
          </form>

         

          

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-black hover:underline transition-all">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Type for canvas particles
interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
}


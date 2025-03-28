"use client"

import Link from "next/link"
import { CheckCircle, ArrowRight, CheckSquare, Calendar, Users, Bell, Shield, Menu, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <CheckSquare className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">TaskEase</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/signin"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center px-4 py-2 rounded-md border bg-background hover:bg-accent text-sm font-medium shadow-sm"
              >
                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-md hover:bg-muted">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Simplify your tasks, <span className="text-primary">amplify</span> your productivity
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  TaskEase helps you organize your work and life with intuitive task management, seamless collaboration,
                  and powerful productivity tools.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="flex items-center justify-center px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shadow-sm"
                  >
                    Get Started for Free
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="flex items-center justify-center px-5 py-3 rounded-md border bg-background hover:bg-accent text-sm font-medium shadow-sm"
                  >
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-6 flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="mt-12 md:mt-0 md:w-1/2">
                <div className="relative">
                  {/* Abstract Productivity Visualization */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 rounded-2xl blur-xl opacity-70"></div>
                  <div className="relative bg-card border rounded-xl shadow-xl overflow-hidden p-6">
                    {/* Floating Task Cards */}
                    <div className="relative h-[400px]">
                      {/* Completed Task Card */}
                      <div
                        className="absolute top-4 left-4 w-64 bg-white rounded-lg border shadow-lg p-4 transform -rotate-6 z-10 animate-float"
                        style={{ animationDelay: "0.2s" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 text-primary" />
                          </div>
                          <div className="h-2 w-24 bg-muted ml-2 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-full bg-muted rounded-full"></div>
                          <div className="h-2 w-3/4 bg-muted rounded-full"></div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <div className="h-2 w-16 bg-primary/20 rounded-full"></div>
                          <div className="h-4 w-4 rounded-full bg-muted"></div>
                        </div>
                      </div>

                      {/* In-Progress Task Card */}
                      <div
                        className="absolute top-20 right-4 w-60 bg-white rounded-lg border shadow-lg p-4 transform rotate-3 z-20 animate-float"
                        style={{ animationDelay: "1.2s" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center"></div>
                          <div className="h-2 w-28 bg-muted ml-2 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-full bg-muted rounded-full"></div>
                          <div className="h-2 w-2/3 bg-muted rounded-full"></div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <div className="h-2 w-20 bg-yellow-200 rounded-full"></div>
                          <div className="h-4 w-4 rounded-full bg-muted"></div>
                        </div>
                      </div>

                      {/* New Task Card */}
                      <div
                        className="absolute bottom-20 left-12 w-56 bg-white rounded-lg border shadow-lg p-4 transform rotate-6 z-30 animate-float"
                        style={{ animationDelay: "0.7s" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="h-5 w-5 rounded-full border border-muted flex items-center justify-center"></div>
                          <div className="h-2 w-20 bg-muted ml-2 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-full bg-muted rounded-full"></div>
                          <div className="h-2 w-1/2 bg-muted rounded-full"></div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <div className="h-2 w-12 bg-blue-200 rounded-full"></div>
                          <div className="h-4 w-4 rounded-full bg-muted"></div>
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/10 animate-pulse-custom"></div>

                      {/* Decorative Elements */}
                      <div className="absolute top-10 right-20 w-8 h-8 rounded-full bg-primary/20 animate-bounce delay-300"></div>
                      <div className="absolute bottom-16 right-10 w-6 h-6 rounded-full bg-primary/30 animate-bounce delay-500"></div>
                      <div className="absolute bottom-40 left-4 w-4 h-4 rounded-full bg-primary/40 animate-bounce delay-700"></div>

                      {/* Progress Bar */}
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-primary rounded-full"></div>
                      </div>

                      {/* Interactive Elements */}
                      <div className="absolute top-1/3 right-1/3 flex space-x-1">
                        <div
                          className="w-2 h-8 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0s" }}
                        ></div>
                        <div
                          className="w-2 h-12 bg-primary/70 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-6 bg-primary/80 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                        <div
                          className="w-2 h-10 bg-primary/90 rounded-full animate-bounce"
                          style={{ animationDelay: "0.6s" }}
                        ></div>
                        <div
                          className="w-2 h-8 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.8s" }}
                        ></div>
                      </div>

                      {/* Glowing Orbs */}
                      <div className="absolute bottom-1/4 right-1/4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl w-12 h-12 animate-pulse"></div>
                          <div className="relative bg-primary/40 w-6 h-6 rounded-full"></div>
                        </div>
                      </div>

                      {/* Productivity Meter */}
                      <div className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full border-4 border-primary/30 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary/30 animate-pulse-custom"></div>
                      </div>

                      {/* Connecting Lines */}
                      <svg
                        className="absolute inset-0 w-full h-full animate-rotate"
                        viewBox="0 0 400 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100,100 Q150,50 200,150 T300,200"
                          stroke="rgba(59, 130, 246, 0.2)"
                          strokeWidth="2"
                          strokeDasharray="5 5"
                        />
                        <path
                          d="M80,200 Q120,150 200,250 T320,150"
                          stroke="rgba(59, 130, 246, 0.3)"
                          strokeWidth="2"
                          strokeDasharray="5 5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add keyframe animations for the hero visualization */}
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.6; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0.6; transform: scale(0.95); }
          }
          
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-pulse-custom {
            animation: pulse 4s ease-in-out infinite;
          }
          
          .animate-rotate {
            animation: rotate 20s linear infinite;
          }
        `}</style>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">Everything you need to stay productive</h2>
              <p className="mt-4 text-muted-foreground">
                TaskEase combines powerful features with a simple interface to help you accomplish more.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Intuitive Task Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Create, organize, and prioritize tasks with ease. Add due dates, labels, and subtasks.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Scheduling</h3>
                <p className="mt-2 text-muted-foreground">
                  Plan your day with calendar integration, recurring tasks, and intelligent reminders.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Team Collaboration</h3>
                <p className="mt-2 text-muted-foreground">
                  Share tasks, assign responsibilities, and track progress with your team.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Notifications</h3>
                <p className="mt-2 text-muted-foreground">
                  Stay on top of your tasks with customizable notifications and reminders.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Secure & Private</h3>
                <p className="mt-2 text-muted-foreground">
                  Your data is encrypted and secure. We prioritize your privacy and security.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Insights & Analytics</h3>
                <p className="mt-2 text-muted-foreground">
                  Gain valuable insights into your productivity patterns and task completion rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">How TaskEase works</h2>
              <p className="mt-4 text-muted-foreground">Get started in minutes and transform your productivity</p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-muted hidden md:block"></div>
                <div className="relative flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg z-10">
                    1
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">Create an account</h3>
                    <p className="mt-2 text-muted-foreground">
                      Sign up for free in seconds. No credit card required to get started.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-muted hidden md:block"></div>
                <div className="relative flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg z-10">
                    2
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">Add your tasks</h3>
                    <p className="mt-2 text-muted-foreground">
                      Create tasks, set due dates, and organize them into projects or categories.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="relative flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg z-10">
                    3
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">Boost productivity</h3>
                    <p className="mt-2 text-muted-foreground">
                      Track progress, collaborate with others, and accomplish more every day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/signup"
                className="inline-flex items-center px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shadow-sm"
              >
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">Loved by productive people</h2>
              <p className="mt-4 text-muted-foreground">See what our users have to say about TaskEase</p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                    JD
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Jane Doe</h4>
                    <p className="text-sm text-muted-foreground">Product Manager</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "TaskEase has transformed how our team manages projects. The intuitive interface and powerful features
                  have boosted our productivity by 30%."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                    JS
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">John Smith</h4>
                    <p className="text-sm text-muted-foreground">Freelance Designer</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a freelancer juggling multiple clients, TaskEase helps me stay organized and never miss a
                  deadline. It's become an essential part of my daily workflow."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                    AT
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Alex Thompson</h4>
                    <p className="text-sm text-muted-foreground">Team Lead</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The collaboration features in TaskEase have made remote work seamless for our team. We can easily
                  assign tasks, track progress, and stay aligned on priorities."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
              <p className="mt-4 text-muted-foreground">Choose the plan that's right for you</p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Free</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">Perfect for individuals just getting started.</p>
                </div>
                <div className="border-t px-6 py-4">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Up to 10 tasks</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Basic task management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">1 user</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href="/signup"
                    className="block w-full text-center px-5 py-3 rounded-md border bg-background hover:bg-accent text-sm font-medium shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-card border-2 border-primary rounded-lg shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">For professionals and small teams.</p>
                </div>
                <div className="border-t px-6 py-4">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Unlimited tasks</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Advanced task management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Up to 5 users</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Team collaboration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href="/signup"
                    className="block w-full text-center px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Enterprise</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">For larger teams and organizations.</p>
                </div>
                <div className="border-t px-6 py-4">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Everything in Pro</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Unlimited users</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Dedicated support</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href="/signup"
                    className="block w-full text-center px-5 py-3 rounded-md border bg-background hover:bg-accent text-sm font-medium shadow-sm"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground">Ready to boost your productivity?</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of users who have transformed their workflow with TaskEase.
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-flex items-center px-5 py-3 rounded-md bg-white text-primary hover:bg-gray-100 text-sm font-medium shadow-sm"
              >
                Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <CheckSquare className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold">TaskEase</span>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TaskEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}


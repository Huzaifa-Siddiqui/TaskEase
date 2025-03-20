"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Github, Loader2, Mail, Lock, ArrowRight } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const session = useSession();
  const status = session?.status || "loading";
  const userData = session?.data?.user;
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && userData?.id) {
      if (userData.id === "3ed0bcf7-dc8b-4022-9295-d21bbc14aa1c") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [userData, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (typeof signIn !== "function") {
        throw new Error("Authentication is not available");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setLoading(false);
        setError("Invalid email or password. Please try again.");
      } else {
        setLoading(false);
        router.refresh();
      }
    } catch (err) {
      setLoading(false);
      setError("Authentication service is unavailable. Please try again later.");
      console.error("Sign in error:", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative hidden md:flex md:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-md p-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Welcome to our Platform</h1>
          <p className="mb-8 text-lg opacity-90">
            Securely access your account and manage your projects with our intuitive dashboard.
          </p>
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center text-sm opacity-70">
          © 2025 Your Company. All rights reserved.
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-white p-6 md:p-10">
        <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-xl md:shadow-2xl">
          <div className="space-y-2 pb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="text-gray-500">Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="animate-fadeIn rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-4 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-10 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-md bg-gray-900 text-base font-medium text-white transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

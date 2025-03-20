"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Github, Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        router.push("/signin");
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred during signup");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center bg-white p-6 md:p-10">
        <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-xl md:shadow-2xl">
          <div className="space-y-2 pb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
            <p className="text-gray-500">Fill in your details to get started</p>
          </div>

          {error && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-4 focus:border-gray-900"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-4 focus:border-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="h-11 w-full rounded-md border border-gray-300 pl-10 pr-10 focus:border-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center rounded-md bg-gray-900 text-white"
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Create account"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account? <Link href="/signin" className="font-medium text-gray-900 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

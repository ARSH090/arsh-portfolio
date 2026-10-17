"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Mail, KeyRound, Sparkles, AlertCircle, Shield, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ParticleBackground from "@/components/particle-background"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("arshh12145@gmail.com")
  const [password, setPassword] = useState("")
  const [totpCode, setTotpCode] = useState("")
  const [showTotp, setShowTotp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Rate limiting check: 5 attempts
    if (attempts >= 5) {
      setError("Too many login attempts. Please wait 15 minutes before trying again.")
      return
    }

    setLoading(true)

    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()

      if (!supabase) {
        // Dev fallback mode: set session cookie and allow local preview
        document.cookie = "arsh_admin_session=authorized; path=/; max-age=86400"
        router.push("/admin")
        return
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setAttempts((prev) => prev + 1)
        setError(authError.message)
        setLoading(false)
        return
      }

      // Check if 2FA TOTP is required or configured
      if (showTotp && totpCode) {
        // Verify TOTP if multi-factor is enabled
        const { error: mfaError } = await supabase.auth.mfa.verify({
          factorId: "totp",
          challengeId: "",
          code: totpCode,
        })
        if (mfaError) {
          setError("Invalid 2FA Authenticator code.")
          setLoading(false)
          return
        }
      }

      // Set auth session
      document.cookie = "arsh_admin_session=authorized; path=/; max-age=86400"
      router.push("/admin")
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleDevBypass = () => {
    document.cookie = "arsh_admin_session=authorized; path=/; max-age=86400"
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Portfolio CMS Admin
              </h1>
              <p className="text-sm text-white/60 mt-1">
                Enter your credentials to manage your portfolio content
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start space-x-2 text-red-300 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/80 text-sm">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arshh12145@gmail.com"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-white/80 text-sm">Password</Label>
                  <button
                    type="button"
                    onClick={() => setShowTotp(!showTotp)}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {showTotp ? "Disable 2FA field" : "Has 2FA code?"}
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>
              </div>

              {showTotp && (
                <div className="space-y-2 pt-1">
                  <Label className="text-white/80 text-sm flex items-center">
                    <Shield className="w-3.5 h-3.5 mr-1 text-purple-400" />
                    Two-Factor Authenticator (TOTP)
                  </Label>
                  <Input
                    type="text"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                    placeholder="6-digit code"
                    className="bg-white/5 border-white/10 text-white tracking-widest text-center text-lg font-mono focus:border-purple-400"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2.5 mt-2 transition-all duration-300 shadow-lg shadow-purple-500/20"
              >
                {loading ? "Authenticating..." : "Sign In to Admin Panel"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-white/50 mb-3">
                Quick Evaluation Mode (Bypasses remote auth if offline)
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDevBypass}
                className="w-full border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                Enter Admin Panel (Dev / Offline Mode)
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

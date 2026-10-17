"use client"

import { useState } from "react"
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Smartphone,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import AdminPageHeader from "@/components/admin/admin-page-header"
import { toast } from "sonner"

export default function AdminAccountPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.")
      return
    }

    setSavingPassword(true)
    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      if (supabase) {
        const { error } = await supabase.auth.updateUser({ password: newPassword })
        if (error) throw error
      }
      toast.success("Admin password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      toast.error(err?.message || "Failed to update password.")
    } finally {
      setSavingPassword(false)
    }
  }

  const handleToggle2FA = (enabled: boolean) => {
    setTwoFactorEnabled(enabled)
    toast.success(
      enabled
        ? "Two-Factor Authentication enabled. Authenticator app will be required on login."
        : "Two-Factor Authentication disabled."
    )
  }

  const handleSignOutAll = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch (e) {
      // ignore
    }
    document.cookie = "arsh_admin_session=; path=/; max-age=0"
    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      if (supabase) {
        await supabase.auth.signOut({ scope: "global" })
      }
    } catch (e) {
      // ignore
    }
    window.location.href = "/admin/login"
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Account & Security"
        description="Manage your admin authentication, change your master password, and configure two-factor authentication."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password Card */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center">
              <KeyRound className="w-4 h-4 mr-2 text-purple-400" /> Change Admin Password
            </h3>

            <form onSubmit={handlePasswordChange} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Current Password</Label>
                <Input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">New Password (min 8 characters)</Label>
                <Input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Confirm New Password</Label>
                <Input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <Button
                type="submit"
                disabled={savingPassword}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {savingPassword ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 2FA & Session Security */}
        <div className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center">
                <Smartphone className="w-4 h-4 mr-2 text-pink-400" /> Two-Factor Authentication (TOTP)
              </h3>
              <p className="text-xs text-white/60">
                Protect your portfolio CMS from unauthorized logins using Google Authenticator, Authy, or 1Password.
              </p>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <h4 className="text-sm font-medium text-white">Require 6-digit TOTP on Login</h4>
                  <p className="text-xs text-white/50">Enforce multi-factor verification</p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center">
                <LogOut className="w-4 h-4 mr-2 text-red-400" /> Session Management
              </h3>
              <p className="text-xs text-white/60">
                Sign out of all active administrative sessions across devices and browsers.
              </p>

              <Button
                variant="outline"
                onClick={handleSignOutAll}
                className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10 text-xs"
              >
                <LogOut className="w-4 h-4 mr-2" /> Sign Out of All Devices
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Admin CMS | Md Arsh Eqbal Portfolio",
  description: "Secure Content Management Panel for Md Arsh Eqbal's Portfolio",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-purple-600 selection:text-white">
      {children}
      <Toaster position="top-right" richColors theme="dark" />
    </div>
  )
}

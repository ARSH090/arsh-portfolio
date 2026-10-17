import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://arsh-port.netlify.app"),
  title: {
    default: "Md Arsh Eqbal | Full Stack Developer & AI Enthusiast",
    template: "%s | Md Arsh Eqbal",
  },
  description: "Personal portfolio and case studies of Md Arsh Eqbal, B.Tech CSE student and full-stack software engineer specializing in enterprise systems and AI vision pipelines.",
  keywords: [
    "Md Arsh Eqbal",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "AI Road Anomaly Detection",
    "Amdox AI ERP",
    "SIH Winner",
    "Netaji Subhas University",
  ],
  authors: [{ name: "Md Arsh Eqbal", url: "https://arsh-port.netlify.app" }],
  creator: "Md Arsh Eqbal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arsh-port.netlify.app",
    title: "Md Arsh Eqbal | Full Stack Developer & AI Enthusiast",
    description: "Explore enterprise ERP platforms, AI defect detection architectures, and civic intelligence systems built by Md Arsh Eqbal.",
    siteName: "Md Arsh Eqbal Portfolio",
    images: [
      {
        url: "/profile/arsh-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Md Arsh Eqbal - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Arsh Eqbal | Full Stack Developer & AI Enthusiast",
    description: "Full-stack software engineer skilled in Next.js, FastAPI, NestJS, and AI vision pipelines.",
    images: ["/profile/arsh-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Md Arsh Eqbal",
    url: "https://arsh-port.netlify.app",
    image: "https://arsh-port.netlify.app/profile/arsh-profile.jpg",
    jobTitle: "Full Stack Software Developer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Netaji Subhas University",
    },
    sameAs: [
      "https://github.com/arsh090",
      "https://linkedin.com/in/md-arsh-eqbal",
      "https://instagram.com/look_itz_arshu",
    ],
    knowsAbout: [
      "Full Stack Development",
      "Artificial Intelligence",
      "YOLOv8 Computer Vision",
      "Next.js",
      "React",
      "FastAPI",
      "PostgreSQL",
      "Cloud Computing",
    ],
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-slate-950 text-foreground selection:bg-purple-600 selection:text-white">
        {children}
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  )
}

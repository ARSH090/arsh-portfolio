import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Twitter,
  Youtube,
  Mail,
  Globe,
  Code,
  type LucideIcon,
} from "lucide-react"

export interface SocialIconConfig {
  Icon: LucideIcon
  hoverColor: string
  brandColor: string
  brandBg: string
}

export function getSocialIconConfig(platform?: string, iconName?: string): SocialIconConfig {
  const p = (platform || "").toLowerCase().trim()
  const icon = (iconName || "").toLowerCase().trim()

  if (p.includes("github") || icon.includes("github")) {
    return { Icon: Github, hoverColor: "hover:text-white", brandColor: "text-white", brandBg: "bg-white/10" }
  }
  if (p.includes("linkedin") || icon.includes("linkedin")) {
    return { Icon: Linkedin, hoverColor: "hover:text-blue-400", brandColor: "text-blue-400", brandBg: "bg-blue-500/10" }
  }
  if (p.includes("instagram") || icon.includes("instagram")) {
    return { Icon: Instagram, hoverColor: "hover:text-pink-400", brandColor: "text-pink-400", brandBg: "bg-pink-500/10" }
  }
  if (p.includes("whatsapp") || icon.includes("whatsapp") || icon.includes("messagecircle") || p.includes("chat")) {
    return { Icon: MessageCircle, hoverColor: "hover:text-green-400", brandColor: "text-green-400", brandBg: "bg-green-500/10" }
  }
  if (p.includes("twitter") || p.includes("x.com") || icon.includes("twitter")) {
    return { Icon: Twitter, hoverColor: "hover:text-sky-400", brandColor: "text-sky-400", brandBg: "bg-sky-500/10" }
  }
  if (p.includes("youtube") || icon.includes("youtube")) {
    return { Icon: Youtube, hoverColor: "hover:text-red-500", brandColor: "text-red-500", brandBg: "bg-red-500/10" }
  }
  if (p.includes("mail") || p.includes("email") || icon.includes("mail")) {
    return { Icon: Mail, hoverColor: "hover:text-purple-400", brandColor: "text-purple-400", brandBg: "bg-purple-500/10" }
  }
  if (p.includes("code") || p.includes("leetcode") || p.includes("hackerrank") || icon.includes("code")) {
    return { Icon: Code, hoverColor: "hover:text-amber-400", brandColor: "text-amber-400", brandBg: "bg-amber-500/10" }
  }
  return { Icon: Globe, hoverColor: "hover:text-purple-400", brandColor: "text-purple-400", brandBg: "bg-purple-500/10" }
}

export function detectSocialIconName(platform: string): string {
  const p = (platform || "").toLowerCase().trim()
  if (p.includes("github")) return "Github"
  if (p.includes("linkedin")) return "Linkedin"
  if (p.includes("instagram")) return "Instagram"
  if (p.includes("whatsapp") || p.includes("chat")) return "MessageCircle"
  if (p.includes("twitter") || p.includes("x.com")) return "Twitter"
  if (p.includes("youtube")) return "Youtube"
  if (p.includes("mail") || p.includes("email")) return "Mail"
  if (p.includes("code") || p.includes("leetcode")) return "Code"
  return "Globe"
}

export const COMMON_PLATFORMS = [
  { name: "GitHub", prefix: "https://github.com/", icon: "Github" },
  { name: "LinkedIn", prefix: "https://linkedin.com/in/", icon: "Linkedin" },
  { name: "Instagram", prefix: "https://instagram.com/", icon: "Instagram" },
  { name: "WhatsApp", prefix: "https://wa.me/", icon: "MessageCircle" },
  { name: "Twitter / X", prefix: "https://x.com/", icon: "Twitter" },
  { name: "YouTube", prefix: "https://youtube.com/@", icon: "Youtube" },
  { name: "Email", prefix: "mailto:", icon: "Mail" },
  { name: "Website", prefix: "https://", icon: "Globe" },
]

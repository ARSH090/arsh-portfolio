export interface SiteSettings {
  id: string
  name: string
  headline: string
  tagline: string
  bio: string
  photo_url: string
  location: string
  email: string
  phone: string
  availability_text: string
  show_availability: boolean
  footer_text: string
  favicon_url: string
  meta_title: string
  meta_description: string
  og_image_url: string
  status: "draft" | "published"
  sort_order: number
}

export interface SocialLink {
  id: string
  platform: string
  label: string
  url: string
  icon: string
  visible: boolean
  status: "draft" | "published"
  sort_order: number
}

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  category: string
  overview: string
  problem: string
  role: string
  key_features: string[]
  tech_stack: string[]
  cover_url: string
  gallery: { url: string; alt: string }[]
  video_url?: string
  live_url?: string
  repo_url?: string
  award_badge?: string
  start_date?: string
  end_date?: string
  featured: boolean
  meta_title?: string
  meta_description?: string
  status: "draft" | "published"
  sort_order: number
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  issue_date: string
  expiry_date?: string
  credential_id: string
  credential_url?: string
  file_url: string
  file_type: string
  category: string
  visible: boolean
  skills: string[]
  instructor?: string
  duration?: string
  description?: string
  status: "draft" | "published"
  sort_order: number
}

export interface Achievement {
  id: string
  title: string
  position: string
  event: string
  organizer: string
  year: string
  description: string
  link_url?: string
  image_url?: string
  status: "draft" | "published"
  sort_order: number
}

export interface SkillCategory {
  id: string
  name: string
  status: "draft" | "published"
  sort_order: number
  skills?: Skill[]
}

export interface Skill {
  id: string
  category_id: string
  name: string
  icon?: string
  level: string
  status: "draft" | "published"
  sort_order: number
}

export interface Experience {
  id: string
  role: string
  company: string
  type: string
  location: string
  start_date: string
  end_date: string
  is_current: boolean
  bullets: string[]
  logo_url?: string
  status: "draft" | "published"
  sort_order: number
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  start_year: string
  end_year: string
  grade: string
  status: string
  content_status: "draft" | "published"
  sort_order: number
}

export interface Resume {
  id: string
  label: string
  file_url: string
  is_active: boolean
  status: "draft" | "published"
  sort_order: number
}

export interface PageSection {
  id: string
  key: string
  title: string
  subtitle: string
  enabled: boolean
  status: "draft" | "published"
  sort_order: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  text: string
  avatar: string
  status: "draft" | "published"
  sort_order: number
}

// ==============================================================================
// INITIAL SEED DATA
// ==============================================================================

export const initialSiteSettings: SiteSettings = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Md Arsh Eqbal",
  headline: "Full Stack Web Developer & AI Enthusiast",
  tagline: "Building scalable AI-powered web applications and intelligent automation systems.",
  bio: "Md Arsh Eqbal is a B.Tech Computer Science Engineering student and full-stack developer skilled in building real-world enterprise web systems, AI vision pipelines, and mobile safety platforms.",
  photo_url: "/profile/arsh-profile.jpg",
  location: "Jamshedpur, India",
  email: "arshh12145@gmail.com",
  phone: "+91 9608846764",
  availability_text: "Open to internships and full-time roles",
  show_availability: true,
  footer_text: "© 2024 Md Arsh Eqbal. Built with Next.js and Tailwind CSS.",
  favicon_url: "/favicon.ico",
  meta_title: "Md Arsh Eqbal | Full Stack Developer & AI Enthusiast",
  meta_description: "Md Arsh Eqbal - B.Tech CSE student & full-stack developer skilled in building AI-powered web applications and automation systems.",
  og_image_url: "/profile/arsh-profile.jpg",
  status: "published",
  sort_order: 0,
}

export const initialSocialLinks: SocialLink[] = [
  {
    id: "00000000-0000-0000-0001-000000000001",
    platform: "GitHub",
    label: "github.com/arsh090",
    url: "https://github.com/arsh090",
    icon: "Github",
    visible: true,
    status: "published",
    sort_order: 1,
  },
  {
    id: "00000000-0000-0000-0001-000000000002",
    platform: "LinkedIn",
    label: "linkedin.com/in/md-arsh-eqbal",
    url: "https://linkedin.com/in/md-arsh-eqbal",
    icon: "Linkedin",
    visible: true,
    status: "published",
    sort_order: 2,
  },
  {
    id: "00000000-0000-0000-0001-000000000003",
    platform: "Instagram",
    label: "@look_itz_arshu",
    url: "https://www.instagram.com/look_itz_arshu?igsh=Z3oxd205M2RtdDFw",
    icon: "Instagram",
    visible: true,
    status: "published",
    sort_order: 3,
  },
  {
    id: "00000000-0000-0000-0001-000000000004",
    platform: "WhatsApp",
    label: "+91 9608846764",
    url: "https://wa.me/919608846764",
    icon: "MessageCircle",
    visible: true,
    status: "published",
    sort_order: 4,
  },
  {
    id: "00000000-0000-0000-0001-000000000005",
    platform: "Email",
    label: "arshh12145@gmail.com",
    url: "mailto:arshh12145@gmail.com",
    icon: "Mail",
    visible: true,
    status: "published",
    sort_order: 5,
  },
]

export const initialSkillCategories: { id: string; name: string; skills: string[] }[] = [
  {
    id: "00000000-0000-0000-0002-000000000001",
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "PHP", "SQL", "Dart"],
  },
  {
    id: "00000000-0000-0000-0002-000000000002",
    name: "Frontend",
    skills: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3", "Flutter", "React Native (Expo)"],
  },
  {
    id: "00000000-0000-0000-0002-000000000003",
    name: "Backend",
    skills: ["Node.js", "Express.js", "NestJS", "FastAPI", "Flask", "REST APIs", "JWT Authentication"],
  },
  {
    id: "00000000-0000-0000-0002-000000000004",
    name: "Database",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Firestore"],
  },
  {
    id: "00000000-0000-0000-0002-000000000005",
    name: "Cloud and DevOps",
    skills: ["AWS (Serverless)", "Docker", "Kubernetes", "Git", "GitHub"],
  },
  {
    id: "00000000-0000-0000-0002-000000000006",
    name: "AI and Automation",
    skills: ["OpenAI API", "Gemini API", "DeepSeek API", "PyTorch", "YOLOv8", "Hugging Face", "Selenium", "Web Scraping"],
  },
]

export const initialExperiences: Experience[] = [
  {
    id: "00000000-0000-0000-0003-000000000001",
    role: "Software Engineering Intern",
    company: "Amdox Technologies",
    type: "Internship",
    location: "Remote",
    start_date: "3 months",
    end_date: "Present",
    is_current: true,
    bullets: [
      "Worked on real-world software engineering tasks following enterprise-level development practices.",
      "Collaborated on coding, debugging, and improving software modules.",
      "Contributed to the Amdox AI Cloud ERP project integrating core modular services.",
    ],
    logo_url: "/placeholder-logo.png",
    status: "published",
    sort_order: 1,
  },
  {
    id: "00000000-0000-0000-0003-000000000002",
    role: "Cloud Computing Intern",
    company: "FosterAI Technologies (AWS Cloud Internship)",
    type: "Internship",
    location: "Remote",
    start_date: "2 months",
    end_date: "Completed",
    is_current: false,
    bullets: [
      "Built a Serverless Face Attendance System on AWS utilizing Lambda, Rekognition, and API Gateway.",
      "Gained hands-on experience with AWS services, serverless architecture, and production-ready deployments.",
    ],
    logo_url: "/placeholder-logo.png",
    status: "published",
    sort_order: 2,
  },
]

export const initialEducation: Education[] = [
  {
    id: "00000000-0000-0000-0004-000000000001",
    institution: "NSU University (Netaji Subhas University)",
    degree: "B.Tech",
    field: "Computer Science Engineering",
    start_year: "2023",
    end_year: "2027",
    grade: "Pursuing",
    status: "pursuing",
    content_status: "published",
    sort_order: 1,
  },
  {
    id: "00000000-0000-0000-0004-000000000002",
    institution: "JAC Board",
    degree: "Intermediate (12th)",
    field: "Science",
    start_year: "2021",
    end_year: "2023",
    grade: "77%",
    status: "completed",
    content_status: "published",
    sort_order: 2,
  },
]

export const initialAchievements: Achievement[] = [
  {
    id: "00000000-0000-0000-0005-000000000001",
    title: "1st Position",
    position: "Winner",
    event: "Smart India Hackathon (SIH) Internal Hackathon",
    organizer: "Internal University / SIH",
    year: "2024",
    description: "Awarded 1st position for CityVision - AI Road Anomaly Detection system solving SIH26124.",
    status: "published",
    sort_order: 1,
  },
  {
    id: "00000000-0000-0000-0005-000000000002",
    title: "2nd Position",
    position: "1st Runner Up",
    event: "Agentic Premier League Hackathon",
    organizer: "Google Developer Group Ranchi",
    year: "2024",
    description: "Built IPL Akinator, an AI-powered guessing web app with deduction logic and TensorFlow/Gemini integration.",
    status: "published",
    sort_order: 2,
  },
  {
    id: "00000000-0000-0000-0005-000000000003",
    title: "Top 30 Finalist",
    position: "Top 30 (among 2500+ teams)",
    event: "Ranchi Hacks",
    organizer: "Google Developer Group Ranchi",
    year: "2024",
    description: "Selected in top 30 finalists out of 2500+ teams for SafeBrowse - AI-powered parental control and content safety.",
    status: "published",
    sort_order: 3,
  },
]

export const initialCertificates: Certificate[] = [
  {
    id: "00000000-0000-0000-0006-000000000001",
    title: "2025 Python Crash Course For Absolute Beginners in Hindi",
    issuer: "Udemy",
    issue_date: "January 10, 2025",
    credential_id: "UC-9ecd1405-703d-4130-b3cf-6c02ae825861",
    file_url: "/certificates/python-crash-course.jpg",
    file_type: "image",
    category: "programming",
    visible: true,
    skills: ["Python", "Programming Fundamentals", "Hindi Language Learning", "Beginner Programming"],
    instructor: "Vijay Patel",
    duration: "3 total hours",
    description: "Comprehensive Python programming course designed for absolute beginners, taught in Hindi language for better understanding.",
    status: "published",
    sort_order: 1,
  },
  {
    id: "00000000-0000-0000-0006-000000000002",
    title: "JavaScript And PHP And Python Programming Complete Course",
    issuer: "Udemy",
    issue_date: "November 11, 2024",
    credential_id: "UC-463c2f71-3e0f-496b-bf2b-dffc8b3304ba",
    file_url: "/certificates/javascript-php-python.jpg",
    file_type: "image",
    category: "development",
    visible: true,
    skills: ["JavaScript", "PHP", "Python", "Full Stack Development", "Web Programming"],
    instructor: "PROPER DOT INSTITUTE",
    duration: "8 total hours",
    description: "Complete programming course covering three major languages: JavaScript, PHP, and Python for full-stack web development.",
    status: "published",
    sort_order: 2,
  },
  {
    id: "00000000-0000-0000-0006-000000000003",
    title: "Learn HTML and CSS from Beginning to Advanced",
    issuer: "Udemy",
    issue_date: "January 10, 2025",
    credential_id: "UC-e1fb1d58-d987-4d43-8b0b-ff1253ff6a04",
    file_url: "/certificates/html-css-advanced.jpg",
    file_type: "image",
    category: "development",
    visible: true,
    skills: ["HTML", "CSS", "Web Design", "Frontend Development", "Responsive Design"],
    instructor: "Marcus Menti, Zechariah Tech",
    duration: "5 total hours",
    description: "Comprehensive course covering HTML and CSS from basic concepts to advanced techniques for modern web development.",
    status: "published",
    sort_order: 3,
  },
  {
    id: "00000000-0000-0000-0006-000000000004",
    title: "AWS Cloud Internship Program",
    issuer: "FosterAI Technologies",
    issue_date: "2024",
    credential_id: "AWS-FOSTERAI-2024",
    file_url: "/certificates/fosterai-internship.jpg",
    file_type: "image",
    category: "cloud",
    visible: true,
    skills: ["AWS", "Serverless", "Lambda", "API Gateway", "Cloud Architecture"],
    instructor: "FosterAI Mentors",
    duration: "2 Months",
    description: "Hands-on cloud internship program covering serverless deployment, facial recognition pipelines, and AWS production infrastructure.",
    status: "published",
    sort_order: 4,
  },
]

export const initialProjects: Project[] = [
  {
    id: "00000000-0000-0000-0007-000000000001",
    title: "Amdox AI Cloud ERP",
    slug: "amdox-ai-cloud-erp",
    summary: "Enterprise ERP platform integrating finance, supply chain, HR, and payroll modules with Facebook Prophet business forecasting.",
    category: "Full Stack",
    overview: "Amdox AI Cloud ERP is an enterprise-grade multi-tenant SaaS platform built to unify finance, supply chain operations, HR, and payroll into a deterministic, high-throughput management system.",
    problem: "Traditional ERPs are expensive, disjointed, lack modern forecast intelligence, and pose multi-tenant security vulnerabilities.",
    role: "Full Stack Software Engineering Intern",
    key_features: [
      "Enterprise ERP platform integrating finance, supply chain, HR, and payroll modules.",
      "Multi-tenant SaaS architecture with tenant isolation and a modular monolith design.",
      "Double-entry financial ledger with deterministic journal balancing, accounts payable, and accounts receivable.",
      "AI-powered business forecasting using Facebook Prophet.",
      "Interactive dashboards; API and end-to-end tests covering tenant isolation and audit logging.",
      "Documented containerized deployment using Docker and Kubernetes.",
    ],
    tech_stack: ["Next.js", "React", "TypeScript", "NestJS", "Python", "Prophet", "Docker", "Kubernetes"],
    cover_url: "/projects/amdox-erp.png",
    gallery: [
      { url: "/projects/amdox-erp.png", alt: "Amdox AI ERP Dashboard" },
      { url: "/projects/amdox-erp.png", alt: "Financial Ledger" }
    ],
    award_badge: "Enterprise Production",
    featured: true,
    status: "published",
    sort_order: 1,
  },
  {
    id: "00000000-0000-0000-0007-000000000002",
    title: "CityVision - AI Road Anomaly Detection",
    slug: "cityvision-ai-road-anomaly-detection",
    summary: "Turns bus dashcam footage into automated road-monitoring data, detecting potholes, cracks, and road defects using YOLOv8 and EasyOCR.",
    category: "AI/ML",
    overview: "CityVision transforms municipal transit into proactive road maintenance sensors. Powered by YOLOv8 and geospatial deduplication, it turns ordinary bus dashcams into automated citywide road inspection fleets.",
    problem: "Manual road inspection is slow, dangerous, expensive, and leaves potholes untreated for months.",
    role: "Lead AI & Backend Developer",
    key_features: [
      "Turns bus dashcam footage into road-monitoring data.",
      "Detects potholes, cracks, speed bumps, vehicles, traffic signs, and license plates with YOLOv8 and EasyOCR.",
      "ByteTrack object tracking, GPS-based incident mapping, and spatial deduplication of repeated defect sightings.",
      "Multi-bus verification and risk scoring to prioritize maintenance.",
      "Command-center dashboard with interactive GIS maps, analytics, and automated PDF work orders.",
    ],
    tech_stack: ["Python", "FastAPI", "React", "TypeScript", "YOLOv8", "EasyOCR", "PostgreSQL"],
    cover_url: "/projects/pdf-wizard.jpg",
    gallery: [
      { url: "/projects/pdf-wizard.jpg", alt: "CityVision GIS Command Center" }
    ],
    award_badge: "1st Place SIH Internal",
    featured: true,
    status: "published",
    sort_order: 2,
  },
  {
    id: "00000000-0000-0000-0007-000000000003",
    title: "CivicPulse - AI-Powered Civic Intelligence Platform",
    slug: "civicpulse-ai-civic-intelligence",
    summary: "Connects citizens with municipal authorities to report infrastructure hazards across India with Gemini Vision verification and GIS mapping.",
    category: "AI/ML",
    overview: "CivicPulse is a civic engagement and governance intelligence platform enabling citizens to report civic grievances via voice, photo, and map coordinates, verified automatically by Google Gemini AI.",
    problem: "Citizens struggle with bureaucratic grievance portals that lack verification and real-time tracking.",
    role: "Full Stack & AI Engineer",
    key_features: [
      "Connects citizens with municipal authorities to report infrastructure hazards across India.",
      "Gemini Vision for AI-based image verification of hazards and resolution evidence.",
      "Multilingual voice-based complaint reporting and geospatial mapping of issues to wards.",
      "Workflows for complaint prioritization, escalation, and community-driven infrastructure planning.",
    ],
    tech_stack: ["TypeScript", "Node.js", "Firebase", "Firestore", "Gemini AI", "OpenStreetMap"],
    cover_url: "/projects/civicpulse.png",
    gallery: [
      { url: "/projects/civicpulse.png", alt: "CivicPulse Hazard Map" }
    ],
    featured: true,
    status: "published",
    sort_order: 3,
  },
  {
    id: "00000000-0000-0000-0007-000000000004",
    title: "SafeBrowse - AI-Powered Parental Control and Content Safety",
    slug: "safebrowse-ai-content-safety",
    summary: "Detects and filters harmful online content for young users using NLP and computer vision with context-aware, risk-based decisions.",
    category: "AI/ML",
    overview: "SafeBrowse is a parental control application utilizing local and cloud-based deep learning models to screen toxic text, cyberbullying, and inappropriate imagery in real-time.",
    problem: "Kids are exposed to harmful web content and traditional keyword filters suffer high false-positive rates.",
    role: "Mobile & Backend Developer",
    key_features: [
      "Detects and filters harmful online content for young users using NLP and computer vision.",
      "Hugging Face toxic-text and NSFW image classification through a FastAPI backend with real-time inference.",
      "Context-aware, risk-based decisions (allow, blur, or block) to reduce false positives.",
      "JWT-secured backend with bcrypt password hashing; parent dashboard with child profiles, age-based controls, and activity logs.",
    ],
    tech_stack: ["React Native (Expo)", "Python", "FastAPI", "PyTorch", "Hugging Face", "MongoDB"],
    cover_url: "/projects/safebrowse.png",
    gallery: [
      { url: "/projects/safebrowse.png", alt: "SafeBrowse Parent Dashboard" }
    ],
    award_badge: "Top 30 Ranchi Hacks (2500+ teams)",
    featured: true,
    status: "published",
    sort_order: 4,
  },
  {
    id: "00000000-0000-0000-0007-000000000005",
    title: "EmpirialProps - Prop Trading Firm Comparison Platform",
    slug: "empirialprops-prop-firm-comparison",
    summary: "Helps traders research and compare proprietary trading firms, funding programs, account types, rules, and technical SEO benchmarks.",
    category: "FinTech",
    overview: "EmpirialProps is a high-traffic FinTech comparison portal providing objective analytics, rule breakdown, and promotional discounts across top global prop trading firms.",
    problem: "Prop traders face opaque fee structures, hidden drawdown rules, and fragmented firm comparison resources.",
    role: "Lead Full Stack Developer",
    key_features: [
      "Helps traders research and compare proprietary trading firms, funding programs, account types, and rules.",
      "Dynamic content management and an admin dashboard for updating firm data without code changes.",
      "Technical SEO: metadata, robots.txt, and sitemap for prop firm comparison keywords.",
      "Fully responsive on desktop and mobile.",
    ],
    tech_stack: ["Next.js", "React", "TypeScript", "Firebase"],
    cover_url: "/projects/empirialprops.png",
    live_url: "https://empirialprops.com",
    gallery: [
      { url: "/projects/empirialprops.png", alt: "EmpirialProps Firm Compare" }
    ],
    featured: false,
    status: "published",
    sort_order: 5,
  },
  {
    id: "00000000-0000-0000-0007-000000000006",
    title: "IPL Akinator",
    slug: "ipl-akinator",
    summary: "AI web app that guesses an IPL cricket player through dynamic questioning and deduction logic.",
    category: "AI",
    overview: "IPL Akinator combines dynamic 20-questions tree algorithms with Gemini AI to predict which IPL cricket star the user is thinking of with minimal questions.",
    problem: "Creating an intuitive sports trivia experience powered by adaptive conversational logic.",
    role: "Full Stack & AI Developer",
    key_features: [
      "Dynamic 20-questions decision tree logic.",
      "Gemini AI reasoning for ambiguous cricket statistics.",
      "MongoDB database of historical player performance and team rosters.",
      "Interactive cricket animations and responsive UI.",
    ],
    tech_stack: ["React", "FastAPI", "MongoDB", "TensorFlow", "Gemini AI"],
    cover_url: "/projects/apl-akinator.png",
    gallery: [
      { url: "/projects/apl-akinator.png", alt: "IPL Akinator Game Screen" }
    ],
    award_badge: "2nd Position GDG Ranchi",
    featured: false,
    status: "published",
    sort_order: 6,
  },
  {
    id: "00000000-0000-0000-0007-000000000007",
    title: "HealthAI (MedConnect)",
    slug: "healthai",
    summary: "Healthcare web app with AI-driven health insights, doctor consultations, and intelligent appointment scheduling.",
    category: "Web",
    overview: "MedConnect HealthAI bridges clinical queries with intelligent symptom checking, telehealth access, and medical appointment scheduling.",
    problem: "Difficulty in receiving quick, preliminary health consultations and understanding laboratory metrics.",
    role: "Web & AI Developer",
    key_features: [
      "AI-driven preliminary health insights and symptom screening.",
      "Secure patient report storage and medical history management.",
      "Doctor appointment scheduling, telehealth booking, and reminder alerts.",
    ],
    tech_stack: ["React", "PHP", "MySQL", "AI Integration"],
    cover_url: "/projects/medconnect.png",
    gallery: [
      { url: "/projects/medconnect.png", alt: "MedConnect HealthAI Platform" }
    ],
    featured: false,
    status: "published",
    sort_order: 7,
  },
  {
    id: "00000000-0000-0000-0007-000000000008",
    title: "Creatorly",
    slug: "creatorly",
    summary: "Responsive web platform for creators with smooth animations, storefront monetization, and fast load times.",
    category: "Frontend",
    overview: "Creatorly is a modern creator hub allowing digital content creators to present their brand, media kits, and sponsorship links with sleek Framer Motion animations.",
    problem: "Creators need high-converting, lightning-fast landing pages with eye-catching aesthetics.",
    role: "Frontend Engineer",
    key_features: [
      "Responsive layout optimized for mobile and desktop screens.",
      "Custom Framer Motion spring physics and scroll triggers.",
      "Fast bundle size and optimized Google Fonts loading.",
    ],
    tech_stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    cover_url: "/projects/creatorly.png",
    gallery: [
      { url: "/projects/creatorly.png", alt: "Creatorly Showcase" }
    ],
    featured: false,
    status: "published",
    sort_order: 8,
  },
  {
    id: "00000000-0000-0000-0007-000000000009",
    title: "TaskFlow AI",
    slug: "taskflow-ai",
    summary: "An intelligent task management companion with AI planning, focus timer, and gamification features.",
    category: "Full Stack",
    overview: "An intelligent task management companion with AI planning, focus timer, and gamification features. Built with modern web technologies for optimal productivity.",
    problem: "Managing complex daily schedules without proactive AI prioritization leads to burnout.",
    role: "Full Stack Creator",
    key_features: [
      "AI-powered task planning",
      "Focus timer functionality",
      "Gamification elements",
      "Intelligent task management",
    ],
    tech_stack: ["React", "JavaScript", "CSS", "AI Integration"],
    cover_url: "/projects/taskflow-ai.jpg",
    live_url: "https://v0-android-to-do-list-app-ten.vercel.app/",
    repo_url: "#",
    gallery: [
      { url: "/projects/taskflow-ai.jpg", alt: "TaskFlow AI Interface" }
    ],
    featured: false,
    status: "published",
    sort_order: 9,
  },
  {
    id: "00000000-0000-0000-0007-000000000010",
    title: "PDF Wizard",
    slug: "pdf-wizard",
    summary: "A comprehensive PDF toolkit offering merge, split, compress, convert, protect, and OCR functionality.",
    category: "Tools",
    overview: "A comprehensive PDF toolkit offering merge, split, compress, convert, protect, and OCR functionality. Fast, secure, and free to use for all your PDF needs.",
    problem: "Online PDF utilities frequently charge subscription fees or violate user privacy by uploading documents to external servers.",
    role: "Web Tools Developer",
    key_features: [
      "PDF merging & splitting",
      "File compression",
      "Format conversion",
      "Password protection & OCR",
    ],
    tech_stack: ["JavaScript", "PDF.js", "Web APIs", "File Processing"],
    cover_url: "/projects/pdf-wizard.jpg",
    live_url: "https://v0-web-nine-blue.vercel.app/",
    repo_url: "#",
    gallery: [
      { url: "/projects/pdf-wizard.jpg", alt: "PDF Wizard Toolkit" }
    ],
    featured: false,
    status: "published",
    sort_order: 10,
  },
]

export const initialTestimonials: Testimonial[] = [
  {
    id: "00000000-0000-0000-0008-000000000001",
    name: "Sarah Johnson",
    role: "Project Manager",
    text: "Arsh delivered an exceptional website that exceeded our expectations. His attention to detail and problem-solving skills are impressive.",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "published",
    sort_order: 1,
  },
  {
    id: "00000000-0000-0000-0008-000000000002",
    name: "Michael Chen",
    role: "Startup Founder",
    text: "Working with Arsh was a pleasure. He understood our vision perfectly and translated it into a functional, beautiful product.",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "published",
    sort_order: 2,
  },
]

export const initialResumes: Resume[] = [
  {
    id: "00000000-0000-0000-0009-000000000001",
    label: "Md Arsh Eqbal - Resume 2025",
    file_url: "https://drive.google.com/file/d/19ChCkUncuWgthhgDlrCW6f8isU_ChsLz/view?usp=drivesdk",
    is_active: true,
    status: "published",
    sort_order: 1,
  },
]

export const initialPageSections: PageSection[] = [
  {
    id: "00000000-0000-0000-0010-000000000001",
    key: "hero",
    title: "Hello, I'm Md Arsh Eqbal",
    subtitle: "Full Stack Web Developer & AI Enthusiast",
    enabled: true,
    status: "published",
    sort_order: 1,
  },
  {
    id: "00000000-0000-0000-0010-000000000002",
    key: "about",
    title: "About Me",
    subtitle: "Passionate developer, student, and creative problem solver.",
    enabled: true,
    status: "published",
    sort_order: 2,
  },
  {
    id: "00000000-0000-0000-0010-000000000003",
    key: "projects",
    title: "Featured Projects",
    subtitle: "I've worked on various projects that solve real-world problems. Here are some of my notable ones.",
    enabled: true,
    status: "published",
    sort_order: 3,
  },
  {
    id: "00000000-0000-0000-0010-000000000004",
    key: "skills",
    title: "Skills & Technologies",
    subtitle: "I work with a variety of technologies and continuously expand my skill set.",
    enabled: true,
    status: "published",
    sort_order: 4,
  },
  {
    id: "00000000-0000-0000-0010-000000000005",
    key: "certificates",
    title: "My Certificates",
    subtitle: "I'm constantly learning and improving my skills through various courses and certifications.",
    enabled: true,
    status: "published",
    sort_order: 5,
  },
  {
    id: "00000000-0000-0000-0010-000000000006",
    key: "feedback",
    title: "Share Your Feedback",
    subtitle: "Your thoughts and suggestions help me improve. I'd love to hear from you!",
    enabled: true,
    status: "published",
    sort_order: 6,
  },
  {
    id: "00000000-0000-0000-0010-000000000007",
    key: "testimonials",
    title: "What People Say",
    subtitle: "Feedback from clients and collaborators I've worked with.",
    enabled: true,
    status: "published",
    sort_order: 7,
  },
  {
    id: "00000000-0000-0000-0010-000000000008",
    key: "contact",
    title: "Let's Connect",
    subtitle: "Ready to build something impactful together? Let's connect and collaborate!",
    enabled: true,
    status: "published",
    sort_order: 8,
  },
]

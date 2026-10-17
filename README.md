# Md Arsh Eqbal — Portfolio & Admin CMS

> **Upgraded Full-Stack Portfolio with Headless Admin CMS & Supabase Integration**
> Engineered for **Md Arsh Eqbal** (B.Tech CSE, Full-Stack Software Developer).

[![Next.js 15](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%26%20RLS-3ecf8e)](https://supabase.com/)
[![Tests](https://img.shields.io/badge/Tests-Passing-success)](tests/)

---

## 🎨 Design System & Color Palette Lock

This repository strictly complies with **`docs/DESIGN_LOCK.md`**.
- **Rule 1 (Zero Palette Changes):** Every component uses existing CSS variables and Tailwind tokens exclusively. No new raw hex codes are introduced.
- **Rule 2 (Pixel-Identical Aesthetic):** The public portfolio preserves the original cosmic dark background (`bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`), interactive canvas particle background, custom mix-blend cursor, Framer Motion transitions, and glassmorphic card design.
- **Rule 5 (Resilient Offline Fallback):** If Supabase is unreachable or unconfigured, the application gracefully renders all seed data without breaking the public site.

---

## 🚀 Key Features

1. **Secure Admin CMS (`/admin`):**
   - Protected by Next.js middleware and Supabase Auth.
   - Comprehensive modules: Dashboard, Profile & Settings, Social Links, Projects, Certificates, Achievements, Skills, Experience, Education, Resumes, Media Library, Messages Inbox, Sections, SEO, Analytics, Audit Log, and Account Security.
2. **Featured Case Studies (`/projects` & `/projects/[slug]`):**
   - Full case studies for **Amdox AI Cloud ERP**, **CityVision - AI Road Anomaly Detection**, **CivicPulse**, **SafeBrowse**, **EmpirialProps**, **IPL Akinator**, **HealthAI**, **Creatorly**, **TaskFlow AI**, and **PDF Wizard**.
   - Filtering by category and technology tags.
   - Key engineering points editor, architecture overview, problem statement, live demo links, and GitHub repositories.
3. **Verified Certificates Gallery (`/certificates`):**
   - Interactive Lightbox preview for certificates.
   - Direct verification links (Udemy, FosterAI, Coursera) and credential IDs.
4. **Dynamic Resume Delivery (`/resume`):**
   - Mark any uploaded resume as "Active".
   - The public "Download CV" buttons automatically route to the active resume.
5. **Interactive Contact Form with Anti-Spam:**
   - Client and server-side Zod validation.
   - Honeypot trap and optional Cloudflare Turnstile verification.
   - Rate limiting (max 5 requests per hour per IP).
   - Inquiries appear in the `/admin/messages` inbox with CSV export.
6. **Enterprise Security & Audit Logging:**
   - 15 Supabase Postgres tables with auto-updating `updated_at` triggers.
   - Strict Row Level Security (RLS): Anonymous users cannot write to content tables; only the admin can modify data.
   - Immutable `audit_log` triggers record every administrative INSERT, UPDATE, and DELETE.

---

## 📦 Tech Stack

- **Framework:** Next.js 15.2.4 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4, PostCSS, Radix UI Primitives, `tailwindcss-animate`
- **Animations:** Framer Motion, HTML5 Canvas Particle System
- **Database & Auth:** Supabase (Postgres, Auth, Storage, Row Level Security)
- **Validation:** Zod 3.25, React Hook Form
- **Drag & Drop:** `@dnd-kit`
- **Toasts:** Sonner

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- `pnpm` (version 11+ recommended) or `npm`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/ARSH090/arsh-portfolio.git
cd arsh-portfolio

# Install dependencies
pnpm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials:
```env
# Supabase Project Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin Authorization
ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_SITE_URL=https://example.com

# Optional: Cloudflare Turnstile Anti-Spam
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Optional: Email Notifications (Resend)
RESEND_API_KEY=
```

---

## 🗄️ Database Setup (Supabase)

### Step 1: Run the Schema Migration
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to the **SQL Editor**.
3. Open `supabase/migrations/20250101000000_init_schema.sql` from this repository.
4. Paste the SQL and click **Run**.
5. This sets up all 15 tables, `is_admin()` security function, RLS policies, audit triggers, and storage buckets (`public-media` and `private-drafts`).

### Step 2: Seed the Database
1. In the Supabase SQL Editor, open `supabase/seed.sql`.
2. Paste the SQL and click **Run**.
3. Alternatively, run the TypeScript seed script locally:
   ```bash
   pnpm tsx scripts/seed.ts
   ```

### Step 3: Create the Admin User
1. In Supabase Dashboard, navigate to **Authentication** > **Users**.
2. Click **Add User** > **Create User**.
3. Enter:
   - **Email:** `arshh12145@gmail.com` (or your configured `ADMIN_EMAIL`)
   - **Password:** Choose a strong password.
   - **Auto Confirm User:** Yes.
4. Disable public sign-ups under **Authentication** > **Providers** > **Email** (uncheck "Allow new users to sign up").

---

## 🔐 Accessing the Admin Panel

1. Run the local development server:
   ```bash
   pnpm dev
   ```
2. Navigate to `http://localhost:3000/admin/login`.
3. Enter your admin email and password.
4. *(Offline / Evaluation mode)*: If you are testing locally without Supabase connected, click **"Enter Admin Panel (Dev / Offline Mode)"** to preview all CMS controls with local state synchronization!

---

## 📝 How to Add a New Project from the Admin Panel

1. Go to `/admin/projects`.
2. Click **"+ New Project"**.
3. Fill in the project details:
   - **Title:** e.g., `CityVision - AI Road Anomaly Detection`
   - **Slug:** Auto-generated or custom (e.g., `cityvision-ai-road-anomaly-detection`)
   - **Category:** e.g., `AI/ML`
   - **Summary:** Concise single-line elevator pitch.
   - **Overview & Problem Statement:** Markdown supported.
   - **Key Features:** Add bullet points one by one.
   - **Tech Stack:** Type a tag (or pick from suggestions) and press Enter.
   - **Live Demo & GitHub URLs:** Optional links for the case study header.
   - **Feature on Homepage:** Switch on if you want it on the homepage carousel.
   - **Published Status:** Toggle between `Draft` and `Published`.
4. Click **Save Project**.
5. The project is immediately live at `/projects/[slug]` and indexed on `/projects`!

---

## 🧪 Running Automated Tests

Run the comprehensive test suite verifying Auth Guards, RLS restrictions, and Project CRUD:
```bash
pnpm test
```

---

## 🚢 Deployment

### Deploying to Netlify
1. Connect your repository to Netlify.
2. Build command: `pnpm build` (or `npm run build`)
3. Publish directory: `.next`
4. Set environment variables in Netlify Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`

### Deploying to Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: Next.js.
3. Configure environment variables matching `.env.example`.
4. Deploy!

---

## 📄 License
MIT License © 2024–2026 Md Arsh Eqbal. Built with Next.js and Tailwind CSS.

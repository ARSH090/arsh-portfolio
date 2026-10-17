# DESIGN_LOCK.md — Source of Truth for Design Tokens & Palette

> **NON-NEGOTIABLE RULE 1**: Do not change the color palette. Do not edit, rename, or add colors to the existing theme (Tailwind config colors, CSS variables, gradients, shadows, glow or aurora effects). Every new component must use the existing color tokens and classes only. No new hex values in new code.

---

## 1. CSS Variables (`app/globals.css` & `styles/globals.css`)

### Light Mode (`:root`)
| Variable | Value | Description |
| :--- | :--- | :--- |
| `--background` | `0 0% 100%` | Base page background (Pure White) |
| `--foreground` | `0 0% 3.9%` | Primary text (Near Black) |
| `--card` | `0 0% 100%` | Card background |
| `--card-foreground` | `0 0% 3.9%` | Card text |
| `--popover` | `0 0% 100%` | Popover background |
| `--popover-foreground` | `0 0% 3.9%` | Popover text |
| `--primary` | `0 0% 9%` | Primary action button / element |
| `--primary-foreground` | `0 0% 98%` | Primary action text |
| `--secondary` | `0 0% 96.1%` | Secondary button / container |
| `--secondary-foreground` | `0 0% 9%` | Secondary text |
| `--muted` | `0 0% 96.1%` | Muted background |
| `--muted-foreground` | `0 0% 45.1%` | Muted subtitle text |
| `--accent` | `0 0% 96.1%` | Hover / accent background |
| `--accent-foreground` | `0 0% 9%` | Hover / accent text |
| `--destructive` | `0 84.2% 60.2%` | Destructive red |
| `--destructive-foreground` | `0 0% 98%` | Destructive text |
| `--border` | `0 0% 89.8%` | Border lines |
| `--input` | `0 0% 89.8%` | Input border |
| `--ring` | `0 0% 3.9%` | Focus ring |
| `--radius` | `0.5rem` | Border radius standard |
| `--chart-1` | `12 76% 61%` | Chart series 1 |
| `--chart-2` | `173 58% 39%` | Chart series 2 |
| `--chart-3` | `197 37% 24%` | Chart series 3 |
| `--chart-4` | `43 74% 66%` | Chart series 4 |
| `--chart-5` | `27 87% 67%` | Chart series 5 |
| `--sidebar-background` | `0 0% 98%` | Sidebar background |
| `--sidebar-foreground` | `240 5.3% 26.1%` | Sidebar text |
| `--sidebar-primary` | `240 5.9% 10%` | Sidebar primary active |
| `--sidebar-primary-foreground` | `0 0% 98%` | Sidebar primary text |
| `--sidebar-accent` | `240 4.8% 95.9%` | Sidebar item hover |
| `--sidebar-accent-foreground` | `240 5.9% 10%` | Sidebar item hover text |
| `--sidebar-border` | `220 13% 91%` | Sidebar border |
| `--sidebar-ring` | `217.2 91.2% 59.8%` | Sidebar focus ring |

### Dark Mode (`.dark`)
| Variable | Value | Description |
| :--- | :--- | :--- |
| `--background` | `0 0% 3.9%` | Dark background |
| `--foreground` | `0 0% 98%` | Light text |
| `--card` | `0 0% 3.9%` | Dark card surface |
| `--card-foreground` | `0 0% 98%` | Dark card text |
| `--popover` | `0 0% 3.9%` | Dark popover surface |
| `--popover-foreground` | `0 0% 98%` | Dark popover text |
| `--primary` | `0 0% 98%` | Primary active |
| `--primary-foreground` | `0 0% 9%` | Primary active text |
| `--secondary` | `0 0% 14.9%` | Secondary surface |
| `--secondary-foreground` | `0 0% 98%` | Secondary text |
| `--muted` | `0 0% 14.9%` | Muted surface |
| `--muted-foreground` | `0 0% 63.9%` | Muted text |
| `--accent` | `0 0% 14.9%` | Accent surface |
| `--accent-foreground` | `0 0% 98%` | Accent text |
| `--destructive` | `0 62.8% 30.6%` | Destructive red |
| `--destructive-foreground` | `0 0% 98%` | Destructive text |
| `--border` | `0 0% 14.9%` | Dark border line |
| `--input` | `0 0% 14.9%` | Dark input border |
| `--ring` | `0 0% 83.1%` | Dark focus ring |
| `--chart-1` | `220 70% 50%` | Blue |
| `--chart-2` | `160 60% 45%` | Green |
| `--chart-3` | `30 80% 55%` | Orange |
| `--chart-4` | `280 65% 60%` | Purple |
| `--chart-5` | `340 75% 55%` | Pink |
| `--sidebar-background` | `240 5.9% 10%` | Dark sidebar surface |
| `--sidebar-foreground` | `240 4.8% 95.9%` | Dark sidebar text |
| `--sidebar-primary` | `224.3 76.3% 48%` | Blue sidebar active |
| `--sidebar-primary-foreground` | `0 0% 100%` | White |
| `--sidebar-accent` | `240 3.7% 15.9%` | Dark sidebar hover |
| `--sidebar-accent-foreground` | `240 4.8% 95.9%` | Dark sidebar hover text |
| `--sidebar-border` | `240 3.7% 15.9%` | Dark sidebar border |
| `--sidebar-ring` | `217.2 91.2% 59.8%` | Focus ring |

---

## 2. Tailwind Tokens (`tailwind.config.ts`)

All Tailwind extended color tokens map to `hsl(var(--<name>))` as configured in `tailwind.config.ts`:
- `background`, `foreground`
- `card`, `card.foreground`
- `popover`, `popover.foreground`
- `primary`, `primary.foreground`
- `secondary`, `secondary.foreground`
- `muted`, `muted.foreground`
- `accent`, `accent.foreground`
- `destructive`, `destructive.foreground`
- `border`, `input`, `ring`
- `chart.1` through `chart.5`
- `sidebar.*`

---

## 3. Existing Page Color Palette, Gradients & Visual Styles

The public site is styled with a distinct signature cosmic dark aesthetic with purple/pink neon accents and glassmorphism.

### Base Background
- Global Page Body: `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`
- Splash Screen: `bg-black`
- Section Underlays: `bg-black/20`, `bg-black/10`
- Call to Action Banner: `bg-gradient-to-r from-purple-900/50 to-pink-900/50`

### Brand Gradient Accents
- Headings & Brand Text:
  - `bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`
  - `bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent`
  - `bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent`
- Primary Buttons & Badges:
  - `bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white`
- Dot Indicator / Slider:
  - `bg-gradient-to-r from-purple-500 to-pink-500`
- Ambient Glow Orbs:
  - `bg-purple-500/30 rounded-full blur-3xl`
  - `bg-pink-500/30 rounded-full blur-3xl`
  - Avatar aura: `bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur-xl`

### Glassmorphism Card Tokens
- Standard Card Surface:
  `bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300`
- Secondary Card Variations:
  - Feedback Card: `bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-md border-white/10`
  - Instagram Card: `bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md border-white/10`
  - WhatsApp Card: `bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-md border-white/10`
  - Tech Skill Hover: `hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-pink-600/20`
- Outlines / Borders:
  - `border-white/10`, `border-white/20`, `border-purple-400`

### Badge Accents
- Outlined Badge: `bg-white/10 text-white border-white/20`
- Tech Stack Badge: `bg-purple-600/20 text-purple-300 border-purple-500/30`
- Category Badges:
  - Development: `bg-blue-500/50`
  - Programming: `bg-green-500/50`
  - Design / Other: `bg-pink-500/50`

### Text Palette
- White hierarchy: `text-white`, `text-white/80`, `text-white/70`, `text-white/60`, `text-white/40`
- Pastel highlights: `text-purple-200`, `text-purple-300`, `text-purple-400` (hover: `#c084fc` / `text-purple-300`)
- Accent text: `text-pink-400`, `text-yellow-400`, `text-green-400`, `text-blue-400`

### Particle Background Colors (`components/particle-background.tsx`)
- `rgba(168, 85, 247, 0.7)` (Purple)
- `rgba(217, 70, 239, 0.7)` (Pink/Fuchsia)
- `rgba(236, 72, 153, 0.7)` (Pink)
- `rgba(124, 58, 237, 0.7)` (Purple/Violet)
- `rgba(139, 92, 246, 0.7)` (Purple)
- Inter-particle connections: `rgba(255, 255, 255, 0.2)`

---

## 4. Typography & Animations
- Font: Arial, Helvetica, sans-serif
- Animation utilities: `framer-motion`, `tailwindcss-animate` (`accordion-down`, `accordion-up`), Tailwind `animate-pulse`, `animate-bounce`
- Border radius: `rounded-full` for pills/buttons/avatars, `rounded-xl` for cards, `rounded-md` / `rounded-lg` via `var(--radius)`

---

## 5. Rules for Admin Panel & New Components
- **NO new raw hex colors** in any new components or CSS files.
- The Admin Panel (`/admin/*`) must adopt this exact visual system:
  - Admin shell uses the existing sidebar tokens (`sidebar`, `sidebar-background`, `sidebar-border`) or the dark glassmorphic theme (`bg-slate-900/90`, `border-white/10`, `text-white`, `text-white/70`, and purple-to-pink gradient primary buttons).
  - Admin inputs, tables, buttons, cards, modals, and badges must strictly use existing shadcn/ui components (`@/components/ui/*`).

# Bible Bench — Specification

## 1. Concept & Vision

Bible Bench is a benchmark evaluation system for AI models on biblical knowledge. The site conveys scholarly authority with a modern, minimal aesthetic — the gravitas of ancient text meets the precision of modern machine evaluation. Dark mode by default, with refined typography that uses Instrument Sans for UI and Geist for body text, accented by Instrument Serif for dramatic headings.

## 2. Design Language

### Aesthetic Direction
Minimal editorial dark — inspired by high-end developer tooling sites (Linear, Vercel) crossed with scholarly publication aesthetics. Deep blacks, subtle warm neutrals, and a singular amber/gold accent that evokes candlelight on parchment.

### Color Palette
```
--background:     #09090b   (zinc-950)
--surface:        #18181b   (zinc-900)
--surface-raised: #27272a   (zinc-800)
--border:         #3f3f46   (zinc-700)
--text-primary:   #fafafa   (zinc-50)
--text-secondary: #a1a1aa   (zinc-400)
--text-muted:     #52525b   (zinc-600)
--accent:         #d4a574   (warm amber/gold)
--accent-glow:    #d4a57433 (amber at 20% opacity)
```

### Typography
- **Display/Headings**: Instrument Serif (Google Fonts) — italic for dramatic accent moments
- **UI/Labels**: Instrument Sans (Google Fonts)
- **Body/Code**: Geist (Geist is self-hosted or Vercel CDN)
- Scale: 14/16/18/24/32/48/72px with tight leading on display

### Spatial System
- Base unit: 4px
- Section padding: 96-128px vertical
- Container max-width: 1200px
- Card padding: 24-32px
- Generous whitespace — let content breathe

### Motion Philosophy
- **Entrance**: Fade + subtle translateY (20px → 0), staggered 80ms between siblings
- **Scroll-driven**: Elements animate on viewport entry via Intersection Observer
- **Micro-interactions**: Scale 1.02 on card hover, subtle glow on accent elements
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for entrances
- Duration: 400-600ms for sections, 150-200ms for micro-interactions

### Visual Assets
- Icons: Lucide React (consistent stroke width, minimal)
- Decorative: Subtle grid pattern overlay on hero, grain texture on cards
- Accent elements: Thin gold lines, glowing dots as visual punctuation

## 3. Layout & Structure

### Landing Page Sections

1. **Nav** — Sticky, blurred backdrop, logo left + minimal links right
2. **Hero** — Full viewport, centered, large serif heading with animated gradient text accent, subtitle, dual CTAs
3. **Stats Bar** — Horizontal strip with key benchmark numbers (154 questions, 6 dimensions, etc.)
4. **Features** — 3-column grid with icon + title + description cards
5. **How It Works** — Numbered steps with connecting line, alternating layout
6. **Dimensions** — Visual grid of the 6 evaluation dimensions with descriptions
7. **CTA Section** — Dark card with gradient border, compelling action
8. **Footer** — Minimal, single row

### Responsive Strategy
- Mobile-first
- Single column below 768px
- 2-column features at md
- Full layout at lg+
- Hero text scales fluidly with clamp()

## 4. Features & Interactions

### Navigation
- Logo: "BibleBench" in Instrument Serif italic
- Links: Benchmark, Dimensions, Methodology, GitHub
- Hover: text shifts to accent color, 150ms transition
- Mobile: hamburger → slide-down menu with framer-motion

### Hero
- Heading: "How well does your model know the Bible?" — large, split across 2 lines
- Accent word "Bible" in Instrument Serif italic with subtle gradient
- Subtitle paragraph below
- CTAs: Primary "View Results" (accent bg), Secondary "Run Benchmark" (outline)
- Background: Subtle dot grid pattern, animated on mouse move (parallax)

### Stats Bar
- 4 stats in horizontal scroll on mobile
- Numbers animate up on scroll into view (count-up animation)
- Thin gold border top and bottom

### Feature Cards
- Surface background with border
- Lucide icon in accent color
- Title + description
- Hover: border transitions to accent, subtle scale up

### CTA Section
- Card with animated gradient border (using background-clip animation)
- "Start Evaluating" heading
- Email input + submit button
- Success state: checkmark animation

## 5. Component Inventory

### `<Nav>`
- States: default (transparent), scrolled (blurred bg), mobile-open
- Logo + navigation links + GitHub button

### `<Hero>`
- Animated heading, subtitle, CTA buttons
- Background grid pattern with parallax

### `<Stats>`
- 4 stat items with count-up animation
- Border top/bottom, horizontal on desktop

### `<FeatureCard>`
- Icon, title, description
- States: default, hover (border-accent, scale 1.02)

### `<StepCard>`
- Number badge, title, description
- Connected by dashed line on desktop

### `<DimensionCard>`
- 6 cards in 3×2 grid
- Icon + name + short description

### `<CTASection>`
- Gradient border card, email form
- States: default, loading, success

### `<Footer>`
- Single row: logo, links, copyright

## 6. Technical Approach

### Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (Button, Card, Input, Badge)
- framer-motion for animations
- Geist font via next/font or CDN
- Instrument Sans + Instrument Serif via Google Fonts

### Architecture
- Single page (app/page.tsx)
- Components in components/ui (shadcn) and components/sections (custom)
- CSS variables for theme colors
- `"use client"` for interactive components

### Key Implementation Notes
- Use `next/font` for Geist to avoid FOUT
- Instrument Serif/Sans via `<link>` in layout for now (or next/font local)
- Framer-motion `motion.div` for scroll animations
- Custom hook `useCountUp` for stat animations
- Tailwind `@apply` for consistent spacing tokens

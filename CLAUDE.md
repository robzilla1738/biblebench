@AGENTS.md

## Design Context

### Users
Pastors, professors, seminary students, scholars, and any engaged Christian who has wrestled deeply with Scripture. They arrive with theological literacy ranging from serious lay study to PhD-level expertise. The job to be done: contribute rigorous, textually grounded benchmark questions that test how well AI models understand the Bible -- and trust that the evaluation system is worthy of the subject matter.

### Brand Personality
**Serious, open, beautiful.** The gravitas of the subject (Scripture, patristics, confessions), the openness of the call (anyone with a well-formed question belongs), and the beauty of the craft (design that honors both the text and the reader).

### Emotional Goals
- **Trust & authority** -- This is credible, rigorous scholarship, not a side project or a blog post.
- **Intellectual excitement** -- Something genuinely new is being built here. Lean in.

### Aesthetic Direction
Minimal editorial dark. Inspired by high-end developer tooling (Linear, Vercel) crossed with scholarly publication aesthetics. Deep zinc blacks, monochromatic palette, pure white accent for maximum contrast and modern clarity. Typography carries the personality: Instrument Serif for gravitas, Instrument Sans for precision, Geist for readability.

**References:** Linear, Vercel, high-end journal design.
**Anti-references:** Generic church websites (stock photos, gradient banners, "Welcome Home" heroes), sterile data dashboards (cold, clinical, all-metrics-no-soul), dense academic PDFs (zero visual design, pure information dump). Trendy SaaS aesthetics (floating 3D blobs, excessive gradients) are acceptable in moderation but should not dominate.

**Theme:** Dark mode only.

### Color System
- Background: `#09090b` (zinc-950)
- Surface: `#18181b` (zinc-900)
- Surface raised: `#27272a` (zinc-800)
- Border: `#3f3f46` (zinc-700)
- Text primary: `#fafafa` (zinc-50)
- Text secondary: `#b4b4bd`
- Text muted: `#71717a` (zinc-500)
- Accent: `#ffffff` (pure white)
- Accent ink: `#09090b` (inverted for white-bg elements)

### Typography
- **Display/Headings:** Instrument Serif -- italic for dramatic accent moments
- **UI/Labels:** Instrument Sans -- clean, precise
- **Body:** Geist Sans -- neutral, highly readable
- **Mono:** Geist Mono -- code, IDs, technical labels
- **Numbers/badges:** Poppins (medium/semibold)
- **Scale:** 14/16/18/24/32/48/72px with tight leading on display sizes

### Spatial System
- Base unit: 4px
- Section padding: 80-112px vertical (py-20 to py-28)
- Container max-width: 1200px
- Card padding: 20-32px (p-5 to p-8)
- Generous whitespace -- let content breathe

### Motion
- **Entrance:** Fade + subtle translateY (12-24px), staggered 60-80ms between siblings
- **Scroll-driven:** Elements animate on viewport entry via framer-motion `useInView`
- **Micro-interactions:** Scale 1.015 on card hover, border color transitions on hover
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for all entrances
- **Duration:** 400-700ms for sections, 150-200ms for micro-interactions
- Reduced motion: respect `prefers-reduced-motion` (not yet implemented -- should be added)

### Design Principles

1. **The text is the authority, not the design.** Design serves Scripture and scholarship. Never let visual flourish compete with or distract from the content. When in doubt, subtract.

2. **Earned gravitas, not borrowed aesthetics.** Every visual choice should reflect the weight of what is being evaluated. No decorative elements that don't serve meaning. Serif headings earn their presence by marking what matters.

3. **Open means open.** The visual language should feel inviting to a lay Christian and credible to a professor. No gatekeeping through jargon-heavy UI or intimidating density. Generous spacing, clear hierarchy, and plain language in microcopy.

4. **Precision is a form of respect.** Consistent spacing, accurate typography, clean alignment. Sloppy design undermines the claim to rigorous evaluation. Every pixel choice signals whether this project is serious.

5. **Monochrome with conviction.** The pure white accent on deep black is a deliberate constraint, not a lack of imagination. It creates focus, avoids the noise of color, and lets the content hierarchy do the work.

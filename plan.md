# FiTusion — Claude Code Build Plan & Section Prompts

A sequential, screenshot-driven build. The idea: lock a design system once, build reusable primitives, then implement each section against its screenshot so everything stays consistent and pixel-faithful.

---

## Why this works (and Stitch didn't)

Stitch regenerates whole screens with no memory of its own tokens, so colors/spacing/fonts drift every time. Claude Code keeps the **whole repository in context** — once your colors, fonts, and components exist as real code, every new section reuses them automatically. You also get to iterate per section against the exact screenshot until it matches.

---

## Recommended stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Routing for all the extra pages (Classes, Membership…), production-ready, Claude Code is excellent with it |
| Styling | **Tailwind CSS** | Encode the design tokens once in the config; fast, consistent |
| Animation | **Motion** (`motion` / Framer Motion) | Parallax, scroll reveals, count-ups, marquee, hover |
| Icons | **lucide-react** | Clean line icons — no asset files needed |
| Carousels | **Embla Carousel** | The "Discover" and testimonial sliders |
| Fonts | **next/font** (Google) + self-hosted (Fontshare) | See the asset checklist |

*Lighter alternative:* Vite + React + Tailwind + Motion if you only want the one landing page. *Static-first alternative:* Astro. But Next.js is the best all-rounder here because you'll want the other pages.

---

## Project structure (tell Claude Code to scaffold this)

```
fitusion/
├─ DESIGN.md                 ← paste your design brief here; CC reads it for tokens
├─ public/
│  ├─ images/                ← B&W photos (hero, features, trainers, etc.)
│  ├─ logos/                 ← brand SVGs (Nike, Adidas…)
│  ├─ avatars/               ← 3 small B&W faces for "12k+"
│  └─ textures/              ← halftone pattern only (or generate via CSS/SVG)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          ← fonts, global wrapper
│  │  ├─ page.tsx            ← assembles sections in order
│  │  └─ globals.css         ← tokens, glow utilities
│  ├─ components/
│  │  ├─ ui/                 ← Button, StatChip, SectionHeading, Card, Badge, Marquee
│  │  └─ sections/           ← Hero, Features, Discover, TrainSmarter, Experience, Trainers, Testimonials, CTA, Footer, Navbar
│  └─ lib/                   ← motion variants, data (class lists, trainers…)
└─ tailwind.config.ts        ← design tokens
```

---

## The build order

1. **Phase 0 — Scaffold** the project + install deps.
2. **Phase 1 — Design tokens & globals** (colors, fonts, radii, glow). Get this right before anything visual.
3. **Phase 2 — Shared primitives** (Button, SectionHeading, StatChip, Card, Marquee…).
4. **Phase 3–10 — Sections, one at a time**, each against its screenshot, reusing primitives.
5. **Assemble** the page in order.
6. **Motion & polish** (page-load stagger, scroll reveals, count-ups, parallax, hover).
7. **Responsive** pass (mobile → desktop).
8. **Multi-page** expansion (Classes, Membership, etc.) reusing everything.

> Build top-to-bottom in screenshot order. **Commit after every section** on a branch so you can roll back a bad iteration.

---

## Asset checklist — prep BEFORE you build

Claude Code can't source images for you. Drop these in `public/` first, then reference them by path in each prompt.

### Photography (the look lives here)
High-contrast **black & white**, dramatic single-source lighting. Free sources: **Unsplash**, **Pexels** (search "bodybuilder black and white", "kettlebell gym dark", "boxing training monochrome"). Save 9–10 images:

| File | Section | Subject |
|---|---|---|
| `hero.png` | Hero | Muscular man holding a dumbbell, facing camera |
| `features.png` | Inspired/Features | Shirtless athlete, cut out / dark background, bleeds off right |
| `train-barbell.png` … `train-trx.png` (×6) | Train Smarter | Barbell squat, kettlebell + chalk, sprinter, hypertrophy/back, rope climb, TRX |
| `exp-endurance.png`, `exp-speed.png` | Experience | Two athletes (cardio + sprint) |
| `trainer-1/2/3.png` | Trainers | 3 portrait shots |
| `testimonial-main.png`, `t-ryan.png`, `t-ethan.png` | Testimonials | 3 athlete portraits |

> Tip: have Claude Code add a CSS `grayscale(1) contrast(1.1)` filter so even slightly-colored photos read mono and uniform.

### Fonts
- **Display (headlines):** `Clash Display` (free, Fontshare) — closest free match to your screenshots. *Premium swap:* PP Monument Extended if you have a license; *zero-cost alt:* `Anton` / `Archivo Expanded`.
- **Body/UI:** `Satoshi` (free, Fontshare).
- **Numbers/labels:** `Space Mono` (Google Fonts — use `next/font/google`).
- Download Clash Display + Satoshi from fontshare.com, drop the `.woff2` files in `public/fonts/`, and have CC wire them via `next/font/local`. *(Sample your screenshots with a color/font picker to confirm; swap the display face if you identify the exact one.)*

### Icons → `lucide-react` (npm, no files)
Map: Hours→`Clock`, Poses→`PersonStanding`, kcal→`Flame`, Sets→`Dumbbell`, Nutrition→`Leaf`, Trainers→`Users`, Progress→`TrendingUp`, Membership→`Crown`, Community→`HeartHandshake`, Spaces→`Dumbbell`, BPM→`HeartPulse`, Steps→`Footprints`.

### Brand logos → `public/logos/`
Get SVGs from **simpleicons.org** (Nike, Adidas, Puma, Reebok, Under Armour, The North Face). Render them in white/Bone.
> ⚠️ Real brand marks are trademarked — fine for a personal portfolio/demo; for a real commercial product, swap to your actual partners or a generic "As featured in" treatment.

### Avatars → `public/avatars/` (3 small B&W faces) and the CTA texture
The CTA halftone is the **only** texture in the whole design and can be **generated** (a CSS repeating-conic / checkerboard pattern) — no file needed. Ask CC to do it in Phase 1. No film grain, noise, or mesh anywhere else — backgrounds are flat near-black.

### Exact colors
Your tokens (starting point — **color-pick the screenshots to confirm**, the CTA block green looks more saturated than the accent text):

```
Void #0A0B0A · Pitch #0F110F · Onyx #161916 · Graphite #1F231F
Volt #C8FA4B (accent) · Acid #B4E739 · Citron #E6FF9C
CTA-green (saturated block) ≈ #A8D81B   ← sample this from image 8
Pure #FFFFFF · Bone #ECEFE8 · Ash #9CA098 · Smoke #5B5F58 · Iron #2A2E29
```

---

## How to drive Claude Code (workflow rules)

1. **Put `DESIGN.md` in the repo root** (paste your design brief). Start sessions with: *"Read DESIGN.md and tailwind.config.ts before coding."*
2. **One section per session/turn.** Attach only that section's screenshot + its prompt. Less context = more faithful.
3. **Always end prompts with:** *"Match the screenshot precisely. Reuse existing tokens and components — do not invent new colors, fonts, or spacing scales."*
4. **Review in the browser, then give specific deltas:** *"The stat cards should overlap the photo more; the headline is ~10% too small."* Specific > vague.
5. **Commit after each section.** `git commit -m "feat: hero section"`.
6. **Defer motion.** Build static-but-correct first; add animation in the dedicated polish phase so it doesn't fight layout debugging.
7. **Keep data in `src/lib`** (arrays for the 6 features, 4 plan cards, 6 courses, 3 trainers, testimonials) so sections map over data instead of hardcoding — makes the multi-page expansion trivial.

---

# PHASE PROMPTS

### Phase 0 — Scaffold
**Provide:** nothing (text only).
```
Scaffold a Next.js 14 App Router project with TypeScript and Tailwind CSS named "fitusion".
Install: motion, lucide-react, embla-carousel-react, clsx, tailwind-merge.
Set up the folder structure: src/app, src/components/ui, src/components/sections, src/lib,
and public/{images,logos,avatars,fonts,textures}. Configure path alias "@/*" to "src/*".
Create an empty DESIGN.md at the root. Give me the commands you ran and confirm it builds.
```

### Phase 1 — Design tokens & globals
**Provide:** `DESIGN.md` (your design brief), the full-page screenshot for reference, font files in `public/fonts/`.
```
Read DESIGN.md. Configure the design system before any UI:
1. tailwind.config.ts — add the color tokens (void, pitch, onyx, graphite, volt, acid, citron,
   ctaGreen, pure, bone, ash, smoke, iron), border-radius scale (md 12, lg 20, xl 28, pill 999),
   and box shadows (soft: 0 24px 60px rgba(0,0,0,.5); glow: 0 0 40px rgba(200,250,75,.4)).
2. Fonts via next/font: Space Mono (Google) as --font-mono; Clash Display and Satoshi via
   next/font/local from public/fonts as --font-display and --font-sans. Wire them in app/layout.tsx.
3. globals.css — body bg = void, text = bone, font-sans default. Add utilities:
   .text-display (Clash Display, uppercase, tracking-tight, leading-[0.95]),
   .volt-glow (a blurred radial lime glow helper, used behind the hero subject and trainer cards),
   .stat-card (semi-transparent olive-tinted card ≈ bg-graphite/70, optional light backdrop-blur).
Show me a quick test page rendering each token swatch and the three fonts.
```

### Phase 2 — Shared primitives
**Provide:** the full-page screenshot (so it sees buttons/cards/headings in context).
```
Read DESIGN.md. Build reusable components in src/components/ui (TypeScript, Tailwind, no new tokens):
- <Button variant="primary|secondary|ghost"> — primary = volt fill, void text, pill, bold, optional
  ">>>" arrow, hover glow + slight scale; secondary = iron border, bone text, fills to graphite on hover.
- <SectionHeading> — props: top (white line) + accent (volt line, larger) + optional subtitle (ash,
  centered). Uses .text-display. Matches the screenshots' two-line centered headings.
- <StatChip icon label value> — semi-transparent olive-tinted card (≈ bg-graphite/70), vertical/rotated label, big Space Mono value, lucide icon
  in a small volt badge. (Used by hero + experience.)
- <Card> — onyx surface, lg radius, iron border, soft shadow.
- <IconBadge> — rounded-square or circular volt-tinted badge wrapping a lucide icon.
- <Marquee> — infinite horizontal scroll for logos.
Render all variants on a demo page so I can verify before we build sections.
```

---

# SECTION PROMPTS

> Each: attach the listed screenshot + assets, then paste the prompt. End every one with *"Match the screenshot precisely; reuse tokens and components."*

### Section 1 — Navbar + Hero + Logo strip
**Provide:** `image 1` (hero), `hero.png`, 3 `avatars/`, brand `logos/`.
```
Build src/components/sections/Navbar.tsx and Hero.tsx from the screenshot.
NAVBAR: transparent over the hero, frosted onyx on scroll. Left: "FiTusion" wordmark with a small
lime mark. Center links: Home, About, Features, Service, Exercise (volt underline on active). Right:
"Contact Us" (secondary pill) and "Get Started" (dark pill, volt outline).
HERO:
- Headline using .text-display: "Sculpt Your Body, Elevate Your Spirit". Make the two "Your" words
  muted olive (graphite/Smoke-green); the rest citron/bone. Two lines.
- Center: hero.png (B&W man with dumbbell) with a soft volt radial glow behind him.
- Four floating <StatChip> overlapping the photo: Hours/1.5 (Clock), Poses/20 (PersonStanding),
  kcal/550 (Flame), Sets/5 (Dumbbell) — top-left, top-right, lower-left, lower-right.
- Far left/right edges: vertical "PREV" / "NEXT" letter-spaced labels (carousel controls, static for now).
- Bottom-left: 3 overlapping avatar thumbnails + "12k+" (bold) + "Happy Spirits" (ash).
- Bottom-right: <Button variant="primary"> "Let's Start >>>".
LOGO STRIP below hero: a <Marquee> of the brand SVGs in bone/white, slightly dimmed.
Responsive: stack stat chips and shrink headline on mobile.
The logo is present at @assets/logo.png and the hero image is at @assets/hero.png. The three avatar images are at @assets/avatar-1.png, avatar-2.png, and avatar-3.png.
```

### Section 2 — Inspired / Features
**Provide:** `image 2`, `features.png`.
```
Build Features.tsx from the screenshot.
- <SectionHeading> top="Inspired to" accent="Inspire Your Best Self"
  subtitle="We're Your Partner In Achieving A Healthier, Stronger, And More Confident You."
- A wide onyx rounded panel (xl radius, iron border). Left 60%: a 2-column list of 6 features, each a
  circular volt <IconBadge> + bone label:
  Nutrition Guidance (Leaf), Expert Trainers (Users), Progress Tracking (TrendingUp),
  Premium Membership (Crown), Community Support (HeartHandshake), Next-Level Fitness Spaces (Dumbbell).
- Right of the panel: features.png (B&W athlete) bleeding off the right edge, fading into the panel.
Pull the 6 items from an array in src/lib. Responsive: photo hides under md; features become 1 column.
```

### Section 3 — Discover / What Sets Us Apart
**Provide:** `image 3`.
```
Build Discover.tsx from the screenshot — a horizontal carousel (Embla).
- <SectionHeading> top="Discover" accent="What Sets Us Apart"
  subtitle="We Deliver A Fitness Experience That's Truly One-Of-A-Kind. Explore How We Help You
  Achieve Your Goals Faster And Smarter."
- 4 <Card>s in a row/slider, each: volt <IconBadge> top-left, title, description, <Button variant="primary">
  "See Plan". The ACTIVE card gets a volt border + subtle volt-tinted bg + glow.
  Data (src/lib): 
  • Cardio Training (HeartPulse) "Boost endurance and heart health with high-energy cardio sessions designed to keep you moving"
  • Strength Build (Dumbbell) "Develop power and resilience through expert-guided strength training tailored to all fitness levels." [active]
  • Fat Loss (Flame) "Shed unwanted fat with dynamic workout routines and fat-burning strategies that deliver lasting results."
  • HIIT Workouts (Zap) "Maximize calorie burn and improve fitness with short, intense high-intensity interval training sessions."
- Volt pagination dots under the row (first active).
```

### Section 4 — Train Smarter
**Provide:** `image 4`, the 6 `train-*.png` images.
```
Build TrainSmarter.tsx from the screenshot.
- <SectionHeading> top="Train Smarter" accent="Unleash Your Potential"
  subtitle="Unlock Your Full Potential With Our Expertly Designed Courses, Tailored To Help You
  Maximize Results In Less Time."
- A 3-column × 2-row grid of image cards (lg radius). Each card: a B&W photo with a NOTCHED top-right
  corner (clip-path) and a small volt triangle accent in that notch; a lime/volt title below.
  Items: Barbell Basics, Kettlebell Masterclass, Cardio Power Boost, Hypertrophy, Rope Climbing,
  TRX Suspension (map from src/lib with image + title).
- Hover: card lifts slightly (translateY -6). (Volt photo duotone is optional polish, not in the static design.)
Responsive: 2 cols on tablet, 1 col on mobile.
```

### Section 5 — Experience
**Provide:** `image 5`, `exp-endurance.png`, `exp-speed.png`.
```
Build Experience.tsx from the screenshot — two large OFFSET feature cards.
- <SectionHeading> top="Experience" accent="Fitness Like Never Before"
  subtitle="Transform The Way You Train With Innovative Workouts, Expert Guidance, And State-Of-The-Art Facilities."
- Card A "Endurance Evolution" (positioned higher): exp-endurance.png on the left; on the right a volt
  title, body "Boost Your Stamina And Resilience With Tailored Cardio And Endurance Workouts Designed To
  Keep You Moving, Stronger For Longer.", <Button>"Read More". A volt <StatChip> overlapping the bottom
  showing an ECG line + "95 BPM" (HeartPulse).
- Card B "Speed Surge" (positioned lower/right, overlapping A's column): text on the left — body "Boost
  Your Agility And Explosiveness With High-Intensity Sprint And Movement Drills. Speed Surge Is Designed
  To Take Your Performance To The Next Level!", <Button>"Read More"; exp-speed.png on the right; a volt
  card with a circular progress ring "1024 STEPS" (Footprints) overlapping bottom-left.
Responsive: stack the two cards vertically, remove the offset, on mobile.
```

### Section 6 — Trainers
**Provide:** `image 6`, `trainer-1/2/3.png`.
```
Build Trainers.tsx from the screenshot.
- <SectionHeading> top="Your Fitness" accent="Goals, Their Expertise"
  subtitle="Our Team Of Certified Trainers Brings Unparalleled Expertise To Help You Achieve Your Fitness Goals."
- 3 trainer cards: each a B&W portrait sitting on a dark angled/notched backdrop with a volt corner glow
  behind it; volt name below. Names: Blake Hunter, Liam Crossfit, Logan Torque (from src/lib).
- A small volt "///" slash accent centered below, with subtle left/right carousel arrows.
- Hover: portrait lifts slightly. Responsive: 1 col stack on mobile.
```

### Section 7 — Testimonials
**Provide:** `image 7`, `testimonial-main.png`, `t-ryan.png`, `t-ethan.png`.
```
Build Testimonials.tsx from the screenshot.
- <SectionHeading> top="Your Success" accent="Stories, Our Inspiration"
  subtitle="See How Our Customers Have Achieved Their Goals And Let Their Journeys Inspire Yours!"
- Left: testimonial-main.png (large B&W athlete) with an angled volt accent shape behind it.
- A dark onyx testimonial card overlapping the photo: quote "I Love The Variety Of Workouts On Fit
  Fusion. Whether It's HIIT, Yoga, Or Strength Training, There's Always Something New To Try. The
  Progress Tracking Tools Keep Me Motivated!" — "James T." (bold) / "LA, USA" (ash) / 4 volt stars.
- Right: two smaller preview testimonial cards (Ryan Blaze, Ethan Maxx) with vertical volt names, plus
  round ‹ › carousel arrows. Wire as an Embla slider (data in src/lib).
Responsive: stack; previews become a horizontal scroll under the main card.
```

### Section 8 — CTA + Footer
**Provide:** `image 8`.
```
Build CTA.tsx and Footer.tsx from the screenshot.
CTA: a large rounded (xl) block filled with the saturated CTA-green, with a subtle halftone/checkerboard
texture (generate via CSS repeating gradient or SVG pattern, low contrast). Centered: heading "Connect
Engage Transform" in void/black .text-display; subtitle "Join A Vibrant Community For Fuel Motivation,
Engagement Drives Progress, And Transformation" (dark, muted); a white pill email input + a black pill
"Join Now" button. (Use onChange handlers, NOT a <form>.)
FOOTER (void bg): left — "FiTusion" wordmark + tagline "Your Go-To For Personalized Workouts, Meal
Plans, And Expert Fitness Advice". Center — "Follow Us On" + social icons (Facebook, Linkedin,
Instagram, X) as volt-on-hover squares, and a bottom nav row: Home, About, Features, Service, Exercise.
Right — "Contact": "Monday-Sunday", "8:00 AM - 8:00 PM", "E-mail", "FiTusion@gmail.com" (Space Mono).
```

---

## Assemble the page
**Provide:** the full-page screenshot (`image 9`).
```
In app/page.tsx, import and stack the sections in screenshot order: Navbar, Hero (+ logo strip),
Features, Discover, TrainSmarter, Experience, Trainers, Testimonials, CTA, Footer. Set consistent
vertical section padding (~120–160px desktop) and a max-width
container (~1200px) with the hero/CTA going full-bleed. Compare against the full-page screenshot and
fix any spacing, order, or rhythm mismatches.
```

## Motion & polish
**Provide:** none (text). Do this once layout is correct.
```
Add Motion (framer-motion) without changing layout:
- Page load: hero headline lines and stat chips fade-up + scale-in, staggered.
- Hero: subtle parallax on the photo (mouse/scroll); stat chips gently bob; volt glow slowly pulses.
- Scroll reveals: each section's children fade-up 24px, staggered, triggered once in view.
- Count-up: animate the stat numbers (1.5, 20, 550, 5, 95, 1024) from 0 when in view.
- Logo strip: continuous marquee. Hover: card lifts + glow, button glow, volt underline grow on
  nav links. (Optional, not in the static design: volt photo duotone on hover.)
- Respect prefers-reduced-motion. Keep it smooth and performant.
```

## Responsive pass
**Provide:** none (text).
```
Make every section responsive (mobile-first → desktop). Hero stacks and shrinks; stat chips reflow;
grids collapse to 1–2 columns; the Experience offset is removed on mobile; nav becomes a slide-in
drawer with a volt menu icon. Verify at 375px, 768px, 1280px, 1536px. Keep the dark + single-lime
aesthetic identical across breakpoints.
```

## Multi-page expansion
**Provide:** the relevant page section of your design brief.
```
Read DESIGN.md. Create the additional routes reusing existing components and tokens: /classes,
/classes/[slug], /schedule, /membership, /trainers, /trainers/[slug], /programs, /about, /blog,
/blog/[slug], /contact, plus a /dashboard layout and /login. Build /classes first per DESIGN.md
(filter bar, featured banner, class grid using <Card> + notched image cards). Keep the navbar/footer
shared in the root layout.
```

---

## Gotchas to watch

- **Don't let it invent tokens.** If a section comes back with off-palette greens, point it back to `tailwind.config.ts`.
- **Notched corners** = `clip-path: polygon(...)` on the image card + a small absolutely-positioned volt triangle — say so explicitly or it'll fake it with a border.
- **Photos uniform:** apply `grayscale contrast-110` so mismatched source photos read as one set.
- **No `<form>` tags** if you ever drop a section into a Claude artifact for preview — use `onClick`/`onChange`. (In the real Next.js app, forms are fine.)
- **Stat cards** are semi-solid olive (≈ `bg-graphite/70`), not frosted glass — keep them over the photo so they read. No film grain, noise, or mesh anywhere; backgrounds stay flat near-black.
- **Build static first, animate last.** Debugging layout and motion at the same time is where hours disappear.

---

*Lock the tokens, build the primitives, then march down the screenshots one at a time. That sequence is what keeps it consistent and gets you the goosebumps build Stitch couldn't.*
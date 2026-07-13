# FORGE Coffee — Implementation Plan

> **For agentic workers:** Inline execution. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an award-winning single-page artisan coffee shop website with full GSAP animation suite.

**Architecture:** Single `index.html` with embedded `<style>` and `<script>` blocks. GSAP loaded from CDN. All SVG illustrations inline. Zero framework overhead for maximum animation performance.

**Tech Stack:** HTML5, CSS3 (custom properties, clamp(), grid), Vanilla JS, GSAP 3.12+ (ScrollTrigger, MorphSVG, SplitText, Draggable, MotionPath), Google Fonts (Instrument Serif + Inter)

## Sections

1. Loader — SVG coffee bean morph animation → dissolves into hero
2. Hero — Full-viewport dark hero, split-text reveal, parallax steam particles
3. Story — "Our Craft" scroll-triggered pin + scrub narrative panels
4. Menu — Horizontal scroll gallery with containerAnimation
5. Space — Gallery with 3D tilt cards, blur-to-focus scroll reveals
6. Contact — Pinned map section with address fade-in
7. Footer — Clean, minimal footer with social links

## Global Constraints

- Dark theme with cream text areas: `#2C1810` (espresso brown), `#D4764A` (burnt copper), `#F5F0E8` (cream), `#1A1A1A` (near-black)
- Headings: Instrument Serif, Body: Inter
- Every animation must respect `prefers-reduced-motion`
- All icons as inline SVG, no emoji
- `cursor: pointer` on all clickable elements
- Responsive: 375px, 768px, 1024px, 1440px

---

### Task 1: Project Scaffold & HTML Structure

**Files:**
- Create: `index.html`

- [ ] Write complete HTML skeleton with all 7 sections, meta tags, OG tags, font preloads, and CDN script tags for GSAP + plugins
- [ ] Create CSS custom properties in `<style>` block with full theme
- [ ] Wire up GSAP import: ScrollTrigger, SplitText (via CDN or ESM)

### Task 2: Loader Animation

**Files:**
- Modify: `index.html`

- [ ] Build SVG coffee bean with `morphSVG` animation (steam → bean → logo reveal)
- [ ] Animate with GSAP timeline: morph shape, fade out, trigger hero intro
- [ ] After loader: `gsap.set('.loader', { display: 'none' })` + begin hero

### Task 3: Hero Section

**Files:**
- Modify: `index.html`

- [ ] Full-viewport dark background with gradient overlay
- [ ] Split text headline "FORGE" with staggered char reveal
- [ ] Subtitle "Where Craft Meets Cup" fade-up
- [ ] CTA button with hover glow effect
- [ ] Parallax steam particles (SVG circles animated with `gsap.to()` + ScrollTrigger)
- [ ] Mouse follower glow effect on `.hero-glow`

### Task 4: Story Section

**Files:**
- Modify: `index.html`

- [ ] Three-panel narrative with ScrollTrigger pin + scrub
- [ ] Panel 1: "The Bean" — fade-in from left with image
- [ ] Panel 2: "The Roast" — fade-in from right with image
- [ ] Panel 3: "The Pour" — fade-in from bottom with image
- [ ] Progress indicator bar at top

### Task 5: Menu Section

**Files:**
- Modify: `index.html`

- [ ] Horizontal scroll container with `containerAnimation`
- [ ] 6 menu cards with `ease: "none"` scroll drive
- [ ] Each card: drink name, description, price, decorative SVG
- [ ] Stagger entrance on load via ScrollTrigger

### Task 6: The Space Gallery

**Files:**
- Modify: `index.html`

- [ ] 3-column grid of cafe photos/illustrations
- [ ] Cards with 3D perspective tilt on hover (GSAP + mouse tracking)
- [ ] ScrollTrigger reveals with blur → focus transition
- [ ] Full-screen pin section with scrub

### Task 7: Contact & Footer

**Files:**
- Modify: `index.html`

- [ ] Contact section with pinned background, address fade-up
- [ ] Embedded-styled location info (hours, address, phone)
- [ ] Footer with social SVG icons, copyright
- [ ] Smooth scroll nav links

### Task 8: Navigation & Micro-interactions

**Files:**
- Modify: `index.html`

- [ ] Fixed nav bar with transparent → solid background on scroll
- [ ] Nav links with hover underline animation
- [ ] Active section highlighting via ScrollTrigger
- [ ] Mobile hamburger menu with GSAP slide-in
- [ ] Button hover ripple effects

### Task 9: Polish & Verification

**Files:**
- Modify: `index.html`

- [ ] Add `prefers-reduced-motion` media query fallbacks
- [ ] Verify all GSAP animations at 375px, 768px, 1024px
- [ ] Test loader → hero transition
- [ ] Verify no broken SVG/animation console errors
- [ ] Check contrast ratios meet WCAG AA

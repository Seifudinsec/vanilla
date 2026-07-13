# Vanilla — Refactor Status

**Goal:** Refactor artisan coffee site from plain HTML/JS → Next.js 14 + React 18 + TypeScript + GSAP + Lenis with vibrant sage-green palette, Nevera display font, and site header background image.

**Stack:** Next.js 14 App Router, React 18, TypeScript strict, GSAP 3.12.5 (ScrollTrigger, ScrollToPlugin), Lenis smooth scroll.

**Display font:** Nevera (CDNFonts import). **Body font:** Inter (Google Fonts).

**Color palette:**
| Token | Value |
|-------|-------|
| `--green-deep` | `#2D5A27` |
| `--green-leaf` | `#5B8C5A` |
| `--green-mist` | `#8FB08E` |
| `--near-black` | `#1A1A1A` |
| `--cream` | `#F5F0E8` |
| `--white` | `#FFFFFF` |

**Sections (7):** Loader → Hero (with `background.jpg`) → Story (horizontal pin+scrub) → Menu (horizontal card scroll) → Gallery (3D tilt) → Contact → Footer.

**Commits (12):**
1. `chore: scaffold Next.js 14 project with GSAP + Lenis`
2. `feat: add design system with CSS vars, Nevera + Inter fonts, reset`
3. `feat: add menu, story, and gallery data files`
4. `feat: add VN monogram and VANILLA per-letter SVG wordmark`
5. `feat: add Lenis smooth scroll provider with GSAP integration`
6. `feat: add loader with percentage counter and VN logo animation`
7. `feat: add modern clean nav with scroll state and mobile menu`
8. `feat: add hero with background.jpg, VANILLA wordmark, particles, glow`
9. `feat: add story horizontal scroll and menu horizontal card scroll`
10. `feat: add gallery 3D tilt, contact staggered reveal, footer`
11. `feat: compose root layout and main page with all sections`
12. `fix: type-safe tilt cleanup in gallery component`

**Build:** Passes with zero errors.
**Dev server:** `http://localhost:3000` — HTTP 200.

**Project dir:** `/home/seifudin/projects/vanilla/`

'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageLayout from '@/components/PageLayout'
import { pageImages, galleryContent } from '@/data/pages'

export default function GalleryPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const hScrollSectionRef = useRef<HTMLElement>(null)
  const hScrollTrackRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLElement>(null)
  const finaleRef = useRef<HTMLElement>(null)
  const finaleImgRef = useRef<HTMLDivElement>(null)
  const finaleTextRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // ───── HERO ENTRY ─────
      gsap.fromTo(
        heroTitleRef.current,
        { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.6, ease: 'power3.out' }
      )

      gsap.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, filter: 'blur(8px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 1.4, delay: 0.7, ease: 'power2.out' }
      )

      gsap.to(scrollIndicatorRef.current, {
        y: 14,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: 'power1.inOut',
      })

      // ───── HERO PARALLAX ─────
      gsap.to(heroImgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // ───── SCROLL ANIMATIONS (responsive) ─────
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 801px)',
          isMobile: '(max-width: 800px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (c) => {
          const { isDesktop, reduce } = c.conditions as Record<string, boolean>
          if (reduce) return

          // ── HORIZONTAL SCROLL (desktop only) ──
          if (isDesktop && hScrollTrackRef.current) {
            const distance = -(hScrollTrackRef.current.scrollWidth - window.innerWidth + 60)

            const scrollTween = gsap.to(hScrollTrackRef.current, {
              x: distance,
              ease: 'none',
              scrollTrigger: {
                trigger: hScrollSectionRef.current,
                start: 'top top',
                end: () => `+=${Math.abs(distance) + window.innerHeight}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })

            galleryContent.hScroll.forEach((_, i) => {
              gsap.to(`.gallery-panel-${i}`, {
                scale: 1,
                scrollTrigger: {
                  containerAnimation: scrollTween,
                  trigger: `.gallery-panel-${i}`,
                  start: 'left center',
                  end: 'center center',
                  toggleActions: 'play reverse play reverse',
                },
              })

              gsap.fromTo(
                `.caption-${i}`,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  scrollTrigger: {
                    containerAnimation: scrollTween,
                    trigger: `.gallery-panel-${i}`,
                    start: 'left center',
                    end: 'center center',
                    toggleActions: 'play reverse play reverse',
                  },
                }
              )
            })
          }

          // ── SPLIT DETAILS ──
          const detailRows = detailsRef.current?.querySelectorAll('.detail-row')
          detailRows?.forEach((row, i) => {
            const img = row.querySelector('.detail-reveal') as HTMLElement
            const text = row.querySelector('.detail-text-inner') as HTMLElement
            if (!img || !text) return

            gsap.fromTo(
              img,
              { clipPath: 'circle(0%)' },
              {
                clipPath: 'circle(100%)',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 80%',
                  end: 'top 35%',
                  scrub: 1,
                },
              }
            )

            gsap.fromTo(
              text,
              { x: i % 2 === 0 ? 60 : -60, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: row,
                  start: 'top 75%',
                  end: 'top 35%',
                  scrub: 1,
                },
              }
            )
          })

          // ── 3D GRID STAGGER ──
          gsap.fromTo(
            '.grid-item',
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              stagger: 0.08,
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
              },
            }
          )

          // ── CINEMATIC FINALE ──
          gsap.fromTo(
            finaleImgRef.current,
            { scale: 1 },
            {
              scale: 1.15,
              scrollTrigger: {
                trigger: finaleRef.current,
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
              },
            }
          )

          gsap.fromTo(
            finaleTextRef.current,
            { opacity: 0, letterSpacing: '30px' },
            {
              opacity: 1,
              letterSpacing: '8px',
              scrollTrigger: {
                trigger: finaleRef.current,
                start: 'top 70%',
                end: 'top 30%',
                scrub: 1,
              },
            }
          )

          gsap.to('.finale-overlay', {
            opacity: 0.7,
            scrollTrigger: {
              trigger: finaleRef.current,
              start: 'top bottom',
              end: 'top 30%',
              scrub: 1,
            },
          })
        }
      )

      // ───── GRID HOVER TILT (event-based) ─────
      const grid = gridRef.current
      if (grid && !reduceMotion) {
        const onMove = (e: MouseEvent) => {
          const target = (e.target as HTMLElement).closest('.grid-item') as HTMLElement | null
          if (!target) return
          const rect = target.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const cx = rect.width / 2
          const cy = rect.height / 2
          gsap.to(target, {
            rotateX: ((y - cy) / cy) * -10,
            rotateY: ((x - cx) / cx) * 10,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
        const onLeave = () => {
          gsap.to(grid.querySelectorAll('.grid-item'), {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
        grid.addEventListener('mousemove', onMove)
        grid.addEventListener('mouseleave', onLeave)
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      <div ref={pageRef} className="gallery-page">
        <style jsx>{`
          .gallery-page {
            overflow-x: clip;
          }

          /* ─── HERO ─── */
          .gallery-hero {
            position: relative;
            height: 100vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .gallery-hero-bg {
            position: absolute;
            inset: -10vh -10vw;
            z-index: 0;
          }
          .gallery-hero-bg img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            will-change: transform;
          }
          .gallery-hero-overlay {
            position: absolute;
            inset: 0;
            z-index: 1;
            background: linear-gradient(180deg, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.1) 40%, rgba(17,17,17,0.5) 100%);
          }
          .gallery-hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            color: var(--ivory);
          }
          .gallery-hero-title {
            font: 300 clamp(56px, 10vw, 140px) / 0.9 var(--display);
            letter-spacing: -0.03em;
            text-transform: uppercase;
            color: var(--ivory);
            text-shadow: 0 4px 40px rgba(0,0,0,0.3);
          }
          .gallery-hero-subtitle {
            font: italic 400 clamp(16px, 2vw, 28px) var(--serif);
            margin-top: 16px;
            color: rgba(250, 255, 241, 0.85);
          }

          /* Scroll indicator */
          .scroll-indicator {
            position: absolute;
            bottom: 36px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
            color: var(--ivory);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }
          .scroll-indicator span {
            font-size: 9px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            opacity: 0.6;
            font-weight: 500;
          }
          .scroll-indicator svg {
            width: 20px;
            height: 20px;
          }

          /* ─── HORIZONTAL SCROLL SECTION ─── */
          .hscroll-section {
            height: 100vh;
            overflow: hidden;
            position: relative;
          }
          .gallery-track {
            display: flex;
            gap: 28px;
            will-change: transform;
            padding-left: 40px;
            padding-right: 40px;
            height: 100vh;
            align-items: center;
          }
          .gallery-panel {
            flex: 0 0 70vw;
            height: 70vh;
            position: relative;
            overflow: hidden;
            border-radius: 16px;
            transform: scale(0.95);
            will-change: transform;
          }
          .gallery-panel img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .gallery-panel::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(0deg, rgba(17,17,17,0.5) 0%, transparent 50%);
            pointer-events: none;
          }
          .gallery-caption {
            position: absolute;
            bottom: 28px;
            left: 28px;
            z-index: 2;
            color: var(--ivory);
          }
          .gallery-caption span {
            font: italic 400 clamp(18px, 2vw, 26px) var(--serif);
            text-shadow: 0 2px 20px rgba(0,0,0,0.4);
          }

          /* ─── SPLIT DETAILS ─── */
          .details-section {
            padding: 120px 0;
          }
          .details-inner {
            width: min(1200px, 100%);
            margin: 0 auto;
            padding: 0 48px;
            display: flex;
            flex-direction: column;
            gap: 100px;
          }
          .detail-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
          }
          .detail-row.reverse {
            direction: rtl;
          }
          .detail-row.reverse .detail-text-wrap {
            direction: ltr;
          }
          .detail-image-wrap {
            overflow: hidden;
            border-radius: 12px;
            position: relative;
          }
          .detail-reveal {
            width: 100%;
            height: 420px;
            object-fit: cover;
            display: block;
            will-change: clip-path;
          }
          .detail-text-wrap {
            padding: 20px 0;
          }
          .detail-text-inner {
            will-change: transform, opacity;
          }
          .detail-text-inner h3 {
            font: 500 clamp(28px, 3.2vw, 40px) var(--serif);
            margin-bottom: 16px;
            color: var(--onyx);
          }
          .detail-text-inner p {
            font-size: clamp(14px, 1.2vw, 17px);
            line-height: 1.8;
            color: var(--soft);
            max-width: 440px;
          }

          /* ─── 3D GRID ─── */
          .grid-section {
            padding: 120px 0;
            background: var(--deep);
          }
          .grid-inner {
            width: min(1200px, 100%);
            margin: 0 auto;
            padding: 0 48px;
          }
          .grid-header {
            text-align: center;
            margin-bottom: 60px;
          }
          .grid-header h2 {
            font: 400 clamp(34px, 4vw, 52px) / 1.05 var(--serif);
            margin-top: 10px;
          }
          .grid-header h2 em {
            color: var(--tomato);
            font-style: italic;
          }
          .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            perspective: 1200px;
          }
          .grid-item {
            position: relative;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 4 / 3;
            cursor: pointer;
            will-change: transform;
            transform-style: preserve-3d;
          }
          .grid-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s var(--ease);
          }
          .grid-item:hover img {
            transform: scale(1.06);
          }
          .grid-item-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 24px 20px 18px;
            background: linear-gradient(0deg, rgba(17,17,17,0.7) 0%, transparent 100%);
            color: var(--ivory);
            transform: translateY(100%);
            transition: transform 0.4s var(--ease);
          }
          .grid-item:hover .grid-item-caption {
            transform: translateY(0);
          }
          .grid-item-caption span {
            font: italic 400 18px var(--serif);
          }

          /* ─── CINEMATIC FINALE ─── */
          .finale-section {
            position: relative;
            height: 100vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .finale-img-wrap {
            position: absolute;
            inset: 0;
            will-change: transform;
          }
          .finale-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .finale-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.8) 100%);
            opacity: 0.2;
            will-change: opacity;
          }
          .finale-content {
            position: relative;
            z-index: 2;
            text-align: center;
            color: var(--ivory);
          }
          .finale-content h2 {
            font: italic 300 clamp(32px, 5vw, 72px) var(--serif);
            text-shadow: 0 4px 40px rgba(0,0,0,0.4);
            will-change: opacity, letter-spacing;
          }

          /* ─── RESPONSIVE ─── */
          @media (max-width: 800px) {
            .gallery-track {
              flex-direction: column;
              height: auto;
              padding: 40px 20px;
              gap: 24px;
              transform: none !important;
            }
            .hscroll-section {
              height: auto;
              overflow: visible;
            }
            .gallery-panel {
              flex: none;
              width: 100%;
              height: 55vh;
              transform: scale(1) !important;
            }
            .gallery-caption {
              bottom: 20px;
              left: 20px;
            }
            .details-inner {
              padding: 0 20px;
              gap: 60px;
            }
            .detail-row {
              grid-template-columns: 1fr;
              gap: 24px;
            }
            .detail-row.reverse {
              direction: ltr;
            }
            .detail-reveal {
              height: 280px;
            }
            .detail-text-inner p {
              max-width: 100%;
            }
            .grid-inner {
              padding: 0 20px;
            }
            .grid-container {
              gap: 14px;
            }
            .grid-item-caption {
              transform: translateY(0);
              padding: 16px 14px 12px;
            }
            .grid-item-caption span {
              font-size: 14px;
            }
            .finale-content h2 {
              padding: 0 24px;
            }
          }

          @media (max-width: 500px) {
            .grid-container {
              grid-template-columns: 1fr;
            }
            .gallery-panel {
              height: 45vh;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .grid-item-caption {
              transform: translateY(0);
            }
          }
        `}</style>

        {/* ═══ HERO ═══ */}
        <section ref={heroRef} className="gallery-hero">
          <div ref={heroImgRef} className="gallery-hero-bg">
            <img src={pageImages.gallery.hero} alt="The Space" />
          </div>
          <div className="gallery-hero-overlay" />
          <div className="gallery-hero-content">
            <h1 ref={heroTitleRef} className="gallery-hero-title">
              The Space
            </h1>
            <p ref={heroSubtitleRef} className="gallery-hero-subtitle">
              Inside the world of Vanilla.
            </p>
          </div>
          <div ref={scrollIndicatorRef} className="scroll-indicator">
            <span>Scroll</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* ═══ HORIZONTAL SCROLL ═══ */}
        <section ref={hScrollSectionRef} className="hscroll-section">
          <div ref={hScrollTrackRef} className="gallery-track">
            {galleryContent.hScroll.map((item, i) => (
              <div key={i} className={`gallery-panel gallery-panel-${i}`}>
                <img src={item.src} alt={item.caption} />
                <div className={`gallery-caption caption-${i}`}>
                  <span>{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SPLIT DETAILS ═══ */}
        <section ref={detailsRef} className="details-section">
          <div className="details-inner">
            {pageImages.gallery.details.map((detail, i) => (
              <div key={i} className={`detail-row ${i % 2 === 1 ? 'reverse' : ''}`}>
                <div className="detail-image-wrap">
                  <img
                    className="detail-reveal"
                    src={detail.img}
                    alt={detail.title}
                  />
                </div>
                <div className="detail-text-wrap">
                  <div className="detail-text-inner">
                    <h3>{detail.title}</h3>
                    <p>{detail.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 3D GRID ═══ */}
        <section ref={gridRef} className="grid-section">
          <div className="grid-inner">
            <div className="grid-header">
              <p className="eyebrow">Moments</p>
              <h2>
                Every corner <em>tells a story.</em>
              </h2>
            </div>
            <div className="grid-container">
              {pageImages.gallery.grid.map((src, i) => (
                <div key={i} className="grid-item">
                  <img src={src} alt={`Gallery ${i + 1}`} />
                  <div className="grid-item-caption">
                    <span>
                      {['The counter', 'The bar', 'The arch', 'The garden', 'The mill', 'The stillness'][i]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CINEMATIC FINALE ═══ */}
        <section ref={finaleRef} className="finale-section">
          <div ref={finaleImgRef} className="finale-img-wrap">
            <img src={pageImages.gallery.finale} alt="Come taste the silence" />
          </div>
          <div className="finale-overlay" />
          <div className="finale-content">
            <h2 ref={finaleTextRef}>Come taste the silence.</h2>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

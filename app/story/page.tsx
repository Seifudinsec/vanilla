'use client';

import { useEffect, useRef } from 'react';
import PageLayout from '@/components/PageLayout';
import { pageImages, storyContent } from '@/data/pages';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const foundingRef = useRef<HTMLDivElement>(null);
  const foundingImageRef = useRef<HTMLDivElement>(null);
  const foundingTextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<HTMLDivElement>(null);
  const sourcingRef = useRef<HTMLDivElement>(null);
  const sourcingImageRef = useRef<HTMLDivElement>(null);
  const sourcingTextRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const teamCardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsNumbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero parallax
        if (heroRef.current) {
          gsap.fromTo(
            heroRef.current,
            { yPercent: 0 },
            { yPercent: 20, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } }
          );
        }

        // Hero title clip-path reveal
        if (heroContentRef.current) {
          const heroTitle = heroContentRef.current.querySelector('h1');
          const heroSubtitle = heroContentRef.current.querySelector('p');
          if (heroTitle) {
            gsap.fromTo(heroTitle, { clipPath: 'inset(0 0 100% 0)', y: 40 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
          }
          if (heroSubtitle) {
            gsap.fromTo(heroSubtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 });
          }
        }

        // Founding image clip-path circle reveal
        if (foundingImageRef.current) {
          gsap.fromTo(foundingImageRef.current, { clipPath: 'circle(0%)' }, {
            clipPath: 'circle(100%)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: foundingRef.current, start: 'top 70%', end: 'center 50%', scrub: 1 },
          });
        }

        // Founding text fade/slide
        if (foundingTextRef.current) {
          const paragraphs = foundingTextRef.current.querySelectorAll('p');
          gsap.fromTo(paragraphs, { opacity: 0, x: 30 }, {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: foundingRef.current, start: 'top 65%' },
          });
        }

        // Timeline items alternating sides
        if (timelineItemsRef.current) {
          const items = timelineItemsRef.current.querySelectorAll<HTMLElement>('.timeline-item');
          items.forEach((item, i) => {
            const x = i % 2 === 0 ? -60 : 60;
            gsap.fromTo(item, { opacity: 0, x }, {
              opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 80%' },
            });
          });
        }

        // Sourcing parallax
        if (sourcingImageRef.current) {
          gsap.fromTo(sourcingImageRef.current, { yPercent: -10 }, {
            yPercent: 10, ease: 'none',
            scrollTrigger: { trigger: sourcingRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          });
        }

        // Sourcing text blur-to-clear
        if (sourcingTextRef.current) {
          gsap.fromTo(sourcingTextRef.current, { opacity: 0, filter: 'blur(8px)' }, {
            opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: sourcingRef.current, start: 'top 60%' },
          });
        }

        // Team cards stagger
        if (teamCardsRef.current) {
          const cards = teamCardsRef.current.querySelectorAll<HTMLElement>('.team-card');
          gsap.fromTo(cards, { opacity: 0, scale: 0.85 }, {
            opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: teamRef.current, start: 'top 75%' },
          });
        }

        // Stats counter
        if (statsRef.current) {
          const nums = statsNumbersRef.current.filter(Boolean) as HTMLDivElement[];
          nums.forEach((el) => {
            const target = el.getAttribute('data-target') || '0';
            const isSuffix = target.endsWith('+') || target.endsWith('×');
            const cleanTarget = target.replace(/[+×]/g, '');
            const numTarget = parseInt(cleanTarget, 10);
            if (isNaN(numTarget)) return;
            const suffix = target.replace(cleanTarget, '');
            gsap.fromTo(el, { textContent: '0' }, {
              textContent: numTarget, duration: 2, ease: 'power2.out', snap: { textContent: 1 },
              onUpdate: () => {
                const current = Math.round(parseFloat(el.textContent || '0'));
                el.textContent = current + suffix;
              },
              scrollTrigger: { trigger: statsRef.current, start: 'top 75%' },
            });
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef} className="story-hero">
        <div className="story-hero-bg">
          <img src={pageImages.story.hero} alt="Vanilla Matcha & Mojito House interior" />
        </div>
        <div className="story-hero-overlay" />
        <div ref={heroContentRef} className="story-hero-content">
          <h1>Our Story</h1>
          <p>From flower shop to tea house.</p>
        </div>
      </section>

      {/* Founding */}
      <section ref={foundingRef} className="section founding-section">
        <div className="container">
          <div className="founding-grid">
            <div ref={foundingImageRef} className="founding-image">
              <img src={pageImages.story.founding} alt="Vanilla's original flower shop turned tea house" />
            </div>
            <div ref={foundingTextRef} className="founding-text">
              <span className="eyebrow">Our Beginning</span>
              <h2>{storyContent.founding.title}</h2>
              {storyContent.founding.paragraphs.map((p, i) => (
                <p key={i} className="body-copy">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="section timeline-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Journey</span>
            <h2>Every step <em>matters.</em></h2>
          </div>
          <div ref={timelineItemsRef} className="timeline-items">
            {storyContent.timeline.map((item, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-marker">
                  <span className="timeline-year">{item.year}</span>
                  <div className="timeline-dot" />
                </div>
                <div className="timeline-card">
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing */}
      <section ref={sourcingRef} className="sourcing-section">
        <div ref={sourcingImageRef} className="sourcing-image">
          <img src={pageImages.story.sourcing} alt="Matcha being stone-milled" />
        </div>
        <div className="sourcing-overlay" />
        <div className="container sourcing-container">
          <div ref={sourcingTextRef} className="sourcing-text">
            <span className="eyebrow">Sourcing</span>
            <h2>{storyContent.sourcing.title}</h2>
            {storyContent.sourcing.paragraphs.map((p, i) => (
              <p key={i} className="body-copy">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="section team-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The People</span>
            <h2>Who makes it <em>possible.</em></h2>
          </div>
          <div ref={teamCardsRef} className="team-grid">
            {storyContent.team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-card-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-card-body">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="section stats-section">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 64px' }}>
            <span className="eyebrow">By the Numbers</span>
            <h2>What the <em>details</em> say.</h2>
          </div>
          <div className="stats-grid">
            {storyContent.stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div
                  className="stat-value"
                  ref={(el) => { statsNumbersRef.current[i] = el; }}
                  data-target={stat.value}
                >
                  0
                </div>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .story-hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .story-hero-bg {
          position: absolute;
          inset: -20% -20% -20% -20%;
          z-index: 0;
        }
        .story-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .story-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.5) 100%);
        }
        .story-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: var(--ivory);
        }
        .story-hero-content h1 {
          font: 400 clamp(52px, 6vw, 96px)/1.05 var(--serif);
          margin-bottom: 16px;
          clip-path: inset(0 0 100% 0);
        }
        .story-hero-content p {
          font: 300 clamp(16px, 1.8vw, 22px) var(--sans);
          color: rgba(250,255,241,0.8);
          letter-spacing: 0.06em;
        }

        .founding-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .founding-image {
          border-radius: 12px;
          overflow: hidden;
          height: 560px;
          clip-path: circle(0%);
        }
        .founding-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .founding-text h2 {
          font: 400 clamp(32px, 3.6vw, 52px)/1.1 var(--serif);
          margin: 12px 0 20px;
        }
        .founding-text .body-copy {
          margin-top: 16px;
        }

        .timeline-section {
          background: var(--deep);
        }
        .timeline-items {
          position: relative;
          padding: 20px 0;
        }
        .timeline-items::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--camel);
          transform: translateX(-50%);
        }
        .timeline-item {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 60px;
          position: relative;
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-item.left {
          flex-direction: row;
        }
        .timeline-item.right {
          flex-direction: row-reverse;
        }
        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          width: 100px;
          position: relative;
          z-index: 2;
        }
        .timeline-year {
          font: 500 clamp(18px, 1.6vw, 24px) var(--serif);
          color: var(--onyx);
          white-space: nowrap;
        }
        .timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--tomato);
          border: 3px solid var(--deep);
          box-shadow: 0 0 0 2px var(--tomato);
        }
        .timeline-card {
          background: var(--ivory);
          border-radius: 12px;
          padding: 24px 28px;
          flex: 1;
          max-width: 440px;
          box-shadow: 0 4px 20px rgba(17,17,17,0.04);
        }
        .timeline-card p {
          color: var(--soft);
          font-size: 15px;
          line-height: 1.7;
        }
        .timeline-item.left .timeline-card {
          text-align: right;
        }
        .timeline-item.right .timeline-card {
          text-align: left;
        }

        .sourcing-section {
          position: relative;
          overflow: hidden;
          height: 80vh;
          min-height: 500px;
          display: flex;
          align-items: center;
        }
        .sourcing-image {
          position: absolute;
          inset: -20% -20% -20% -20%;
          z-index: 0;
        }
        .sourcing-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sourcing-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(90deg, rgba(17,17,17,0.55) 0%, rgba(17,17,17,0.25) 100%);
        }
        .sourcing-container {
          position: relative;
          z-index: 2;
        }
        .sourcing-text {
          max-width: 600px;
        }
        .sourcing-text .eyebrow {
          color: var(--camel);
        }
        .sourcing-text h2 {
          font: 400 clamp(32px, 3.6vw, 52px)/1.1 var(--serif);
          margin: 12px 0 20px;
          color: var(--ivory);
        }
        .sourcing-text .body-copy {
          color: rgba(250,255,241,0.85);
          margin-top: 16px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .team-card {
          background: var(--ivory);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(17,17,17,0.04);
          transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
        }
        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(17,17,17,0.08);
        }
        .team-card-image {
          aspect-ratio: 1;
          overflow: hidden;
        }
        .team-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s var(--ease);
        }
        .team-card:hover .team-card-image img {
          transform: scale(1.06);
        }
        .team-card-body {
          padding: 20px 22px 24px;
        }
        .team-card-body h3 {
          font: 500 clamp(16px, 1.4vw, 20px) var(--serif);
          color: var(--onyx);
          margin-bottom: 4px;
        }
        .team-card-body p {
          font-size: 12px;
          color: var(--camel);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .stats-section {
          background: var(--onyx);
          color: var(--ivory);
        }
        .stats-section .section-head .eyebrow {
          color: var(--camel);
        }
        .stats-section .section-head h2 {
          color: var(--ivory);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          text-align: center;
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .stat-value {
          font: 500 clamp(42px, 4vw, 64px) var(--display);
          color: var(--tomato);
          line-height: 1;
        }
        .stat-label {
          font-size: 13px;
          color: rgba(250,255,241,0.6);
          letter-spacing: 0.04em;
          max-width: 180px;
          line-height: 1.5;
        }

        @media (max-width: 1100px) {
          .founding-grid {
            gap: 48px;
          }
          .founding-image {
            height: 400px;
          }
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-grid {
            gap: 24px;
          }
        }

        @media (max-width: 800px) {
          .story-hero-content h1 {
            font-size: clamp(40px, 10vw, 56px);
          }
          .founding-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .founding-image {
            height: 280px;
          }
          .founding-text {
            order: -1;
          }
          .timeline-items::before {
            left: 24px;
          }
          .timeline-item,
          .timeline-item.left,
          .timeline-item.right {
            flex-direction: row;
            gap: 16px;
          }
          .timeline-marker {
            width: auto;
            flex-direction: row;
            gap: 10px;
            margin-left: 0;
          }
          .timeline-item .timeline-card {
            text-align: left !important;
          }
          .timeline-dot {
            width: 12px;
            height: 12px;
          }
          .timeline-card {
            max-width: 100%;
            padding: 18px 20px;
          }
          .sourcing-section {
            height: 60vh;
            min-height: 400px;
          }
          .sourcing-text {
            max-width: 100%;
          }
          .team-grid {
            grid-template-columns: 1fr;
            max-width: 380px;
            margin: 0 auto;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
          .stat-value {
            font-size: clamp(36px, 8vw, 48px);
          }
        }
      `}</style>
    </PageLayout>
  );
}

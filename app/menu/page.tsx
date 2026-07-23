'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '@/components/PageLayout';
import Reveal from '@/components/Reveal';
import { pageImages, menuContent } from '@/data/pages';
import { menu, signatureDrinks } from '@/data/site';

const categories = Object.keys(menu);
const initials = (name: string) =>
  name.replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('Matcha');

  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  const featuredRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const menuGridRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const philosophyImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (heroBgRef.current) {
          gsap.to(heroBgRef.current, {
            y: '25%',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        if (heroTitleRef.current) {
          gsap.fromTo(
            heroTitleRef.current,
            { clipPath: 'inset(0 100% 0 0)', y: 20 },
            { clipPath: 'inset(0 0 0 0)', y: 0, duration: 1.2, ease: 'power3.out' }
          );
        }

        if (featuredRef.current) {
          const cards = featuredRef.current.querySelectorAll('.featured-card');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, rotateX: 5 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: featuredRef.current, start: 'top 80%', once: true },
            }
          );
        }

        if (signatureRef.current) {
          const rows = signatureRef.current.querySelectorAll('.signature-row');
          gsap.fromTo(
            rows,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: signatureRef.current, start: 'top 82%', once: true },
            }
          );
        }

        if (philosophyImgRef.current) {
          gsap.to(philosophyImgRef.current, {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });

      gsap.set(heroTitleRef.current, { clipPath: 'inset(0 100% 0 0)' });
    }, [heroRef, heroBgRef, heroTitleRef, featuredRef, signatureRef, philosophyRef, philosophyImgRef]);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuGridRef.current) return;
    const items = menuGridRef.current.querySelectorAll('.menu-item-card');
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.92, y: 16 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' }
    );
  }, [activeCategory]);

  return (
    <PageLayout>
      <section ref={heroRef} className="menu-hero">
        <div ref={heroBgRef} className="menu-hero-bg" style={{ backgroundImage: `url(${pageImages.menu.hero})` }} />
        <div className="menu-hero-overlay" />
        <div className="menu-hero-content">
          <h1 ref={heroTitleRef} className="menu-hero-title">
            The Menu
          </h1>
          <p className="menu-hero-subtitle">Good things, well made.</p>
        </div>
      </section>

      <section ref={featuredRef} className="section featured-section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Our favorites</p>
              <h2>
                Three you <em>can&apos;t miss.</em>
              </h2>
            </div>
          </Reveal>
          <div className="featured-grid">
            {menuContent.featured.map((item) => (
              <article
                key={item.name}
                className="featured-card"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="featured-card-overlay" />
                <div className="featured-card-body">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <span className="featured-price">{item.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={signatureRef} className="section coffee">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">The signature</p>
              <h2>
                Five drinks we&apos;d defend <em>with our lives.</em>
              </h2>
            </div>
          </Reveal>
          <div className="coffee-list">
            {signatureDrinks.map(([number, name, desc, origin, price]) => (
              <article key={name} className="signature-row coffee-row">
                <span className="coffee-number">{number}</span>
                <span className="coffee-icon">◌</span>
                <h3>{name}</h3>
                <p>{desc}</p>
                <small>{origin}</small>
                <b>{price}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">The menu</p>
              <h2>
                Good things, <em>well made.</em>
              </h2>
            </div>
          </Reveal>
          <div className="menu-tabs" role="tablist">
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div ref={menuGridRef} className="menu-grid" key={activeCategory}>
            {menu[activeCategory].map((item) => (
              <article key={item.name} className="menu-item-card menu-card">
                <div className="menu-card-media" style={{ background: item.tint }}>
                  <span className="menu-card-monogram">{initials(item.name)}</span>
                  <span className="menu-card-cat">{activeCategory}</span>
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-row">
                    <h3>{item.name}</h3>
                    <b>{item.price}</b>
                  </div>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={philosophyRef} className="philosophy-section">
        <div className="philosophy-layout">
          <div className="philosophy-image-wrap">
            <div
              ref={philosophyImgRef}
              className="philosophy-image"
              style={{ backgroundImage: `url(${pageImages.menu.philosophy})` }}
            />
          </div>
          <div className="philosophy-text">
            <Reveal>
              <p className="eyebrow">Our philosophy</p>
              <h2>{menuContent.philosophy.title}</h2>
            </Reveal>
            {menuContent.philosophy.paragraphs.map((p, i) => (
              <Reveal key={i}>
                <p className="body-copy">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .menu-hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .menu-hero-bg {
          position: absolute;
          inset: -10%;
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .menu-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(17, 17, 17, 0.55), rgba(17, 17, 17, 0.2));
        }
        .menu-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: var(--ivory);
        }
        .menu-hero-title {
          font: 400 clamp(52px, 8vw, 120px) / 1.05 var(--serif);
          margin-bottom: 16px;
        }
        .menu-hero-subtitle {
          font: italic 300 clamp(18px, 2vw, 28px) var(--display);
          color: rgba(250, 255, 241, 0.8);
        }

        .featured-section {
          background: var(--ivory);
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .featured-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          isolation: isolate;
          transform-style: preserve-3d;
          transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
        }
        .featured-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 40px 80px -30px rgba(17, 17, 17, 0.25);
        }
        .featured-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 25%, rgba(17, 17, 17, 0.8) 100%);
          z-index: 1;
        }
        .featured-card-body {
          position: relative;
          z-index: 2;
          padding: 32px;
          color: var(--ivory);
          width: 100%;
        }
        .featured-card-body h3 {
          font: 500 clamp(22px, 2.4vw, 30px) var(--serif);
          margin-bottom: 6px;
        }
        .featured-card-body p {
          font-size: 13px;
          color: rgba(250, 255, 241, 0.7);
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .featured-price {
          font: 500 18px var(--serif);
          color: var(--camel);
        }

        .signature-row {
          opacity: 0;
        }

        .menu-item-card {
          opacity: 0;
        }

        .philosophy-section {
          padding: 0;
        }
        .philosophy-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }
        .philosophy-image-wrap {
          overflow: hidden;
          position: relative;
        }
        .philosophy-image {
          position: absolute;
          inset: -10%;
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .philosophy-text {
          background: var(--deep);
          padding: 120px 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
        }
        .philosophy-text h2 {
          font: 400 clamp(36px, 3.6vw, 52px) / 1.05 var(--serif);
          margin-top: 14px;
        }
        .philosophy-text .body-copy {
          max-width: 520px;
        }

        @media (max-width: 1100px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .featured-card:last-child {
            grid-column: span 2;
            aspect-ratio: 4 / 3;
          }
        }
        @media (max-width: 800px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
          .featured-card:last-child {
            grid-column: auto;
            aspect-ratio: 3 / 4;
          }
          .philosophy-layout {
            grid-template-columns: 1fr;
          }
          .philosophy-image-wrap {
            min-height: 300px;
          }
          .philosophy-text {
            padding: 60px 24px;
          }
        }
      `}</style>
    </PageLayout>
  );
}

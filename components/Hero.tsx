'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import VanillaWordmark from './VanillaWordmark';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline({ delay: 2.8 });

    tl.fromTo('.hero-label', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.1');

    if (sectionRef.current && glowRef.current) {
      sectionRef.current.addEventListener('mousemove', (e) => {
        const rect = sectionRef.current!.getBoundingClientRect();
        gsap.to(glowRef.current, {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    }

    const container = particlesRef.current;
    if (container) {
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        Object.assign(p.style, {
          position: 'absolute',
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          background: 'rgba(91,140,90,0.3)',
          borderRadius: '50%',
          left: `${10 + Math.random() * 80}%`,
          top: `${60 + Math.random() * 30}%`,
        });
        container.appendChild(p);

        gsap.to(p, {
          y: -100 - Math.random() * 200,
          x: (Math.random() - 0.5) * 60,
          opacity: 0,
          scale: 1.5 + Math.random(),
          duration: 4 + Math.random() * 4,
          repeat: -1,
          delay: Math.random() * 4,
          ease: 'power1.out',
        });
      }
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(26,26,26,0.7) 0%, rgba(45,90,39,0.5) 50%, rgba(13,13,13,0.8) 100%)',
        }}
      />

      <div
        ref={glowRef}
        style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,140,90,0.15) 0%, transparent 70%)',
          pointerEvents: 'none', transform: 'translate(-50%, -50%)',
        }}
      />

      <div ref={particlesRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', zIndex: 2, padding: '2rem' }}>
        <div className="hero-label" style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--green-leaf)', fontWeight: 500, marginBottom: '1.5rem' }}>
          Est. 2024
        </div>

        <VanillaWordmark />

        <p className="hero-subtitle" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: 'rgba(245,240,232,0.6)', fontWeight: 300, letterSpacing: '0.15em', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
          Pure. Simple. Extraordinary.
        </p>

        <a
          href="#menu"
          className="hero-cta"
          style={{
            display: 'inline-block', padding: '1rem 2.5rem',
            background: 'var(--green-leaf)', color: 'var(--white)',
            textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
            letterSpacing: '0.05em', borderRadius: 4,
            transition: 'transform 0.3s var(--ease-smooth), box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(91,140,90,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '';
          }}
        >
          Explore Our Menu
        </a>
      </div>

      <div className="hero-scroll" style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        color: 'rgba(245,240,232,0.3)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
      }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--green-leaf), transparent)' }} />
      </div>
    </section>
  );
}

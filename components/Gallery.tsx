'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryCards } from '@/data/gallery';

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cleanupFns: (() => void)[] = [];

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-tilt]').forEach((card) => {
        const el = card as HTMLElement;
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(el, {
            rotationY: x * 10, rotationX: -y * 10,
            transformPerspective: 800, duration: 0.4, ease: 'power2.out',
          });
        };
        const onLeave = () => {
          gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.4, ease: 'power2.out' });
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });

      gsap.from('.gallery-card', {
        opacity: 0, y: 40, scale: 0.95, stagger: 0.1,
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      gsap.from('.gallery-placeholder', {
        filter: 'blur(8px)', scale: 1.1, duration: 1, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="gallery" ref={sectionRef} style={{ background: 'var(--near-black)', padding: '6rem clamp(2rem, 6vw, 6rem)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{
          fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--green-leaf)', fontWeight: 500, marginBottom: '1rem',
        }}>
          The Space
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: 'var(--cream)', lineHeight: 1.05, marginBottom: '1rem',
        }}>
          Where coffee <br />comes to life
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {galleryCards.map((card) => (
          <div
            key={card.id}
            data-tilt
            className="gallery-card"
            style={{
              aspectRatio: card.span === 'tall' ? '1/1.5' : card.span === 'wide' ? '1.5/1' : '1',
              gridRow: card.span === 'tall' ? 'span 2' : undefined,
              gridColumn: card.span === 'wide' ? 'span 2' : undefined,
              borderRadius: 8, overflow: 'hidden', position: 'relative',
              background: 'linear-gradient(135deg, var(--green-deep), var(--charcoal))',
              cursor: 'pointer', transformStyle: 'preserve-3d', perspective: 800,
            }}
          >
            <div className="gallery-placeholder" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.15 }}>
                <rect x="20" y="20" width="60" height="60" rx="4" stroke="#5B8C5A" strokeWidth="2" />
                <circle cx="50" cy="50" r="15" fill="#5B8C5A" opacity="0.3" />
              </svg>
            </div>
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '1.5rem', opacity: 0, transition: 'opacity 0.4s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
            >
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--white)' }}>{card.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

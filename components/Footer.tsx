'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VnLogo from './VnLogo';

const socials = [
  {
    label: 'Instagram',
    path: 'M2 2h20v20H2z M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z M17.5 6.5h.01',
  },
  { label: 'Twitter', path: 'M4 4 L20 20 M20 4 L4 20' },
  {
    label: 'Yelp',
    path: 'M12 2 L22 12 L12 22 L2 12 Z M8 12 L16 12 M12 8 L12 16',
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from(footerRef.current, {
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      });
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <footer ref={footerRef} style={{
      background: 'var(--near-black)', padding: '3rem clamp(2rem, 6vw, 6rem)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--cream)' }}>
          <VnLogo size={28} />
          V<span style={{ color: 'var(--green-leaf)' }}>N</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(245,240,232,0.4)', transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--green-leaf)';
                e.currentTarget.style.color = 'var(--green-leaf)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.color = '';
                e.currentTarget.style.transform = '';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>

        <div style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.25)' }}>
          &copy; 2026 Vanilla. Pure. Simple. Extraordinary.
        </div>
      </div>
    </footer>
  );
}

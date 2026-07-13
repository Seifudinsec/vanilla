'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VnLogo from './VnLogo';

const links = [
  { href: '#story', label: 'Our Story' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'The Space' },
  { href: '#contact', label: 'Visit' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      start: 'top -10%',
      onUpdate: (self) => {
        setScrolled(self.progress > 0);
      },
    });

    const sectionIds = ['story', 'menu', 'gallery', 'contact'];
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            document.querySelectorAll('.nav-link').forEach((a) => a.classList.remove('active'));
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) link.classList.add('active');
          }
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 clamp(1rem, 4vw, 3rem)',
          height: 'var(--nav-height)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth)',
          background: scrolled ? 'rgba(26,26,26,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(91,140,90,0.1)' : 'none',
        }}
      >
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--cream)' }}>
          <VnLogo size={32} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.05em' }}>
            V<span style={{ color: 'var(--green-leaf)' }}>N</span>
          </span>
        </a>

        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
          {links.map((link) => (
            <li key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
              <a
                href={link.href}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                style={{
                  color: 'rgba(245,240,232,0.6)', textDecoration: 'none',
                  fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em',
                  textTransform: 'uppercase', padding: '0.25rem 0',
                  position: 'relative', transition: 'color 0.3s',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              style={{
                background: 'var(--green-leaf)', color: 'var(--white)',
                padding: '0.5rem 1.25rem', borderRadius: 4,
                fontWeight: 600, fontSize: '0.85rem',
                textDecoration: 'none', transition: 'background 0.3s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green-mist)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--green-leaf)'; }}
            >
              Order Online
            </a>
          </li>
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--cream)', borderRadius: 1, transition: 'transform 0.3s' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--cream)', borderRadius: 1, transition: 'opacity 0.3s' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--cream)', borderRadius: 1, transition: 'transform 0.3s' }} />
        </button>
      </nav>

      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: 'rgba(26,26,26,0.98)', backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
          }}
        >
          {[...links, { href: '#contact', label: 'Order Online' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              style={{
                color: 'var(--cream)', textDecoration: 'none',
                fontFamily: 'var(--font-display)', fontSize: '2rem',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          nav ul { display: none !important; }
          nav button { display: flex !important; }
        }
      `}</style>
    </>
  );
}

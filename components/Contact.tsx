'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from('.contact-item', {
        opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }

    gsap.to('.map-pulse', {
      scale: 2, opacity: 0.1, duration: 2, repeat: -1, ease: 'power2.inOut', transformOrigin: 'center center',
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="contact" ref={sectionRef} style={{
      background: 'var(--green-deep)', padding: '6rem clamp(2rem, 6vw, 6rem)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div className="contact-item" style={{
            fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--green-mist)', fontWeight: 500, marginBottom: '1rem',
          }}>
            Visit Us
          </div>
          <h2 className="contact-item" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: 'var(--white)', lineHeight: 1.05, marginBottom: '1rem',
          }}>
            Find your <br />perfect cup
          </h2>
          <p className="contact-item" style={{
            fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)',
            maxWidth: 540, marginBottom: '2rem',
          }}>
            Whether you&apos;re a coffee connoisseur or just starting your journey, our door is always open.
          </p>
          <div className="contact-item" style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green-mist)', fontWeight: 500, marginBottom: '0.5rem' }}>Location</h4>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)' }}>74 Vanilla Avenue, Arts District<br />Portland, OR 97201</p>
          </div>
          <div className="contact-item" style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green-mist)', fontWeight: 500, marginBottom: '0.5rem' }}>Hours</h4>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)' }}>Mon — Fri: 6AM — 7PM<br />Sat — Sun: 7AM — 8PM</p>
          </div>
          <div className="contact-item">
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green-mist)', fontWeight: 500, marginBottom: '0.5rem' }}>Contact</h4>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)' }}>hello@vanilla.cafe<br />(503) 555-0142</p>
          </div>
        </div>

        <div style={{
          aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--charcoal), var(--near-black))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <svg viewBox="0 0 200 200" fill="none" style={{ width: '50%', height: '50%' }}>
            <circle cx="100" cy="100" r="60" fill="#5B8C5A" opacity="0.08" />
            <circle cx="100" cy="100" r="40" fill="#5B8C5A" opacity="0.12" />
            <circle cx="100" cy="100" r="20" fill="#5B8C5A" opacity="0.2" />
            <circle className="map-pulse" cx="100" cy="100" r="6" fill="#5B8C5A" />
          </svg>
        </div>
      </div>
    </section>
  );
}

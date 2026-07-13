'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuItems } from '@/data/menu';

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scroll = scrollRef.current;
    if (!scroll) return;
    const menuWidth = scroll.scrollWidth - window.innerWidth;

    gsap.to(scroll, {
      x: () => -menuWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${menuWidth + window.innerHeight}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.from('.menu-card', {
      opacity: 0, y: 60, scale: 0.9, stagger: 0.08,
      duration: 0.8, ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      style={{ background: 'var(--green-deep)', padding: '6rem 0', overflow: 'hidden' }}
    >
      <div style={{ padding: '0 clamp(2rem, 6vw, 6rem)', marginBottom: '3rem' }}>
        <div style={{
          fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--green-mist)', fontWeight: 500, marginBottom: '1rem',
        }}>
          The Menu
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: 'var(--white)', lineHeight: 1.05, marginBottom: '1rem',
        }}>
          Crafted for every <br />moment of your day
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 540 }}>
          From the morning espresso to the afternoon pour-over — each drink is made to order.
        </p>
      </div>

      <div
        ref={scrollRef}
        style={{
          display: 'flex', gap: '2rem', padding: '0 clamp(2rem, 6vw, 6rem)',
          willChange: 'transform', cursor: 'grab',
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="menu-card"
            style={{
              minWidth: 320, maxWidth: 320, flexShrink: 0,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, padding: '2rem',
              transition: 'transform 0.4s var(--ease-smooth), border-color 0.4s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(91,140,90,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = '';
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: '1.5rem', color: 'var(--green-mist)' }}>
              <path d={item.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{
              fontSize: '0.75rem', color: 'rgba(245,240,232,0.3)',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              {item.origin}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--white)' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {item.description}
            </p>
            <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--green-mist)' }}>
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

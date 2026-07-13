'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storyPanels } from '@/data/story';

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (progressRef.current) progressRef.current.style.width = '100%';
      return;
    }

    const track = trackRef.current;
    if (!track) return;
    const trackWidth = track.scrollWidth - window.innerWidth;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`;
        }
      },
    });

    gsap.to(track, {
      x: () => -trackWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="story" ref={sectionRef} style={{ position: 'relative', background: 'var(--near-black)', overflow: 'hidden' }}>
      <div style={{ height: '200vh' }} />
      <div
        ref={progressRef}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 5,
          background: 'var(--green-leaf)', width: '0%',
          transition: 'width 0.1s linear',
        }}
      />
      <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div ref={trackRef} style={{ display: 'flex', width: `${storyPanels.length * 100}%`, willChange: 'transform' }}>
          {storyPanels.map((panel) => (
            <div
              key={panel.id}
              style={{
                width: '100vw', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '2rem clamp(2rem, 6vw, 6rem)', gap: 'clamp(2rem, 4vw, 4rem)',
              }}
            >
              <div style={{ flex: 1, maxWidth: 480 }}>
                <div style={{
                  fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'var(--green-leaf)', fontWeight: 500, marginBottom: '1rem',
                }}>
                  {panel.number} — {panel.label}
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  color: 'var(--cream)', lineHeight: 1.05, marginBottom: '1rem',
                }}>
                  {panel.title}
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.65)', maxWidth: 540 }}>
                  {panel.description}
                </p>
              </div>
              <div style={{
                flex: 1, maxWidth: 520, aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden',
                position: 'relative', background: 'linear-gradient(135deg, var(--green-deep), var(--charcoal))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '6rem',
                  color: 'rgba(91,140,90,0.08)', position: 'absolute',
                  top: '-1rem', right: '1rem', lineHeight: 1,
                }}>
                  {panel.number}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

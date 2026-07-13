'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import VnLogo from './VnLogo';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.style.overflow = '';
      onComplete?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete?.();
      },
    });

    tl.to(logoRef.current, { rotation: 360, scale: 0.85, duration: 1.2, ease: 'power2.inOut' })
      .to(logoRef.current, { scale: 1.05, duration: 0.4, ease: 'back.out(2)' })
      .to(logoRef.current, { scale: 0, opacity: 0, duration: 0.5 }, '+=0.2');

    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.value));
        }
      },
    }, '-=0.5');

    tl.to(barRef.current, { width: '100%', duration: 1.8, ease: 'power2.inOut' }, '-=1.8');
    tl.to(loaderRef.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.3');

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'var(--near-black)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)',
      }}
    >
      <div ref={logoRef}>
        <VnLogo size={80} />
      </div>
      <div
        ref={counterRef}
        style={{
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          color: 'var(--green-leaf)',
          fontVariantNumeric: 'tabular-nums',
          marginTop: 16,
        }}
      >
        0
      </div>
      <div
        style={{
          width: 160, height: 2, background: 'var(--charcoal)',
          borderRadius: 2, marginTop: 16, overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{ height: '100%', width: '0%', background: 'var(--green-leaf)', borderRadius: 2 }}
        />
      </div>
    </div>
  );
}

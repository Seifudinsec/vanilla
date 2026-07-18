'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href')!.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (!section) return;
      e.preventDefault();
      const target = section.querySelector('.section-head, .gallery-title, h2') || section;
      const navH = document.querySelector('.nav')?.getBoundingClientRect().height || 70;
      const y = target.getBoundingClientRect().top + window.scrollY - (navH + 64);
      lenis.scrollTo(y, { offset: 0, duration: 1.15 });
      history.pushState(null, '', `#${id}`);
      setTimeout(() => ScrollTrigger.refresh(), 1300);
    };
    document.addEventListener('click', onClick);

    return () => { document.removeEventListener('click', onClick); cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);
  return children;
}

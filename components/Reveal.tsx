'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Reveal({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { gsap.registerPlugin(ScrollTrigger); const ctx = gsap.context(() => gsap.fromTo(ref.current, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }), ref); return () => ctx.revert(); }, []);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

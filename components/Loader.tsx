'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) { onDone(); return; } const tl = gsap.timeline({ onComplete: onDone }); tl.fromTo('.loader-cup', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6 }).to('.loader-steam', { autoAlpha: 1, y: -14, stagger: .08, duration: .6 }).to(ref.current, { autoAlpha: 0, duration: .45, delay: .45 }); return () => { tl.kill(); }; }, [onDone]);
  return <div ref={ref} className="loader" aria-hidden="true"><div className="loader-cup">☕</div><i className="loader-steam">~</i><i className="loader-steam">~</i><i className="loader-steam">~</i><p>vanilla</p></div>;
}

'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';

export default function TransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' });
  }, [pathname, ready]);

  return <div ref={ref} style={{ opacity: ready ? undefined : 1 }}>{children}</div>;
}
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function TransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    const loader = loaderRef.current;
    const content = contentRef.current;
    if (!loader || !content) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(loader, { display: 'none' });
    });
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline();
      tl.set(loader, { display: 'flex', autoAlpha: 0 })
        .set(content, { autoAlpha: 0 })
        .to(loader, { autoAlpha: 1, duration: 0.2 })
        .fromTo('.nav-loader-logo', { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
        .to(loader, { autoAlpha: 0, duration: 0.35 }, '+=0.2')
        .set(content, { autoAlpha: 1 })
        .set(loader, { display: 'none' });
    });

    return () => mm.revert();
  }, [pathname]);

  return (
    <>
      <div
        ref={loaderRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'none', alignItems: 'center', justifyContent: 'center',
          background: '#f5f1e9',
        }}
        aria-hidden="true"
      >
        <div className="nav-loader-logo">
          <Image src="/vn.png" alt="Vanilla Logo" width={160} height={92} />
        </div>
      </div>
      <div ref={contentRef}>{children}</div>
    </>
  );
}
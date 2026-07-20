'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return;
    }
    const tl = gsap.timeline({ onComplete: onDone });
    tl.fromTo(
      '.loader-image-wrapper',
      { autoAlpha: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out" }
    ).to(ref.current, { autoAlpha: 0, duration: 0.6, delay: 0.8 });
    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={ref}
      className="loader fixed inset-0 z-50 flex items-center justify-center bg-white"
      aria-hidden="true"
    >
      <div className="loader-image-wrapper animate-pulse">
        <Image src="/vn.png" alt="Vanilla Logo" width={200} height={115} />
      </div>
    </div>
  );
}

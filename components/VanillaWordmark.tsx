'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const letterData = [
  { char: 'V', path: 'M10 62 L24 8 L38 62' },
  { char: 'A', path: 'M12 62 L24 10 L36 62 M16 48 L32 48' },
  { char: 'N', path: 'M10 62 L10 10 L38 62 L38 10' },
  { char: 'I', path: 'M24 10 L24 62' },
  { char: 'L', path: 'M14 62 L14 10 L38 10 M14 62 L38 62' },
  { char: 'L', path: 'M14 62 L14 10 L38 10 M14 62 L38 62' },
  { char: 'A', path: 'M12 62 L24 10 L36 62 M16 48 L32 48' },
];

export default function VanillaWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vn-letter',
        { scaleY: 0, transformOrigin: 'bottom center', opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'back.out(2)',
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        gap: 'clamp(2px, 0.5vw, 6px)',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      {letterData.map((letter, i) => (
        <svg
          key={`${letter.char}-${i}`}
          className="vn-letter"
          width={i === 5 ? 44 : 46}
          height={72}
          viewBox="0 0 48 72"
          fill="none"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <path
            d={letter.path}
            stroke="#5B8C5A"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ))}
    </div>
  );
}

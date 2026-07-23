'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import ArrowIcon from './ArrowIcon';
import Link from 'next/link';
import gsap from 'gsap';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isGiftCard = pathname === '/gift-card';
  const isHome = pathname === '/';
  const prefix = isGiftCard || !isHome ? '/' : '';

  const links = [
    ['Story', '/story'],
    ['Menu', '/menu'],
    ['Gallery', '/gallery'],
    ['Contact', '/contact'],
    ['Gift Card', '/gift-card']
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 800px)', () => {
        if (!linksRef.current || !toggleRef.current) return;

        const links = linksRef.current.querySelectorAll('a');
        const panel = linksRef.current;
        const overlay = overlayRef.current;

        gsap.set(panel, { scaleX: 0, scaleY: 0, autoAlpha: 0 });
        if (overlay) gsap.set(overlay, { autoAlpha: 0 });
        gsap.set(links, { y: 20, autoAlpha: 0 });

        if (open) {
          gsap.to(overlay, { autoAlpha: 1, duration: 0.35, ease: 'power3.out', pointerEvents: 'auto' });
          gsap.to(panel, { scaleX: 1, scaleY: 1, autoAlpha: 1, duration: 0.5, ease: 'power4.out' });
          gsap.to(links, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06, delay: 0.15 });
        } else {
          gsap.to(links, { y: 12, autoAlpha: 0, duration: 0.2, ease: 'power2.in', stagger: 0.02 });
          gsap.to(panel, { scaleX: 0, scaleY: 0, autoAlpha: 0, duration: 0.35, ease: 'power3.in', delay: 0.15 });
          gsap.to(overlay, { autoAlpha: 0, duration: 0.25, delay: 0.1, pointerEvents: 'none' });
        }
      });

      mm.add('(min-width: 801px)', () => {
        if (linksRef.current) {
          gsap.set(linksRef.current, { clearProps: 'all' });
          gsap.set(linksRef.current.querySelectorAll('a'), { clearProps: 'all' });
        }
        if (overlayRef.current) gsap.set(overlayRef.current, { clearProps: 'all' });
      });
    }, navRef);

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open]);

  return (
    <>
      <header ref={navRef} className={scrolled ? 'nav scrolled' : 'nav'}>
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Vanilla Logo" className="logo-img nav-logo-img" />
        </Link>
        <button
          ref={toggleRef}
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
        >
          <div ref={hamburgerRef} className={open ? 'hamburger-lines open' : 'hamburger-lines'}>
            <span /><span /><span />
          </div>
        </button>
        <nav ref={linksRef} className="nav-links">
          {links.map(([label, href]) => {
            const isActive = href === '/gift-card' ? isGiftCard : false;
            return (
              <Link
                onClick={() => setOpen(false)}
                href={href}
                key={href}
                className={isActive ? 'active' : ''}
              >
                {label}
              </Link>
            );
          })}
          <Link onClick={() => setOpen(false)} className="reserve-link" href={`${prefix}#reserve`}>
            Reserve a table<ArrowIcon className="reserve-arrow" />
          </Link>
        </nav>
      </header>
      <div ref={overlayRef} className="nav-overlay" onClick={() => setOpen(false)} />
    </>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ArrowIcon from './ArrowIcon';
import Link from 'next/link';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isGiftCard = pathname === '/gift-card';
  const prefix = isGiftCard ? '/' : '';

  const links = [
    ['Story', `${prefix}#story`],
    ['Menu', `${prefix}#menu`],
    ['Gallery', `${prefix}#gallery`],
    ['Contact', `${prefix}#contact`],
    ['Gift Card', '/gift-card']
  ];

  return (
    <header className={scrolled ? 'nav scrolled' : 'nav'}>
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <img src="/logo.png" alt="Vanilla Logo" className="logo-img nav-logo-img" />
      </Link>
      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? '×' : '☰'}
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
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
  );
}

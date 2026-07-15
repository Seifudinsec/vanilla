import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Vanilla — Artisan Coffee House',
  description: 'A slow coffee house for people who taste in patience.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll>{children}</SmoothScroll></body></html>;
}

import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Vanilla — Artisan Coffee House',
  description: 'A slow coffee house for people who taste in patience.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/vn.png" type="image/svg+xml" />
          </head>
          <body>
            <SmoothScroll>{children}</SmoothScroll>
          </body>
        </html>
  );
}

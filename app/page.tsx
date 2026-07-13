'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Nav />
      <main>
        <Hero />
        <Story />
        <Menu />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

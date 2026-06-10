/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SmoothScroll from './components/SmoothScroll';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Footer from './components/Footer';
import GridBackground from './components/GridBackground';
import FloatingElements from './components/FloatingElements';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      <Cursor />
      <GridBackground />
      <FloatingElements />
      
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="relative w-full min-h-screen text-white select-none overflow-hidden">
        <Hero />
        <Marquee text="Digital Dominance" velocity={15} />
        <Services />
        <Marquee text="Scale Relentlessly" velocity={15} direction="right" />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

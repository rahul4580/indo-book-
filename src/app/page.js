'use client';
import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import WhatICanDo from '../components/WhatICanDo';
import DataAnalysisCapabilities from '../components/DataAnalysisCapabilities';
import WhatILove from '../components/WhatILove';
import Contact from './Contact';
import Footer from './component/footer'; // Keeping existing footer location as I didn't move it yet

export default function Home() {
  
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
        lenis.destroy();
    }
  }, []);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      <Navbar />
      <Hero />
      <Skills />
      <WhatICanDo />
      <DataAnalysisCapabilities />
      <WhatILove />
      
      <section id="contact" className="py-20 px-8 md:px-20 border-t border-neutral-900">
         <div className="flex justify-center">
            <Contact />
         </div>
      </section>

      <Footer />
    </div>
  );
}


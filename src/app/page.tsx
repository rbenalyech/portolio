'use client';

import { useState, useCallback } from 'react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import HowIThink from '@/components/HowIThink';
import Projects from '@/components/Projects';
import Lab from '@/components/Lab';
import Timeline from '@/components/Timeline';
import Opportunity from '@/components/Opportunity';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import NetworkCanvas from '@/components/NetworkCanvas';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <LanguageProvider>
      <CustomCursor />
      {!loaded && <Loader onComplete={handleLoadComplete} />}

      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <NetworkCanvas dense />
        </div>
        <Navigation />
        <main className="relative z-[1]">
          <Hero />
          <div className="glow-line mx-auto max-w-6xl" />
          <About />
          <div className="glow-line mx-auto max-w-6xl" />
          <Skills />
          <div className="glow-line mx-auto max-w-6xl" />
          <HowIThink />
          <div className="glow-line mx-auto max-w-6xl" />
          <Projects />
          <div className="glow-line mx-auto max-w-6xl" />
          <Lab />
          <div className="glow-line mx-auto max-w-6xl" />
          <Timeline />
          <div className="glow-line mx-auto max-w-6xl" />
          <Opportunity />
          <div className="glow-line mx-auto max-w-6xl" />
          <Contact />
        </main>
        <Footer className="relative z-[1]" />
        <Terminal />
      </div>
    </LanguageProvider>
  );
}

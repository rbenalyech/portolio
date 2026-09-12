'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/i18n/LanguageContext';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'));
const HowIThink = dynamic(() => import('@/components/HowIThink'));
const Projects = dynamic(() => import('@/components/Projects'));
const NetworkMap = dynamic(() => import('@/components/NetworkMap'));
const Timeline = dynamic(() => import('@/components/Timeline'));
const Opportunity = dynamic(() => import('@/components/Opportunity'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));
const Terminal = dynamic(() => import('@/components/Terminal'));
const NetworkCanvas = dynamic(() => import('@/components/NetworkCanvas'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  return (
    <LanguageProvider>
      <CustomCursor />
      {!loaded && <Loader onComplete={handleLoadComplete} />}

      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {!isMobile && (
          <div className="fixed inset-0 z-0 pointer-events-none">
            <NetworkCanvas dense />
          </div>
        )}
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
          <NetworkMap />
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

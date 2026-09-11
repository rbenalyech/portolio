'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/portfolio';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-deep" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="section-label mb-6"
        >
          {t.hero.portfolioYear}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="heading-xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
        >
          <span className="text-text-primary">{siteConfig.name.split(' ')[0]}</span>
          <br />
          <span className="text-primary">{siteConfig.name.split(' ')[1]}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="flex items-center justify-center gap-3 mb-6 flex-wrap"
        >
          {t.hero.tags.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              <span className="mono-label text-text-secondary">{item}</span>
              {i < 3 && <span className="w-1 h-1 rounded-full bg-primary opacity-60" />}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.7 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-4 font-[family-name:var(--font-body)]"
        >
          {t.hero.statement}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.9 }}
          className="text-sm text-text-muted max-w-xl mx-auto mb-10 font-[family-name:var(--font-body)]"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.1 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <button onClick={scrollToAbout} className="btn-primary interactive">
            {t.hero.explore}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block">
              <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-ghost interactive">
            {t.hero.viewProjects}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

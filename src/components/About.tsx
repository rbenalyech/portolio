'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const icons: Record<string, React.ReactNode> = {
  shield: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  server: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/>
    </svg>
  ),
  network: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/>
      <path d="M12 8v4M8.5 17l2-5M15.5 17l-2-5"/>
    </svg>
  ),
  consulting: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </svg>
  ),
};

const pillarKeys = ['cybersecurity', 'systems', 'networks', 'digital'] as const;
const pillarIcons = ['shield', 'server', 'network', 'consulting'];

export default function About() {
  const { t } = useLanguage();

  const languages = [
    { name: 'French', level: t.about.languageLevels.french },
    { name: 'Dutch', level: t.about.languageLevels.dutch },
    { name: 'English', level: t.about.languageLevels.english },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">01</span>
            <div className="glow-line flex-1 max-w-[60px]" />
            <span className="section-label">{t.about.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl text-text-primary mb-6 max-w-3xl">
            {t.about.headingTop}<br />
            <span className="text-primary">{t.about.headingHighlight}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-text-secondary text-lg max-w-2xl mb-4 leading-relaxed">
            {t.about.intro}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-text-muted max-w-2xl mb-16 leading-relaxed">
            {t.about.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillarKeys.map((key, i) => (
            <ScrollReveal key={key} delay={0.15 * i} direction="up">
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-lg p-6 h-full group"
              >
                <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                  {icons[pillarIcons[i]]}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text-primary mb-2">
                  {t.about.pillars[key].title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {t.about.pillars[key].description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-16 flex items-center gap-8 flex-wrap">
            <span className="mono-label text-text-muted">{t.about.languagesLabel}</span>
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <span className="text-text-primary text-sm font-medium">{lang.name}</span>
                <span className="text-text-muted text-xs">— {lang.level}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

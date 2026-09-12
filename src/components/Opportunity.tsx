'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function Opportunity() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="section-number">07</span>
            <div className="glow-line w-[60px]" />
            <span className="section-label">{t.opportunity.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl text-text-primary mb-6">
            {t.opportunity.headingTop}<br />
            <span className="text-primary">{t.opportunity.headingHighlight}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.opportunity.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {t.opportunity.interests.map((interest) => (
              <motion.span
                key={interest}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                <span className="text-sm text-text-primary">{interest}</span>
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary interactive text-base px-8 py-3"
          >
            {t.opportunity.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

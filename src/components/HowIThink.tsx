'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const stepIcons: React.ReactNode[] = [
  <svg key="s" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  <svg key="a" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M9 12l2 2 4-4"/></svg>,
  <svg key="b" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  <svg key="sh" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="i" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20V10M6 20V4M18 20v-4"/></svg>,
];

const stepNumbers = ['01', '02', '03', '04', '05'];

export default function HowIThink() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">03</span>
            <div className="glow-line flex-1 max-w-[60px]" />
            <span className="section-label">{t.methodology.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl text-text-primary mb-4">
            {t.methodology.heading}<span className="text-primary">{t.methodology.headingHighlight}</span>
          </h2>
          <p className="text-text-muted max-w-xl mb-16">
            {t.methodology.description}
          </p>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {t.methodology.steps.map((step, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.12}
                direction={i % 2 === 0 ? 'left' : 'right'}
              >
                <div className={`lg:flex items-center gap-8 ${i > 0 ? 'lg:mt-8' : ''}`}>
                  <div className={`lg:w-1/2 ${i % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card rounded-lg p-6 inline-block w-full"
                    >
                      <div className={`flex items-center gap-4 mb-3 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          {stepIcons[i]}
                        </div>
                        <div>
                          <span className="mono-label text-primary text-[0.65rem]">{stepNumbers[i]}</span>
                          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text-primary">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="hidden lg:flex items-center justify-center relative z-10">
                    <div className="glow-dot" />
                  </div>

                  <div className={`lg:w-1/2 ${i % 2 === 0 ? '' : 'lg:order-1'}`} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

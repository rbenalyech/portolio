'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const typeColors = {
  education: 'text-secondary border-secondary/30 bg-secondary/10',
  experience: 'text-primary border-primary/30 bg-primary/10',
  project: 'text-success border-success/30 bg-success/10',
  goal: 'text-warning border-warning/30 bg-warning/10',
};

const typeDotColors = {
  education: 'bg-secondary',
  experience: 'bg-primary',
  project: 'bg-success',
  goal: 'bg-warning',
};

export default function Timeline() {
  const { t } = useLanguage();

  return (
    <section id="journey" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">06</span>
            <div className="glow-line flex-1 max-w-[60px]" />
            <span className="section-label">{t.timeline.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl text-text-primary mb-4">
            {t.timeline.heading}<span className="text-primary">{t.timeline.headingHighlight}</span>
          </h2>
          <p className="text-text-muted max-w-xl mb-16">
            {t.timeline.description}
          </p>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {t.timeline.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`w-[10px] h-[10px] rounded-full ${typeDotColors[item.type]} ring-4 ring-bg-deep`}
                    />
                  </div>

                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <motion.div whileHover={{ y: -2 }} className={`glass-card rounded-lg p-5 ${item.type === 'goal' ? 'border-warning/30 shadow-[0_0_20px_rgba(234,179,8,0.08)]' : ''}`}>
                      <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <span className="font-[family-name:var(--font-mono)] text-xs font-medium text-primary">{item.year}</span>
                        <span className={`text-[0.6rem] px-2 py-0.5 rounded-sm border font-[family-name:var(--font-mono)] uppercase ${typeColors[item.type]}`}>
                          {t.timeline.types[item.type]}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-muted mb-1">{item.institution}</p>
                      <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

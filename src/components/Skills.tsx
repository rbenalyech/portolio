'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const categoryIcons: Record<string, React.ReactNode> = {
  shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  server: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/></svg>,
  vm: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  network: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4M8.5 17l2-5M15.5 17l-2-5"/></svg>,
  code: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>,
  consulting: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
};

const categoryKeys = ['cybersecurity', 'systems', 'virtualization', 'networking', 'development', 'consulting'] as const;
const categoryIconMap = ['shield', 'server', 'vm', 'network', 'code', 'consulting'];
const categoryColors = ['#00D1FF', '#0077FF', '#00D1FF', '#0077FF', '#00D1FF', '#0077FF'];

export default function Skills() {
  const { t } = useLanguage();
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const activeKey = categoryKeys[activeCategoryIdx];

  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">02</span>
            <div className="glow-line flex-1 max-w-[60px]" />
            <span className="section-label">{t.skills.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl text-text-primary mb-4">
            {t.skills.heading}<span className="text-primary">{t.skills.headingHighlight}</span>
          </h2>
          <p className="text-text-muted max-w-xl mb-12">
            {t.skills.description}
          </p>
        </ScrollReveal>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-surface/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
            <span className="mono-label text-text-muted text-[0.6rem]">{t.skills.sysLabel}</span>
            <span className="status-online text-[0.6rem]">Active</span>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border p-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
              {categoryKeys.map((key, idx) => (
                <button
                  key={key}
                  onClick={() => setActiveCategoryIdx(idx)}
                  className={`interactive flex items-center gap-3 px-3 py-2.5 rounded-md text-left whitespace-nowrap transition-all duration-300 ${
                    activeCategoryIdx === idx
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border border-transparent'
                  }`}
                >
                  <span className={activeCategoryIdx === idx ? 'text-primary' : 'text-text-muted'}>
                    {categoryIcons[categoryIconMap[idx]]}
                  </span>
                  <span className="text-sm font-medium">{t.skills.categories[key]}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeKey}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-primary">{categoryIcons[categoryIconMap[activeCategoryIdx]]}</span>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-text-primary">
                      {t.skills.categories[activeKey]}
                    </h3>
                    <div className="glow-line flex-1" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {t.skills.skills[activeKey].map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-md bg-bg-surface/50 border border-border/50 hover:border-primary/20 transition-colors group"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

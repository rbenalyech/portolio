'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { labData } from '@/data/portfolio';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const labIcons: Record<string, React.ReactNode> = {
  server: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/></svg>,
  vm: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  network: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4M8.5 17l2-5M15.5 17l-2-5"/></svg>,
  shield: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  code: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>,
};

const catKeys = ['systems', 'virtualization', 'networking', 'security', 'devtools'] as const;
const catIcons = ['server', 'vm', 'network', 'shield', 'code'];

export default function Lab() {
  const { t } = useLanguage();
  const statKeys = ['technologies', 'projects', 'domains', 'languages'] as const;

  return (
    <section id="lab" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg-dense opacity-20" />
      <div className="relative max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">05</span>
            <div className="glow-line flex-1 max-w-[60px]" />
            <span className="section-label">{t.lab.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl text-text-primary mb-4">
            {t.lab.heading}<span className="text-primary">{t.lab.headingHighlight}</span>
          </h2>
          <p className="text-text-muted max-w-xl mb-12">
            {t.lab.description}
          </p>
        </ScrollReveal>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-surface/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
            <span className="mono-label text-text-muted text-[0.6rem]">{t.lab.sysLabel}</span>
            <span className="status-online text-[0.6rem]">{t.lab.operational}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-border">
            {statKeys.map((key, i) => (
              <ScrollReveal key={key} delay={i * 0.08} direction="none">
                <div className={`p-4 text-center ${i < statKeys.length - 1 ? 'border-r border-border' : ''}`}>
                  <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary">{labData.stats[i].value}</div>
                  <div className="mono-label text-text-muted text-[0.6rem] mt-1">{t.lab.statLabels[key]}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {catKeys.map((key, i) => (
              <ScrollReveal key={key} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-lg bg-bg-surface/50 border border-border/50 hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
                      {labIcons[catIcons[i]]}
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text-primary">{t.lab.categories[key]}</h3>
                  </div>
                  <div className="space-y-1.5">
                    {labData.categories[i].items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                        <span className="text-xs text-text-muted">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-border bg-bg-surface/30 flex items-center justify-between">
            <span className="status-online text-[0.6rem]">{t.lab.operational}</span>
            <span className="mono-label text-text-muted text-[0.55rem]">{t.lab.lastUpdate}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

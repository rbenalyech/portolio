'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const icons: Record<string, React.ReactNode> = {
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  server: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/>
    </svg>
  ),
  network: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/>
      <path d="M12 8v4M8.5 17l2-5M15.5 17l-2-5"/>
    </svg>
  ),
  consulting: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </svg>
  ),
};

const pillarKeys = ['cybersecurity', 'systems', 'networks', 'digital'] as const;
const pillarIcons = ['shield', 'server', 'network', 'consulting'];
const pillarColors = ['#22C55E', '#00D1FF', '#A855F7', '#F97316'];

export default function About() {
  const { t } = useLanguage();
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
    };
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, []);

  const languages = [
    { name: 'French', level: t.about.languageLevels.french },
    { name: 'Dutch', level: t.about.languageLevels.dutch },
    { name: 'English', level: t.about.languageLevels.english },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
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

        {/* System Profile Card */}
        <ScrollReveal delay={0.2}>
          <div className="glass-card rounded-xl overflow-hidden mb-10">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-surface/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
              </div>
              <span className="mono-label text-text-muted text-[0.6rem]">USER_PROFILE.SYS</span>
              <span className="status-online text-[0.6rem]">ACTIVE</span>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Left: System info */}
                <div className="font-[family-name:var(--font-mono)] text-[0.75rem] sm:text-[0.8rem] space-y-3">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary text-lg font-bold font-[family-name:var(--font-heading)]">RB</span>
                    </div>
                    <div>
                      <div className="text-text-primary font-semibold text-base font-[family-name:var(--font-heading)]">Riyad Benalyech</div>
                      <div className="text-primary text-[0.65rem] tracking-wider">SYSTEM OPERATOR</div>
                    </div>
                  </div>

                  {[
                    { key: 'ROLE', value: 'IT / Systems / Networks' },
                    { key: 'STATUS', value: 'AVAILABLE', color: 'text-success' },
                    { key: 'LOCATION', value: 'Brussels, Belgium' },
                    { key: 'EDUCATION', value: 'Odisee — Applied CS' },
                    { key: 'UPTIME', value: uptime, color: 'text-primary' },
                  ].map(item => (
                    <div key={item.key} className="flex items-baseline gap-2">
                      <span className="text-text-muted w-24 shrink-0">{item.key}</span>
                      <span className={item.color ?? 'text-text-primary'}>{item.value}</span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-border/50 mt-4">
                    <span className="text-text-muted block mb-2">SPECIALIZATION</span>
                    <div className="space-y-1.5 pl-2">
                      {pillarKeys.map((key, i) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-primary">{i === pillarKeys.length - 1 ? '└─' : '├─'}</span>
                          <span className="text-primary">{icons[pillarIcons[i]]}</span>
                          <span className="text-text-primary text-[0.75rem]">{t.about.pillars[key].title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Description + Languages */}
                <div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {t.about.intro}
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {t.about.description}
                  </p>

                  <div className="border-t border-border/50 pt-4">
                    <span className="mono-label text-text-muted text-[0.6rem] block mb-3">LANGUAGES</span>
                    {languages.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between mb-2">
                        <span className="text-text-primary text-sm">{lang.name}</span>
                        <span className="mono-label text-text-muted text-[0.6rem]">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillarKeys.map((key, i) => (
            <ScrollReveal key={key} delay={0.15 * i} direction="up">
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl p-px h-full group cursor-default overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${pillarColors[i]}15, transparent 50%, ${pillarColors[i]}08)`,
                }}
              >
                {/* Animated border glow on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${pillarColors[i]}30, transparent 40%, transparent 60%, ${pillarColors[i]}20)`,
                  }}
                />
                <div className="relative h-full bg-bg-deep/90 backdrop-blur-sm rounded-xl p-6 flex flex-col">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px opacity-40 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${pillarColors[i]}, transparent)` }}
                  />

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${pillarColors[i]}10`,
                        border: `1px solid ${pillarColors[i]}25`,
                        color: pillarColors[i],
                      }}
                    >
                      {icons[pillarIcons[i]]}
                    </div>
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: pillarColors[i] }}
                    />
                  </div>

                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text-primary mb-2 group-hover:text-white transition-colors">
                    {t.about.pillars[key].title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
                    {t.about.pillars[key].description}
                  </p>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {t.about.pillars[key].skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[0.6rem] font-[family-name:var(--font-mono)] transition-all duration-300"
                        style={{
                          color: `${pillarColors[i]}cc`,
                          background: `${pillarColors[i]}08`,
                          border: `1px solid ${pillarColors[i]}18`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

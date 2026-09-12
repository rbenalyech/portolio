'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/portfolio';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

const cvPaths = {
  en: '/cv/CV_Riyad_Benalyech_EN.pdf',
  fr: '/cv/CV_Riyad_Benalyech_FR.pdf',
  nl: '/cv/CV_Riyad_Benalyech_NL.pdf',
};

export default function Contact() {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const contactLinks = [
    {
      label: t.contact.labels.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
    },
    {
      label: t.contact.labels.linkedin,
      value: 'Riyad Benalyech',
      href: siteConfig.linkedin,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
    {
      label: t.contact.labels.github,
      value: 'rbenalyech',
      href: siteConfig.github,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
    },
    {
      label: t.contact.labels.cv,
      value: t.contact.cvValue,
      href: cvPaths[language],
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>,
    },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">08</span>
            <div className="glow-line flex-1 max-w-[60px]" />
            <span className="section-label">{t.contact.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {t.contact.heading.map((line, i) => (
            <h2 key={i} className={`heading-lg text-3xl sm:text-4xl md:text-5xl ${
              i === t.contact.heading.length - 1 ? 'text-primary mb-10' : 'text-text-primary mb-2'
            }`}>
              {line}
            </h2>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-text-secondary max-w-lg mb-12 leading-relaxed">
            {t.contact.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {contactLinks.map((link, i) => (
            <ScrollReveal key={link.label} delay={i * 0.08}>
              <motion.a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -3 }}
                className="glass-card rounded-lg p-5 flex items-center gap-4 group interactive"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="mono-label text-text-muted text-[0.6rem] block mb-0.5">{link.label}</span>
                  <span className="text-sm text-text-primary group-hover:text-primary transition-colors truncate block">
                    {link.value}
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center">
            <button
              onClick={() => {
                const text = siteConfig.email;
                if (navigator.clipboard?.writeText) {
                  navigator.clipboard.writeText(text).catch(() => {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    ta.style.position = 'fixed';
                    ta.style.opacity = '0';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                  });
                } else {
                  const ta = document.createElement('textarea');
                  ta.value = text;
                  ta.style.position = 'fixed';
                  ta.style.opacity = '0';
                  document.body.appendChild(ta);
                  ta.select();
                  document.execCommand('copy');
                  document.body.removeChild(ta);
                }
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="btn-primary interactive text-base px-8 py-3 cursor-pointer"
            >
              {copied ? t.contact.ctaCopied : t.contact.cta}
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              )}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Language } from '@/i18n/translations';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'nl', label: 'NL', flag: '🇳🇱' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find(l => l.code === language)!;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="interactive flex items-center gap-2 px-3 py-1.5 rounded-md border border-border hover:border-primary/40 bg-bg-surface/60 backdrop-blur-sm transition-all group"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
        <span className="font-[family-name:var(--font-mono)] text-xs font-medium text-text-primary group-hover:text-primary transition-colors">
          {current.label}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className="text-text-muted"
        >
          <path d="M6 9l6 6 6-6"/>
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 min-w-[140px] rounded-lg border border-border bg-bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-border">
                <span className="font-[family-name:var(--font-mono)] text-[0.55rem] text-text-muted tracking-widest uppercase">
                  LANG_SELECT.SYS
                </span>
              </div>
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ x: 4 }}
                  onClick={() => { setLanguage(lang.code); setOpen(false); }}
                  className={`interactive w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all ${
                    language === lang.code
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-medium">{lang.label}</span>
                  {language === lang.code && (
                    <motion.div
                      layoutId="lang-active"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

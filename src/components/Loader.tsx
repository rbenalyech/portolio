'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface BootLine {
  label: string;
  status: 'pending' | 'ok' | 'loading';
}

const bootSequence: { label: string; delay: number }[] = [
  { label: 'BIOS CHECK', delay: 100 },
  { label: 'CPU', delay: 80 },
  { label: 'MEMORY', delay: 120 },
  { label: 'NETWORK INTERFACE', delay: 100 },
  { label: 'FIREWALL', delay: 90 },
  { label: 'DNS RESOLVER', delay: 70 },
  { label: 'SERVICES', delay: 110 },
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [phase, setPhase] = useState<'boot' | 'access' | 'exit'>('boot');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    let cancelled = false;
    let timeout = 300;
    const timers: ReturnType<typeof setTimeout>[] = [];

    setLines([]);
    setPhase('boot');

    bootSequence.forEach((item, i) => {
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setLines(prev => [...prev, { label: item.label, status: 'loading' }]);
      }, timeout));
      timeout += item.delay;

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setLines(prev => prev.map((l, idx) =>
          idx === i ? { ...l, status: 'ok' } : l
        ));
      }, timeout));
      timeout += 60;
    });

    timers.push(setTimeout(() => { if (!cancelled) setPhase('access'); }, timeout + 200));
    timers.push(setTimeout(() => { if (!cancelled) setPhase('exit'); }, timeout + 900));
    timers.push(setTimeout(() => { if (!cancelled) onComplete(); }, timeout + 1400));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="loader-container"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="w-full max-w-md px-6">
            {phase === 'boot' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-[family-name:var(--font-mono)] text-[0.75rem] leading-[1.8]"
              >
                <div className="text-primary mb-3 text-[0.65rem] tracking-[0.2em]">
                  RIYAD_OS v2.0.26 — SYSTEM INITIALIZATION
                </div>
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-text-muted">{line.label}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-text-muted">{'·'.repeat(Math.max(1, 30 - line.label.length))}</span>
                      {line.status === 'loading' ? (
                        <span className="text-warning animate-pulse">...</span>
                      ) : (
                        <span className="text-success">OK</span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {phase === 'access' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-primary mb-2 tracking-wide">
                  ACCESS GRANTED
                </div>
                <div className="mono-label text-text-muted text-[0.6rem]">
                  LOADING PORTFOLIO...
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

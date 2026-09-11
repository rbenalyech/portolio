'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'exit'>('loading');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setPhase('ready');
        setTimeout(() => setPhase('exit'), 500);
        setTimeout(onComplete, 1000);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="loader-container"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-text-primary mb-1">
              RB
            </div>
            <div className="mono-label text-text-muted mb-6">
              {phase === 'ready' ? 'SYSTEM READY' : 'INITIALIZING...'}
            </div>
            <div className="loader-bar">
              <motion.div
                className="loader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mono-label text-text-muted mt-3 text-[0.65rem]">
              {Math.floor(progress)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

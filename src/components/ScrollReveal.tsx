'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up', duration = 0.6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) setForceVisible(true);
    }, 2000 + delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, delay]);

  const visible = isInView || forceVisible;

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration, delay: isInView ? delay : 0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

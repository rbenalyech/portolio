'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .interactive, input, textarea, select')) {
        hoveringRef.current = true;
        if (ringRef.current) {
          ringRef.current.style.width = '52px';
          ringRef.current.style.height = '52px';
          ringRef.current.style.borderColor = 'var(--primary)';
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .interactive, input, textarea, select')) {
        hoveringRef.current = false;
        if (ringRef.current) {
          ringRef.current.style.width = '36px';
          ringRef.current.style.height = '36px';
          ringRef.current.style.borderColor = 'rgba(0, 209, 255, 0.4)';
        }
      }
    };

    const setInvisible = () => {
      visibleRef.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const setVisibleAgain = () => {
      visibleRef.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', setInvisible);
    document.documentElement.addEventListener('mouseenter', setVisibleAgain);

    let rafId: number;
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
      }
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        const size = hoveringRef.current ? 52 : 36;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', setInvisible);
      document.documentElement.removeEventListener('mouseenter', setVisibleAgain);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ opacity: 0, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ opacity: 0, willChange: 'transform, width, height' }}
      />
    </>
  );
}

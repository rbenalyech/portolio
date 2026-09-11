'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
}

export default function NetworkCanvas({ className = '', dense = false }: { className?: string; dense?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    const density = dense ? 3000 : 5000;
    const maxNodes = dense ? 350 : 180;
    const count = Math.min(Math.floor((rect.width * rect.height) / density), maxNodes);
    nodesRef.current = Array.from({ length: count }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        radius: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.3 + 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.003 + 0.001,
        driftRadius: Math.random() * 20 + 10,
      };
    });
  }, [dense]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    init();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio;
    const connectionDist = 140 * dpr;
    const connectionDistSq = connectionDist * connectionDist;
    const mouseDist = 200 * dpr;
    const mouseDistSq = mouseDist * mouseDist;
    const springStrength = 0.02;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const node of nodes) {
        // Gentle orbital drift around home position
        node.driftAngle += node.driftSpeed;
        const driftTargetX = node.homeX + Math.cos(node.driftAngle) * node.driftRadius * dpr;
        const driftTargetY = node.homeY + Math.sin(node.driftAngle) * node.driftRadius * dpr;

        // Spring force back toward drifting home point
        const dhx = driftTargetX - node.x;
        const dhy = driftTargetY - node.y;
        node.vx += dhx * springStrength;
        node.vy += dhy * springStrength;

        // Repulsion from cursor
        const dmx = node.x - mx;
        const dmy = node.y - my;
        const distMouseSq = dmx * dmx + dmy * dmy;
        if (distMouseSq < mouseDistSq && distMouseSq > 1) {
          const distMouse = Math.sqrt(distMouseSq);
          const force = (1 - distMouse / mouseDist) * 0.15;
          node.vx += (dmx / distMouse) * force * mouseDist * 0.01;
          node.vy += (dmy / distMouse) * force * mouseDist * 0.01;
        }

        // Damping
        node.vx *= 0.92;
        node.vy *= 0.92;

        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;
      }

      // Node-to-node connections
      ctx.lineWidth = 0.5 * dpr;
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.strokeStyle = `rgba(0, 209, 255, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulseOpacity = node.opacity + Math.sin(node.pulse) * 0.08;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 209, 255, ${pulseOpacity})`;
        ctx.fill();
      }

      // Subtle cursor void glow
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 40 * dpr, mx, my, mouseDist);
        gradient.addColorStop(0, 'rgba(0, 209, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 209, 255, 0.03)');
        gradient.addColorStop(1, 'rgba(0, 209, 255, 0)');
        ctx.beginPath();
        ctx.arc(mx, my, mouseDist, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => { init(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [init]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}

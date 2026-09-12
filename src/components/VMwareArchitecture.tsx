'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ArchitectureNode } from '@/data/portfolio';

const typeIcons: Record<string, React.ReactNode> = {
  host: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/></svg>,
  vm: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  service: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  network: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4M8.5 17l2-5M15.5 17l-2-5"/></svg>,
  storage: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  client: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
};

export default function VMwareArchitecture({ nodes }: { nodes: ArchitectureNode[] }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const active = nodes.find(n => n.id === activeNode);

  return (
    <div className="rounded-xl border border-border bg-bg-surface/30 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-surface/50">
        <span className="mono-label text-text-muted text-[0.6rem]">INFRASTRUCTURE_MAP.SYS</span>
        <span className="status-online text-[0.6rem]">Live View</span>
      </div>

      <div className="p-3 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-4">
          {nodes.map((node) => (
            <motion.button
              key={node.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              className={`arch-node text-left interactive ${activeNode === node.id ? 'active' : ''}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`shrink-0 ${activeNode === node.id ? 'text-primary' : 'text-text-muted'} transition-colors`}>
                  {typeIcons[node.type]}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-xs font-medium text-text-primary truncate">
                  {node.label}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                {node.ip && (
                  <span className="font-[family-name:var(--font-mono)] text-[0.6rem] text-text-muted truncate">{node.ip}</span>
                )}
                <span className={`flex items-center gap-1 font-[family-name:var(--font-mono)] text-[0.6rem] shrink-0 ml-auto ${
                  node.status === 'ONLINE' || node.status === 'ACTIVE' ? 'text-success' : 'text-warning'
                }`}>
                  <span className={`w-1 h-1 rounded-full ${
                    node.status === 'ONLINE' || node.status === 'ACTIVE' ? 'bg-success' : 'bg-warning'
                  }`} />
                  {node.status}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">{typeIcons[active.type]}</span>
                  <div>
                    <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text-primary">{active.label}</h4>
                    {active.ip && <p className="font-[family-name:var(--font-mono)] text-xs text-primary mt-0.5">{active.ip}</p>}
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">{active.details}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

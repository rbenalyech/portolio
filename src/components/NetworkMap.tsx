'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

interface MapNode {
  id: string;
  x: number;
  y: number;
  icon: string;
}

interface Connection {
  from: string;
  to: string;
  protocol: string;
}

const nodes: MapNode[] = [
  { id: 'internet', x: 50, y: 5, icon: 'globe' },
  { id: 'firewall', x: 50, y: 22, icon: 'shield' },
  { id: 'webserver', x: 25, y: 42, icon: 'server' },
  { id: 'vpn', x: 75, y: 42, icon: 'lock' },
  { id: 'database', x: 25, y: 64, icon: 'database' },
  { id: 'client', x: 75, y: 64, icon: 'monitor' },
  { id: 'dns', x: 50, y: 82, icon: 'dns' },
];

const connections: Connection[] = [
  { from: 'internet', to: 'firewall', protocol: 'HTTPS' },
  { from: 'firewall', to: 'webserver', protocol: 'TCP' },
  { from: 'firewall', to: 'vpn', protocol: 'UDP' },
  { from: 'webserver', to: 'database', protocol: 'SQL' },
  { from: 'vpn', to: 'client', protocol: 'SSH' },
  { from: 'firewall', to: 'dns', protocol: 'DNS' },
];

const protocolColors: Record<string, string> = {
  HTTPS: '#22C55E',
  TCP: '#00D1FF',
  UDP: '#A855F7',
  SQL: '#EAB308',
  SSH: '#F97316',
  DNS: '#0077FF',
};

const nodeIcons: Record<string, React.ReactNode> = {
  globe: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  server: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/></svg>,
  lock: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  database: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>,
  monitor: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  dns: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
};

interface Packet {
  id: number;
  connection: number;
  progress: number;
  color: string;
  protocol: string;
}

export default function NetworkMap() {
  const { t } = useLanguage();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filterProtocol, setFilterProtocol] = useState<string | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const packetId = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const nodeDetails = t.networkMap?.nodes ?? {
    internet: { label: 'INTERNET', description: 'External network traffic', details: ['Inbound: 1.2 Gbps', 'Outbound: 800 Mbps', 'Latency: 12ms'] },
    firewall: { label: 'FIREWALL', description: 'pfSense — Network Security', details: ['Rules: 47 active', 'NAT: configured', 'VPN: 2 tunnels', 'IDS/IPS: Snort'] },
    webserver: { label: 'WEB SERVER', description: 'Nginx — Reverse Proxy', details: ['Active conns: 234', 'SSL: Let\'s Encrypt', 'Load: 23%'] },
    vpn: { label: 'VPN GATEWAY', description: 'OpenVPN / WireGuard', details: ['Clients: 3 connected', 'Encryption: AES-256', 'Protocol: UDP/1194'] },
    database: { label: 'DATABASE', description: 'PostgreSQL — Data Store', details: ['Size: 2.4 GB', 'Queries/s: 145', 'Uptime: 99.97%'] },
    client: { label: 'CLIENT', description: 'Windows 11 Workstation', details: ['Status: Connected', 'IP: 10.0.1.50', 'Latency: 3ms'] },
    dns: { label: 'DNS RESOLVER', description: 'BIND9 — Name Resolution', details: ['Zones: 12', 'Cache hit: 94%', 'Queries/s: 890'] },
  };

  const getNodePos = useCallback((id: string): { x: number; y: number } => {
    const node = nodes.find(n => n.id === id);
    if (!node) return { x: 0, y: 0 };
    return { x: (node.x / 100) * 600, y: (node.y / 100) * 500 };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const connIdx = Math.floor(Math.random() * connections.length);
      const conn = connections[connIdx];
      setPackets(prev => {
        const filtered = prev.filter(p => p.progress < 1);
        if (filtered.length > 12) return filtered;
        return [...filtered, {
          id: packetId.current++,
          connection: connIdx,
          progress: 0,
          color: protocolColors[conn.protocol],
          protocol: conn.protocol,
        }];
      });
    }, 600);

    const anim = setInterval(() => {
      setPackets(prev => prev
        .map(p => ({ ...p, progress: p.progress + 0.02 }))
        .filter(p => p.progress < 1)
      );
    }, 30);

    return () => { clearInterval(interval); clearInterval(anim); };
  }, []);

  const visibleConnections = filterProtocol
    ? connections.filter(c => c.protocol === filterProtocol)
    : connections;

  const visiblePackets = filterProtocol
    ? packets.filter(p => p.protocol === filterProtocol)
    : packets;

  const protocols = [...new Set(connections.map(c => c.protocol))];

  return (
    <section id="lab" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
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
          <p className="text-text-muted max-w-xl mb-8">
            {t.lab.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Protocol Filter */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-6 flex-wrap">
            <span className="mono-label text-text-muted text-[0.55rem] sm:text-[0.6rem] mr-1 sm:mr-2">FILTER:</span>
            <button
              onClick={() => setFilterProtocol(null)}
              className={`px-3 py-1 rounded text-[0.7rem] font-[family-name:var(--font-mono)] transition-all ${
                !filterProtocol ? 'bg-primary/20 text-primary border border-primary/30' : 'text-text-muted border border-border hover:border-border-light'
              }`}
            >
              ALL
            </button>
            {protocols.map(p => (
              <button
                key={p}
                onClick={() => setFilterProtocol(filterProtocol === p ? null : p)}
                className={`px-3 py-1 rounded text-[0.7rem] font-[family-name:var(--font-mono)] transition-all flex items-center gap-1.5 ${
                  filterProtocol === p ? 'border bg-opacity-20' : 'text-text-muted border border-border hover:border-border-light'
                }`}
                style={filterProtocol === p ? {
                  color: protocolColors[p],
                  borderColor: protocolColors[p] + '50',
                  background: protocolColors[p] + '15',
                } : {}}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: protocolColors[p] }} />
                {p}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-surface/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
              </div>
              <span className="mono-label text-text-muted text-[0.6rem]">NETWORK_MAP.SYS</span>
              <span className="status-online text-[0.6rem]">LIVE</span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* SVG Map */}
              <div className="flex-1 p-2 sm:p-4 min-h-[320px] sm:min-h-[400px] relative">
                <svg
                  ref={svgRef}
                  viewBox="0 0 600 500"
                  className="w-full h-full touch-manipulation"
                  style={{ minHeight: 300 }}
                >
                  {/* Connection lines */}
                  {connections.map((conn, i) => {
                    const from = getNodePos(conn.from);
                    const to = getNodePos(conn.to);
                    const isVisible = !filterProtocol || conn.protocol === filterProtocol;
                    return (
                      <line
                        key={i}
                        x1={from.x} y1={from.y}
                        x2={to.x} y2={to.y}
                        stroke={isVisible ? protocolColors[conn.protocol] : '#1E293B'}
                        strokeWidth={isVisible ? 1.5 : 0.5}
                        strokeDasharray={isVisible ? 'none' : '4,4'}
                        opacity={isVisible ? 0.4 : 0.15}
                        style={{ transition: 'all 0.3s ease' }}
                      />
                    );
                  })}

                  {/* Animated packets */}
                  {visiblePackets.map(packet => {
                    const conn = connections[packet.connection];
                    if (!conn) return null;
                    const from = getNodePos(conn.from);
                    const to = getNodePos(conn.to);
                    const x = from.x + (to.x - from.x) * packet.progress;
                    const y = from.y + (to.y - from.y) * packet.progress;
                    return (
                      <g key={packet.id}>
                        <circle
                          cx={x} cy={y} r={4}
                          fill={packet.color}
                          opacity={1 - packet.progress * 0.5}
                        />
                        <circle
                          cx={x} cy={y} r={8}
                          fill={packet.color}
                          opacity={(1 - packet.progress) * 0.2}
                        />
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {nodes.map(node => {
                    const pos = getNodePos(node.id);
                    const isActive = activeNode === node.id;
                    const isHovered = hoveredNode === node.id;
                    return (
                      <g
                        key={node.id}
                        onClick={(e) => { e.stopPropagation(); setActiveNode(isActive ? null : node.id); }}
                        onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); setActiveNode(isActive ? null : node.id); }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-pointer"
                        style={{ pointerEvents: 'all' }}
                      >
                        {/* Invisible hit area */}
                        <circle
                          cx={pos.x} cy={pos.y} r={36}
                          fill="transparent"
                          stroke="none"
                        />
                        {/* Glow ring */}
                        {(isActive || isHovered) && (
                          <circle
                            cx={pos.x} cy={pos.y} r={32}
                            fill="none"
                            stroke="#00D1FF"
                            strokeWidth={1}
                            opacity={isActive ? 0.6 : 0.3}
                            style={{ pointerEvents: 'none' }}
                          >
                            <animate attributeName="r" values="28;34;28" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values={isActive ? '0.6;0.3;0.6' : '0.3;0.15;0.3'} dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                        {/* Node bg */}
                        <circle
                          cx={pos.x} cy={pos.y} r={24}
                          fill={isActive ? 'rgba(0, 209, 255, 0.15)' : 'rgba(13, 21, 32, 0.9)'}
                          stroke={isActive ? '#00D1FF' : isHovered ? '#00D1FF' : '#1E293B'}
                          strokeWidth={isActive ? 2 : 1}
                          style={{ transition: 'all 0.3s ease' }}
                        />
                        {/* Icon */}
                        <g
                          transform={`translate(${pos.x - 12}, ${pos.y - 12})`}
                          fill="none"
                          stroke={isActive || isHovered ? '#00D1FF' : '#94A3B8'}
                          style={{ transition: 'stroke 0.3s ease', pointerEvents: 'none' }}
                        >
                          {nodeIcons[node.icon]}
                        </g>
                        {/* Label */}
                        <text
                          x={pos.x} y={pos.y + 40}
                          textAnchor="middle"
                          fill={isActive || isHovered ? '#00D1FF' : '#64748B'}
                          fontSize="10"
                          fontFamily="var(--font-mono)"
                          letterSpacing="0.1em"
                          style={{ transition: 'fill 0.3s ease', pointerEvents: 'none' }}
                        >
                          {nodeDetails[node.id]?.label ?? node.id.toUpperCase()}
                        </text>
                        {/* Status dot */}
                        <circle
                          cx={pos.x + 18} cy={pos.y - 18} r={4}
                          fill="#22C55E"
                        >
                          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                        </circle>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Detail Panel */}
              <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-border p-4 bg-bg-surface/30 min-h-[180px] sm:min-h-[200px]">
                <AnimatePresence mode="wait">
                  {activeNode ? (
                    <motion.div
                      key={activeNode}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="mono-label text-primary text-[0.7rem]">
                          {nodeDetails[activeNode]?.label}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-4">
                        {nodeDetails[activeNode]?.description}
                      </p>
                      <div className="space-y-2">
                        {nodeDetails[activeNode]?.details.map((detail: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-[0.75rem]">
                            <span className="w-1 h-1 rounded-full bg-primary/50" />
                            <span className="text-text-muted font-[family-name:var(--font-mono)]">{detail}</span>
                          </div>
                        ))}
                      </div>
                      {/* Connection info */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <span className="mono-label text-text-muted text-[0.6rem] mb-2 block">CONNECTIONS</span>
                        {connections
                          .filter(c => c.from === activeNode || c.to === activeNode)
                          .map((conn, i) => (
                            <div key={i} className="flex items-center gap-2 text-[0.7rem] mt-1.5">
                              <span className="w-2 h-2 rounded-full" style={{ background: protocolColors[conn.protocol] }} />
                              <span className="text-text-muted font-[family-name:var(--font-mono)]">
                                {conn.from === activeNode ? nodeDetails[conn.to]?.label : nodeDetails[conn.from]?.label}
                              </span>
                              <span className="text-text-muted">—</span>
                              <span className="font-[family-name:var(--font-mono)]" style={{ color: protocolColors[conn.protocol] }}>
                                {conn.protocol}
                              </span>
                            </div>
                          ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full min-h-[200px] text-center"
                    >
                      <div className="text-text-muted mb-2">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4">
                          <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
                        </svg>
                      </div>
                      <span className="mono-label text-text-muted text-[0.6rem]">
                        SELECT A NODE
                      </span>
                      <span className="text-text-muted text-[0.7rem] mt-1">
                        Click any device to inspect
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="px-4 py-3 border-t border-border bg-bg-surface/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <span className="status-online text-[0.6rem]">{t.lab.operational}</span>
              <div className="flex items-center gap-3">
                {visiblePackets.length > 0 && (
                  <span className="mono-label text-text-muted text-[0.55rem]">
                    {visiblePackets.length} PACKETS IN TRANSIT
                  </span>
                )}
                <span className="mono-label text-text-muted text-[0.55rem]">{t.lab.lastUpdate}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

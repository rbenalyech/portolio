'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'prompt' | 'output' | 'error';
  text: string;
}

const commands: Record<string, string[]> = {
  help: ['Available commands:', '  whoami    - About me', '  skills    - Technical skills', '  projects  - My projects', '  contact   - Get in touch', '  clear     - Clear terminal', '  exit      - Close terminal'],
  whoami: ['Riyad Benalyech', 'Applied Computer Science Student', 'Cybersecurity · Systems · Networks · Digital', 'Location: Brussels, Belgium', 'Status: Looking for internship (Feb-May 2027)'],
  skills: ['[CYBERSECURITY] Access Security, AD Hardening, Risk Analysis', '[SYSTEMS] Windows Server, Active Directory, DNS, Linux', '[VIRTUALIZATION] VMware ESXi, vCenter, vMotion, iSCSI', '[NETWORKING] Network Infrastructure, Docker Networks', '[DEVELOPMENT] JS/TS (basics), React, Node.js, SQL', '[CONSULTING] Business Analysis, SWOT, Technical Communication'],
  projects: ['01 — VMware vSphere Infrastructure [FEATURED]', '     Enterprise virtualization with live vMotion migration', '02 — MirrorHire', '     AI-powered job interview simulator', '03 — PingFin Bankius [TEAM PROJECT]', '     Interbank payment processing platform'],
  contact: ['Email:    rbenalyech@gmail.com', 'LinkedIn: linkedin.com/in/riyad-benalyech-155ba5369', 'GitHub:   github.com/rbenalyech'],
};

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: 'Welcome to RB Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'prompt', text: `riyad@portfolio:~$ ${cmd}` },
    ];

    if (trimmed === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    if (trimmed === 'exit') {
      setIsOpen(false);
      setInput('');
      return;
    }

    if (commands[trimmed]) {
      commands[trimmed].forEach(line => {
        newLines.push({ type: 'output', text: line });
      });
    } else if (trimmed) {
      newLines.push({ type: 'error', text: `Command not found: ${trimmed}. Type "help" for available commands.` });
    }

    setLines(newLines);
    setInput('');
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 interactive w-12 h-12 rounded-xl bg-bg-card border border-border hover:border-primary/30 flex items-center justify-center text-text-muted hover:text-primary transition-all shadow-lg"
        aria-label="Open terminal"
        title="Ctrl+` to toggle"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="4,17 10,11 4,5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[min(440px,calc(100vw-48px))]"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-danger/70" />
                <div className="terminal-dot bg-warning/70" />
                <div className="terminal-dot bg-success/70" />
                <span className="flex-1 text-center text-[0.65rem] text-text-muted">riyad@portfolio</span>
                <button onClick={() => setIsOpen(false)} className="interactive text-text-muted hover:text-text-primary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div ref={bodyRef} className="terminal-body">
                {lines.map((line, i) => (
                  <div key={i} className={
                    line.type === 'prompt' ? 'terminal-prompt' :
                    line.type === 'error' ? 'text-danger/80' :
                    'terminal-output'
                  }>
                    {line.text}
                  </div>
                ))}
                <div className="flex items-center gap-1">
                  <span className="terminal-prompt">riyad@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleCommand(input); }}
                    className="flex-1 bg-transparent border-none outline-none text-text-primary font-[family-name:var(--font-mono)] text-[0.8rem] caret-primary"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

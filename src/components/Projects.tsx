'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/portfolio';
import type { Project } from '@/data/portfolio';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';
import VMwareArchitecture from './VMwareArchitecture';

const projectIds = ['vmware', 'mirrorhire', 'pingfin'] as const;

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLanguage();
  const projectT = t.projects.items[project.id as keyof typeof t.projects.items];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg-deep/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-4xl mx-4 my-20 glass-card rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-surface/50">
          <div className="flex items-center gap-3">
            {project.featured && <span className="featured-badge">{t.projects.featured}</span>}
            {project.teamProject && <span className="team-badge">{t.projects.team}</span>}
            {!project.teamProject && project.featured && (
              <span className="tech-tag text-[0.65rem]">{t.projects.soloProject}</span>
            )}
            <span className="mono-label text-text-muted">{projectT.category}</span>
          </div>
          <button onClick={onClose} className="interactive text-text-muted hover:text-text-primary p-1 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div>
            <span className="section-number">{project.number}</span>
            <h3 className="heading-lg text-2xl md:text-3xl text-text-primary mt-2">{projectT.title}</h3>
            <p className="text-text-secondary mt-1">{projectT.subtitle}</p>
          </div>

          {project.id === 'vmware' && project.architecture && (
            <VMwareArchitecture nodes={project.architecture} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseStudyBlock title={t.projects.theChallenge} content={projectT.challenge} />
            <CaseStudyBlock title={t.projects.theApproach} content={projectT.approach} />
          </div>

          <CaseStudyBlock title={t.projects.myRole} content={projectT.role} />

          {project.id === 'pingfin' && 'teamDisclaimer' in projectT && (
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/15">
              <p className="text-sm text-text-secondary leading-relaxed">
                {(projectT as typeof t.projects.items.pingfin).teamDisclaimer}
              </p>
            </div>
          )}

          <div>
            <h4 className="mono-label text-primary mb-3">{t.projects.technologies}</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseStudyBlock title={t.projects.results} content={projectT.results} />
            <CaseStudyBlock title={t.projects.whatILearned} content={projectT.lessons} />
          </div>

          {project.githubUrl && (
            <div className="pt-4 border-t border-border">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost interactive">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                {t.projects.viewGithub}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CaseStudyBlock({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="mono-label text-primary mb-2">{title}</h4>
      <p className="text-sm text-text-secondary leading-relaxed">{content}</p>
    </div>
  );
}

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  const { t } = useLanguage();
  const projectT = t.projects.items[project.id as keyof typeof t.projects.items];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-xl overflow-hidden cursor-pointer group w-full"
      onClick={onClick}
    >
      <div className={`p-6 md:p-8 ${project.featured ? 'md:flex md:gap-8 md:items-start' : ''}`}>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-3xl md:text-4xl font-bold text-border group-hover:text-primary/30 transition-colors duration-500">
              {project.number}
            </span>
            <div className="flex gap-2">
              {project.featured && <span className="featured-badge">{t.projects.featured}</span>}
              {project.teamProject && <span className="team-badge">{t.projects.team}</span>}
              {!project.teamProject && project.featured && (
                <span className="tech-tag text-[0.6rem]">{t.projects.soloProject}</span>
              )}
            </div>
          </div>
          <span className="mono-label text-text-muted text-[0.6rem] mb-2 block">{projectT.category}</span>
          <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
            {projectT.title}
          </h3>
          <p className="text-sm text-text-secondary mb-4 max-w-xl">{projectT.subtitle}</p>
          <p className="text-sm text-text-muted leading-relaxed max-w-2xl mb-6">
            {projectT.description}
          </p>
        </div>

        {project.featured && project.architecture && (
          <div className="hidden md:block md:w-[340px] lg:w-[400px] shrink-0">
            <div className="grid grid-cols-2 gap-2">
              {project.architecture.slice(0, 4).map((node) => (
                <div key={node.id} className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg-surface/50 border border-border/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="font-[family-name:var(--font-mono)] text-[0.6rem] text-text-muted">{node.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-right">
              <span className="status-online text-[0.55rem]">{t.projects.allOnline}</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 md:px-8 pb-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="tech-tag text-[0.6rem]">{tech}</span>
          ))}
          {project.technologies.length > 5 && (
            <span className="tech-tag text-[0.6rem] opacity-60">+{project.technologies.length - 5}</span>
          )}
        </div>
        <span className="mono-label text-text-muted group-hover:text-primary transition-colors flex items-center gap-1">
          {t.projects.explore}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">04</span>
            <div className="glow-line flex-1 max-w-[60px]" />
            <span className="section-label">{t.projects.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl text-text-primary mb-4">
            {t.projects.heading}<span className="text-primary">{t.projects.headingHighlight}</span>
          </h2>
          <p className="text-text-muted max-w-xl mb-12">
            {t.projects.description}
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.12}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

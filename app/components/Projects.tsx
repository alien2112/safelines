"use client";
import { useMemo, useState } from 'react';
import Blob from './Blob';
import { useLanguage } from '../contexts/LanguageContext';

const PROJECT_IMAGES = {
  project1: 'https://images.unsplash.com/photo-1581091870633-1a27a9d1c3d6?q=80&w=1920&auto=format&fit=crop',
  project2: 'https://images.unsplash.com/photo-1581093588401-16d8f3b0a932?q=80&w=1920&auto=format&fit=crop',
  project3: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1920&auto=format&fit=crop',
};

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  
  // Use translations for projects - for now using placeholder projects
  const projects = [
    { id: 'project1', name: 'Project 1', year: '2025', imageKey: 'project1' as keyof typeof PROJECT_IMAGES },
    { id: 'project2', name: 'Project 2', year: '2024', imageKey: 'project2' as keyof typeof PROJECT_IMAGES },
    { id: 'project3', name: 'Project 3', year: '2023', imageKey: 'project3' as keyof typeof PROJECT_IMAGES },
  ];
  
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = useMemo(() => projects.find(p => p.id === activeId)!, [activeId]);

  return (
    <section id="projects" className="section-projects">
      <Blob width={1000} height={460} top={80} left={65} translateXPercent={60} intensity={0.6} blur={70} zIndex={0} />
      <div className="container projects-grid">
        <div className="projects-left">
          <div className="hero-tag" aria-label="tag" style={{ marginBottom: 16 }} dir={isRTL ? 'rtl' : 'ltr'}>
            <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
            {t.home.projects.tag}
          </div>
          <h2 className="projects-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.projects.title}</h2>
          <p className="projects-subtext" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.projects.subtitle}</p>

          <div className="project-list" role="tablist" aria-label="Project list">
            {projects.map(p => (
              <button
                key={p.id}
                role="tab"
                aria-selected={activeId === p.id}
                aria-controls={`panel-${p.id}`}
                className={"project-item" + (activeId === p.id ? " active" : "")}
                onClick={() => setActiveId(p.id)}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <span>{p.name}</span>
                <span className="project-year">{p.year}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="projects-right">
          <article id={`panel-${active.id}`} role="tabpanel" className="project-feature">
            <div className="feature-image">
              <img src={PROJECT_IMAGES[active.imageKey]} alt={active.name} />
            </div>
            <div className="feature-caption" dir={isRTL ? 'rtl' : 'ltr'}>
              <h3 className="feature-title">{active.name}</h3>
              <p className="feature-desc">{t.home.projects.subtitle}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}



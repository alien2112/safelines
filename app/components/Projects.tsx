"use client";
import { useMemo, useState } from 'react';
import Blob from './Blob';

type Project = {
  id: string;
  name: string;
  year: string;
  title: string;
  description: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    year: '2025',
    title: 'E-commerce Product Tagging',
    description:
      'Created an AI tool that auto-tagged 10K+ SKUs with 92% accuracy, cutting tagging time by 80% and boosting product by 30%.',
    image:
      'https://images.unsplash.com/photo-1581091870633-1a27a9d1c3d6?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 'medassist',
    name: 'MedAssist AI',
    year: '2024',
    title: 'Healthcare Intake Automation',
    description:
      'Built an intake automation system that cut admin time by 55% and improved patient onboarding efficiency by 38% across all clinics.',
    image:
      'https://images.unsplash.com/photo-1581093588401-16d8f3b0a932?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 'autotag',
    name: 'AutoTag Pro',
    year: '2023',
    title: 'Visual Search Accelerator',
    description:
      'Deployed visual search that improved product discovery and reduced time-to-checkout on mobile by 22%.',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1920&auto=format&fit=crop',
  },
];

export function ProjectsSection() {
  const [activeId, setActiveId] = useState<Project['id']>('elevenlabs');
  const active = useMemo(() => PROJECTS.find(p => p.id === activeId)!, [activeId]);

  return (
    <section id="projects" className="section-projects">
      <Blob width={1000} height={460} top={80} left={65} translateXPercent={60} intensity={0.6} blur={70} zIndex={0} />
      <div className="container projects-grid">
        <div className="projects-left">
          <div className="hero-tag" aria-label="tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
            PROJECTS
          </div>
          <h2 className="projects-title">Our Latest Projects</h2>
          <p className="projects-subtext">See how we turn bold ideas into automated AI solutions carefully crafted to optimize, scale, and deliver measurable results.</p>

          <div className="project-list" role="tablist" aria-label="Project list">
            {PROJECTS.map(p => (
              <button
                key={p.id}
                role="tab"
                aria-selected={activeId === p.id}
                aria-controls={`panel-${p.id}`}
                className={"project-item" + (activeId === p.id ? " active" : "")}
                onClick={() => setActiveId(p.id)}
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
              <img src={active.image} alt={active.title} />
            </div>
            <div className="feature-caption">
              <h3 className="feature-title">{active.title}</h3>
              <p className="feature-desc">{active.description}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}



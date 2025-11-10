"use client";
import Blob from './Blob';
import { useLanguage } from '../contexts/LanguageContext';
import React from 'react';

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [flipped, setFlipped] = React.useState<Record<string, boolean>>({});
  
  // Create projects from the two main services
  const projects = [
    { 
      id: 'customs', 
      name: t.home.services.customs.title, 
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop',
      services: t.home.services.customs.services
    },
    { 
      id: 'transportation', 
      name: t.home.services.transportation.title, 
      imageUrl: '/AdobeStock_244807532-2048x1024.webp',
      services: t.home.services.transportation.services
    },
  ];

  return (
    <section id="projects" className="section-projects">
      <Blob width={1000} height={460} top={80} left={65} translateXPercent={60} intensity={0.3} blur={70} zIndex={0} />
      <div className="container">
        <div className="projects-header">
          <div className="hero-tag" aria-label="tag" style={{ marginBottom: 16 }} dir={isRTL ? 'rtl' : 'ltr'}>
            <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
            {t.home.projects.tag}
          </div>
          <h2 className="projects-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.projects.title}</h2>
          <p className="projects-subtext" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.projects.subtitle}</p>
        </div>

        <div className="projects-flip-grid">
          {projects.map(project => (
            <div 
              key={project.id} 
              className={`project-flip-card project-${project.id} ${flipped[project.id] ? 'is-flipped' : ''}`}
              onClick={() => setFlipped(prev => ({ ...prev, [project.id]: !prev[project.id] }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlipped(prev => ({ ...prev, [project.id]: !prev[project.id] }));
                }
              }}
              aria-label={`${project.name} - ${flipped[project.id] ? 'Show image' : 'Show details'}`}
              aria-pressed={flipped[project.id]}
            >
              <div className="flip-card-inner">
                {/* Front side - Image */}
                <div className="flip-card-front">
                  <div className="flip-card-image-wrapper">
                    <img src={project.imageUrl} alt={project.name} className="flip-card-image" />
                    <div className="flip-card-overlay">
                      <h3 className="flip-card-title" dir={isRTL ? 'rtl' : 'ltr'}>{project.name}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Back side - Details */}
                <div className="flip-card-back">
                  <div className="flip-card-content">
                    <h3 className="flip-card-back-title" dir={isRTL ? 'rtl' : 'ltr'}>{project.name}</h3>
                    <div className="flip-card-services-list">
                      {project.services.map((service, idx) => (
                        <div key={idx} className="flip-card-service-item" dir={isRTL ? 'rtl' : 'ltr'}>
                          <h4 className="flip-card-service-title">{service.title}</h4>
                          <p className="flip-card-service-desc">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



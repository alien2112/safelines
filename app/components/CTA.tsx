import React from 'react';
import VideoBackground from './VideoBackground';

export default function CTASection() {
  return (
    <section className="section-cta">
      <div className="container">
        <div className="cta-surface">
          <VideoBackground src="/2025-11-03 18-45-55.mp4" scale={1.7} />
          <div className="cta-content">
            <h2 className="cta-title">What you still waiting!!</h2>

            <div className="cta-badges" aria-label="reasons">
              <span className="cta-badge">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                    <line x1="6" y1="16" x2="10" y2="16"></line>
                  </svg>
                </span>
                100% safe payment
              </span>
              <span className="cta-badge">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                10k+ people trust us
              </span>
            </div>

            <div className="cta-actions">
              <a className="cta-btn-secondary" href="#more">MORE</a>
              <a className="cta-btn" href="#contact">Contact Sales Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



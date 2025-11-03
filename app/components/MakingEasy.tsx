"use client";

import React from 'react';
import VideoBackground from './VideoBackground';
import { useLanguage } from '../contexts/LanguageContext';

export default function MakingEasySection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  return (
    <section className="section-easy">
      <div className="container">
        <div className="easy-header">
          <h2 className="easy-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.makingEasy.title}</h2>
          <span className="easy-side left" aria-hidden />
          <span className="easy-side right" aria-hidden />
        </div>

        <div className="easy-grid">
          {/* Left: image from GridFS */}
          <div className="easy-card image">
            <div className="easy-surface">
              <MakingEasyImage />
            </div>
          </div>
          {/* Right: quote over background video */}
          <div className="easy-card quote">
            <div className="easy-surface">
              <VideoBackground src="/2025-11-03 18-45-55.mp4" scale={1.8} />
              <div className="easy-quote" dir={isRTL ? 'rtl' : 'ltr'}>
                <p className="eq-line">{t.home.makingEasy.quote}</p>
                <div className="eq-author">{t.home.makingEasy.quoteAuthor}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower two cards */}
        <div className="easy-mini-grid">
          <div className="easy-mini-card">
            <div className="mini-header" aria-label="open">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l10-10" />
                <path d="M14 7h3v3" />
              </svg>
            </div>
            <div className="mini-body">
              <span className="mini-pill" />
              <span className="mini-pill" />
            </div>
          </div>
          <div className="easy-mini-card">
            <div className="mini-header" aria-label="open">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l10-10" />
                <path d="M14 7h3v3" />
              </svg>
            </div>
            <div className="mini-body">
              <span className="mini-pill" />
              <span className="mini-pill" />
            </div>
          </div>
        </div>

        {/* Actions row */}
        <div className="easy-actions">
          <a className="cta-btn-secondary" href="#jobs" dir={isRTL ? 'rtl' : 'ltr'}>
            <span className="cta-badge icon-only" aria-hidden="true" style={{marginRight: 8}}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="3" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            {t.home.makingEasy.jobOpenings}
          </a>
          <a className="faq-cta" href="#contact" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.makingEasy.contact}</a>
        </div>
      </div>
    </section>
  );
}


function MakingEasyImage() {
  const [imageId, setImageId] = React.useState<string | null>(null);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/images?section=making-easy', { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setImageId(data[0]._id);
        }
      } catch {
        // ignore
      }
    })();
  }, []);
  if (!imageId) {
    return <div className="easy-image" aria-label="image placeholder" />;
  }
  return (
    <img
      src={`/api/images/${imageId}`}
      alt="Making future easy"
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
    />
  );
}



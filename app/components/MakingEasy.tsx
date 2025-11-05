"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VideoBackground from './VideoBackground';
import { useLanguage } from '../contexts/LanguageContext';
import { useImages } from '../lib/swr-config';

export default function MakingEasySection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  return (
    <section className="section-easy">
      <div className="container">
        <div className="easy-header">
          <span className="easy-side left" aria-hidden />
          <h2 className="easy-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.makingEasy.title}</h2>
          <span className="easy-side right" aria-hidden />
        </div>

        <div className="easy-grid">
          {/* Left: image from GridFS */}
          <div className="easy-card image">
            <div className="easy-surface" style={{ position: 'relative' }}>
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

        {/* Actions row */}
        <div className="easy-actions">
          <Link className="cta-btn-secondary" href="/jobs" dir={isRTL ? 'rtl' : 'ltr'}>
            <span className="cta-badge icon-only" aria-hidden="true" style={{marginRight: 8}}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="3" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            {t.home.makingEasy.jobOpenings}
          </Link>
          <Link className="faq-cta" href="/contact" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.makingEasy.contact}</Link>
        </div>
      </div>
    </section>
  );
}


const MakingEasyImage = React.memo(function MakingEasyImage() {
  const { data: imagesData } = useImages('making-easy');
  
  const imageId = React.useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData) || imagesData.length === 0) return null;
    return imagesData[0]._id;
  }, [imagesData]);
  
  if (!imageId) {
    return <div className="easy-image" aria-label="image placeholder" />;
  }
  return (
    <Image
      src={`/api/images/${imageId}`}
      alt="Making future easy"
      fill
      style={{ objectFit: 'cover', borderRadius: 12 }}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
});



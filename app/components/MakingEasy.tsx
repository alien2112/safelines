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
          <Link className="faq-cta" href="/contact" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.home.makingEasy.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}


const MakingEasyImage = React.memo(function MakingEasyImage() {
  const { data: imagesData } = useImages('making-easy');
  
  const imageMeta = React.useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData) || imagesData.length === 0) return null;
    return imagesData[0];
  }, [imagesData]);

  const imageSrc = React.useMemo(() => {
    if (!imageMeta?._id) return null;
    const uploadedAt = imageMeta.uploadDate ? new Date(imageMeta.uploadDate).getTime() : Date.now();
    return `/api/images/${imageMeta._id}?v=${uploadedAt}`;
  }, [imageMeta]);
  
  if (!imageSrc) {
    return <div className="easy-image" aria-label="image placeholder" />;
  }
  return (
    <Image
      src={imageSrc}
      alt="Making future easy"
      fill
      style={{ objectFit: 'cover', borderRadius: 12 }}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
});



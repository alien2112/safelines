"use client";

import Image from 'next/image';
import Blob from './Blob';
import { useLanguage } from '../contexts/LanguageContext';

type Testimonial = {
  avatarSrc: string;
  name: string;
  source: string; // company / platform
  sourceIcon?: React.ReactNode; // optional right-side icon
  review: string;
};

type TestimonialsSectionProps = {
  id?: string;
  testimonials: Testimonial[];
  reviewUsers: string[]; // avatar urls for the small row under cards
  // blob visual controlled by props (no CSS tweaks needed)
  blob?: {
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    translateXPercent?: number;
    intensity?: number;
    blur?: number;
    colors?: { primary?: string; mid?: string; outer?: string };
  };
};

export function TestimonialsSection({
  id = 'testimonials',
  testimonials,
  reviewUsers,
  blob,
}: TestimonialsSectionProps) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  return (
    <section id={id} style={{ position: 'relative', background: '#FFFFFF', padding: '96px 0', overflow: 'hidden' }}>
      {/* Pinkish decorative blob behind cards */}
      <Blob
 width={550}
 height={400}
 top={250}
 left={50}
 translateXPercent={10}
 intensity={0.06}
 blur={100}
 zIndex={0}
        colors={{
          primary: blob?.colors?.primary ?? 'rgba(236, 72, 153, 0.25)', // pink-500
          mid: blob?.colors?.mid ?? 'rgba(244, 114, 182, 0.20)', // pink-400
          outer: blob?.colors?.outer ?? 'rgba(253, 164, 175, 0.08)', // rose-300
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header with black low-opacity side lines (like About) */}
        <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div className="hero-tag" aria-label="tag" style={{ marginBottom: 16 }} dir={isRTL ? 'rtl' : 'ltr'}>
            <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
            {t.home.testimonials.tag}
          </div>
          <h2 style={{ margin: 0 }} dir={isRTL ? 'rtl' : 'ltr'}>{t.home.testimonials.title}</h2>
          <p style={{ maxWidth: 820, margin: '8px auto 0' }} dir={isRTL ? 'rtl' : 'ltr'}>{t.home.testimonials.subtitle}</p>
          {/* side lines */}
          <span style={{ position: 'absolute', top: '50%', left: 0, width: 'clamp(120px, 20vw, 220px)', height: 2, background: 'rgba(0,0,0,0.25)', transform: 'translateY(-50%)', borderRadius: 1 }} />
          <span style={{ position: 'absolute', top: '50%', right: 0, width: 'clamp(120px, 20vw, 220px)', height: 2, background: 'rgba(0,0,0,0.25)', transform: 'translateY(-50%)', borderRadius: 1 }} />
        </div>

        {/* Cards grid (responsive) */}
        <div className="testi-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testi-card">
              {/* header row: avatar left, source right */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 14, overflow: 'hidden', background: '#F1F5F9', flex: '0 0 auto' }}>
                    {/* Using next/image for perf; falling back to img if external */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatarSrc} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--gray-900)', fontWeight: 700 }}>{t.name}</div>
                    <div style={{ color: 'var(--gray-500)', fontSize: 14 }}>{t.source}</div>
                  </div>
                </div>
                <div style={{ color: 'var(--gray-500)' }}>{t.sourceIcon}</div>
              </div>
              {/* separator */}
              <div style={{ height: 1, background: 'rgba(226,232,240,0.9)', margin: '0 22px' }} />
              {/* review copy */}
              <div style={{ padding: '20px 22px', color: 'var(--gray-700)', fontSize: 15, lineHeight: '26px' }}>{t.review}</div>
            </div>
          ))}
        </div>

        {/* Review count row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {reviewUsers.slice(0, 5).map((src, i) => (
              <span key={i} style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 4px 10px rgba(2,8,23,0.10)', marginLeft: i === 0 ? 0 : -8, background: '#E2E8F0' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="user" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </span>
            ))}
          </div>
          <div style={{ color: 'var(--gray-700)', textAlign: 'center' }} dir={isRTL ? 'rtl' : 'ltr'}>{t.home.testimonials.totalReviews}</div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;



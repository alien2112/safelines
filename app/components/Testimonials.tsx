"use client";

import Image from 'next/image';
import Blob from './Blob';
import { useLanguage } from '../contexts/LanguageContext';
import { FaUser } from 'react-icons/fa';

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
        {/* Section header with side lines aligned to title */}
        <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div className="hero-tag" aria-label="tag" style={{ marginBottom: 16 }} dir={isRTL ? 'rtl' : 'ltr'}>
            <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
            {t.home.testimonials.tag}
          </div>
          <div className="section-title-row">
            <span className="side-line" aria-hidden="true" />
            <h2 style={{ margin: 0 }} dir={isRTL ? 'rtl' : 'ltr'}>{t.home.testimonials.title}</h2>
            <span className="side-line" aria-hidden="true" />
          </div>
          <p style={{ maxWidth: 820, margin: '8px auto 0' }} dir={isRTL ? 'rtl' : 'ltr'}>{t.home.testimonials.subtitle}</p>
        </div>

        {/* Cards grid (responsive) */}
        <div className="testi-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testi-card">
              {/* header row: avatar left, source right */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="author-icon" style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-accent) 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    <FaUser />
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
              <span key={i} className="author-icon" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 4px 10px rgba(70, 4, 66, 0.1)', marginLeft: i === 0 ? 0 : -8, background: 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-accent) 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>
                <FaUser />
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



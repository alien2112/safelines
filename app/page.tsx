"use client";

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from './contexts/LanguageContext';

// Critical components loaded immediately
import HeroBanner from './components/HeroBanner';
import VideoBackground from './components/VideoBackground';

// Lazy load heavy components for better initial load
const ProjectsSection = dynamic(() => import('./components/Projects').then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div style={{ minHeight: '400px' }} />
});

const AboutSection = dynamic(() => import('./components/About').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div style={{ minHeight: '400px' }} />
});

const ServicesSection = dynamic(() => import('./components/Services').then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div style={{ minHeight: '400px' }} />
});

const TestimonialsSection = dynamic(() => import('./components/Testimonials'), {
  loading: () => <div style={{ minHeight: '300px' }} />
});

const FAQSection = dynamic(() => import('./components/FAQ'), {
  loading: () => <div style={{ minHeight: '300px' }} />
});

const PricingShippingSection = dynamic(() => import('./components/PricingShipping'), {
  loading: () => <div style={{ minHeight: '300px' }} />
});

const MakingEasySection = dynamic(() => import('./components/MakingEasy'), {
  loading: () => <div style={{ minHeight: '300px' }} />
});

const StrategyContentSection = dynamic(() => import('./components/StrategyContent'), {
  loading: () => <div style={{ minHeight: '300px' }} />
});

const CommunitySection = dynamic(() => import('./components/Community'), {
  loading: () => <div style={{ minHeight: '300px' }} />
});

const CTASection = dynamic(() => import('./components/CTA'), {
  loading: () => <div style={{ minHeight: '200px' }} />
});

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div style={{ minHeight: '200px' }} />
});

// GSAP animations loaded without SSR and with delay for better initial load
const GSAPAnimations = dynamic(() => import('./components/GSAPAnimations').then(mod => ({ default: mod.GSAPAnimations })), {
  ssr: false,
  loading: () => null
});

export default function HomePage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <main>
      <GSAPAnimations />
      <HeroBanner section="hero-home" alt="Hero Banner" objectPosition="50% 66%">
        <div className="banner-card" dir={isRTL ? 'rtl' : 'ltr'}>
          <p>{t.home.hero.trust}</p>
        </div>
      </HeroBanner>
      <div className="section-separator" aria-hidden="true">
        <div className="separator-wave-layer separator-wave-1"></div>
        <div className="separator-wave-layer separator-wave-2"></div>
      </div>
      <section className="hero">
        <VideoBackground src="/hero-animations.mp4" scale={1} />
        <div className="container hero-row">
          <div style={{ marginTop: 80 }}>
            <div className="hero-tag" aria-label="tag" dir={isRTL ? 'rtl' : 'ltr'}>
              <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
              {t.home.hero.tag}
            </div>

            <h1 className="hero-headline" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.hero.title}</h1>
            {/* subheadline removed per request */}

            <Link className="hero-cta" href="/contact" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.home.hero.cta}
            </Link>
          </div>

          {/* Removed side media; background video is used instead */}
        </div>
      </section>
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection
        testimonials={t.home.testimonials.items.map((item) => ({
          avatarSrc: '/safelines-logo.png',
          name: item.name,
          source: item.source,
          review: item.review,
        }))}
        reviewUsers={[
          '/safelines-logo.png',
          '/safelines-logo.png',
          '/safelines-logo.png',
          '/safelines-logo.png',
          '/safelines-logo.png',
        ]}
        blob={{
          intensity: 0.60,
          colors: {
            primary: 'rgba(236,72,153,0.55)',
            mid: 'rgba(244,114,182,0.35)',
            outer: 'rgba(253,164,175,0.2)',
          },
        }}
      />
      {/* Place questions (FAQ) and pricing directly under the customer section */}
      <FAQSection />
      {/* <PricingShippingSection /> */}
      <MakingEasySection />
      <StrategyContentSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </main>
  );
}



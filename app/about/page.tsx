"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = {
  feature1: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop',
  feature2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop',
  feature3: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop',
  feature4: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop',
  milestone1: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
  milestone2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  milestone3: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
  milestone4: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
};

export default function AboutPage() {
  const { language, t } = useLanguage();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  
  const isRTL = language === 'ar';

  useEffect(() => {
    // Cinematic Headline Animation
    const headline = headlineRef.current;
    if (headline) {
      gsap.set(headline, { opacity: 0, scale: 0.8, y: 50 });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(headline, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
      });

      // Split text animation for headline
      const text = headline.textContent || '';
      const words = text.split(' ');
      headline.innerHTML = words
        .map(
          (word) =>
            `<span class="about-word" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`
        )
        .join(' ');

      const wordSpans = headline.querySelectorAll('.about-word span');
      gsap.set(wordSpans, { y: '100%', opacity: 0 });

      gsap.to(wordSpans, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        delay: 0.5,
        ease: 'power3.out',
      });
    }

    // Team Member Cards - Rotating Flip Animation
    const teamCards = document.querySelectorAll('.about-team-card');
    teamCards.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        rotationY: -90,
        transformPerspective: 1000,
      });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // 3D hover effect
      const cardEl = card as HTMLElement;
      cardEl.addEventListener('mouseenter', () => {
        gsap.to(cardEl, {
          rotationY: 5,
          rotationX: 5,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      cardEl.addEventListener('mouseleave', () => {
        gsap.to(cardEl, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });

    // Line Drawing Animation for Decorative Elements
    const decorativeLines = document.querySelectorAll('.about-line-decoration');
    decorativeLines.forEach((line) => {
      const lineEl = line as SVGPathElement;
      const pathLength = lineEl.getTotalLength();
      gsap.set(lineEl, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      ScrollTrigger.create({
        trigger: line,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(lineEl, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
          });
        },
        once: true,
      });
    });

    // Parallax Background Shapes
    const parallaxShapes = document.querySelectorAll('.about-parallax-shape');
    parallaxShapes.forEach((shape) => {
      ScrollTrigger.create({
        trigger: shape,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(shape, {
            y: progress * 80,
            rotation: progress * 10,
            opacity: 0.2 + progress * 0.3,
          });
        },
      });
    });

    // Story/Timeline Section - Alternating Slide Reveal
    const storyItems = document.querySelectorAll('.about-story-item');
    storyItems.forEach((item, index) => {
      const isEven = index % 2 === 0;
      gsap.set(item, {
        opacity: 0,
        x: isEven ? -100 : 100,
        y: 50,
      });

      ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Parallax for story images
      const storyImage = item.querySelector('.about-story-image');
      if (storyImage) {
        ScrollTrigger.create({
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(storyImage, {
              y: progress * -40,
              scale: 1 + progress * 0.05,
            });
          },
        });
      }
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.about-stat-number');
    stats.forEach((stat) => {
      const target = parseInt(stat.textContent || '0', 10);
      gsap.set(stat, { textContent: '0' });

      ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(stat, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: 0.1,
          });
        },
        once: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-parallax-shape about-shape-1" />
        <div className="about-parallax-shape about-shape-2" />
        <div className="container">
          <div className="about-hero-content">
            <h1 ref={headlineRef} className="about-hero-title" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.about.hero.title}
            </h1>
            <p className="about-hero-subtitle" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.about.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission-content">
            <h2 className="about-mission-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.mission.title}</h2>
            <p className="about-mission-text" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.about.mission.text}
            </p>
            <div className="about-mission-stats">
              <div className="about-stat">
                <div className="about-stat-number">15+</div>
                <div className="about-stat-label" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.stats.experience}</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">5000+</div>
                <div className="about-stat-label" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.stats.clients}</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">50+</div>
                <div className="about-stat-label" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.stats.team}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="about-story">
        <div className="container">
          <h2 className="about-story-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.vision.title}</h2>
          <div ref={storyRef} className="about-story-timeline">
            {t.about.vision.milestones.map((milestone, index) => (
              <div key={milestone.year} className="about-story-item">
                <div className="about-story-content" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="about-story-year">{milestone.year}</div>
                  <h3 className="about-story-item-title">{milestone.title}</h3>
                  <p className="about-story-item-text">{milestone.description}</p>
                </div>
                <div
                  className="about-story-image"
                  style={{ backgroundImage: `url(${IMAGES[`milestone${index + 1}` as keyof typeof IMAGES]})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="about-team-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.whyChoose.title}</h2>
          <p className="about-team-subtitle" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.about.whyChoose.subtitle}
          </p>
          <div className="about-team-grid">
            {t.about.whyChoose.features.map((feature, index) => (
              <div key={feature.name} className="about-team-card">
                <div className="about-team-card-image-wrapper">
                  <div
                    className="about-team-card-image"
                    style={{ backgroundImage: `url(${IMAGES[`feature${index + 1}` as keyof typeof IMAGES]})` }}
                  />
                </div>
                <div className="about-team-card-content" dir={isRTL ? 'rtl' : 'ltr'}>
                  <h3 className="about-team-card-name">{feature.name}</h3>
                  <div className="about-team-card-role">{feature.role}</div>
                  <p className="about-team-card-bio">{feature.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="about-values-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.values.title}</h2>
          <div className="about-values-grid">
            {t.about.values.items.map((value, index) => {
              const icons = [
                <svg key="integrity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>,
                <svg key="efficiency" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>,
                <svg key="excellence" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>,
                <svg key="partnership" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"/>
                  <path d="M7 18h1a2 2 0 0 0 0-4H5c-.6 0-1.1.2-1.4.6L3 18"/>
                  <path d="M13 12h2a2 2 0 1 1 0 4h-3c-.6 0-1.1.2-1.4.6L21 10"/>
                  <path d="M17 6h-1a2 2 0 0 1 0 4h3c.6 0 1.1-.2 1.4-.6L21 6"/>
                </svg>,
              ];
              
              return (
                <div key={value.title} className="about-value-card">
                  <div className="about-value-icon">{icons[index]}</div>
                  <h3 className="about-value-title" dir={isRTL ? 'rtl' : 'ltr'}>{value.title}</h3>
                  <p className="about-value-text" dir={isRTL ? 'rtl' : 'ltr'}>
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

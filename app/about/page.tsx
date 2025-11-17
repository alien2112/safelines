"use client";

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import HeroBanner from '../components/HeroBanner';
import DynamicImage from '../components/DynamicImage';

const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div style={{ minHeight: '200px' }} />
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


export default function AboutPage() {
  const { language, t } = useLanguage();
  const storyRef = useRef<HTMLDivElement>(null);
  
  const isRTL = language === 'ar';

  useEffect(() => {
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

    // Stats Counter Animation - wait for DOM to be ready
    const initStatsAnimation = () => {
      const stats = document.querySelectorAll('.about-stat-number');
      if (stats.length === 0) {
        setTimeout(initStatsAnimation, 50);
        return;
      }

      stats.forEach((stat) => {
        // Get target values from data attributes
        const targetNumber = parseInt(stat.getAttribute('data-target') || '0', 10);
        const suffix = stat.getAttribute('data-suffix') || '';
        
        if (targetNumber === 0) return; // Skip if no valid target
        
        // Create a counter object for GSAP to animate
        const counter = { value: 0 };
        // Ensure initial value is set
        stat.textContent = '0' + suffix;

        const triggerElement = stat.closest('.about-stat') || stat;
        
        // Function to animate
        const animateCounter = () => {
          if (counter.value > 0) return; // Prevent duplicate animations
          gsap.to(counter, {
            value: targetNumber,
            duration: 2,
            ease: 'power2.out',
            snap: { value: 1 },
            onUpdate: function() {
              stat.textContent = Math.round(counter.value) + suffix;
            },
          });
        };

        // Check if already in view
        ScrollTrigger.create({
          trigger: triggerElement,
          start: 'top 85%',
          onEnter: animateCounter,
          once: true,
        });

        // Also check immediately if already in viewport
        setTimeout(() => {
          const rect = triggerElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const triggerPoint = windowHeight * 0.85;
          if (rect.top < triggerPoint && rect.bottom > 0) {
            animateCounter();
          }
        }, 150);
      });
      
      // Refresh ScrollTrigger after all stats are set up
      ScrollTrigger.refresh();
    };

    initStatsAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="about-page page-about">
      {/* Banner Section */}
      <HeroBanner section="hero-about" alt="About Us Banner" objectPosition="50% 50%" />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-parallax-shape about-shape-1" />
        <div className="about-parallax-shape about-shape-2" />
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-hero-title" dir={isRTL ? 'rtl' : 'ltr'}>
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
                <div className="about-stat-number" data-target="15" data-suffix="+">0+</div>
                <div className="about-stat-label" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.stats.experience}</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number" data-target="5000" data-suffix="+">0+</div>
                <div className="about-stat-label" dir={isRTL ? 'rtl' : 'ltr'}>{t.about.stats.clients}</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number" data-target="50" data-suffix="+">0+</div>
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
                <DynamicImage
                  section={`about-milestone-${index + 1}`}
                  className="about-story-image"
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
                  <DynamicImage
                    section={`about-feature-${index + 1}`}
                    className="about-team-card-image"
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
      <Footer />
    </main>
  );
}

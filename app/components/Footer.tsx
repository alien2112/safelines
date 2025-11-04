"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();
  const isRTL = language === 'ar';
  const footerRef = useRef<HTMLElement>(null);
  const scrollTopBtnRef = useRef<HTMLButtonElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate scroll-to-top button
  useEffect(() => {
    if (scrollTopBtnRef.current) {
      if (showScrollTop) {
        gsap.set(scrollTopBtnRef.current, { 
          visibility: 'visible',
          pointerEvents: 'auto'
        });
        gsap.to(scrollTopBtnRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.2)',
        });
      } else {
        gsap.to(scrollTopBtnRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 20,
          duration: 0.3,
          onComplete: () => {
            if (scrollTopBtnRef.current) {
              gsap.set(scrollTopBtnRef.current, { 
                visibility: 'hidden',
                pointerEvents: 'none'
              });
            }
          },
        });
      }
    }
  }, [showScrollTop]);

  const scrollToTop = () => {
    const start = window.scrollY;
    const startTime = performance.now();
    const duration = 1200;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      window.scrollTo(0, start * (1 - easeOutCubic));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // GSAP Animations
  useEffect(() => {
    if (!footerRef.current) return;

    const footer = footerRef.current;
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.footer-brand', { opacity: 0, y: 30 });
      gsap.set('.footer-contact-item', { opacity: 0, x: isRTL ? 20 : -20 });
      gsap.set('.footer-section-title', { opacity: 0, x: isRTL ? 30 : -30 });
      gsap.set('.footer-link-item', { opacity: 0, y: 20 });
      gsap.set('.footer-jobs-box', { opacity: 0, scale: 0.9 });
      gsap.set('.footer-social-icon', { opacity: 0, scale: 0.8, rotation: -10 });
      gsap.set('.footer-divider-line', { scaleX: 0, transformOrigin: isRTL ? 'right' : 'left' });
      gsap.set('.footer-copyright', { opacity: 0, y: 20 });
      gsap.set('.footer-scroll-top', { opacity: 0, scale: 0.8, y: 20 });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' }
      });

      // Brand animation
      tl.to('.footer-brand', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
      // Contact items animation
      .to('.footer-contact-item', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
      }, '-=0.4')
      // Section titles staggered
      .to('.footer-section-title', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4')
      // Links staggered
      .to('.footer-link-item', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
      }, '-=0.3')
      // Jobs box with pulse
      .to('.footer-jobs-box', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.4)',
      }, '-=0.2')
      // Social icons staggered with rotation
      .to('.footer-social-icon', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        stagger: 0.08,
      }, '-=0.3')
      // Divider animation
      .to('.footer-divider-line', {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.4')
      // Copyright
      .to('.footer-copyright', {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.2');

      // Scroll-to-top button animation is handled separately in useEffect below

      // Jobs box pulse animation
      const jobsBox = footer.querySelector('.footer-jobs-box');
      if (jobsBox) {
        gsap.to(jobsBox, {
          scale: 1.02,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: footer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set('.footer-brand-logo', {
            y: progress * -10,
            opacity: 1 - progress * 0.2,
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === footer) {
            trigger.kill();
          }
        });
      };
    }, footer);

    return () => ctx.revert();
  }, [language, isRTL]);

  // Hover animations for links and icons
  useEffect(() => {
    const links = footerRef.current?.querySelectorAll('.footer-link-item');
    const socialIcons = footerRef.current?.querySelectorAll('.footer-social-icon');

    links?.forEach((link) => {
      const handleMouseEnter = () => {
        gsap.to(link, {
          x: isRTL ? -4 : 4,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      const handleMouseLeave = () => {
        gsap.to(link, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    socialIcons?.forEach((icon) => {
      const handleMouseEnter = () => {
        gsap.to(icon, {
          scale: 1.15,
          rotation: 5,
          y: -4,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      const handleMouseLeave = () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      icon.addEventListener('mouseenter', handleMouseEnter);
      icon.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        icon.removeEventListener('mouseenter', handleMouseEnter);
        icon.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [isRTL]);

  return (
    <>
      <footer ref={footerRef} className="footer" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container">
          {/* Main Footer Content */}
          <div className="footer-main">
            {/* Brand Section */}
            <div className="footer-brand-section">
              <div className="footer-brand">
                <Link href="/" className="footer-brand-logo-wrapper">
                  <img 
                    src="/safelines_logo-removebg-preview.png" 
                    alt="Safe Lines Logo" 
                    className="footer-brand-logo"
                  />
                </Link>
                <h3 className="footer-brand-tagline">{t.home.footer.brand.tagline}</h3>
                <p className="footer-brand-description">{t.home.footer.brand.description}</p>
                
                {/* Contact Information */}
                <div className="footer-contact-info">
                  <a href="mailto:safelines.cc.co@gmail.com" className="footer-contact-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>safelines.cc.co@gmail.com</span>
                  </a>
                  <div className="footer-contact-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h2.87a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.84.24 1.71.42 2.61.54A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div className="footer-phone-numbers">
                      <a href="tel:+966555005350">(+966) 555005350</a>
                      <a href="tel:+966920032888">(+966) 920032888</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="footer-section">
              <h4 className="footer-section-title">{t.home.footer.quickLinks.title}</h4>
              <nav className="footer-links" aria-label="Footer navigation">
                {t.home.footer.links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="footer-link-item"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Jobs Section */}
            <div className="footer-section">
              <h4 className="footer-section-title">{t.home.footer.jobs.title}</h4>
              <Link href="/jobs" className="footer-jobs-box">
                <div className="footer-jobs-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="footer-jobs-content">
                  <p className="footer-jobs-subtitle">{t.home.footer.jobs.subtitle}</p>
                  <span className="footer-jobs-cta">{t.home.footer.jobs.cta} →</span>
                </div>
              </Link>
            </div>

            {/* Social Media Section */}
            <div className="footer-section">
              <h4 className="footer-section-title">{t.home.footer.social.title}</h4>
              <div className="footer-social" aria-label="Social media links">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Twitter"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="17" cy="7" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9h2.5V6.5H14c-2 0-3 1.3-3 3V12H8v2.5h3V21h2.5v-6.5H17V12h-3V9z" fill="currentColor"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="footer-section footer-lang-section">
              <h4 className="footer-section-title">{isRTL ? 'اللغة' : 'Language'}</h4>
              <button
                className="footer-lang-toggle"
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                aria-label="Toggle language"
              >
                <span className={`footer-lang-flag ${language === 'ar' ? 'active' : ''}`}>Sa</span>
                <span className="footer-lang-separator">|</span>
                <span className={`footer-lang-flag ${language === 'en' ? 'active' : ''}`}>En</span>
              </button>
            </div>
          </div>

          {/* Animated Divider */}
          <div className="footer-divider-wrapper">
            <div className="footer-divider-line"></div>
          </div>

          {/* Copyright Section */}
          <div className="footer-copyright">
            <p className="footer-copyright-text">{t.home.footer.copyright.text}</p>
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button - Outside footer for proper fixed positioning */}
      <button
        ref={scrollTopBtnRef}
        className="footer-scroll-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  );
}

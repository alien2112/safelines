"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import { debounce } from '../lib/debounce';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GSAPAnimations() {
  const { language } = useLanguage();
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    // Clear only our own triggers first
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];
    
    // Wait for layout to settle after language/RTL changes
    const initAnimations = () => {
      
      // Hero Section Animations
      const heroTag = document.querySelector('.hero-tag');
    const heroHeadline = document.querySelector('.hero-headline');
    const heroCta = document.querySelector('.hero-cta');

    if (heroTag && heroHeadline && heroCta) {
      // Set initial states
      gsap.set(heroTag, { opacity: 0, y: 20 });
      gsap.set(heroCta, { opacity: 0, scale: 0.9 });
      
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.to(heroTag, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(heroCta, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
    }

    // Split text animation for headlines (if elements have split-text class)
    const splitTextElements = document.querySelectorAll('.split-text');
    splitTextElements.forEach((el) => {
      const text = el.textContent || '';
      const words = text.split(' ');
      el.innerHTML = words.map(word => `<span class="word" style="display: inline-block;">${word}</span>`).join(' ');
      
      const wordsEl = el.querySelectorAll('.word');
      gsap.set(wordsEl, { opacity: 0, y: 30 });
      
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(wordsEl, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out'
          });
        },
        once: true
      });
      triggersRef.current.push(trigger);
    });

    // Section Titles Animation
    const sectionTitles = document.querySelectorAll('h2.about-title, h2.projects-title, h2.services-title, h2.faq-title, h2.pricing-title, h2.easy-title, h2.strategy-title, h2.community-title, h2.cta-title, h2.contact-title');
    sectionTitles.forEach((title) => {
      gsap.set(title, { opacity: 0, y: 50 });
      const trigger = ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out'
          });
        },
        once: true
      });
      triggersRef.current.push(trigger);
    });

    // Paragraphs Animation
    const paragraphs = document.querySelectorAll('.about-subtext, .projects-subtext, .faq-subtext, .pricing-subtext, .hero-subheadline');
    paragraphs.forEach((p) => {
      gsap.set(p, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: p,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(p, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        },
        once: true
      });
      triggersRef.current.push(trigger);
    });

    // Cards Staggered Animation - Using ScrollTrigger.batch for better performance
    const cardContainers = [
      { selector: '.service-card', stagger: 0.1 },
      { selector: '.svc-card', stagger: 0.08 },
      { selector: '.project-item', stagger: 0.1 },
      { selector: '.testi-card', stagger: 0.12 },
      { selector: '.pricing-card', stagger: 0.1 },
      { selector: '.faq-card', stagger: 0.08 },
      { selector: '.contact-card', stagger: 0.1 },
      { selector: '.easy-card', stagger: 0.15 },
      { selector: '.easy-mini-card', stagger: 0.1 },
      { selector: '.strategy-card', stagger: 0.15 },
      { selector: '.comm-card-inner', stagger: 0.1 },
      { selector: '.stat', stagger: 0.1 },
      { selector: '.svc-chip', stagger: 0.06 }
    ];

    cardContainers.forEach(({ selector, stagger }) => {
      const cards = document.querySelectorAll(selector);
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });
        
        // Use batch for better performance with many elements
        const batchTriggers = ScrollTrigger.batch(selector, {
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: stagger,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          },
          once: true,
          start: 'top 80%'
        });
        // ScrollTrigger.batch returns an array of triggers
        if (Array.isArray(batchTriggers)) {
          triggersRef.current.push(...batchTriggers);
        }
      }
    });

    // 3D Hover Effects for Cards with Tilt - Optimized to reduce forced reflows
    const cards3D = document.querySelectorAll('.svc-card, .testi-card, .pricing-card, .contact-card, .easy-card, .strategy-card, .comm-card-inner');
    
    cards3D.forEach((card) => {
      const cardEl = card as HTMLElement;
      let cachedRect: DOMRect | null = null;
      let rafId: number | null = null;
      
      const updateCachedRect = () => {
        cachedRect = cardEl.getBoundingClientRect();
      };
      
      // Cache rect on mouseenter to avoid repeated getBoundingClientRect calls
      cardEl.addEventListener('mouseenter', updateCachedRect);
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!cachedRect) return;
        
        // Cancel previous animation frame if still pending
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        
        // Use RAF to batch DOM reads/writes
        rafId = requestAnimationFrame(() => {
          const x = e.clientX - cachedRect!.left;
          const y = e.clientY - cachedRect!.top;
          
          const centerX = cachedRect!.width / 2;
          const centerY = cachedRect!.height / 2;
          
          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;
          
          gsap.to(cardEl, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true // Force GPU acceleration
          });
          rafId = null;
        });
      };
      
      const handleMouseLeave = () => {
        cachedRect = null;
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        gsap.to(cardEl, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out',
          force3D: true
        });
      };
      
      cardEl.addEventListener('mousemove', handleMouseMove);
      cardEl.addEventListener('mouseleave', handleMouseLeave);
    });

    // Parallax Effect for Hero Section Elements
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const heroElements = document.querySelectorAll('.hero-tag, .hero-cta');
      heroElements.forEach((el) => {
        const trigger = ScrollTrigger.create({
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(el, {
              y: progress * -30,
              opacity: 1 - progress * 0.3
            });
          }
        });
        triggersRef.current.push(trigger);
      });
    }

    // CTA Badges Animation
    const ctaBadges = document.querySelectorAll('.cta-badge');
    ctaBadges.forEach((badge, index) => {
      gsap.set(badge, { opacity: 0, scale: 0.8, rotation: -10 });
      const trigger = ScrollTrigger.create({
        trigger: badge,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
          });
        },
        once: true
      });
      triggersRef.current.push(trigger);
    });

    // Buttons Hover Animation
    const buttons = document.querySelectorAll('.hero-cta, .cta-btn, .cta-btn-secondary, .nav-cta, .faq-cta, .pricing-more-btn, .contact-submit');
    buttons.forEach((btn) => {
      const btnEl = btn as HTMLElement;
      
      btnEl.addEventListener('mouseenter', () => {
        gsap.to(btnEl, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btnEl.addEventListener('mouseleave', () => {
        gsap.to(btnEl, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Icons Animation
    const icons = document.querySelectorAll('.card-icon, .svc-icon, .chip-icon, .footer-icon, .social-icon');
    icons.forEach((icon) => {
      const iconEl = icon as HTMLElement;
      
      iconEl.addEventListener('mouseenter', () => {
        gsap.to(iconEl, {
          rotation: 5,
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      iconEl.addEventListener('mouseleave', () => {
        gsap.to(iconEl, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Project Feature Image Animation
    const projectFeature = document.querySelector('.project-feature');
    if (projectFeature) {
      const featureImage = projectFeature.querySelector('.feature-image img');
      if (featureImage) {
        gsap.set(featureImage, { scale: 1.1, opacity: 0 });
        const trigger = ScrollTrigger.create({
          trigger: projectFeature,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(featureImage, {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out'
            });
          },
          once: true
        });
        triggersRef.current.push(trigger);
      }
    }

      // Refresh ScrollTrigger after all animations are set up
      // Use requestAnimationFrame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        // Also refresh after a short delay to account for any async rendering
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });
    };

    // Small delay to ensure RTL layout is applied before initializing animations
    const timeoutId = setTimeout(() => {
      initAnimations();
    }, 50);

    // Also refresh on window load to ensure everything is ready
    const handleLoad = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    // Debounce resize handler for better performance
    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 250);

    window.addEventListener('load', handleLoad);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      // Only kill triggers created by this component
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [language]); // Re-run when language changes

  return null;
}


"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GSAPAnimations() {
  useEffect(() => {
    // Hero Section Animations
    const heroTag = document.querySelector('.hero-tag');
    const heroHeadline = document.querySelector('.hero-headline');
    const heroCta = document.querySelector('.hero-cta');

    if (heroTag && heroHeadline && heroCta) {
      // Set initial states
      gsap.set(heroTag, { opacity: 0, y: 20 });
      gsap.set(heroHeadline, { opacity: 0, y: 40 });
      gsap.set(heroCta, { opacity: 0, scale: 0.9 });
      
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.to(heroTag, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(heroHeadline, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out'
      }, '-=0.4')
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
      
      ScrollTrigger.create({
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
    });

    // Section Titles Animation
    const sectionTitles = document.querySelectorAll('h2.about-title, h2.projects-title, h2.services-title, h2.faq-title, h2.pricing-title, h2.easy-title, h2.strategy-title, h2.community-title, h2.cta-title, h2.contact-title');
    sectionTitles.forEach((title) => {
      gsap.set(title, { opacity: 0, y: 50 });
      ScrollTrigger.create({
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
    });

    // Paragraphs Animation
    const paragraphs = document.querySelectorAll('.about-subtext, .projects-subtext, .faq-subtext, .pricing-subtext, .hero-subheadline');
    paragraphs.forEach((p) => {
      gsap.set(p, { opacity: 0, y: 30 });
      ScrollTrigger.create({
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
    });

    // Cards Staggered Animation
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
        
        const parent = cards[0]?.parentElement || cards[0];
        ScrollTrigger.create({
          trigger: parent,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: stagger,
              ease: 'power2.out'
            });
          },
          once: true
        });
      }
    });

    // 3D Hover Effects for Cards with Tilt
    const cards3D = document.querySelectorAll('.service-card, .svc-card, .testi-card, .pricing-card, .contact-card, .easy-card, .strategy-card, .comm-card-inner');
    
    cards3D.forEach((card) => {
      const cardEl = card as HTMLElement;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        gsap.to(cardEl, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(cardEl, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      };
      
      cardEl.addEventListener('mousemove', handleMouseMove);
      cardEl.addEventListener('mouseleave', handleMouseLeave);
    });

    // Parallax Effect for Hero Section Elements
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const heroElements = document.querySelectorAll('.hero-headline, .hero-tag, .hero-cta');
      heroElements.forEach((el) => {
        ScrollTrigger.create({
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
      });
    }

    // CTA Badges Animation
    const ctaBadges = document.querySelectorAll('.cta-badge');
    ctaBadges.forEach((badge, index) => {
      gsap.set(badge, { opacity: 0, scale: 0.8, rotation: -10 });
      ScrollTrigger.create({
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
        ScrollTrigger.create({
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
      }
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}


"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollToTop() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Translations
  const tooltipText = isRTL ? 'العودة للأعلى' : 'Back to Top';

  // Scroll detection and animation
  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    
    // Set initial state - hidden and below
    gsap.set(button, {
      opacity: 0,
      y: 40,
      scale: 0.8,
      visibility: 'hidden',
      pointerEvents: 'none',
    });

    // Set initial tooltip state
    if (tooltipRef.current) {
      gsap.set(tooltipRef.current, {
        opacity: 0,
        y: 10,
      });
    }

    // Scroll listener for reliable detection
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position with a small delay
    setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animate button appearance/disappearance
  useEffect(() => {
    if (!buttonRef.current || !arrowRef.current) return;

    const button = buttonRef.current;
    const arrow = arrowRef.current;

    if (isVisible) {
      // Show animation - Timeline with power3.out
      // Add a small delay before appearing for natural feel
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      });

      gsap.set(button, {
        visibility: 'visible',
        pointerEvents: 'auto',
      });

      // Set initial arrow position
      gsap.set(arrow, {
        y: 5,
      });

      tl.to(button, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
      })
      .to(arrow, {
        y: 0,
        duration: 0.4,
      }, '-=0.3');
    } else {
      // Hide animation - fade out and slide down
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          if (button) {
            gsap.set(button, {
              visibility: 'hidden',
              pointerEvents: 'none',
            });
          }
        },
      });

      tl.to(button, {
        opacity: 0,
        y: 40,
        scale: 0.8,
        duration: 0.4,
      })
      .to(arrow, {
        y: 5,
        duration: 0.3,
      }, '-=0.2');
    }
  }, [isVisible]);

  // Hover effects
  useEffect(() => {
    if (!buttonRef.current || !arrowRef.current || !tooltipRef.current) return;

    const button = buttonRef.current;
    const arrow = arrowRef.current;
    const tooltip = tooltipRef.current;

    const handleMouseEnter = () => {
      // Scale up button
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Arrow bounce/shift upward
      gsap.to(arrow, {
        y: -4,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Show tooltip
      gsap.to(tooltip, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Add glow effect via box-shadow animation
      gsap.to(button, {
        boxShadow: '0 12px 40px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Scale back
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Arrow back to position
      gsap.to(arrow, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Hide tooltip
      gsap.to(tooltip, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Remove glow
      gsap.to(button, {
        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll to top function with page shake/bounce
  const scrollToTop = () => {
    if (!buttonRef.current) return;

    // Smooth scroll using GSAP
    const scrollDuration = 1200;
    const startY = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);

      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startY * (1 - easeOutCubic));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Add page shake/bounce effect when reaching top
        gsap.to('body', {
          y: -8,
          duration: 0.1,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.set('body', { y: 0 });
          },
        });
      }
    };

    requestAnimationFrame(animateScroll);

    // Button click animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="scroll-to-top-btn"
        onClick={scrollToTop}
        aria-label={tooltipText}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <svg
          ref={arrowRef}
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="scroll-to-top-arrow"
        >
          <path
            d="M12 19V5M5 12l7-7 7 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span ref={tooltipRef} className="scroll-to-top-tooltip">
          {tooltipText}
        </span>
      </button>
    </>
  );
}

"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Blob from './Blob';
import { FaShip, FaTruck, FaCogs, FaPlane } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stats Counter Animation - wait for DOM to be ready
    const initStatsAnimation = () => {
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      if (!statNumbers || statNumbers.length === 0) {
        setTimeout(initStatsAnimation, 50);
        return;
      }

      statNumbers.forEach((statEl) => {
      // Get target values from data attributes
      const hasKPlus = statEl.getAttribute('data-has-kplus') === 'true';
      const targetNumber = parseFloat(statEl.getAttribute('data-target') || '0');
      const suffix = statEl.getAttribute('data-suffix') || '';
      
      if (targetNumber === 0) return; // Skip if no valid target
      
      // Determine if it's a decimal number and get decimal places
      const dataTarget = statEl.getAttribute('data-target') || '';
      const isDecimal = !hasKPlus && !suffix && dataTarget.includes('.');
      const decimalPlaces = isDecimal ? (dataTarget.split('.')[1]?.length || 0) : 0;

      // Create a counter object for GSAP to animate
      const counter = { value: 0 };
      
      // Set initial display value
      if (hasKPlus) {
        statEl.innerHTML = '<span class="stat-number-value">0</span><span class="stat-number-suffix">k+</span>';
      } else if (isDecimal) {
        // For decimals like "4.8", show "0.0" initially
        statEl.textContent = '0.' + '0'.repeat(decimalPlaces);
      } else {
        statEl.textContent = suffix === '+' ? '0+' : '0';
      }

      const triggerElement = statEl.closest('.stat') || statEl;
      
      // Function to animate
      let isAnimating = false;
      const animateCounter = () => {
        if (isAnimating) return; // Prevent duplicate animations
        isAnimating = true;
        
        gsap.to(counter, {
          value: targetNumber,
          duration: 2,
          ease: 'power2.out',
          snap: { value: 1 },
          onUpdate: function() {
            if (hasKPlus) {
              const currentValue = counter.value / 1000;
              const valueSpan = statEl.querySelector('.stat-number-value');
              if (valueSpan) {
                valueSpan.textContent = currentValue.toFixed(currentValue % 1 === 0 ? 0 : 1);
              }
            } else if (suffix === '+') {
              statEl.textContent = Math.round(counter.value) + suffix;
            } else if (isDecimal) {
              // For decimal numbers
              statEl.textContent = counter.value.toFixed(decimalPlaces);
            } else {
              // For numbers without suffix (like "4.8")
              statEl.textContent = counter.value.toFixed(decimalPlaces);
            }
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
        if (rect.top < triggerPoint && rect.bottom > 0 && !isAnimating) {
          animateCounter();
        }
      }, 200);
      
      // Force check after a longer delay to ensure it triggers
      setTimeout(() => {
        if (!isAnimating) {
          const rect = triggerElement.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            animateCounter();
          }
        }
      }, 500);
    });
    
    // Refresh ScrollTrigger after all stats are set up
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // Also refresh after a short delay
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
    };

    initStatsAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [t.home.about.stats, language]); // Re-run when language changes

  return (
    <section id="about" className="section-about">
      <div className="container">
        <div className="about-header">
          <div className="hero-tag" aria-label="tag" style={{ marginBottom: 16 }} dir={isRTL ? 'rtl' : 'ltr'}>
            <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
            {t.home.about.tag}
          </div>
          <h2 className="about-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.about.title}</h2>
          <p className="about-subtext" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.home.about.subtitle}
          </p>
        </div>

        <div className="about-grid">
          <Blob
            width={620}
            height={620}
            top={10}
            left={82}
            translateXPercent={0}
            intensity={0.9}
            blur={36}
            zIndex={0}
            colors={{
              primary: 'rgba(37, 99, 235, 0.88)',
    mid: 'rgba(59, 130, 246, 0.95)',
              outer: 'rgba(147, 197, 253, 0.40)'
            }}
          />
          <div className="about-cards-frame">
            <div className="about-cards">
            {t.home.about.cards.map((card, index) => {
              const icons = [<FaShip key="ship" />, <FaTruck key="truck" />, <FaCogs key="cogs" />, <FaPlane key="plane" />];
              return (
                <div key={card.title} className="service-card">
                  <div className="card-icon" aria-hidden>{icons[index]}</div>
                  <h3 dir={isRTL ? 'rtl' : 'ltr'}>{card.title}</h3>
                  <p dir={isRTL ? 'rtl' : 'ltr'}>{card.description}</p>
                  <div className="card-pill" />
                </div>
              );
            })}
            </div>
          </div>
        </div>

        <div className="about-stats" ref={statsRef}>
          {t.home.about.stats.map((stat, index) => {
            // Extract number and format for data attributes
            let targetValue = '';
            let suffix = '';
            let dataTarget = '';
            
            if (stat.number.includes('k+')) {
              const num = stat.number.split('k+')[0];
              targetValue = num;
              suffix = 'k+';
              dataTarget = (parseFloat(num) * 1000).toString();
            } else if (stat.number.includes('+')) {
              const num = stat.number.split('+')[0];
              targetValue = num;
              suffix = '+';
              dataTarget = num;
            } else {
              // Handle decimal numbers like "4.8"
              targetValue = stat.number;
              dataTarget = stat.number;
              // Check if it's a decimal
              if (stat.number.includes('.')) {
                // Keep as is, will be handled by decimalPlaces calculation
              }
            }
            
            return (
              <div key={stat.label} className="stat">
                <div 
                  className="stat-number" 
                  data-target={dataTarget}
                  data-suffix={suffix}
                  data-has-kplus={stat.number.includes('k+') ? 'true' : 'false'}
                >
                  {stat.number.includes('k+') ? (
                    <>
                      <span className="stat-number-value">0</span><span className="stat-number-suffix">k+</span>
                    </>
                  ) : stat.number.includes('.') ? (
                    '0.' + '0'.repeat(stat.number.split('.')[1]?.length || 0)
                  ) : (
                    '0' + suffix
                  )}
                </div>
                <div className="stat-label" dir={isRTL ? 'rtl' : 'ltr'}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



"use client";

import Blob from './Blob';
import { FaShip, FaTruck, FaCogs, FaPlane } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
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

        <div className="about-stats">
          {t.home.about.stats.map((stat, index) => (
            <div key={stat.label} className="stat">
              <div className="stat-number">
                {stat.number.includes('k+') ? (
                  <>
                    {stat.number.split('k+')[0]}<span>k+</span>
                  </>
                ) : (
                  stat.number
                )}
              </div>
              <div className="stat-label" dir={isRTL ? 'rtl' : 'ltr'}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



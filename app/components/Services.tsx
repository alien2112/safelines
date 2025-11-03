"use client";

import Blob from './Blob';
import { FaTools, FaBoxOpen, FaShip, FaInbox, FaChartBar } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

export function ServicesSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  return (
    <section id="services" className="section-services">
      <div className="container services-container">
        {/* Outer faint pinkish layer */}
        <Blob
          width={1200}
          height={560}
          top={20}
          left={35}
          translateXPercent={10}
          intensity={0.50}
          blur={50}
          zIndex={0}
          colors={{
            primary: 'rgba(255, 99, 132, 0.06)',
            mid: 'rgba(255, 153, 204, 0.06)',
            outer: 'rgba(255, 192, 203, 0.10)'
          }}
        />
        {/* Inner blue layer */}
        <Blob
          width={1000}
          height={520}
          top={40}
          left={50}
          translateXPercent={10}
          intensity={0.32}
          blur={80}
          zIndex={1}
          colors={{
            primary: 'rgba(59, 130, 246, 0.22)',
            mid: 'rgba(96, 165, 250, 0.20)',
            outer: 'rgba(191, 219, 254, 0.16)'
          }}
        />
        <div className="services-header">
          <h2 className="services-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.services.title}</h2>
          <ul className="services-bullets" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.home.services.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="services-cards-frame">
          <div className="services-grid">
          {t.home.services.cards.map((card, index) => {
            const icons = [<FaTools key="tools" />, <FaBoxOpen key="box" />, <FaShip key="ship" />, <FaInbox key="inbox" />, <FaChartBar key="chart" />];
            return (
              <article key={card.title} className="svc-card">
                <div className="svc-icon" aria-hidden>{icons[index]}</div>
                <h3 className="svc-title" dir={isRTL ? 'rtl' : 'ltr'}>{card.title}</h3>
                <p className="svc-desc" dir={isRTL ? 'rtl' : 'ltr'}>{card.description}</p>
              </article>
            );
          })}
          </div>
        </div>

        <div className="services-chips">
          {t.home.services.chips.map((chip, index) => {
            const chipIcons = [
              <svg key="0" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 17l4-4 4 3 4-7 4 5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="4" cy="17" r="2" fill="#000000"/>
                <circle cx="8" cy="13" r="2" fill="#000000"/>
                <circle cx="12" cy="16" r="2" fill="#000000"/>
                <circle cx="16" cy="9" r="2" fill="#000000"/>
                <circle cx="20" cy="14" r="2" fill="#000000"/>
              </svg>,
              <svg key="1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5a7 7 0 017 7c-1.8 3.2-4.6 5-7 5s-5.2-1.8-7-5a7 7 0 017-7z" stroke="#000000" strokeWidth="2"/>
                <circle cx="12" cy="12" r="2.5" fill="#000000"/>
              </svg>,
              <svg key="2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6v12M6 12h12" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="6" stroke="#000000" strokeWidth="2"/>
              </svg>,
              <svg key="3" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="#000000" strokeWidth="2"/>
                <rect x="10" y="10" width="6" height="10" rx="1.5" stroke="#000000" strokeWidth="2"/>
                <rect x="16" y="6" width="4" height="14" rx="1.2" stroke="#000000" strokeWidth="2"/>
              </svg>,
              <svg key="4" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h6l3-6 3 10 3-5h3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
            ];
            return (
              <div key={chip.label} className="svc-chip">
                <span className="chip-icon" aria-hidden>{chipIcons[index]}</span>
                <span className="chip-label" dir={isRTL ? 'rtl' : 'ltr'}>{chip.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}




"use client";

import React from 'react';
import Link from 'next/link';
import Blob from './Blob';
import { useLanguage } from '../contexts/LanguageContext';
import { COMPANY_EMAIL } from '../lib/constants';

export default function FAQSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [emailHref, setEmailHref] = React.useState(`mailto:${COMPANY_EMAIL}`);
  
  // Set the email link to use MAPI on Windows
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isWindows = navigator.platform.toLowerCase().includes('win') || 
                        navigator.userAgent.toLowerCase().includes('windows');
      
      if (isWindows) {
        // Use MAPI protocol for Windows (Outlook registers this)
        setEmailHref(`mapi:mailto:${COMPANY_EMAIL}`);
      }
    }
  }, []);
  
  const items = t.home.faq.items.map((item, index) => ({
    id: `q${index + 1}`,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <section className="section-faq" id="faq">
      <Blob
        width={600}
        height={350}
        top={200}
        left={50}
        translateXPercent={50}
        intensity={0.2}
        blur={100}
        zIndex={0}
        colors={{
          primary: 'rgba(236,72,153,0.42)', /* pink-500 */
          mid: 'rgba(244,114,182,0.32)',     /* pink-400 */
          outer: 'rgba(251,207,232,0.24)',   /* pink-200 */
        }}
      />
      <div className="container">
        <div className="faq-top">
          <div className="faq-heading">
            <h2 className="faq-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.faq.title}</h2>
            <p className="faq-subtext" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.home.faq.subtitle}
            </p>
          </div>
          <Link className="faq-cta" href="/contact" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.faq.cta}</Link>
        </div>

        <div className="faq-grid">
          {items.map((item) => {
            const expanded = openId === item.id;
            return (
              <div key={item.id} className={`faq-card${expanded ? ' open' : ''}`}>
                <div className="faq-accordion-item">
                  <button
                    className="faq-item"
                    id={item.id}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${item.id}-panel`}
                    onClick={() => setOpenId(expanded ? null : item.id)}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <span className="faq-q">{item.question}</span>
                    <span className="faq-plus" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`${item.id}-panel`}
                    role="region"
                    aria-labelledby={item.id}
                    className={`faq-panel${expanded ? ' open' : ''}`}
                  >
                    <p className="faq-a" dir={isRTL ? 'rtl' : 'ltr'}>{item.answer ?? ''}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-mail">
          <a 
            className="mail-pill" 
            href={emailHref}
            aria-label="Email" 
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <span className="mail-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <polyline points="3,7 12,13 21,7"/>
              </svg>
            </span>
            {t.home.faq.mail}
          </a>
        </div>
      </div>
    </section>
  );
}



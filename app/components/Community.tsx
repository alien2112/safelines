"use client";

import React from 'react';
import Blob from './Blob';
import { useLanguage } from '../contexts/LanguageContext';

export default function CommunitySection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  return (
    <section className="section-community">
      <Blob
        width={500}
        height={380}
        top={250}
        left={50}
        translateXPercent={50}
        intensity={0.18}
        blur={80}
        zIndex={0}
        colors={{
          primary: 'rgba(244,114,182,0.18)', // lighter pink
          mid: 'rgba(236,72,153,0.14)',
          outer: 'rgba(219,39,119,0.08)',
        }}
      />
      <div className="container">
        <div className="community-header">
          <div className="hero-tag" aria-label="tag" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.tag}</div>
          <div className="section-title-row">
            <span className="side-line" aria-hidden="true" />
            <h2 className="community-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.title}</h2>
            <span className="side-line" aria-hidden="true" />
          </div>
          <p className="community-sub" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.subtitle}</p>
        </div>

        <div className="community-grid">
          <a className="community-card" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <div className="comm-card-inner">
              <span className="comm-arrow" aria-hidden>
                <svg className="arrow-a" viewBox="0 0 24 24" fill="none">
                  <path d="M8 8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg className="arrow-b" viewBox="0 0 24 24" fill="none">
                  <path d="M8 8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="comm-header">
                <span className="comm-avatar" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#311081" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" stroke="#311081" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="#311081" />
                  </svg>
                </span>
                <h3 className="comm-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.discord.title}</h3>
              </div>
              <div className="comm-divider" />
              <p className="comm-desc" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.discord.description}</p>
              <div className="comm-meta" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className="comm-badge">{t.home.community.discord.members}</span>
                <span className="comm-badge">{t.home.community.discord.community}</span>
              </div>
            </div>
          </a>

          <a className="community-card" href="https://x.com/home" target="_blank" rel="noreferrer">
            <div className="comm-card-inner">
              <span className="comm-arrow" aria-hidden>
                <svg className="arrow-a" viewBox="0 0 24 24" fill="none">
                  <path d="M8 8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg className="arrow-b" viewBox="0 0 24 24" fill="none">
                  <path d="M8 8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="comm-header">
                <span className="comm-avatar" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M18 5L6 19M6 5l12 14" stroke="#311081" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <h3 className="comm-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.twitter.title}</h3>
              </div>
              <div className="comm-divider" />
              <p className="comm-desc" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.twitter.description}</p>
              <div className="comm-meta" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className="comm-badge">{t.home.community.twitter.followers}</span>
                <span className="comm-badge">{t.home.community.twitter.community}</span>
              </div>
            </div>
          </a>
        </div>

        <div className="community-socials" dir={isRTL ? 'rtl' : 'ltr'}>
          <span className="socials-label">{t.home.community.socials}</span>
          <a className="social-pill" href="https://x.com/home" target="_blank" rel="noreferrer" aria-label="Twitter/X">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M18 5L6 19M6 5l12 14" stroke="#311081" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </a>
          <span className="social-sep" />
          <a className="social-pill" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="#311081" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="#311081" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="#311081" />
              </svg>
            </span>
          </a>
          <span className="social-sep" />
          <a className="social-pill" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.1l.4-3H14V9z" fill="#311081" />
              </svg>
            </span>
          </a>
          
        </div>
      </div>
    </section>
  );
}



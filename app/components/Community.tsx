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
          <div className="community-content">
            <div className="hero-tag" aria-label="tag" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.tag}</div>
            <div className="community-title-wrapper">
              <span className="community-side left" />
              <h2 className="community-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.title}</h2>
              <span className="community-side right" />
            </div>
            <p className="community-sub" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.community.subtitle}</p>
          </div>
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
          <a className="social-pill" href="https://www.tiktok.com/@safe.lines.cc?_r=1&_t=ZS-919CqwjHVxv" target="_blank" rel="noreferrer" aria-label="TikTok">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M14 3c.6 2.5 2.4 4.1 5 4.5v3.1c-1.7-.1-3.2-.7-4.6-1.7v6.2c0 3-2.3 5.4-5.3 5.6-3.2.2-5.9-2.4-5.9-5.6 0-3.2 2.6-5.6 5.8-5.6.4 0 .8 0 1.2.1v3a3 3 0 0 0-1.2-.2c-1.5 0-2.8 1.2-2.8 2.7s1.3 2.7 2.8 2.7 2.8-1.2 2.8-2.7V3h1.2z" fill="#311081"/>
              </svg>
            </span>
          </a>
          <span className="social-sep" />
          <a className="social-pill" href="https://www.facebook.com/share/1QGEmUCJEo/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M14 9h2.5V6.5H14c-2 0-3 1.3-3 3V12H8v2.5h3V21h2.5v-6.5H17V12h-3V9z" fill="#311081" />
              </svg>
            </span>
          </a>
          <span className="social-sep" />
          <a className="social-pill" href="https://www.instagram.com/safelinescc?utm_source=qr&igsh=eXowdHc1aXRuNzV1" target="_blank" rel="noreferrer" aria-label="Instagram">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="4" y="4" width="16" height="16" rx="5" stroke="#311081" strokeWidth="2" />
                <circle cx="12" cy="12" r="3.5" stroke="#311081" strokeWidth="2" />
                <circle cx="17" cy="7" r="1" fill="#311081" />
              </svg>
            </span>
          </a>
          <span className="social-sep" />
          <a className="social-pill" href="https://x.com/Safelinescc?t=b38UQ50-9o1wZM18Kg3-jQ&s=09" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 4l16 16M20 4L4 20" stroke="#311081" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </span>
          </a>
          <span className="social-sep" />
          <a className="social-pill" href="https://www.snapchat.com/@lkhtwtlamnhlltk?share_id=NPjZZrZHtaw&locale=ar-SA" target="_blank" rel="noreferrer" aria-label="Snapchat">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3c3 0 5 2.2 5 5.2 0 1.9 1.2 3.6 3 4.1-.4 1.2-1.7 1.9-3 1.9-.3 1.2-1.6 2.4-3.2 2.7-1 .2-1.7.4-1.8.9-.1.6.6 1.1 2.3 1.3-.6.8-1.8 1.3-3.3 1.3s-2.7-.5-3.3-1.3c1.7-.2 2.4-.7 2.3-1.3-.1-.5-.8-.7-1.8-.9-1.6-.3-2.9-1.5-3.2-2.7-1.3 0-2.6-.7-3-1.9 1.8-.5 3-2.2 3-4.1C7 5.2 9 3 12 3z" fill="#311081"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}



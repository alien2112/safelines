"use client";

import React from 'react';
import Blob from './Blob';
import { useLanguage } from '../contexts/LanguageContext';

export default function CommunitySection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const cardsContent = t.home.community.cards;
  type CardContent = (typeof cardsContent)[number];

  type PlatformCard = {
    id: string;
    href: string;
    icon: React.ReactNode;
    accent?: string;
    avatarBg?: string;
  };

  const platformCards: PlatformCard[] = [
    {
      id: 'instagram',
      href: 'https://www.instagram.com/safelinescc?utm_source=qr&igsh=eXowdHc1aXRuNzV1',
      accent: '#E1306C',
      avatarBg: 'rgba(225,48,108,0.08)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="5" stroke="#E1306C" strokeWidth="2" />
          <circle cx="12" cy="12" r="3.5" stroke="#E1306C" strokeWidth="2" />
          <circle cx="17" cy="7" r="1.2" fill="#E1306C" />
        </svg>
      ),
    },
    {
      id: 'twitter',
      href: 'https://x.com/Safelinescc?t=b38UQ50-9o1wZM18Kg3-jQ&s=09',
      accent: '#020814',
      avatarBg: 'rgba(2,8,20,0.08)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M19.6 4h-3.5l-3 4-2.3-4H4.4l5.3 7.3L4 20h3.5l3.2-4.2L14 20h5.9l-5.8-8.1L19.6 4Z" fill="#020814" />
        </svg>
      ),
    },
    {
      id: 'tiktok',
      href: 'https://www.tiktok.com/@safe.lines.cc?_r=1&_t=ZS-919CqwjHVxv',
      accent: '#25F4EE',
      avatarBg: 'rgba(37,244,238,0.08)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 4.5c.7 2.8 2.8 4.5 5.2 4.8v3.3c-1.8-.1-3.4-.7-4.8-1.8v6.7c0 3.2-2.4 5.8-5.6 6S4 20.4 4 17.1s2.7-5.9 6.1-5.9c.4 0 .9 0 1.3.1v3.1c-.4-.1-.8-.2-1.2-.2-1.6 0-3 1.3-3 2.9s1.4 2.9 3 2.9 3-1.3 3-2.9V4.5H15Z"
            fill="#111827"
          />
        </svg>
      ),
    },
    {
      id: 'facebook',
      href: 'https://www.facebook.com/share/1QGEmUCJEo/',
      accent: '#1877F2',
      avatarBg: 'rgba(24,119,242,0.08)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14 9h2.6V6.3H14c-2.2 0-3.3 1.4-3.3 3.2V12H8v2.7h2.7V21h2.6v-6.3h3.1V12h-3.1V9Z"
            fill="#1877F2"
          />
        </svg>
      ),
    },
    {
      id: 'snapchat',
      href: 'https://www.snapchat.com/@lkhtwtlamnhlltk?share_id=NPjZZrZHtaw&locale=ar-SA',
      accent: '#FFFC00',
      avatarBg: 'rgba(255,252,0,0.14)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3.5c-3 0-5.5 2.4-5.5 5.4V10c0 1.6-.9 3.1-2.3 3.9-.2.1-.3.3-.2.5.3.8 1.2 1.3 2.3 1.4.2 1.2 1.2 2.4 2.6 3 .5.2.8.4.8.6 0 .3-.3.5-.9.6-.6.1-.9.4-.9.7 0 .2.1.4.3.6.9.7 2.4 1.1 3.8 1.1s2.9-.4 3.8-1.1c.2-.2.3-.4.3-.6 0-.3-.3-.6-.9-.7-.6-.1-.9-.3-.9-.6 0-.2.3-.4.8-.6 1.4-.6 2.4-1.8 2.6-3 1.2-.1 2-.6 2.3-1.4.1-.2 0-.4-.2-.5-1.4-.8-2.3-2.3-2.3-3.9V8.9c0-3-2.5-5.4-5.5-5.4Z"
            stroke="#020814"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9.6" cy="11.2" r="0.8" fill="#020814" />
          <circle cx="14.4" cy="11.2" r="0.8" fill="#020814" />
          <path d="M10.3 14.9c.5.5 1.1.7 1.7.7s1.2-.2 1.7-.7" stroke="#020814" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      href: 'https://wa.me/966555005350',
      accent: '#25D366',
      avatarBg: 'rgba(37,211,102,0.14)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2.5a9.5 9.5 0 0 0-8.3 14.4L3 21l4.1-1.3A9.5 9.5 0 1 0 12 2.5Z" stroke="#25D366" strokeWidth="1.6" />
          <path
            d="M15.5 13.8c-.2-.1-1.3-.6-1.4-.7s-.3-.1-.5.1c-.2.2-.6.7-.7.8-.1.1-.3.1-.5 0-.2-.1-1-.3-1.8-1.1-.7-.7-1.1-1.4-1.2-1.6-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.3 0-.1 0-.2 0-.4s-.4-1.1-.6-1.6c-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.5.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.1.9 2.3.1.2 1.5 2.3 3.5 3.2.5.2.9.4 1.2.4.5.1.9.1 1.3.1.4 0 1.2-.5 1.4-1 .2-.5.2-1 .2-1-.1-.1-.2-.2-.4-.3Z"
            fill="#25D366"
          />
        </svg>
      ),
    },
  ];

  const contentMap = cardsContent.reduce<Record<string, CardContent>>((acc, card) => {
    acc[card.id] = card;
    return acc;
  }, {});

  const socialCards = platformCards
    .map((platform) => {
      const content = contentMap[platform.id];
      if (!content) return null;
      return { ...platform, content };
    })
    .filter(
      (card): card is PlatformCard & { content: CardContent } =>
        card !== null
    );

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
          {socialCards.map((card) => (
            <a
              key={card.id}
              className="community-card"
              href={card.href}
              target="_blank"
              rel="noreferrer"
              aria-label={card.content.title}
            >
              <div className="comm-card-inner">
                <span className="comm-arrow" aria-hidden>
                  <svg className="arrow-a" viewBox="0 0 24 24" fill="none">
                    <path d="M8 8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg className="arrow-b" viewBox="0 0 24 24" fill="none">
                    <path d="M8 8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="comm-header">
                  <span
                    className="comm-avatar"
                    aria-hidden="true"
                    style={{
                      borderColor: card.accent,
                      background: card.avatarBg,
                    }}
                  >
                    {card.icon}
                  </span>
                  <h3 className="comm-title" dir={isRTL ? 'rtl' : 'ltr'}>
                    {card.content.title}
                  </h3>
                </div>
                <div className="comm-divider" />
                <p className="comm-desc" dir={isRTL ? 'rtl' : 'ltr'}>
                  {card.content.description}
                </p>
                <div className="comm-meta" dir={isRTL ? 'rtl' : 'ltr'}>
                  {card.content.stats.map((stat) => (
                    <span className="comm-badge" key={`${card.id}-${stat}`}>
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="community-socials" dir={isRTL ? 'rtl' : 'ltr'}>
          <span className="socials-label">{t.home.community.socials}</span>
        </div>
      </div>
    </section>
  );
}



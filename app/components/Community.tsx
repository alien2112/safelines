"use client";

import React from 'react';
import Blob from './Blob';

export default function CommunitySection() {
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
          <span className="community-side left" />
          <div>
            <div className="hero-tag" aria-label="tag">COMMUNITY</div>
            <h2 className="community-title">Check our community</h2>
            <p className="community-sub">Participate in our Discord group to network with other individuals. Here, you're invited to inquire, discuss, and open support requests.</p>
          </div>
          <span className="community-side right" />
        </div>

        <div className="community-grid">
          <a className="community-card" href="https://discord.com/" target="_blank" rel="noreferrer">
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
                    <path d="M7.5 7.8c2.2-1.6 6.8-1.6 9 0 .5 1.5.8 3 .8 4.5-1 1-2.1 1.7-3.3 2 .2-.7.3-1.4.3-2.1-1 .1-2 .1-3 .1s-2 0-3-.1c0 .7.1 1.4.3 2.1-1.2-.3-2.3-1-3.3-2 0-1.5.3-3 .9-4.5z" stroke="#311081" strokeWidth="1.6"/>
                    <circle cx="9" cy="13.5" r=".8" fill="#311081"/>
                    <circle cx="15" cy="13.5" r=".8" fill="#311081"/>
                  </svg>
                </span>
                <h3 className="comm-title">Discord</h3>
              </div>
              <div className="comm-divider" />
              <p className="comm-desc">Join our Discord and connect with social media creators, enthusiasts, share ideas, and grow together.</p>
              <div className="comm-meta">
                <span className="comm-badge">15k members</span>
                <span className="comm-badge">Community</span>
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
                <h3 className="comm-title">Twitter</h3>
              </div>
              <div className="comm-divider" />
              <p className="comm-desc">Join our Twitter, where we share our updates and also lot of guides, tips with guests who already excelled.</p>
              <div className="comm-meta">
                <span className="comm-badge">25k followers</span>
                <span className="comm-badge">Community</span>
              </div>
            </div>
          </a>
        </div>

        <div className="community-socials">
          <span className="socials-label">Socials :</span>
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
          <span className="social-sep" />
          <a className="social-pill" href="https://dribbble.com/" target="_blank" rel="noreferrer" aria-label="Dribbble">
            <span className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="#311081" strokeWidth="2" />
                <path d="M5 9c3 .5 9 .3 14-3" stroke="#311081" strokeWidth="2" />
                <path d="M6 17c3-5 6-7 12-6" stroke="#311081" strokeWidth="2" />
                <path d="M9 4c3 3 6 9 6 16" stroke="#311081" strokeWidth="2" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}



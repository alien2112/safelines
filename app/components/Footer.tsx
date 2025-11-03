"use client";

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  return (
    <footer className="footer">
      <div className="container">
        {/* Top row: nav left, socials right */}
        <div className="footer-top">
          <nav className="footer-links" aria-label="footer" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.home.footer.links.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="footer-social" aria-label="social links">
            <button className="footer-icon" aria-label="X">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="footer-sep" />
            <button className="footer-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="17" cy="7" r="1" fill="currentColor"/>
              </svg>
            </button>
            <span className="footer-sep" />
            <button className="footer-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 9h2.5V6.5H14c-2 0-3 1.3-3 3V12H8v2.5h3V21h2.5v-6.5H17V12h-3V9z" fill="currentColor"/>
              </svg>
            </button>
            <span className="footer-sep" />
            <button className="footer-icon" aria-label="Dribbble">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M5 9c4 .5 8 .3 12-1M6 16c3-3 7-4 11-3M9 4c3 3 6 9 6 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        
      </div>
    </footer>
  );
}



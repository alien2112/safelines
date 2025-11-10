"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  
  React.useEffect(() => {
    const onRoute = () => setOpen(false);
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', onRoute);
    }
    return () => { if (typeof window !== 'undefined') window.removeEventListener('hashchange', onRoute); };
  }, []);

  const handleMobileLinkClick = React.useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    router.push(href);
  }, [router]);

  const handleCloseMenu = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  }, []);


  const navLinks = {
    en: {
      home: 'Home',
      about: 'About us',
      services: 'Services',
      blog: 'Blog',
      contactUs: 'Contact Us',
      requestService: 'Request Service',
    },
    ar: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      blog: 'المدونة',
      contactUs: 'اتصل بنا',
      requestService: 'اطلب الخدمة',
    },
  };

  const currentNavLinks = navLinks[language];
  
  // Social media links with SVG icons - matching footer links
  const socialLinks = [
    { 
      name: 'TikTok', 
      url: 'https://www.tiktok.com/@safe.lines.cc?_r=1&_t=ZS-919CqwjHVxv', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M14 3c.6 2.5 2.4 4.1 5 4.5v3.1c-1.7-.1-3.2-.7-4.6-1.7v6.2c0 3-2.3 5.4-5.3 5.6-3.2.2-5.9-2.4-5.9-5.6 0-3.2 2.6-5.6 5.8-5.6.4 0 .8 0 1.2.1v3a3 3 0 0 0-1.2-.2c-1.5 0-2.8 1.2-2.8 2.7s1.3 2.7 2.8 2.7 2.8-1.2 2.8-2.7V3h1.2z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/share/1QGEmUCJEo/', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M14 9h2.5V6.5H14c-2 0-3 1.3-3 3V12H8v2.5h3V21h2.5v-6.5H17V12h-3V9z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/safelinescc?utm_source=qr&igsh=eXowdHc1aXRuNzV1', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="17" cy="7" r="1" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'X (Twitter)', 
      url: 'https://x.com/Safelinescc?t=b38UQ50-9o1wZM18Kg3-jQ&s=09', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      name: 'Snapchat', 
      url: 'https://www.snapchat.com/@lkhtwtlamnhlltk?share_id=NPjZZrZHtaw&locale=ar-SA', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M12 3c3 0 5 2.2 5 5.2 0 1.9 1.2 3.6 3 4.1-.4 1.2-1.7 1.9-3 1.9-.3 1.2-1.6 2.4-3.2 2.7-1 .2-1.7.4-1.8.9-.1.6.6 1.1 2.3 1.3-.6.8-1.8 1.3-3.3 1.3s-2.7-.5-3.3-1.3c1.7-.2 2.4-.7 2.3-1.3-.1-.5-.8-.7-1.8-.9-1.6-.3-2.9-1.5-3.2-2.7-1.3 0-2.6-.7-3-1.9 1.8-.5 3-2.2 3-4.1C7 5.2 9 3 12 3z"/>
        </svg>
      )
    },
  ];

  return (
    <div className="nav-outer">
      <nav className="nav-container">
        <div className="nav-left">
          <Link href="/" className="nav-logo" aria-label="Go to homepage">
            <img src="/safelines_logo-removebg-preview.png" alt="Safelines logo" className="nav-logo-img" />
          </Link>
        </div>
        <button className="nav-menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </span>
        </button>
        <ul className="nav-links" role="menubar">
          <li role="none">
            <Link 
              role="menuitem" 
              href="/" 
              className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
            >
              {currentNavLinks.home}
            </Link>
          </li>
          <li role="none">
            <Link 
              role="menuitem" 
              href="/about" 
              className={`nav-link ${pathname === '/about' ? 'nav-link-active' : ''}`}
            >
              {currentNavLinks.about}
            </Link>
          </li>
          <li role="none">
            <Link 
              role="menuitem" 
              href="/services" 
              className={`nav-link ${pathname === '/services' ? 'nav-link-active' : ''}`}
            >
              {currentNavLinks.services}
            </Link>
          </li>
          <li role="none">
            <Link 
              role="menuitem" 
              href="/blog" 
              className={`nav-link ${pathname === '/blog' ? 'nav-link-active' : ''}`}
            >
              {currentNavLinks.blog}
            </Link>
          </li>
          <li role="none">
            <Link 
              role="menuitem" 
              href="/contact" 
              className={`nav-link ${pathname === '/contact' ? 'nav-link-active' : ''}`}
            >
              {currentNavLinks.contactUs}
            </Link>
          </li>
        </ul>
        <div className="nav-right">
          <div className="nav-social">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-social-link"
                aria-label={social.name}
                title={social.name}
              >
                <span className="nav-social-icon">{social.icon}</span>
              </a>
            ))}
          </div>
          <div className="nav-lang-wrapper">
            <button
              className="nav-lang-toggle"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              aria-label="Toggle language"
              title={language === 'ar' ? 'English' : 'العربية'}
            >
              <span className="nav-lang-text">{language === 'ar' ? 'عربي' : 'AR'}</span>
            </button>
          </div>
        </div>
      </nav>
      {open && (
        <div className="nav-mobile" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="nav-mobile-card" onClick={(e) => e.stopPropagation()}>
            <div className="nav-mobile-header">
              <button 
                type="button"
                className="nav-mobile-logo" 
                onClick={(e) => handleMobileLinkClick(e, '/')} 
                aria-label="Go to homepage"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                <img src="/safelines_logo-removebg-preview.png" alt="Safelines logo" className="nav-mobile-logo-img" />
              </button>
              <button 
                type="button"
                className="nav-mobile-close" 
                aria-label="Close menu" 
                onClick={handleCloseMenu}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="nav-mobile-links">
              <button 
                type="button"
                className={`nav-mobile-link ${pathname === '/' ? 'nav-mobile-link-active' : ''}`}
                onClick={(e) => handleMobileLinkClick(e, '/')}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  width: '100%', 
                  textAlign: language === 'ar' ? 'right' : 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {currentNavLinks.home}
              </button>
              <button 
                type="button"
                className={`nav-mobile-link ${pathname === '/about' ? 'nav-mobile-link-active' : ''}`}
                onClick={(e) => handleMobileLinkClick(e, '/about')}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  width: '100%', 
                  textAlign: language === 'ar' ? 'right' : 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {currentNavLinks.about}
              </button>
              <button 
                type="button"
                className={`nav-mobile-link ${pathname === '/services' ? 'nav-mobile-link-active' : ''}`}
                onClick={(e) => handleMobileLinkClick(e, '/services')}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  width: '100%', 
                  textAlign: language === 'ar' ? 'right' : 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {currentNavLinks.services}
              </button>
              <button 
                type="button"
                className={`nav-mobile-link ${pathname === '/blog' ? 'nav-mobile-link-active' : ''}`}
                onClick={(e) => handleMobileLinkClick(e, '/blog')}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  width: '100%', 
                  textAlign: language === 'ar' ? 'right' : 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {currentNavLinks.blog}
              </button>
              <button 
                type="button"
                className={`nav-mobile-link ${pathname === '/contact' ? 'nav-mobile-link-active' : ''}`}
                onClick={(e) => handleMobileLinkClick(e, '/contact')}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  width: '100%', 
                  textAlign: language === 'ar' ? 'right' : 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {currentNavLinks.contactUs}
              </button>
            </nav>
            <div className="nav-mobile-actions">
              <div className="nav-mobile-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-mobile-social-link"
                    aria-label={social.name}
                    title={social.name}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="nav-mobile-social-icon">{social.icon}</span>
                  </a>
                ))}
              </div>
              <button
                type="button"
                className="nav-mobile-lang-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLanguage(language === 'ar' ? 'en' : 'ar');
                  // Delay closing to ensure language change takes effect
                  setTimeout(() => setOpen(false), 100);
                }}
                aria-label="Toggle language"
              >
                {language === 'ar' ? 'عربي' : 'AR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



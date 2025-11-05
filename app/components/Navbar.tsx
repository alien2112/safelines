"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  
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
  return (
    <div className="nav-outer">
      <nav className="nav-container">
        <div className="nav-left">
          <Link href="/" className="nav-logo" aria-label="Go to homepage">
            <img src="/safelines_logo-removebg-preview.png" alt="Safelines logo" className="nav-logo-img" />
          </Link>
          <span className="nav-separator" aria-hidden="true"></span>
        </div>
        <button className="nav-menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18" />
            </svg>
          </span>
        </button>
        <ul className="nav-links" role="menubar">
          <li role="none"><Link role="menuitem" href="/" className="nav-link">{currentNavLinks.home}</Link></li>
          <li role="none"><Link role="menuitem" href="/about" className="nav-link">{currentNavLinks.about}</Link></li>
          <li role="none"><Link role="menuitem" href="/services" className="nav-link">{currentNavLinks.services}</Link></li>
          <li role="none"><Link role="menuitem" href="/blog" className="nav-link">{currentNavLinks.blog}</Link></li>
          <li role="none"><Link role="menuitem" href="/contact" className="nav-link">{currentNavLinks.contactUs}</Link></li>
        </ul>
        <div className="nav-right">
          <button
            className="nav-lang-toggle"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            aria-label="Toggle language"
            title={language === 'ar' ? 'English' : 'العربية'}
          >
            {language === 'ar' ? 'EN' : 'AR'}
          </button>
          <Link href="/contact" className="nav-cta">
            <svg className="nav-cta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M3.6 12h16.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M12 3a17 17 0 0 0 0 18M12 3a17 17 0 0 1 0 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            {currentNavLinks.requestService}
          </Link>
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
                onClick={() => setOpen(false)}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="nav-mobile-links">
              <button 
                type="button"
                className="nav-mobile-link" 
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
                className="nav-mobile-link" 
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
                className="nav-mobile-link" 
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
                className="nav-mobile-link" 
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
                className="nav-mobile-link" 
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
                {language === 'ar' ? 'English' : 'العربية'}
              </button>
              <button
                type="button"
                className="nav-mobile-cta-primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                  router.push('/contact');
                }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: 'linear-gradient(90deg, #3B82F6, #2563EB)',
                  color: '#fff',
                  padding: '14px 20px',
                  borderRadius: '16px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(37,99,235,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  fontFamily: 'inherit'
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3.6 12h16.8" strokeLinecap="round" />
                  <path d="M12 3a17 17 0 0 0 0 18M12 3a17 17 0 0 1 0 18" strokeLinecap="round" />
                </svg>
                {currentNavLinks.requestService}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



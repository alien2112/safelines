"use client";

import React from 'react';
import Link from 'next/link';

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onRoute = () => setOpen(false);
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', onRoute);
    }
    return () => { if (typeof window !== 'undefined') window.removeEventListener('hashchange', onRoute); };
  }, []);
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
          <li role="none"><Link role="menuitem" href="/" className="nav-link">Home</Link></li>
          <li role="none"><Link role="menuitem" href="#about" className="nav-link">About us</Link></li>
          <li role="none"><Link role="menuitem" href="#services" className="nav-link">Services</Link></li>
          <li role="none"><Link role="menuitem" href="#blog" className="nav-link">Blog</Link></li>
        </ul>
        <div className="nav-right">
          <Link href="/contact" className="nav-cta">
            <svg className="nav-cta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M3.6 12h16.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M12 3a17 17 0 0 0 0 18M12 3a17 17 0 0 1 0 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Connect us
          </Link>
        </div>
      </nav>
      {open && (
        <div className="nav-mobile" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="nav-mobile-card" onClick={(e) => e.stopPropagation()}>
            <div className="nav-mobile-header">
              <Link href="/" className="nav-mobile-logo" onClick={() => setOpen(false)} aria-label="Go to homepage">
                <img src="/safelines_logo-removebg-preview.png" alt="Safelines logo" className="nav-mobile-logo-img" />
              </Link>
              <button className="nav-mobile-close" aria-label="Close menu" onClick={() => setOpen(false)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="nav-mobile-links">
              <Link href="/" className="nav-mobile-link" onClick={() => setOpen(false)}>Home</Link>
              <Link href="#about" className="nav-mobile-link" onClick={() => setOpen(false)}>About us</Link>
              <Link href="#services" className="nav-mobile-link" onClick={() => setOpen(false)}>Services</Link>
              <Link href="#blog" className="nav-mobile-link" onClick={() => setOpen(false)}>Blog</Link>
            </nav>
            <div className="nav-mobile-actions">
              <Link href="/contact" className="nav-mobile-cta-primary" onClick={() => setOpen(false)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3.6 12h16.8" strokeLinecap="round" />
                  <path d="M12 3a17 17 0 0 0 0 18M12 3a17 17 0 0 1 0 18" strokeLinecap="round" />
                </svg>
                Connect us
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



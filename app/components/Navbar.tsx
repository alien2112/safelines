import Link from 'next/link';

export function Navbar() {
  return (
    <div className="nav-outer">
      <nav className="nav-container">
        <div className="nav-left">
          <Link href="/" className="nav-logo" aria-label="Go to homepage">
            <img src="/safelines_logo-removebg-preview.png" alt="Safelines logo" className="nav-logo-img" />
          </Link>
          <span className="nav-separator" aria-hidden="true"></span>
        </div>
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
    </div>
  );
}



import Blob from './Blob';
import { FaTools, FaBoxOpen, FaShip, FaInbox, FaChartBar } from 'react-icons/fa';

export function ServicesSection() {
  return (
    <section id="services" className="section-services">
      <div className="container services-container">
        {/* Outer faint pinkish layer */}
        <Blob
          width={1200}
          height={560}
          top={20}
          left={35}
          translateXPercent={10}
          intensity={0.50}
          blur={50}
          zIndex={0}
          colors={{
            primary: 'rgba(255, 99, 132, 0.06)',
            mid: 'rgba(255, 153, 204, 0.06)',
            outer: 'rgba(255, 192, 203, 0.10)'
          }}
        />
        {/* Inner blue layer */}
        <Blob
          width={1000}
          height={520}
          top={40}
          left={50}
          translateXPercent={10}
          intensity={0.32}
          blur={80}
          zIndex={1}
          colors={{
            primary: 'rgba(59, 130, 246, 0.22)',
            mid: 'rgba(96, 165, 250, 0.20)',
            outer: 'rgba(191, 219, 254, 0.16)'
          }}
        />
        <div className="services-header">
          <h2 className="services-title">Services</h2>
          <ul className="services-bullets">
            <li>Compliance with specifications and quality</li>
            <li>customs clearance</li>
          </ul>
        </div>

        <div className="services-cards-frame">
          <div className="services-grid">
          {SVC_CARDS.map((c) => (
            <article key={c.title} className="svc-card">
              <div className="svc-icon" aria-hidden>{c.icon}</div>
              <h3 className="svc-title">{c.title}</h3>
              <p className="svc-desc">{c.desc}</p>
            </article>
          ))}
          </div>
        </div>

        <div className="services-chips">
          {SVC_CHIPS.map((c) => (
            <div key={c.label} className="svc-chip">
              <span className="chip-icon" aria-hidden>{c.icon}</span>
              <span className="chip-label">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SVC_CARDS = [
  { icon: <FaTools />, title: 'customs clearance', desc: 'Turn raw data into actionable insights that smarter decisions and measurable growth.' },
  { icon: <FaBoxOpen />, title: 'Packaging', desc: 'Turn raw data into actionable insights that smarter decisions and measurable growth.' },
  { icon: <FaShip />, title: 'Sea freight', desc: 'Work smarter, not harder. Unlock faster results and lower costs with AI-powered efficiency.' },
  { icon: <FaInbox />, title: 'Storage', desc: 'Work smarter, not harder. Unlock faster results and lower costs with AI-powered efficiency.' },
  { icon: <FaChartBar />, title: 'Compliance with specifications and quality', desc: 'Work smarter, not harder. Unlock faster results and lower costs with AI-powered efficiency.' },
];

const SVC_CHIPS = [
  { label: 'Data-Driven Decisions', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 17l4-4 4 3 4-7 4 5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="17" r="2" fill="#000000"/>
        <circle cx="8" cy="13" r="2" fill="#000000"/>
        <circle cx="12" cy="16" r="2" fill="#000000"/>
        <circle cx="16" cy="9" r="2" fill="#000000"/>
        <circle cx="20" cy="14" r="2" fill="#000000"/>
      </svg>
    ) },
  { label: 'Personalized Experiences', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5a7 7 0 017 7c-1.8 3.2-4.6 5-7 5s-5.2-1.8-7-5a7 7 0 017-7z" stroke="#000000" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2.5" fill="#000000"/>
      </svg>
    ) },
  { label: 'Automation', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6v12M6 12h12" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="6" stroke="#000000" strokeWidth="2"/>
      </svg>
    ) },
  { label: 'Scalable Solutions', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="#000000" strokeWidth="2"/>
        <rect x="10" y="10" width="6" height="10" rx="1.5" stroke="#000000" strokeWidth="2"/>
        <rect x="16" y="6" width="4" height="14" rx="1.2" stroke="#000000" strokeWidth="2"/>
      </svg>
    ) },
  { label: 'Real-Time Insights', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12h6l3-6 3 10 3-5h3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
];



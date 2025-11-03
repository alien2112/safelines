import Blob from './Blob';
import { FaShip, FaTruck, FaCogs, FaPlane } from 'react-icons/fa';
export function AboutSection() {
  return (
    <section id="about" className="section-about">
      <div className="container">
        <div className="about-header">
          <div className="hero-tag" aria-label="tag" style={{ marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
            About us
          </div>
          <h2 className="about-title">long experience in our field</h2>
          <p className="about-subtext">
            We have long experience in our field, so we can provide you with
            <br />
            distinguished services
          </p>
        </div>

        <div className="about-grid">
          <Blob
            width={620}
            height={620}
            top={10}
            left={82}
            translateXPercent={0}
            intensity={0.9}
            blur={36}
            zIndex={0}
            colors={{
              primary: 'rgba(37, 99, 235, 0.88)',
    mid: 'rgba(59, 130, 246, 0.95)',
              outer: 'rgba(147, 197, 253, 0.40)'
            }}
          />
          <div className="about-cards-frame">
            <div className="about-cards">
            <div className="service-card">
              <div className="card-icon" aria-hidden><FaShip /></div>
              <h3>Sea freight</h3>
              <p>Shipping by sea is done by ships and steamers of different sizes. Goods are transported in containers, which are large boxes made of strong and weather-resistant materials</p>
              <div className="card-pill" />
            </div>
            <div className="service-card">
              <div className="card-icon" aria-hidden><FaTruck /></div>
              <h3>Land freight</h3>
              <p>The most important means of transportation between neighboring countries and within the country itself, as it is characterized by speed and efficiency in transporting large goods with heavy weights</p>
              <div className="card-pill" />
            </div>
            <div className="service-card">
              <div className="card-icon" aria-hidden><FaCogs /></div>
              <h3>customs clearance</h3>
              <p>Customs clearance is the process of completing customs procedures related to imports of goods into or exports of goods</p>
              <div className="card-pill" />
            </div>
            <div className="service-card">
              <div className="card-icon" aria-hidden><FaPlane /></div>
              <h3>Air freight</h3>
              <p>Air freight is the process of transporting goods and merchandise using aircraft specialized for these purposes.</p>
              <div className="card-pill" />
            </div>
            </div>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat">
            <div className="stat-number">10<span>k+</span></div>
            <div className="stat-label">Happy users</div>
          </div>
          <div className="stat">
            <div className="stat-number">250<span>k+</span></div>
            <div className="stat-label">Total hrs saved</div>
          </div>
          <div className="stat">
            <div className="stat-number">4.8</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}



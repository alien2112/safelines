"use client";

import VideoBackground from '../components/VideoBackground';

export default function ContactPage() {
  return (
    <section className="section-contact" id="contact">
      <VideoBackground src="/2025-11-03 18-02-55.mp4" fixed zIndex={0} scale={1.2} />
      <div className="container contact-grid">
        <div className="contact-left">
          <h2 className="contact-title">Get in touch with Us</h2>
          <ul className="contact-points">
            <li>Effortless Assistance: Connect with our team anytime</li>
            <li>Book a Demo Today: Experience our platform in action</li>
          </ul>

          <div className="contact-cards">
            <div className="contact-card">
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
                </svg>
              </span>
              <h3>Reach Out to Us</h3>
              <p>Need assistance? Drop us a message anytime.</p>
              <a href="mailto:landeros@email.com">landeros@email.com</a>
            </div>
            <div className="contact-card">
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h2.87a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.84.24 1.71.42 2.61.54A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <h3>Call Us</h3>
              <p>Need help? Give us a call—we're here for you.</p>
              <a href="tel:+1234567890">+1234567890</a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            <span>Name</span>
            <input type="text" placeholder="Jane Smith" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" placeholder="jane@example.com" required />
          </label>
          <label>
            <span>Subject of Interest</span>
            <input type="text" placeholder="Subject" />
          </label>
          <label>
            <span>Message</span>
            <textarea placeholder="message goes here..." rows={6} />
          </label>
          <button className="contact-submit" type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}



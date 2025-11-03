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
              <h3>Reach Out to Us</h3>
              <p>Need assistance? Drop us a message anytime.</p>
              <a href="mailto:landeros@email.com">landeros@email.com</a>
            </div>
            <div className="contact-card">
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
          <button className="faq-cta" type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}



"use client";

import dynamic from 'next/dynamic';
import VideoBackground from '../components/VideoBackground';
import { GSAPAnimations } from '../components/GSAPAnimations';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../lib/swr-config';
import { COMPANY_EMAIL } from '../lib/constants';

const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div style={{ minHeight: '200px' }} />
});

export default function ContactPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const { data: services = [], isLoading } = useServices();
  const excludedServiceTitles = [
    'avoiding unnecessary expenses',
    'avoiding unnecessary fees',
    'flexible distribution service',
    'flexible service',
    'تجنب النفقات غير الضرورية',
    'نوفر خدمة توزيع مرنة تتوافق مع احتياجات العملاء',
  ];
  const filteredServices = services
    .filter((service: any) => service?.visible !== false)
    .filter((service: any) => {
      const englishTitle = String(service?.title || '').toLowerCase();
      const arabicTitle = String(service?.titleAr || '').toLowerCase();
      return !excludedServiceTitles.some((excludedTitle) => {
        const normalized = excludedTitle.toLowerCase();
        return englishTitle.includes(normalized) || arabicTitle.includes(normalized);
      });
    })
    .sort((a: any, b: any) => (a?.order || 0) - (b?.order || 0));
  return (
    <>
    <section className="section-contact" id="contact">
      <GSAPAnimations />
      <VideoBackground src="/2025-11-03 18-02-55.mp4" fixed zIndex={0} scale={1.2} />
      <div className="container contact-grid">
        <div className="contact-left">
          <h2 className="contact-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.title}</h2>
          <ul className="contact-points" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.contact.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          <div className="contact-cards">
            <div className="contact-card" dir={isRTL ? 'rtl' : 'ltr'}>
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <h3 dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.email.title}</h3>
              <p dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.email.description}</p>
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </div>
            <div className="contact-card" dir={isRTL ? 'rtl' : 'ltr'}>
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h2.87a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.84.24 1.71.42 2.61.54A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <h3 dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.phone.title}</h3>
              <p dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.phone.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', direction: 'ltr' }}>
                <a href="tel:+966555005350" dir="ltr">(+966) 555005350</a>
                <a href="tel:+966920032888" dir="ltr">(+966) 920032888</a>
              </div>
            </div>
            <div className="contact-card contact-card--address" dir={isRTL ? 'rtl' : 'ltr'}>
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <h3 dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.address.title}</h3>
              <div className="contact-address-group" dir={isRTL ? 'rtl' : 'ltr'}>
                {(t.contact.cards.address.lines?.length ? t.contact.cards.address.lines : [
                  t.contact.cards.address.description,
                  t.contact.cards.address.details
                ].filter(Boolean)).map((line, idx) => (
                  <p
                    key={`${line}-${idx}`}
                    className={`contact-address-line ${idx === 0 ? 'contact-address-line--primary' : 'contact-address-line--secondary'}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="contact-card" dir={isRTL ? 'rtl' : 'ltr'}>
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
              </span>
              <h3 dir={isRTL ? 'rtl' : 'ltr'}>{t.home.footer.social.title}</h3>
              <p dir={isRTL ? 'rtl' : 'ltr'} style={{ marginBottom: '8px' }}>
                {isRTL ? 'تابعنا على منصات التواصل' : 'Follow us on social media'}
              </p>
              <div className="footer-social" aria-label="Social media links" style={{ gap: '12px' }}>
                <a 
                  href="https://www.tiktok.com/@safe.lines.cc?_r=1&_t=ZS-919CqwjHVxv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3c.6 2.5 2.4 4.1 5 4.5v3.1c-1.7-.1-3.2-.7-4.6-1.7v6.2c0 3-2.3 5.4-5.3 5.6-3.2.2-5.9-2.4-5.9-5.6 0-3.2 2.6-5.6 5.8-5.6.4 0 .8 0 1.2.1v3a3 3 0 0 0-1.2-.2c-1.5 0-2.8 1.2-2.8 2.7s1.3 2.7 2.8 2.7 2.8-1.2 2.8-2.7V3h1.2z" fill="currentColor"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/1QGEmUCJEo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9h2.5V6.5H14c-2 0-3 1.3-3 3V12H8v2.5h3V21h2.5v-6.5H17V12h-3V9z" fill="currentColor"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/safelinescc?utm_source=qr&igsh=eXowdHc1aXRuNzV1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="17" cy="7" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/Safelinescc?t=b38UQ50-9o1wZM18Kg3-jQ&s=09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.6 4h-3.5l-3 3.9-2.3-3.9H4.4l5.3 7.2L4 20h3.5l3.2-4.1L14 20h5.9l-5.8-8 5.5-8Z" />
                  </svg>
                </a>
                <a 
                  href="https://www.snapchat.com/@lkhtwtlamnhlltk?share_id=NPjZZrZHtaw&locale=ar-SA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Snapchat"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 3.5c-3 0-5.5 2.4-5.5 5.4V10c0 1.6-.9 3.1-2.3 3.9-.2.1-.3.3-.2.5.3.8 1.2 1.3 2.3 1.4.2 1.2 1.2 2.4 2.6 3 .5.2.8.4.8.6 0 .3-.3.5-.9.6-.6.1-.9.4-.9.7 0 .2.1.4.3.6.9.7 2.4 1.1 3.8 1.1s2.9-.4 3.8-1.1c.2-.2.3-.4.3-.6 0-.3-.3-.6-.9-.7-.6-.1-.9-.3-.9-.6 0-.2.3-.4.8-.6 1.4-.6 2.4-1.8 2.6-3 1.2-.1 2-.6 2.3-1.4.1-.2 0-.4-.2-.5-1.4-.8-2.3-2.3-2.3-3.9V8.9c0-3-2.5-5.4-5.5-5.4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="9.6" cy="11.2" r="0.8" fill="currentColor" />
                    <circle cx="14.4" cy="11.2" r="0.8" fill="currentColor" />
                    <path d="M10.3 14.9c.5.5 1.1.7 1.7.7s1.2-.2 1.7-.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </a>
                <a 
                  href="https://wa.me/966555005350" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.5a9.5 9.5 0 0 0-8.3 14.4L3 21l4.1-1.3A9.5 9.5 0 1 0 12 2.5Z" stroke="currentColor" strokeWidth="1.8" fill="none" />
                    <path d="M15.5 13.8c-.2-.1-1.3-.6-1.4-.7s-.3-.1-.5.1c-.2.2-.6.7-.7.8-.1.1-.3.1-.5 0-.2-.1-1-.3-1.8-1.1-.7-.7-1.1-1.4-1.2-1.6-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.3 0-.1 0-.2 0-.4s-.4-1.1-.6-1.6c-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.5.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.1.9 2.3.1.2 1.5 2.3 3.5 3.2.5.2.9.4 1.2.4.5.1.9.1 1.3.1.4 0 1.2-.5 1.4-1 .2-.5.2-1 .2-1-.1-.1-.2-.2-.4-.3Z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            <span dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.form.name}</span>
            <input type="text" placeholder={t.contact.form.namePlaceholder} required dir={isRTL ? 'rtl' : 'ltr'} />
          </label>
          <label>
            <span dir={isRTL ? 'rtl' : 'ltr'}>{t.common.email}</span>
            <input type="email" placeholder={t.contact.form.emailPlaceholder} required />
          </label>
          <label>
            <span dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.form.subject}</span>
            <input type="text" placeholder={t.contact.form.subjectPlaceholder} dir={isRTL ? 'rtl' : 'ltr'} />
          </label>
          <label>
            <span dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.form.requiredService}</span>
            <select 
              dir={isRTL ? 'rtl' : 'ltr'} 
              required
            >
              <option value="">{t.contact.form.requiredServicePlaceholder}</option>
              {filteredServices.map((service: any) => (
                  <option key={service._id || service.id} value={isRTL ? service.titleAr : service.title}>
                    {isRTL ? service.titleAr : service.title}
                  </option>
                ))}
            </select>
          </label>
          <label>
            <span dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.form.message}</span>
            <textarea placeholder={t.contact.form.messagePlaceholder} rows={6} dir={isRTL ? 'rtl' : 'ltr'} />
          </label>
          <button className="contact-submit" type="submit" dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.form.submit}</button>
        </form>
      </div>
    </section>
    <Footer />
    </>
  );
}



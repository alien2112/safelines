"use client";

import VideoBackground from '../components/VideoBackground';
import { GSAPAnimations } from '../components/GSAPAnimations';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../lib/swr-config';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const { data: services = [], isLoading } = useServices();
  return (
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
            <div className="contact-card">
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <h3 dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.email.title}</h3>
              <p dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.email.description}</p>
              <a href="mailto:safelines.cc.co@gmail.com">safelines.cc.co@gmail.com</a>
            </div>
            <div className="contact-card">
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h2.87a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.84.24 1.71.42 2.61.54A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <h3 dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.phone.title}</h3>
              <p dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.phone.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="tel:+966555005350">(+966) 555005350</a>
                <a href="tel:+966920032888">(+966) 920032888</a>
              </div>
            </div>
            <div className="contact-card">
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <h3 dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.address.title}</h3>
              <p dir={isRTL ? 'rtl' : 'ltr'}>{t.contact.cards.address.description}</p>
              <p dir={isRTL ? 'rtl' : 'ltr'} style={{ marginTop: '8px', fontSize: '14px', color: 'var(--gray-700)' }}>
                {t.contact.cards.address.details}
              </p>
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
            <span dir={isRTL ? 'rtl' : 'ltr'}>الخدمة المطلوبة</span>
            <select 
              dir={isRTL ? 'rtl' : 'ltr'} 
              required
            >
              <option value="">{isRTL ? 'اختر الخدمة المطلوبة' : 'Select Required Service'}</option>
              {services
                .filter((service: any) => service.visible !== false)
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                .map((service: any) => (
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
  );
}



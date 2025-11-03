"use client";

import React from 'react';
import Blob from './Blob';

type FAQItem = { id: string; question: string; answer?: string };

const DEFAULT_ITEMS: FAQItem[] = [
  {
    id: 'q1',
    question: 'What is included in the Starter plan?',
    answer:
      'The Starter plan includes unlimited analytics usage, premium support, customer care, and collaboration tools—everything you need to get started!'
  },
  {
    id: 'q2',
    question: 'Do you offer a free trial?',
    answer:
      'Yes! Our Pro plan includes a free trial so you can explore all the features before committing.'
  },
  {
    id: 'q3',
    question: 'Can I switch plans later?',
    answer:
      'Absolutely! You can upgrade or downgrade your plan at any time without any hassle.'
  },
  {
    id: 'q4',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, and for Enterprise plans, we also support invoicing and wire transfers.'
  },
  {
    id: 'q5',
    question: 'How secure is my data?',
    answer:
      'Your data is protected with enterprise‑grade security measures, including encryption and regular audits, ensuring maximum safety.'
  },
  {
    id: 'q6',
    question: 'How does the 2% donation work?',
    answer:
      'We allocate 2% of all memberships directly to pediatric well‑being organizations, helping make a difference with every subscription.'
  },
  {
    id: 'q7',
    question: 'Can I integrate this platform with other tools?',
    answer:
      'Absolutely! Our platform supports integrations with popular CRMs and business tools, allowing for seamless workflows.'
  },
  {
    id: 'q8',
    question: 'What makes your platform different?',
    answer:
      'Our focus is on user‑friendly design, actionable insights, and top‑notch customer support—giving you everything you need to grow.'
  },
];

export default function FAQSection({ items = DEFAULT_ITEMS }: { items?: FAQItem[] }) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <section className="section-faq" id="faq">
      <Blob
        width={600}
        height={350}
        top={200}
        left={50}
        translateXPercent={50}
        intensity={0.2}
        blur={100}
        zIndex={0}
        colors={{
          primary: 'rgba(236,72,153,0.42)', /* pink-500 */
          mid: 'rgba(244,114,182,0.32)',     /* pink-400 */
          outer: 'rgba(251,207,232,0.24)',   /* pink-200 */
        }}
      />
      <div className="container">
        <div className="faq-top">
          <div className="faq-heading">
            <h2 className="faq-title">Questions answered</h2>
            <p className="faq-subtext">
              We’re here to help you and solve objections. Find answers to the most common questions below.
            </p>
          </div>
          <a className="faq-cta" href="#contact">Contact Sales Now</a>
        </div>

        <div className="faq-grid">
          {items.map((item) => {
            const expanded = openId === item.id;
            return (
              <div key={item.id} className={`faq-card${expanded ? ' open' : ''}`}>
                <div className="faq-accordion-item">
                  <button
                    className="faq-item"
                    id={item.id}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${item.id}-panel`}
                    onClick={() => setOpenId(expanded ? null : item.id)}
                  >
                    <span className="faq-q">{item.question}</span>
                    <span className="faq-plus" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`${item.id}-panel`}
                    role="region"
                    aria-labelledby={item.id}
                    className={`faq-panel${expanded ? ' open' : ''}`}
                  >
                    <p className="faq-a">{item.answer ?? ''}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-mail">
          <a className="mail-pill" href="mailto:info@safelines.com" aria-label="Email">
            <span className="mail-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <polyline points="3,7 12,13 21,7"/>
              </svg>
            </span>
            MAIL
          </a>
        </div>
      </div>
    </section>
  );
}



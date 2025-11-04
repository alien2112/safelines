"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useImages } from '../lib/swr-config';

type Metric = { label: string; color: "blue" | "teal" | "red"; before: number; after: number; beforeLabel: string; afterLabel: string };

export default function StrategyContentSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [showAfter, setShowAfter] = React.useState(true);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const metrics: Metric[] = t.home.strategy.metrics.map((m, index) => {
    const colors: ("blue" | "teal" | "red")[] = ["blue", "teal", "red"];
    const beforeValues = [30, 25, 80];
    const afterValues = [85, 70, 10];
    return {
      label: m.label,
      color: colors[index],
      before: beforeValues[index],
      after: afterValues[index],
      beforeLabel: m.beforeLabel,
      afterLabel: m.afterLabel,
    };
  });

  const startAuto = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setShowAfter((s) => !s), 3500);
  }, []);

  React.useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAuto]);

  return (
    <section className="section-strategy">
      <div className="container">
        <div className="strategy-header">
          <span className="strategy-side left" />
          <h2 className="strategy-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.strategy.title}</h2>
          <span className="strategy-side right" />
        </div>

        <div className="strategy-grid">
          <div className="strategy-card left" style={{ position: 'relative' }}>
            <div className="ab-toggle" role="tablist" aria-label="Before After toggle">
              <button
                type="button"
                role="tab"
                aria-selected={!showAfter}
                className={`ab-tab ${!showAfter ? "active" : ""}`}
                onClick={() => { setShowAfter(false); startAuto(); }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {t.home.strategy.before}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={showAfter}
                className={`ab-tab ${showAfter ? "active" : ""}`}
                onClick={() => { setShowAfter(true); startAuto(); }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {t.home.strategy.after}
              </button>
            </div>
            <div className="strategy-bars">
              {metrics.map((m) => {
                const width = showAfter ? m.after : m.before;
                const valueLabel = showAfter ? m.afterLabel : m.beforeLabel;
                return (
                  <div key={m.label} className="strategy-bar-row">
                    <div className={`strategy-bar ${m.color}`} style={{ width: `${width}%` }}>
                      <span className="strategy-bar-label" dir={isRTL ? 'rtl' : 'ltr'}>{m.label} {valueLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ab-row" dir={isRTL ? 'rtl' : 'ltr'}>
              <span className={`ab ab-after ${showAfter ? "active" : ""}`}>{t.home.strategy.after}</span>
              <span className={`ab ab-before ${!showAfter ? "active" : ""}`}>{t.home.strategy.before}</span>
            </div>
          </div>
          <div className="strategy-card right">
            <StrategyRightImage />
          </div>
        </div>

        <div className="strategy-actions">
          <Link className="cta-btn-secondary" href="/contact" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.strategy.bookCall}</Link>
          <Link className="faq-cta" href="/contact" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.strategy.contact}</Link>
        </div>
      </div>
    </section>
  );
}


const StrategyRightImage = React.memo(function StrategyRightImage() {
  const { data: imagesData } = useImages('strategy-right');
  
  const imageId = React.useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData) || imagesData.length === 0) return null;
    return imagesData[0]._id;
  }, [imagesData]);
  
  if (!imageId) {
    return null;
  }
  return (
    <Image
      src={`/api/images/${imageId}`}
      alt="Strategy & Content"
      fill
      style={{ objectFit: 'cover', borderRadius: 12 }}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
});



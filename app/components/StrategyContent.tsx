"use client";

import React from 'react';

type Metric = { label: string; color: "blue" | "teal" | "red"; before: number; after: number };

const METRICS: Metric[] = [
  { label: "Growth", color: "blue", before: 30, after: 85 },
  { label: "Efficiency", color: "teal", before: 25, after: 70 },
  { label: "Cost", color: "red", before: 80, after: 10 },
];

export default function StrategyContentSection() {
  const [showAfter, setShowAfter] = React.useState(true);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

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
          <h2 className="strategy-title">Strategy & Content Creation</h2>
          <span className="strategy-side right" />
        </div>

        <div className="strategy-grid">
          <div className="strategy-card left">
            <div className="ab-toggle" role="tablist" aria-label="Before After toggle">
              <button
                type="button"
                role="tab"
                aria-selected={!showAfter}
                className={`ab-tab ${!showAfter ? "active" : ""}`}
                onClick={() => { setShowAfter(false); startAuto(); }}
              >
                Before
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={showAfter}
                className={`ab-tab ${showAfter ? "active" : ""}`}
                onClick={() => { setShowAfter(true); startAuto(); }}
              >
                After
              </button>
            </div>
            <div className="strategy-bars">
              {METRICS.map((m, idx) => {
                const width = showAfter ? m.after : m.before;
                const valueLabel =
                  m.label === "Cost"
                    ? showAfter
                      ? "-100%"
                      : "+100%"
                    : showAfter
                    ? m.label === "Growth"
                      ? "+250%"
                      : "+200%"
                    : m.label === "Growth"
                    ? "+10%"
                    : "-50%";
                return (
                  <div key={m.label} className="strategy-bar-row">
                    <div className={`strategy-bar ${m.color}`} style={{ width: `${width}%` }}>
                      <span className="strategy-bar-label">{m.label} {valueLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ab-row">
              <span className={`ab ab-after ${showAfter ? "active" : ""}`}>After</span>
              <span className={`ab ab-before ${!showAfter ? "active" : ""}`}>Before</span>
            </div>
          </div>
          <div className="strategy-card right">
            <StrategyRightImage />
          </div>
        </div>

        <div className="strategy-actions">
          <a className="cta-btn-secondary" href="#book">Book A Free Call Now</a>
          <a className="faq-cta" href="#contact">Contact Sales Now</a>
        </div>
      </div>
    </section>
  );
}


function StrategyRightImage() {
  const [imageId, setImageId] = React.useState<string | null>(null);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/images?section=strategy-right', { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setImageId(data[0]._id);
        }
      } catch {
        // ignore
      }
    })();
  }, []);
  if (!imageId) {
    return null;
  }
  return (
    <img
      src={`/api/images/${imageId}`}
      alt="Strategy & Content"
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
    />
  );
}



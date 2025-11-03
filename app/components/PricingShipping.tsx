"use client";

import React from 'react';
import Blob from './Blob';
import { useLanguage } from '../contexts/LanguageContext';

export default function PricingShippingSection() {
	const { language, t } = useLanguage();
	const isRTL = language === 'ar';
	const [isMonthly, setIsMonthly] = React.useState(true);

	return (
		<section className="section-pricing" id="pricing" style={{ position: 'relative', overflow: 'hidden' }}>
			{/* Pink decorative blob behind cards */}
			<Blob
				width={600}
				height={500}
				top={600}
				left={45}
				translateXPercent={50}
				intensity={0.15}
				blur={90}
				zIndex={0}
				colors={{
					primary: 'rgba(236,72,153,0.28)',
					mid: 'rgba(244,114,182,0.20)',
					outer: 'rgba(253,164,175,0.12)',
				}}
			/>
			<div className="container" style={{ position: 'relative', zIndex: 1 }}>
				<div className="pricing-header" style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 24 }}>
					<div className="pricing-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
						<svg 
							width="18" 
							height="18" 
							viewBox="0 0 18 18" 
							fill="none" 
							xmlns="http://www.w3.org/2000/svg"
							style={{ display: 'inline-block', flexShrink: 0 }}
						>
							{/* Price tag shape - quadrilateral wider at top, tapering to bottom */}
							<polygon 
								points="2,2 13.5,2 15.5,4 15.5,13 13,15.5 4,15.5 2,13" 
								fill="#A855F7"
							/>
							{/* Circular hole in top-left corner */}
							<circle 
								cx="2" 
								cy="2" 
								r="1.5" 
								fill="white"
							/>
						</svg>
						{t.home.pricing.tag}
					</div>
					<h2 className="pricing-title" style={{ margin: 0 }} dir={isRTL ? 'rtl' : 'ltr'}>
						{t.home.pricing.title}
					</h2>
					<p className="pricing-subtext" style={{ marginTop: 8 }} dir={isRTL ? 'rtl' : 'ltr'}>
						{t.home.pricing.subtitle}
					</p>
					{/* side lines like testimonials */}
					<span style={{ position: 'absolute', top: '50%', left: 0, width: 'clamp(120px, 20vw, 220px)', height: 2, background: 'rgba(0,0,0,0.25)', transform: 'translateY(-50%)', borderRadius: 1 }} />
					<span style={{ position: 'absolute', top: '50%', right: 0, width: 'clamp(120px, 20vw, 220px)', height: 2, background: 'rgba(0,0,0,0.25)', transform: 'translateY(-50%)', borderRadius: 1 }} />
					<div className="pricing-toggle">
						<button
							type="button"
							className={`toggle-option ${isMonthly ? 'active' : ''}`}
							onClick={() => setIsMonthly(true)}
							aria-pressed={isMonthly}
							dir={isRTL ? 'rtl' : 'ltr'}
						>
							{t.home.pricing.toggle.monthly}
						</button>
						<button
							type="button"
							className={`toggle-option ${!isMonthly ? 'active' : ''}`}
							onClick={() => setIsMonthly(false)}
							aria-pressed={!isMonthly}
							dir={isRTL ? 'rtl' : 'ltr'}
						>
							{t.home.pricing.toggle.yearly}
						</button>
					</div>
				</div>

				<div className="pricing-grid">
					{t.home.pricing.cards.map((card, index) => (
						<div key={card.title} className="pricing-card">
							<h3 className="pricing-card-title" dir={isRTL ? 'rtl' : 'ltr'}>{card.title}</h3>
							<button className="pricing-more-btn" type="button" dir={isRTL ? 'rtl' : 'ltr'}>
								<span className="icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M5 9l2 2-2 2M12 3l1.5 3L17 8l-3 1.5L12 13l-1.5-3L7 8l3.5-2z" />
									</svg>
								</span>
								{card.more}
							</button>
							<div className="pricing-card-divider" />
						</div>
					))}
				</div>

				<div className="pricing-footer" dir={isRTL ? 'rtl' : 'ltr'}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
					</svg>
					<span>{t.home.pricing.footer}</span>
				</div>
			</div>
		</section>
	);
}


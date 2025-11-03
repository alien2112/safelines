"use client";

import React from 'react';

export default function PricingShippingSection() {
	const [isMonthly, setIsMonthly] = React.useState(true);

	return (
		<section className="section-pricing" id="pricing">
			<div className="container">
				<div className="pricing-header">
					<div className="pricing-tag">PRONG</div>
					<h2 className="pricing-title">Pricing Shipping to all continents of the world</h2>
					<p className="pricing-subtext">
						We have long experience in our field, so we can provide you with distinguished services.
					</p>
					<div className="pricing-toggle">
						<button
							type="button"
							className={`toggle-option ${isMonthly ? 'active' : ''}`}
							onClick={() => setIsMonthly(true)}
							aria-pressed={isMonthly}
						>
							Monthly
						</button>
						<button
							type="button"
							className={`toggle-option ${!isMonthly ? 'active' : ''}`}
							onClick={() => setIsMonthly(false)}
							aria-pressed={!isMonthly}
						>
							Yearly
						</button>
					</div>
				</div>

				<div className="pricing-grid">
					<div className="pricing-card">
						<h3 className="pricing-card-title">ASIA</h3>
						<button className="pricing-more-btn" type="button">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
							MORE
						</button>
					</div>
					<div className="pricing-card">
						<h3 className="pricing-card-title">South America</h3>
						<button className="pricing-more-btn" type="button">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
							MORE
						</button>
					</div>
					<div className="pricing-card">
						<h3 className="pricing-card-title">AFRICA</h3>
						<button className="pricing-more-btn" type="button">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
							MORE
						</button>
					</div>
				</div>

				<div className="pricing-footer">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
					</svg>
					<span>We donate 2% of your membership to pediatric wellbeing</span>
				</div>
			</div>
		</section>
	);
}


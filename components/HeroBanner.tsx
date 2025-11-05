"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useImages } from '../lib/swr-config';

interface HeroBannerProps {
	section: "hero-home" | "hero-about";
	alt: string;
	objectPosition?: string;
	children?: React.ReactNode;
}

const HeroBanner = React.memo(function HeroBanner({ section, alt, objectPosition = "50% 50%", children }: HeroBannerProps) {
	// Use SWR for data fetching
	const { data: imagesData, isLoading } = useImages(section);
	
	// Memoize image ID extraction
	const imageId = useMemo(() => {
		if (!imagesData || !Array.isArray(imagesData) || imagesData.length === 0) return null;
		return imagesData[0]._id;
	}, [imagesData]);

	if (isLoading) {
		return (
			<section className="hero-banner">
				<div className="banner-container">
					{children}
				</div>
			</section>
		);
	}

	if (!imageId) {
		// Fallback to default image if no banner is uploaded
		const defaultImage = section === "hero-home" ? "/hero-banner.webp" : "/upscaled_image_high_quality.webp";
		return (
			<section className="hero-banner">
				<Image
					src={defaultImage}
					alt={alt}
					priority
					fill
					sizes="100vw"
					style={{ objectFit: 'cover', objectPosition }}
				/>
				<div className="banner-container">
					{children}
				</div>
			</section>
		);
	}

	return (
		<section className="hero-banner">
			<Image
				src={`/api/images/${imageId}`}
				alt={alt}
				fill
				priority
				style={{ 
					objectFit: 'cover', 
					objectPosition,
				}}
				sizes="100vw"
				quality={100}
			/>
			<div className="banner-container">
				{children}
			</div>
		</section>
	);
});

export default HeroBanner;


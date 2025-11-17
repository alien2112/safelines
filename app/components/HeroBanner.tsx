"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useImages } from '../lib/swr-config';

type HeroSection = "hero-home" | "hero-about";

interface HeroBannerProps {
	section: HeroSection;
	alt: string;
	objectPosition?: string;
	children?: React.ReactNode;
	slideIntervalMs?: number;
}

type ImageDocument = {
	_id?: string;
	filename?: string;
	uploadDate?: string;
	metadata?: {
		order?: number;
		section?: string;
	};
};

type BannerSlide = {
	id: string;
	src: string;
	alt: string;
	order: number;
	origin: "cms" | "static";
};

const STATIC_BANNER_IMAGES: Record<HeroSection, Array<{ src: string; alt: string }>> = {
	"hero-home": [
		{ src: "/banners/b1.webp", alt: "Container ship sailing during golden hour" },
		{ src: "/banners/b2.webp", alt: "Logistics team coordinating freight departures" },
		{ src: "/banners/aerial-view-cargo-ship-cargo-container-harbor (1).webp", alt: "Aerial view of cargo ship at container harbor" },
		{ src: "/banners/—Pngtree—a large container ship docked_16142341.webp", alt: "Large container ship docked at port" },
		{ src: "/banners/طريقة-الشحن-الجوي-افضل-شركة-شحن-جوي-في-تركيا-1.webp", alt: "Air freight loading scene at twilight" },
	],
	"hero-about": [
		{ src: "/banners/Port-of-felixstowe-About-3000x3000.webp", alt: "Port of Felixstowe operations overview" },
		{ src: "/banners/PLA_Clipper_Parade_300722_290-trading-banner-1920x1014.png.webp", alt: "Clipper parade cargo operations" },
		{ src: "/banners/container-operation-port-series (1).webp", alt: "Container cranes in operation at busy port" },
		{ src: "/banners/aerial-view-container-cargo-ship-sea (1) (1).webp", alt: "Aerial view of cargo ship navigating the sea" },
		{ src: "/banners/تصميم بدون عنوان.webp", alt: "Safe Lines logistics illustration" },
	],
};

function sanitizeStaticSlides(section: HeroSection): BannerSlide[] {
	return STATIC_BANNER_IMAGES[section].map((slide, index) => ({
		id: `${section}-static-${index}`,
		src: encodeURI(slide.src),
		alt: slide.alt,
		order: (index + 1) * 100,
		origin: "static" as const,
	}));
}

const HeroBanner = React.memo(function HeroBanner({
	section,
	alt,
	objectPosition = "50% 50%",
	children,
	slideIntervalMs = 5000,
}: HeroBannerProps) {
	const { data: imagesData } = useImages(section);
	const [currentIndex, setCurrentIndex] = useState(0);

	const cmsSlides = useMemo(() => {
		if (!imagesData || !Array.isArray(imagesData) || imagesData.length === 0) return [];
		return (imagesData as ImageDocument[])
			.map((image, index) => {
				if (!image?._id) return null;
				const uploadedAt = image.uploadDate ? new Date(image.uploadDate).getTime() : Date.now();
				const order = typeof image.metadata?.order === "number" ? image.metadata.order : uploadedAt + index;
				return {
					id: image._id,
					src: `/api/images/${image._id}?v=${uploadedAt}`,
					alt: image.filename || alt,
					order,
					origin: "cms" as const,
				};
			})
			.filter((slide): slide is BannerSlide & { origin: "cms" } => Boolean(slide))
			.sort((a, b) => a.order - b.order);
	}, [imagesData, alt]);

	const fallbackSlides = useMemo(() => sanitizeStaticSlides(section), [section]);

	const slides = cmsSlides.length > 0 ? cmsSlides : fallbackSlides;

	const totalSlides = slides.length;
	const activeSlide = slides[currentIndex];

	useEffect(() => {
		setCurrentIndex(0);
	}, [section, totalSlides]);

	useEffect(() => {
		if (totalSlides <= 1) return;
		if (typeof window === "undefined") return;
		const timer = window.setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % totalSlides);
		}, slideIntervalMs);
		return () => window.clearInterval(timer);
	}, [totalSlides, slideIntervalMs]);

	const goToSlide = useCallback(
		(nextIndex: number) => {
			if (totalSlides === 0) return;
			const safeIndex = (nextIndex + totalSlides) % totalSlides;
			setCurrentIndex(safeIndex);
		},
		[totalSlides]
	);

	const handlePrev = useCallback(() => goToSlide(currentIndex - 1), [goToSlide, currentIndex]);
	const handleNext = useCallback(() => goToSlide(currentIndex + 1), [goToSlide, currentIndex]);

	const regionLabel = section === "hero-home" ? "Home banner slider" : "About banner slider";
	const showControls = totalSlides > 1;

	return (
		<section
			className="hero-banner"
			role="region"
			aria-label={regionLabel}
		>
			<div className="hero-banner-slides" aria-live="polite">
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={`hero-banner-slide${index === currentIndex ? " is-active" : ""}`}
						aria-hidden={index !== currentIndex}
					>
						<Image
							src={slide.src}
							alt={slide.alt}
							fill
							sizes="100vw"
							style={{
								objectFit: "cover",
								objectPosition,
							}}
							quality={100}
							priority={index === 0}
							loading={index === 0 ? "eager" : "lazy"}
						/>
					</div>
				))}
			</div>

			{showControls && (
				<>
					<div className="hero-banner-controls">
						<button
							type="button"
							className="hero-banner-nav hero-banner-nav--prev"
							onClick={handlePrev}
							aria-label="Previous banner image"
						>
							<span aria-hidden="true">‹</span>
						</button>
						<span className="hero-banner-counter">
							{String(currentIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
						</span>
						<button
							type="button"
							className="hero-banner-nav hero-banner-nav--next"
							onClick={handleNext}
							aria-label="Next banner image"
						>
							<span aria-hidden="true">›</span>
						</button>
					</div>

					<div
						className="hero-banner-indicators"
						role="tablist"
						aria-label={`${regionLabel} navigation`}
					>
						{slides.map((slide, index) => (
							<button
								key={`${slide.id}-indicator`}
								type="button"
								className={`hero-banner-indicator${index === currentIndex ? " is-active" : ""}`}
								onClick={() => goToSlide(index)}
								role="tab"
								aria-selected={index === currentIndex}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</>
			)}

			<div className="banner-container">
				{children}
			</div>
			{activeSlide?.origin === "static" && (
				<span className="hero-banner-static-label" aria-hidden="true">
					Default imagery from /public/banners
				</span>
			)}
		</section>
	);
});

HeroBanner.displayName = "HeroBanner";

export default HeroBanner;


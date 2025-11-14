"use client";

import React from 'react';
import { useImages } from '../lib/swr-config';

interface DynamicImageProps {
	section: string;
	className?: string;
	style?: React.CSSProperties;
	alt?: string;
}

const DynamicImage = React.memo(function DynamicImage({ section, className, style, alt }: DynamicImageProps) {
	const { data: imagesData, isLoading } = useImages(section);
	
	const imageUrl = React.useMemo(() => {
		if (!imagesData || !Array.isArray(imagesData) || imagesData.length === 0) return null;
		const imageMeta = imagesData[0];
		if (!imageMeta?._id) return null;
		const uploadDate = imageMeta.uploadDate ? new Date(imageMeta.uploadDate).getTime() : Date.now();
		return `/api/images/${imageMeta._id}?v=${uploadDate}`;
	}, [imagesData]);

	// Don't render anything if no image is available
	if (!imageUrl && !isLoading) {
		return null;
	}

	// Show loading state or the image
	return (
		<div
			className={className}
			style={{ 
				backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
				...style 
			}}
			aria-label={alt || "Image"}
		/>
	);
});

export default DynamicImage;


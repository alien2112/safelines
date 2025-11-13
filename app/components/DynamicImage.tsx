"use client";

import React from 'react';

interface DynamicImageProps {
	section: string;
	className?: string;
	style?: React.CSSProperties;
	alt?: string;
}

export default function DynamicImage({ section, className, style, alt }: DynamicImageProps) {
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/images?section=${encodeURIComponent(section)}&noCache=1`, { 
					cache: 'no-store',
					headers: {
						'cache-control': 'no-cache',
						'pragma': 'no-cache',
					},
				});
				const data = await res.json();
				if (Array.isArray(data) && data.length > 0) {
					const uploadDate = data[0]?.uploadDate ? new Date(data[0].uploadDate).getTime() : Date.now();
					setImageUrl(`/api/images/${data[0]._id}?v=${uploadDate}`);
				}
			} catch {
				// ignore
			} finally {
				setIsLoading(false);
			}
		})();
	}, [section]);

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
}


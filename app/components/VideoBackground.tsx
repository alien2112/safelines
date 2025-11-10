"use client";

import React from 'react';

type VideoBackgroundProps = {
  src: string;
  mimeType?: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  scale?: number;
  fixed?: boolean; // if true, pin to viewport as full-page bg
  zIndex?: number;
  children?: React.ReactNode;
};

const CACHED_VIDEOS = [
  'hero-animations.mp4',
  '2025-11-03 18-45-55.mp4',
  '2025-11-03 18-02-55.mp4',
];

const VideoBackground = React.memo(function VideoBackground({
  src,
  mimeType = 'video/mp4',
  poster = '',
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  scale = 1,
  fixed = false,
  zIndex,
  children,
}: VideoBackgroundProps) {
  const fileName = src.replace(/^\/+/, ''); // Remove leading slashes
  const isCachedVideo = CACHED_VIDEOS.includes(fileName);
  const videoSrc = isCachedVideo ? `/api/videos/${encodeURIComponent(fileName)}` : src;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const wrapperStyle: React.CSSProperties = fixed
    ? { position: 'fixed', inset: 0, zIndex }
    : undefined;
  return (
    <div className={["hero-bg", className].filter(Boolean).join(' ')} style={wrapperStyle}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload="auto"
        poster={poster}
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        tabIndex={-1}
        aria-hidden="true"
        draggable={false}
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        <source src={videoSrc} type={mimeType} />
      </video>
      {children}
    </div>
  );
});

export default VideoBackground;



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

export default function VideoBackground({
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
  const wrapperStyle: React.CSSProperties = fixed
    ? { position: 'fixed', inset: 0, zIndex }
    : undefined;
  return (
    <div className={["hero-bg", className].filter(Boolean).join(' ')} style={wrapperStyle}>
      <video
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload="auto"
        poster={poster}
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        <source src={src} type={mimeType} />
      </video>
      {children}
    </div>
  );
}



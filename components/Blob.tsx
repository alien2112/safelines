type BlobProps = {
  width?: number; // px
  height?: number; // px
  top?: number; // px offset from top (can be negative)
  left?: number; // percentage (0-100) from left edge
  translateXPercent?: number; // percentage to translate X (negative to center by left)
  intensity?: number; // 0..1 scales alpha of core
  blur?: number; // px
  zIndex?: number;
  className?: string;
  colors?: {
    primary?: string; // CSS color for core stop (can be rgba)
    mid?: string;     // CSS color for middle stop
    outer?: string;   // CSS color for outer stop
  };
};

// Reusable decorative radial gradient blob placed behind content
export function Blob({
  width = 1400,
  height = 620,
  top = -90,
  left = 42,
  translateXPercent = 42,
  intensity = 0.6,
  blur = 80,
  zIndex = 0,
  className,
  colors,
}: BlobProps) {
  const core = Math.max(0, Math.min(1, intensity));
  const primary = colors?.primary ?? `rgba(59,130,246,${core})`; // blue 500
  const mid = colors?.mid ?? `rgba(99,102,241,${Math.max(0, core - 0.18)})`; // indigo 500
  const outer = colors?.outer ?? `rgba(167,139,250,${Math.max(0, core - 0.34)})`; // violet 400

  const style: React.CSSProperties = {
    position: 'absolute',
    top,
    left: `${left}%`,
    transform: `translateX(-${translateXPercent}%)`,
    width,
    height,
    background: `radial-gradient(ellipse at 50% 50%, ${primary} 0%, ${mid} 32%, ${outer} 56%, rgba(255,255,255,0) 72%)`,
    filter: `blur(${blur}px)`,
    zIndex,
    pointerEvents: 'none',
  };

  return <div className={["blob", className].filter(Boolean).join(' ')} style={style} aria-hidden />;
}

export default Blob;



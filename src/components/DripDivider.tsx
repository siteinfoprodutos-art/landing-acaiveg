import React, { useEffect, useRef, useState } from 'react';

interface DripDividerProps {
  fillColor?: string;
  className?: string;
  inverted?: boolean;
}

export const DripDivider: React.FC<DripDividerProps> = ({
  fillColor = '#0B0710',
  className = '',
  inverted = false,
}) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isDripping, setIsDripping] = useState(false);

  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDripping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={dividerRef}
      className={`w-full overflow-hidden leading-none pointer-events-none relative z-20 ${className}`}
      style={{
        transform: inverted ? 'rotate(180deg)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 1440 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-10 sm:h-14 lg:h-16 block transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformOrigin: 'top center',
          transform: isDripping ? 'scaleY(1)' : 'scaleY(0)',
          willChange: isDripping ? 'auto' : 'transform',
        }}
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V18C1360 18 1335 48 1285 48C1235 48 1215 22 1150 22C1085 22 1060 62 995 62C945 62 925 28 860 28C795 28 775 68 710 68C645 68 625 18 560 18C495 18 475 58 410 58C345 58 325 24 260 24C195 24 175 74 110 74C55 74 35 32 0 32V0Z"
          fill={fillColor}
        />
        {/* Subtle decorative drip droplet tips */}
        <circle cx="110" cy="74" r="3" fill={fillColor} />
        <circle cx="710" cy="68" r="3.5" fill={fillColor} />
        <circle cx="995" cy="62" r="3" fill={fillColor} />
      </svg>
    </div>
  );
};

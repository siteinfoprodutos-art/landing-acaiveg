import React, { useEffect, useRef } from 'react';

export const MarqueeBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Dynamic scroll-driven velocity acceleration
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let currentDuration = 28; // normal 28s duration
    let targetDuration = 28;
    let rAFId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;

      // When user scrolls fast, lower the duration (speed up animation), min 12s
      const boost = Math.min(delta * 0.15, 16);
      targetDuration = Math.max(12, 28 - boost);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth decay loop back to 28s
    const updateVelocity = () => {
      // Lerp duration back towards 28
      targetDuration += (28 - targetDuration) * 0.05;
      currentDuration += (targetDuration - currentDuration) * 0.1;

      if (trackRef.current) {
        trackRef.current.style.setProperty('--marquee-duration', `${currentDuration.toFixed(2)}s`);
      }

      rAFId = requestAnimationFrame(updateVelocity);
    };

    rAFId = requestAnimationFrame(updateVelocity);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rAFId);
    };
  }, []);

  const marqueeItems = [
    'Açaí',
    'Kit Kat',
    'Paçoca',
    'Creme de avelã',
    'Uva',
    'Leite condensado',
    'Rafaello',
  ];

  // Repeat the sequence multiple times to ensure seamless infinite loop
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      ref={containerRef}
      className="relative z-20 py-4 bg-[#14081F] border-y border-[#F5B83D]/25 overflow-hidden shadow-2xl select-none"
    >
      {/* Subtle edge fade overlays for infinite seamless scroll */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#14081F] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#14081F] to-transparent z-10 pointer-events-none" />

      <div ref={trackRef} className="marquee-track flex items-center gap-8 py-0.5">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="font-serif-luxury italic text-sm sm:text-base lg:text-lg text-[#F2D27A] tracking-wider font-semibold drop-shadow-sm whitespace-nowrap">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]/60 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

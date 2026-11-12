import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  className = '',
  children,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Performance-optimized section reveal: opacity + translateY(40px) + scale(0.98) in 0.9s with cubic-bezier(0.22, 1, 0.36, 1)
  const sectionStyle: React.CSSProperties = prefersReducedMotion || isVisible
    ? {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
        transition:
          'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
      }
    : {
        opacity: 0,
        transform: 'translate3d(0, 40px, 0) scale(0.98)',
        transition:
          'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'opacity, transform',
      };

  return (
    <section id={id} ref={sectionRef} className={className} style={sectionStyle}>
      {children}
    </section>
  );
};

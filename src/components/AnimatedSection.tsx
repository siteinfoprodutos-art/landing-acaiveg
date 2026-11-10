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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Inline dynamic styles for section opening reveal
  const sectionStyle: React.CSSProperties = prefersReducedMotion || isVisible
    ? {
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        clipPath: 'inset(0 0 0 0 round 0)',
        transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), clip-path 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
      }
    : {
        opacity: 0,
        transform: 'translateY(40px) scale(0.97)',
        clipPath: 'inset(8% 4% 8% 4% round 32px)',
        transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), clip-path 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'opacity, transform, clip-path',
      };

  return (
    <section id={id} ref={sectionRef} className={`${className} overflow-hidden`} style={sectionStyle}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        const staggerDelay = `${idx * 120}ms`;

        const childStyle: React.CSSProperties = prefersReducedMotion || isVisible
          ? {
              opacity: 1,
              transform: 'translateY(0)',
              transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}`,
            }
          : {
              opacity: 0,
              transform: 'translateY(20px)',
              transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}`,
            };

        return <div style={childStyle}>{child}</div>;
      })}
    </section>
  );
};

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Performance-optimized section reveal (only opacity & transform, no clip-path, content-visibility auto)
  const sectionStyle: React.CSSProperties = {
    contentVisibility: 'auto',
    containIntrinsicSize: '1px 600px',
    ...(prefersReducedMotion || isVisible
      ? {
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }
      : {
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'opacity, transform',
        }),
  };

  return (
    <section id={id} ref={sectionRef} className={`${className}`} style={sectionStyle}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        const staggerDelay = `${idx * 100}ms`;

        const childStyle: React.CSSProperties = prefersReducedMotion || isVisible
          ? {
              opacity: 1,
              transform: 'translateY(0)',
              transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}`,
            }
          : {
              opacity: 0,
              transform: 'translateY(15px)',
              transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}`,
            };

        return <div style={childStyle}>{child}</div>;
      })}
    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { IMAGES, getWhatsAppLink } from '../constants';

interface HighlightProduct {
  id: string;
  name: string;
  ingredientChips: string[];
  price: string;
  image: string;
  badge?: string;
  isGoldCard?: boolean;
  waMessage: string;
}

export const FeaturedProducts: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  const products: HighlightProduct[] = [
    {
      id: 'copo-300',
      name: 'Açaí 300ml',
      ingredientChips: [
        '🍇 Açaí',
        '🥛 Leite em pó',
        '🍯 Leite condensado',
        '🍫 Kit Kat',
      ],
      price: 'R$ 13,00',
      image: IMAGES.copo300ml,
      waMessage: 'Olá! Quero o Açaí 300ml (R$ 13,00)',
    },
    {
      id: 'copo-700',
      name: 'Copo 700ml',
      ingredientChips: [
        '🍇 Açaí',
        '🌰 Creme de avelã',
        '🍇 Uva verde',
        '🥛 Leite em pó',
        '🥜 Paçoca',
        '🍯 Leite condensado',
      ],
      price: 'R$ 30,00',
      image: IMAGES.copo700ml,
      badge: 'Mais completo',
      isGoldCard: true,
      waMessage: 'Olá! Quero o Copo 700ml (R$ 30,00)',
    },
    {
      id: 'garrafa-rafaello',
      name: 'Açaí Recheado com Creme de Rafaello',
      ingredientChips: [
        '🍇 Açaí premium',
        '🥥 Creme de Rafaello',
        '🌰 Amêndoa',
      ],
      price: 'R$ 15,00',
      image: IMAGES.garrafaRafaello,
      badge: 'Novidade',
      waMessage: 'Olá! Quero o Açaí Recheado com Creme de Rafaello (R$ 15,00)',
    },
  ];

  // IntersectionObserver for Section Text Reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Light Parallax for floating decorative elements (8% to 15% delta)
  useEffect(() => {
    let rAFId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate offset only when section is near viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.12;
        setParallaxY(offset);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rAFId);
    };
  }, []);

  // 3D Card Tilt & Cursor Sheen for desktop fine pointers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  // Magnetic button effect (moves up to 6px)
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = (x / (rect.width / 2)) * 6;
    const moveY = (y / (rect.height / 2)) * 6;

    btn.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0) scale(1.02)`;
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
  };

  return (
    <div
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#0B0710] to-[#2A0F3D] text-white relative z-20 overflow-hidden -mt-[12vh] rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.65)] border-t border-white/10"
    >
      {/* 2 Soft Radial Glows with Subtle Scroll Parallax */}
      <div
        className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#6B2B83]/15 rounded-full blur-3xl pointer-events-none transition-transform duration-75"
        style={{ transform: `translate3d(0, ${parallaxY * 0.5}px, 0)` }}
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#F5B83D]/15 rounded-full blur-3xl pointer-events-none transition-transform duration-75"
        style={{ transform: `translate3d(0, -${parallaxY * 0.4}px, 0)` }}
      />

      {/* Floating Parallax Decorative Particles (max 5 subtle items, Item 6) */}
      <div
        className="absolute top-20 right-12 text-2xl opacity-20 pointer-events-none select-none transition-transform duration-75"
        style={{ transform: `translate3d(0, -${parallaxY * 0.8}px, 0)` }}
      >
        🍇
      </div>
      <div
        className="absolute bottom-32 left-8 text-xl opacity-25 pointer-events-none select-none transition-transform duration-75"
        style={{ transform: `translate3d(0, ${parallaxY * 0.7}px, 0)` }}
      >
        🍃
      </div>
      <div
        className="absolute top-1/2 left-4 w-2 h-2 rounded-full bg-[#F5B83D] opacity-30 blur-[1px] pointer-events-none select-none transition-transform duration-75"
        style={{ transform: `translate3d(0, -${parallaxY * 0.6}px, 0)` }}
      />
      <div
        className="absolute bottom-1/4 right-8 w-3 h-3 rounded-full bg-[#6B2B83] opacity-40 blur-[1px] pointer-events-none select-none transition-transform duration-75"
        style={{ transform: `translate3d(0, ${parallaxY * 0.9}px, 0)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Line-by-Line Reveal and Drawing Gold Lines (Item 4) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span
              className={`h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#F5B83D] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isInView ? 'scale-x-100 origin-right' : 'scale-x-0 origin-right'
              }`}
            />
            <span className="text-[11px] font-semibold text-[#F5B83D] uppercase tracking-widest block">
              Seleção Exclusiva
            </span>
            <span
              className={`h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#F5B83D] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isInView ? 'scale-x-100 origin-left' : 'scale-x-0 origin-left'
              }`}
            />
          </div>

          {/* Masked Title with Slide Up (Item 4) */}
          <div className="overflow-hidden">
            <h2
              className={`font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight transition-transform duration-700 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isInView ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              Nossos Destaques
            </h2>
          </div>

          <p
            className={`mt-3 text-sm sm:text-base text-[#D9C7E6]/85 font-normal transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Escolha o seu e peça pelo WhatsApp.
          </p>
        </div>

        {/* 3 Glassmorphism Product Cards with Cascade Entry (Item 4) & 3D Tilt (Item 5) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {products.map((product, idx) => {
            const isGold = product.isGoldCard;
            const cascadeDelay = { transitionDelay: `${200 + idx * 120}ms` };

            return (
              <div
                key={product.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`relative rounded-[24px] p-6 bg-white/[0.06] backdrop-blur-[14px] backdrop-saturate-[140%] border shadow-[0_20px_50px_rgba(0,0,0,0.35)] supports-[not_(backdrop-filter:blur(0px))]:bg-[#1A1420]/85 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group overflow-hidden ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${
                  isGold
                    ? 'border-[#F5B83D]/60 shadow-[0_20px_50px_rgba(245,184,61,0.18)]'
                    : 'border-white/14 hover:border-white/30'
                }`}
                style={cascadeDelay}
              >
                {/* Dynamic Cursor Sheen Highlight (Item 5) */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(circle 240px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 184, 61, 0.12), transparent 70%)',
                  }}
                />

                {/* 1px Golden Gradient Line Highlight at Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F5B83D]/70 to-transparent" />

                <div>
                  {/* Badge pill if present */}
                  {product.badge && (
                    <div className="mb-4">
                      <span className="inline-block bg-gradient-to-r from-[#F2D27A] to-[#C9971F] text-[#0B0710] font-poppins font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Product Image Frame: aspect-4/5, object-contain, dark purple background */}
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#1A0B26] border border-white/10 mb-6 flex items-center justify-center p-3 shadow-inner">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Product Title */}
                  <h3 className="font-serif-luxury text-2xl font-bold text-white leading-tight mb-3">
                    {product.name}
                  </h3>

                  {/* Ingredient Chips with Emojis */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.ingredientChips.map((chip, chipIdx) => (
                      <span
                        key={chipIdx}
                        className="bg-white/[0.08] border border-white/10 px-2.5 py-1 rounded-md text-[12px] text-[#D9C7E6] font-medium whitespace-nowrap inline-flex items-center gap-1 shadow-sm"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & WhatsApp Action with Shimmer & Magnetic Pull (Item 5) */}
                <div>
                  <div className="mb-4 pt-2 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-[#D9C7E6]/60 tracking-widest uppercase block mb-0.5">
                        VALOR
                      </span>
                      <span className="font-baloo text-3xl sm:text-4xl font-extrabold text-[#F5B83D]">
                        {product.price}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Pill Button with Shimmer Shine & Magnetic Hover (Item 5) */}
                  <a
                    href={getWhatsAppLink(product.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseMove={handleButtonMouseMove}
                    onMouseLeave={handleButtonMouseLeave}
                    className="btn-shimmer w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#F2D27A] to-[#C9971F] text-[#0B0710] font-poppins font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 transition-all duration-200 border border-[#F2D27A]/50"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#0B0710]" />
                    <span>Pedir no WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

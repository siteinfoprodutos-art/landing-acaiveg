import React from 'react';
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

  return (
    <div className="py-24 bg-gradient-to-b from-[#0B0710] to-[#2A0F3D] text-white relative z-20 overflow-hidden">
      {/* 2 Soft Radial Glows (#6B2B83 purple & #F5B83D gold at 15% opacity) */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#6B2B83]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#F5B83D]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold text-[#F5B83D] uppercase tracking-widest block mb-2">
            Seleção Exclusiva
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Nossos Destaques
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9C7E6]/85 font-normal">
            Escolha o seu e peça pelo WhatsApp.
          </p>
        </div>

        {/* 3 Glassmorphism Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {products.map((product) => {
            const isGold = product.isGoldCard;

            return (
              <div
                key={product.id}
                className={`relative rounded-[24px] p-6 bg-white/[0.06] backdrop-blur-[14px] backdrop-saturate-[140%] border shadow-[0_20px_50px_rgba(0,0,0,0.35)] supports-[not_(backdrop-filter:blur(0px))]:bg-[#1A1420]/85 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group overflow-hidden ${
                  isGold
                    ? 'border-[#F5B83D]/60 shadow-[0_20px_50px_rgba(245,184,61,0.18)]'
                    : 'border-white/14 hover:border-white/30'
                }`}
              >
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
                    {product.ingredientChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="bg-white/[0.08] border border-white/10 px-2.5 py-1 rounded-md text-[12px] text-[#D9C7E6] font-medium whitespace-nowrap inline-flex items-center gap-1 shadow-sm"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & WhatsApp Action */}
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

                  {/* WhatsApp Pill Button in Gold Gradient with Dark Text */}
                  <a
                    href={getWhatsAppLink(product.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#F2D27A] to-[#C9971F] text-[#0B0710] font-poppins font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all border border-[#F2D27A]/50"
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

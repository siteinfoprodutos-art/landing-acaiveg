import React from 'react';
import { MessageCircle, Star, Sparkles } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const FinalCta: React.FC = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-[#2A0F3D] via-[#4A1A6B] to-[#0B0710] text-white relative z-20 overflow-hidden border-y border-[#C9971F]/30">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F2D27A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Emblem Logo Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0B0710] border border-[#C9971F]/60 shadow-2xl mb-8">
          <img
            src={IMAGES.logo}
            alt="Logo Açaí Veg"
            className="w-7 h-7 rounded-full object-contain bg-white p-0.5"
          />
          <span className="font-serif-luxury text-xs font-semibold text-[#F2D27A] tracking-wider">
            A felicidade em cada colherada
          </span>
        </div>

        {/* Serif Headline */}
        <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-2xl">
          Bateu a vontade de{' '}
          <span className="text-gold-gradient">
            Açaí agora?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-lg text-[#D9C7E6]/85 max-w-xl mx-auto leading-relaxed font-normal">
          Não passe vontade! Peça em 1 minuto pelo WhatsApp e receba seu copo geladinho
          e recheado direto na sua casa em Caieiras - SP.
        </p>

        {/* Large Green WhatsApp Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppLink('Olá! Bateu a vontade de açaí e quero pedir agora!')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green-wa px-10 py-5 rounded-full text-white font-poppins text-lg font-bold shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3 border border-emerald-300/40"
          >
            <MessageCircle className="w-7 h-7 fill-current" />
            <span>Chamar no WhatsApp Agora</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#F2D27A]">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-current text-[#F2D27A]" />
            <span>Atendimento Personalizado</span>
          </div>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F2D27A]" />
            <span>Toppings Premiados Fartos</span>
          </div>
          <span className="text-white/20">·</span>
          <div>🚀 Delivery Rápido em Caieiras</div>
        </div>
      </div>
    </div>
  );
};

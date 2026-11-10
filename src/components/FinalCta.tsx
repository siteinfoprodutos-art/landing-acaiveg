import React from 'react';
import { MessageCircle, Star, Sparkles } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const FinalCta: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#2b0d38] via-[#3b124d] to-[#2b0d38] text-white relative z-20 overflow-hidden border-y-4 border-[#8ec628]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Emblem Logo Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#1d0628] border-2 border-[#8ec628] shadow-2xl mb-6">
          <img
            src={IMAGES.logo}
            alt="Logo Açaí Veg"
            className="w-8 h-8 rounded-full object-contain bg-white p-0.5"
          />
          <span className="font-baloo text-sm font-bold text-[#8ec628] tracking-wide">
            A felicidade em cada colherada!
          </span>
        </div>

        <h2 className="font-baloo text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-2xl max-w-3xl mx-auto">
          Bateu a vontade de{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ec628] via-lime-300 to-[#F5B83D]">
            Açaí agora?
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-xl text-purple-100 max-w-xl mx-auto leading-relaxed">
          Não passe vontade! Peça em 2 minutos no WhatsApp e receba seu copo geladinho
          e super recheado direto na sua casa em Caieiras - SP.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppLink('Olá! Bateu a vontade de açaí e quero fazer um pedido agora!')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glossy-green px-10 py-5 rounded-full text-white font-baloo text-xl sm:text-2xl font-black shadow-2xl hover:scale-105 transition-all border-2 border-lime-300/50 inline-flex items-center gap-3"
          >
            <MessageCircle className="w-8 h-8 fill-white" />
            <span>Chamar no WhatsApp Agora</span>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-bold text-[#8ec628]">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-[#F5B83D] text-[#F5B83D]" />
            <span>Atendimento Rápido</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#8ec628]" />
            <span>Toppings Premiados</span>
          </div>
          <span>·</span>
          <div>🚀 Delivery em Laranjeiras · Caieiras</div>
        </div>
      </div>
    </section>
  );
};

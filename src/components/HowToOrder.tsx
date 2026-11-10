import React from 'react';
import { MessageSquare, Utensils, Home, ArrowRight } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Chame no WhatsApp',
      desc: 'Clique em qualquer botão do site para iniciar seu pedido diretamente com nossa equipe.',
    },
    {
      number: '02',
      title: 'Escolha seu copo e toppings',
      desc: 'Informe a opção desejada (300ml, 700ml ou Açaí Recheado) e personalize seus acompanhamentos.',
    },
    {
      number: '03',
      title: 'Receba em casa ou retire na loja',
      desc: 'Entrega ágil no seu endereço em Caieiras ou pronto para retirada no balcão.',
    },
  ];

  return (
    <div id="como-pedir" className="py-24 bg-[#0B0710] text-white relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] font-semibold text-[#F2D27A] uppercase tracking-widest block mb-2">
            Prático & Rápido
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Como Pedir
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9C7E6]/85 font-normal">
            Três passos simples para o seu momento de sabor.
          </p>
        </div>

        {/* 2-Column Ritual Layout (Left 3 Steps, Right Photo with Overlaid Gold Pill) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Numbered Gold Circle Steps */}
          <div className="lg:col-span-6 space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-5 group">
                {/* Gold Gradient Number Circle */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F2D27A] to-[#C9971F] text-[#0B0710] font-serif-luxury text-lg font-bold flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                <div className="flex-1 pb-6 border-b border-white/10 group-last:border-none">
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#F2D27A] transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#D9C7E6]/85 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <a
                href={getWhatsAppLink('Olá! Quero fazer meu pedido!')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green-wa px-8 py-3.5 rounded-full text-white font-poppins font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Fazer Pedido pelo WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Res Photo with Overlaid Gold Pill Badge (matching SeneLeaf ritual image) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md h-[400px] sm:h-[460px] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={IMAGES.garrafaRafaello}
                alt="Açaí Veg Laranjeiras"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0710] via-transparent to-transparent opacity-60" />

              {/* Overlaid Gold Pill Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 btn-gold-pill px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xl whitespace-nowrap border border-white/30">
                Açaí Veg – Sinta a felicidade
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

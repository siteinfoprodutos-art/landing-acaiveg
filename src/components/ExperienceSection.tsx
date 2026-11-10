import React from 'react';
import { Sparkles } from 'lucide-react';
import { IMAGES } from '../constants';

export const ExperienceSection: React.FC = () => {
  const leftFeatures = [
    {
      title: 'Açaí cremoso',
      desc: 'Polpa artesanal selecionada de alta pureza, totalmente sem cristais de gelo.',
    },
    {
      title: 'Toppings em fartura',
      desc: 'Camadas generosas de creme de avelã Nutella, paçoca, uvas verdes e Kit Kat.',
    },
  ];

  const rightFeatures = [
    {
      title: 'Feito na hora',
      desc: 'Frutas frescas fatiadas no momento do seu pedido para o máximo frescor.',
    },
    {
      title: 'Delivery e retirada',
      desc: 'Peça pelo WhatsApp e receba rápido em casa ou retire sem filas.',
    },
  ];

  return (
    <div id="experiencia" className="py-24 bg-purple-glow text-white relative z-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold text-[#F2D27A] uppercase tracking-widest block mb-2">
            Qualidade Incomparável
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            A Experiência Açaí Veg
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9C7E6]/85 font-normal">
            Cuidado artesanal em cada ingrediente para a sua melhor colherada.
          </p>
        </div>

        {/* 3-Column Experience Layout (Left 2, Center Image, Right 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 2 Blocks */}
          <div className="lg:col-span-4 flex flex-col gap-10 text-center lg:text-right">
            {leftFeatures.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-end">
                <div className="btn-gold-pill px-5 py-1.5 rounded-full text-xs uppercase tracking-wider inline-block mb-3 shadow-lg">
                  {item.title}
                </div>
                <p className="text-xs sm:text-sm text-[#D9C7E6]/85 font-normal leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Center Large Circular Image with Golden Glow */}
          <div className="lg:col-span-4 flex justify-center my-6 lg:my-0 relative">
            {/* Background Golden Radial Glow */}
            <div className="absolute inset-0 bg-[#F2D27A]/20 rounded-full blur-3xl pointer-events-none transform scale-125" />

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-[#C9971F] p-2 bg-[#0B0710] shadow-[0_0_50px_rgba(201,151,31,0.3)] flex items-center justify-center group overflow-hidden">
              <img
                src={IMAGES.copo700ml}
                alt="Super Copo Açaí Veg"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Floating Decorative Leaf Badge */}
              <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#C9971F] flex items-center justify-center text-[#0B0710] shadow-xl border-2 border-[#F2D27A]">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

          {/* Right 2 Blocks */}
          <div className="lg:col-span-4 flex flex-col gap-10 text-center lg:text-left">
            {rightFeatures.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start">
                <div className="btn-gold-pill px-5 py-1.5 rounded-full text-xs uppercase tracking-wider inline-block mb-3 shadow-lg">
                  {item.title}
                </div>
                <p className="text-xs sm:text-sm text-[#D9C7E6]/85 font-normal leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

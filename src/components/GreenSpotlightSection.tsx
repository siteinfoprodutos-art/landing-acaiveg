import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const GreenSpotlightSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Açaí 300ml Tradicional',
      price: 'R$ 13,00',
      desc: 'Leite em pó, leite condensado e Kit Kat crocante.',
      image: IMAGES.copo300ml,
    },
    {
      title: 'Super Copo 700ml',
      price: 'R$ 30,00',
      desc: 'Creme de avelã (Nutella), uva verde, leite em pó, paçoca e leite condensado.',
      image: IMAGES.copo700ml,
    },
    {
      title: 'Açaí Recheado com Creme de Rafaello',
      price: 'R$ 15,00',
      desc: 'Açaí premium + creme de Rafaello irresistível.',
      image: IMAGES.garrafaRafaello,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeProduct = slides[currentSlide];

  return (
    <section className="bg-lime-acai py-16 text-purple-950 relative z-20 shadow-2xl border-y-4 border-[#2E0F3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Side: Brand Text & Action Button */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-baloo font-black uppercase tracking-widest text-[#2E0F3D] bg-white/40 px-3.5 py-1 rounded-full border border-purple-900/20 mb-3">
              [ Qualidade Irresistível ]
            </span>

            <h2 className="font-baloo text-3xl sm:text-5xl font-extrabold text-[#2E0F3D] leading-none tracking-tight">
              aqui tem <br />
              <span className="text-white drop-shadow-md text-4xl sm:text-6xl font-black">
                Açaí Veg Laranjeiras
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-purple-950 font-medium leading-relaxed max-w-xl">
              Cremosidade artesanal de verdade, sem cristais de gelo e recheado com as melhores marcas.
              O ponto de encontro perfeito para matar a vontade de açaí em Caieiras - SP.
            </p>

            <div className="mt-5 space-y-2 text-sm font-bold text-purple-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-950 shrink-0" />
                <span>Toppings ilimitados em camadas fartas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-950 shrink-0" />
                <span>Delivery super ágil para Laranjeiras e região</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppLink(`Olá! Vim pela faixa destaque e quero pedir o ${activeProduct.title}!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glossy-red px-8 py-4 rounded-full text-white font-baloo font-extrabold text-lg flex items-center gap-3 shadow-xl hover:scale-105 transition-all border border-rose-300/40"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Side: Circular Spotlight Spotlight Frame (matching Split Açaí circular spotlight) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border-8 border-[#2E0F3D] p-2 bg-gradient-to-br from-purple-900 to-[#2E0F3D] shadow-2xl overflow-hidden group">
              {/* Product Photo */}
              <img
                src={activeProduct.image}
                alt={activeProduct.title}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Price Tag Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#2E0F3D] text-[#8ec628] font-baloo font-black text-lg px-4 py-1.5 rounded-full border-2 border-[#8ec628] shadow-lg whitespace-nowrap">
                {activeProduct.price}
              </div>

              {/* Navigation Circular Arrow Buttons (exact Split Açaí carousel controls) */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#2E0F3D] hover:bg-[#6B2B83] text-[#8ec628] border-2 border-[#8ec628] flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-7 h-7 stroke-[3]" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#2E0F3D] hover:bg-[#6B2B83] text-[#8ec628] border-2 border-[#8ec628] flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
                aria-label="Próximo"
              >
                <ChevronRight className="w-7 h-7 stroke-[3]" />
              </button>
            </div>

            {/* Spotlight Caption */}
            <div className="mt-4 text-center max-w-sm">
              <h4 className="font-baloo font-black text-xl text-[#2E0F3D]">
                {activeProduct.title}
              </h4>
              <p className="text-xs font-semibold text-purple-950 mt-1">
                {activeProduct.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

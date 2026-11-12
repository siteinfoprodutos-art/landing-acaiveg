import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Utensils, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink } from '../constants';

export const HowToOrder: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: 'Chame no WhatsApp',
      desc: 'Clique em qualquer botão do site para iniciar seu pedido diretamente com nossa equipe em Caieiras.',
    },
    {
      number: '02',
      icon: Utensils,
      title: 'Monte o seu Açaí',
      desc: 'Escolha o tamanho (300ml, 700ml ou Açaí Recheado) e selecione seus acompanhamentos e caldas favoritas.',
    },
    {
      number: '03',
      icon: CheckCircle2,
      title: 'Receba com Agilidade',
      desc: 'Entrega rápida no seu endereço em Laranjeiras / Caieiras ou pronto para retirada quentinho/gelado no balcão.',
    },
  ];

  return (
    <div ref={sectionRef} className="py-24 bg-[#0B0710] text-white relative z-20">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Line-by-Line Reveal and Drawing Gold Lines */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span
              className={`h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#F2D27A] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isInView ? 'scale-x-100 origin-right' : 'scale-x-0 origin-right'
              }`}
            />
            <span className="text-[11px] font-semibold text-[#F2D27A] uppercase tracking-widest block">
              Prático & Rápido
            </span>
            <span
              className={`h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#F2D27A] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isInView ? 'scale-x-100 origin-left' : 'scale-x-0 origin-left'
              }`}
            />
          </div>

          <div className="overflow-hidden">
            <h2
              className={`font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight transition-transform duration-700 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isInView ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              Como Fazer Seu Pedido
            </h2>
          </div>

          <p
            className={`mt-4 text-sm sm:text-base text-[#D9C7E6]/85 font-normal transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Três passos simples para saborear a felicidade em minutos.
          </p>
        </div>

        {/* 3-Column Ritual Steps Grid (Removed the right-hand bottle poster as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const delayStyle = { transitionDelay: `${200 + idx * 120}ms` };

            return (
              <div
                key={idx}
                className={`relative rounded-[24px] p-8 bg-[#14081F]/90 border border-white/10 hover:border-[#C9971F]/40 shadow-2xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={delayStyle}
              >
                {/* 1px Golden Line on top */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#F5B83D]/50 to-transparent" />

                <div>
                  {/* Step Number Circle + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F2D27A] to-[#C9971F] text-[#0B0710] font-serif-luxury text-xl font-extrabold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F2D27A] group-hover:bg-[#F2D27A]/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#F2D27A] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#D9C7E6]/85 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-[#F2D27A]/80 uppercase tracking-wider">
                  <span>Passo {step.number}</span>
                  <div className="h-0.5 flex-1 bg-white/5 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Centralized WhatsApp Action Button with Shimmer & Subtle Pulse Ring */}
        <div className="text-center">
          <div className="relative inline-block">
            {/* Soft Ambient Pulse Ring */}
            <span className="pulse-ring-effect absolute inset-0 rounded-full bg-[#3C9A34] pointer-events-none" />

            <a
              href={getWhatsAppLink('Olá! Quero fazer meu pedido!')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer relative z-10 btn-green-wa px-9 py-4 rounded-full text-white font-poppins font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Chamar no WhatsApp Agora</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

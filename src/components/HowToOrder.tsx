import React from 'react';
import { MessageSquare, Utensils, Home, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '../constants';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Chame no WhatsApp',
      desc: 'Clique em qualquer botão do site para abrir nossa conversa oficial no WhatsApp (11) 94274-6745.',
      icon: MessageSquare,
      badge: 'Atendimento Imediato',
    },
    {
      number: '02',
      title: 'Monte seu copo e toppings',
      desc: 'Indique se quer 300ml, 500ml ou 700ml e escolha os acompanhamentos e caldas que mais ama.',
      icon: Utensils,
      badge: 'Monte do seu jeito',
    },
    {
      number: '03',
      title: 'Receba em casa ou retire',
      desc: 'Envie seu endereço em Caieiras para delivery super rápido ou venha retirar direto no balcão.',
      icon: Home,
      badge: 'Delivery & Retirada',
    },
  ];

  return (
    <section id="como-pedir" className="py-20 bg-[#2b0d38] text-white relative z-20 border-b-2 border-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="font-baloo text-sm font-black text-[#8ec628] uppercase tracking-widest mb-1">
            [ Simples & Rápido ]
          </div>
          <h2 className="font-baloo text-3xl sm:text-5xl font-extrabold text-white mt-1">
            Como Pedir Seu Açaí
          </h2>
          <p className="mt-2 text-base text-purple-200">
            Fazer seu pedido na Açaí Veg Laranjeiras leva menos de 2 minutos!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#3b124d]/80 p-8 rounded-3xl border border-purple-600/40 hover:border-[#8ec628] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative group shadow-2xl"
              >
                <span className="absolute top-4 right-6 font-baloo font-black text-6xl text-white/5 select-none group-hover:text-[#8ec628]/10 transition-colors">
                  {step.number}
                </span>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#2E0F3D] flex items-center justify-center text-white border-2 border-[#8ec628] shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-[#8ec628]" />
                    </div>
                    <span className="text-[10px] font-extrabold text-[#8ec628] bg-purple-950 px-2.5 py-1 rounded-full border border-[#8ec628]/40">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-baloo text-2xl font-bold text-white group-hover:text-[#8ec628] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm text-purple-200 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-800/80 flex items-center text-xs font-bold text-[#8ec628] gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Passo {step.number}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href={getWhatsAppLink('Olá! Quero fazer meu pedido no WhatsApp!')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glossy-green px-8 py-4 rounded-full text-white font-baloo text-lg font-bold shadow-2xl inline-flex items-center gap-3 border border-lime-300/40 hover:scale-105 transition-all"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>Fazer Meu Pedido pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

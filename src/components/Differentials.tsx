import React from 'react';
import { Sparkles, Heart, Coffee, Truck } from 'lucide-react';

export const Differentials: React.FC = () => {
  const items = [
    {
      icon: Sparkles,
      title: 'Açaí Cremoso',
      desc: 'Sem cristais de gelo! Polpa pura de açaí com textura artesanal super aveludada e geladinha.',
      badge: 'Qualidade 100%',
    },
    {
      icon: Heart,
      title: 'Toppings à Vontade',
      desc: 'Ninho, Nutella, Kit Kat, paçoca, condensed milk e frutas selecionadas em camadas bem servidas.',
      badge: 'Recheio de Verdade',
    },
    {
      icon: Coffee,
      title: 'Copos 300ml a 700ml',
      desc: 'Tamanhos ideais do lanchinho da tarde até o super copo 700ml para compartilhar ou devorar.',
      badge: 'Para toda Fome',
    },
    {
      icon: Truck,
      title: 'Delivery & Retirada',
      desc: 'Entregamos em Laranjeiras e Caieiras rapidinho no seu endereço ou retire no balcão.',
      badge: 'Atendimento Rápido',
    },
  ];

  return (
    <section id="diferenciais" className="py-16 bg-[#2E0F3D] text-white relative z-20 border-t-2 border-[#8ec628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="font-baloo text-sm font-black text-[#8ec628] uppercase tracking-widest mb-1">
            [ Por que escolher a Açaí Veg? ]
          </div>
          <h2 className="font-baloo text-2xl sm:text-4xl font-extrabold text-white mt-1">
            O Padrão de Qualidade que Caieiras Ama!
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#2b0d38] p-6 rounded-3xl border border-purple-600/30 hover:border-[#8ec628] transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#3b124d] flex items-center justify-center text-white border border-[#8ec628]/40 shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#8ec628]" />
                    </div>
                    <span className="text-[10px] font-extrabold text-[#8ec628] bg-purple-950 px-2.5 py-0.5 rounded-full border border-[#8ec628]/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-baloo text-xl font-bold text-white group-hover:text-[#8ec628] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-purple-200/90 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

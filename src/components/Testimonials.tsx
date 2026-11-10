import React from 'react';
import { Star, Quote } from 'lucide-react';

/*
  <!-- Para substituir por depoimentos reais do Instagram / Google Reviews: -->
  Substitua a lista `reviewsList` abaixo com os dados reais dos seus clientes.
*/

interface Review {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
  favoriteCop: string;
  avatarUrl: string;
}

export const Testimonials: React.FC = () => {
  const reviewsList: Review[] = [
    {
      id: 1,
      name: 'Mariana Silveira',
      location: 'Caieiras - SP',
      comment:
        'Melhor açaí da região sem dúvidas! A textura é extremamente cremosa, não tem aquele gelo ruim e a quantidade de Nutella no copo de 700ml é sensacional!',
      rating: 5,
      favoriteCop: 'Copo 700ml',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 2,
      name: 'Rodrigo Vasconcelos',
      location: 'Caieiras - SP',
      comment:
        'Atendimento super atencioso pelo WhatsApp e a entrega foi super rápida na minha casa em Laranjeiras. Açaí bem geladinho e frutas fresquinhas!',
      rating: 5,
      favoriteCop: 'Açaí 300ml',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 3,
      name: 'Fernanda & Lucas',
      location: 'Laranjeiras, Caieiras',
      comment:
        'Pedimos no final de semana e todo mundo amou! O Kit Kat e a paçoca vm crocantes. O verdadeiro açaí com sabor de felicidade!',
      rating: 5,
      favoriteCop: 'Açaí Rafaello',
      avatarUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <div id="depoimentos" className="py-24 bg-purple-glow text-white relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] font-semibold text-[#F2D27A] uppercase tracking-widest block mb-2">
            Avaliações
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Quem Provou, Aprovou
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9C7E6]/85 font-normal">
            O carinho de quem já é cliente apaixonado da Açaí Veg Laranjeiras.
          </p>
        </div>

        {/* 3 Dark Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="bg-[#1A1420] p-8 rounded-[20px] border border-white/10 shadow-2xl hover:border-[#C9971F]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#C9971F]/15 group-hover:text-[#C9971F]/30 transition-colors pointer-events-none" />

              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F2D27A] text-[#F2D27A]" />
                  ))}
                  <span className="text-xs font-bold text-[#F2D27A] ml-1">5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-[#D9C7E6]/90 leading-relaxed italic font-normal">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={review.avatarUrl}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#C9971F]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(review.name) +
                      '&background=C9971F&color=0B0710';
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-serif-luxury font-bold text-sm text-white leading-tight">
                    {review.name}
                  </span>
                  <span className="text-[11px] text-[#F2D27A] font-medium">
                    {review.location} · {review.favoriteCop}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

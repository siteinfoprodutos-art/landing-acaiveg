import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';

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
      favoriteCop: 'Copo 700ml com Nutella',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 2,
      name: 'Rodrigo Vasconcelos',
      location: 'Caieiras - SP',
      comment:
        'Atendimento super atencioso pelo WhatsApp e a entrega foi super rápida na minha casa em Laranjeiras. Açaí super geladinho e frutas fresquinhas!',
      rating: 5,
      favoriteCop: 'Copo 500ml Tradicional',
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
      favoriteCop: 'Taça Especial da Temporada',
      avatarUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <section id="depoimentos" className="py-20 bg-purple-pattern text-white relative z-20 border-t-2 border-[#8ec628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="font-baloo text-sm font-black text-[#8ec628] uppercase tracking-widest mb-1">
            [ Depoimentos dos Clientes ]
          </div>
          <h2 className="font-baloo text-3xl sm:text-5xl font-extrabold text-white">
            Quem Provou, Aprovou!
          </h2>
          <p className="mt-2 text-base text-purple-200">
            Veja o carinho de quem já é cliente apaixonado da Açaí Veg Laranjeiras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="bg-[#2b0d38]/95 p-8 rounded-3xl border border-purple-600/40 hover:border-[#8ec628] shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#8ec628]/10 group-hover:text-[#8ec628]/30 transition-colors pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5B83D] text-[#F5B83D]" />
                  ))}
                  <span className="text-xs font-bold text-[#8ec628] ml-1">5.0</span>
                </div>

                <p className="text-sm text-purple-100 leading-relaxed italic font-normal">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-800/80 flex items-center gap-3">
                <img
                  src={review.avatarUrl}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#8ec628]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(review.name) +
                      '&background=8ec628&color=1d0628';
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-baloo font-bold text-base text-white leading-tight">
                    {review.name}
                  </span>
                  <span className="text-xs text-[#8ec628] font-medium">
                    {review.location} · {review.favoriteCop}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

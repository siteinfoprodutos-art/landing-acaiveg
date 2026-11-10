import React from 'react';
import { MessageCircle, Star, Sparkles } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

interface HighlightProduct {
  id: string;
  name: string;
  ingredients: string;
  price: string;
  image: string;
  badge?: string;
  waMessage: string;
}

export const FeaturedProducts: React.FC = () => {
  const products: HighlightProduct[] = [
    {
      id: 'copo-300',
      name: 'Açaí 300ml',
      ingredients: 'leite em pó, leite condensado e Kit Kat',
      price: 'R$ 13,00',
      image: IMAGES.copo300ml,
      waMessage: 'Olá! Quero o Açaí 300ml (R$ 13,00)',
    },
    {
      id: 'copo-700',
      name: 'Copo 700ml',
      ingredients: 'açaí, creme de avelã, uva, leite em pó, paçoca e leite condensado',
      price: 'R$ 30,00',
      image: IMAGES.copo700ml,
      badge: 'Mais completo',
      waMessage: 'Olá! Quero o Copo 700ml (R$ 30,00)',
    },
    {
      id: 'garrafa-rafaello',
      name: 'Açaí Recheado com Creme de Rafaello',
      ingredients: 'açaí premium + creme de Rafaello',
      price: 'R$ 15,00',
      image: IMAGES.garrafaRafaello,
      badge: 'Novidade',
      waMessage: 'Olá! Quero o Açaí Recheado com Creme de Rafaello (R$ 15,00)',
    },
  ];

  return (
    <div className="py-16 bg-[#F4E9F8] text-[#2E0F3D] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-baloo text-3xl sm:text-5xl font-extrabold text-[#2E0F3D]">
            Nossos destaques
          </h2>
          <p className="mt-2 text-base text-[#2E0F3D]/80">
            Escolha o seu e peça pelo WhatsApp.
          </p>
        </div>

        {/* 3 Cards Grid (Desktop 3 Cols, Mobile 1 Col) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#6B2B83]/15 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Golden Badge if present */}
              {product.badge && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#F5B83D] to-amber-500 text-purple-950 font-baloo font-extrabold text-xs px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1 border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-purple-950 text-purple-950" />
                  <span>{product.badge}</span>
                </div>
              )}

              <div>
                {/* Product Image Frame with 3% hover zoom */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 rounded-t-3xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-baloo text-2xl font-bold text-[#2E0F3D] leading-tight">
                    {product.name}
                  </h3>

                  {/* Single Line Ingredients */}
                  <p className="mt-2 text-xs sm:text-sm text-[#2E0F3D]/80 font-normal truncate" title={product.ingredients}>
                    {product.ingredients}
                  </p>

                  {/* Price in Baloo 2 Purple */}
                  <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#6B2B83] uppercase tracking-wider">
                      Valor
                    </span>
                    <span className="font-baloo text-3xl font-black text-[#6B2B83]">
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <div className="p-6 pt-0">
                <a
                  href={getWhatsAppLink(product.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#3C9A34] hover:bg-[#34852d] text-white font-baloo font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Pedir no WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

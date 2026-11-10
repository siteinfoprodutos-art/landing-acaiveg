import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../constants';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const faqItems: FaqItem[] = [
    {
      id: 1,
      question: 'Quais são os horários de funcionamento e formas de pagamento?',
      answer:
        'Atendemos de Terça a Domingo, das 12h às 22h. Aceitamos Pix, cartões de crédito e débito das principais bandeiras e vales-refeição.',
    },
    {
      id: 2,
      question: 'Como funciona a entrega e qual o raio de atendimento em Caieiras?',
      answer:
        'Entregamos em Laranjeiras, Caieiras e bairros vizinhos. Consulte a taxa pelo WhatsApp! Seu copo viaja embalado em isolamento térmico para chegar super geladinho.',
    },
    {
      id: 3,
      question: 'Quais são os tamanhos dos copos e opções disponíveis?',
      answer:
        'Trabalhamos com o Açaí 300ml clássico, o Super Copo 700ml completo e a garrafa especial de Açaí Recheado com Creme de Rafaello.',
    },
    {
      id: 4,
      question: 'Posso escolher meus toppings e adicionais?',
      answer:
        'Com certeza! Cada copo vem com os toppings tradicionais premiados (Nutella, Kit Kat, Paçoca, Ninho, Uva Verde) e você pode solicitar ajustes direto no WhatsApp.',
    },
    {
      id: 5,
      question: 'Vocês fazem pedidos para festas, aniversários e eventos corporativos?',
      answer:
        'Sim! Aceitamos encomendas para eventos e empresas com condições exclusivas. Fale com nossa equipe com antecedência pelo WhatsApp.',
    },
  ];

  return (
    <div id="faq" className="py-24 bg-[#0B0710] text-white relative z-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-[#F2D27A] uppercase tracking-widest block mb-2">
            Tire suas Dúvidas
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9C7E6]/85 font-normal">
            Respostas para as dúvidas mais comuns dos nossos clientes.
          </p>
        </div>

        {/* Accordion with Fine Gold Hairline Dividers */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#1A1420] rounded-[16px] border border-[#C9971F]/20 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif-luxury text-base sm:text-lg font-semibold text-white hover:text-[#F2D27A] transition-colors focus:outline-none"
                >
                  <span>{item.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#C9971F] text-[#0B0710] border-[#F2D27A] rotate-180'
                        : 'bg-white/5 text-[#F2D27A] border-white/10'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#D9C7E6]/85 leading-relaxed border-t border-white/5 font-normal">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Banner */}
        <div className="mt-12 p-8 rounded-[20px] bg-gradient-to-r from-[#2A0F3D] to-[#4A1A6B] border border-[#C9971F]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xl">
          <div>
            <h4 className="font-serif-luxury font-bold text-lg text-white">
              Ainda tem alguma dúvida?
            </h4>
            <p className="text-xs text-[#D9C7E6]/85 mt-1">
              Fale diretamente com nosso atendimento no WhatsApp!
            </p>
          </div>

          <a
            href={getWhatsAppLink('Olá! Tenho uma dúvida sobre a Açaí Veg.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green-wa px-6 py-2.5 rounded-full font-poppins font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shrink-0 shadow-lg hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
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
        'Fazemos entregas ágeis em Laranjeiras, Caieiras e regiões vizinhas. Consulte a taxa pelo WhatsApp! Seu açaí viaja embalado com isolamento térmico para chegar super geladinho.',
    },
    {
      id: 3,
      question: 'Quais os tamanhos dos copos e adicionais disponíveis?',
      answer:
        'Trabalhamos com copos de 300ml, 500ml e o super copo 700ml. Oferecemos mais de 15 acompanhamentos, incluindo Kit Kat, creme de avelã (Nutella), leite em pó Ninho, paçoca, condensed milk e frutas frescas.',
    },
    {
      id: 4,
      question: 'Vocês fazem pedidos para festas, aniversários e eventos corporativos?',
      answer:
        'Sim! Aceitamos encomendas especiais e minicopos para comemorações e empresas. Entre em contato com antecedência pelo WhatsApp para condições especiais.',
    },
    {
      id: 5,
      question: 'Possuem opções com frutas da época e sem açúcar?',
      answer:
        'Oferecemos açaí puro selecionado e acompanhamentos variados como morango, banana e uva verde. Fale conosco no WhatsApp para tirarmos qualquer dúvida.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#2b0d38] text-white relative z-20 border-t-2 border-purple-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="font-baloo text-sm font-black text-[#8ec628] uppercase tracking-widest mb-1">
            [ Tire suas Dúvidas ]
          </div>
          <h2 className="font-baloo text-3xl sm:text-5xl font-extrabold text-white">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="mt-2 text-base text-purple-200">
            Respostas para as dúvidas mais comuns sobre nosso atendimento e entrega.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#3b124d]/80 rounded-2xl border border-purple-600/40 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-baloo text-lg sm:text-xl font-bold text-white hover:text-[#8ec628] transition-colors focus:outline-none"
                >
                  <span>{item.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#8ec628] text-purple-950 font-bold' : 'bg-purple-950 text-[#8ec628]'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-purple-100 leading-relaxed border-t border-purple-700/50 font-normal">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-[#3b124d] to-[#2E0F3D] border-2 border-[#8ec628] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
          <div>
            <h4 className="font-baloo font-extrabold text-lg text-white">
              Ainda tem alguma dúvida?
            </h4>
            <p className="text-xs sm:text-sm text-purple-200">
              Chame nossa equipe no WhatsApp para atendimento direto!
            </p>
          </div>

          <a
            href={getWhatsAppLink('Olá! Tenho uma dúvida sobre a Açaí Veg.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glossy-green px-6 py-2.5 rounded-full text-white font-baloo font-bold text-sm inline-flex items-center gap-2 shrink-0 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

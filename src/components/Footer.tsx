import React from 'react';
import { Instagram, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Destaques', href: '#destaques' },
    { name: 'Experiência', href: '#experiencia' },
    { name: 'Como Pedir', href: '#como-pedir' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#localizacao' },
  ];

  return (
    <footer className="bg-[#0B0710] text-white pt-20 pb-12 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border-2 border-[#C9971F] overflow-hidden shadow-lg bg-[#0B0710] p-0.5">
                <img
                  src={IMAGES.logo}
                  alt="Logo Açaí Veg Laranjeiras"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif-luxury text-2xl font-bold text-white leading-none">
                  Açaí Veg
                </span>
                <span className="text-[10px] font-semibold text-[#F2D27A] tracking-widest uppercase mt-0.5">
                  Laranjeiras · Caieiras
                </span>
              </div>
            </a>

            <p className="mt-4 text-xs sm:text-sm text-[#D9C7E6]/85 max-w-sm leading-relaxed font-normal">
              "{BRAND.slogan}"
              <br />
              O açaí mais cremoso e recheado do seu bairro.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3C9A34] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>

              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F2D27A] hover:scale-110 transition-transform shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Anchor Links */}
          <div className="md:col-span-4">
            <h4 className="font-serif-luxury font-bold text-base text-[#F2D27A] mb-4 tracking-wider uppercase">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#D9C7E6]/85">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#F2D27A] transition-colors font-serif-luxury"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Summary */}
          <div className="md:col-span-3">
            <h4 className="font-serif-luxury font-bold text-base text-[#F2D27A] mb-4 tracking-wider uppercase">
              Contato Rápido
            </h4>
            <div className="text-xs sm:text-sm text-[#D9C7E6]/85 space-y-2">
              <p className="font-semibold text-white">WhatsApp:</p>
              <p className="text-[#3C9A34] font-bold">{BRAND.whatsappFormatted}</p>
              <p className="pt-2 font-semibold text-white">Instagram:</p>
              <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#F2D27A] font-medium hover:underline">
                {BRAND.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9C7E6]/60">
          <p>© 2026 Açaí Veg Laranjeiras. Todos os direitos reservados.</p>

          <div className="flex items-center gap-1.5">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para Laranjeiras · Caieiras</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#F2D27A] hover:bg-[#C9971F] hover:text-[#0B0710] transition-all shadow-md"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

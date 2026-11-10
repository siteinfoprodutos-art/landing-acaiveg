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
    { name: 'Como Pedir', href: '#como-pedir' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Localização', href: '#localizacao' },
  ];

  return (
    <footer className="bg-[#2E0F3D] text-white pt-16 pb-12 border-t border-[#6B2B83]/50 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between pb-12 border-b border-purple-800/60">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full p-0.5 border-2 border-[#F5B83D] overflow-hidden shadow-lg bg-white">
                <img
                  src={IMAGES.logo}
                  alt="Logo Açaí Veg Laranjeiras"
                  className="w-full h-full object-contain scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-baloo text-2xl font-extrabold text-white leading-none">
                  Açaí Veg
                </span>
                <span className="text-xs font-semibold text-[#F5B83D] tracking-widest uppercase">
                  Laranjeiras · Caieiras
                </span>
              </div>
            </a>

            <p className="mt-4 text-sm text-purple-200 max-w-sm leading-relaxed font-normal">
              "{BRAND.slogan}"
              <br />
              O açaí mais cremoso, recheado e saboroso do seu bairro.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3C9A34] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
              </a>

              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Anchor Links */}
          <div className="md:col-span-4">
            <h4 className="font-baloo font-bold text-lg text-[#F5B83D] mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-purple-200">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#F5B83D] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Summary */}
          <div className="md:col-span-3">
            <h4 className="font-baloo font-bold text-lg text-[#F5B83D] mb-4">
              Contato Rápido
            </h4>
            <div className="text-sm text-purple-200 space-y-2">
              <p className="font-semibold text-white">WhatsApp:</p>
              <p className="text-[#3C9A34] font-bold">{BRAND.whatsappFormatted}</p>
              <p className="pt-2 font-semibold text-white">Instagram:</p>
              <p className="text-pink-400 font-medium">{BRAND.instagramHandle}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/80">
          <p>© 2026 Açaí Veg Laranjeiras. Todos os direitos reservados.</p>

          <div className="flex items-center gap-2">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para Laranjeiras</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-purple-900/80 text-[#F5B83D] hover:bg-[#6B2B83] hover:text-white transition-all shadow-md"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

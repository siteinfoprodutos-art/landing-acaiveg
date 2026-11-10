import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Destaques', href: '#destaques' },
    { name: 'Experiência', href: '#experiencia' },
  ];

  const rightNavLinks = [
    { name: 'Como pedir', href: '#como-pedir' },
    { name: 'Contato', href: '#localizacao' },
  ];

  const allNavLinks = [...leftNavLinks, ...rightNavLinks];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0B0710]/90 backdrop-blur-md border-[#C9971F]/30 py-2.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B0710]/95 via-[#0B0710]/70 to-transparent border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left Action: Instagram Icon */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#F2D27A] hover:scale-110 transition-all"
                aria-label="Instagram @acai.veg"
                title="Siga no Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Left Serif Links for Desktop */}
              <nav className="hidden lg:flex items-center gap-6 ml-4">
                {leftNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-serif-luxury text-xs font-medium text-purple-100/90 hover:text-[#F2D27A] transition-colors whitespace-nowrap tracking-wider"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Center Logo Lockup (Matching SeneLeaf centered brand emblem) */}
            <a href="#inicio" className="flex items-center gap-3 group shrink-0">
              <img
                src={IMAGES.logo}
                srcSet={`${IMAGES.logo} 1x, ${IMAGES.logo} 2x`}
                alt="Logo Açaí Veg Laranjeiras"
                className="h-[44px] md:h-[48px] lg:h-[52px] w-auto object-contain block shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_14px_rgba(245,184,61,0.35)]"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col text-left">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-white tracking-tight leading-none group-hover:text-[#F2D27A] transition-colors">
                  Açaí Veg
                </span>
                <span className="text-[9px] font-semibold text-[#F2D27A] tracking-widest uppercase mt-0.5">
                  LARANJEIRAS · CAIEIRAS
                </span>
              </div>
            </a>

            {/* Right Action: WhatsApp Icon & Right Links */}
            <div className="flex items-center gap-4 shrink-0">
              <nav className="hidden lg:flex items-center gap-6 mr-4">
                {rightNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-serif-luxury text-xs font-medium text-purple-100/90 hover:text-[#F2D27A] transition-colors whitespace-nowrap tracking-wider"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3C9A34] hover:bg-[#34852d] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all border border-emerald-300/40"
                aria-label="WhatsApp"
                title="Chamar no WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#F2D27A]" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0710]/95 backdrop-blur-xl border-b border-[#C9971F]/40 px-6 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top duration-200 text-white">
          <div className="flex flex-col gap-3">
            {allNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif-luxury text-sm font-medium py-2 px-3 rounded-lg hover:bg-white/5 text-purple-100 hover:text-[#F2D27A] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

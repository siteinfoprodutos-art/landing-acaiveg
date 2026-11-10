import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Destaques', href: '#destaques' },
    { name: 'Como Pedir', href: '#como-pedir' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Localização', href: '#localizacao' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#2b0d38]/95 backdrop-blur-md shadow-2xl py-2 border-b border-[#3C9A34]/40'
            : 'bg-gradient-to-b from-[#1d0628] via-[#2b0d38]/90 to-transparent py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Emblem - 100% Fill of Circle */}
            <a href="#inicio" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#F5B83D] shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center bg-[#6B2B83]">
                <img
                  src={IMAGES.logo}
                  alt="Logo Açaí Veg Laranjeiras"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-baloo text-2xl font-black text-white tracking-tight leading-none group-hover:text-[#F5B83D] transition-colors">
                  Açaí Veg
                </span>
                <span className="text-[10px] font-bold text-[#F5B83D] tracking-widest uppercase">
                  Laranjeiras · Caieiras
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold text-white/90 hover:text-[#F5B83D] transition-colors whitespace-nowrap shrink-0 hover:underline tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#F5B83D]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2b0d38] border-b-2 border-[#3C9A34] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200 text-white">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold py-2 px-3 rounded-lg hover:bg-[#6B2B83] text-white hover:text-[#F5B83D]"
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

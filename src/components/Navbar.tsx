import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past hero trigger point
      setIsScrolled(currentScrollY > 60);

      // Hide on scroll down, show on scroll up (with 10px buffer)
      if (currentScrollY > 160) {
        if (currentScrollY > lastScrollY + 8) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY - 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver for sliding golden underline
  useEffect(() => {
    const sectionIds = ['inicio', 'destaques', 'experiencia', 'como-pedir', 'localizacao'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const leftNavLinks = [
    { name: 'Início', href: '#inicio', id: 'inicio' },
    { name: 'Destaques', href: '#destaques', id: 'destaques' },
    { name: 'Experiência', href: '#experiencia', id: 'experiencia' },
  ];

  const rightNavLinks = [
    { name: 'Como pedir', href: '#como-pedir', id: 'como-pedir' },
    { name: 'Contato', href: '#localizacao', id: 'localizacao' },
  ];

  const allNavLinks = [...leftNavLinks, ...rightNavLinks];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0B0710]/95 border-[#C9971F]/25 py-2.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B0710]/95 via-[#0B0710]/60 to-transparent border-transparent py-3.5'
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

              {/* Left Serif Links for Desktop with Active Sliding Underline (Item 7) */}
              <nav className="hidden lg:flex items-center gap-6 ml-4">
                {leftNavLinks.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`relative font-serif-luxury text-xs font-medium py-1.5 transition-colors whitespace-nowrap tracking-wider ${
                        isActive ? 'text-[#F2D27A]' : 'text-purple-100/80 hover:text-[#F2D27A]'
                      }`}
                    >
                      {link.name}
                      {/* Sliding active golden underline */}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5B83D] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive ? 'scale-x-100 origin-left' : 'scale-x-0 origin-left'
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Center Logo Lockup (Uncut logo without circular clipping, height 52px desktop / 44px mobile) */}
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

            {/* Right Action: WhatsApp Icon & Right Links with Active Underline (Item 7) */}
            <div className="flex items-center gap-4 shrink-0">
              <nav className="hidden lg:flex items-center gap-6 mr-4">
                {rightNavLinks.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`relative font-serif-luxury text-xs font-medium py-1.5 transition-colors whitespace-nowrap tracking-wider ${
                        isActive ? 'text-[#F2D27A]' : 'text-purple-100/80 hover:text-[#F2D27A]'
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5B83D] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive ? 'scale-x-100 origin-left' : 'scale-x-0 origin-left'
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer w-9 h-9 rounded-full bg-[#3C9A34] hover:bg-[#34852d] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all border border-emerald-300/40"
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
        <div className="lg:hidden bg-[#0B0710]/98 border-b border-[#C9971F]/40 px-6 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top duration-200 text-white">
          <div className="flex flex-col gap-3">
            {allNavLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif-luxury text-sm font-medium py-2 px-3 rounded-lg hover:bg-white/5 transition-colors ${
                    isActive ? 'text-[#F2D27A] bg-white/5' : 'text-purple-100 hover:text-[#F2D27A]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

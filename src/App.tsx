import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroScrollCanvas } from './components/HeroScrollCanvas';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ExperienceSection } from './components/ExperienceSection';
import { HowToOrder } from './components/HowToOrder';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AnimatedSection } from './components/AnimatedSection';

import { DripDivider } from './components/DripDivider';
import { MarqueeBanner } from './components/MarqueeBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0710] text-white font-poppins selection:bg-[#C9971F] selection:text-[#0B0710] overflow-x-clip">
      {/* 1. Header Fino Translúcido com Blur */}
      <Navbar />

      {/* 2. HERO MANTIDA EXATAMENTE COMO ESTÁ (Motor de Vídeo Canvas no Scroll Preservado) */}
      {/* =========================================================================
          BLOCO DO EFEITO DE SCROLL DA HERO (NÃO MODIFICADO)
          - Sequência de frames em canvas sticky 100vh em container 400vh
          - Progressão com lerp suave (0.15) e requestAnimationFrame
          - Preload e fallback com botão ?dev=1 ativado
          - Textos elegantes flutuantes sem caixas/cards obscuros
          ========================================================================= */}
      <HeroScrollCanvas />

      {/* 3. Seção "Nossos Destaques" (Cortina que sobe por cima do último frame com -mt-[12vh] e cantos 40px) */}
      <AnimatedSection id="destaques">
        <FeaturedProducts />
      </AnimatedSection>

      {/* Divisória em Gota (scaleY de 0 a 1) com cor do degradê de cima (#2A0F3D) */}
      <DripDivider fillColor="#2A0F3D" className="-mt-1" />

      {/* Faixa em Movimento Contínuo (Marquee Infinito com Inércia ao Scroll) */}
      <MarqueeBanner />

      {/* Divisória em Gota sutil invertida ou fluida */}
      <DripDivider fillColor="#14081F" className="-mb-1" />

      {/* 4. Seção "A Experiência Açaí Veg" */}
      <AnimatedSection id="experiencia">
        <ExperienceSection />
      </AnimatedSection>

      {/* Divisória em Gota fluida entre Experiência e Como Pedir */}
      <DripDivider fillColor="#14081F" className="-mt-1" />

      {/* 5. Seção "Como Pedir" (Com a parte antiga da garrafa/poster removida como pedido) */}
      <AnimatedSection id="como-pedir">
        <HowToOrder />
      </AnimatedSection>

      {/* 6. Depoimentos (Cards Escuros #1A1420 com 5 Estrelas Douradas) */}
      <AnimatedSection id="depoimentos">
        <Testimonials />
      </AnimatedSection>

      {/* 7. FAQ (Acordeão com Divisores Finos Dourados) */}
      <AnimatedSection id="faq">
        <Faq />
      </AnimatedSection>

      {/* 8. CTA Final (Faixa Degradê Roxo/Dourado) */}
      <AnimatedSection>
        <FinalCta />
      </AnimatedSection>

      {/* 9. Localização e Contato (Card Escuro com Mapa de Borda Dourada Fina) */}
      <AnimatedSection id="localizacao">
        <LocationAndContact />
      </AnimatedSection>

      {/* 10. Rodapé Preto #0B0710 */}
      <AnimatedSection>
        <Footer />
      </AnimatedSection>

      {/* Extra: Botão Flutuante Compacto de WhatsApp (48px) */}
      <FloatingWhatsApp />
    </div>
  );
}

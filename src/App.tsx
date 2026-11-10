import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroScrollCanvas } from './components/HeroScrollCanvas';
import { GreenSpotlightSection } from './components/GreenSpotlightSection';
import { Differentials } from './components/Differentials';
import { FeaturedProducts } from './components/FeaturedProducts';
import { HowToOrder } from './components/HowToOrder';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AnimatedSection } from './components/AnimatedSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#2b0d38] text-white font-poppins selection:bg-[#3C9A34] selection:text-white">
      {/* Fixed Navbar (No top WhatsApp button, logo 100% fill) */}
      <Navbar />

      {/* Hero with Video Scroll Effect (Unchanged) */}
      <HeroScrollCanvas />

      {/* 1. Differentials */}
      <AnimatedSection id="diferenciais">
        <Differentials />
      </AnimatedSection>

      {/* 2. Green Spotlight Banner */}
      <AnimatedSection>
        <GreenSpotlightSection />
      </AnimatedSection>

      {/* 3. Featured Products ("Nossos destaques" - 3 Cards with copo300, copo700, garrafa) */}
      <AnimatedSection id="destaques">
        <FeaturedProducts />
      </AnimatedSection>

      {/* 4. How To Order */}
      <AnimatedSection id="como-pedir">
        <HowToOrder />
      </AnimatedSection>

      {/* 5. Testimonials */}
      <AnimatedSection id="depoimentos">
        <Testimonials />
      </AnimatedSection>

      {/* 6. FAQ Accordion */}
      <AnimatedSection id="faq">
        <Faq />
      </AnimatedSection>

      {/* 7. Final CTA Banner */}
      <AnimatedSection>
        <FinalCta />
      </AnimatedSection>

      {/* 8. Location & Contact */}
      <AnimatedSection id="localizacao">
        <LocationAndContact />
      </AnimatedSection>

      {/* 9. Footer */}
      <AnimatedSection>
        <Footer />
      </AnimatedSection>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}

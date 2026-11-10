import React from 'react';
import { MapPin, Clock, MessageCircle, Navigation, Phone, ExternalLink } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const LocationAndContact: React.FC = () => {
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Avenida Paulicéia 342 Laranjeiras Caieiras SP Acai Veg'
  )}`;

  return (
    <div id="localizacao" className="py-24 bg-[#0B0710] text-white relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] font-semibold text-[#F2D27A] uppercase tracking-widest block mb-2">
            Venha Conhecer
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Localização e Contato
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9C7E6]/85 font-normal">
            Estamos no coração de Laranjeiras, prontos para te atender!
          </p>
        </div>

        {/* Info Card & Google Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card (#1A1420) */}
          <div className="lg:col-span-5 bg-[#1A1420] p-8 sm:p-10 rounded-[20px] border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-[#C9971F] bg-[#0B0710] p-1 flex items-center justify-center shrink-0">
                  <img
                    src={IMAGES.logo}
                    alt="Logo Açaí Veg"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white">
                    Açaí Veg Laranjeiras
                  </h3>
                  <span className="text-xs text-[#F2D27A] font-medium">
                    Loja & Delivery Caieiras
                  </span>
                </div>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-[#D9C7E6]/90 font-normal">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#F2D27A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif-luxury font-bold block text-white text-sm mb-0.5">Endereço:</span>
                    <span>{BRAND.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#F2D27A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif-luxury font-bold block text-white text-sm mb-0.5">Horário de Funcionamento:</span>
                    <span>{BRAND.openingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#F2D27A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif-luxury font-bold block text-white text-sm mb-0.5">WhatsApp Oficial:</span>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3C9A34] font-bold hover:underline"
                    >
                      {BRAND.whatsappFormatted}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppLink('Olá! Gostaria de falar com o atendimento da loja.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full btn-green-wa font-poppins font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chamar no WhatsApp</span>
              </a>

              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-full btn-gold-outline font-poppins font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#C9971F] hover:text-[#0B0710] transition-all shrink-0"
              >
                <Navigation className="w-4 h-4" />
                <span>Como chegar</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map with Fine Gold Border */}
          <div className="lg:col-span-7 h-[420px] lg:h-auto min-h-[380px] rounded-[20px] overflow-hidden border border-[#C9971F]/40 shadow-2xl relative bg-[#1A1420]">
            <iframe
              title="Mapa de Caieiras SP - Açaí Veg Laranjeiras"
              src={`https://maps.google.com/maps?q=${encodeURIComponent('Avenida Paulicéia 342 Laranjeiras Caieiras SP')}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            <div className="absolute bottom-4 left-4 right-4 bg-[#0B0710]/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#C9971F]/30 text-white text-xs flex items-center justify-between">
              <span className="font-medium text-[#D9C7E6]">
                📍 Av. Paulicéia, 342 - Laranjeiras, Caieiras - SP
              </span>
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F2D27A] hover:underline font-bold flex items-center gap-1 shrink-0 ml-2"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MapPin, Clock, MessageCircle, Navigation, Phone, ExternalLink } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const LocationAndContact: React.FC = () => {
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Avenida Paulicéia 342 Laranjeiras Caieiras SP Acai Veg'
  )}`;

  return (
    <section id="localizacao" className="py-20 bg-purple-pattern text-white relative z-20 border-t-4 border-[#8ec628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="font-baloo text-sm font-black text-[#8ec628] uppercase tracking-widest mb-1">
            [ Localização & Atendimento ]
          </div>
          <h2 className="font-baloo text-3xl sm:text-5xl font-extrabold text-white">
            Onde Encontrar e Como Pedir!
          </h2>
          <p className="mt-2 text-base text-purple-200">
            Venha nos visitar em Laranjeiras ou peça direto no WhatsApp para receber em Caieiras - SP.
          </p>
        </div>

        {/* 3-Column Bottom Block (Matching Split Açaí bottom section structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#2b0d38]/90 p-8 sm:p-12 rounded-3xl border-2 border-[#8ec628] shadow-2xl">
          {/* Left Block: Onde Encontrar! */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="font-baloo text-3xl font-black text-[#8ec628] tracking-tight">
              Onde encontrar!
            </h3>

            <p className="mt-2 text-sm text-purple-100 font-normal leading-relaxed">
              <strong className="text-white block font-extrabold">{BRAND.name}</strong>
              {BRAND.address}
              <br />
              <span className="text-[#8ec628] font-bold block mt-1">Horário: {BRAND.openingHours}</span>
            </p>

            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 btn-glossy-red px-6 py-3 rounded-full text-white font-baloo font-bold text-sm inline-flex items-center gap-2 shadow-lg border border-rose-300/40 hover:scale-105 transition-transform"
            >
              <Navigation className="w-4 h-4" />
              <span>Saiba onde tem Açaí Veg</span>
            </a>
          </div>

          {/* Center Emblem Logo */}
          <div className="lg:col-span-4 flex justify-center my-4 lg:my-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#8ec628] bg-white p-2 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
              <img
                src={IMAGES.logo}
                alt="Logo Açaí Veg Laranjeiras"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>

          {/* Right Block: Pedidos & WhatsApp */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right">
            <h3 className="font-baloo text-3xl font-black text-[#8ec628] tracking-tight">
              Peça seu Açaí!
            </h3>

            <p className="mt-2 text-sm text-purple-100 font-normal leading-relaxed">
              Sabor inigualável, cremosidade artesanal e delivery rápido na sua porta.
              <br />
              <strong className="text-white font-bold block mt-1">WhatsApp: {BRAND.whatsappFormatted}</strong>
            </p>

            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-end">
              <a
                href={getWhatsAppLink('Olá! Gostaria de fazer um pedido de açaí agora!')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glossy-red px-5 py-2.5 rounded-full text-white font-baloo font-bold text-xs inline-flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Fazer Pedido</span>
              </a>

              <a
                href={getWhatsAppLink('Olá! Gostaria de tirar uma dúvida sobre o cardápio.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glossy-green px-5 py-2.5 rounded-full text-white font-baloo font-bold text-xs inline-flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
              >
                <span>Falar Conosco</span>
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="mt-12 h-[380px] rounded-3xl overflow-hidden border-2 border-[#8ec628] shadow-2xl relative bg-purple-950">
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

          <div className="absolute bottom-4 left-4 right-4 bg-[#2b0d38]/90 backdrop-blur-md p-3 rounded-2xl border border-[#8ec628]/40 text-white text-xs flex items-center justify-between">
            <span className="font-semibold text-purple-100">
              📍 Av. Paulicéia, 342 - Laranjeiras, Caieiras - SP
            </span>
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8ec628] hover:underline font-bold flex items-center gap-1"
            >
              <span>Abrir no Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

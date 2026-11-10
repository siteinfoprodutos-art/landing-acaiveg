import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="bg-white text-[#2E0F3D] p-3.5 rounded-2xl shadow-2xl border-2 border-[#3C9A34] max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#F5B83D] bg-white p-0.5">
              <img
                src={IMAGES.logo}
                alt="Logo Açaí Veg"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="font-baloo font-bold text-xs text-[#2E0F3D] leading-none">
                Açaí Veg Laranjeiras
              </p>
              <span className="text-[10px] text-[#3C9A34] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3C9A34] animate-pulse" />
                Online no WhatsApp
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-normal leading-snug">
            Bateu aquela fome? Clique para pedir seu açaí recheado agora!
          </p>

          <a
            href={getWhatsAppLink('Olá! Cliquei no botão flutuante e gostaria de pedir açaí!')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 w-full py-1.5 px-3 rounded-xl bg-[#3C9A34] hover:bg-[#34852d] text-white font-baloo font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Fazer Pedido Rápido</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppLink('Olá! Vim pelo botão flutuante e gostaria de fazer um pedido!')}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-12 h-12 rounded-full bg-[#3C9A34] hover:bg-[#34852d] flex items-center justify-center text-white shadow-xl opacity-80 hover:opacity-100 scale-95 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-300/40"
        aria-label="Chamar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F5B83D]" />
        </span>

        <MessageCircle className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
};

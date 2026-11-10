export const BRAND = {
  name: "Açaí Veg Laranjeiras",
  slogan: "A felicidade também vem em forma de açaí!",
  whatsappNumber: "5511942746745",
  whatsappFormatted: "(11) 94274-6745",
  whatsappUrl: "https://wa.me/5511942746745",
  instagramUrl: "https://www.instagram.com/acai.veg",
  instagramHandle: "@acai.veg",
  address: "Avenida Paulicéia, 342, Laranjeiras, Caieiras - SP",
  openingHours: "Terça a Domingo, das 12h às 22h",
  colors: {
    primaryAcai: "#6B2B83",
    darkPurple: "#2E0F3D",
    actionGreen: "#3C9A34",
    lightLilac: "#F4E9F8",
    goldenAccent: "#F5B83D",
  }
};

export const IMAGES = {
  logo: "/assets/aistudio/logo_78011b09.png",
  heroCover: "/src/assets/images/acai_hero_cover_1794330031265.jpg",
  copo300ml: "/assets/aistudio/copo300_e112aa02.png",
  copo700ml: "/assets/aistudio/copo700_2503eab5.png",
  garrafaRafaello: "/assets/aistudio/garrafa_d1c967ec.png",
  mascotArara: "/src/assets/images/acai_arara_mascot_1794330031928.jpg",
};

export function getWhatsAppLink(customText?: string) {
  const defaultText = "Olá! Vim pelo site da Açaí Veg Laranjeiras e gostaria de fazer um pedido.";
  const text = encodeURIComponent(customText || defaultText);
  return `${BRAND.whatsappUrl}?text=${text}`;
}

import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { IMAGES, getWhatsAppLink } from '../constants';

const FRAME_COUNT = 90;
const DESKTOP_SCALE = 0.75; // 1 = full size; 0.75 = refined desktop size
const MOBILE_SCALE = 0.92;   // 92% on mobile for clean breathing room without clipping top/bottom

export const HeroScrollCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderFading, setIsLoaderFading] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Array of preloaded HTMLImageElements (1 to 90)
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);

  // Target and Lerp Frame tracking
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const isHeroVisibleRef = useRef(true);

  // Check ?debug=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1') setIsDebugMode(true);
  }, []);

  // Preload all 90 WebP frames progressively
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];

    // Safety timeout: remove loader after max 1.2s regardless
    const safetyTimer = setTimeout(() => {
      setIsLoaderFading(true);
      setTimeout(() => setIsLoading(false), 350);
    }, 1200);

    // Create 90 image instances
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = `/frames/frame_${numStr}.webp`;

      img.onload = () => {
        loadedCountRef.current += 1;
        // As soon as the first frame loads, release the loader immediately
        if (i === 1 && !isCancelled) {
          setIsLoaderFading(true);
          setTimeout(() => setIsLoading(false), 350);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, []);

  // IntersectionObserver to pause render loop when Hero is completely off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll Progress Calculation directly from container bounds
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      // When at top, rect.top = 0. As you scroll down, rect.top is negative.
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      setScrollProgress(progress);
      targetFrameRef.current = progress * (FRAME_COUNT - 1);

      if (isDebugMode) {
        console.log(
          `[DEBUG] Scroll: progress=${progress.toFixed(3)}, targetFrame=${targetFrameRef.current.toFixed(1)}, loaded=${loadedCountRef.current}/${FRAME_COUNT}`
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('orientationchange', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('orientationchange', handleScroll);
    };
  }, [isDebugMode]);

  // Helper to find closest already loaded image
  const getClosestLoadedImage = (targetIdx: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return null;

    const rounded = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(targetIdx)));
    if (images[rounded]?.complete && images[rounded].naturalWidth > 0) {
      return images[rounded];
    }

    // Search outwards from target
    for (let dist = 1; dist < FRAME_COUNT; dist++) {
      const prev = rounded - dist;
      if (prev >= 0 && images[prev]?.complete && images[prev].naturalWidth > 0) {
        return images[prev];
      }
      const next = rounded + dist;
      if (next < FRAME_COUNT && images[next]?.complete && images[next].naturalWidth > 0) {
        return images[next];
      }
    }

    return null;
  };

  // Canvas Render Loop with Delta-Time Lerp
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    ctx.imageSmoothingQuality = 'medium';

    let animationFrameId: number;
    let lastTime = performance.now();

    const applyCanvasDimensions = () => {
      const isMobile = window.innerWidth < 640;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0);
      const displayW = window.innerWidth;
      const displayH = window.innerHeight;

      const targetW = Math.round(displayW * dpr);
      const targetH = Math.round(displayH * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
    };

    applyCanvasDimensions();

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isHeroVisibleRef.current) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth Lerp calculation
      const lerpFactor = 1 - Math.pow(0.001, dt);
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * lerpFactor;

      const displayW = window.innerWidth;
      const displayH = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, displayW < 640 ? 1.5 : 2.0);

      ctx.save();
      ctx.scale(dpr, dpr);

      const closestImg = getClosestLoadedImage(currentFrameRef.current);

      if (closestImg) {
        drawCoverImage(ctx, closestImg, displayW, displayH);
      } else {
        drawProceduralAcaiBackground(ctx, displayW, displayH);
      }

      // Static dark purple gradient scrim for text contrast
      const softGradient = ctx.createLinearGradient(0, 0, 0, displayH);
      softGradient.addColorStop(0, 'rgba(26, 11, 38, 0.45)');
      softGradient.addColorStop(0.4, 'rgba(26, 11, 38, 0.1)');
      softGradient.addColorStop(0.7, 'rgba(26, 11, 38, 0.2)');
      softGradient.addColorStop(1, 'rgba(26, 11, 38, 0.65)');
      ctx.fillStyle = softGradient;
      ctx.fillRect(0, 0, displayW, displayH);

      ctx.restore();
    };

    const handleResize = () => {
      applyCanvasDimensions();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const drawCoverImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasW: number,
    canvasH: number
  ) => {
    ctx.fillStyle = '#1A0B26';
    ctx.fillRect(0, 0, canvasW, canvasH);

    const scale = canvasW >= 1024 ? DESKTOP_SCALE : MOBILE_SCALE;

    const imgW = img.naturalWidth || 720;
    const imgH = img.naturalHeight || 1280;
    const bitmapRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;
    let baseW: number, baseH: number;

    if (canvasRatio > bitmapRatio) {
      baseW = canvasW;
      baseH = canvasW / bitmapRatio;
    } else {
      baseH = canvasH;
      baseW = canvasH * bitmapRatio;
    }

    const drawW = baseW * scale;
    const drawH = baseH * scale;
    const offsetX = (canvasW - drawW) / 2;
    const offsetY = (canvasH - drawH) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    // Soft vignette/radial gradient blend over frame edges if scaled (< 1)
    if (scale < 1) {
      const padX = drawW * 0.08;
      const padY = drawH * 0.08;

      const gradTop = ctx.createLinearGradient(0, offsetY, 0, offsetY + padY);
      gradTop.addColorStop(0, '#1A0B26');
      gradTop.addColorStop(1, 'rgba(26, 11, 38, 0)');
      ctx.fillStyle = gradTop;
      ctx.fillRect(offsetX, offsetY, drawW, padY);

      const gradBottom = ctx.createLinearGradient(0, offsetY + drawH - padY, 0, offsetY + drawH);
      gradBottom.addColorStop(0, 'rgba(26, 11, 38, 0)');
      gradBottom.addColorStop(1, '#1A0B26');
      ctx.fillStyle = gradBottom;
      ctx.fillRect(offsetX, offsetY + drawH - padY, drawW, padY);

      const gradLeft = ctx.createLinearGradient(offsetX, 0, offsetX + padX, 0);
      gradLeft.addColorStop(0, '#1A0B26');
      gradLeft.addColorStop(1, 'rgba(26, 11, 38, 0)');
      ctx.fillStyle = gradLeft;
      ctx.fillRect(offsetX, offsetY, padX, drawH);

      const gradRight = ctx.createLinearGradient(offsetX + drawW - padX, 0, offsetX + drawW, 0);
      gradRight.addColorStop(0, 'rgba(26, 11, 38, 0)');
      gradRight.addColorStop(1, '#1A0B26');
      ctx.fillStyle = gradRight;
      ctx.fillRect(offsetX + drawW - padX, offsetY, padX, drawH);
    }
  };

  const drawProceduralAcaiBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, Math.max(w, h));
    bgGrad.addColorStop(0, '#6B2B83');
    bgGrad.addColorStop(0.6, '#3b124d');
    bgGrad.addColorStop(1, '#1A0B26');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
  };

  // Text stage opacity easing
  const p1 = scrollProgress;
  const stage1Opacity = p1 <= 0.18 ? 1 : p1 <= 0.24 ? 1 - (p1 - 0.18) / 0.06 : 0;
  const stage2Opacity =
    p1 >= 0.25 && p1 <= 0.45
      ? p1 <= 0.30
        ? (p1 - 0.25) / 0.05
        : p1 >= 0.40
        ? 1 - (p1 - 0.40) / 0.05
        : 1
      : 0;
  const stage3Opacity =
    p1 >= 0.50 && p1 <= 0.70
      ? p1 <= 0.55
        ? (p1 - 0.50) / 0.05
        : p1 >= 0.65
        ? 1 - (p1 - 0.65) / 0.05
        : 1
      : 0;
  const stage4Opacity = p1 >= 0.75 ? Math.min(1, (p1 - 0.75) / 0.08) : 0;

  return (
    <div id="inicio" ref={containerRef} className="relative h-[400vh] w-full bg-[#0B0710]">
      {/* 2px Golden Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#F5B83D] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-[#0B0710] z-0">
        {/* Fullscreen Video Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover z-0"
          style={{ width: '100%', height: '100dvh', display: 'block' }}
        />

        {/* Clean, Fast Loading Overlay with Logo */}
        {isLoading && (
          <div
            className={`absolute inset-0 z-40 bg-[#0B0710] flex flex-col items-center justify-center p-6 text-white text-center transition-opacity duration-350 ${
              isLoaderFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
              <img
                src={IMAGES.logo}
                alt="Açaí Veg Laranjeiras"
                className="w-16 h-16 object-contain animate-pulse drop-shadow-[0_4px_14px_rgba(245,184,61,0.35)]"
              />
            </div>
            <p className="font-serif-luxury text-sm tracking-widest text-[#F5B83D] uppercase font-bold">
              Açaí Veg
            </p>
          </div>
        )}

        {/* Scroll hint indicator */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-xs font-medium text-white/70 transition-opacity duration-300 pointer-events-none ${
            scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100 animate-bounce'
          }`}
        >
          <span className="tracking-widest uppercase text-[10px]">Role</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#F5B83D]" />
        </div>

        {/* Overlaid Texts */}
        <div
          className="absolute z-10 transition-all duration-300 pointer-events-none left-6 right-6 sm:right-auto sm:left-12 lg:left-20 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-md text-left"
          style={{
            opacity: stage1Opacity,
            transform: `translateY(${(1 - stage1Opacity) * 20}px)`,
            pointerEvents: stage1Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <div className="w-10 h-0.5 bg-[#F5B83D] mb-3 rounded-full" />
          <h1 className="font-poppins text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold text-white tracking-tight leading-snug drop-shadow-lg">
            A felicidade também vem em forma de açaí.
          </h1>
          <p className="mt-2.5 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[#F4E9F8]/85 font-normal leading-relaxed drop-shadow-md">
            O açaí mais cremoso e recheado de Caieiras.
          </p>
          <div className="mt-5">
            <a
              href={getWhatsAppLink('Olá! Vim pela Hero do site e gostaria de pedir açaí!')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#3C9A34] text-[#3C9A34] hover:bg-[#3C9A34] hover:text-white text-xs sm:text-sm font-semibold shadow-lg transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>

        <div
          className="absolute z-10 transition-all duration-300 pointer-events-none left-6 right-6 sm:left-auto sm:right-12 lg:right-20 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-md text-left"
          style={{
            opacity: stage2Opacity,
            transform: `translateY(${(1 - stage2Opacity) * 20}px)`,
            pointerEvents: stage2Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <div className="w-10 h-0.5 bg-[#F5B83D] mb-3 rounded-full" />
          <h2 className="font-poppins text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold text-white tracking-tight leading-snug drop-shadow-lg">
            Camada por camada.
          </h2>
          <p className="mt-2.5 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[#F4E9F8]/85 font-normal leading-relaxed drop-shadow-md">
            Polpa selecionada, sem cristais de gelo.
          </p>
        </div>

        <div
          className="absolute z-10 transition-all duration-300 pointer-events-none left-6 right-6 sm:right-auto sm:left-12 lg:left-20 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-md text-left"
          style={{
            opacity: stage3Opacity,
            transform: `translateY(${(1 - stage3Opacity) * 20}px)`,
            pointerEvents: stage3Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <div className="w-10 h-0.5 bg-[#F5B83D] mb-3 rounded-full" />
          <h2 className="font-poppins text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold text-white tracking-tight leading-snug drop-shadow-lg">
            Do jeito que você ama.
          </h2>
          <p className="mt-2.5 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[#F4E9F8]/85 font-normal leading-relaxed drop-shadow-md">
            Creme de avelã, paçoca, uvas verdes e Kit Kat.
          </p>
        </div>

        <div
          className="absolute z-10 transition-all duration-300 pointer-events-none left-6 right-6 sm:left-auto sm:right-12 lg:right-20 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-md text-left"
          style={{
            opacity: stage4Opacity,
            transform: `translateY(${(1 - stage4Opacity) * 20}px)`,
            pointerEvents: stage4Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <div className="w-10 h-0.5 bg-[#F5B83D] mb-3 rounded-full" />
          <h2 className="font-poppins text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold text-white tracking-tight leading-snug drop-shadow-lg">
            Monte o seu copo.
          </h2>
          <p className="mt-2.5 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[#F4E9F8]/85 font-normal leading-relaxed drop-shadow-md">
            Escolha os seus acompanhamentos preferidos.
          </p>
          <div className="mt-5">
            <a
              href={getWhatsAppLink('Olá! Rolei o site e quero montar meu copo agora!')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3C9A34] hover:bg-[#34852d] text-white text-sm font-bold shadow-xl transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 160px smooth fade transition into the next section curtain */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0710] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

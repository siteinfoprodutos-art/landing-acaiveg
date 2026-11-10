import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowDown, Download } from 'lucide-react';
import { BRAND, IMAGES, getWhatsAppLink } from '../constants';

const VIDEO_SRC = '/assets/aistudio/Layers_floating_above_a_a__cup_56da53fb_20a05278.mp4';

interface WebPFrame {
  index: number;
  bitmap: ImageBitmap;
  blob?: Blob;
}

export const HeroScrollCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [statusText, setStatusText] = useState('Preparando seu açaí...');
  const [frames, setFrames] = useState<WebPFrame[]>([]);
  const [isDevMode, setIsDevMode] = useState(false);

  // Lerp frame tracking
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  // Check ?dev=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('dev') === '1') {
      setIsDevMode(true);
    }
  }, []);

  // Frame Extraction Engine
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isCancelled = false;

    const extractFrames = async () => {
      try {
        setStatusText('Iniciando vídeo do açaí...');
        setLoadingPercent(5);

        if (video.readyState < 1) {
          await new Promise((resolve) => {
            const onMeta = () => {
              video.removeEventListener('loadedmetadata', onMeta);
              resolve(true);
            };
            video.addEventListener('loadedmetadata', onMeta);
          });
        }

        const duration = video.duration;
        if (!duration || isNaN(duration)) {
          throw new Error('Duração do vídeo inválida');
        }

        const isMobile = window.innerWidth < 640;
        const totalFrames = isMobile ? 60 : 90;
        const targetWidth = 720;
        const aspect = video.videoHeight / (video.videoWidth || 1);
        const targetHeight = Math.round(targetWidth * (aspect || 1.777));

        const offCanvas = document.createElement('canvas');
        offCanvas.width = targetWidth;
        offCanvas.height = targetHeight;
        const offCtx = offCanvas.getContext('2d');

        if (!offCtx) throw new Error('Não foi possível obter o contexto 2D');

        const extractedList: WebPFrame[] = [];

        for (let i = 0; i < totalFrames; i++) {
          if (isCancelled) return;

          const targetTime = (i / (totalFrames - 1)) * duration;
          video.currentTime = targetTime;

          await new Promise<void>((resolve) => {
            let timeoutId: NodeJS.Timeout;
            const onSeeked = () => {
              clearTimeout(timeoutId);
              video.removeEventListener('seeked', onSeeked);
              resolve();
            };
            video.addEventListener('seeked', onSeeked);
            timeoutId = setTimeout(() => {
              video.removeEventListener('seeked', onSeeked);
              resolve();
            }, 300);
          });

          offCtx.clearRect(0, 0, targetWidth, targetHeight);
          offCtx.drawImage(video, 0, 0, targetWidth, targetHeight);

          const bitmap = await createImageBitmap(offCanvas);

          let blob: Blob | undefined;
          if (isDevMode) {
            blob = await new Promise<Blob>((res) => {
              offCanvas.toBlob((b) => res(b || new Blob()), 'image/webp', 0.8);
            });
          }

          extractedList.push({ index: i, bitmap, blob });

          const percent = Math.round(((i + 1) / totalFrames) * 100);
          setLoadingPercent(percent);
          setStatusText(`Preparando seu açaí... ${percent}%`);
        }

        if (!isCancelled) {
          setFrames(extractedList);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('Fallback ativado:', err);
        setIsLoading(false);
      }
    };

    extractFrames();
    return () => {
      isCancelled = true;
    };
  }, [isDevMode]);

  // Scroll Progress Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollableHeight, 0), 1);
      setScrollProgress(progress);

      if (frames.length > 0) {
        targetFrameRef.current = progress * (frames.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [frames.length]);

  // Canvas Render Loop with Lerp & Cover Aspect Scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = window.innerWidth;
      const displayH = window.innerHeight;

      if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayW, displayH);

      // Lerp frame smoothing
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.15;
      const frameIdx = Math.min(
        frames.length - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frames.length > 0 && frames[frameIdx]) {
        drawCoverBitmap(ctx, frames[frameIdx].bitmap, displayW, displayH);
      } else {
        drawProceduralAcaiBackground(ctx, displayW, displayH);
      }

      // Very soft & subtle gradient scrim (max 40% dark purple) for text contrast without obscuring video
      const softGradient = ctx.createLinearGradient(0, 0, 0, displayH);
      softGradient.addColorStop(0, 'rgba(46, 15, 61, 0.45)');
      softGradient.addColorStop(0.4, 'rgba(46, 15, 61, 0.1)');
      softGradient.addColorStop(0.7, 'rgba(46, 15, 61, 0.2)');
      softGradient.addColorStop(1, 'rgba(46, 15, 61, 0.65)');
      ctx.fillStyle = softGradient;
      ctx.fillRect(0, 0, displayW, displayH);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [frames]);

  const drawCoverBitmap = (
    ctx: CanvasRenderingContext2D,
    bitmap: ImageBitmap,
    canvasW: number,
    canvasH: number
  ) => {
    const bitmapRatio = bitmap.width / bitmap.height;
    const canvasRatio = canvasW / canvasH;
    let renderW: number, renderH: number, offsetX: number, offsetY: number;

    if (canvasRatio > bitmapRatio) {
      renderW = canvasW;
      renderH = canvasW / bitmapRatio;
      offsetX = 0;
      offsetY = (canvasH - renderH) / 2;
    } else {
      renderH = canvasH;
      renderW = canvasH * bitmapRatio;
      offsetX = (canvasW - renderW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(bitmap, offsetX, offsetY, renderW, renderH);
  };

  const drawProceduralAcaiBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, Math.max(w, h));
    bgGrad.addColorStop(0, '#6B2B83');
    bgGrad.addColorStop(0.6, '#3b124d');
    bgGrad.addColorStop(1, '#2E0F3D');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
  };

  // Dev mode download
  const downloadAllFrames = async () => {
    if (frames.length === 0) return;
    for (let i = 0; i < frames.length; i++) {
      const item = frames[i];
      if (item.blob) {
        const url = URL.createObjectURL(item.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `frame_${String(i + 1).padStart(4, '0')}.webp`;
        a.click();
        URL.revokeObjectURL(url);
        await new Promise((r) => setTimeout(r, 40));
      }
    }
  };

  // Precise Range Opacity & Easing Calculations for standard cubic-bezier(0.22, 1, 0.36, 1) style smooth fades:
  // Stage 1: 0% to 20% (0.0 to 0.20)
  const p1 = scrollProgress;
  const stage1Opacity =
    p1 <= 0.18 ? 1 : p1 <= 0.24 ? 1 - (p1 - 0.18) / 0.06 : 0;

  // Stage 2: 25% to 45% (0.25 to 0.45)
  const stage2Opacity =
    p1 >= 0.25 && p1 <= 0.45
      ? p1 <= 0.30
        ? (p1 - 0.25) / 0.05
        : p1 >= 0.40
        ? 1 - (p1 - 0.40) / 0.05
        : 1
      : 0;

  // Stage 3: 50% to 70% (0.50 to 0.70)
  const stage3Opacity =
    p1 >= 0.50 && p1 <= 0.70
      ? p1 <= 0.55
        ? (p1 - 0.50) / 0.05
        : p1 >= 0.65
        ? 1 - (p1 - 0.65) / 0.05
        : 1
      : 0;

  // Stage 4: 75% to 100% (0.75 to 1.0)
  const stage4Opacity = p1 >= 0.75 ? Math.min(1, (p1 - 0.75) / 0.08) : 0;

  return (
    <div id="inicio" ref={containerRef} className="relative h-[400vh] w-full bg-[#2E0F3D]">
      {/* 2px Golden Scroll Progress Bar at the top of the viewport */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#F5B83D] z-50 transition-all duration-75 shadow-[0_0_8px_#F5B83D]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Offscreen video element */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="hidden"
        crossOrigin="anonymous"
      />

      {/* Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Fullscreen Video Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-[#2b0d38] flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#3b124d] border-t-[#F5B83D] animate-spin" />
              <img
                src={IMAGES.logo}
                alt="Logo Açaí Veg"
                className="w-8 h-8 rounded-full object-contain bg-white p-0.5"
              />
            </div>

            <h3 className="font-baloo text-xl sm:text-2xl font-semibold text-[#F5B83D]">
              {statusText}
            </h3>

            <div className="w-56 h-2 bg-purple-950 rounded-full mt-4 overflow-hidden border border-[#F5B83D]/30 shadow-inner">
              <div
                className="h-full bg-[#3C9A34] transition-all duration-150 rounded-full"
                style={{ width: `${loadingPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Dev Mode Download Button (?dev=1) */}
        {isDevMode && !isLoading && (
          <button
            onClick={downloadAllFrames}
            className="absolute top-20 left-4 z-30 bg-[#2b0d38]/80 text-[#F5B83D] border border-[#F5B83D]/40 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xl hover:bg-[#F5B83D] hover:text-purple-950 transition-all backdrop-blur-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar frames (.zip)</span>
          </button>
        )}

        {/* Subtle "Role" indicator near bottom that fades out immediately after scroll starts */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-xs font-medium text-white/70 transition-opacity duration-300 pointer-events-none ${
            scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100 animate-bounce'
          }`}
        >
          <span className="tracking-widest uppercase text-[10px]">Role</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#F5B83D]" />
        </div>

        {/* OVERLAID ELEGANT TEXTS (Sided / Off-center on Desktop, Bottom Faixinha on Mobile, NO Card, NO Green Border) */}

        {/* STAGE 1 (0% to 20%): Left Aligned */}
        <div
          className="absolute z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none left-6 right-6 sm:right-auto sm:left-12 lg:left-20 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-md text-left"
          style={{
            opacity: stage1Opacity,
            transform: `translateY(${(1 - stage1Opacity) * 20}px)`,
            pointerEvents: stage1Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          {/* Subtle Golden Accent Line */}
          <div className="w-10 h-0.5 bg-[#F5B83D] mb-3 rounded-full" />

          {/* Title */}
          <h1 className="font-poppins text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold text-white tracking-tight leading-snug drop-shadow-lg">
            A felicidade também vem em forma de açaí.
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[#F4E9F8]/85 font-normal leading-relaxed drop-shadow-md">
            O açaí mais cremoso e recheado de Caieiras.
          </p>

          {/* Subtle Green Pill Button */}
          <div className="mt-5">
            <a
              href={getWhatsAppLink('Olá! Vim pela Hero do site e gostaria de pedir açaí!')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#3C9A34] text-[#3C9A34] hover:bg-[#3C9A34] hover:text-white text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* STAGE 2 (25% to 45%): Right Aligned */}
        <div
          className="absolute z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none left-6 right-6 sm:left-auto sm:right-12 lg:right-20 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-md text-left"
          style={{
            opacity: stage2Opacity,
            transform: `translateY(${(1 - stage2Opacity) * 20}px)`,
            pointerEvents: stage2Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          {/* Subtle Golden Accent Line */}
          <div className="w-10 h-0.5 bg-[#F5B83D] mb-3 rounded-full" />

          {/* Title */}
          <h2 className="font-poppins text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold text-white tracking-tight leading-snug drop-shadow-lg">
            Camada por camada.
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[#F4E9F8]/85 font-normal leading-relaxed drop-shadow-md">
            Polpa selecionada, sem cristais de gelo.
          </p>
        </div>

        {/* STAGE 3 (50% to 70%): Left Aligned */}
        <div
          className="absolute z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none left-6 right-6 sm:right-auto sm:left-12 lg:left-20 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-md text-left"
          style={{
            opacity: stage3Opacity,
            transform: `translateY(${(1 - stage3Opacity) * 20}px)`,
            pointerEvents: stage3Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          {/* Subtle Golden Accent Line */}
          <div className="w-10 h-0.5 bg-[#F5B83D] mb-3 rounded-full" />

          {/* Title */}
          <h2 className="font-poppins text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold text-white tracking-tight leading-snug drop-shadow-lg">
            Do jeito que você ama.
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[#F4E9F8]/85 font-normal leading-relaxed drop-shadow-md">
            Creme de avelã, paçoca, uvas verdes e Kit Kat.
          </p>
        </div>

        {/* STAGE 4 (75% to 100%): Right/Center-Bottom Aligned */}
        <div
          className="absolute z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none left-6 right-6 sm:left-auto sm:right-12 lg:right-20 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-md text-left"
          style={{
            opacity: stage4Opacity,
            transform: `translateY(${(1 - stage4Opacity) * 20}px)`,
            pointerEvents: stage4Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          {/* Subtle Golden Accent Line */}
          <div className="w-10 h-0.5 bg-[#F5B83D] mb-3 rounded-full" />

          {/* Title */}
          <h2 className="font-poppins text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold text-white tracking-tight leading-snug drop-shadow-lg">
            Monte o seu copo.
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[#F4E9F8]/85 font-normal leading-relaxed drop-shadow-md">
            Escolha os seus acompanhamentos preferidos.
          </p>

          {/* Green Pill Button */}
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
      </div>
    </div>
  );
};

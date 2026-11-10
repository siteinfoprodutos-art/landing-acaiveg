import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { IMAGES, getWhatsAppLink } from '../constants';

const DESKTOP_SCALE = 0.75; // 1 = full size; 0.75 = refined desktop size
const MOBILE_SCALE = 0.92;   // 92% on mobile for clean breathing room without clipping top/bottom

const VIDEO_SRC = '/assets/aistudio/Layers_floating_above_a_a__cup_56da53fb_20a05278.mp4';

export const HeroScrollCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderFading, setIsLoaderFading] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Map of index -> ImageBitmap for progressive loading
  const loadedBitmapsRef = useRef<Map<number, ImageBitmap>>(new Map());
  const totalFramesRef = useRef(90);

  // Cached layout & scroll references
  const heroTopRef = useRef(0);
  const heroHeightRef = useRef(1);
  const innerHeightRef = useRef(1);

  // Target and Lerp Frame tracking
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const isHeroVisibleRef = useRef(true);

  // Check ?debug=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1') setIsDebugMode(true);
  }, []);

  // Recalculate layout metrics (heroTop and heroHeight) robustly
  const updateLayoutMetrics = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const computedTop = rect.top + scrollY;
    const computedHeight = rect.height;
    const viewportH = window.innerHeight || 1;

    heroTopRef.current = !isNaN(computedTop) && computedTop >= 0 ? computedTop : 0;
    heroHeightRef.current = !isNaN(computedHeight) && computedHeight > 0 ? computedHeight : viewportH * 4;
    innerHeightRef.current = viewportH;

    if (isDebugMode) {
      console.log('[DEBUG] Layout recalculated:', {
        heroTop: heroTopRef.current,
        heroHeight: heroHeightRef.current,
        innerHeight: innerHeightRef.current,
      });
    }
  };

  // Periodically recalculate layout metrics for 5s after mount
  useEffect(() => {
    updateLayoutMetrics();
    const interval = setInterval(() => {
      updateLayoutMetrics();
    }, 1000);

    const timer = setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isDebugMode]);

  // Progressive Frame Extraction Engine with Live Video Fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isCancelled = false;

    // Safety timeout: fade loader after max 1.5s regardless
    const safetyTimer = setTimeout(() => {
      setIsLoaderFading(true);
      setTimeout(() => setIsLoading(false), 400);
    }, 1500);

    const extractProgressiveFrames = async () => {
      try {
        video.muted = true;
        video.playsInline = true;

        if (video.readyState < 2) {
          await new Promise<void>((resolve) => {
            const onLoaded = () => {
              video.removeEventListener('loadeddata', onLoaded);
              video.removeEventListener('canplay', onLoaded);
              resolve();
            };
            video.addEventListener('loadeddata', onLoaded);
            video.addEventListener('canplay', onLoaded);
            setTimeout(onLoaded, 500);
          });
        }

        const duration = video.duration || 4.0;
        const isMobile = window.innerWidth < 640;
        const totalFrames = isMobile ? 60 : 90;
        totalFramesRef.current = totalFrames;

        const vWidth = video.videoWidth || (isMobile ? 720 : 1080);
        const vHeight = video.videoHeight || (isMobile ? 1280 : 1920);

        const targetWidth = isMobile ? 720 : 1080;
        const aspect = vHeight / vWidth;
        const targetHeight = Math.round(targetWidth * aspect);

        const offCanvas = document.createElement('canvas');
        offCanvas.width = targetWidth;
        offCanvas.height = targetHeight;
        const offCtx = offCanvas.getContext('2d', { alpha: false, desynchronized: true });

        // Extract a specific frame index cleanly
        const extractSingleFrame = async (idx: number): Promise<ImageBitmap | null> => {
          if (isCancelled || !offCtx) return null;
          if (loadedBitmapsRef.current.has(idx)) return loadedBitmapsRef.current.get(idx)!;

          const targetTime = (idx / (totalFrames - 1)) * duration;
          video.currentTime = targetTime;

          await new Promise<void>((resolve) => {
            let timeoutId: NodeJS.Timeout;
            const onSeeked = () => {
              clearTimeout(timeoutId);
              video.removeEventListener('seeked', onSeeked);
              resolve();
            };
            video.addEventListener('seeked', onSeeked);
            timeoutId = setTimeout(onSeeked, 250);
          });

          offCtx.drawImage(video, 0, 0, targetWidth, targetHeight);
          try {
            const bitmap = await createImageBitmap(offCanvas);
            loadedBitmapsRef.current.set(idx, bitmap);
            return bitmap;
          } catch (e) {
            return null;
          }
        };

        // PASS 1: Frame 0 & Last Frame
        await extractSingleFrame(0);
        if (!isCancelled) {
          setIsLoaderFading(true);
          setTimeout(() => setIsLoading(false), 400);
        }

        await extractSingleFrame(totalFrames - 1);
        updateLayoutMetrics();

        // PASS 2: Stride 6 (0, 6, 12, 18, ...)
        for (let i = 0; i < totalFrames; i += 6) {
          if (isCancelled) return;
          await extractSingleFrame(i);
        }

        // PASS 3: Stride 3 (3, 9, 15, ...)
        for (let i = 3; i < totalFrames; i += 6) {
          if (isCancelled) return;
          await extractSingleFrame(i);
        }

        // PASS 4: All remaining frames in small background batches
        for (let i = 0; i < totalFrames; i++) {
          if (isCancelled) return;
          if (!loadedBitmapsRef.current.has(i)) {
            await extractSingleFrame(i);
            if (i % 6 === 0) {
              await new Promise((res) => setTimeout(res, 10));
            }
          }
        }

        updateLayoutMetrics();
        clearTimeout(safetyTimer);
      } catch (err) {
        if (isDebugMode) console.warn('[DEBUG] Erro na extração de frames:', err);
        setIsLoaderFading(true);
        setTimeout(() => setIsLoading(false), 400);
      }
    };

    extractProgressiveFrames();

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [isDebugMode]);

  // IntersectionObserver to pause render loop when Hero is out of viewport
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

  // Passive Scroll & Debounced Resize Handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const top = heroTopRef.current || 0;
      const height = heroHeightRef.current || (window.innerHeight * 4);
      const innerH = innerHeightRef.current || window.innerHeight;

      const totalScrollable = Math.max(1, height - innerH);
      const progress = Math.min(Math.max((scrollY - top) / totalScrollable, 0), 1);

      setScrollProgress(progress);
      targetFrameRef.current = progress * (totalFramesRef.current - 1);

      // Also update videocurrentTime directly if bitmaps aren't fully extracted yet
      if (videoRef.current && loadedBitmapsRef.current.size < 10) {
        const duration = videoRef.current.duration || 4.0;
        videoRef.current.currentTime = progress * duration;
      }

      if (isDebugMode) {
        console.log(`[DEBUG] Scroll: progress=${progress.toFixed(3)}, targetFrame=${targetFrameRef.current.toFixed(1)}, loadedCount=${loadedBitmapsRef.current.size}`);
      }
    };

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateLayoutMetrics();
        handleScroll();
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isDebugMode]);

  // Helper to find closest already loaded frame
  const getClosestLoadedFrame = (targetIdx: number): ImageBitmap | null => {
    const map = loadedBitmapsRef.current;
    if (map.size === 0) return null;

    const roundedTarget = Math.round(targetIdx);
    if (map.has(roundedTarget)) return map.get(roundedTarget)!;

    let bestIdx = -1;
    let minDiff = Infinity;
    for (const idx of map.keys()) {
      const diff = Math.abs(idx - targetIdx);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = idx;
      }
    }
    return bestIdx >= 0 ? map.get(bestIdx)! : null;
  };

  // Canvas Render Loop
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

      const closestBitmap = getClosestLoadedFrame(currentFrameRef.current);

      if (closestBitmap) {
        drawCoverBitmap(ctx, closestBitmap, displayW, displayH);
      } else if (videoRef.current && videoRef.current.readyState >= 2) {
        drawVideoFallback(ctx, videoRef.current, displayW, displayH);
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

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const drawCoverBitmap = (
    ctx: CanvasRenderingContext2D,
    bitmap: ImageBitmap,
    canvasW: number,
    canvasH: number
  ) => {
    ctx.fillStyle = '#1A0B26';
    ctx.fillRect(0, 0, canvasW, canvasH);

    const scale = canvasW >= 1024 ? DESKTOP_SCALE : MOBILE_SCALE;

    const bitmapRatio = bitmap.width / bitmap.height;
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

    ctx.drawImage(bitmap, offsetX, offsetY, drawW, drawH);

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

  const drawVideoFallback = (
    ctx: CanvasRenderingContext2D,
    video: HTMLVideoElement,
    canvasW: number,
    canvasH: number
  ) => {
    ctx.fillStyle = '#1A0B26';
    ctx.fillRect(0, 0, canvasW, canvasH);

    const scale = canvasW >= 1024 ? DESKTOP_SCALE : MOBILE_SCALE;
    const vW = video.videoWidth || 720;
    const vH = video.videoHeight || 1280;
    const bitmapRatio = vW / vH;
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

    ctx.drawImage(video, offsetX, offsetY, drawW, drawH);
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

      {/* Offscreen video element - Same-origin video without crossOrigin attribute */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="pointer-events-none opacity-0 absolute w-1 h-1 overflow-hidden z-[-100]"
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
            className={`absolute inset-0 z-40 bg-[#0B0710] flex flex-col items-center justify-center p-6 text-white text-center transition-opacity duration-400 ${
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
      </div>
    </div>
  );
};

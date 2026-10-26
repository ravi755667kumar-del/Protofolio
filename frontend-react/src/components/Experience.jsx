import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../data/expData';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const stackContainerRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const isSprayingRef = useRef(false);

  // Active sheet index: 0 to 4 (5 sheets total)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Resize canvas to match section bounds precisely
  const syncCanvasBounds = useCallback(() => {
    if (!canvasRef.current || !sectionRef.current) return;
    const canvas = canvasRef.current;
    const rect = sectionRef.current.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }, []);

  // Instant canvas clear and particle reset to refresh the page
  const clearSprayCanvas = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    particlesRef.current = [];
    isSprayingRef.current = false;

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Restore sheets to pristine visible state
  const resetExperienceCards = useCallback(() => {
    clearSprayCanvas();
    setCurrentIndex(0);

    const sheets = sectionRef.current?.querySelectorAll('.exp-notebook-sheet');
    if (sheets) {
      gsap.killTweensOf(sheets);
      gsap.set(sheets, { clearProps: 'all' });
    }
  }, [clearSprayCanvas]);

  // Ultra-Smooth 60fps Book Spray Particle Explosion
  const triggerSheetSpray = useCallback((sheetRect, onMidpoint) => {
    if (!canvasRef.current || !sectionRef.current) {
      if (onMidpoint) onMidpoint();
      return;
    }

    syncCanvasBounds();

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const relLeft = (sheetRect?.left || sectionRect.left + 50) - sectionRect.left;
    const relTop = (sheetRect?.top || sectionRect.top + 100) - sectionRect.top;
    const width = sheetRect?.width || 600;
    const height = sheetRect?.height || 380;

    const INK_COLORS = ['#0284c7', '#0d9488', '#0ea5e9', '#38bdf8', '#f59e0b', '#2563eb'];
    const PAPER_COLORS = ['#ffffff', '#f8fafc', '#e2e8f0', '#bae6fd', '#fef08a'];

    const newParticles = [];

    // 1. Tumbling 3D Paper Flakes (25 lightweight flakes)
    for (let i = 0; i < 25; i++) {
      const px = relLeft + Math.random() * width;
      const py = relTop + Math.random() * height;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const speed = Math.random() * 12 + 5;

      newParticles.push({
        type: 'paper',
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        width: Math.random() * 8 + 5,
        height: Math.random() * 12 + 7,
        color: PAPER_COLORS[Math.floor(Math.random() * PAPER_COLORS.length)],
        alpha: 1.0,
        decay: Math.random() * 0.035 + 0.04,
        drag: 0.92,
        buoyancy: -0.16,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        pitch: Math.random() * Math.PI,
        pitchSpeed: (Math.random() - 0.5) * 0.3,
        roll: Math.random() * Math.PI,
        rollSpeed: (Math.random() - 0.5) * 0.3,
      });
    }

    // 2. High-Speed Book Edge Ink Spray Droplets (65 particles)
    for (let j = 0; j < 65; j++) {
      const px = relLeft + Math.random() * width;
      const py = relTop + Math.random() * height;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
      const speed = Math.random() * 16 + 8;

      newParticles.push({
        type: 'ink',
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2.6 + 1,
        color: INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)],
        alpha: 1.0,
        decay: Math.random() * 0.04 + 0.045,
        drag: 0.91,
        buoyancy: -0.18,
      });
    }

    // 3. Aerosol Book Spray Mist (10 volumetric puffs)
    for (let k = 0; k < 10; k++) {
      const px = relLeft + Math.random() * width;
      const py = relTop + Math.random() * height;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
      const speed = Math.random() * 6 + 2;

      newParticles.push({
        type: 'mist',
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 20 + 12,
        color: k % 2 === 0 ? 'rgba(45, 212, 191, 0.22)' : 'rgba(34, 211, 238, 0.22)',
        alpha: 0.7,
        decay: Math.random() * 0.035 + 0.04,
        drag: 0.88,
        buoyancy: -0.25,
      });
    }

    particlesRef.current = newParticles;

    // Canvas animation loop
    const renderLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0.02) continue;
        aliveCount++;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.buoyancy;
        p.alpha -= p.decay;

        const renderAlpha = Math.max(0, p.alpha);

        if (p.type === 'paper') {
          p.rotation += p.rotSpeed;
          p.pitch += p.pitchSpeed;
          p.roll += p.rollSpeed;

          ctx.save();
          ctx.globalAlpha = renderAlpha * 0.9;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(Math.cos(p.pitch), Math.sin(p.roll));
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
          ctx.restore();
        } else if (p.type === 'mist') {
          p.radius += 0.35;
          ctx.save();
          ctx.globalAlpha = renderAlpha * 0.4;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(1, p.radius));
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, 'rgba(4, 22, 28, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, p.radius), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          p.radius *= 0.985;
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = renderAlpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.6, p.radius), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (aliveCount > 0) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
      } else {
        ctx.clearRect(0, 0, w, h);
        animFrameRef.current = null;
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(renderLoop);

    if (onMidpoint) {
      setTimeout(onMidpoint, 130);
    }
  }, [syncCanvasBounds]);

  // Turn to Next Sheet: Current sheet sprays out, next sheet underneath glides forward smoothly, then canvas refreshes
  const handleNextSheet = useCallback(() => {
    if (isSprayingRef.current) return;
    isSprayingRef.current = true;

    const currentSheetEl = document.getElementById(`exp-sheet-${currentIndex}`);
    const sheetRect = currentSheetEl ? currentSheetEl.getBoundingClientRect() : null;

    // Trigger Particle Spray on Canvas
    triggerSheetSpray(sheetRect, () => {
      // Seamless infinite cycle: 0 -> 1 -> 2 -> 3 -> 4 -> 0
      setCurrentIndex((prev) => (prev + 1) % experienceData.length);

      // Clean up any residual GSAP inline properties so cards use clean CSS transitions
      const sheets = sectionRef.current?.querySelectorAll('.exp-notebook-sheet');
      if (sheets) {
        gsap.killTweensOf(sheets);
        gsap.set(sheets, { clearProps: 'all' });
      }

      // REFRESH: Immediately clear any lingering spray so the incoming page is 100% clean and pristine
      setTimeout(() => {
        clearSprayCanvas();
      }, 100);
    });
  }, [currentIndex, triggerSheetSpray, clearSprayCanvas]);

  // Go back to previous sheet in stack with instant canvas refresh
  const handlePrevSheet = () => {
    clearSprayCanvas();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : experienceData.length - 1));
    const sheets = sectionRef.current?.querySelectorAll('.exp-notebook-sheet');
    if (sheets) {
      gsap.killTweensOf(sheets);
      gsap.set(sheets, { clearProps: 'all' });
    }
  };

  // Jump directly to any sheet tab with instant canvas refresh
  const handleTabClick = (targetIdx) => {
    if (targetIdx === currentIndex) return;
    clearSprayCanvas();
    setCurrentIndex(targetIdx);
    const sheets = sectionRef.current?.querySelectorAll('.exp-notebook-sheet');
    if (sheets) {
      gsap.killTweensOf(sheets);
      gsap.set(sheets, { clearProps: 'all' });
    }
  };

  // Window custom event listeners (from Navbar, PageScrollNav, etc.)
  useEffect(() => {
    const handleSprayEvent = () => {
      const activeSheetEl = document.getElementById(`exp-sheet-${currentIndex}`);
      const rect = activeSheetEl ? activeSheetEl.getBoundingClientRect() : null;
      triggerSheetSpray(rect);
    };

    const handleResetEvent = () => {
      resetExperienceCards();
    };

    const handleClearEvent = () => {
      clearSprayCanvas();
    };

    window.addEventListener('experience:spray-vanish', handleSprayEvent);
    window.addEventListener('experience:reset-vanish', handleResetEvent);
    window.addEventListener('experience:clear-spray', handleClearEvent);
    window.addEventListener('resize', syncCanvasBounds);

    return () => {
      window.removeEventListener('experience:spray-vanish', handleSprayEvent);
      window.removeEventListener('experience:reset-vanish', handleResetEvent);
      window.removeEventListener('experience:clear-spray', handleClearEvent);
      window.removeEventListener('resize', syncCanvasBounds);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentIndex, triggerSheetSpray, resetExperienceCards, clearSprayCanvas, syncCanvasBounds]);

  // Initial scroll entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-stack-wrapper', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isLastSheet = currentIndex === experienceData.length - 1;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-14 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] overflow-hidden border-t border-slate-200/80"
    >
      {/* High-speed Book Spray Canvas (Tumbling Paper Flakes + Colored Mist + Ink Jets) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="exp-header text-center mb-6 space-y-2">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            My Journey:{' '}
            <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent">
              Experience &amp; Education
            </span>
          </h2>
        </div>

        {/* ========================================================
            MINIMALIST SHEET INDICATOR DOTS
            ======================================================== */}
        <div className="flex items-center gap-2 mb-6 select-none">
          {experienceData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleTabClick(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 h-2 bg-[#0284C7] shadow-[0_0_8px_rgba(2,132,199,0.7)]'
                  : idx < currentIndex
                  ? 'w-2 h-2 bg-sky-400 hover:bg-sky-500'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Jump to Sheet ${idx + 1}`}
            />
          ))}
          <span className="font-mono text-xs text-sky-700 font-semibold ml-2">
            0{currentIndex + 1} / 0{experienceData.length}
          </span>
        </div>

        {/* ========================================================
            STACKED NOTEBOOK SHEETS DECK WITH SMALL CIRCLE RIGHT BUTTON
            ======================================================== */}
        <div
          ref={stackContainerRef}
          className="exp-stack-wrapper relative w-full max-w-2xl sm:max-w-3xl min-h-[380px] sm:min-h-[340px] mb-2"
        >
          {/* ========================================================
              SMALL CIRCULAR NEXT BUTTON ON THE RIGHT
              ======================================================== */}
          <button
            type="button"
            onClick={handleNextSheet}
            aria-label={isLastSheet ? 'Loop back to Sheet 1' : 'Next sheet'}
            title={isLastSheet ? 'Loop back to Sheet 1' : 'Spray out & go to next sheet'}
            className="group absolute -right-3 sm:-right-5 md:-right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-sky-500 hover:border-[#0284C7] text-[#0284C7] hover:text-white hover:bg-[#0284C7] flex items-center justify-center shadow-[0_4px_20px_rgba(2,132,199,0.25)] hover:shadow-[0_4px_25px_rgba(2,132,199,0.5)] hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer backdrop-blur-xl"
          >
            <span className="text-xl sm:text-2xl font-bold group-hover:translate-x-0.5 transition-transform duration-200">
              {isLastSheet ? '↺' : '➔'}
            </span>
            {/* Ambient pulsing ring */}
            <span className="absolute inset-0 rounded-full border border-sky-400 animate-ping opacity-30 pointer-events-none" />
          </button>

          {/* SMALL CIRCULAR PREVIOUS BUTTON ON THE LEFT (when past sheet 1) */}
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevSheet}
              aria-label="Previous sheet"
              title="Previous sheet"
              className="group absolute -left-3 sm:-left-5 md:-left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-300 hover:border-[#0284C7] text-slate-700 hover:text-[#0284C7] flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer backdrop-blur-xl"
            >
              <span className="text-lg sm:text-xl font-bold group-hover:-translate-x-0.5 transition-transform duration-200">
                ←
              </span>
            </button>
          )}

          {/* Stack of 5 Sheets */}
          {experienceData.map((item, idx) => {
            const depth = idx - currentIndex;
            const isPast = depth < 0;
            const isCurrent = depth === 0;

            // Stack 3D transform & visual depth
            const translateY = isPast ? -35 : Math.min(depth * 12, 36);
            const scale = isPast ? 0.95 : Math.max(0.9, 1 - depth * 0.035);
            const rotate = isPast ? -1.5 : depth % 2 === 1 ? 1.2 : depth === 0 ? 0 : -1.2;
            const opacity = isPast ? 0 : depth > 3 ? 0 : Math.max(0.2, 1 - depth * 0.28);
            const zIndex = isPast ? 0 : 30 - depth;

            return (
              <div
                key={idx}
                id={`exp-sheet-${idx}`}
                style={{
                  transform: `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: isCurrent ? 'auto' : 'none',
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.32s ease',
                  transformOrigin: 'top center',
                  willChange: 'transform, opacity',
                }}
                className={`exp-notebook-sheet absolute inset-0 w-full rounded-2xl notebook-ruled-bg p-6 sm:p-8 border-l-4 ${
                  idx < 2 ? 'border-rose-400' : idx === 2 ? 'border-sky-500' : 'border-amber-400'
                } bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.08)] flex flex-col justify-between`}
              >
                {/* Washi Tape Header with sheet title */}
                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap border-b border-dashed border-slate-200 pb-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-sky-50 border-l border-r border-sky-300 text-sky-800 font-mono text-xs uppercase tracking-widest -rotate-1 shadow-xs">
                    <span>{item.sheetTitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-handwriting text-lg text-[#0284C7] font-semibold italic">
                      🗓️ {item.period}
                    </span>
                    <span className="text-slate-400 font-handwriting text-base">📎</span>
                  </div>
                </div>

                {/* Sheet Body Content */}
                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <h3 className="font-handwriting text-2xl sm:text-4xl font-bold text-slate-900 tracking-wide">
                      {item.icon} {item.title}
                    </h3>
                  </div>

                  {/* Institution / Company */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-handwriting text-xl sm:text-2xl font-semibold text-[#0284C7]">
                      @ {item.company}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-sky-300 bg-sky-50 text-sky-700 font-semibold">
                      {item.type}
                    </span>
                  </div>

                  {/* Highlight Banner */}
                  <div className="pt-0.5">
                    <mark className="bg-amber-100 text-amber-900 font-handwriting text-lg sm:text-xl px-3 py-1 rounded border border-amber-300 inline-flex items-center gap-2 shadow-xs">
                      {item.highlight}
                    </mark>
                  </div>

                  {/* Handwritten Narrative Description */}
                  <p className="font-handwriting text-lg sm:text-2xl text-slate-700 leading-relaxed font-normal pt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

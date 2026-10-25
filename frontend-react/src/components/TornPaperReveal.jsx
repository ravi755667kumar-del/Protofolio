import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { TORN_PAPER } from './tornPaths';

export default function TornPaperReveal() {
  const containerRef = useRef(null);
  const topSheetRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const laserBeamRef = useRef(null);
  const particlesRef = useRef([]);
  const [currentLabel, setCurrentLabel] = useState('NEXT SECTION');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const runTearAnimation = useCallback((targetId, label) => {
    if (!containerRef.current || !topSheetRef.current || !bottomSheetRef.current) return;

    setCurrentLabel(label || targetId?.toUpperCase() || 'NEXT SECTION');
    setIsTransitioning(true);

    const container = containerRef.current;
    const topSheet = topSheetRef.current;
    const bottomSheet = bottomSheetRef.current;
    const laser = laserBeamRef.current;
    const particles = particlesRef.current;

    // Reset initial states
    gsap.set(container, { display: 'block', opacity: 1 });
    gsap.set(topSheet, { yPercent: 0, rotation: 0, skewX: 0, transformOrigin: 'top left' });
    gsap.set(bottomSheet, { yPercent: 0, rotation: 0, skewX: 0, transformOrigin: 'bottom right' });
    if (laser) gsap.set(laser, { scaleX: 0, opacity: 1, transformOrigin: 'left center' });
    if (particles && particles.length) {
      gsap.set(particles, { opacity: 0, scale: 0 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(container, { display: 'none' });
        setIsTransitioning(false);
        window.dispatchEvent(new CustomEvent('experience:clear-spray'));
      },
    });

    // Step 1: Laser Rip line sweeps across the jagged seam (0.0s -> 0.22s)
    if (laser) {
      tl.to(laser, {
        scaleX: 1,
        duration: 0.24,
        ease: 'power2.inOut',
      });
      tl.to(laser, {
        opacity: 0,
        duration: 0.15,
        ease: 'power1.out',
      }, '-=0.08');
    }

    // Step 2: Paper fibers / particles burst outward along the tear seam
    if (particles && particles.length) {
      particles.forEach((p, idx) => {
        if (!p) return;
        const data = TORN_PAPER.particles[idx];
        if (!data) return;
        tl.to(
          p,
          {
            opacity: 1,
            scale: 1.4,
            x: data.dx,
            y: data.dy,
            rotation: data.rotate,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.18
        );
        tl.to(
          p,
          {
            opacity: 0,
            scale: 0.2,
            duration: 0.3,
            ease: 'power2.in',
          },
          0.45
        );
      });
    }

    // Step 3: Top and Bottom sheets tear apart organically (0.2s -> 0.9s)
    tl.to(
      topSheet,
      {
        yPercent: -108,
        rotation: -3.2,
        skewX: 1.8,
        duration: 0.72,
        ease: 'power3.inOut',
      },
      0.2
    );

    tl.to(
      bottomSheet,
      {
        yPercent: 108,
        rotation: 2.8,
        skewX: -1.8,
        duration: 0.72,
        ease: 'power3.inOut',
      },
      0.2
    );

    // Step 4: Scroll the page right under the peeling paper (t = 0.32s)
    tl.call(
      () => {
        const el = document.getElementById(targetId);
        if (el) {
          const top = targetId === 'home' ? 0 : el.offsetTop;
          window.scrollTo({ top, behavior: 'instant' });
        }
      },
      null,
      0.32
    );

    // Fade out overlay container gently at very end
    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.15,
        ease: 'power1.out',
      },
      0.82
    );
  }, []);

  useEffect(() => {
    const handleCustomTrigger = (e) => {
      const { targetId, targetLabel } = e.detail || {};
      if (targetId) {
        runTearAnimation(targetId, targetLabel);
      }
    };

    window.addEventListener('trigger-torn-paper', handleCustomTrigger);
    return () => window.removeEventListener('trigger-torn-paper', handleCustomTrigger);
  }, [runTearAnimation]);

  return (
    <div
      ref={containerRef}
      style={{ display: 'none' }}
      className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none"
      aria-hidden={!isTransitioning}
    >
      {/* ========================================================
          1. TOP TORN PAPER SHEET
          ======================================================== */}
      <div
        ref={topSheetRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ filter: 'drop-shadow(0 22px 30px rgba(0, 0, 0, 0.9))' }}
      >
        <svg
          viewBox={TORN_PAPER.viewBox}
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            {/* Executive Light Paper Gradient Fill */}
            <linearGradient id="topPaperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            {/* Pattern Grid Texture on Paper */}
            <pattern id="paperGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(2, 132, 199, 0.08)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Main Paper Body */}
          <path d={TORN_PAPER.topPath} fill="url(#topPaperGrad)" />
          {/* Faint blueprint overlay */}
          <path d={TORN_PAPER.topPath} fill="url(#paperGrid)" opacity="0.8" />

          {/* Exposed White/Cream Paper Fiber Tear Edge (Ragged torn pulp) */}
          <path
            d={TORN_PAPER.seamLine}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeDasharray="8 3 2 4 5 2"
            opacity="0.95"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(255, 255, 255, 0.7))' }}
          />
          <path
            d={TORN_PAPER.seamLine}
            fill="none"
            stroke="#0284C7"
            strokeWidth="1.5"
            opacity="0.85"
          />
        </svg>

        {/* Top Sheet Watermarks & Branding */}
        <div className="absolute top-10 sm:top-14 left-6 sm:left-12 text-slate-600 font-mono text-[10px] sm:text-xs tracking-widest uppercase flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
          <span>RAVI KUMAR // PORTFOLIO TRANSITION</span>
          <span className="text-[#0284C7] font-semibold hidden sm:inline">| DOC ID #AI-2026</span>
        </div>

        {/* Perforation guide line above the tear */}
        <div className="absolute bottom-[52%] left-0 right-0 px-6 sm:px-12 flex items-center justify-between text-[#0284C7]/60 font-mono text-[9px] sm:text-[11px] tracking-widest uppercase pointer-events-none">
          <span>✂ TEAR HERE</span>
          <span className="border-b border-dashed border-[#0284C7]/40 flex-1 mx-4" />
          <span>PULL TO OPEN</span>
        </div>
      </div>

      {/* ========================================================
          2. BOTTOM TORN PAPER SHEET
          ======================================================== */}
      <div
        ref={bottomSheetRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ filter: 'drop-shadow(0 -22px 30px rgba(0, 0, 0, 0.9))' }}
      >
        <svg
          viewBox={TORN_PAPER.viewBox}
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="botPaperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="40%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          {/* Main Paper Body */}
          <path d={TORN_PAPER.bottomPath} fill="url(#botPaperGrad)" />
          <path d={TORN_PAPER.bottomPath} fill="url(#paperGrid)" opacity="0.8" />

          {/* Exposed White/Cream Paper Fiber Tear Edge */}
          <path
            d={TORN_PAPER.seamLine}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeDasharray="6 3 3 5 4 2"
            opacity="0.95"
            style={{ filter: 'drop-shadow(0 -1px 3px rgba(255, 255, 255, 0.7))' }}
          />
          <path
            d={TORN_PAPER.seamLine}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.85"
          />
        </svg>

        {/* Bottom Sheet Stamped Label */}
        <div className="absolute top-[54%] left-0 right-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-sky-300 text-[#0284C7] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 shadow-md backdrop-blur-md">
            <span>⚡ REVEALING NEXT CHAPTER</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight drop-shadow-sm">
            <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent">
              {currentLabel}
            </span>
          </h2>
          <p className="text-slate-500 font-mono text-[10px] sm:text-xs tracking-wider mt-2">
            INITIALIZING TARGET WORKSPACE // 2026
          </p>
        </div>
      </div>

      {/* ========================================================
          3. GLOWING RIP BEAM (Laser Slice along Seam)
          ======================================================== */}
      <div
        ref={laserBeamRef}
        className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gradient-to-r from-[#22D3EE] via-white to-sky-400 shadow-[0_0_20px_#22d3ee,0_0_40px_#38bdf8] pointer-events-none z-30"
        style={{ transformOrigin: 'left center' }}
      />

      {/* ========================================================
          4. BURSTING TORN PAPER FIBER PARTICLES
          ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {TORN_PAPER.particles.map((pt, idx) => (
          <div
            key={pt.id}
            ref={(el) => (particlesRef.current[idx] = el)}
            style={{
              position: 'absolute',
              left: `${(pt.x / TORN_PAPER.width) * 100}%`,
              top: `${(pt.y / TORN_PAPER.height) * 100}%`,
              width: `${pt.size}px`,
              height: `${pt.size * 1.5}px`,
              backgroundColor: pt.color,
              boxShadow: `0 0 8px ${pt.color}`,
              borderRadius: idx % 2 === 0 ? '1px' : '2px 0 2px 0',
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

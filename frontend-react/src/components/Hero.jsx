import React, { useState, useEffect, useRef } from 'react';

const promptPlaceholders = [
  'Exploring Machine Learning models...',
  'Building predictive AI pipelines...',
  'Integrating Django & React systems...',
  'Available for new tech opportunities...',
];

export default function Hero() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Cycling prompt text
  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % promptPlaceholders.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // 3D Mouse Parallax calculation
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-end pt-24 pb-0 px-4 sm:px-6 lg:px-8 bg-[#0d0714] text-slate-100 overflow-hidden select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end relative z-10 mt-auto">
        
        {/* ========================================================
           LEFT: BIG TYPOGRAPHY & INTRO (MATCHING REFERENCE)
           ======================================================== */}
        <div
          className="lg:col-span-4 space-y-6 text-center lg:text-left pb-8 lg:pb-16 transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`,
          }}
        >
          {/* Main Huge Headline */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black text-white tracking-tight leading-[1.05]">
              Hey There,
              <br />
              I'm <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent">Ravi!</span>
            </h1>
          </div>

          {/* Subtitle & Role */}
          <div className="space-y-2 max-w-md mx-auto lg:mx-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-200 tracking-wide flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              AI Developer &amp; ML Engineer
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Crafting intelligent predictive models, deep learning pipelines, and high-performance modern web applications with Python, TensorFlow, and React.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              View Projects →
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/15 hover:border-rose-400/50 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* ========================================================
           CENTER: 3D PORTRAIT TOUCHING BOTTOM (MATCHING REFERENCE)
           ======================================================== */}
        <div className="lg:col-span-5 flex justify-center items-end self-end relative">
          <div
            className="relative w-[280px] sm:w-[350px] lg:w-[410px] flex items-end justify-center transition-transform duration-300 ease-out translate-y-6 sm:translate-y-8"
            style={{
              transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 40px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Organic Morphing Blob behind the head/torso */}
            <div
              className="absolute bottom-4 inset-x-3 sm:inset-x-5 h-[270px] sm:h-[340px] lg:h-[380px] rounded-[50%_50%_45%_55%/60%_45%_55%_40%] animate-[morph_8s_ease-in-out_infinite] transition-all pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #e17082 0%, #d95368 50%, #c43c53 100%)',
                boxShadow: '0 25px 50px -15px rgba(225, 112, 130, 0.45)',
                transform: 'scale(0.95) translateZ(-25px)',
              }}
            />

            {/* Ambient Back Glow */}
            <div className="absolute bottom-6 inset-x-6 h-[260px] rounded-full bg-rose-500/30 blur-3xl pointer-events-none" />

            {/* Central Portrait Cutout: Kept down & cleanly rendered with white shirt */}
            <div className="relative z-10 w-full flex items-end justify-center pointer-events-none">
              <img
                src="/homeimg-nobg.png"
                alt="Ravi Kumar"
                className="w-auto h-[320px] sm:h-[390px] lg:h-[450px] max-h-[72vh] object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] contrast-[1.03] brightness-105 pointer-events-none block align-bottom"
                onError={(e) => {
                  e.currentTarget.src = '/homeimg.jpeg';
                }}
              />
              {/* Fallback avatar */}
              <div className="hidden w-full h-[320px] items-center justify-center bg-gradient-to-b from-[#3b1219] to-[#120709] text-rose-300 font-black text-6xl">
                RK
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
           RIGHT: FLOATING CAPSULE CHAT PILL & CERTIFICATION EMBLEM
           ======================================================== */}
        <div
          className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center space-y-12 pb-8 lg:pb-16 transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, 20px)`,
          }}
        >
          {/* Floating Interactive Input / Prompt Capsule (Matching Reference Pill) */}
          <div className="relative group cursor-pointer w-full max-w-[270px]">
            <div className="flex items-center justify-between p-2 pl-4 rounded-2xl bg-slate-200/90 text-slate-800 shadow-2xl backdrop-blur-md border border-white/40 hover:bg-white transition-all duration-300">
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-700 truncate pr-2">
                <span className="w-1.5 h-3.5 bg-rose-500 animate-pulse inline-block" />
                <span className="truncate">{promptPlaceholders[promptIndex]}</span>
              </div>
              {/* Mini Avatar in Pill */}
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-slate-200">
                <img
                  src="/homeimg-nobg.png"
                  alt="Ravi"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = '/homeimg.jpeg';
                  }}
                />
              </div>
            </div>
            {/* Pill Shadow glow */}
            <div className="absolute inset-0 rounded-2xl bg-rose-500/10 blur-lg -z-10 group-hover:bg-rose-500/20 transition-all" />
          </div>

          {/* Circular Certification Seal / Emblem (Matching Reference Badge) */}
          <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
            <div className="relative w-24 h-24 rounded-full border border-slate-700/60 bg-white/5 backdrop-blur-md p-1.5 flex items-center justify-center shadow-xl group-hover:border-rose-400/50 group-hover:scale-105 transition-all duration-300">
              {/* Rotating outer ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-rose-400/30 animate-[spin_20s_linear_infinite]" />
              
              {/* Inner Emblem Icon */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#2d1117] to-[#170a0e] border border-rose-400/40 flex flex-col items-center justify-center text-rose-300 shadow-inner">
                <span className="text-xl">🎓</span>
              </div>
            </div>

            {/* Seal Text */}
            <div className="space-y-0.5">
              <p className="text-[11px] font-mono font-bold tracking-widest text-slate-200 uppercase">
                AI &amp; ML CERTIFIED
              </p>
              <p className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">
                PROFESSIONAL DEVELOPER
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-2 left-6 hidden xl:flex flex-col items-center gap-1.5 text-slate-400 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase font-mono tracking-widest">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-slate-500 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-rose-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

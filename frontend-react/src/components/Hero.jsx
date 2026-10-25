import React, { useState, useEffect, useRef } from 'react';
import { triggerTornPaperReveal } from '../utils/tornPaperTrigger';
import HeroBrain3D from './HeroBrain3D';

const promptPlaceholders = [
  'Detecting brain tumors with CNN...',
  'Deploying churn prediction on FastAPI...',
  'Building RAG chatbot with LangChain...',
  'Engineering Django & AI pipelines...',
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
      className="relative min-h-screen flex flex-col justify-end pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] text-slate-800 overflow-hidden select-none scroll-mt-20 lg:scroll-mt-24 border-b border-slate-200/80"
      style={{ perspective: '1200px' }}
    >
      {/* ========================================================
         EXECUTIVE LIGHT AMBIENT AURORA MESH BACKGROUND & TRANSITIONS
         ======================================================== */}
      {/* 1. Architectural Geometric Tech Dot Matrix Grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-65"
        style={{
          backgroundImage: 'radial-gradient(rgba(2, 132, 199, 0.15) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 35%, rgba(0,0,0,0.5) 65%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 35%, rgba(0,0,0,0.5) 65%, transparent 92%)',
        }}
      />

      {/* 2. Living Aurora Mesh Orbs (Silky 14-18s Floating Curves + Mouse Parallax) */}
      <div
        className="absolute -top-24 left-[-6%] w-[640px] h-[640px] rounded-full bg-gradient-to-tr from-sky-400/25 via-cyan-300/20 to-transparent blur-[120px] pointer-events-none animate-[ambientAurora1_14s_ease-in-out_infinite] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -45}px, ${mousePos.y * -45}px, 0)`,
        }}
      />

      <div
        className="absolute top-1/4 right-[-6%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-teal-400/22 via-emerald-300/18 to-transparent blur-[130px] pointer-events-none animate-[ambientAurora2_16s_ease-in-out_infinite] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0)`,
        }}
      />

      <div
        className="absolute bottom-12 left-1/4 w-[560px] h-[460px] rounded-full bg-gradient-to-t from-indigo-300/20 via-sky-200/20 to-transparent blur-[140px] pointer-events-none animate-[ambientAurora3_18s_ease-in-out_infinite] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -25}px, 0)`,
        }}
      />

      <div className="absolute top-16 left-1/3 w-[360px] h-[360px] rounded-full bg-amber-200/15 blur-[95px] pointer-events-none" />

      {/* 3. Feathered Bottom Transition to About Section */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/75 to-transparent pointer-events-none z-20" />

      {/* ========================================================
         TOP-RIGHT CORNER: 3D CYBERNETIC AI BRAIN BACKGROUND
         ======================================================== */}
      <div
        className="absolute top-0 right-0 w-[320px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-[320px] sm:h-[420px] md:h-[500px] lg:h-[580px] pointer-events-none z-0 overflow-hidden select-none"
        style={{
          perspective: '1200px',
        }}
      >
        <div className="absolute -top-16 -right-16 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(2,132,199,0.18)_0%,rgba(13,148,136,0.12)_45%,transparent_75%)] blur-3xl pointer-events-none" />

        <div
          className="relative w-full h-full flex items-start justify-end transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 25 + 20}px, ${mousePos.y * 25 - 15}px, -20px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Binary stream */}
          <div
            className="absolute top-10 right-10 font-mono text-[9px] sm:text-[10px] leading-relaxed text-sky-600/30 select-none text-right pointer-events-none"
            style={{ animation: 'binaryFlicker 4s ease-in-out infinite' }}
          >
            <div>0110 0100 0101 1001</div>
            <div>0101 1001 0110 0100</div>
            <div>1001 0110 0100 0101</div>
            <div>0100 0101 1001 0110</div>
          </div>

          {/* Dynamic 3D Neural Brain with Real-Time Mint/Teal/Cyan Color Transitions */}
          <div className="relative w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] -mr-4 -mt-2">
            <HeroBrain3D mousePos={mousePos} />
          </div>

          <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-sky-400/30 rounded-tr-xl pointer-events-none" />
          <div className="absolute top-8 right-8 text-[8px] font-mono tracking-widest text-sky-600/60 uppercase">
            3D NEURAL CORE &bull; AI
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end relative z-10 mt-auto">
        
        {/* ========================================================
           LEFT: BIG TYPOGRAPHY & INTRO
           ======================================================== */}
        <div
          className="lg:col-span-4 space-y-6 text-center lg:text-left pb-8 lg:pb-16 transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`,
          }}
        >
          {/* Main Headline */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black text-slate-900 tracking-tight leading-[1.05]">
              Hey There,
              <br />
              I'm <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent">Ravi!</span>
            </h1>
          </div>

          {/* Subtitle & Role */}
          <div className="space-y-2 max-w-md mx-auto lg:mx-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-wide flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-ping" />
              AI Developer &amp; ML Engineer
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Crafting intelligent predictive models, deep learning pipelines, and high-performance modern web applications with Python, TensorFlow, and React.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                triggerTornPaperReveal('projects', 'Featured Projects');
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-600/25 hover:shadow-sky-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              View Projects →
            </a>
          </div>
        </div>

        {/* ========================================================
           CENTER: 3D PORTRAIT TOUCHING BOTTOM
           ======================================================== */}
        <div className="lg:col-span-5 flex justify-center items-end self-end relative">
          <div
            className="relative w-[280px] sm:w-[350px] lg:w-[410px] flex items-end justify-center transition-transform duration-300 ease-out translate-y-0 sm:translate-y-1"
            style={{
              transform: `translate3d(${mousePos.x * 20}px, 0, 0)`,
            }}
          >
            {/* Slide-Up Entrance Wrapper */}
            <div className="relative w-full flex items-end justify-center animate-hero-slide-up-in">
              {/* 3D Organic Morphing Blob (Executive Light Palette) */}
              <div
                className="absolute bottom-8 sm:bottom-10 lg:bottom-12 inset-x-1 sm:inset-x-2 lg:inset-x-1 h-[290px] sm:h-[360px] lg:h-[400px] rounded-[50%_50%_45%_55%/60%_45%_55%_40%] animate-[morphShake_4.5s_ease-in-out_infinite] transition-all pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #0284C7 0%, #0ea5e9 45%, #14b8a6 100%)',
                  boxShadow: '0 20px 45px -10px rgba(2, 132, 199, 0.35)',
                  transformStyle: 'preserve-3d',
                }}
              />

              {/* Central Portrait Cutout */}
              <div className="relative z-10 w-full flex items-end justify-center pointer-events-none animate-hero-slide-up-float">
                <img
                  src="/homeimg-nobg.png"
                  alt="Ravi Kumar"
                  className="w-auto h-[320px] sm:h-[390px] lg:h-[450px] max-h-[72vh] object-contain object-bottom contrast-[1.03] pointer-events-none block align-bottom transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/homeimg.jpeg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
           RIGHT: FLOATING CAPSULE & BADGE
           ======================================================== */}
        <div
          className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center space-y-12 pb-8 lg:pb-16 transition-transform duration-300 ease-out relative z-10"
          style={{
            transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, 20px)`,
          }}
        >
          {/* Floating Interactive Input / Prompt Capsule */}
          <div className="relative group cursor-pointer w-full max-w-[270px]">
            <div className="flex items-center justify-between p-2 pl-4 rounded-2xl bg-white text-slate-800 shadow-xl backdrop-blur-md border border-slate-200/90 hover:border-[#0284C7] transition-all duration-300">
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 truncate pr-2">
                <span className="w-1.5 h-3.5 bg-[#0284C7] animate-pulse inline-block" />
                <span className="truncate">{promptPlaceholders[promptIndex]}</span>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs flex-shrink-0 bg-slate-100">
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
          </div>

          {/* Circular Certification Seal / Emblem */}
          <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
            <div className="relative w-24 h-24 rounded-full border border-slate-200 bg-white p-1.5 flex items-center justify-center shadow-lg group-hover:border-[#0284C7] group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-1 rounded-full border border-dashed border-sky-400/50 animate-[spin_20s_linear_infinite]" />
              
              <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-[#0284C7] shadow-inner">
                <span className="text-xl">🎓</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <p className="text-[11px] font-mono font-bold tracking-widest text-slate-800 uppercase">
                AI &amp; ML CERTIFIED
              </p>
              <p className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">
                PROFESSIONAL DEVELOPER
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-2 left-6 hidden xl:flex flex-col items-center gap-1.5 text-slate-400 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase font-mono tracking-widest">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-slate-300 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-[#0284C7] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

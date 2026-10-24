import React, { useState, useRef } from 'react';

/**
 * IdCard Component
 * 
 * Realistic 3D Hanging Lanyard ID Card with:
 * - Extra WIDE fabric lanyard rope featuring bold "✦ AI DEVELOPER ✦" typography
 * - Complete removal of personal name from rope & front title
 * - Authentic 3D physics: top-anchored pendulum hang, organic cloth flutter,
 *   mouse parallax tilt, and dynamic specular gloss reflection
 * - Flip feature for tech passport & credentials
 */
export default function IdCard() {
  const [rotate, setRotate] = useState({ x: -4, y: 7, z: -1 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 30, opacity: 0.3 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Smooth mouse-driven 3D physics
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Realistic physics: pivoting from top center anchor
    setRotate({
      x: -ny * 16 - 3,
      y: nx * 18 + 5,
      z: nx * -2.5, // Natural secondary roll when swinging
    });

    // Realistic moving specular light reflection
    setGlarePos({
      x: Math.round((e.clientX - rect.left) / rect.width * 100),
      y: Math.round((e.clientY - rect.top) / rect.height * 100),
      opacity: 0.65,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: -4, y: 7, z: -1 });
    setGlarePos({ x: 50, y: 30, opacity: 0.25 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[440px] mx-auto flex flex-col items-center select-none py-2"
      style={{ perspective: '1600px' }}
    >
      {/* ========================================================
         1. TOP ANCHOR: WIDE FABRIC LANYARD STRAP & CHROME CLIP
         ======================================================== */}
      <div className="relative z-30 flex flex-col items-center -mb-3.5">
        {/* Extra Wide Purple Lanyard Strap (Fabric Texture) */}
        <div className="w-14 h-20 bg-gradient-to-r from-[#4338ca] via-[#6366f1] to-[#3730a3] rounded-t-sm shadow-xl border-x-2 border-indigo-300/40 flex flex-col justify-between py-1.5 px-1 overflow-hidden">
          {/* Authentic Woven Fabric Ribbed Stitching */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-[1.5px] bg-indigo-200/40 border-b border-indigo-900/40"
            />
          ))}
        </div>

        {/* Realistic 3D Chrome Metallic Swivel Clip */}
        <div className="relative -mt-2.5 z-30 flex flex-col items-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
          {/* Metallic Swivel Ring */}
          <div className="w-8 h-4 rounded-full border-[3.5px] border-slate-300 bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400 shadow-md" />
          
          {/* Main Chrome Clasp Housing with Bevel */}
          <div className="w-10 h-8 rounded-md bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 border border-slate-400/90 shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-0.5 relative">
            {/* Center steel rivet */}
            <div className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-slate-300 shadow-inner flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-slate-200" />
            </div>
            {/* Horizontal grip indent */}
            <div className="w-8 h-1 rounded-sm bg-slate-600/70 shadow-inner mt-1" />
          </div>

          {/* Heavy Clasp Tongue clipping through the oval card slot */}
          <div className="w-4 h-5 -mt-1 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700 rounded-b-md shadow-md" />
        </div>
      </div>

      {/* ========================================================
         2. EXTRA WIDE 3D LANYARD ROPE / RIBBON ("AI DEVELOPER")
         ======================================================== */}
      {/* Sweeping wide ribbon looping behind and around the right side of the card */}
      <div
        className="absolute inset-0 pointer-events-none z-10 overflow-visible animate-[wideRopeFlutter_8s_ease-in-out_infinite]"
        style={{
          transform: `translate3d(${rotate.y * 0.9}px, ${-rotate.x * 0.7}px, 0)`,
          transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        <svg
          viewBox="0 0 540 680"
          className="w-full h-full overflow-visible drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich Indigo/Purple Woven Fabric Gradient */}
            <linearGradient id="wideRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3730a3" />
              <stop offset="25%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="75%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>

            {/* Deep Dynamic Ambient Ribbon Shadow */}
            <filter id="wideRibbonShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="6" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.75" />
            </filter>

            {/* Sweeping 3D Wide Ribbon Loop Path */}
            <path
              id="wideLanyardLoop"
              d="M 280 45 C 390 15, 515 110, 495 260 C 475 390, 525 500, 460 600 C 420 655, 320 670, 275 615 C 230 560, 295 470, 315 440"
            />
          </defs>

          {/* Deep Cast Shadow behind the ribbon */}
          <path
            d="M 280 45 C 390 15, 515 110, 495 260 C 475 390, 525 500, 460 600 C 420 655, 320 670, 275 615 C 230 560, 295 470, 315 440"
            stroke="#0a0a1f"
            strokeWidth="58"
            strokeLinecap="round"
            opacity="0.45"
            transform="translate(10, 16)"
          />

          {/* MAIN EXTRA WIDE LANYARD ROPE RIBBON (Width = 56px!) */}
          <path
            d="M 280 45 C 390 15, 515 110, 495 260 C 475 390, 525 500, 460 600 C 420 655, 320 670, 275 615 C 230 560, 295 470, 315 440"
            stroke="url(#wideRibbonGrad)"
            strokeWidth="56"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Outer Fabric Edge Stitching (Top Edge) */}
          <path
            d="M 280 45 C 390 15, 515 110, 495 260 C 475 390, 525 500, 460 600 C 420 655, 320 670, 275 615 C 230 560, 295 470, 315 440"
            stroke="#a5b4fc"
            strokeWidth="2"
            strokeDasharray="4 6"
            opacity="0.75"
          />

          {/* Inner Highlight Seam on Wide Rope */}
          <path
            d="M 280 45 C 390 15, 515 110, 495 260 C 475 390, 525 500, 460 600 C 420 655, 320 670, 275 615 C 230 560, 295 470, 315 440"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* ========================================================
         3. YELLOW STARBURST STICKER (BEHIND TOP-LEFT)
         ======================================================== */}
      <div
        className="absolute -top-4 left-2 sm:left-5 z-15 pointer-events-none transform -rotate-12 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${rotate.y * -0.6 - 12}px, ${rotate.x * 0.6}px, -15px) rotate(-12deg)`,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-22 h-22 sm:w-26 sm:h-26 fill-[#facc15] filter drop-shadow-[0_10px_20px_rgba(250,204,21,0.4)]"
        >
          {/* 8-point geometric starburst badge */}
          <polygon points="50,0 61,24 85,15 76,39 100,50 76,61 85,85 61,76 50,100 39,76 15,85 24,61 0,50 24,39 15,15 39,24" />
        </svg>
      </div>

      {/* ========================================================
         4. REALISTIC 3D ID CARD CONTAINER (PENDULUM ANCHOR AT TOP)
         ======================================================== */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative z-20 w-[295px] sm:w-[330px] lg:w-[345px] h-[450px] sm:h-[485px] cursor-pointer group animate-[realLanyardHang_7s_ease-in-out_infinite]"
        style={{
          transformOrigin: '50% 0%', // Physical top anchor swing!
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg) rotateZ(${rotate.z}deg) ${
            isHovered ? 'translateZ(40px) scale(1.02)' : 'translateZ(0px)'
          }`,
          transition: isHovered
            ? 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ==================== CARD FRONT ==================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-[30px] p-5 flex flex-col justify-between overflow-hidden shadow-[0_30px_70px_-12px_rgba(0,0,0,0.9)] border-2 border-white/25 select-none backdrop-blur-md"
          style={{
            background: 'linear-gradient(150deg, #ff4d4d 0%, #ee3333 45%, #cb2222 100%)',
            boxShadow:
              '0 30px 70px -15px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.4)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Top Slotted Oval Cutout for Metallic Clip */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-slate-900 border border-white/30 shadow-inner flex items-center justify-center z-30">
            <div className="w-10 h-1 rounded-full bg-black/80" />
          </div>

          {/* Dynamic Real Specular Light Glare following mouse */}
          <div
            className="absolute -inset-full pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 75%)`,
            }}
          />

          {/* ========================================================
             CIRCULAR FRAME: FACE ONLY INSIDE CIRCLE BACKGROUND
             ======================================================== */}
          <div className="relative mt-6 w-full flex-1 flex items-center justify-center">
            {/* Outer Circular Ring with 3D Depth */}
            <div
              className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-gradient-to-tr from-white/95 via-rose-100 to-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.45)] border-2 border-white/60 transition-transform duration-300"
              style={{
                transform: `translate3d(${rotate.y * -0.25}px, ${rotate.x * -0.25}px, 20px)`,
              }}
            >
              {/* Inner Circular Background with Face Headshot */}
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#fff6f6] via-[#fde8e8] to-[#fad2d2] relative shadow-inner border border-rose-200/60 flex items-center justify-center">
                <img
                  src="/homeimg-face.png"
                  alt="AI Developer Face"
                  className="w-full h-full object-cover object-center filter contrast-105 brightness-105 pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/homeimg-nobg.png';
                  }}
                />

                {/* Subtle Circular Rim Shading */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] pointer-events-none" />
              </div>

              {/* Decorative Corner Starlet */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#facc15] border-2 border-white flex items-center justify-center shadow-md text-[10px] text-slate-900 font-black">
                ✦
              </div>
            </div>
          </div>

          {/* ========================================================
             BOTTOM ID CARD INFO: PURE "AI DEVELOPER" TITLE (NAME REMOVED)
             ======================================================== */}
          <div
            className="relative z-20 pt-2 flex items-end justify-between"
            style={{ transform: 'translateZ(30px)' }}
          >
            {/* Left: Role Title (No personal name as requested) */}
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-1.5 pb-0.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-rose-100 uppercase font-bold">
                  OFFICIAL ID &bull; VERIFIED
                </span>
              </div>
              <h3 className="text-2xl sm:text-[27px] font-black tracking-tight text-white leading-none drop-shadow-md">
                AI DEVELOPER
              </h3>
              <p className="text-xs sm:text-[13px] font-semibold text-rose-100 tracking-wide">
                Machine Learning &amp; Deep Learning
              </p>
              <p className="text-[10px] font-mono font-medium text-rose-200/95 pt-0.5">
                Grace College of Engineering &bull; 2026
              </p>
            </div>

            {/* Right: Crisp QR Code Square */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-xl p-1 shadow-xl flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-lg p-0.5 grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className={`rounded-[1px] ${
                      i === 0 || i === 3 || i === 12 || i === 15 || i % 3 === 0
                        ? 'bg-white'
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Flip Hint */}
          <div className="absolute bottom-1 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono tracking-widest uppercase bg-black/70 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            Click to Flip ↺
          </div>
        </div>

        {/* ==================== CARD BACK: PASSPORT / CREDENTIALS ==================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-[30px] p-6 flex flex-col justify-between overflow-hidden shadow-[0_30px_70px_-12px_rgba(0,0,0,0.9)] border-2 border-indigo-400/40 text-left backdrop-blur-xl select-none"
          style={{
            background: 'linear-gradient(150deg, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
            boxShadow:
              '0 30px 70px -15px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.6)',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top Slotted Oval Cutout */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-slate-900 border border-white/20 shadow-inner flex items-center justify-center z-30">
            <div className="w-10 h-1 rounded-full bg-black/80" />
          </div>

          {/* Passport Header */}
          <div className="pt-3 flex justify-between items-center border-b border-indigo-500/30 pb-2">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              AI PASSPORT
            </span>
            <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold">
              SYSTEM: ACTIVE
            </span>
          </div>

          {/* Core Technical Stack */}
          <div className="space-y-1.5 my-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              Core Intelligence Stack:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Python',
                'TensorFlow',
                'CNN / ANN',
                'RAG Systems',
                'FastAPI',
                'Django',
                'Scikit-Learn',
                'Docker',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-indigo-950/80 text-indigo-200 border border-indigo-500/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Credentials */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 text-[11px] text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[10px]">PROGRAM:</span>
              <span className="font-semibold text-white">B.Tech AI &amp; Data Science</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[10px]">COLLEGE:</span>
              <span className="font-semibold text-white">Grace College of Eng.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[10px]">CGPA:</span>
              <span className="font-bold text-amber-300">7.85 / 10</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[10px]">INTERN:</span>
              <span className="font-semibold text-indigo-300">1M1B IBM &amp; Matt Eng.</span>
            </div>
          </div>

          {/* Barcode & Passport ID */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-end gap-0.5 h-4">
                {[3, 5, 2, 4, 1, 5, 3, 2, 4, 1, 5, 2, 4, 3].map((h, idx) => (
                  <span
                    key={idx}
                    className="w-[2px] bg-indigo-400/80 rounded-sm"
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-400 uppercase">
                SECURITY VERIFIED
              </span>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-indigo-300 font-bold">
                ID: 2026-AI-CORE
              </div>
              <span className="text-[8px] font-mono text-slate-400">
                CLICK TO FLIP ↺
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative 3D Cursor Accent */}
      <div className="absolute -bottom-1 -right-1 sm:right-4 z-30 pointer-events-none transform rotate-12 transition-transform group-hover:scale-110">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-slate-200 stroke-black stroke-[1.5] filter drop-shadow-xl"
        >
          <path d="M4 2 L20 10 L12 13 L8 21 Z" />
        </svg>
      </div>
    </div>
  );
}

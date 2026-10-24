import React, { useState, useRef } from 'react';

export default function IdCard() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const multiplier = 18;
    setRotate({
      x: -(y / (rect.height / 2)) * multiplier,
      y: (x / (rect.width / 2)) * multiplier,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-6">
      {/* SVG Lanyard & Clip */}
      <div className="w-[120px] h-[75px] relative z-20 -mb-2">
        <svg
          viewBox="0 0 120 80"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lanyardRopeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <filter id="lanyardShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.4" />
            </filter>
          </defs>
          <path
            d="M 60 0 C 60 20, 20 30, 20 50 C 20 65, 55 70, 60 80"
            stroke="url(#lanyardRopeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 60 0 C 60 20, 100 30, 100 50 C 100 65, 65 70, 60 80"
            stroke="url(#lanyardRopeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Badge Clip */}
          <rect x="48" y="68" width="24" height="10" rx="3" fill="#0891b2" />
          <circle cx="60" cy="73" r="3.5" fill="#040c1a" stroke="#22d3ee" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1100px' }}
        className="relative w-[300px] h-[440px] cursor-pointer group"
      >
        <div
          className="w-full h-full duration-500 transition-transform relative rounded-2xl shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotate.x}deg) rotateY(${
              rotate.y + (isFlipped ? 180 : 0)
            }deg)`,
          }}
        >
          {/* CARD FRONT */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#0c2238] via-[#071629] to-[#040e1c] border border-cyan-500/30 p-5 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Holographic light streak */}
            <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent group-hover:translate-x-full duration-1000 transform transition-transform pointer-events-none" />

            {/* Header Strip */}
            <div className="flex justify-between items-center pb-2 border-b border-cyan-500/20 text-xs font-mono tracking-widest text-cyan-400">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                DEVELOPER ID
              </span>
              <span className="bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded text-[10px]">
                2026-ACTIVE
              </span>
            </div>

            {/* Photo Avatar */}
            <div className="relative my-2 flex justify-center">
              <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                <img
                  src="/profile.jpg"
                  alt="Ravi Kumar"
                  className="w-full h-full object-cover rounded-full border-2 border-[#071629]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextSibling) {
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div
                  className="hidden w-full h-full rounded-full bg-[#0a2540] text-cyan-300 font-bold text-3xl items-center justify-center border-2 border-[#071629]"
                >
                  RK
                </div>
              </div>
            </div>

            {/* Name & Title */}
            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-white tracking-wide">
                Ravi Kumar
              </h3>
              <p className="text-xs font-medium text-cyan-400">
                AI / Machine Learning & Full-Stack
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2" />
            </div>

            {/* Contact details */}
            <div className="text-[11px] space-y-1 text-slate-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 truncate">
                <span>📧</span>
                <span className="truncate">Ravikumar755667@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎓</span>
                <span>B.Tech AI & DS (CGPA 7.8)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>India</span>
              </div>
            </div>

            {/* Barcode & Flip Hint */}
            <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-end gap-0.5 h-5">
                  {[2, 4, 1, 3, 5, 2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 5, 1].map(
                    (h, i) => (
                      <span
                        key={i}
                        className="w-[2px] bg-cyan-400/80 rounded-sm"
                        style={{ height: `${h * 4}px` }}
                      />
                    )
                  )}
                </div>
                <p className="text-[8px] font-mono text-cyan-400/60 tracking-wider">
                  ID-2026-RK-0042
                </p>
              </div>
              <span className="text-[10px] text-cyan-300/80 font-mono flex items-center gap-1 group-hover:text-cyan-200">
                ↺ Click / Flip
              </span>
            </div>
          </div>

          {/* CARD BACK */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#071629] via-[#091f35] to-[#040e1c] border border-cyan-500/40 p-5 flex flex-col justify-between shadow-2xl backdrop-blur-xl text-left"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="flex justify-between items-center pb-2 border-b border-cyan-500/20">
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                CORE TECH STACK
              </span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                VERIFIED
              </span>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5 my-2">
              {[
                'Python',
                'TensorFlow',
                'Scikit-learn',
                'Django',
                'FastAPI',
                'React',
                'Tailwind CSS',
                'Docker',
                'Pandas',
                'SQL',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-[10px] font-medium rounded-md bg-cyan-950/70 text-cyan-200 border border-cyan-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Mini QR Grid */}
            <div className="bg-black/40 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1 rounded grid grid-cols-5 gap-0.5 flex-shrink-0">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span
                    key={i}
                    className={`rounded-[1px] ${
                      (i * 7) % 3 === 0 || i % 2 === 0 ? 'bg-black' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <div className="text-[10px] space-y-1">
                <p className="font-semibold text-white">Scan to Connect</p>
                <p className="text-gray-400 text-[9px]">
                  Direct repository & profile link
                </p>
              </div>
            </div>

            {/* Signature Area */}
            <div className="pt-2 border-t border-white/10">
              <div className="h-6 flex items-center justify-center font-serif italic text-cyan-300 text-sm tracking-wider opacity-80">
                Ravi Kumar
              </div>
              <p className="text-[9px] text-center font-mono text-gray-400">
                Authorized Signature • 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

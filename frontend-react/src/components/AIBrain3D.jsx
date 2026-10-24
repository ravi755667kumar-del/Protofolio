import React, { useState, useEffect } from 'react';

/**
 * AIBrain3D
 * 
 * Interactive 3D Holographic AI Brain Widget
 * Features:
 * - 3D Perspective Tilt on mouse tracking
 * - Cybernetic Sci-Fi HUD frame with corner brackets
 * - High-definition glowing circuit neural brain with synaptic flares
 * - Animated binary code stream (0110 0100 0101 1001)
 * - Moving scanline laser sweep
 * - Real-time synapse activity telemetry
 */
export default function AIBrain3D({ mousePos = { x: 0, y: 0 }, compact = false }) {
  const [internalMouse, setInternalMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeFibers, setActiveFibers] = useState(99.4);

  // Use passed mousePos or internal tracker
  const posX = mousePos.x || internalMouse.x;
  const posY = mousePos.y || internalMouse.y;

  // Subtle telemetry fluctuation for realistic AI heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFibers((99.2 + Math.random() * 0.7).toFixed(1));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setInternalMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setInternalMouse({ x: 0, y: 0 });
  };

  if (compact) {
    return (
      <div
        className="relative group cursor-pointer select-none"
        style={{ perspective: '800px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#030d1d]/90 to-[#07172c]/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          style={{
            transform: `rotateY(${posX * 14}deg) rotateX(${-posY * 14}deg) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Mini Glowing Brain */}
          <div className="relative w-7 h-7 flex-shrink-0" style={{ transform: 'translateZ(15px)' }}>
            <img
              src="/ai-brain-transparent.png"
              alt="AI Brain"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              onError={(e) => {
                e.currentTarget.src = '/ai-brain.png';
              }}
            />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
          </div>

          <div className="flex flex-col text-left" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-300 uppercase">
                Neural Core
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <span className="text-[8px] font-mono tracking-widest text-slate-400">
              3D ACTIVE &bull; {activeFibers}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative group cursor-pointer select-none"
      style={{ perspective: '1100px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Tilted Card Shell */}
      <div
        className="relative w-[240px] sm:w-[270px] lg:w-[285px] rounded-2xl p-4 bg-gradient-to-br from-[#040e1f]/90 via-[#071a33]/85 to-[#020713]/95 border border-cyan-500/35 shadow-[0_20px_45px_-10px_rgba(6,182,212,0.3)] backdrop-blur-xl transition-all duration-300 ease-out group-hover:border-cyan-400 group-hover:shadow-[0_25px_60px_-5px_rgba(6,182,212,0.55)]"
        style={{
          transform: `rotateY(${posX * 18}deg) rotateX(${-posY * 18}deg) ${isHovered ? 'translateZ(30px) scale(1.03)' : 'translateZ(0px)'}`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Sci-Fi HUD Corner Brackets */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none" />

        {/* Ambient Radial Bloom */}
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_45%,rgba(6,182,212,0.25)_0%,rgba(59,130,246,0.12)_45%,transparent_75%)] pointer-events-none" />

        {/* TOP HUD BAR */}
        <div
          className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2 relative z-10"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              AI NEURAL CORE
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 font-bold">
            3D HUD
          </span>
        </div>

        {/* CENTER: 3D CYBERNETIC BRAIN DISPLAY */}
        <div
          className="relative w-full h-[170px] sm:h-[190px] flex items-center justify-center overflow-hidden rounded-xl bg-[#020814]/70 border border-cyan-900/40 my-1"
          style={{ transform: 'translateZ(35px)' }}
        >
          {/* Faint Animated Binary Matrix Stream behind the brain */}
          <div
            className="absolute inset-0 p-2 font-mono text-[9px] leading-tight text-cyan-500/25 pointer-events-none select-none flex flex-col justify-between overflow-hidden"
            style={{ animation: 'binaryFlicker 4s ease-in-out infinite' }}
          >
            <div>0110 0100 0101 1001</div>
            <div>0101 1001 0110 0100</div>
            <div>1001 0110 0100 0101</div>
            <div>0100 0101 1001 0110</div>
            <div>0110 1001 0101 0100</div>
          </div>

          {/* Central Radial Core Light */}
          <div className="absolute w-32 h-32 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />

          {/* The High-Resolution 3D Cybernetic Brain Image */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-1">
            <img
              src="/ai-brain-transparent.png"
              alt="3D Neural Brain Circuit"
              className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(6,182,212,0.7)] group-hover:drop-shadow-[0_0_28px_rgba(34,211,238,0.95)] group-hover:scale-105 transition-all duration-300"
              style={{
                animation: 'neuralPulse 3.5s ease-in-out infinite',
              }}
              onError={(e) => {
                e.currentTarget.src = '/ai-brain.png';
              }}
            />
          </div>

          {/* Sci-Fi Scanline Laser Sweep Overlay */}
          <div
            className="absolute inset-x-0 h-10 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent border-y border-cyan-300/40"
            style={{
              animation: 'scanline 3.2s linear infinite',
            }}
          />

          {/* Floating HUD Chip Tag */}
          <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[8px] font-mono text-cyan-300 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            SYNAPSE: {activeFibers}%
          </div>

          <div className="absolute top-2 right-2 z-20 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[8px] font-mono text-cyan-400 font-bold">
            0101.AI
          </div>
        </div>

        {/* BOTTOM TELEMETRY BAR */}
        <div
          className="mt-2.5 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[10px] font-mono text-slate-400"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-sm" />
            <span className="text-[9px] uppercase tracking-wider font-semibold">
              Deep Learning
            </span>
          </div>
          <span className="text-[9px] tracking-widest text-slate-400 uppercase">
            Model: Active
          </span>
        </div>
      </div>

      {/* Floating Holographic Ground Shadow */}
      <div className="absolute -bottom-4 inset-x-8 h-4 rounded-full bg-cyan-500/25 blur-xl -z-10 group-hover:bg-cyan-400/40 transition-all duration-300" />
    </div>
  );
}

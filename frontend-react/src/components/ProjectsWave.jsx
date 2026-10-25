import React, { useState, useRef, useEffect } from 'react';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';

export default function ProjectsWave() {
  const [selectedProject, setSelectedProject] = useState(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  const scrollBy = (amount) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 bg-[#020b18] overflow-hidden border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <span>🌟</span>
              <span>What I've Built</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Featured{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-slate-400 text-sm max-w-md mt-2">
              Explore 8 full-stack and Machine Learning projects connected along the interactive SVG wave track.
            </p>
          </div>

          {/* Navigation Arrows & Counter */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              8 Projects
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBy(-450)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-white flex items-center justify-center transition-all"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scrollBy(450)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-white flex items-center justify-center transition-all"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Track Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-150"
            style={{ width: `${Math.max(12, scrollProgress)}%` }}
          />
        </div>
      </div>

      {/* Horizontal Scrolling Wave Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing pb-8 scrollbar-none select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="relative w-[3400px] h-[480px] mx-auto px-12">
          {/* Extended Wavy SVG Line */}
          <svg
            className="absolute top-0 left-0 w-[3400px] h-[480px] pointer-events-none"
            viewBox="0 0 3200 360"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="14%" stopColor="#10b981" />
                <stop offset="28%" stopColor="#a78bfa" />
                <stop offset="43%" stopColor="#f97316" />
                <stop offset="57%" stopColor="#06b6d4" />
                <stop offset="71%" stopColor="#f43f5e" />
                <stop offset="85%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
              <filter id="waveGlow" x="-20%" y="-80%" width="140%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing background path */}
            <path
              d="M 0 180 Q 200 60 400 180 Q 600 300 800 180 Q 1000 60 1200 180 Q 1400 300 1600 180 Q 1800 60 2000 180 Q 2200 300 2400 180 Q 2600 60 2800 180 Q 3000 300 3200 180"
              stroke="url(#waveGrad)"
              strokeWidth="9"
              fill="none"
              opacity="0.15"
            />

            {/* Sharp core path */}
            <path
              d="M 0 180 Q 200 60 400 180 Q 600 300 800 180 Q 1000 60 1200 180 Q 1400 300 1600 180 Q 1800 60 2000 180 Q 2200 300 2400 180 Q 2600 60 2800 180 Q 3000 300 3200 180"
              stroke="url(#waveGrad)"
              strokeWidth="3"
              fill="none"
              filter="url(#waveGlow)"
              opacity="0.9"
            />

            {/* Node dots along the sine curve */}
            {projectsData.map((p) => {
              const yNode = p.position === 'top' ? 120 : 240;
              const yLineEnd = p.position === 'top' ? 70 : 290;
              return (
                <g key={p.id}>
                  {/* Dashed connector line to card */}
                  <line
                    x1={p.nodeX}
                    y1={yNode}
                    x2={p.nodeX}
                    y2={yLineEnd}
                    stroke={p.color}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.75"
                  />
                  {/* Outer pulse circle */}
                  <circle
                    cx={p.nodeX}
                    cy={yNode}
                    r="12"
                    fill={p.color}
                    opacity="0.25"
                  />
                  {/* Core node dot */}
                  <circle
                    cx={p.nodeX}
                    cy={yNode}
                    r="7"
                    fill={p.color}
                    filter="url(#waveGlow)"
                  />
                </g>
              );
            })}
          </svg>

          {/* Project Cards (alternating top and bottom) */}
          {projectsData.map((project) => {
            const isTop = project.position === 'top';
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`absolute w-[220px] p-4 rounded-xl bg-gradient-to-br from-[#0c223a]/95 via-[#08182b]/95 to-[#040e1b]/95 border shadow-2xl backdrop-blur-xl cursor-pointer group hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-10`}
                style={{
                  left: `${project.nodeX - 110}px`,
                  top: isTop ? '30px' : '265px',
                  borderColor: `${project.color}55`,
                }}
              >
                {/* Subtle Hover Glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md pointer-events-none"
                  style={{ backgroundColor: `${project.color}15` }}
                />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl p-1.5 rounded-lg bg-white/5 border border-white/10">
                    {project.icon}
                  </span>
                  <span
                    className="text-[11px] font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      color: project.color,
                      backgroundColor: `${project.color}15`,
                    }}
                  >
                    {project.num}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
                  {project.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono mb-3">
                  {project.shortTech}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-slate-400">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-cyan-300 group-hover:underline flex items-center gap-0.5">
                    Open ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

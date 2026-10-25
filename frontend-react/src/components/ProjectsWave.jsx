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
    <section id="projects" className="relative min-h-screen flex flex-col justify-center pt-24 pb-14 bg-[#F8FAFC] overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
              <span>🌟</span>
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Featured{' '}
              <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-slate-600 text-sm max-w-md mt-2">
              Explore 8 full-stack and Machine Learning projects connected along the interactive SVG wave track.
            </p>
          </div>

          {/* Navigation Arrows & Counter */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-[#0284C7] bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-xs">
              8 Projects
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBy(-450)}
                className="w-10 h-10 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-[#0284C7] text-slate-700 hover:text-[#0284C7] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scrollBy(450)}
                className="w-10 h-10 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-[#0284C7] text-slate-700 hover:text-[#0284C7] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Track Progress Bar */}
        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-[#0284C7] to-teal-600 transition-all duration-150"
            style={{ width: `${Math.max(12, scrollProgress)}%` }}
          />
        </div>
      </div>

      {/* Horizontal Scrolling Wave Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing pb-8 scrollbar-none select-none relative z-10"
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
              <linearGradient id="waveGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="14%" stopColor="#0d9488" />
                <stop offset="28%" stopColor="#7c3aed" />
                <stop offset="43%" stopColor="#ea580c" />
                <stop offset="57%" stopColor="#0284c7" />
                <stop offset="71%" stopColor="#e11d48" />
                <stop offset="85%" stopColor="#059669" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>

            {/* Background Sine Track */}
            <path
              d="M 0 180 Q 200 40, 400 180 T 800 180 T 1200 180 T 1600 180 T 2000 180 T 2400 180 T 2800 180 T 3200 180"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="5"
            />

            {/* Glowing Gradient Wave Path */}
            <path
              d="M 0 180 Q 200 40, 400 180 T 800 180 T 1200 180 T 1600 180 T 2000 180 T 2400 180 T 2800 180 T 3200 180"
              fill="none"
              stroke="url(#waveGradLight)"
              strokeWidth="3.5"
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
                  {/* Outer circle */}
                  <circle
                    cx={p.nodeX}
                    cy={yNode}
                    r="10"
                    fill={p.color}
                    opacity="0.2"
                  />
                  {/* Core node dot */}
                  <circle
                    cx={p.nodeX}
                    cy={yNode}
                    r="6"
                    fill={p.color}
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
                className={`absolute w-[220px] p-4 rounded-xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl cursor-pointer group hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-10`}
                style={{
                  left: `${project.nodeX - 110}px`,
                  top: isTop ? '30px' : '265px',
                  borderColor: `${project.color}55`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl p-1.5 rounded-lg bg-slate-50 border border-slate-200">
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

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors line-clamp-1 mb-1">
                  {project.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-mono mb-3">
                  {project.shortTech}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  </span>
                  <span className="text-[#0284C7] font-semibold group-hover:underline flex items-center gap-0.5">
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

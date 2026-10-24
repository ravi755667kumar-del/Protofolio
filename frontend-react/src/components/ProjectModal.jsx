import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-br from-[#0c223a] via-[#081729] to-[#040e1b] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 text-left overflow-hidden">
        {/* Top Glow */}
        <div
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: project.color }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all text-sm"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header Icon & Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl p-3 rounded-2xl bg-white/5 border border-white/10">
            {project.icon}
          </span>
          <div>
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide mb-1"
              style={{
                backgroundColor: `${project.color}20`,
                color: project.color,
                border: `1px solid ${project.color}40`,
              }}
            >
              {project.badge}
            </span>
            <span className="block text-xs font-mono text-slate-400">
              Project #{project.num}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
          {project.highlights.map((hl, i) => (
            <div key={i} className="text-xs">
              <span className="font-semibold text-cyan-300 block">
                {hl.label}
              </span>
              <span className="text-slate-300">{hl.val}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-cyan-300 border border-cyan-500/20 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-2.5 px-5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>View Source Code on GitHub</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

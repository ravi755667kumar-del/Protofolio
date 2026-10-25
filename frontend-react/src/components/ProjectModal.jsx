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
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl z-10 text-left overflow-hidden text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all text-sm cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header Icon & Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl p-3 rounded-2xl bg-slate-50 border border-slate-200">
            {project.icon}
          </span>
          <div>
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide mb-1"
              style={{
                backgroundColor: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}35`,
              }}
            >
              {project.badge}
            </span>
            <span className="block text-xs font-mono text-slate-500 font-semibold">
              Project #{project.num}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
          {project.highlights.map((hl, i) => (
            <div key={i} className="text-xs">
              <span className="font-bold text-[#0284C7] block">
                {hl.label}
              </span>
              <span className="text-slate-700">{hl.val}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-xs rounded-md bg-sky-50 text-sky-700 border border-sky-200 font-mono font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#0284C7] to-teal-600 hover:shadow-lg hover:shadow-sky-500/25 transition-all inline-flex items-center gap-2"
          >
            <span>View on GitHub</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

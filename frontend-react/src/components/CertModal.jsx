import React, { useEffect } from 'react';

export default function CertModal({ cert, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-br from-[#0c223a] via-[#08182b] to-[#040e1b] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl z-10 text-left overflow-hidden">
        {/* Top Glow */}
        <div
          className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: cert.accentColor }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all text-sm"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Certificate Card Header Strip */}
        <div
          className="p-4 rounded-xl mb-5 flex items-center justify-between text-white shadow-md"
          style={{ background: cert.gradient }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{cert.issuerIcon}</span>
            <span className="font-bold text-sm tracking-wide">
              {cert.issuer}
            </span>
          </div>
          <span className="text-xs font-mono bg-black/25 px-2.5 py-1 rounded">
            Verified
          </span>
        </div>

        {/* Certificate Body */}
        <div className="border border-white/10 rounded-xl p-5 bg-white/5 space-y-4 mb-6">
          <p className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
            {cert.type}
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {cert.title}
          </h3>

          <div className="pt-2 border-t border-white/10">
            <p className="text-xs text-slate-400">Awarded to:</p>
            <p className="text-base font-bold text-white tracking-wide">
              {cert.recipient}
            </p>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
            <span>{cert.meta}</span>
            <span className="text-cyan-300">{cert.certId}</span>
          </div>
        </div>

        {/* Skills Tagged */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {cert.skills.map((s, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs rounded-md bg-cyan-950/60 text-cyan-200 border border-cyan-500/30 font-mono"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={cert.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 text-center transition-all flex items-center justify-center gap-2"
          >
            <span>Open Original PDF</span>
            <span>↗</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

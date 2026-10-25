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
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl z-10 text-left overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all text-sm cursor-pointer"
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
          <span className="text-xs font-mono bg-black/25 px-2.5 py-1 rounded font-semibold">
            Verified
          </span>
        </div>

        {/* Certificate Body */}
        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-4 mb-6">
          <p className="text-[11px] font-mono tracking-widest text-[#0284C7] font-bold uppercase">
            {cert.type}
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {cert.title}
          </h3>

          <div className="pt-2 border-t border-slate-200">
            <p className="text-xs text-slate-500">Awarded to:</p>
            <p className="text-base font-bold text-slate-900 tracking-wide">
              {cert.recipient}
            </p>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-2 border-t border-slate-200">
            <span>{cert.meta}</span>
            <span className="text-[#0284C7] font-semibold">{cert.certId}</span>
          </div>
        </div>

        {/* Skills Tagged */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {cert.skills.map((s, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs rounded-md bg-sky-50 text-sky-700 border border-sky-200 font-mono font-medium"
            >
              #{s}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={cert.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#0284C7] to-teal-600 hover:shadow-lg hover:shadow-sky-500/30 text-center transition-all flex items-center justify-center gap-2"
          >
            <span>Open Original PDF</span>
            <span>↗</span>
          </a>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

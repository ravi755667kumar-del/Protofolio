import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certsData } from '../data/certsData';
import CertModal from './CertModal';

gsap.registerPlugin(ScrollTrigger);

export default function CertificationsOrbit() {
  const [selectedCert, setSelectedCert] = useState(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#040e1f] overflow-hidden border-t border-cyan-500/10"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-900/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
            <span>🏆</span>
            <span>Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            My{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Accredited certifications validating proficiency in Machine Learning, Cloud Architecture, Data Science, and Modern Engineering.
          </p>
        </div>

        {/* Orbit Center Hub Graphic */}
        <div className="flex justify-center mb-12">
          <div className="relative flex items-center justify-center">
            {/* Outer pulsating rings */}
            <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
            <div className="absolute w-36 h-36 rounded-full border border-cyan-400/30 animate-pulse pointer-events-none" />
            {/* Core Hub */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0b243d] to-[#04101e] border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.25)] flex flex-col items-center justify-center text-white z-10 backdrop-blur-xl">
              <span className="text-2xl">🏆</span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300">
                6 CERTS
              </span>
            </div>
          </div>
        </div>

        {/* 6 Certificate Cards Grid */}
        <div className="certs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certsData.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="cert-card p-5 rounded-2xl bg-gradient-to-br from-[#0c223a]/90 via-[#071629]/90 to-[#030d1a]/90 border border-cyan-500/20 shadow-xl backdrop-blur-xl cursor-pointer group hover:border-cyan-400/60 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Strip */}
                <div
                  className="p-3.5 rounded-xl mb-4 flex items-center justify-between text-white shadow-md transition-transform group-hover:scale-[1.02]"
                  style={{ background: cert.gradient }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{cert.issuerIcon}</span>
                    <span className="font-bold text-xs tracking-wide">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-black/20 px-2 py-0.5 rounded">
                    ✔ Valid
                  </span>
                </div>

                {/* Card Title & Info */}
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase block">
                    {cert.type}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Presented to <strong className="text-slate-200">Ravi Kumar</strong>
                  </p>
                </div>
              </div>

              {/* Footer Meta & ID */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{cert.meta}</span>
                <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                  Preview ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cert Modal */}
      {selectedCert && (
        <CertModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}

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
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] overflow-hidden border-t border-slate-200/80"
    >
      {/* Subtle light ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-200/25 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold tracking-widest uppercase shadow-xs">
            <span>🏆</span>
            <span>Accredited Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            My{' '}
            <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Accredited certifications validating proficiency in Machine Learning, Cloud Architecture, Data Science, and Modern Engineering.
          </p>
        </div>

        {/* Certificate Cards Grid (Orbit Graphic Removed) */}
        <div className="certs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certsData.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="cert-card p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0284C7] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header Strip */}
                <div
                  className="p-3.5 rounded-xl mb-4 flex items-center justify-between text-white shadow-sm transition-transform group-hover:scale-[1.01]"
                  style={{ background: cert.gradient }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{cert.issuerIcon}</span>
                    <span className="font-bold text-xs tracking-wide">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-black/25 px-2 py-0.5 rounded font-semibold">
                    ✔ Valid
                  </span>
                </div>

                {/* Card Title & Info */}
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-mono text-[#0284C7] font-semibold tracking-wider uppercase block">
                    {cert.type}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Presented to <strong className="text-slate-800 font-semibold">Ravi Kumar</strong>
                  </p>
                </div>
              </div>

              {/* Footer Meta & ID */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{cert.meta}</span>
                <span className="text-[#0284C7] font-semibold group-hover:underline flex items-center gap-1">
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

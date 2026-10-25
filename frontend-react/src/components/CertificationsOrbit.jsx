import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Award, CheckCircle2, FileText, ChevronDown } from 'lucide-react';
import { certsData } from '../data/certsData';
import CertModal from './CertModal';

gsap.registerPlugin(ScrollTrigger);

const CERT_DESCRIPTIONS = {
  aws: 'Validated expertise in building, training, tuning, and deploying production-grade Machine Learning models on AWS Cloud using Amazon SageMaker and distributed AI architecture.',
  ai: 'Certified under the Ministry of Electronics & IT (MeitY) Government of India national initiative on AI principles, ethical machine learning, and technological empowerment.',
  cisco: 'Comprehensive accreditation in data science methodologies, statistical analysis, exploratory data analytics, regression modeling, and algorithmic problem-solving.',
  udemy: 'Intensive masterclass certification covering deep neural network architectures, CNNs, RNNs, transformer fundamentals, and hands-on TensorFlow engineering.',
  excel: 'Professional certification validating advanced spreadsheet modeling, data visualization dashboards, formula optimization, and structured analytical reporting.',
};

export default function CertificationsOrbit() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cardElements = gsap.utils.toArray('.stacked-cert-card');
      const totalCards = cardElements.length;

      cardElements.forEach((card, index) => {
        // Track active card as user scrolls
        ScrollTrigger.create({
          trigger: card,
          start: 'top 40%',
          end: 'bottom 40%',
          onEnter: () => setActiveCardIdx(index),
          onEnterBack: () => setActiveCardIdx(index),
        });

        // Animate scale and subtle dimming of previous cards as the next card stacks over them
        if (index < totalCards - 1) {
          const nextCard = cardElements[index + 1];

          gsap.to(card, {
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 85%',
              end: 'top 25%',
              scrub: true,
            },
            scale: 0.94 - (totalCards - 1 - index) * 0.012,
            filter: 'brightness(0.91)',
            transformOrigin: 'top center',
            ease: 'none',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCard = (idx) => {
    const el = cardRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative min-h-screen pt-24 pb-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] overflow-visible border-t border-slate-200/80"
    >
      {/* Subtle light ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-200/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-200/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold tracking-widest uppercase shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#0284C7]" />
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

          {/* Interactive Stack Scroll Cue */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0284C7] animate-ping" />
            <span>Scroll down to stack cards • 5 Verified Credentials</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 animate-bounce" />
          </div>
        </div>

        {/* Floating Quick Jump Selector Pills */}
        <div className="flex justify-center mb-10 sticky top-20 z-40 py-2 pointer-events-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md">
            {certsData.map((cert, idx) => {
              const isActive = activeCardIdx === idx;
              return (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{cert.issuerIcon}</span>
                  <span className="hidden md:inline">{cert.title.split(' ')[0]}</span>
                  <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            STACKED CARD SCROLL ANIMATION CONTAINER
            All cards are direct siblings in one container so ALL 5 cards
            stack together on the page, and then the completed stack moves upside!
            ======================================================== */}
        <div className="relative w-full max-w-4xl mx-auto pb-44 sm:pb-64 lg:pb-80">
          {certsData.map((cert, index) => {
            const isLast = index === certsData.length - 1;
            const description = CERT_DESCRIPTIONS[cert.id] || cert.meta;

            // Desktop sticky offset: 90px + index * 36px
            // Mobile sticky offset: 68px + index * 24px
            const desktopTop = 90 + index * 36;
            const mobileTop = 68 + index * 24;

            return (
              <div
                key={cert.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`stacked-cert-card sticky rounded-3xl bg-white border border-slate-200/90 shadow-[0_22px_55px_-15px_rgba(15,23,42,0.14)] transition-all duration-300 overflow-hidden group hover:border-[#0284C7]/60 ${
                  isLast ? 'mb-0' : 'mb-24 sm:mb-32 lg:mb-40'
                }`}
                style={{
                  top: `clamp(${mobileTop}px, 11vh + ${index * 26}px, ${desktopTop}px)`,
                  zIndex: 10 + index,
                }}
              >
                {/* Top Brand Accent Color Stripe */}
                <div
                  className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
                  style={{ background: cert.gradient }}
                />

                {/* Top Visible Tab Strip (Visible Even When Stacked Under Subsequent Cards) */}
                <div
                  className="px-5 sm:px-8 py-3 bg-slate-50/90 border-b border-slate-200/70 flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setSelectedCert(cert)}
                  title="Click to preview credential"
                >
                  <div className="flex items-center gap-3">
                    {/* Step Number Tag */}
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-white shadow-xs"
                      style={{ background: cert.accentColor }}
                    >
                      0{index + 1}
                    </span>

                    {/* Issuer Name with Icon */}
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg">{cert.issuerIcon}</span>
                      <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wide">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>

                  {/* Verified Status Tag */}
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span className="hidden sm:inline">Accredited & Verified</span>
                    <span className="sm:hidden">Verified</span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="p-6 sm:p-8 lg:p-10 text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Left Column: Details & Meta */}
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <span className="text-[11px] font-mono font-bold tracking-wider text-[#0284C7] uppercase block mb-1">
                          {cert.type}
                        </span>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 group-hover:text-[#0284C7] transition-colors leading-tight">
                          {cert.title}
                        </h3>
                      </div>

                      {/* Recipient info & Date */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 border-y border-slate-100 py-3">
                        <div>
                          Awarded to: <strong className="text-slate-900 font-bold">{cert.recipient}</strong>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div>
                          Date: <span className="font-semibold text-slate-800">{cert.meta}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="font-mono text-[10px] text-slate-500">
                          ID: <span className="text-slate-700 font-semibold">{cert.certId}</span>
                        </div>
                      </div>

                      {/* Certificate Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    {/* Right Column: Skills & Action Buttons */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5 bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-100">
                      {/* Skills Validated */}
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                          Skills Validated
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200/90 text-slate-700 shadow-2xs hover:border-[#0284C7] hover:text-[#0284C7] transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                          style={{ background: cert.gradient }}
                        >
                          <span>Preview Credential</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span>View PDF File</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End of Stack Summary & Return to Top */}
        <div className="pt-10 pb-8 text-center relative z-20">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-lg">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">All 5 Credentials Stacked & Verified</h4>
                <p className="text-xs text-slate-500">Scroll down or click below to return to the top</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#0284C7] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer hover:shadow-md"
            >
              <span>Return to Top (Home)</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Certificate Preview Modal */}
      {selectedCert && (
        <CertModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}

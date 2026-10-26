import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ExternalLink,
  Award,
  CheckCircle2,
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';
import { certsData } from '../data/certsData';
import CertModal from './CertModal';

const CERT_DESCRIPTIONS = {
  aws: 'Validated expertise in building, training, tuning, and deploying production-grade Machine Learning models on AWS Cloud using Amazon SageMaker and distributed AI architecture.',
  ai: 'Certified under the Ministry of Electronics & IT (MeitY) Government of India national initiative on AI principles, ethical machine learning, and technological empowerment.',
  cisco: 'Comprehensive accreditation in data science methodologies, statistical analysis, exploratory data analytics, regression modeling, and algorithmic problem-solving.',
  udemy: 'Intensive masterclass certification covering deep neural network architectures, CNNs, RNNs, transformer fundamentals, and hands-on TensorFlow engineering.',
  excel: 'Professional certification validating advanced spreadsheet modeling, data visualization dashboards, formula optimization, and structured analytical reporting.',
};

export default function CertificationsOrbit() {
  const [scrollProgress, setScrollProgress] = useState(0); // 0.0 to 1.0
  const [activeFloat, setActiveFloat] = useState(0); // 0.0 to 4.0
  const [currentIndex, setCurrentIndex] = useState(0); // 0 to 4
  const [selectedCert, setSelectedCert] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const dragStartX = useRef(0);

  const totalCards = certsData.length;

  // --------------------------------------------------------------------------
  // Synchronize card position with page scroll through the pinned runway
  // --------------------------------------------------------------------------
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;

    if (totalScroll <= 0) return;

    // rect.top is the distance from viewport top to container top.
    // When rect.top is 0, user has just entered the section (Card 1).
    // When rect.top is -totalScroll, user has scrolled through all cards.
    let progress = -rect.top / totalScroll;
    progress = Math.max(0, Math.min(1, progress));

    const floatVal = progress * (totalCards - 1);
    const nearestIdx = Math.max(0, Math.min(totalCards - 1, Math.round(floatVal)));

    setScrollProgress(progress);
    setActiveFloat(floatVal);
    setCurrentIndex(nearestIdx);
  }, [totalCards]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateScrollProgress]);

  // --------------------------------------------------------------------------
  // Programmatic scroll to a specific certificate
  // --------------------------------------------------------------------------
  const scrollToCard = useCallback(
    (targetIndex) => {
      if (!containerRef.current) return;
      const clamped = Math.max(0, Math.min(totalCards - 1, targetIndex));
      const containerTop = containerRef.current.offsetTop;
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      const targetY = containerTop + (clamped / (totalCards - 1)) * totalScroll;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    },
    [totalCards]
  );

  const goToNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      scrollToCard(currentIndex + 1);
    } else if (containerRef.current) {
      // If at last card, scroll past the section to the next section / footer
      const bottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: bottom + 40, behavior: 'smooth' });
    }
  }, [currentIndex, totalCards, scrollToCard]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    } else if (containerRef.current) {
      // If at first card, scroll back to previous section
      window.scrollTo({ top: containerRef.current.offsetTop - 40, behavior: 'smooth' });
    }
  }, [currentIndex, scrollToCard]);

  // --------------------------------------------------------------------------
  // Keyboard Left / Right arrow navigation
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCert || e.target.closest('input, textarea, select')) return;
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert, goToNext, goToPrev]);

  // --------------------------------------------------------------------------
  // Pointer & Touch horizontal drag handling
  // --------------------------------------------------------------------------
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const diff = clientX - dragStartX.current;
    setDragOffset(diff * 0.45);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -50) {
      goToNext();
    } else if (dragOffset > 50) {
      goToPrev();
    }
    setDragOffset(0);
  };

  // --------------------------------------------------------------------------
  // Compute 3D Horizontal Style based on continuous scroll float
  // --------------------------------------------------------------------------
  const getCardStyle = (idx) => {
    const offset = idx - activeFloat;
    const absOffset = Math.abs(offset);

    // Completely hide cards that are far away from viewport to optimize rendering
    if (absOffset > 2.2) {
      return {
        display: 'none',
      };
    }

    // Horizontal positioning: each step shifts card left or right
    const horizontalPx = offset * 360 + dragOffset;
    const rotateY = -offset * 12; // Inward perspective tilt
    const scale = Math.max(0.78, 1 - absOffset * 0.08);
    const zDepth = -absOffset * 85;
    const opacity = Math.max(0, 1 - absOffset * 0.42);
    const zIndex = Math.round(50 - absOffset * 10);
    const isInteractive = absOffset < 0.4;

    return {
      transform: `translate3d(${horizontalPx}px, 0, ${zDepth}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      pointerEvents: isInteractive ? 'auto' : 'none',
      transformStyle: 'preserve-3d',
      transition: isDragging
        ? 'none'
        : 'transform 0.15s ease-out, opacity 0.15s ease-out',
    };
  };

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="relative w-full bg-[#F8FAFC] select-none border-t border-slate-200/80"
      style={{ height: '350vh' }}
    >
      {/* ========================================================
          STICKY FULL-SCREEN VIEWPORT STAGE
          Remains pinned while scrolling until all cards finish
          ======================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Subtle ambient light accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-sky-200/20 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-teal-200/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center flex-1 justify-between">
          
          {/* ========================================================
              TOP: SECTION HEADER & INTERACTIVE NAVIGATION PILLS
              ======================================================== */}
          <div className="w-full flex flex-col items-center">
            {/* Badge & Title */}
            <div className="text-center mb-3 sm:mb-4 space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold tracking-widest uppercase shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Accredited Credentials</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                My{' '}
                <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent">
                  Certifications
                </span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto line-clamp-1 sm:line-clamp-none">
                Scroll through credentials from left to right. Completes all 5 before proceeding.
              </p>
            </div>

            {/* Quick-Jump Controls & Indicators */}
            <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 px-2">
              {/* Left: Step / Progress Counter */}
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-xs transition-colors duration-300"
                  style={{ background: certsData[currentIndex].accentColor }}
                >
                  0{currentIndex + 1} / 0{totalCards}
                </span>
                <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                  {certsData[currentIndex].title}
                </span>
              </div>

              {/* Center: Quick Jump Category Pills */}
              <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs">
                {certsData.map((cert, idx) => {
                  const isActive = currentIndex === idx;
                  return (
                    <button
                      key={cert.id}
                      type="button"
                      onClick={() => scrollToCard(idx)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs scale-105'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      title={`Jump to ${cert.title}`}
                    >
                      <span>{cert.issuerIcon}</span>
                      <span className="hidden md:inline">{cert.title.split(' ')[0]}</span>
                      <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Left & Right Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  title="Previous Certificate (Move Left)"
                  aria-label="Previous Certificate"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-[#0284C7] text-slate-700 hover:text-[#0284C7] flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  title="Next Certificate (Move Right)"
                  aria-label="Next Certificate"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-[#0284C7] text-slate-700 hover:text-[#0284C7] flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER: 3D HORIZONTAL STAGE (GLIDES LEFT ↔ RIGHT ON SCROLL)
              ======================================================== */}
          <div
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            className="relative w-full max-w-4xl h-[420px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1200px] my-auto"
          >
            {certsData.map((cert, idx) => {
              const style = getCardStyle(idx);
              const isCenter = Math.abs(idx - activeFloat) < 0.4;
              const description = CERT_DESCRIPTIONS[cert.id] || cert.meta;

              return (
                <div
                  key={cert.id}
                  onClick={() => {
                    if (!isCenter) {
                      scrollToCard(idx);
                    }
                  }}
                  className={`absolute w-full max-w-xl sm:max-w-2xl lg:max-w-3xl rounded-3xl bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] overflow-hidden ${
                    isCenter ? 'hover:border-[#0284C7]' : 'cursor-pointer hover:opacity-90'
                  }`}
                  style={style}
                >
                  {/* Top Brand Accent Color Stripe */}
                  <div
                    className="h-2 w-full transition-all duration-300"
                    style={{ background: cert.gradient }}
                  />

                  {/* Card Header Strip */}
                  <div className="px-5 sm:px-8 py-3 bg-slate-50/90 border-b border-slate-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-white shadow-xs"
                        style={{ background: cert.accentColor }}
                      >
                        0{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg">{cert.issuerIcon}</span>
                        <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wide">
                          {cert.issuer}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span className="hidden sm:inline">Accredited &amp; Verified</span>
                      <span className="sm:hidden">Verified</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-7 text-left">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                      {/* Left Column: Title & Meta */}
                      <div className="lg:col-span-7 space-y-2.5">
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-wider text-[#0284C7] uppercase block mb-0.5">
                            {cert.type}
                          </span>
                          <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                            {cert.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 border-y border-slate-100 py-2">
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

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                          {description}
                        </p>
                      </div>

                      {/* Right Column: Skills & Actions */}
                      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                        <div>
                          <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                            Skills Validated
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {cert.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-slate-200/90 text-slate-700 shadow-2xs hover:border-[#0284C7] hover:text-[#0284C7] transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-1 flex flex-col sm:flex-row lg:flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedCert(cert)}
                            className="w-full py-2 px-4 rounded-xl text-white font-bold text-xs tracking-wide shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                            style={{ background: cert.gradient }}
                          >
                            <span>Preview Credential</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
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

          {/* ========================================================
              BOTTOM: SCROLL PROGRESS LINE & COMPLETION GUIDE
              ======================================================== */}
          <div className="w-full max-w-xl flex flex-col items-center gap-2.5">
            {/* Dynamic 5-Segment Scroll Fill Bar */}
            <div className="w-full flex items-center gap-2">
              {certsData.map((cert, idx) => {
                // Determine fill for this segment based on continuous activeFloat
                let fillPercent = 0;
                if (activeFloat >= idx + 1) {
                  fillPercent = 100;
                } else if (activeFloat <= idx) {
                  fillPercent = 0;
                } else {
                  fillPercent = (activeFloat - idx) * 100;
                }

                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    className="flex-1 h-2 bg-slate-200/90 rounded-full overflow-hidden cursor-pointer hover:bg-slate-300 transition-colors relative"
                    title={`Go to ${cert.title}`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-75"
                      style={{
                        width: `${fillPercent}%`,
                        background: cert.accentColor,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Dynamic Scroll Status Message */}
            <div className="flex items-center justify-center w-full">
              {scrollProgress < 0.94 ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white/80 backdrop-blur-md px-4 py-1 rounded-full border border-slate-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
                  <span>
                    Scroll to advance ({currentIndex + 1} of {totalCards}) · Glides Left ↔ Right
                  </span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#0284C7] animate-bounce" />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-4 py-1 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>All 5 Credentials Completed · Continue scrolling to next section ↓</span>
                </div>
              )}
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
      </div>
    </section>
  );
}

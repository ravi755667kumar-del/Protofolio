import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { triggerTornPaperReveal } from '../utils/tornPaperTrigger';

const SECTIONS = [
  { id: 'home', name: 'Home', num: '01', nextLabel: 'Explore About', title: 'WELCOME TO AI HUB' },
  { id: 'about', name: 'About', num: '02', nextLabel: 'My Experience', title: 'ABOUT THE DEVELOPER' },
  { id: 'experience', name: 'Journey', num: '03', nextLabel: 'My Skills', title: 'EXPERIENCE & EDUCATION' },
  { id: 'skills', name: 'Skills', num: '04', nextLabel: 'Featured Projects', title: 'TECHNICAL REPERTOIRE' },
  { id: 'projects', name: 'Projects', num: '05', nextLabel: 'Certifications', title: 'FEATURED PROJECTS' },
  { id: 'certifications', name: 'Certs', num: '06', nextLabel: 'Get In Touch', title: 'CREDENTIALS & CERTS' },
  { id: 'contact', name: 'Contact', num: '07', nextLabel: 'Back to Top', title: 'GET IN TOUCH' },
];

export default function PageScrollNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredDot, setHoveredDot] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Navigate to a section using the Torn Paper Reveal transition
  const navigateToSection = useCallback((targetIndex) => {
    if (isTransitioningRef.current) return;
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;

    isTransitioningRef.current = true;
    const targetSec = SECTIONS[targetIndex];

    setActiveIndex(targetIndex);
    activeIndexRef.current = targetIndex;

    triggerTornPaperReveal(targetSec.id, targetSec.title || targetSec.name);

    // Release transitioning lock after torn paper animation completes
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1000);
  }, []);

  // Mouse wheel, touch swipe, and keyboard listeners to trigger torn paper transition
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e) => {
      // Do not hijack scroll if inside forms
      if (e.target.closest('input, textarea, select')) return;

      // If already playing transition, prevent browser scroll jitter
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // Delta threshold to ignore slight touchpad resting tremors
      if (Math.abs(e.deltaY) < 22) return;

      const currentSec = SECTIONS[activeIndexRef.current];
      const el = currentSec ? document.getElementById(currentSec.id) : null;

      if (e.deltaY > 0) {
        // MOUSE SCROLL DOWN
        if (activeIndexRef.current < SECTIONS.length - 1) {
          if (el) {
            const sectionBottom = el.offsetTop + el.offsetHeight;
            const viewportBottom = window.scrollY + window.innerHeight;
            // Check if user has scrolled to the complete bottom of this section
            const isAtSectionBottom = viewportBottom >= sectionBottom - 25;

            if (!isAtSectionBottom) {
              // Section is not yet complete! Allow natural scrolling down so user can view all content
              return;
            }
          }

          // Section IS COMPLETE! Tear open and reveal next section
          e.preventDefault();
          navigateToSection(activeIndexRef.current + 1);
        }
      } else if (e.deltaY < 0) {
        // MOUSE SCROLL UP
        if (activeIndexRef.current > 0) {
          if (el) {
            const sectionTop = el.offsetTop;
            // Check if user has scrolled back up to the top of this section
            const isAtSectionTop = window.scrollY <= sectionTop + 25;

            if (!isAtSectionTop) {
              // Section is not yet at top! Allow natural scrolling up
              return;
            }
          }

          // At top of section! Tear open and reveal previous section
          e.preventDefault();
          navigateToSection(activeIndexRef.current - 1);
        }
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current) return;
      if (e.target.closest('input, textarea, select')) return;
      if (!e.changedTouches || !e.changedTouches[0]) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      // Minimum swipe distance threshold
      if (Math.abs(diff) < 50) return;

      const currentSec = SECTIONS[activeIndexRef.current];
      const el = currentSec ? document.getElementById(currentSec.id) : null;

      if (diff > 0 && activeIndexRef.current < SECTIONS.length - 1) {
        // Swiped UP -> Scroll down
        if (el) {
          const sectionBottom = el.offsetTop + el.offsetHeight;
          const viewportBottom = window.scrollY + window.innerHeight;
          if (viewportBottom < sectionBottom - 25) {
            // Not complete yet, allow touch scroll
            return;
          }
        }
        navigateToSection(activeIndexRef.current + 1);
      } else if (diff < 0 && activeIndexRef.current > 0) {
        // Swiped DOWN -> Scroll up
        if (el) {
          const sectionTop = el.offsetTop;
          if (window.scrollY > sectionTop + 25) {
            return;
          }
        }
        navigateToSection(activeIndexRef.current - 1);
      }
    };

    const handleKeyDown = (e) => {
      if (e.target.closest('input, textarea, select')) return;
      if (isTransitioningRef.current) return;

      const currentSec = SECTIONS[activeIndexRef.current];
      const el = currentSec ? document.getElementById(currentSec.id) : null;

      if (['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)) {
        if (activeIndexRef.current < SECTIONS.length - 1) {
          if (el) {
            const sectionBottom = el.offsetTop + el.offsetHeight;
            const viewportBottom = window.scrollY + window.innerHeight;
            if (viewportBottom < sectionBottom - 25) {
              return;
            }
          }
          e.preventDefault();
          navigateToSection(activeIndexRef.current + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) {
        if (activeIndexRef.current > 0) {
          if (el) {
            const sectionTop = el.offsetTop;
            if (window.scrollY > sectionTop + 25) {
              return;
            }
          }
          e.preventDefault();
          navigateToSection(activeIndexRef.current - 1);
        }
      }
    };

    // Passive false is required to prevent native choppy scroll during torn paper rip
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateToSection]);

  // Keep active index in sync with manual scrolling if user drags scrollbar
  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioningRef.current) return;
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveIndex(i);
          activeIndexRef.current = i;
          break;
        }
      }

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      setIsVisible(!isBottom || activeIndexRef.current === SECTIONS.length - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to custom trigger events from Navbar, Hero, etc.
  useEffect(() => {
    const handleCustomTrigger = (e) => {
      const { targetId } = e.detail || {};
      const targetIdx = SECTIONS.findIndex((s) => s.id === targetId);
      if (targetIdx !== -1) {
        setActiveIndex(targetIdx);
        activeIndexRef.current = targetIdx;
        isTransitioningRef.current = true;
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 1000);
      }
    };

    window.addEventListener('trigger-torn-paper', handleCustomTrigger);
    return () => window.removeEventListener('trigger-torn-paper', handleCustomTrigger);
  }, []);

  const handleNextPage = () => {
    if (activeIndex < SECTIONS.length - 1) {
      navigateToSection(activeIndex + 1);
    } else {
      navigateToSection(0);
    }
  };

  const handleDotClick = (sec, idx) => {
    navigateToSection(idx);
  };

  const currentSection = SECTIONS[activeIndex] || SECTIONS[0];
  const isLastSection = activeIndex === SECTIONS.length - 1;

  return (
    <>
      {/* ========================================================
          1. RIGHT SIDE VERTICAL PAGE PAGINATION (Tailwind CSS)
          ======================================================== */}
      <aside
        aria-label="Page navigation"
        className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 p-2 rounded-full bg-[#030d1d]/80 border border-cyan-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl select-none"
      >
        {/* Page counter pill */}
        <div className="text-[9px] font-mono font-bold text-cyan-300 pb-1 border-b border-white/10 hidden sm:block">
          {currentSection.num}
        </div>

        {/* 7 Page Dots */}
        {SECTIONS.map((sec, idx) => {
          const isActive = activeIndex === idx;
          const isHovered = hoveredDot === idx;

          return (
            <div key={sec.id} className="relative flex items-center justify-center">
              {/* Tooltip on left */}
              {(isHovered || (isActive && hoveredDot === null)) && (
                <div className="absolute right-7 px-2.5 py-1 rounded-lg bg-[#071a33]/95 border border-cyan-500/40 text-cyan-200 text-[10px] font-mono font-semibold whitespace-nowrap shadow-xl pointer-events-none transition-all duration-200 animate-fade-in hidden sm:flex items-center gap-1.5">
                  <span className="text-[8px] text-slate-400">{sec.num}</span>
                  <span>{sec.name}</span>
                </div>
              )}

              {/* Navigation Dot Button */}
              <button
                onClick={() => handleDotClick(sec, idx)}
                onMouseEnter={() => setHoveredDot(idx)}
                onMouseLeave={() => setHoveredDot(null)}
                aria-label={`Scroll to ${sec.name} page`}
                className={`relative flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-3 h-7 bg-gradient-to-b from-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(6,182,212,0.9)] ring-2 ring-cyan-400/40'
                    : 'w-2.5 h-2.5 bg-slate-600/80 hover:bg-cyan-400/70 hover:scale-125'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-40" />
                )}
              </button>
            </div>
          );
        })}

        {/* Total pages label */}
        <div className="text-[8px] font-mono text-slate-500 pt-1 border-t border-white/10 hidden sm:block">
          07
        </div>
      </aside>

      {/* ========================================================
          2. FLOATING NEXT PAGE BUTTON (Bottom Center)
          ======================================================== */}
      {isVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={handleNextPage}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#041327]/90 via-[#071e3d]/90 to-[#041327]/90 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-xl text-white text-xs font-medium tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            title={isLastSection ? 'Scroll back to Home' : `Scroll to ${currentSection.nextLabel}`}
          >
            <span className="text-[10px] font-mono text-cyan-300">
              Page {currentSection.num} / 07
            </span>
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span className="text-slate-200 group-hover:text-white transition-colors">
              {currentSection.nextLabel}
            </span>
            {isLastSection ? (
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform animate-bounce" />
            )}
          </button>
        </div>
      )}
    </>
  );
}

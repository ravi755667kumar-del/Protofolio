import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { triggerTornPaperReveal } from '../utils/tornPaperTrigger';

const SECTIONS = [
  { id: 'home', name: 'Home', num: '01', nextLabel: 'Explore About', title: 'WELCOME TO AI HUB' },
  { id: 'about', name: 'About', num: '02', nextLabel: 'My Experience', title: 'ABOUT THE DEVELOPER' },
  { id: 'experience', name: 'Journey', num: '03', nextLabel: 'My Skills', title: 'EXPERIENCE & EDUCATION' },
  { id: 'skills', name: 'Skills', num: '04', nextLabel: 'Featured Projects', title: 'TECHNICAL REPERTOIRE' },
  { id: 'projects', name: 'Projects', num: '05', nextLabel: 'Certifications', title: 'FEATURED PROJECTS' },
  { id: 'certifications', name: 'Certs', num: '06', nextLabel: 'Back to Top', title: 'CREDENTIALS & CERTS' },
];

export default function PageScrollNav() {
  const [activeIndex, setActiveIndex] = useState(0);
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
    const currentSec = SECTIONS[activeIndexRef.current];
    const targetSec = SECTIONS[targetIndex];

    setActiveIndex(targetIndex);
    activeIndexRef.current = targetIndex;

    triggerTornPaperReveal(targetSec.id, targetSec.title || targetSec.name, currentSec?.id);

    // Release transitioning lock after torn paper animation completes
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1400);
  }, []);

  // Mouse wheel, touch swipe, and keyboard listeners
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e) => {
      if (e.target.closest('input, textarea, select')) return;
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 22) return;

      const currentSec = SECTIONS[activeIndexRef.current];
      const el = currentSec ? document.getElementById(currentSec.id) : null;

      if (e.deltaY > 0) {
        if (activeIndexRef.current < SECTIONS.length - 1) {
          if (el) {
            const sectionBottom = el.offsetTop + el.offsetHeight;
            const viewportBottom = window.scrollY + window.innerHeight;
            const isAtSectionBottom = viewportBottom >= sectionBottom - 25;
            if (!isAtSectionBottom) return;
          }
          e.preventDefault();
          navigateToSection(activeIndexRef.current + 1);
        } else if (activeIndexRef.current === SECTIONS.length - 1) {
          if (el) {
            const sectionBottom = el.offsetTop + el.offsetHeight;
            const viewportBottom = window.scrollY + window.innerHeight;
            const isAtSectionBottom = viewportBottom >= sectionBottom - 25;
            if (!isAtSectionBottom) return;
          }
          const isAtPageEnd =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 60;
          if (!isAtPageEnd) return;
          e.preventDefault();
          navigateToSection(0);
        }
      } else if (e.deltaY < 0) {
        if (activeIndexRef.current > 0) {
          if (el) {
            const sectionTop = el.offsetTop;
            const isAtSectionTop = window.scrollY <= sectionTop + 25;
            if (!isAtSectionTop) return;
          }
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
      if (Math.abs(diff) < 50) return;

      const currentSec = SECTIONS[activeIndexRef.current];
      const el = currentSec ? document.getElementById(currentSec.id) : null;

      if (diff > 0) {
        if (activeIndexRef.current < SECTIONS.length - 1) {
          if (el) {
            const sectionBottom = el.offsetTop + el.offsetHeight;
            const viewportBottom = window.scrollY + window.innerHeight;
            if (viewportBottom < sectionBottom - 25) return;
          }
          navigateToSection(activeIndexRef.current + 1);
        } else if (activeIndexRef.current === SECTIONS.length - 1) {
          if (el) {
            const sectionBottom = el.offsetTop + el.offsetHeight;
            const viewportBottom = window.scrollY + window.innerHeight;
            if (viewportBottom < sectionBottom - 25) return;
          }
          const isAtPageEnd =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 60;
          if (!isAtPageEnd) return;
          navigateToSection(0);
        }
      } else if (diff < 0 && activeIndexRef.current > 0) {
        if (el) {
          const sectionTop = el.offsetTop;
          if (window.scrollY > sectionTop + 25) return;
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
            if (viewportBottom < sectionBottom - 25) return;
          }
          e.preventDefault();
          navigateToSection(activeIndexRef.current + 1);
        } else if (activeIndexRef.current === SECTIONS.length - 1) {
          if (el) {
            const sectionBottom = el.offsetTop + el.offsetHeight;
            const viewportBottom = window.scrollY + window.innerHeight;
            if (viewportBottom < sectionBottom - 25) return;
          }
          const isAtPageEnd =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 60;
          if (!isAtPageEnd) return;
          e.preventDefault();
          navigateToSection(0);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) {
        if (activeIndexRef.current > 0) {
          if (el) {
            const sectionTop = el.offsetTop;
            if (window.scrollY > sectionTop + 25) return;
          }
          e.preventDefault();
          navigateToSection(activeIndexRef.current - 1);
        }
      }
    };

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

  // Keep active index in sync with manual scrolling
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

  // Listen to custom trigger events
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
        }, 1200);
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

  const currentSection = SECTIONS[activeIndex] || SECTIONS[0];
  const isLastSection = activeIndex === SECTIONS.length - 1;

  return (
    <>
      {/* ========================================================
          FLOATING NEXT PAGE BUTTON (Bottom Center - Light Theme)
          ======================================================== */}
      {isVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={handleNextPage}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-slate-200/90 hover:border-[#0284C7] shadow-[0_10px_25px_rgba(15,23,42,0.1)] backdrop-blur-xl text-slate-800 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[0_0_20px_rgba(2,132,199,0.25)]"
            title={isLastSection ? 'Scroll back to Home' : `Scroll to ${currentSection.nextLabel}`}
          >
            <span className="text-[10px] font-mono text-[#0284C7] font-bold">
              Page {currentSection.num} / 06
            </span>
            <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
            <span className="text-slate-700 group-hover:text-slate-900 transition-colors">
              {currentSection.nextLabel}
            </span>
            {isLastSection ? (
              <ArrowUp className="w-3.5 h-3.5 text-[#0284C7] group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#0284C7] group-hover:translate-y-0.5 transition-transform animate-bounce" />
            )}
          </button>
        </div>
      )}
    </>
  );
}

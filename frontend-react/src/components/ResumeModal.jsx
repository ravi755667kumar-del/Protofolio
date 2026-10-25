import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Download, FileText } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose, originPos }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const windowRef = useRef(null);
  const backdropRef = useRef(null);
  const iframeRef = useRef(null);

  // Calculate the vector from the window center to the clicked trigger button
  const getOriginVectors = useCallback(() => {
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const winH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const targetX = originPos?.x ?? winW * 0.88;
    const targetY = originPos?.y ?? 36;
    const deltaX = targetX - winW / 2;
    const deltaY = targetY - winH / 2;
    const skewDirection = deltaX >= 0 ? 1 : -1;
    return { deltaX, deltaY, skewDirection };
  }, [originPos]);

  // macOS Genie Unfold Animation (emerging from trigger button)
  const playGenieOpen = useCallback(() => {
    if (!windowRef.current || !backdropRef.current) return;
    const { deltaX, deltaY, skewDirection } = getOriginVectors();

    gsap.killTweensOf([windowRef.current, backdropRef.current]);

    // Backdrop fades in
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: 'power2.out' }
    );

    // Iconic macOS Genie stretch & billowing entrance
    const tl = gsap.timeline();

    tl.fromTo(
      windowRef.current,
      {
        opacity: 0,
        x: deltaX,
        y: deltaY,
        scaleX: 0.03,
        scaleY: 0.03,
        skewX: 28 * skewDirection,
        clipPath: 'polygon(46% 0%, 54% 0%, 54% 2%, 46% 2%)',
        transformOrigin: 'top center',
      },
      {
        opacity: 0.92,
        x: deltaX * 0.48,
        y: deltaY * 0.42,
        scaleX: 0.36,
        scaleY: 0.25,
        skewX: 18 * skewDirection,
        clipPath: 'polygon(24% 0%, 76% 0%, 96% 55%, 14% 55%)',
        duration: 0.22,
        ease: 'power2.in',
      }
    )
      .to(windowRef.current, {
        opacity: 1,
        x: deltaX * 0.1,
        y: deltaY * 0.08,
        scaleX: 0.88,
        scaleY: 0.82,
        skewX: 6 * skewDirection,
        clipPath: 'polygon(8% 0%, 92% 0%, 100% 92%, 0% 92%)',
        duration: 0.16,
        ease: 'power2.out',
      })
      .to(windowRef.current, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.2,
        ease: 'back.out(1.2)',
        clearProps: 'clipPath,skewX,transform',
      });
  }, [getOriginVectors]);

  // macOS Genie Vacuum Suck Animation (sucking back into trigger button)
  const playGenieClose = useCallback((onComplete) => {
    if (!windowRef.current || !backdropRef.current) {
      onComplete?.();
      return;
    }
    const { deltaX, deltaY, skewDirection } = getOriginVectors();

    gsap.killTweensOf([windowRef.current, backdropRef.current]);

    // Backdrop fades out
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.42,
      ease: 'power2.inOut',
    });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to(windowRef.current, {
      x: deltaX * 0.12,
      y: deltaY * 0.1,
      scaleX: 0.85,
      scaleY: 0.8,
      skewX: 8 * skewDirection,
      clipPath: 'polygon(10% 0%, 90% 0%, 100% 90%, 0% 90%)',
      duration: 0.15,
      ease: 'power2.in',
    })
      .to(windowRef.current, {
        opacity: 0.9,
        x: deltaX * 0.52,
        y: deltaY * 0.48,
        scaleX: 0.32,
        scaleY: 0.2,
        skewX: 20 * skewDirection,
        clipPath: 'polygon(28% 0%, 72% 0%, 94% 48%, 16% 48%)',
        duration: 0.16,
        ease: 'power2.in',
      })
      .to(windowRef.current, {
        opacity: 0,
        x: deltaX,
        y: deltaY,
        scaleX: 0.02,
        scaleY: 0.02,
        skewX: 30 * skewDirection,
        clipPath: 'polygon(48% 0%, 52% 0%, 52% 1%, 48% 1%)',
        duration: 0.14,
        ease: 'power3.in',
      });
  }, [getOriginVectors]);

  // Controlled close with Genie suck animation
  const handleGenieClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    playGenieClose(() => {
      setIsClosing(false);
      onClose();
    });
  }, [isClosing, playGenieClose, onClose]);

  // Lock body scroll and trigger Genie open on mount
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      playGenieOpen();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, playGenieOpen]);

  // Keyboard shortcut listener (Escape to suck window back into button)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || isClosing) return;
      if (e.key === 'Escape') {
        if (isMaximized) {
          setIsMaximized(false);
        } else {
          handleGenieClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing, isMaximized, handleGenieClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 select-none">
      {/* Frosted Glass Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={handleGenieClose}
        title="Click to close"
      />

      {/* ========================================================
          macOS PREVIEW WINDOW (WITH GENIE EFFECT)
          ======================================================== */}
      <div
        ref={windowRef}
        className={`relative flex flex-col rounded-2xl bg-[#ECECEC] dark:bg-[#1E1E1E] border border-slate-300/80 shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden transition-[width,height,inset] duration-300 z-10 ${
          isMaximized
            ? 'fixed inset-2 sm:inset-4 w-[calc(100vw-16px)] sm:w-[calc(100vw-32px)] h-[calc(100vh-16px)] sm:h-[calc(100vh-32px)] max-w-none max-h-none'
            : 'w-full max-w-5xl h-[88vh] max-h-[860px]'
        }`}
      >
        {/* ========================================================
            macOS TITLE BAR & WINDOW CONTROLS
            ======================================================== */}
        <div className="h-11 sm:h-12 bg-gradient-to-b from-[#F6F6F6] to-[#EAEAEA] border-b border-[#D4D4D8] px-3 sm:px-4 flex items-center justify-between select-none shrink-0">
          
          {/* Left: macOS Iconic Traffic Lights */}
          <div className="flex items-center gap-2 group/lights">
            {/* Close Button (Red) - Triggers Genie Suck into button */}
            <button
              type="button"
              onClick={handleGenieClose}
              title="Close with Genie Effect (Esc)"
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-[8px] text-red-950 font-bold transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <span className="opacity-0 group-hover/lights:opacity-100 transition-opacity leading-none">
                ✕
              </span>
            </button>

            {/* Minimize Button (Yellow) - Iconic macOS Genie Minimize */}
            <button
              type="button"
              onClick={handleGenieClose}
              title="Minimize with Genie Effect"
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-[8px] text-amber-950 font-bold transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <span className="opacity-0 group-hover/lights:opacity-100 transition-opacity leading-none">
                –
              </span>
            </button>

            {/* Maximize / Fullscreen Button (Green) */}
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              title={isMaximized ? 'Exit Full Screen' : 'Full Screen'}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-[7px] text-emerald-950 font-bold transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <span className="opacity-0 group-hover/lights:opacity-100 transition-opacity leading-none">
                {isMaximized ? '⤡' : '⤢'}
              </span>
            </button>
          </div>

          {/* Center: Document Proxy Icon & Title (Badge Removed) */}
          <div className="flex items-center gap-2 max-w-[60%] truncate">
            <span className="text-base sm:text-lg">📄</span>
            <div className="text-center truncate">
              <span className="font-semibold text-xs sm:text-sm text-slate-800 truncate block">
                Ravi_Kumar_Resume.pdf
              </span>
            </div>
          </div>

          {/* Right: Window Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Direct Download Button */}
            <a
              href="/Ravi_Kumar_Resume.pdf"
              download="Ravi_Kumar_Resume.pdf"
              title="Download PDF file"
              className="px-2.5 sm:px-3 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </div>
        </div>

        {/* ========================================================
            macOS DOCUMENT CANVAS (PDF VIEWER)
            ======================================================== */}
        <div className="relative flex-1 w-full bg-[#525659] overflow-hidden flex flex-col items-center justify-center">
          {/* Native PDF Embedded Viewer via iframe */}
          <iframe
            ref={iframeRef}
            src="/Ravi_Kumar_Resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
            title="Ravi Kumar Resume"
            className="w-full h-full border-none shadow-2xl"
          />

          {/* Fallback Overlay if browser restricts iframe PDF */}
          <noscript>
            <div className="p-8 text-center text-white">
              <FileText className="w-12 h-12 mx-auto text-sky-400 mb-3" />
              <p className="text-sm font-semibold mb-4">
                Unable to render PDF inline on this device.
              </p>
              <a
                href="/Ravi_Kumar_Resume.pdf"
                download="Ravi_Kumar_Resume.pdf"
                className="px-5 py-2.5 rounded-xl bg-[#0284C7] text-white font-bold text-xs uppercase"
              >
                Download Resume PDF
              </a>
            </div>
          </noscript>
        </div>

        {/* ========================================================
            macOS BOTTOM STATUS BAR
            ======================================================== */}
        <div className="h-8 bg-[#E5E5E5] border-t border-[#D4D4D8] px-4 flex items-center justify-between text-[11px] font-mono text-slate-600 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="font-semibold text-slate-800">Ravi Kumar</span>
            <span className="text-slate-400">•</span>
            <span>AI Developer &amp; ML Engineer</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-500">PDF • Verified Resume</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <button
              type="button"
              onClick={handleGenieClose}
              className="text-[#0284C7] hover:underline font-semibold cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

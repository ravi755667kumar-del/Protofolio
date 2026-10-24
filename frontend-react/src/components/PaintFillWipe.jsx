import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PaintFillWipe() {
  const containerRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const splatRef = useRef(null);
  const wavePathRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline pinned or scrubbed over the transition zone between Hero and About
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Scale up the organic paint blobs and sweep across
      tl.to(
        blob1Ref.current,
        {
          scale: 2.8,
          rotation: 45,
          transformOrigin: 'top left',
          ease: 'power2.out',
        },
        0
      )
        .to(
          blob2Ref.current,
          {
            scale: 2.4,
            rotation: -30,
            transformOrigin: 'top right',
            ease: 'power2.out',
          },
          0.1
        )
        .to(
          blob3Ref.current,
          {
            scale: 3.2,
            transformOrigin: 'center center',
            ease: 'power1.inOut',
          },
          0.15
        )
        .to(
          splatRef.current,
          {
            opacity: 1,
            scale: 1.8,
            stagger: 0.05,
            ease: 'back.out(1.7)',
          },
          0.1
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          0.8
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative w-full h-[60px] md:h-[100px] z-30 overflow-hidden flex items-center justify-center"
    >
      {/* SVG Organic Wave Ribbon */}
      <svg
        className="w-full h-full preserve-3d"
        viewBox="0 0 1440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="paintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.85" />
          </linearGradient>
          <filter id="paintGlow" x="-10%" y="-10%" width="120%" height="130%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={wavePathRef}
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,280L1392,280C1344,280,1248,280,1152,280C1056,280,960,280,864,280C768,280,672,280,576,280C480,280,384,280,288,280C192,280,96,280,48,280L0,280Z"
          fill="url(#paintGrad)"
          filter="url(#paintGlow)"
        />
      </svg>

      {/* Floating Organic Blobs with scale: 0 initially */}
      <div
        ref={blob1Ref}
        style={{ transform: 'scale(0)' }}
        className="absolute -top-10 -left-10 w-72 h-72 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[#facc15]/30 blur-2xl pointer-events-none"
      />
      <div
        ref={blob2Ref}
        style={{ transform: 'scale(0)' }}
        className="absolute -top-5 right-10 w-80 h-80 rounded-[60%_40%_30%_70%/50%_60%_40%_50%] bg-cyan-400/25 blur-2xl pointer-events-none"
      />
      <div
        ref={blob3Ref}
        style={{ transform: 'scale(0)' }}
        className="absolute top-0 left-1/3 w-64 h-64 rounded-full bg-teal-400/20 blur-xl pointer-events-none"
      />

      {/* Paint Splatters */}
      <div ref={splatRef} className="absolute inset-0 opacity-0 pointer-events-none">
        <div className="absolute top-2 left-[15%] w-4 h-4 rounded-full bg-[#facc15]/80 blur-[1px]" />
        <div className="absolute top-8 left-[35%] w-6 h-6 rounded-full bg-cyan-400/70 blur-[1px]" />
        <div className="absolute top-4 right-[25%] w-5 h-5 rounded-full bg-[#facc15]/75 blur-[1px]" />
        <div className="absolute top-10 right-[10%] w-3 h-3 rounded-full bg-teal-300/80 blur-[1px]" />
      </div>
    </div>
  );
}

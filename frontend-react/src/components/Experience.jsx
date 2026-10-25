import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../data/expData';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-card-0', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.exp-card-1', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#020c1b] overflow-hidden border-t border-cyan-500/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
            <span>🚀</span>
            <span>My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Experience &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Practical industry immersion combined with rigorous academic training in AI and Data Science.
          </p>
        </div>

        {/* 2-Card Grid */}
        <div className="exp-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {experienceData.map((item, index) => (
            <div
              key={index}
              className={`exp-card-${index} p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c233c]/80 via-[#071728]/80 to-[#030d1a]/80 border border-cyan-500/20 shadow-xl backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/50 hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Corner Glow Accent */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ backgroundColor: item.accent }}
              />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-3xl p-3 rounded-xl bg-white/5 border border-white/10">
                    {item.icon}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 border border-white/10 text-cyan-300">
                    {item.period}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase mb-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {item.type}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <h4 className="text-sm font-semibold text-cyan-300/90 mb-4">
                  {item.company}
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {item.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-slate-300 border border-white/10 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

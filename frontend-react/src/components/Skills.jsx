import React from 'react';
import { marqueeRow1, marqueeRow2 } from '../data/skillsData';
import FloatingSkillBalls from './FloatingSkillBalls';

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-14 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] overflow-hidden border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold tracking-widest uppercase shadow-xs">
            <span>⚡</span>
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            My{' '}
            <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Comprehensive technical repertoire covering Machine Learning algorithms, backend infrastructure, and modern interfaces.
          </p>
        </div>

        {/* 27 3D Colorful Floating Skill Balls Arena */}
        <FloatingSkillBalls />
      </div>

      {/* Full-width Infinite Scrolling Marquee */}
      <div className="space-y-3 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden pt-1 pb-2">
        {/* Track 1: Left */}
        <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee gap-4 py-1 items-center">
            {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((chip, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold hover:border-[#0284C7] hover:scale-105 transition-all shadow-sm hover:shadow-md cursor-default mr-3"
              >
                <span>{chip.icon}</span>
                <span>{chip.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Right */}
        <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee-reverse gap-4 py-1 items-center">
            {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((chip, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold hover:border-[#0284C7] hover:scale-105 transition-all shadow-sm hover:shadow-md cursor-default mr-3"
              >
                <span>{chip.icon}</span>
                <span>{chip.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

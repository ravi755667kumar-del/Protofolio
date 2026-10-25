import React from 'react';
import { marqueeRow1, marqueeRow2 } from '../data/skillsData';
import FloatingSkillBalls from './FloatingSkillBalls';

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#040e1f] overflow-hidden border-t border-cyan-500/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-3 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
            <span>⚡</span>
            <span>Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            My{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Comprehensive technical repertoire covering Machine Learning algorithms, backend infrastructure, and modern interfaces.
          </p>
        </div>

        {/* 27 3D Colorful Floating Skill Balls Arena */}
        <FloatingSkillBalls />
      </div>

      {/* Full-width Infinite Scrolling Marquee directly under the skill balls (Zero Gap) */}
      <div className="space-y-2.5 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden pt-0 pb-2">
        {/* Track 1: Left */}
        <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="animate-marquee gap-4 py-1 items-center">
            {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((chip, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#07192e]/80 border border-cyan-500/20 text-white text-xs font-medium hover:border-cyan-400 hover:scale-105 transition-all shadow-md backdrop-blur-md cursor-default mr-3"
              >
                <span>{chip.icon}</span>
                <span>{chip.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Right */}
        <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="animate-marquee-reverse gap-4 py-1 items-center">
            {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((chip, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#081a2f]/80 border border-cyan-500/20 text-white text-xs font-medium hover:border-cyan-400 hover:scale-105 transition-all shadow-md backdrop-blur-md cursor-default mr-3"
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

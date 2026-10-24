import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories, marqueeRow1, marqueeRow2 } from '../data/skillsData';
import FloatingSkillBalls from './FloatingSkillBalls';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress bar widths on scroll
      gsap.from('.skill-bar-fill', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
        },
        width: '0%',
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.05,
      });

      // Stagger categories entrance
      gsap.from('.skill-cat-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#040e1f] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
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

        {/* 3D Rotating Skills Sphere of Color Balls */}
        <FloatingSkillBalls />

        {/* 3 Categories with Progress Bars */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="skill-cat-card p-6 rounded-2xl bg-gradient-to-br from-[#0c223a]/90 via-[#071629]/90 to-[#030d1a]/90 border border-cyan-500/20 shadow-xl backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
                <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">
                  {category.icon}
                </span>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, sIndex) => (
                  <div key={sIndex} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-cyan-400 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Track */}
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-[1px] border border-white/10">
                      <div
                        className="skill-bar-fill h-full rounded-full transition-all"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                          boxShadow: `0 0 10px ${skill.color}55`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width Infinite Scrolling Marquee */}
      <div className="space-y-4 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden py-2">
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

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Brain, Cpu, Database, Rocket } from 'lucide-react';
import IdCard from './IdCard';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT_CHIPS = [
  { icon: Brain, label: 'Deep Learning & CNNs' },
  { icon: Cpu, label: 'Generative AI & RAG' },
  { icon: Database, label: 'Data Science & Pipelines' },
  { icon: Rocket, label: 'Production Microservices' },
];

export default function About() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left-col', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
        },
        x: -25,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.about-id-col', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
        },
        y: 25,
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
      id="about"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] text-slate-800 overflow-hidden border-t border-slate-200/80"
    >
      {/* Ambient subtle light glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-200/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* ========================================================
           MAIN CONTAINER: Executive Light Theme
           ======================================================== */}
        <div className="rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Bio Narrative */}
            <div className="about-left-col lg:col-span-7 space-y-6">
              
              {/* Heading */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-mono font-bold tracking-widest uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>About The Developer</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Behind the <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent">AI &amp; Code</span>
                </h2>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Final-year B.Tech student in <strong className="text-slate-900 font-semibold">Artificial Intelligence &amp; Data Science</strong> at Grace College of Engineering with hands-on experience in deep learning, natural language processing, and generative AI.
                </p>
                <p>
                  Built a <strong className="text-[#0284C7] font-semibold">TensorFlow CNN brain tumor classifier</strong> for MRI scans, a <strong className="text-sky-600 font-semibold">RAG-powered conversational chatbot</strong>, an ML recommendation engine, and integrated production models into Django &amp; FastAPI web services. Seeking an entry-level AI Developer role to engineer practical, scalable AI solutions.
                </p>
              </div>

              {/* Core Engineering Focus Badges */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-2.5">
                  {HIGHLIGHT_CHIPS.map((chip, idx) => {
                    const Icon = chip.icon;
                    return (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-2xs hover:border-[#0284C7] hover:text-[#0284C7] transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>{chip.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: 3D HANGING LANYARD ID CARD */}
            <div className="about-id-col lg:col-span-5 flex justify-center items-center py-4">
              <IdCard />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

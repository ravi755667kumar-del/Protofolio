import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillIcons = [
  { label: 'Py', name: 'Python', bg: '#1e3a5f', text: '#38bdf8' },
  { label: 'TF', name: 'TensorFlow', bg: '#43281c', text: '#fb923c' },
  { label: 'Sk', name: 'Scikit-Learn', bg: '#1e293b', text: '#94a3b8' },
  { label: 'Dj', name: 'Django', bg: '#064e3b', text: '#34d399' },
  { label: 'FA', name: 'FastAPI', bg: '#042f2e', text: '#2dd4bf' },
  { label: 'Re', name: 'React', bg: '#082f49', text: '#38bdf8' },
  { label: 'Dk', name: 'Docker', bg: '#0c4a6e', text: '#60a5fa' },
  { label: 'SQL', name: 'SQL', bg: '#312e81', text: '#a78bfa' },
];

export default function About() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for photo
      gsap.from('.about-photo-col', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Entrance animation for middle & right columns
      gsap.from('.about-content-col', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Twinkle sparkle icons
      gsap.to('.sparkle-icon', {
        scale: 1.25,
        opacity: 1,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#040e20] text-slate-100 overflow-hidden"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main 3-Column Aesthetic Container (Matching Reference Layout) */}
        <div className="rounded-3xl bg-gradient-to-br from-[#08182b]/95 via-[#061424]/95 to-[#030d1a]/95 border border-cyan-500/20 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ========================================================
               LEFT COLUMN: ARCHED PORTRAIT WITH SPARKLES (MATCHING IMAGE)
               ======================================================== */}
            <div className="about-photo-col lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-[240px] sm:w-[280px]">
                {/* 4-Point Sparkle Stars around the arch */}
                <span className="sparkle-icon absolute -top-3 -right-2 text-2xl text-cyan-300 z-20 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                  ✦
                </span>
                <span className="sparkle-icon absolute top-12 -left-4 text-xl text-white z-20 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  ✦
                </span>
                <span className="sparkle-icon absolute bottom-16 -right-3 text-lg text-cyan-400 z-20 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                  ✦
                </span>

                {/* Arched Frame Container */}
                <div className="relative rounded-t-full rounded-b-3xl overflow-hidden border-2 border-cyan-400/40 bg-gradient-to-b from-cyan-600/30 to-[#0c223a] shadow-2xl p-2.5">
                  <div className="rounded-t-full rounded-b-2xl overflow-hidden h-[340px] sm:h-[390px] bg-[#071628] relative">
                    <img
                      src="/profile.jpg"
                      alt="Ravi Kumar"
                      className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-105 hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextSibling) {
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                    {/* Fallback avatar */}
                    <div className="hidden w-full h-full items-center justify-center bg-gradient-to-b from-[#0e3a5c] to-[#041020] text-cyan-300 font-black text-6xl">
                      RK
                    </div>

                    {/* Gradient Overlay at Bottom of Photo */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#040e20] via-[#040e20]/40 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Decorative Bottom Corner Sculpt Detail */}
                <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-2xl pointer-events-none" />
              </div>
            </div>

            {/* ========================================================
               MIDDLE COLUMN: BIO + EDUCATION + SKILLS
               ======================================================== */}
            <div className="about-content-col lg:col-span-4 space-y-7">
              {/* Friendly Speech Bubble / Badge */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/40 text-cyan-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
                  <span>Hello! 👋</span>
                </div>

                {/* Personal Intro Text */}
                <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed font-light">
                  My name is <strong className="text-white font-semibold">Ravi Kumar</strong>, an aspiring <strong className="text-cyan-300">AI Developer</strong> and Machine Learning Engineer currently pursuing my B.Tech at Grace College of Engineering. My strengths lie in predictive modeling, NLP pipelines, deep learning architectures, and building responsive full-stack applications with Python, TensorFlow, and Django. I'm eager to bring my analytical mindset and problem-solving skills to meaningful, collaborative tech projects.
                </p>
              </div>

              {/* EDUCATION Section */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-base tracking-wider uppercase">
                  <span>EDUCATION</span>
                  <span className="text-sm">✦</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    2023 – 2027: Grace College of Engineering
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 font-light">
                    Pursuing B.Tech in Artificial Intelligence &amp; Data Science (CGPA: 7.8/10).
                  </p>
                </div>
              </div>

              {/* SKILLS Section (Rounded Square Software Icon Grid) */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-base tracking-wider uppercase">
                  <span>SKILLS</span>
                  <span className="text-sm">✦</span>
                </div>

                {/* Software Icons Row (matching the Ps, Ai, Ae, etc. style) */}
                <div className="flex flex-wrap gap-2.5">
                  {skillIcons.map((skill, index) => (
                    <div
                      key={index}
                      title={skill.name}
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider shadow-md hover:scale-110 hover:-translate-y-1 transition-all duration-200 border border-white/10 cursor-default"
                      style={{
                        backgroundColor: skill.bg,
                        color: skill.text,
                      }}
                    >
                      {skill.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================
               RIGHT COLUMN: EXPERIENCE TIMELINE (MATCHING REFERENCE)
               ======================================================== */}
            <div className="about-content-col lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-lg tracking-wider uppercase border-b border-white/10 pb-3">
                <span>EXPERIENCE</span>
                <span className="text-sm text-cyan-300">✦</span>
              </div>

              <div className="space-y-6">
                {/* Experience Entry 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2 text-white font-bold text-sm tracking-wide">
                    <span className="text-cyan-400 mt-0.5">✦</span>
                    <div>
                      <span>10/2024 – 11/2024: Matt Engineering Solution</span>
                      <p className="text-xs text-cyan-300/90 font-medium">
                        AI/ML Intern — Machine Learning &amp; Backend
                      </p>
                    </div>
                  </div>
                  <div className="pl-5 text-xs text-slate-300 space-y-1.5 font-light leading-relaxed">
                    <p>
                      <strong>Role:</strong> Data preprocessing, regression/classification model building, and Django backend integration for ML features.
                    </p>
                    <p className="text-cyan-200/90 font-mono text-[11px]">
                      Key outcome: Production pipelines with sub-30ms latency and robust accuracy.
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Applied core Machine Learning algorithms directly to real-world datasets and collaborated with senior engineering mentors.
                    </p>
                  </div>
                </div>

                {/* Experience Entry 2 */}
                <div className="space-y-1.5 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2 text-white font-bold text-sm tracking-wide">
                    <span className="text-cyan-400 mt-0.5">✦</span>
                    <div>
                      <span>2023 – Present: AI &amp; Web Development</span>
                      <p className="text-xs text-cyan-300/90 font-medium">
                        Student Researcher &amp; Project Builder
                      </p>
                    </div>
                  </div>
                  <div className="pl-5 text-xs text-slate-300 space-y-1.5 font-light leading-relaxed">
                    <p>
                      Specializing in predictive systems, sentiment classification, and modern interactive web apps.
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Built 8+ end-to-end applications including Movie Recommenders, House Price Prediction, and Interactive Dashboards.
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Fast learner adaptable to different project requirements, algorithms, and tech stacks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

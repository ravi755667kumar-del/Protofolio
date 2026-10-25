import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Sparkles, Send, Phone } from 'lucide-react';
import IdCard from './IdCard';
import { triggerTornPaperReveal } from '../utils/tornPaperTrigger';

gsap.registerPlugin(ScrollTrigger);

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.95 0-1.72.78-1.72 1.73s.77 1.73 1.72 1.73 1.73-.78 1.73-1.73-.78-1.73-1.73-1.73Z" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

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
      // Entrance animation for left column content
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

      // Entrance animation for ID card
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

      // Sub-cards entrance
      gsap.from('.about-sub-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
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
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#050914] text-slate-100 overflow-hidden border-t border-cyan-500/10"
    >
      {/* Ambient Cybernetic Corner Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 w-full">
        {/* ========================================================
           MAIN CONTAINER: MATCHING USER REFERENCE IMAGE
           (Behind the Visuals / ID Card with Rope & Let's Connect)
           ======================================================== */}
        <div className="rounded-[32px] bg-gradient-to-br from-[#0c1322]/95 via-[#080d19]/95 to-[#050812]/98 border border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* ========================================================
               LEFT COLUMN: "Behind the AI" + Bio + "Let's Connect" + Hire Pill
               ======================================================== */}
            <div className="about-left-col lg:col-span-7 space-y-6">
              
              {/* Heading */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>About The Developer</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Behind the <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">AI &amp; Code</span>
                </h2>
              </div>

              {/* Bio Paragraphs (Matching Exact Updated Resume) */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  Final-year B.Tech student in <strong className="text-white font-semibold">Artificial Intelligence &amp; Data Science</strong> at Grace College of Engineering with hands-on experience in deep learning, natural language processing, and generative AI.
                </p>
                <p>
                  Built a <strong className="text-cyan-300 font-semibold">TensorFlow CNN brain tumor classifier</strong> for MRI scans, a <strong className="text-rose-300 font-semibold">RAG-powered conversational chatbot</strong>, an ML recommendation engine, and integrated production models into Django &amp; FastAPI web services. Seeking an entry-level AI Developer role to engineer practical, scalable AI solutions.
                </p>
              </div>

              {/* "Let's Connect" Section (Matching Reference Layout) */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Let's Connect</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-300 font-mono">
                  {/* Email */}
                  <a
                    href="mailto:Ravikumar755667@gmail.com"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-rose-400/50 hover:bg-white/10 transition-all truncate group"
                  >
                    <Mail className="w-4 h-4 text-rose-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Ravikumar755667@gmail.com</span>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917464059133"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all truncate group"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">+91 7464059133</span>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 truncate">
                    <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span className="truncate">Tuticorin, Tamil Nadu 628005</span>
                  </div>

                  {/* GitHub */}
                  <a
                    href="https://github.com/ravi755667kumar-del"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all truncate group"
                  >
                    <GithubIcon className="w-4 h-4 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">github.com/ravi755667kumar-del</span>
                  </a>
                </div>
              </div>

              {/* Floating Hire Capsule Pill (Matching Bottom Pill in Reference Image) */}
              <div className="pt-2">
                <div className="inline-flex flex-wrap items-center justify-between gap-4 p-2.5 pr-3.5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95 border border-white/15 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    {/* Mini Avatar in Pill */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/60 bg-rose-500/20 flex-shrink-0">
                      <img
                        src="/homeimg-nobg.png"
                        alt="Ravi"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.src = '/profile.jpg';
                        }}
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900" />
                    </div>

                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                        Ravi is available for hire
                      </p>
                      <p className="text-[10px] font-mono text-emerald-400">
                        ● Open for AI/ML roles
                      </p>
                    </div>
                  </div>

                  {/* Hire Pill Button */}
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      triggerTornPaperReveal('contact', 'Get In Touch');
                    }}
                    className="px-5 py-2 rounded-xl bg-white hover:bg-rose-50 text-slate-900 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Hire Ravi</span>
                    <Send className="w-3 h-3 text-rose-500" />
                  </a>
                </div>
              </div>

            </div>

            {/* ========================================================
               RIGHT COLUMN: 3D HANGING LANYARD ID CARD WITH ROPE
               (Matching Exact Reference Image ID Card & Twisted Ribbon)
               ======================================================== */}
            <div className="about-id-col lg:col-span-5 flex justify-center items-center py-6">
              <IdCard />
            </div>

          </div>
        </div>

        {/* ========================================================
           LOWER SUB-GRID: EDUCATION, CORE SKILLS & EXPERIENCE
           ======================================================== */}
        <div className="about-sub-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. EDUCATION CARD */}
          <div className="about-sub-card rounded-2xl p-6 bg-gradient-to-br from-[#0c1626]/90 to-[#060c17]/90 border border-white/10 shadow-xl space-y-3 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xs tracking-widest uppercase">
              <span>✦</span>
              <span>EDUCATION</span>
            </div>
            <h4 className="text-base font-bold text-white">
              Grace College of Engineering
            </h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              B.Tech in Artificial Intelligence &amp; Data Science (2023 – 2027 Expected).
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
              CGPA: 7.85 / 10 (up to 7th Sem)
            </div>
          </div>

          {/* 2. TECHNICAL SKILLS SQUIRCLE BADGES */}
          <div className="about-sub-card rounded-2xl p-6 bg-gradient-to-br from-[#0c1626]/90 to-[#060c17]/90 border border-white/10 shadow-xl space-y-3 hover:border-rose-500/30 transition-all">
            <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs tracking-widest uppercase">
              <span>✦</span>
              <span>CORE TECH STACK</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {skillIcons.map((skill, index) => (
                <div
                  key={index}
                  title={skill.name}
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider shadow-md hover:scale-110 transition-transform border border-white/10 cursor-default"
                  style={{
                    backgroundColor: skill.bg,
                    color: skill.text,
                  }}
                >
                  {skill.label}
                </div>
              ))}
            </div>
            <p className="text-[11px] font-mono text-slate-400 pt-1">
              Python &bull; TensorFlow &bull; RAG &bull; LangChain &bull; FastAPI
            </p>
          </div>

          {/* 3. EXPERIENCE CARD */}
          <div className="about-sub-card rounded-2xl p-6 bg-gradient-to-br from-[#0c1626]/90 to-[#060c17]/90 border border-white/10 shadow-xl space-y-3 hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs tracking-widest uppercase">
              <span>✦</span>
              <span>WORK EXPERIENCE</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300 font-light">
              <div>
                <h5 className="font-bold text-white">AI for Sustainability Virtual Intern</h5>
                <p className="text-[11px] text-emerald-300 font-medium">1M1B, with IBM SkillsBuild &bull; Jul–Sep 2026</p>
              </div>
              <div className="pt-1 border-t border-white/10">
                <h5 className="font-bold text-white">AI Developer Intern</h5>
                <p className="text-[11px] text-amber-300 font-medium">Matt Engineering Solution &bull; 1 Month</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

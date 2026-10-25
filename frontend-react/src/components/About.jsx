import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Sparkles, Send, Phone, FileText } from 'lucide-react';
import { triggerOpenResume } from '../utils/openResume';
import IdCard from './IdCard';

gsap.registerPlugin(ScrollTrigger);

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const skillIcons = [
  { label: 'Py', name: 'Python', bg: '#0284c7', text: '#ffffff' },
  { label: 'TF', name: 'TensorFlow', bg: '#ea580c', text: '#ffffff' },
  { label: 'Sk', name: 'Scikit-Learn', bg: '#0f766e', text: '#ffffff' },
  { label: 'Dj', name: 'Django', bg: '#047857', text: '#ffffff' },
  { label: 'FA', name: 'FastAPI', bg: '#0d9488', text: '#ffffff' },
  { label: 'Re', name: 'React', bg: '#0284c7', text: '#ffffff' },
  { label: 'Dk', name: 'Docker', bg: '#2563eb', text: '#ffffff' },
  { label: 'SQL', name: 'SQL', bg: '#4f46e5', text: '#ffffff' },
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
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] text-slate-800 overflow-hidden border-t border-slate-200/80"
    >
      {/* Ambient subtle light glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-200/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 w-full relative z-10">
        {/* ========================================================
           MAIN CONTAINER: Executive Light Theme
           ======================================================== */}
        <div className="rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: Bio + Connect + Hire Pill */}
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

              {/* "Let's Connect" Section */}
              <div className="space-y-4 pt-3 border-t border-slate-200">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Let's Connect</span>
                  <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-700 font-mono">
                  {/* Email */}
                  <a
                    href="mailto:Ravikumar755667@gmail.com"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0284C7] hover:bg-sky-50/50 transition-all truncate group shadow-xs"
                  >
                    <Mail className="w-4 h-4 text-[#0284C7] flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Ravikumar755667@gmail.com</span>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917464059133"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all truncate group shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">+91 7464059133</span>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 truncate shadow-xs">
                    <MapPin className="w-4 h-4 text-[#0284C7] flex-shrink-0" />
                    <span className="truncate">Tuticorin, Tamil Nadu 628005</span>
                  </div>

                  {/* GitHub */}
                  <a
                    href="https://github.com/ravi755667kumar-del"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0284C7] hover:bg-sky-50/50 transition-all truncate group shadow-xs"
                  >
                    <GithubIcon className="w-4 h-4 text-[#0284C7] flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">github.com/ravi755667kumar-del</span>
                  </a>
                </div>
              </div>

              {/* Floating Hire Capsule Pill */}
              <div className="pt-2">
                <div className="inline-flex flex-wrap items-center justify-between gap-4 p-2.5 pr-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 bg-sky-100 flex-shrink-0">
                      <img
                        src="/homeimg-nobg.png"
                        alt="Ravi"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.src = '/profile.jpg';
                        }}
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                    </div>

                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        Ravi is available for hire
                      </p>
                      <p className="text-[10px] font-mono text-emerald-600 font-semibold">
                        ● Open for AI/ML roles
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Direct Email Hire Pill Button */}
                    <a
                      href="mailto:Ravikumar755667@gmail.com?subject=Job%20Opportunity%20for%20Ravi%20Kumar"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Hire Ravi</span>
                      <Send className="w-3 h-3 text-white" />
                    </a>

                    {/* Resume Modal Trigger with Genie Effect */}
                    <button
                      type="button"
                      onClick={(e) => triggerOpenResume(e)}
                      title="Preview Resume in macOS Window"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#0284C7] font-bold text-xs uppercase tracking-wider shadow-2xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>Resume</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: 3D HANGING LANYARD ID CARD */}
            <div className="about-id-col lg:col-span-5 flex justify-center items-center py-6">
              <IdCard />
            </div>

          </div>
        </div>

        {/* LOWER SUB-GRID: EDUCATION, CORE SKILLS & EXPERIENCE */}
        <div className="about-sub-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. EDUCATION CARD */}
          <div className="about-sub-card rounded-2xl p-6 bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-[#0284C7] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-[#0284C7] font-mono font-bold text-xs tracking-widest uppercase">
              <span>✦</span>
              <span>EDUCATION</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Grace College of Engineering
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              B.Tech in Artificial Intelligence &amp; Data Science (2023 – 2027 Expected).
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-sky-50 border border-sky-200 text-[#0284C7] font-mono text-xs font-bold">
              CGPA: 7.85 / 10 (up to 7th Sem)
            </div>
          </div>

          {/* 2. TECHNICAL SKILLS SQUIRCLE BADGES */}
          <div className="about-sub-card rounded-2xl p-6 bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-[#0284C7] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-[#0284C7] font-mono font-bold text-xs tracking-widest uppercase">
              <span>✦</span>
              <span>CORE TECH STACK</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {skillIcons.map((skill, index) => (
                <div
                  key={index}
                  title={skill.name}
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider shadow-sm hover:scale-110 transition-transform cursor-default"
                  style={{
                    backgroundColor: skill.bg,
                    color: skill.text,
                  }}
                >
                  {skill.label}
                </div>
              ))}
            </div>
            <p className="text-[11px] font-mono text-slate-500 pt-1">
              Python &bull; TensorFlow &bull; RAG &bull; LangChain &bull; FastAPI
            </p>
          </div>

          {/* 3. EXPERIENCE CARD */}
          <div className="about-sub-card rounded-2xl p-6 bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-[#0284C7] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-[#0284C7] font-mono font-bold text-xs tracking-widest uppercase">
              <span>✦</span>
              <span>WORK EXPERIENCE</span>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div>
                <h5 className="font-bold text-slate-900">AI for Sustainability Virtual Intern</h5>
                <p className="text-[11px] text-[#0284C7] font-medium">1M1B, with IBM SkillsBuild &bull; Jul–Sep 2026</p>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <h5 className="font-bold text-slate-900">AI Developer Intern</h5>
                <p className="text-[11px] text-teal-600 font-medium">Matt Engineering Solution &bull; 1 Month</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

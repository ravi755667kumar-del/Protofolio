import React from 'react';
import { triggerTornPaperReveal } from '../utils/tornPaperTrigger';
import { triggerOpenResume } from '../utils/openResume';

export default function Footer() {
  const scrollToTop = (e) => {
    e?.preventDefault();
    triggerTornPaperReveal('home', 'Welcome to AI Hub');
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-slate-100/90 border-t border-slate-200 text-slate-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <a
            href="#home"
            onClick={scrollToTop}
            className="flex items-center gap-2 group text-slate-900 font-extrabold tracking-wider text-lg cursor-pointer"
          >
            <span className="text-[#0284C7] group-hover:rotate-45 transition-transform duration-300 text-xl">
              ⬡
            </span>
            <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent font-black">
              Ravi Kumar
            </span>
          </a>
          <span className="hidden sm:inline text-slate-300">|</span>
          <p className="text-xs text-slate-500">
            © 2026 Ravi Kumar. Powered by React, Vite, Tailwind CSS &amp; GSAP.
          </p>
        </div>

        {/* Social Links & Back To Top */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://github.com/ravi755667kumar-del"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0284C7] transition-colors font-medium"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ravi-kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0284C7] transition-colors font-medium"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={(e) => triggerOpenResume(e)}
            className="hover:text-[#0284C7] transition-colors font-medium cursor-pointer"
          >
            Resume
          </button>
          <a
            href="mailto:Ravikumar755667@gmail.com"
            className="hover:text-[#0284C7] transition-colors font-medium"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-[#0284C7] text-slate-700 hover:text-[#0284C7] flex items-center justify-center transition-all ml-2 shadow-xs cursor-pointer"
            aria-label="Back to top"
            title="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

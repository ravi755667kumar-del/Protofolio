import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#010712] border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <a
            href="#home"
            className="flex items-center gap-2 group text-white font-extrabold tracking-wider text-lg"
          >
            <span className="text-cyan-400 group-hover:rotate-45 transition-transform duration-300 text-xl">
              ⬡
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent font-black">
              Ravi Kumar
            </span>
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <p className="text-xs text-slate-400">
            © 2026 Ravi Kumar. Powered by React, Vite, Tailwind CSS &amp; GSAP.
          </p>
        </div>

        {/* Social Links & Back To Top */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://github.com/ravi755667kumar-del"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ravi-kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:Ravikumar755667@gmail.com"
            className="hover:text-cyan-300 transition-colors"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-white flex items-center justify-center transition-all ml-2"
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

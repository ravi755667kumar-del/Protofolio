import React, { useState, useEffect } from 'react';
import { triggerTornPaperReveal } from '../utils/tornPaperTrigger';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certs', href: '#certifications' },
];

export default function Navbar({ onBackToIntro }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].href.substring(1));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    triggerTornPaperReveal(item.href.substring(1), item.name);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm shadow-slate-900/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}
          className="flex items-center gap-2 group text-slate-900 font-extrabold tracking-wider text-xl"
        >
          <span className="text-[#0284C7] group-hover:rotate-45 transition-transform duration-300 text-2xl">
            ⬡
          </span>
          <span className="bg-gradient-to-r from-[#0284C7] via-sky-600 to-teal-600 bg-clip-text text-transparent font-black tracking-tight">
            Portfolio
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/90 border border-slate-200/90 rounded-full px-4 py-1.5 backdrop-blur-md shadow-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0284C7] to-blue-600 text-white font-bold shadow-sm shadow-sky-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Ravi_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#0284C7] to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white shadow-sm shadow-sky-600/20 hover:scale-105 active:scale-95 transition-all"
          >
            Resume ↓
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 hover:text-slate-900 focus:outline-none p-2"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-6 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`block px-3 py-2 rounded-lg text-base font-semibold cursor-pointer ${
                activeSection === item.href.substring(1)
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2 space-y-2">
            <a
              href="/Ravi_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2.5 rounded-lg bg-gradient-to-r from-[#0284C7] to-teal-600 text-white font-medium"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { triggerTornPaperReveal } from '../utils/tornPaperTrigger';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certs', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
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
          ? 'py-3 bg-[#040c1a]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}
          className="flex items-center gap-2 group text-white font-extrabold tracking-wider text-xl"
        >
          <span className="text-cyan-400 group-hover:rotate-45 transition-transform duration-300 text-2xl">
            ⬡
          </span>
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent font-black tracking-tight">
            Portfolio
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Action Button & 3D Portal Return */}
        <div className="hidden md:flex items-center gap-3">
          {onBackToIntro && (
            <button
              onClick={onBackToIntro}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-lime-950/60 border border-lime-500/40 text-lime-300 hover:bg-lime-900/40 hover:border-lime-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-lime-500/20"
              title="Return to 3D Neural Cover"
            >
              <span>←</span>
              <span>3D Portal</span>
            </button>
          )}

          <a
            href="/Ravi_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            Resume ↓
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-400 hover:text-white focus:outline-none p-2"
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
        <div className="md:hidden bg-[#071326]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`block px-3 py-2 rounded-lg text-base font-medium cursor-pointer ${
                activeSection === item.href.substring(1)
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2 space-y-2">
            {onBackToIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBackToIntro();
                }}
                className="w-full text-center py-2.5 rounded-lg bg-lime-950/60 border border-lime-500/40 text-lime-300 font-medium"
              >
                ← Back to 3D Portal
              </button>
            )}
            <a
              href="/Ravi_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

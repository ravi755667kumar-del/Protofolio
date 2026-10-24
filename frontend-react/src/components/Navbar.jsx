import React, { useState, useEffect } from 'react';

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
                className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
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
            className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-sm hover:shadow-cyan-500/20"
          >
            <span>Resume</span>
            <span className="text-sm">↗</span>
          </a>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-cyan-400 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-cyan-400 transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-0.5 w-full bg-cyan-400 transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071326]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
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

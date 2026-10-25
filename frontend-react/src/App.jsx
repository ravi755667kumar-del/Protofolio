import React, { useState, useEffect } from 'react';
import Intro3D from './components/Intro3D';
import ScrollProgress from './components/ScrollProgress';
import PageScrollNav from './components/PageScrollNav';
import TornPaperReveal from './components/TornPaperReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ProjectsWave from './components/ProjectsWave';
import CertificationsOrbit from './components/CertificationsOrbit';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 });

  const handleEnterPortfolio = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // Global listener: Enables opening the macOS Resume Window with Genie Effect from ANY section
  useEffect(() => {
    const handleOpenResume = (e) => {
      if (e.detail?.origin) {
        setOriginPos(e.detail.origin);
      } else {
        setOriginPos({
          x: typeof window !== 'undefined' ? window.innerWidth * 0.88 : 1000,
          y: 36,
        });
      }
      setIsResumeOpen(true);
    };

    window.addEventListener('open-resume', handleOpenResume);
    return () => window.removeEventListener('open-resume', handleOpenResume);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-[#0284C7] selection:text-white">
      {!hasEntered ? (
        /* ========================================================
           FIRST PAGE: 3D CYBER NEURAL NETWORK & PORTAL COVER SCREEN
           ======================================================== */
        <div className="fixed inset-0 w-full h-full z-50 overflow-hidden">
          <Intro3D onEnterPortfolio={handleEnterPortfolio} />
        </div>
      ) : (
        /* ========================================================
           MAIN PORTFOLIO (OPENS AFTER ENTERING)
           ======================================================== */
        <div className="relative animate-in fade-in duration-700">
          {/* Scroll Progress Bar */}
          <ScrollProgress />

          {/* GSAP Torn Paper Reveal Transition */}
          <TornPaperReveal />

          {/* Floating Next-Page & Vertical Dot Navigation (Tailwind CSS) */}
          <PageScrollNav />

          {/* Floating Glassmorphic Navbar */}
          <Navbar />

          <main className="relative">
            {/* Section 1: Hero */}
            <Hero />

            {/* Section 2: About Me */}
            <About />

            {/* Section 3: Experience & Education */}
            <Experience />

            {/* Section 4: Skills & Marquee */}
            <Skills />

            {/* Section 5: Projects Horizontal Wave */}
            <ProjectsWave />

            {/* Section 6: Certifications Orbit Scene */}
            <CertificationsOrbit />
          </main>

          {/* Footer */}
          <Footer />

          {/* Global macOS Resume Window Modal (Accessible perfectly from ANY section) */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            originPos={originPos}
          />
        </div>
      )}
    </div>
  );
}

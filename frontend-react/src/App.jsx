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
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnterPortfolio = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToIntro = () => {
    setHasEntered(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-[#020b18] text-slate-100 selection:bg-lime-400 selection:text-black">
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

          {/* Floating Glassmorphic Navbar with Return-to-3D option */}
          <Navbar onBackToIntro={handleBackToIntro} />

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

            {/* Section 7: Contact Form & Info */}
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}

/* =============================================
   main.js  –  Single-page scroll interactions
   ============================================= */

// ── Page Transition System (Card Stack) ────────
// Exposed globally so scroll-snap can also trigger it
(function () {
  let running = false;

  const allSections = Array.from(document.querySelectorAll('section[id]'));

  // ── Core card-stack animation ──────────────────
  function pageTransition(targetId) {
    if (running) return;
    running = true;

    const targetSec = document.getElementById(targetId);
    if (!targetSec) { running = false; return; }

    let currentSec = null;
    allSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSec = sec;
      }
    });

    if (!currentSec || currentSec === targetSec) {
      if (window.globalLenis) {
        window.globalLenis.scrollTo(targetSec, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetSec.offsetTop, behavior: 'smooth' });
      }
      running = false;
      return;
    }

    const isForward = (allSections.indexOf(targetSec) > allSections.indexOf(currentSec));

    if (window.globalLenis) window.globalLenis.stop();

    const wrapper = document.createElement('div');
    wrapper.className = 'pt-card-stack-wrapper';
    wrapper.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;overflow:hidden;background:var(--bg-main,#050505);pointer-events:none;perspective:1200px;';

    const cloneCurrent = currentSec.cloneNode(true);
    const cloneTarget  = targetSec.cloneNode(true);

    cloneTarget.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.scramble-text,.skill-bar-fill').forEach(el => {
      el.classList.add('visible');
      el.style.cssText += ';opacity:1;transform:translate(0,0) scale(1);';
      if (el.classList.contains('skill-bar-fill') && el.dataset.width) el.style.width = el.dataset.width + '%';
      if (el.classList.contains('scramble-text') && el.dataset.html) el.innerHTML = el.dataset.html;
    });

    const cRect = currentSec.getBoundingClientRect();
    cloneCurrent.style.cssText = `position:absolute;top:${cRect.top}px;left:0;width:100%;height:${cRect.height}px;margin:0;transform-origin:center center;will-change:transform,opacity;`;
    cloneTarget.style.cssText  = `position:absolute;top:0;left:0;width:100%;height:${targetSec.offsetHeight}px;margin:0;transform-origin:center center;will-change:transform,opacity;`;

    wrapper.appendChild(cloneTarget);
    wrapper.appendChild(cloneCurrent);
    document.body.appendChild(wrapper);

    if (window.globalLenis) {
      window.globalLenis.scrollTo(targetSec, { immediate: true });
    } else {
      window.scrollTo(0, targetSec.offsetTop);
    }

    const animateFn = window.Motion ? window.Motion.animate : null;
    const dur  = 1.0;
    const ease = [0.22, 1, 0.36, 1];

    if (animateFn) {
      if (isForward) {
        animateFn(cloneCurrent, { scale:[1,0.88],    y:[0,-window.innerHeight*0.6], opacity:[1,0], rotateX:[0,5]  }, { duration:dur, easing:ease });
        animateFn(cloneTarget,  { scale:[0.94,1],    y:[window.innerHeight*0.1,0],  opacity:[0,1], rotateX:[-5,0] }, { duration:dur, easing:ease });
      } else {
        animateFn(cloneCurrent, { scale:[1,0.88],    y:[0,window.innerHeight*0.6],  opacity:[1,0], rotateX:[0,-5] }, { duration:dur, easing:ease });
        animateFn(cloneTarget,  { scale:[0.94,1],    y:[-window.innerHeight*0.1,0], opacity:[0,1], rotateX:[5,0]  }, { duration:dur, easing:ease });
      }
    } else {
      cloneCurrent.style.opacity = '0';
      cloneTarget.style.opacity  = '1';
    }

    setTimeout(() => {
      wrapper.remove();
      if (window.globalLenis) window.globalLenis.start();
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      running = false;
    }, dur * 1000 + 80);
  }

  // ── Expose globally ──────────────────────────────
  window.sitePageTransition  = pageTransition;
  window.getAllSections       = () => allSections;
  window.isTransitionRunning = () => running;

  // ── Nav-link / anchor clicks ─────────────────────
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"], a[data-section]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const hash = href.startsWith('#') ? href.slice(1) : link.dataset.section;
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    e.preventDefault();

    const hamburger    = document.getElementById('hamburger');
    const navLinksList = document.getElementById('navLinks');
    if (navLinksList && navLinksList.classList.contains('open')) {
      navLinksList.classList.remove('open');
      if (hamburger) hamburger.classList.remove('is-active');
    }

    pageTransition(hash);
  });

  // ── Boundary detection: is user at section edge? ─
  function findBestSectionIndex() {
    let bestIdx = 0, bestScore = -Infinity;
    allSections.forEach((sec, i) => {
      const rect    = sec.getBoundingClientRect();
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visible > bestScore) { bestScore = visible; bestIdx = i; }
    });
    return bestIdx;
  }

  // Returns true only when the user is at the scroll boundary of the current section
  // direction: +1 = scrolling down, -1 = scrolling up
  function isAtSectionBoundary(direction) {
    const EDGE_BUFFER = 6; // px tolerance for floating point
    if (direction > 0) {
      // At bottom of page? → ready to go to next section
      const atPageBottom = (window.scrollY + window.innerHeight) >= (document.documentElement.scrollHeight - EDGE_BUFFER);
      // Or: current section's bottom is at/above viewport bottom
      const bestIdx = findBestSectionIndex();
      const sec = allSections[bestIdx];
      const secBottom = sec.offsetTop + sec.offsetHeight;
      const viewBottom = window.scrollY + window.innerHeight;
      const atSecBottom = viewBottom >= (secBottom - EDGE_BUFFER);
      return atPageBottom || atSecBottom;
    } else {
      // At top of page? → ready to go to previous section
      const atPageTop = window.scrollY <= EDGE_BUFFER;
      // Or: current section's top is at/below viewport top
      const bestIdx = findBestSectionIndex();
      const sec = allSections[bestIdx];
      const atSecTop = window.scrollY <= (sec.offsetTop + EDGE_BUFFER);
      return atPageTop || atSecTop;
    }
  }

  // ── Wheel: allow normal scroll, intercept only at boundary ──
  let wheelBoundaryAccum = 0;
  let wheelBoundaryTimer = null;
  const BOUNDARY_WHEEL_THRESHOLD = 80; // extra delta needed at boundary to commit

  window.addEventListener('wheel', function (e) {
    // Let scroll pass through inside modals
    if (document.getElementById('certModal')?.classList.contains('open')) return;
    if (document.querySelector('.project-modal.active')) return;
    if (e.target.closest('.cert-modal-wrap, .modal-box')) return;

    // While a transition is playing, block ALL scroll
    if (window.isTransitionRunning()) {
      e.preventDefault();
      return;
    }

    const direction = e.deltaY > 0 ? 1 : -1;

    if (isAtSectionBoundary(direction)) {
      // We're at the edge — accumulate extra intentional scroll delta
      e.preventDefault();

      wheelBoundaryAccum += e.deltaY;
      clearTimeout(wheelBoundaryTimer);
      wheelBoundaryTimer = setTimeout(() => { wheelBoundaryAccum = 0; }, 400);

      if (Math.abs(wheelBoundaryAccum) >= BOUNDARY_WHEEL_THRESHOLD) {
        wheelBoundaryAccum = 0;
        const bestIdx = findBestSectionIndex();
        const nextIdx = Math.max(0, Math.min(allSections.length - 1, bestIdx + direction));
        if (nextIdx === bestIdx) return;
        pageTransition(allSections[nextIdx].id);
      }
    }
    // else: NOT at boundary → let native scroll flow naturally (don't preventDefault)
  }, { passive: false });

  // ── Touch: allow normal scroll, intercept only at boundary ──
  let touchStartY   = 0;
  let touchScrolled = false; // whether native scroll moved during touch

  window.addEventListener('touchstart', function (e) {
    touchStartY   = e.touches[0].clientY;
    touchScrolled = false;
  }, { passive: true });

  // Track whether native scroll actually moved (don't block touchmove)
  window.addEventListener('scroll', function () {
    touchScrolled = true;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    if (document.getElementById('certModal')?.classList.contains('open')) return;
    if (document.querySelector('.project-modal.active')) return;
    if (window.isTransitionRunning()) return;

    const deltaY    = touchStartY - e.changedTouches[0].clientY;
    const SWIPE_MIN = 50;
    if (Math.abs(deltaY) < SWIPE_MIN) return;

    const direction = deltaY > 0 ? 1 : -1;

    // Only trigger section transition when at the section boundary
    if (!isAtSectionBoundary(direction)) return;

    const bestIdx = findBestSectionIndex();
    const nextIdx = Math.max(0, Math.min(allSections.length - 1, bestIdx + direction));
    if (nextIdx === bestIdx) return;

    pageTransition(allSections[nextIdx].id);
  }, { passive: true });

})();



// ── Typewriter: cycle roles in hero subtitle ──
(function () {
  const roles = [
    'Full-Stack Developer',
    'AI / ML Engineer',
    'Creative Coder',
    'Problem Solver 🚀',
  ];
  const el = document.getElementById('heroSubtitle');
  if (!el) return;

  let roleIdx = 0, charIdx = 0, deleting = false;

  // inject cursor style
  const cs = document.createElement('style');
  cs.textContent = `
    .type-cursor {
      display: inline-block;
      width: 2px; height: 1.1em;
      background: #22d3ee;
      margin-left: 2px;
      vertical-align: middle;
      border-radius: 1px;
      animation: cursorBlink 0.75s step-end infinite;
    }
    @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
  `;
  document.head.appendChild(cs);

  function tick() {
    const current = roles[roleIdx];
    const cursor  = '<span class="type-cursor"></span>';

    if (!deleting) {
      charIdx++;
      el.innerHTML = current.slice(0, charIdx) + cursor;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);   // pause at full word
        return;
      }
    } else {
      charIdx--;
      el.innerHTML = current.slice(0, charIdx) + cursor;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
    }
    setTimeout(tick, deleting ? 55 : 90);
  }
  tick();
})();


// ── Scroll progress bar ───────────────────────
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', updateProgress, { passive: true });
function updateProgress() {
  const scrolled = window.scrollY;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrolled / total) * 100}%`;
}

// ── Navbar: scroll shrink + active link ──────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Shrink navbar
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}, { passive: true });

// (Smooth scroll for anchor links handled by page transition interceptor)

// Scroll hint click
document.querySelector('.scroll-hint')?.addEventListener('click', (e) => {
  e.preventDefault();
  // We can trigger the same page transition logic by simulating an anchor click,
  // or just let the global click handler catch it if it's an <a>.
  // Assuming it's an <a> with href="#about":
  const link = e.target.closest('a');
  if (link && link.getAttribute('href') === '#about') {
    // Interceptor will catch it
  } else {
    // Fallback if not caught
    const target = document.getElementById('about');
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  }
});

// ── Hamburger ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
  hamburger.classList.toggle('is-active');
});

// Inject mobile styles
const mStyle = document.createElement('style');
mStyle.textContent = `
  .nav-links.open {
    display: flex !important; flex-direction: column;
    position: fixed; top: 65px; left:0; right:0;
    background: rgba(10,10,15,0.97); backdrop-filter: blur(24px);
    padding: 1.5rem; border-bottom: 1px solid rgba(139,92,246,0.2);
    gap:0.4rem; z-index:999; animation: slideDownNav 0.3s ease;
  }
  @keyframes slideDownNav { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
  .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
  .hamburger span { display:block; width:24px; height:2px; background:var(--text-white); border-radius:2px; transition:all 0.3s ease; }
  .hamburger.is-active span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .hamburger.is-active span:nth-child(2){opacity:0}
  .hamburger.is-active span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
  @media(max-width:768px){ .nav-links{display:none} .hamburger{display:flex} }
`;
document.head.appendChild(mStyle);

// ── Scroll-reveal (all elements) ─────────────
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ── Skill bars animate on scroll ─────────────
const bars = document.querySelectorAll('.skill-bar-fill');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
bars.forEach(b => barObs.observe(b));

// ── Hero counter animation ────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = target / (2000 / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}
const heroObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      heroObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroSection = document.getElementById('home');
if (heroSection) heroObs.observe(heroSection);

// ── About stat counters ───────────────────────
function runCounter(el) {
  const target = parseInt(el.dataset.count);
  if (!target) return;
  let c = 0;
  const step = target / (1500 / 16);
  const t = setInterval(() => {
    c = Math.min(c + step, target);
    el.textContent = Math.floor(c) + '+';
    if (c >= target) clearInterval(t);
  }, 16);
}
const aboutObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.astat-num[data-count], .bio-stat-num[data-count], .ab-stat-num[data-count]').forEach(runCounter);
      aboutObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.about-stat-row, .bio-stat-row, .ab-bento').forEach(el => aboutObs.observe(el));

// ── QR code generator ────────────────────────
function generateQR() {
  const grid = document.getElementById('qrGrid');
  if (!grid) return;
  const pattern = [1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,1,0,1,0,1,1,1,0,0,1,0,0,1,0,1,1];
  grid.innerHTML = '';
  pattern.forEach(v => {
    const c = document.createElement('div');
    c.className = `qr-cell ${v ? 'filled' : 'empty'}`;
    grid.appendChild(c);
  });
}
generateQR();

// ── ID Card: swing animation ──────────────────
const cardWrapper = document.getElementById('cardWrapper');
cardWrapper?.addEventListener('click', () => {
  const sa = document.createElement('style');
  sa.textContent = `@keyframes bigSwing{0%{transform:rotate(0)}25%{transform:rotate(12deg)}50%{transform:rotate(-10deg)}75%{transform:rotate(6deg)}100%{transform:rotate(0)}}`;
  document.head.appendChild(sa);
  cardWrapper.style.animation = 'none';
  cardWrapper.offsetHeight;
  cardWrapper.style.animation = 'bigSwing 0.8s ease-in-out, swing 4s 0.9s ease-in-out infinite';
});

// ── ID Card: subtle mouse tilt ────────────────
const idCard = document.getElementById('idCard');
idCard?.addEventListener('mousemove', e => {
  const r = idCard.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
  const y = ((e.clientY - r.top)  / r.height - 0.5) * -8;
  idCard.querySelector('.id-card-inner').style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});
idCard?.addEventListener('mouseleave', () => {
  if (!idCard.matches(':hover')) {
    idCard.querySelector('.id-card-inner').style.transform = '';
  }
});

// ── Floating particles ────────────────────────
const particlesEl = document.getElementById('particles');
if (particlesEl) {
  const colors = ['#22d3ee','#38bdf8','#0ea5e9','#67e8f9','#0891b2'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    const sz = Math.random() * 4 + 2;
    p.className = 'particle';
    p.style.cssText = `left:${Math.random()*100}%;width:${sz}px;height:${sz}px;background:${colors[i%colors.length]};--dur:${Math.random()*10+8}s;--delay:${Math.random()*10}s;`;
    particlesEl.appendChild(p);
  }
}

// ── Contact form submit ───────────────────────
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = '⏳ Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    // Confetti
    const colors = ['#a78bfa','#ec4899','#0ea5e9','#10b981','#f59e0b'];
    for (let i = 0; i < 40; i++) {
      const d = document.createElement('div');
      const sz = Math.random() * 8 + 4;
      d.style.cssText = `position:fixed;width:${sz}px;height:${sz}px;background:${colors[i%colors.length]};border-radius:${Math.random()>0.5?'50%':'2px'};left:${Math.random()*100}vw;top:${Math.random()*40+30}vh;pointer-events:none;z-index:9999;animation:cfall ${Math.random()*1.5+1}s ease forwards;`;
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 2500);
    }
    const cs = document.createElement('style');
    cs.textContent = '@keyframes cfall{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(200px) rotate(360deg) scale(0.3)}}';
    document.head.appendChild(cs);
    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  }, 1500);
});

// ── Cursor glow ───────────────────────────────
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%);pointer-events:none;transform:translate(-50%,-50%);z-index:0;top:0;left:0;';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => { glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; }, { passive: true });
}

// ── Section entrance: stagger children ───────
// already handled by CSS --delay vars + IntersectionObserver

// ── Text Scramble Effect ─────────────────────
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    this.finalHtml = this.el.dataset.html || newText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble-dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.el.innerHTML = this.finalHtml;
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const scrambleEls = document.querySelectorAll('.scramble-text');
const scrambleObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const fx = new TextScramble(el);
      // Optional: Add a slight delay before it scrambles
      setTimeout(() => {
        fx.setText(el.dataset.text);
      }, 300);
      scrambleObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

scrambleEls.forEach(el => {
  // Init with blank or random chars if desired, but we let it start with its HTML content
  scrambleObs.observe(el);
  
  // also scramble on hover for fun
  el.addEventListener('mouseenter', () => {
    const fx = new TextScramble(el);
    fx.setText(el.dataset.text);
  });
});

// ── Interactive Sticky Card Stack & Lenis Smooth Scroll Engine ──
(function () {
  // 1. Initialize Lenis Smooth Scroll
  function initLenis() {
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        updateCardStack();
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Listen to scroll events from Lenis
      lenis.on('scroll', () => {
        updateCardStack();
      });

      // Support anchor smooth clicks with Lenis
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              lenis.scrollTo(targetEl, { offset: -60, duration: 1.4 });
            }
          }
        });
      });
    } else {
      // Fallback: load Lenis dynamically if not already present
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/lenis@1.1.18/dist/lenis.min.js';
      script.onload = () => {
        initLenis();
      };
      script.onerror = () => {
        // Fallback to RAF scroll listener if offline
        window.addEventListener('scroll', updateCardStack, { passive: true });
      };
      document.head.appendChild(script);
    }
  }

  // 2. Sticky Stack Scroll-Based Scaling Physics (Framer-Motion inspired)
  const stackCards = document.querySelectorAll('.stack-card');
  if (!stackCards.length) return;

  function updateCardStack() {
    const windowHeight = window.innerHeight;

    stackCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const nextCard = stackCards[i + 1];

      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        const stickyTop = parseInt(getComputedStyle(card).getPropertyValue('--card-top')) || 100;
        
        // Progress of how much nextCard has scrolled over this card (0 to 1)
        const overlapStart = windowHeight * 0.85;
        const overlapEnd = stickyTop + 80;
        const rawProgress = (overlapStart - nextRect.top) / (overlapStart - overlapEnd);
        const progress = Math.max(0, Math.min(1, rawProgress));

        // Exponential smooth ease curve (Framer-motion style)
        const eased = Math.pow(progress, 1.6);

        // Smooth scale: 1.0 down to ~0.90 based on stack index
        const scale = 1 - eased * 0.07 * (stackCards.length - i);
        // Dimming brightness to create true depth
        const brightness = 1 - eased * 0.28;
        // Subtle upward parallax shift
        const translateY = eased * -15;
        // Subtle 3D tilt
        const rotateX = eased * 2.5;

        card.style.transform = `perspective(1000px) scale(${scale}) translateY(${translateY}px) rotateX(${rotateX}deg)`;
        card.style.filter = `brightness(${brightness}) saturate(${1 - eased * 0.15})`;
        card.style.opacity = `${1 - eased * 0.15}`;
      } else {
        // Topmost/Last card retains full presence
        card.style.transform = 'perspective(1000px) scale(1) translateY(0px) rotateX(0deg)';
        card.style.filter = 'brightness(1) saturate(1)';
        card.style.opacity = '1';
      }
    });
  }

  // Initialize
  initLenis();
  window.addEventListener('scroll', updateCardStack, { passive: true });
  window.addEventListener('resize', updateCardStack);
  updateCardStack();
})();

// ── 3D DRAGGABLE CAROUSEL PHYSICS ──
(function() {
  const carousel = document.getElementById('carouselRing');
  const cards = document.querySelectorAll('.carousel-card');
  if (!carousel || !cards.length) return;

  const totalCards = cards.length;
  const theta = 360 / totalCards;
  const cardWidth = 250;
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / totalCards)) + 40; 

  cards.forEach((card, i) => {
    const angle = theta * i;
    card.style.setProperty('--base-transform', `rotateY(${angle}deg) translateZ(${radius}px)`);
    card.style.transform = `var(--base-transform)`;
  });

  let currentRotation = 0;
  let targetRotation = 0;
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let velocity = 0;

  const wrapper = document.getElementById('projectsCarousel');

  function onPointerDown(e) {
    if(e.button !== 0 && e.type !== 'touchstart') return; 
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    lastX = startX;
    velocity = 0;
    wrapper.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const delta = x - lastX;
    lastX = x;
    velocity = delta * 1.0;
    targetRotation += velocity;
  }

  function onPointerUp() {
    isDragging = false;
    wrapper.style.cursor = 'grab';
  }

  wrapper.addEventListener('mousedown', onPointerDown);
  wrapper.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
  
  wrapper.addEventListener('touchstart', onPointerDown, {passive: true});
  wrapper.addEventListener('touchmove', onPointerMove, {passive: true});
  window.addEventListener('touchend', onPointerUp);

  function animateCarousel() {
    if (!isDragging) {
      targetRotation += velocity;
      velocity *= 0.95;
      if(Math.abs(velocity) < 0.05) {
        targetRotation += 0.6;
      }
    }
    
    currentRotation += (targetRotation - currentRotation) * 0.1;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    
    cards.forEach((card, i) => {
      const cardAngle = (theta * i) + currentRotation;
      const normalizedAngle = ((cardAngle % 360) + 360) % 360;
      
      let zIndex = 100;
      let brightness = 1;
      
      if (normalizedAngle > 90 && normalizedAngle < 270) {
        zIndex = 10;
        brightness = 0.3;
      } else {
        zIndex = Math.round(100 - Math.min(normalizedAngle, 360 - normalizedAngle));
        brightness = 1 - (Math.min(normalizedAngle, 360 - normalizedAngle) / 180) * 0.7;
      }
      
      card.style.zIndex = zIndex;
      card.style.filter = `brightness(${brightness})`;
    });

    requestAnimationFrame(animateCarousel);
  }
  
  animateCarousel();

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if(Math.abs(velocity) > 1) return;
      const modalId = card.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if(modal) {
        modal.classList.add('active');
        // Pause Lenis smooth scroll while modal is open
        if(window.globalLenis) window.globalLenis.stop();
      }
    });
  });

  const closeBtns = document.querySelectorAll('.close-modal');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.project-modal').forEach(m => m.classList.remove('active'));
      if(window.globalLenis) window.globalLenis.start();
    });
  });

})();

// -- Section Entrance Animations (Directional Zoom) --
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll('section[id]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sections.forEach((sec, i) => {
    // Skip the home section — it has its own CSS dropIn animation
    // and applying GSAP translateY would clip the lanyard rope
    if (sec.id === 'home') return;

    // Find the primary container inside the section to animate (safer than animating the section itself)
    const container = sec.querySelector('.container, .hero-container');
    if (!container) return;

    if (!prefersReducedMotion) {
      const isOdd = (i % 2 === 0); // 0th index is the 1st section (Odd)
      const xOffset = isOdd ? 80 : -100;
      const yOffset = isOdd ? -80 : 0;

      gsap.fromTo(container, 
        {
          x: xOffset,
          y: yOffset,
          scale: 0.85,
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none' // Animate in once and keep visible
          }
        }
      );
    } else {
      // Reduced motion fallback
      gsap.fromTo(container, 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // -- Subtle Parallax/Zoom on Scroll for Images/Cards --
  if (!prefersReducedMotion) {
    const parallaxElements = document.querySelectorAll('.profile-card, .projects-carousel-wrapper, .cert-orbit-scene, .strength-card');
    parallaxElements.forEach(el => {
      gsap.fromTo(el, 
        { y: 30 },
        {
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    });
  }
})();


/* =============================================
   main.js  â€“  Single-page scroll interactions
   ============================================= */

// ─── Orthogonal Neon Cursor Trail ───
if (window.innerWidth > 768) {
  // Hide default cursor globally
  const cursorStyle = document.createElement('style');
  cursorStyle.innerHTML = `* { cursor: none !important; }`;
  document.head.appendChild(cursorStyle);

  // Setup Canvas
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999998;';
  document.body.appendChild(canvas);

  // Setup cursor dot (the head)
  const dot = document.createElement('div');
  dot.style.cssText = 'position:fixed;top:0;left:0;width:8px;height:8px;background:#fff;border-radius:50%;pointer-events:none;z-index:999999;transform:translate(-50%,-50%);box-shadow:0 0 10px #fff, 0 0 20px #22d3ee;';
  document.body.appendChild(dot);

  const ctx = canvas.getContext('2d');
  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let mouse = { x: w/2, y: h/2 };
  let head = { x: w/2, y: h/2 };
  const path = [];
  const MAX_TAIL = 40;
  const SPEED = 20;
  let hue = 0;
  let axis = 'x'; // current preferred movement axis

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot.style.left = mouse.x + 'px';
    dot.style.top = mouse.y + 'px';
  }, { passive: true });

  function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, w, h);

    let dx = mouse.x - head.x;
    let dy = mouse.y - head.y;
    let moved = false;

    // Switch axis when we align with the mouse on the current axis
    if (axis === 'x' && Math.abs(dx) < 1) axis = 'y';
    if (axis === 'y' && Math.abs(dy) < 1) axis = 'x';

    // Move the snake head orthogonally
    if (axis === 'x' && Math.abs(dx) > 0) {
      head.x += Math.abs(dx) > SPEED ? Math.sign(dx) * SPEED : dx;
      moved = true;
    } else if (axis === 'y' && Math.abs(dy) > 0) {
      head.y += Math.abs(dy) > SPEED ? Math.sign(dy) * SPEED : dy;
      moved = true;
    } else if (axis === 'x' && Math.abs(dy) > 0) {
      head.y += Math.abs(dy) > SPEED ? Math.sign(dy) * SPEED : dy;
      moved = true;
    } else if (axis === 'y' && Math.abs(dx) > 0) {
      head.x += Math.abs(dx) > SPEED ? Math.sign(dx) * SPEED : dx;
      moved = true;
    }

    if (moved) {
      path.push({ x: head.x, y: head.y, h: hue });
      hue = (hue + 2) % 360;
    } else if (path.length > 0) {
      // Retract tail slightly if idle
      path.shift();
    }

    // Constrain tail length
    while (path.length > MAX_TAIL) path.shift();

    if (path.length < 2) return;

    // Draw the neon trail
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 4;

    for (let i = 1; i < path.length; i++) {
      const p1 = path[i - 1];
      const p2 = path[i];
      const opacity = i / path.length;
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `hsla(${p2.h}, 100%, 60%, ${opacity})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsla(${p2.h}, 100%, 60%, ${opacity * 0.8})`;
      ctx.stroke();
    }
  }
  draw();
}

// â”€â”€ Section entrance: stagger children â”€â”€â”€â”€â”€â”€â”€
// already handled by CSS --delay vars + IntersectionObserver

// â”€â”€ Text Scramble Effect â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\\\/[]{}â€”=+*^?#________';
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

// â”€â”€ Interactive Sticky Card Stack & Lenis Smooth Scroll Engine â”€â”€
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

      window.globalLenis = lenis;   /* expose for ScrollTrigger wiring */

      function raf(time) {
        lenis.raf(time);
        updateCardStack();
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Listen to scroll events from Lenis
      lenis.on('scroll', () => { updateCardStack(); if (window.ScrollTrigger) ScrollTrigger.update(); });

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

// ── PROJECTS: Wavy-line horizontal scroll + guaranteed modal clicks ──
(function () {

  /* ─── Global modal helpers ─── */
  window._openPM = function (id) {
    document.querySelectorAll('.proj-modal').forEach(function (m) {
      m.classList.remove('proj-modal--open');
    });
    var modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('proj-modal--open');
      document.body.style.overflow = 'hidden';
    }
  };

  window._closePM = function () {
    document.querySelectorAll('.proj-modal').forEach(function (m) {
      m.classList.remove('proj-modal--open');
    });
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window._closePM();
  });

  /* ═══════════════════════════════════════════════════════════
     HORIZONTAL SCROLL — CSS sticky + pure JS (works with Lenis)
     ═══════════════════════════════════════════════════════════
     Strategy:
       • Make #projects tall  = 100vh + travel distance
         → creates native scroll space
       • .hs-wrapper is position:sticky top:0
         → stays pinned in viewport while user scrolls through
       • On every scroll event, compute how far into the section
         we've scrolled and translateX the track accordingly      */

  function initHS() {
    var section  = document.getElementById('projects');
    var wrapper  = document.getElementById('hsWrapper');
    var track    = document.getElementById('hsTrack');
    var progress = document.getElementById('hsProgress');
    if (!section || !wrapper || !track) return;

    /* How many px the track must slide horizontally */
    function getTravel() {
      var introW = 0;
      var intro  = wrapper.querySelector('.hs-intro');
      if (intro) introW = intro.offsetWidth;
      return Math.max(0, track.scrollWidth - (window.innerWidth - introW));
    }

    /* Set section height so scrolling creates the travel distance */
    function setup() {
      var travel = getTravel();
      section.style.setProperty('height',
        (window.innerHeight + travel) + 'px', 'important');
    }

    /* Compute scroll progress and move track */
    function update() {
      var travel  = getTravel();
      if (travel <= 0) return;

      /* Absolute top of the section relative to page */
      var secTop   = section.getBoundingClientRect().top + window.scrollY;
      /* How far the user has scrolled past the section top */
      var scrolled = window.scrollY - secTop;
      var prog     = Math.min(1, Math.max(0, scrolled / travel));

      track.style.transform = 'translateX(' + (-prog * travel) + 'px)';
      if (progress) progress.style.width = (prog * 100) + '%';
    }

    /* Initial sizing + position */
    setup();
    update();

    /* Listen to native scroll (fallback) */
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { setup(); update(); });

    /* Also listen to Lenis scroll events (the source of truth) */
    function hookLenis() {
      if (window.globalLenis) {
        window.globalLenis.on('scroll', update);
      } else {
        setTimeout(hookLenis, 150);
      }
    }
    hookLenis();
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHS);
  } else {
    /* Small delay so layout is complete and scrollWidth is accurate */
    setTimeout(initHS, 200);
  }

})();








// Section entrance animations removed to ensure visibility

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




// ─── Re-adding Reveal Observer ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});








// --- ORGANIC YELLOW PAINT SPREAD ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  let paintTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top top',
      end: '+=80%',
      scrub: 0.5, // Super smooth fluid catching up
      pin: true,
      pinSpacing: true
    }
  });

  // 1. Splatters explode outward and slightly grow
  paintTl.to('.paint-splat', {
    scale: 'random(2, 5)',
    x: 'random(10vw, 80vw)', 
    y: 'random(10vh, 80vh)',
    rotation: 'random(-180, 180)',
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.05
  }, 0);

  // 2. Main liquid blobs organically scale up to massively engulf the screen
  paintTl.to('.paint-blob', {
    scale: 15, // Large enough to cover desktop easily
    duration: 1.2,
    ease: 'power1.inOut',
    stagger: 0.08
  }, 0.1);
}



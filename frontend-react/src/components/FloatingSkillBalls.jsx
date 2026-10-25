import React, { useEffect, useRef, useState } from 'react';

/**
 * FloatingSkillBalls Component with 3 Frosted Glass Jars
 * 
 * Features:
 * - Three High-Tech Frosted Glass Vessels:
 *   1. 💻 Languages & Frameworks (8 skills)
 *   2. 🧠 Deep Learning & Vision (9 skills)
 *   3. ⚡ Generative AI & MLOps (10 skills)
 * - Dynamic Magnetic Storage:
 *   - When cursor enters the Skills arena, all 27 skill orbs flock, funnel,
 *     and store themselves inside their corresponding glass containers!
 *   - When cursor leaves, balls release and float freely across the entire arena.
 * - Interactive glass vessels with real-time specular reflections, liquid glow,
 *   and graduation measurement ticks.
 * - Freeze-on-hover (+25% expansion with neon aura) and drag-and-toss physics.
 * - 60 FPS hardware-accelerated, 0% CPU off-screen via IntersectionObserver.
 */

const RESUME_SKILLS = [
  { name: 'Python', category: 'Languages & Frameworks', lines: ['Python'], color: '#2563eb', colorLight: '#93c5fd', colorDark: '#1e3a8a', textColor: '#ffffff' },
  { name: 'TensorFlow', category: 'Deep Learning', lines: ['TensorFlow'], color: '#ea580c', colorLight: '#fdba74', colorDark: '#9a3412', textColor: '#ffffff' },
  { name: 'Keras', category: 'Deep Learning', lines: ['Keras'], color: '#dc2626', colorLight: '#fca5a5', colorDark: '#991b1b', textColor: '#ffffff' },
  { name: 'CNN', category: 'Deep Learning & Vision', lines: ['CNN'], color: '#0891b2', colorLight: '#67e8f9', colorDark: '#164e63', textColor: '#ffffff' },
  { name: 'ANN', category: 'Deep Learning', lines: ['ANN'], color: '#7c3aed', colorLight: '#c4b5fd', colorDark: '#4c1d95', textColor: '#ffffff' },
  { name: 'RAG Systems', category: 'Generative AI', lines: ['RAG', 'Systems'], color: '#db2777', colorLight: '#f472b6', colorDark: '#831843', textColor: '#ffffff' },
  { name: 'LangChain', category: 'Generative AI', lines: ['LangChain'], color: '#059669', colorLight: '#6ee7b7', colorDark: '#064e3b', textColor: '#ffffff' },
  { name: 'Hugging Face', category: 'Generative AI & NLP', lines: ['Hugging', 'Face'], color: '#d97706', colorLight: '#fde68a', colorDark: '#78350f', textColor: '#ffffff' },
  { name: 'NLP', category: 'Languages & Frameworks', lines: ['NLP'], color: '#9333ea', colorLight: '#d8b4fe', colorDark: '#581c87', textColor: '#ffffff' },
  { name: 'LLM Chatbots', category: 'Generative AI', lines: ['LLM', 'Chatbots'], color: '#c026d3', colorLight: '#f0abfc', colorDark: '#701a75', textColor: '#ffffff' },
  { name: 'Vector DB', category: 'Generative AI', lines: ['Vector', 'DB'], color: '#4f46e5', colorLight: '#a5b4fc', colorDark: '#312e81', textColor: '#ffffff' },
  { name: 'Prompt Eng.', category: 'Generative AI', lines: ['Prompt', 'Eng.'], color: '#e11d48', colorLight: '#fda4af', colorDark: '#881337', textColor: '#ffffff' },
  { name: 'Scikit-learn', category: 'Languages & Frameworks', lines: ['Scikit', 'Learn'], color: '#ea580c', colorLight: '#fed7aa', colorDark: '#7c2d12', textColor: '#ffffff' },
  { name: 'FastAPI', category: 'Tools & Platforms', lines: ['FastAPI'], color: '#0d9488', colorLight: '#5eead4', colorDark: '#134e4a', textColor: '#ffffff' },
  { name: 'Django', category: 'Languages & Frameworks', lines: ['Django'], color: '#15803d', colorLight: '#86efac', colorDark: '#14532d', textColor: '#ffffff' },
  { name: 'Docker', category: 'Tools & Platforms', lines: ['Docker'], color: '#0284c7', colorLight: '#7dd3fc', colorDark: '#075985', textColor: '#ffffff' },
  { name: 'SQL', category: 'Languages & Frameworks', lines: ['SQL'], color: '#0369a1', colorLight: '#38bdf8', colorDark: '#0c4a6e', textColor: '#ffffff' },
  { name: 'NumPy', category: 'Languages & Frameworks', lines: ['NumPy'], color: '#06b6d4', colorLight: '#a5f3fc', colorDark: '#155e75', textColor: '#ffffff' },
  { name: 'Pandas', category: 'Languages & Frameworks', lines: ['Pandas'], color: '#4338ca', colorLight: '#c7d2fe', colorDark: '#312e81', textColor: '#ffffff' },
  { name: 'Matplotlib', category: 'Languages & Frameworks', lines: ['Matplotlib'], color: '#1d4ed8', colorLight: '#93c5fd', colorDark: '#1e3a8a', textColor: '#ffffff' },
  { name: 'Git / GitHub', category: 'Tools & Platforms', lines: ['Git /', 'GitHub'], color: '#c2410c', colorLight: '#fdba74', colorDark: '#7c2d12', textColor: '#ffffff' },
  { name: 'Linux CLI', category: 'Tools & Platforms', lines: ['Linux', 'CLI'], color: '#ca8a04', colorLight: '#fef08a', colorDark: '#713f12', textColor: '#ffffff' },
  { name: 'Medical Image', category: 'Deep Learning & Vision', lines: ['Medical', 'Image'], color: '#0f766e', colorLight: '#5eead4', colorDark: '#134e4a', textColor: '#ffffff' },
  { name: 'Image Class.', category: 'Deep Learning & Vision', lines: ['Image', 'Class.'], color: '#0369a1', colorLight: '#38bdf8', colorDark: '#082f49', textColor: '#ffffff' },
  { name: 'Data Augment.', category: 'Deep Learning & Vision', lines: ['Data', 'Augment.'], color: '#6d28d9', colorLight: '#c4b5fd', colorDark: '#3b0764', textColor: '#ffffff' },
  { name: 'Model Eval.', category: 'Core Competencies', lines: ['Model', 'Eval.'], color: '#047857', colorLight: '#6ee7b7', colorDark: '#064e3b', textColor: '#ffffff' },
  { name: 'Data Preproc.', category: 'Core Competencies', lines: ['Data', 'Preproc.'], color: '#b45309', colorLight: '#fde68a', colorDark: '#78350f', textColor: '#ffffff' },
];

// Determine which of the 3 Glass Jars each skill belongs to
const getSkillGlassId = (skill) => {
  const name = skill.name;
  const cat = skill.category;

  // Glass 0: Languages & Frameworks (8 skills)
  if (
    cat === 'Languages & Frameworks' ||
    name === 'Python' ||
    name === 'Django' ||
    name === 'FastAPI' ||
    name === 'SQL' ||
    name === 'NumPy' ||
    name === 'Pandas' ||
    name === 'Matplotlib' ||
    name === 'Scikit-learn'
  ) {
    return 0;
  }

  // Glass 1: Deep Learning & Vision (9 skills)
  if (
    cat === 'Deep Learning' ||
    cat === 'Deep Learning & Vision' ||
    cat === 'Core Competencies' ||
    name === 'TensorFlow' ||
    name === 'Keras' ||
    name === 'CNN' ||
    name === 'ANN' ||
    name === 'Medical Image' ||
    name === 'Image Class.' ||
    name === 'Data Augment.' ||
    name === 'Model Eval.' ||
    name === 'Data Preproc.'
  ) {
    return 1;
  }

  // Glass 2: Generative AI & MLOps (10 skills)
  return 2;
};

const GLASS_JARS_META = [
  {
    id: 0,
    title: 'Languages & Core',
    icon: '💻',
    accent: '#0284c7',
    accentGlow: 'rgba(2, 132, 199, 0.22)',
    skillsCount: 8,
  },
  {
    id: 1,
    title: 'Deep Learning & Vision',
    icon: '🧠',
    accent: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.22)',
    skillsCount: 9,
  },
  {
    id: 2,
    title: 'Generative AI & MLOps',
    icon: '⚡',
    accent: '#0d9488',
    accentGlow: 'rgba(13, 148, 136, 0.22)',
    skillsCount: 10,
  },
];

export default function FloatingSkillBalls() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isStoredState, setIsStoredState] = useState(false);
  const [isLockedStored, setIsLockedStored] = useState(false);

  const isStored = isStoredState || isLockedStored;
  const isStoredRef = useRef(isStored);
  const isLockedStoredRef = useRef(isLockedStored);

  useEffect(() => {
    isStoredRef.current = isStored;
  }, [isStored]);

  useEffect(() => {
    isLockedStoredRef.current = isLockedStored;
  }, [isLockedStored]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animId;
    let hoveredGlassIdx = null;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight || 460);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    const N = RESUME_SKILLS.length;

    // Calculate dynamic 3 Glass Jars Geometry based on canvas width and height
    const getGlassJars = (w, h) => {
      const isMobile = w < 640;
      const topY = isMobile ? 38 : 46;
      const jarHeight = h - topY - 18;

      if (isMobile) {
        // Mobile: 3 compact adjacent glass columns
        const sideMargin = 8;
        const totalW = w - sideMargin * 2;
        const gap = 8;
        const jarW = (totalW - gap * 2) / 3;

        return GLASS_JARS_META.map((meta, i) => {
          const x = sideMargin + i * (jarW + gap);
          return {
            ...meta,
            x,
            y: topY,
            w: jarW,
            h: jarHeight,
            cx: x + jarW / 2,
            cy: topY + jarHeight / 2,
            bottomY: topY + jarHeight,
            isMobile: true,
          };
        });
      }

      // Desktop & Tablet: 3 spacious frosted glass vessels
      const sideMargin = Math.min(45, w * 0.05);
      const totalAvailable = w - sideMargin * 2;
      const maxJarW = Math.min(320, totalAvailable / 3 - 24);
      const gap = (totalAvailable - maxJarW * 3) / 2;

      return GLASS_JARS_META.map((meta, i) => {
        const x = sideMargin + i * (maxJarW + gap);
        return {
          ...meta,
          x,
          y: topY,
          w: maxJarW,
          h: jarHeight,
          cx: x + maxJarW / 2,
          cy: topY + jarHeight / 2,
          bottomY: topY + jarHeight,
          isMobile: false,
        };
      });
    };

    let glassJars = getGlassJars(width, height);

    // Calculate orderly, stable hexagonal-packed resting coordinates inside each jar
    const getSlotPos = (jar, slotIndex) => {
      const isMobile = jar.isMobile;
      if (isMobile) {
        // Mobile layout: 2 compact staggered columns
        const row = Math.floor(slotIndex / 2);
        const col = slotIndex % 2;
        const colOffset = (col === 0 ? -1 : 1) * (jar.w * 0.22);
        const rowPitch = Math.min(32, (jar.h - 50) / 6);
        return {
          x: jar.cx + colOffset,
          y: jar.bottomY - 24 - row * rowPitch,
        };
      }

      // Desktop layout: Stable hexagonal close-packing (Rows: 3, 2, 3, 2)
      let row = 0;
      let colOffset = 0;
      const spread = jar.w * 0.28;
      const valleySpread = jar.w * 0.15;

      if (slotIndex <= 2) {
        row = 0;
        colOffset = slotIndex === 0 ? -spread : slotIndex === 1 ? 0 : spread;
      } else if (slotIndex <= 4) {
        row = 1;
        colOffset = slotIndex === 3 ? -valleySpread : valleySpread;
      } else if (slotIndex <= 7) {
        row = 2;
        const local = slotIndex - 5;
        colOffset = local === 0 ? -spread : local === 1 ? 0 : spread;
      } else {
        row = 3;
        const local = slotIndex - 8;
        colOffset = local === 0 ? -valleySpread : valleySpread;
      }

      const rowPitch = Math.min(48, (jar.h - 70) / 4.6);
      return {
        x: jar.cx + colOffset,
        y: jar.bottomY - 34 - row * rowPitch,
      };
    };

    // Initial ball generation
    const createNodes = (w) => {
      const isMobile = w < 640;
      const jarCounters = [0, 0, 0];

      return RESUME_SKILLS.map((skill, idx) => {
        const glassId = getSkillGlassId(skill);
        const slotIndex = jarCounters[glassId]++;
        const jar = glassJars[glassId];

        const textLen = skill.name.length;
        const baseR = isMobile
          ? (textLen > 10 ? 17 : textLen > 6 ? 15 : 13.5)
          : (textLen > 10 ? 25 : textLen > 6 ? 23 : 21);

        // Initial free velocity
        const speed = 1.6 + Math.random() * 1.5;
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        return {
          ...skill,
          id: idx,
          glassId,
          slotIndex,
          x: jar.cx + (Math.random() - 0.5) * (jar.w * 0.7),
          y: jar.cy + (Math.random() - 0.5) * (jar.h * 0.6),
          vx,
          vy,
          savedVx: vx,
          savedVy: vy,
          currentR: baseR,
          baseR,
          mass: baseR * baseR,
        };
      });
    };

    let nodes = createNodes(width);

    // Mouse and interaction tracking
    const mouse = { x: -1000, y: -1000, isDown: false, draggedNode: null };
    let hoveredNode = null;
    let isVisible = true;

    // IntersectionObserver to preserve 0% CPU off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '80px' }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 460;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
      glassJars = getGlassJars(width, height);
    };
    window.addEventListener('resize', handleResize);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onPointerDown = (e) => {
      const pos = getPos(e);
      mouse.isDown = true;
      mouse.x = pos.x;
      mouse.y = pos.y;

      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dist = Math.hypot(pos.x - n.x, pos.y - n.y);
        if (dist <= n.currentR + 8) {
          mouse.draggedNode = n;
          break;
        }
      }
    };

    const onPointerMove = (e) => {
      const pos = getPos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;

      // Automatically engage Stored In Glass Mode on cursor movement!
      if (!isStoredRef.current) {
        setIsStoredState(true);
      }

      // Check which glass jar is being hovered
      let gHover = null;
      for (let g = 0; g < glassJars.length; g++) {
        const jar = glassJars[g];
        if (
          pos.x >= jar.x &&
          pos.x <= jar.x + jar.w &&
          pos.y >= jar.y &&
          pos.y <= jar.bottomY
        ) {
          gHover = g;
          break;
        }
      }
      hoveredGlassIdx = gHover;

      if (mouse.draggedNode) {
        mouse.draggedNode.x = pos.x;
        mouse.draggedNode.y = pos.y;
        mouse.draggedNode.vx = 0;
        mouse.draggedNode.vy = 0;
      } else {
        let found = null;
        for (let i = nodes.length - 1; i >= 0; i--) {
          const n = nodes[i];
          const dist = Math.hypot(pos.x - n.x, pos.y - n.y);
          if (dist <= n.currentR * 1.15) {
            found = n;
            break;
          }
        }

        if (found !== hoveredNode) {
          if (hoveredNode && !found) {
            hoveredNode.vx = hoveredNode.savedVx || (Math.random() - 0.5) * 2;
            hoveredNode.vy = hoveredNode.savedVy || (Math.random() - 0.5) * 2;
          }
          if (found) {
            found.savedVx = found.vx;
            found.savedVy = found.vy;
            found.vx = 0;
            found.vy = 0;
          }
          hoveredNode = found;
          canvas.style.cursor = found ? 'pointer' : 'grab';
        }
      }
    };

    const onPointerUp = () => {
      mouse.isDown = false;
      mouse.draggedNode = null;
      canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
    };

    const onMouseEnter = () => {
      setIsStoredState(true);
    };

    const onMouseLeave = () => {
      if (!isLockedStoredRef.current) {
        setIsStoredState(false);
      }
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isDown = false;
      mouse.draggedNode = null;
      hoveredNode = null;
      hoveredGlassIdx = null;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseenter', onMouseEnter);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // ==========================================
    // 60FPS PHYSICS & GLASS RENDER LOOP
    // ==========================================
    let lastTime = performance.now();

    const render = (currentTime) => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.08);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const isStored = isStoredRef.current;

      // ==========================================
      // LAYER 1: DRAW 3 FROSTED GLASS JARS (BACK WALL)
      // ==========================================
      for (let g = 0; g < glassJars.length; g++) {
        const jar = glassJars[g];
        const isHoveredGlass = hoveredGlassIdx === g;
        const cornerR = jar.isMobile ? 14 : 22;

        ctx.save();

        // 1. Frosted Back Glass Body Path
        ctx.beginPath();
        ctx.moveTo(jar.x, jar.y + 16);
        ctx.lineTo(jar.x, jar.bottomY - cornerR);
        ctx.quadraticCurveTo(jar.x, jar.bottomY, jar.x + cornerR, jar.bottomY);
        ctx.lineTo(jar.x + jar.w - cornerR, jar.bottomY);
        ctx.quadraticCurveTo(jar.x + jar.w, jar.bottomY, jar.x + jar.w, jar.bottomY - cornerR);
        ctx.lineTo(jar.x + jar.w, jar.y + 16);
        ctx.closePath();

        // Back Frosted Tint
        ctx.fillStyle = isHoveredGlass
          ? 'rgba(255, 255, 255, 0.72)'
          : isStored
          ? 'rgba(255, 255, 255, 0.58)'
          : 'rgba(255, 255, 255, 0.35)';
        ctx.fill();

        // Ambient Liquid / Energy Pool at Bottom
        const liquidGrad = ctx.createLinearGradient(
          0,
          jar.bottomY - jar.h * 0.45,
          0,
          jar.bottomY
        );
        liquidGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        liquidGrad.addColorStop(
          1,
          isHoveredGlass ? jar.accentGlow : isStored ? 'rgba(2, 132, 199, 0.12)' : 'rgba(2, 132, 199, 0.04)'
        );
        ctx.fillStyle = liquidGrad;
        ctx.fill();

        // Measurement Graduation Ticks along Left Edge
        if (!jar.isMobile) {
          ctx.strokeStyle = 'rgba(15, 23, 42, 0.2)';
          ctx.lineWidth = 1.2;
          ctx.fillStyle = 'rgba(100, 116, 139, 0.75)';
          ctx.font = '600 8.5px "JetBrains Mono", monospace';
          ctx.textAlign = 'left';

          const ticks = [0.25, 0.5, 0.75, 0.9];
          const labels = ['25%', '50%', '75%', 'MAX'];
          ticks.forEach((frac, idx) => {
            const ty = jar.bottomY - jar.h * frac * 0.75;
            ctx.beginPath();
            ctx.moveTo(jar.x + 3, ty);
            ctx.lineTo(jar.x + 12, ty);
            ctx.stroke();
            ctx.fillText(labels[idx], jar.x + 15, ty + 3);
          });
        }

        ctx.restore();
      }

      // ==========================================
      // LAYER 2: BALL PHYSICS & DRAWING
      // ==========================================
      for (let i = 0; i < N; i++) {
        const node = nodes[i];
        const isHover = hoveredNode === node;
        const targetJar = glassJars[node.glassId];

        if (node === mouse.draggedNode) {
          continue;
        }

        if (isHover) {
          node.vx = 0;
          node.vy = 0;
          const targetR = node.baseR * 1.22;
          node.currentR += (targetR - node.currentR) * 0.3;
        } else {
          node.currentR += (node.baseR - node.currentR) * 0.18;

          if (isStored) {
            // ==========================================
            // STORED IN GLASS MODE: Settle into stable resting slots!
            // ==========================================
            const slot = getSlotPos(targetJar, node.slotIndex);
            const targetX = slot.x;
            const targetY = slot.y;

            const dx = targetX - node.x;
            const dy = targetY - node.y;
            const dist = Math.hypot(dx, dy);

            if (dist > 0.8) {
              // Critically damped spring pull toward stable target slot
              const pull = Math.min(0.14, 0.05 + dist * 0.0003);
              node.vx += dx * pull;
              node.vy += dy * pull;

              // Heavy fluid damping to settle smoothly without overshoot or oscillation
              node.vx *= 0.82;
              node.vy *= 0.82;

              node.x += node.vx * 60 * dt;
              node.y += node.vy * 60 * dt;
            } else {
              // Snap to exact resting position - 100% stable, zero velocity, zero jitter!
              node.x = targetX;
              node.y = targetY;
              node.vx = 0;
              node.vy = 0;
            }
          } else {
            // ==========================================
            // FREE ROAMING MODE: Drift across full arena!
            // ==========================================
            const speed = Math.hypot(node.vx, node.vy);
            if (speed < 1.4) {
              // Wake up from stationary stored state with an outward angle
              const angle = node.id * 1.37 + node.slotIndex * 0.8;
              const pushSpeed = 1.8 + (node.id % 3) * 0.4;
              node.vx = Math.cos(angle) * pushSpeed;
              node.vy = Math.sin(angle) * pushSpeed;
            } else if (speed > 3.4) {
              const factor = 3.4 / speed;
              node.vx *= factor;
              node.vy *= factor;
            }

            node.x += node.vx * 60 * dt;
            node.y += node.vy * 60 * dt;

            // Bounce off all 4 outer canvas walls
            const r = node.currentR;
            const margin = 16;
            if (node.x - r < margin) {
              node.x = margin + r;
              node.vx = Math.abs(node.vx);
            } else if (node.x + r > width - margin) {
              node.x = width - margin - r;
              node.vx = -Math.abs(node.vx);
            }

            if (node.y - r < margin + 25) {
              node.y = margin + 25 + r;
              node.vy = Math.abs(node.vy);
            } else if (node.y + r > height - margin) {
              node.y = height - margin - r;
              node.vy = -Math.abs(node.vy);
            }
          }
        }
      }

      // Inter-ball collision resolution (soft push)
      // Only active during free-roaming mode, or if a ball is actively being dragged.
      // In stored mode, the pre-calculated hexagonal slots are already non-overlapping,
      // so skipping collision pushes guarantees 100% rock-solid stability with zero jitter!
      if (!isStored || mouse.draggedNode) {
        for (let i = 0; i < N; i++) {
          for (let j = i + 1; j < N; j++) {
            const n1 = nodes[i];
            const n2 = nodes[j];
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.hypot(dx, dy);
            const minDist = n1.currentR + n2.currentR + 3;

            if (dist < minDist && dist > 0.001) {
              const overlap = (minDist - dist) * 0.5;
              const nx = dx / dist;
              const ny = dy / dist;

              if (n1 !== mouse.draggedNode) {
                n1.x -= nx * overlap;
                n1.y -= ny * overlap;
              }
              if (n2 !== mouse.draggedNode) {
                n2.x += nx * overlap;
                n2.y += ny * overlap;
              }
            }
          }
        }
      }

      // DRAW BALLS
      for (let i = 0; i < N; i++) {
        const node = nodes[i];
        const isHover = hoveredNode === node;
        const x = node.x;
        const y = node.y;
        const r = node.currentR;

        ctx.save();

        // Outer glow
        if (isHover) {
          ctx.shadowColor = node.colorLight || '#38bdf8';
          ctx.shadowBlur = 18;
        } else {
          ctx.shadowColor = 'rgba(15, 23, 42, 0.16)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 3;
        }

        // 3D Spherical Radial Gradient
        const ballGrad = ctx.createRadialGradient(
          x - r * 0.32,
          y - r * 0.32,
          r * 0.08,
          x,
          y,
          r
        );
        ballGrad.addColorStop(0, node.colorLight || '#ffffff');
        ballGrad.addColorStop(0.5, node.color);
        ballGrad.addColorStop(1, node.colorDark || '#0f172a');

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = ballGrad;
        ctx.fill();

        // Clean white/translucent border ring
        ctx.lineWidth = isHover ? 2.5 : 1.4;
        ctx.strokeStyle = isHover ? '#ffffff' : 'rgba(255, 255, 255, 0.85)';
        ctx.stroke();

        // Specular highlight crescent
        ctx.beginPath();
        ctx.arc(x - r * 0.28, y - r * 0.28, r * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
        ctx.fill();

        // Typography
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 0.5;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = '#ffffff';

        const lines = node.lines;
        if (lines.length === 1) {
          const fontSize = Math.max(8.5, Math.min(13, Math.floor(r * 0.36)));
          ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
          ctx.fillText(lines[0], x, y + 0.5);
        } else {
          const fontSize = Math.max(7.5, Math.min(11, Math.floor(r * 0.30)));
          ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
          const lineSpacing = fontSize * 1.15;
          ctx.fillText(lines[0], x, y - lineSpacing * 0.48);
          ctx.fillText(lines[1], x, y + lineSpacing * 0.58);
        }

        ctx.restore();
      }

      // ==========================================
      // LAYER 3: DRAW 3 FROSTED GLASS JARS (FRONT WALL & SHINE)
      // ==========================================
      for (let g = 0; g < glassJars.length; g++) {
        const jar = glassJars[g];
        const isHoveredGlass = hoveredGlassIdx === g;
        const cornerR = jar.isMobile ? 14 : 22;

        ctx.save();

        // 1. Front Glass Specular Reflection Stripe down right wall
        const shineGrad = ctx.createLinearGradient(
          jar.x + jar.w * 0.78,
          0,
          jar.x + jar.w * 0.90,
          0
        );
        shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        shineGrad.addColorStop(0.5, isHoveredGlass ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.35)');
        shineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = shineGrad;
        ctx.fillRect(jar.x + jar.w * 0.76, jar.y + 16, jar.w * 0.16, jar.h - 24);

        // 2. Crisp Glass Vessel Outline
        ctx.beginPath();
        ctx.moveTo(jar.x, jar.y + 16);
        ctx.lineTo(jar.x, jar.bottomY - cornerR);
        ctx.quadraticCurveTo(jar.x, jar.bottomY, jar.x + cornerR, jar.bottomY);
        ctx.lineTo(jar.x + jar.w - cornerR, jar.bottomY);
        ctx.quadraticCurveTo(jar.x + jar.w, jar.bottomY, jar.x + jar.w, jar.bottomY - cornerR);
        ctx.lineTo(jar.x + jar.w, jar.y + 16);

        ctx.lineWidth = isHoveredGlass ? 2.2 : 1.5;
        ctx.strokeStyle = isHoveredGlass ? jar.accent : 'rgba(203, 213, 225, 0.9)';
        ctx.stroke();

        // 3. Top Open Lip Ellipse
        ctx.beginPath();
        ctx.ellipse(jar.cx, jar.y + 16, jar.w / 2, 7, 0, 0, Math.PI * 2);
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = isHoveredGlass ? jar.accent : 'rgba(255, 255, 255, 0.95)';
        ctx.stroke();

        // 4. Top Header Label Tag (Title & Icon)
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Tag Pill Background
        const tagW = Math.min(jar.w - 12, jar.isMobile ? 100 : 190);
        const tagH = jar.isMobile ? 22 : 26;
        const tagY = jar.y - tagH / 2 + 2;

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(jar.cx - tagW / 2, tagY, tagW, tagH, tagH / 2);
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = isHoveredGlass ? jar.accent : 'rgba(226, 232, 240, 0.9)';
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#0f172a';
        ctx.font = jar.isMobile
          ? '700 9px system-ui, sans-serif'
          : '700 11.5px system-ui, sans-serif';
        const labelText = jar.isMobile
          ? `${jar.icon} ${jar.title.split(' ')[0]}`
          : `${jar.icon} ${jar.title}`;
        ctx.fillText(labelText, jar.cx, tagY + tagH / 2);

        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onPointerDown);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchstart', onPointerDown);
      canvas.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[410px] sm:h-[450px] md:h-[480px] rounded-2xl bg-transparent overflow-hidden mt-2 mb-2 select-none group"
    >
      {/* Interactive Storage Status Pill */}
      <div className="absolute top-1 inset-x-0 z-20 flex justify-center pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsLockedStored(!isLockedStored)}
          title="Click to toggle or lock storage mode"
          className={`px-4 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all shadow-sm border flex items-center gap-2 cursor-pointer ${
            isStoredState || isLockedStored
              ? 'bg-sky-50/90 border-sky-300 text-[#0284C7] shadow-sky-500/10'
              : 'bg-white/80 border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>{isStoredState || isLockedStored ? '🧪' : '✨'}</span>
          <span>
            {isStoredState || isLockedStored
              ? 'Stored in 3 Glass Vessels • Hovering'
              : 'Free Floating • Move cursor in to Store'}
          </span>
          {isLockedStored && (
            <span className="text-[10px] bg-[#0284C7] text-white px-1.5 py-0.2 rounded-full font-mono">
              LOCKED
            </span>
          )}
        </button>
      </div>

      {/* Central Ambient Depth Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_75%)] pointer-events-none" />

      {/* Main 2D/3D Canvas with 3 Glass Jars */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing block"
      />
    </div>
  );
}

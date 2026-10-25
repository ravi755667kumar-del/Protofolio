import React, { useEffect, useRef } from 'react';

/**
 * FloatingSkillBalls Component
 * 
 * Features:
 * - Free-roaming physics: balls travel freely ANYWHERE across the entire canvas ("inot in same place like go anywhere")
 * - Elastic bouncing off all 4 walls (left, right, top, bottom) and off each other
 * - Complete freeze / stop when cursor is kept on a ball ("when i shall keep my cursor there it will stop")
 * - Smooth +25% hover expansion with luminous neon ring and high-contrast typography
 * - Instant velocity resumption when cursor leaves
 * - 27 skills strictly from Ravi Kumar's updated resume
 * - Vibrant 3D directional lighting & specular gloss reflections
 * - 60 FPS hardware accelerated, 0% CPU off-screen via IntersectionObserver
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

export default function FloatingSkillBalls() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animId;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight || 430);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    const N = RESUME_SKILLS.length;

    // Distribute balls cleanly initially, then allow completely free motion anywhere
    const createLayout = (w, h) => {
      const marginX = Math.min(40, w * 0.06);
      const marginY = Math.min(30, h * 0.06);
      const availableW = w - marginX * 2;
      const availableH = h - marginY * 2;

      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;
      const rowCounts = isMobile
        ? [4, 4, 4, 4, 4, 4, 3]
        : isTablet
        ? [4, 5, 5, 5, 5, 3]
        : [5, 6, 5, 6, 5];
      const totalRows = rowCounts.length;

      let idx = 0;
      const layout = [];

      for (let r = 0; r < totalRows; r++) {
        const count = rowCounts[r];
        const yFrac = totalRows > 1 ? r / (totalRows - 1) : 0.5;
        const baseY = marginY + yFrac * availableH;
        const xOffset = (r % 2 === 1) ? (availableW / (count * 2.5)) : 0;

        for (let c = 0; c < count; c++) {
          if (idx >= N) break;
          const xFrac = count > 1 ? c / (count - 1) : 0.5;
          const baseX = marginX + xFrac * (availableW - xOffset) + xOffset * 0.5;

          const skill = RESUME_SKILLS[idx];
          const textLen = skill.name.length;
          const baseR = isMobile
            ? (textLen > 10 ? 25 : textLen > 6 ? 23 : 21)
            : (textLen > 10 ? 32 : textLen > 6 ? 29 : 26);

          // Fast free-roaming velocity vectors in all directions
          const speed = 1.9 + Math.random() * 1.5;
          const angle = Math.random() * Math.PI * 2;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;

          layout.push({
            ...skill,
            id: idx,
            x: baseX + (Math.random() - 0.5) * 10,
            y: baseY + (Math.random() - 0.5) * 10,
            vx,
            vy,
            savedVx: vx,
            savedVy: vy,
            currentR: baseR,
            baseR,
            mass: baseR * baseR,
          });
          idx++;
        }
      }
      return layout;
    };

    let nodes = createLayout(width, height);

    // Mouse and interaction tracking
    const mouse = { x: -1000, y: -1000, isDown: false, draggedNode: null, prevX: 0, prevY: 0 };
    let hoveredNode = null;
    let isVisible = true;

    // IntersectionObserver: Sleeps when off-screen to preserve 0% CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '100px' }
    );
    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 430;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
      nodes = createLayout(width, height);
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
      mouse.prevX = pos.x;
      mouse.prevY = pos.y;

      // Check if user clicked directly on a ball to drag it
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dist = Math.hypot(pos.x - n.x, pos.y - n.y);
        if (dist <= n.currentR + 6) {
          mouse.draggedNode = n;
          break;
        }
      }
    };

    const onPointerMove = (e) => {
      const pos = getPos(e);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = pos.x;
      mouse.y = pos.y;

      if (mouse.draggedNode) {
        mouse.draggedNode.x = pos.x;
        mouse.draggedNode.y = pos.y;
        mouse.draggedNode.vx = (pos.x - mouse.prevX) * 0.9;
        mouse.draggedNode.vy = (pos.y - mouse.prevY) * 0.9;
        mouse.draggedNode.savedVx = mouse.draggedNode.vx;
        mouse.draggedNode.savedVy = mouse.draggedNode.vy;
      } else {
        // Detect hovered node
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
          // If leaving previous hovered node, unfreeze and resume motion!
          if (hoveredNode && !found) {
            const spd = Math.hypot(hoveredNode.savedVx || 0, hoveredNode.savedVy || 0);
            if (spd > 0.6) {
              hoveredNode.vx = hoveredNode.savedVx;
              hoveredNode.vy = hoveredNode.savedVy;
            } else {
              const ang = Math.random() * Math.PI * 2;
              hoveredNode.vx = Math.cos(ang) * 2.2;
              hoveredNode.vy = Math.sin(ang) * 2.2;
            }
          }

          // If entering newly hovered node, freeze completely!
          if (found) {
            if (found.vx !== 0 || found.vy !== 0) {
              found.savedVx = found.vx;
              found.savedVy = found.vy;
            }
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

    const onMouseLeave = () => {
      if (hoveredNode) {
        const ang = Math.random() * Math.PI * 2;
        hoveredNode.vx = hoveredNode.savedVx || Math.cos(ang) * 2.2;
        hoveredNode.vy = hoveredNode.savedVy || Math.sin(ang) * 2.2;
      }
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isDown = false;
      mouse.draggedNode = null;
      hoveredNode = null;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // ==========================================
    // MAIN 60FPS FREE-ROAMING PHYSICS LOOP
    // ==========================================
    let lastTime = performance.now();

    const render = (currentTime) => {
      animId = requestAnimationFrame(render);

      if (!isVisible) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.08);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const margin = 16;

      // 1. FREE-ROAMING MOTION & 4-WALL BOUNCING
      for (let i = 0; i < N; i++) {
        const node = nodes[i];
        const isHover = hoveredNode === node;

        if (node === mouse.draggedNode) {
          continue;
        }

        if (isHover) {
          // WHEN CURSOR IS KEPT ON THIS BALL -> COMPLETELY FROZEN & STOPPED!
          node.vx = 0;
          node.vy = 0;
          const targetR = node.baseR * 1.25;
          node.currentR += (targetR - node.currentR) * 0.3;
          continue; // Skips all movement updates while cursor is kept on this ball!
        }

        // Return radius to base smoothly
        node.currentR += (node.baseR - node.currentR) * 0.2;

        // Keep velocity brisk and energetic
        const speed = Math.hypot(node.vx, node.vy);
        if (speed < 1.7) {
          const factor = 2.2 / (speed || 1);
          node.vx *= factor;
          node.vy *= factor;
        } else if (speed > 3.8) {
          const factor = 3.8 / speed;
          node.vx *= factor;
          node.vy *= factor;
        }

        // Free motion anywhere across the canvas!
        node.x += node.vx * 60 * dt;
        node.y += node.vy * 60 * dt;

        // Wall collisions - bounce off all 4 edges!
        const r = node.currentR;

        // Left wall
        if (node.x - r < margin) {
          node.x = margin + r;
          node.vx = Math.abs(node.vx);
        }
        // Right wall
        else if (node.x + r > width - margin) {
          node.x = width - margin - r;
          node.vx = -Math.abs(node.vx);
        }

        // Top wall
        if (node.y - r < margin) {
          node.y = margin + r;
          node.vy = Math.abs(node.vy);
        }
        // Bottom wall
        else if (node.y + r > height - margin) {
          node.y = height - margin - r;
          node.vy = -Math.abs(node.vy);
        }
      }

      // 2. BALL-TO-BALL ELASTIC COLLISIONS (Bounce off each other)
      for (let i = 0; i < N; i++) {
        const b1 = nodes[i];

        for (let j = i + 1; j < N; j++) {
          const b2 = nodes[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = b1.currentR + b2.currentR + 3;

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist);
            const nx = dx / dist;
            const ny = dy / dist;

            const b1Hover = hoveredNode === b1;
            const b2Hover = hoveredNode === b2;

            if (b1Hover) {
              // b1 is frozen: b2 bounces off b1 like a solid obstacle
              b2.x += nx * overlap;
              b2.y += ny * overlap;
              const dot = b2.vx * nx + b2.vy * ny;
              b2.vx -= 2 * dot * nx;
              b2.vy -= 2 * dot * ny;
            } else if (b2Hover) {
              // b2 is frozen: b1 bounces off b2 like a solid obstacle
              b1.x -= nx * overlap;
              b1.y -= ny * overlap;
              const dot = b1.vx * nx + b1.vy * ny;
              b1.vx -= 2 * dot * nx;
              b1.vy -= 2 * dot * ny;
            } else {
              // Both balls are free: resolve overlap equally
              b1.x -= nx * overlap * 0.5;
              b1.y -= ny * overlap * 0.5;
              b2.x += nx * overlap * 0.5;
              b2.y += ny * overlap * 0.5;

              // 2D Elastic momentum exchange
              const kx = b1.vx - b2.vx;
              const ky = b1.vy - b2.vy;
              const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);

              b1.vx -= p * b2.mass * nx;
              b1.vy -= p * b2.mass * ny;
              b2.vx += p * b1.mass * nx;
              b2.vy += p * b1.mass * ny;
            }
          }
        }
      }

      // 3. RENDER VIBRANT 3D COLORED BALLS
      for (let i = 0; i < N; i++) {
        const node = nodes[i];
        const r = node.currentR;
        const x = node.x;
        const y = node.y;
        const isHover = hoveredNode === node;

        ctx.save();

        // A. Soft Floor Drop Shadow Underneath
        ctx.beginPath();
        ctx.arc(x + 2.5, y + 5, r * 0.95, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 4, 15, 0.45)';
        ctx.fill();

        // B. Hover Luminous Neon Halo Ring
        if (isHover) {
          ctx.beginPath();
          ctx.arc(x, y, r + 6, 0, Math.PI * 2);
          ctx.fillStyle = node.color + '55';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, r + 2, 0, Math.PI * 2);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // C. 3D Spherical Volume with Signature Color Gradient
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);

        // Directional Key Light from top-left (creates real 3D depth)
        const lightX = x - r * 0.35;
        const lightY = y - r * 0.35;
        const sphereGrad = ctx.createRadialGradient(
          lightX,
          lightY,
          r * 0.08,
          x,
          y,
          r
        );

        if (isHover) {
          sphereGrad.addColorStop(0, '#ffffff');
          sphereGrad.addColorStop(0.25, node.colorLight);
          sphereGrad.addColorStop(0.7, node.color);
          sphereGrad.addColorStop(1, node.colorDark);
        } else {
          sphereGrad.addColorStop(0, '#ffffff');
          sphereGrad.addColorStop(0.2, node.colorLight);
          sphereGrad.addColorStop(0.68, node.color);
          sphereGrad.addColorStop(1, node.colorDark);
        }

        ctx.fillStyle = sphereGrad;
        ctx.fill();

        // D. Top-Left Specular Glint (Gloss Reflection)
        ctx.beginPath();
        ctx.arc(x - r * 0.4, y - r * 0.4, r * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();

        // E. Polished Edge Bevel Rim
        ctx.lineWidth = isHover ? 2.5 : 1.2;
        ctx.strokeStyle = isHover
          ? '#ffffff'
          : 'rgba(255, 255, 255, 0.45)';
        ctx.stroke();

        // F. Clean High-Contrast Typography
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 0.5;
        ctx.shadowOffsetY = 1;

        ctx.fillStyle = node.textColor || '#ffffff';

        const lines = node.lines;
        if (lines.length === 1) {
          const fontSize = Math.max(9.5, Math.min(13.5, Math.floor(r * 0.35)));
          ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
          ctx.fillText(lines[0], x, y + 0.5);
        } else {
          const fontSize = Math.max(8.5, Math.min(11.5, Math.floor(r * 0.29)));
          ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
          const lineSpacing = fontSize * 1.15;
          ctx.fillText(lines[0], x, y - lineSpacing * 0.48);
          ctx.fillText(lines[1], x, y + lineSpacing * 0.58);
        }

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
      className="relative w-full h-[360px] sm:h-[400px] md:h-[420px] rounded-2xl bg-transparent overflow-hidden mt-1 mb-0 select-none group [transform:translateZ(0)]"
    >
      {/* Central Ambient Depth Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_75%)] pointer-events-none" />

      {/* Main 2D/3D Floating Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing block [transform:translateZ(0)]"
      />
    </div>
  );
}

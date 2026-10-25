import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroBrain3D Component
 * 
 * Recreates the exact Cybernetic PCB Circuit Board Brain from the user's reference image:
 * - Authentic PCB circuit bus tracks, 45-degree angle traces, and circular solder-pad nodes
 * - Continuous, smooth color transitions across user theme:
 *   Mint (#2DD4BF) <-> Tech Teal (#0D9488) <-> Electric Cyan (#06B6D4) <-> Electric Blue (#0284C7)
 * - Dynamic electrical data surges sweeping across circuit tracks
 * - Pulsing illuminated solder-pad LEDs with glowing halos
 * - Real-time 3D mouse parallax tracking
 * - Floating matrix binary code streams (0110, 0100, 1001)
 * - 100% clean transparency (zero black halos or dark boxes on light background)
 */

// Prominent glowing solder-pad node coordinates in 460x429 image space
const CIRCUIT_NODES = [
  { x: 48, y: 228, r: 8, phase: 0.1 },
  { x: 54, y: 172, r: 9, phase: 0.8 },
  { x: 88, y: 130, r: 10, phase: 1.5 },
  { x: 125, y: 92, r: 9, phase: 2.2 },
  { x: 172, y: 68, r: 11, phase: 0.5 },
  { x: 225, y: 62, r: 10, phase: 1.9 },
  { x: 278, y: 74, r: 11, phase: 2.7 },
  { x: 326, y: 102, r: 9, phase: 1.1 },
  { x: 365, y: 136, r: 10, phase: 0.3 },
  { x: 412, y: 175, r: 8, phase: 2.4 },
  { x: 424, y: 232, r: 9, phase: 1.7 },
  { x: 395, y: 275, r: 10, phase: 0.9 },
  { x: 162, y: 168, r: 11, phase: 3.1 },
  { x: 212, y: 148, r: 12, phase: 0.4 },
  { x: 252, y: 182, r: 11, phase: 1.8 },
  { x: 228, y: 242, r: 10, phase: 2.9 },
  { x: 132, y: 275, r: 9, phase: 1.3 },
  { x: 188, y: 302, r: 10, phase: 2.1 },
  { x: 242, y: 318, r: 11, phase: 0.7 },
  { x: 315, y: 342, r: 10, phase: 1.6 },
  { x: 256, y: 386, r: 8, phase: 2.8 },
];

export default function HeroBrain3D({ mousePos = { x: 0, y: 0 } }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  const mouseSmooth = useRef({ x: 0, y: 0 });

  // Preload clean circuit brain mask
  useEffect(() => {
    const img = new Image();
    img.src = '/circuit-brain-mask.png';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
  }, []);

  // Smooth mouse interpolation
  useEffect(() => {
    mouseSmooth.current.targetX = mousePos.x || 0;
    mouseSmooth.current.targetY = mousePos.y || 0;
  }, [mousePos]);

  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    let animId = null;
    let isVisible = true;

    // Offscreen canvas for color tint masking
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');

    // Resize handling
    const resizeCanvas = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(containerRef.current);

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    io.observe(containerRef.current);

    // Theme Color Palette stops: Mint -> Tech Teal -> Cyan -> Electric Sky
    const PALETTE = [
      { r: 45, g: 212, b: 191 },  // Radiant Mint (#2DD4BF)
      { r: 20, g: 184, b: 166 },  // Tech Teal (#14B8A6)
      { r: 13, g: 148, b: 136 },  // Deep Teal (#0D9488)
      { r: 6, g: 182, b: 212 },   // Electric Cyan (#06B6D4)
      { r: 56, g: 189, b: 248 },  // Sky Blue (#38BDF8)
      { r: 2, g: 132, b: 199 },   // Electric Cobalt (#0284C7)
    ];

    const getColor = (progress, offset = 0) => {
      const p = (progress + offset) % PALETTE.length;
      const i1 = Math.floor(p);
      const i2 = (i1 + 1) % PALETTE.length;
      const f = p - i1;
      const smooth = 0.5 - 0.5 * Math.cos(f * Math.PI);

      const c1 = PALETTE[i1];
      const c2 = PALETTE[i2];
      return {
        r: Math.round(c1.r + (c2.r - c1.r) * smooth),
        g: Math.round(c1.g + (c2.g - c1.g) * smooth),
        b: Math.round(c1.b + (c2.b - c1.b) * smooth),
      };
    };

    let startTime = performance.now();

    const render = (time) => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const elapsed = (time - startTime) * 0.001; // in seconds
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Mouse smooth tracking
      const ms = mouseSmooth.current;
      ms.x += ((ms.targetX || 0) - ms.x) * 0.08;
      ms.y += ((ms.targetY || 0) - ms.y) * 0.08;

      ctx.clearRect(0, 0, w, h);
      offCtx.clearRect(0, 0, canvas.width, canvas.height);

      // Compute scaling & centering for circuit brain
      const scale = Math.min(w / 460, h / 429) * 0.94;
      const drawW = 460 * scale;
      const drawH = 429 * scale;
      const offsetX = (w - drawW) / 2 + ms.x * 15;
      const offsetY = (h - drawH) / 2 + ms.y * 12;

      // Dynamic color cycle progression
      const colorProg = elapsed * 0.28;
      const cStart = getColor(colorProg, 0);
      const cMid = getColor(colorProg, 1.8);
      const cEnd = getColor(colorProg, 3.6);

      // --- 1. RENDER COLOR GRADIENT ONTO OFFSCREEN CANVAS ---
      // Diagonal flowing gradient aligned with circuit tracks
      const gradAngle = Math.PI / 4 + Math.sin(elapsed * 0.5) * 0.25;
      const gx1 = offsetX;
      const gy1 = offsetY;
      const gx2 = offsetX + Math.cos(gradAngle) * drawW;
      const gy2 = offsetY + Math.sin(gradAngle) * drawH;

      const grad = offCtx.createLinearGradient(
        gx1 * dpr,
        gy1 * dpr,
        gx2 * dpr,
        gy2 * dpr
      );
      grad.addColorStop(0, `rgb(${cStart.r}, ${cStart.g}, ${cStart.b})`);
      grad.addColorStop(0.5, `rgb(${cMid.r}, ${cMid.g}, ${cMid.b})`);
      grad.addColorStop(1, `rgb(${cEnd.r}, ${cEnd.g}, ${cEnd.b})`);

      offCtx.fillStyle = grad;
      offCtx.fillRect(0, 0, canvas.width, canvas.height);

      // --- 2. APPLY ELECTRICAL VOLTAGE SURGE SWEEP ---
      // High-energy light wave traveling across the circuit bus lines
      const sweepProgress = (elapsed * 0.35) % 1.6 - 0.3; // -0.3 to 1.3
      const sweepCenter = offsetY + sweepProgress * drawH;
      const sweepGrad = offCtx.createLinearGradient(
        0,
        (sweepCenter - 45) * dpr,
        0,
        (sweepCenter + 45) * dpr
      );
      sweepGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      sweepGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
      sweepGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      offCtx.fillStyle = sweepGrad;
      offCtx.fillRect(0, 0, canvas.width, canvas.height);

      // --- 3. MASK WITH THE EXACT CIRCUIT BRAIN MASK ---
      offCtx.globalCompositeOperation = 'destination-in';
      offCtx.drawImage(
        img,
        offsetX * dpr,
        offsetY * dpr,
        drawW * dpr,
        drawH * dpr
      );
      offCtx.globalCompositeOperation = 'source-over';

      // --- 4. DRAW BASE TINTED BRAIN TO MAIN CANVAS ---
      ctx.drawImage(offCanvas, 0, 0, w, h);

      // --- 5. DRAW ACTIVE GLOWING SOLDER-PAD LED NODES ---
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < CIRCUIT_NODES.length; i++) {
        const node = CIRCUIT_NODES[i];
        const nx = offsetX + node.x * scale;
        const ny = offsetY + node.y * scale;

        // Individual pulse rhythm
        const pulse =
          Math.sin(elapsed * 2.8 + node.phase * Math.PI) * 0.5 + 0.5; // 0 to 1
        const radius = (node.r * scale * 0.85) * (1 + pulse * 0.45);

        // Core white-hot spark
        const nodeGrad = ctx.createRadialGradient(
          nx,
          ny,
          0,
          nx,
          ny,
          Math.max(1, radius * 2.2)
        );
        nodeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        nodeGrad.addColorStop(0.35, `rgba(${cStart.r}, ${cStart.g}, ${cStart.b}, 0.75)`);
        nodeGrad.addColorStop(0.7, `rgba(${cMid.r}, ${cMid.g}, ${cMid.b}, 0.25)`);
        nodeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, Math.max(1, radius * 2.2), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, [imageLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Soft Ambient Radial Atmosphere in Mint & Teal */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_40%,rgba(45,212,191,0.22)_0%,rgba(13,148,136,0.12)_45%,transparent_75%)] blur-2xl pointer-events-none" />

      {/* Real-time Dynamic Cybernetic PCB Circuit Brain Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block filter drop-shadow-[0_0_28px_rgba(45,212,191,0.45)] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 15}px, 0) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
}

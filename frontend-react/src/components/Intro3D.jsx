import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Intro3D({ onEnterPortfolio }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05080f, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.6, 5.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // --- 2. LIGHTING ---
    // Overhead dramatic spotlight
    const topSpot = new THREE.SpotLight(0xffffff, 25);
    topSpot.position.set(0, 7, 2);
    topSpot.angle = Math.PI / 4.5;
    topSpot.penumbra = 0.8;
    scene.add(topSpot);

    // Neon Green / Lime Point Light inside the portal
    const neonPortalLight = new THREE.PointLight(0xa3e635, 12, 8);
    neonPortalLight.position.set(0, -0.15, 0.2);
    scene.add(neonPortalLight);

    // Subtle blue rim light from behind
    const rimLight = new THREE.DirectionalLight(0x0891b2, 1.2);
    rimLight.position.set(0, 2, -4);
    scene.add(rimLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x0c1a2e, 0.8);
    scene.add(ambientLight);

    // --- 3. 3D OBJECTS (HOLOGRAPHIC CYBER PORTAL & REFLECTIVE WATER) ---
    const group = new THREE.Group();
    scene.add(group);

    // Futuristic Holographic Portal Gateway (Sleek, luminous, cybernetic - completely removed black stone)
    // 1. Gateway Neon Frame Pillars & Beam
    const frameMat = new THREE.MeshBasicMaterial({
      color: 0xbef264,
      transparent: true,
      opacity: 0.9,
    });
    const accentMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.85,
    });

    const pillarGeo = new THREE.CylinderGeometry(0.022, 0.022, 2.1, 12);
    const leftPillar = new THREE.Mesh(pillarGeo, frameMat);
    leftPillar.position.set(-0.68, -0.3, 0);
    group.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, frameMat);
    rightPillar.position.set(0.68, -0.3, 0);
    group.add(rightPillar);

    const beamGeo = new THREE.CylinderGeometry(0.022, 0.022, 1.36, 12);
    const topBeam = new THREE.Mesh(beamGeo, frameMat);
    topBeam.rotation.z = Math.PI / 2;
    topBeam.position.set(0, 0.75, 0);
    group.add(topBeam);

    // Glowing corner nodes
    const cornerGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const c1 = new THREE.Mesh(cornerGeo, accentMat);
    c1.position.set(-0.68, 0.75, 0);
    const c2 = new THREE.Mesh(cornerGeo, accentMat);
    c2.position.set(0.68, 0.75, 0);
    group.add(c1);
    group.add(c2);

    // 2. Inner Luminous Holographic Energy Field
    const portalFieldGeo = new THREE.PlaneGeometry(1.32, 2.1);
    const portalFieldMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const portalField = new THREE.Mesh(portalFieldGeo, portalFieldMat);
    portalField.position.set(0, -0.3, 0);
    group.add(portalField);

    // 3. Rotating Holographic Quantum Energy Rings
    const ring1Geo = new THREE.TorusGeometry(1.38, 0.014, 16, 72);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.68, 0.011, 16, 72);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    group.add(ring2);

    // 4. Luminous Base Ripple Emitter on Water
    const baseEmitterGeo = new THREE.RingGeometry(0.15, 1.35, 36);
    const baseEmitterMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const baseEmitter = new THREE.Mesh(baseEmitterGeo, baseEmitterMat);
    baseEmitter.rotation.x = -Math.PI / 2;
    baseEmitter.position.set(0, -0.84, 0);
    scene.add(baseEmitter);

    // Reflective Water Surface Plane
    const waterGeo = new THREE.PlaneGeometry(30, 30);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x03060c,
      roughness: 0.12,
      metalness: 0.85,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.85;
    scene.add(waterMesh);

    // --- 3.5 ANIMATED 3D NEURAL NETWORK IN BACKGROUND (EXPANDED DENSITY) ---
    const neuralGroup = new THREE.Group();
    neuralGroup.position.set(0, 0.4, -1.2);
    scene.add(neuralGroup);

    const nodeCount = 145;
    const maxLineSegments = 850;

    // Initial node positions & velocities
    const nodesData = [];
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    const colorLime = new THREE.Color(0xa3e635);
    const colorCyan = new THREE.Color(0x22d3ee);
    const colorEmerald = new THREE.Color(0x34d399);

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.25) * 8;
      const z = (Math.random() - 0.5) * 7 - 0.8;

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodesData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: 0.35 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
        radius: 0.2 + Math.random() * 0.35,
        isHub: i % 7 === 0, // Special pulsing hub neuron
      });

      // Gradient color between lime, emerald, and cyan
      const randColor =
        Math.random() < 0.5
          ? colorLime.clone().lerp(colorCyan, Math.random())
          : colorLime.clone().lerp(colorEmerald, Math.random());

      nodeColors[i * 3] = randColor.r;
      nodeColors[i * 3 + 1] = randColor.g;
      nodeColors[i * 3 + 2] = randColor.b;
    }

    // Node Points Geometry
    const nodesGeo = new THREE.BufferGeometry();
    nodesGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodesGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodesMat = new THREE.PointsMaterial({
      size: 0.095,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const nodesPoints = new THREE.Points(nodesGeo, nodesMat);
    neuralGroup.add(nodesPoints);

    // Synaptic Lines Geometry (Dynamic Buffer)
    const linePositions = new Float32Array(maxLineSegments * 2 * 3);
    const lineColors = new Float32Array(maxLineSegments * 2 * 3);

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    linesGeo.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const neuralLines = new THREE.LineSegments(linesGeo, linesMat);
    neuralGroup.add(neuralLines);

    // Ambient floating 3D dust particles
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 16;
      particlePos[i + 1] = Math.random() * 7 - 0.5;
      particlePos[i + 2] = (Math.random() - 0.5) * 9;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa3e635,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 4. INTERACTION & MOUSE PARALLAX ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- 5. ANIMATION LOOP ---
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Smooth mouse parallax lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Group floating & tilt
      group.rotation.y = targetX * 0.25 + Math.sin(time * 0.4) * 0.04;
      group.rotation.x = -targetY * 0.15 + 0.05;
      group.position.y = Math.sin(time * 0.8) * 0.03;

      // Animate Holographic Energy Rings
      ring1.rotation.z = time * 0.35;
      ring1.rotation.x = 0.35 + Math.sin(time * 0.5) * 0.12;
      ring2.rotation.z = -time * 0.28;
      ring2.rotation.y = -0.28 + Math.cos(time * 0.4) * 0.1;

      // Pulse Energy Field & Base Emitter
      portalFieldMat.opacity = 0.18 + Math.sin(time * 3) * 0.07;
      baseEmitterMat.opacity = 0.28 + Math.sin(time * 2.5) * 0.08;

      // Pulse neon light
      neonPortalLight.intensity = 10 + Math.sin(time * 4) * 2.5;

      // Animate Neural Network Nodes
      const currentPos = nodesGeo.attributes.position.array;
      for (let i = 0; i < nodeCount; i++) {
        const d = nodesData[i];
        currentPos[i * 3] = d.baseX + Math.sin(time * d.speed + d.phase) * d.radius;
        currentPos[i * 3 + 1] = d.baseY + Math.cos(time * d.speed * 0.9 + d.phase) * d.radius;
        currentPos[i * 3 + 2] = d.baseZ + Math.sin(time * d.speed * 0.7 + d.phase) * (d.radius * 0.7);
      }
      nodesGeo.attributes.position.needsUpdate = true;

      // Calculate Neural Synapses (Interconnections with Enhanced Proximity)
      const connectDist = 2.45;
      let lineIndex = 0;
      const lPos = linesGeo.attributes.position.array;
      const lCol = linesGeo.attributes.color.array;

      for (let i = 0; i < nodeCount; i++) {
        const x1 = currentPos[i * 3];
        const y1 = currentPos[i * 3 + 1];
        const z1 = currentPos[i * 3 + 2];

        for (let j = i + 1; j < nodeCount; j++) {
          const x2 = currentPos[j * 3];
          const y2 = currentPos[j * 3 + 1];
          const z2 = currentPos[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectDist && lineIndex < maxLineSegments) {
            // Segment start
            const ptr = lineIndex * 6;
            lPos[ptr] = x1;
            lPos[ptr + 1] = y1;
            lPos[ptr + 2] = z1;

            // Segment end
            lPos[ptr + 3] = x2;
            lPos[ptr + 4] = y2;
            lPos[ptr + 5] = z2;

            // Line brightness based on proximity + subtle pulsing
            const alpha = Math.max(0.12, 1 - dist / connectDist);
            const pulse = 0.85 + Math.sin(time * 3 + i) * 0.15;

            lCol[ptr] = 0.64 * alpha * pulse;     // R
            lCol[ptr + 1] = 0.95 * alpha * pulse; // G
            lCol[ptr + 2] = 0.25 * alpha * pulse; // B

            lCol[ptr + 3] = 0.14 * alpha * pulse; // R
            lCol[ptr + 4] = 0.83 * alpha * pulse; // G
            lCol[ptr + 5] = 0.93 * alpha * pulse; // B

            lineIndex++;
          }
        }
      }

      linesGeo.setDrawRange(0, lineIndex * 2);
      linesGeo.attributes.position.needsUpdate = true;
      linesGeo.attributes.color.needsUpdate = true;

      // Neural group rotation with subtle organic wave & mouse parallax
      neuralGroup.rotation.y = time * 0.04 + targetX * 0.12;
      neuralGroup.rotation.x = Math.sin(time * 0.03) * 0.05 - targetY * 0.08;

      // Slowly drift particles
      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // --- 6. RESIZE HANDLER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Expose transition method to window / component
    containerRef.current._enterPortfolio = () => {
      setIsEntering(true);
      const tl = gsap.timeline({
        onComplete: () => {
          if (onEnterPortfolio) onEnterPortfolio();
        },
      });

      // Camera zooms deep into the glowing portal
      tl.to(camera.position, {
        z: 0.9,
        y: -0.2,
        duration: 1.2,
        ease: 'power3.inOut',
      })
        .to(
          textRef.current,
          {
            scale: 1.8,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.in',
          },
          0
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          0.9
        );
    };

    // Keyboard & scroll wheel triggers to enter
    let isTransitionTriggered = false;
    const triggerEnter = () => {
      if (isTransitionTriggered) return;
      isTransitionTriggered = true;
      if (containerRef.current && containerRef.current._enterPortfolio) {
        containerRef.current._enterPortfolio();
      }
    };

    const handleWheel = (e) => {
      if (e.deltaY > 30) {
        triggerEnter();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        triggerEnter();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      renderer.dispose();
    };
  }, [onEnterPortfolio]);

  const handleEnterClick = () => {
    if (containerRef.current && containerRef.current._enterPortfolio) {
      containerRef.current._enterPortfolio();
    }
  };

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative w-full h-screen bg-[#03060c] overflow-hidden select-none flex items-center justify-center z-50"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Atmospheric Top Spotlight Fog Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

      {/* Designer Crop / Framed Selection Overlay (as in reference image) */}
      <div className="absolute inset-8 sm:inset-14 md:inset-20 border border-white/10 rounded-2xl pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6">
        {/* Top bar */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="inline-block text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-lime-400 uppercase bg-lime-950/40 border border-lime-500/30 px-2.5 py-1 rounded">
              AI Developer
            </span>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">
              Machine Learning &bull; Deep Learning
            </p>
          </div>
          {/* Top-Right Decorative Crop Dot */}
          <div className="w-2.5 h-2.5 border border-white/40 bg-white/10 rounded-sm" />
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end">
          <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
            3D INTERACTIVE PORTAL
          </div>
          {/* Decorative cursor crosshair / anchor */}
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <span>✛</span>
            <span>2026.PRO</span>
          </div>
        </div>
      </div>

      {/* Layered Massive Typography (Replicating "Port folio" with exact color split) */}
      <div
        ref={textRef}
        className="relative z-20 pointer-events-none text-center flex flex-col items-center justify-center"
      >
        <div className="relative">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-black tracking-tighter leading-none flex items-center justify-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
            <span className="text-white">Port</span>
            <span className="text-[#bef264] drop-shadow-[0_0_35px_rgba(190,242,100,0.55)]">
              folio
            </span>
          </h1>

          {/* Elegant Handwritten Signature: "Ravi Kumar" (like the reference image's signature) */}
          <div className="absolute -bottom-6 sm:-bottom-8 right-2 sm:right-6 pointer-events-none transform -rotate-3 text-right">
            <span className="font-['Caveat',cursive] text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Ravi Kumar
            </span>
            {/* Signature Underline Flourish */}
            <svg
              className="w-28 sm:w-44 h-4 ml-auto text-lime-400 opacity-90 -mt-1"
              viewBox="0 0 160 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 2 12 Q 50 1, 100 10 T 158 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom CTA: Enter Portfolio Button */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <button
          onClick={handleEnterClick}
          disabled={isEntering}
          className="group relative px-8 py-3.5 rounded-full bg-black/60 hover:bg-black/80 border border-lime-400/50 hover:border-lime-400 text-white font-bold text-xs uppercase tracking-widest backdrop-blur-xl shadow-[0_0_25px_rgba(163,230,53,0.3)] hover:shadow-[0_0_40px_rgba(163,230,53,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
          <span className="bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
            {isEntering ? 'Entering Portal...' : 'Enter Portfolio'}
          </span>
          <span className="text-lime-400 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>

        {/* Scroll hint */}
        <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 animate-pulse">
          Click button or scroll down to open
        </p>
      </div>
    </section>
  );
}

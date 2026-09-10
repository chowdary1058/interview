import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AIInterviewerCoreProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  className?: string;
  intensity?: number;
  interactive?: boolean;
  compact?: boolean;
}

export const AIInterviewerCore: React.FC<AIInterviewerCoreProps> = ({
  isSpeaking = false,
  isListening = false,
  className = '',
  intensity = 1,
  interactive = true,
  compact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    isSpeaking,
    isListening,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    scrollY: 0,
  });

  stateRef.current.isSpeaking = isSpeaking;
  stateRef.current.isListening = isListening;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Renderer with high performance settings
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(compact ? 45 : 50, width / height, 0.1, 100);
    camera.position.z = compact ? 4.2 : 5.0;

    // Group to hold all 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Holographic Core Sphere (Inner Wireframe Core)
    const coreGeo = new THREE.IcosahedronGeometry(compact ? 0.9 : 1.2, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x3b82f6),
      emissive: new THREE.Color(0x1d4ed8),
      emissiveIntensity: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      roughness: 0.2,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Inner Glowing Energy Nucleus
    const innerGeo = new THREE.SphereGeometry(compact ? 0.5 : 0.7, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x06b6d4),
      transparent: true,
      opacity: 0.55,
      wireframe: false,
    });
    const innerNucleus = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerNucleus);

    // 3. Floating Orbital Particle Shell
    const particleCount = compact ? 90 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVelocities: number[] = [];

    const radius = compact ? 1.6 : 2.1;
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius + (Math.random() - 0.5) * 0.4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particlePos[i * 3] = x;
      particlePos[i * 3 + 1] = y;
      particlePos[i * 3 + 2] = z;

      particleVelocities.push((Math.random() - 0.5) * 0.005);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      size: compact ? 0.045 : 0.065,
      color: new THREE.Color(0x67e8f9),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleCloud);

    // 4. Outer Ring Gyroscope
    const ringGeo = new THREE.TorusGeometry(compact ? 1.8 : 2.4, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x818cf8),
      emissive: new THREE.Color(0x4f46e5),
      emissiveIntensity: 0.9,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 6;
    mainGroup.add(ringMesh2);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 3.0);
    scene.add(ambientLight);

    const pointLightBlue = new THREE.PointLight(0x38bdf8, 5, 20);
    pointLightBlue.position.set(3, 4, 3);
    scene.add(pointLightBlue);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 4, 20);
    pointLightPurple.position.set(-3, -3, 2);
    scene.add(pointLightPurple);

    // Mouse Tracking Event
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.targetMouseX = x;
      stateRef.current.targetMouseY = y;
    };

    const handleScroll = () => {
      stateRef.current.scrollY = window.scrollY;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const { isSpeaking: speaking, isListening: listening, scrollY } = stateRef.current;

      // Mouse Lerp
      stateRef.current.mouseX += (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.05;
      stateRef.current.mouseY += (stateRef.current.targetMouseY - stateRef.current.mouseY) * 0.05;

      const rotMultiplier = speaking ? 1.8 : listening ? 1.3 : 1.0;
      const speed = 0.35 * rotMultiplier * intensity;

      // Core rotation
      coreMesh.rotation.y = elapsedTime * speed + stateRef.current.mouseX * 0.5;
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.4) * 0.2 + stateRef.current.mouseY * 0.5;

      // Pulsating breath scale
      const pulseSpeed = speaking ? 7.0 : listening ? 4.5 : 2.2;
      const pulseAmp = speaking ? 0.14 : listening ? 0.08 : 0.04;
      const scale = 1.0 + Math.sin(elapsedTime * pulseSpeed) * pulseAmp;
      coreMesh.scale.set(scale, scale, scale);

      // Inner nucleus breathing
      const innerScale = 1.0 + Math.cos(elapsedTime * pulseSpeed * 1.2) * (pulseAmp * 1.3);
      innerNucleus.scale.set(innerScale, innerScale, innerScale);

      // Outer rings counter-rotation
      ringMesh1.rotation.z += 0.006 * rotMultiplier;
      ringMesh1.rotation.y += 0.004 * rotMultiplier;
      ringMesh2.rotation.x += 0.005 * rotMultiplier;
      ringMesh2.rotation.z -= 0.003 * rotMultiplier;

      // Particle cloud rotation
      particleCloud.rotation.y = -elapsedTime * 0.15;
      particleCloud.rotation.x = Math.cos(elapsedTime * 0.2) * 0.1;

      // Scroll-driven camera parallax
      const scrollOffset = Math.min(scrollY * 0.0015, 1.2);
      mainGroup.position.y = -scrollOffset * 0.4;
      mainGroup.rotation.y = (elapsedTime * 0.05) + (scrollOffset * 0.8);

      // Camera parallax with subtle mouse follow
      camera.position.x = stateRef.current.mouseX * 0.35;
      camera.position.y = stateRef.current.mouseY * 0.35;
      camera.lookAt(0, 0, 0);

      // Color reactive states
      if (speaking) {
        coreMat.emissive.setHex(0x38bdf8); // vibrant cyan
        coreMat.emissiveIntensity = 1.3 + Math.sin(elapsedTime * 8) * 0.4;
        innerMat.color.setHex(0x60a5fa);
      } else if (listening) {
        coreMat.emissive.setHex(0x10b981); // energetic emerald green
        coreMat.emissiveIntensity = 1.0 + Math.sin(elapsedTime * 6) * 0.3;
        innerMat.color.setHex(0x34d399);
      } else {
        coreMat.emissive.setHex(0x3b82f6); // electric blue
        coreMat.emissiveIntensity = 0.8 + Math.sin(elapsedTime * 2) * 0.15;
        innerMat.color.setHex(0x06b6d4);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('scroll', handleScroll);

      // Clean disposal
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [interactive, compact, intensity]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden pointer-events-auto ${className}`}
      style={{ minHeight: compact ? '200px' : '360px' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      {/* Subtle ambient back-glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div
          className={`w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-700 ${
            isSpeaking
              ? 'bg-cyan-500/20'
              : isListening
              ? 'bg-emerald-500/20'
              : 'bg-blue-600/15'
          }`}
        />
      </div>
    </div>
  );
};

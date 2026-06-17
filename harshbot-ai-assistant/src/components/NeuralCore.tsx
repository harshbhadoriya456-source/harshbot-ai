import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Cpu, Sparkles, Network, Radar, Activity } from "lucide-react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  id: number;
  color: string;
  sizeMultiplier: number;
  pulsePhase: number;
}

interface OrbitNode {
  id: string;
  name: string;
  angleOffset: number;
  tilt: number;
  radius: number;
  speed: number;
  color: string;
}

interface NeuralCoreProps {
  onSelectTopic: (topic: string) => void;
  scaleProgress: number; // 1 to 0.48 based on scroll
  fadeProgress: number;  // 1 to 0 based on scroll
}

export default function NeuralCore({ onSelectTopic, scaleProgress = 1, fadeProgress = 1 }: NeuralCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High fidelity mouse parallax offsets
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 });
  const [hoveredOrbitId, setHoveredOrbitId] = useState<string | null>(null);
  const [sysStability, setSysStability] = useState(99.4);
  const [sysLatency, setSysLatency] = useState(14);

  // States for 3D projected points
  const [projectedPoints, setProjectedPoints] = useState<{ x: number; y: number; z: number; size: number; alpha: number; id: number; color: string }[]>([]);
  const [projectedOrbits, setProjectedOrbits] = useState<{ id: string; name: string; x: number; y: number; z: number; color: string }[]>([]);

  // Local constants for high-density drawing
  const coreParticlesCount = 120; // Hundreds of glowing particles as requested!
  const sphereRadius = 145;

  const coreNodesRef = useRef<Node3D[]>([]);
  const angleRef = useRef({ yaw: 0.002, pitch: 0.0015, time: 0 });

  // Initialize particles with different size ratios & pulse indexes
  useEffect(() => {
    const points: Node3D[] = [];
    for (let i = 0; i < coreParticlesCount; i++) {
      // Golden spiral distribution on sphere for structural perfection
      const theta = Math.acos(-1 + (2 * i) / coreParticlesCount);
      const phi = Math.sqrt(coreParticlesCount * Math.PI) * theta;
      
      const r = sphereRadius * (0.8 + 0.25 * Math.random()); // Add organic texture depth
      const colorAlt = i % 3;
      const colorHex = colorAlt === 0 ? "#7C3AED" : colorAlt === 1 ? "#14B8A6" : "#3B82F6"; // Purple, Teal, Blue energy!

      points.push({
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(theta),
        id: i,
        color: colorHex,
        sizeMultiplier: 0.5 + Math.random() * 0.9,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    coreNodesRef.current = points;

    // Simulation of active neural diagnostics telemetry on intervals
    const interval = setInterval(() => {
      setSysStability(Number((99.2 + Math.random() * 0.6).toFixed(2)));
      setSysLatency(Math.floor(10 + Math.random() * 8));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Orbiting Knowledge node definitions as requested
  const orbitNodesRef = useRef<OrbitNode[]>([
    { id: "py", name: "Python", angleOffset: 0, tilt: 0.35, radius: 230, speed: 0.007, color: "#7C3AED" },
    { id: "react", name: "React", angleOffset: Math.PI / 4, tilt: -0.25, radius: 260, speed: 0.0055, color: "#0ea5e9" },
    { id: "ai", name: "AI", angleOffset: Math.PI / 2, tilt: 0.45, radius: 290, speed: 0.0045, color: "#f59e0b" },
    { id: "dsa", name: "DSA", angleOffset: (3 * Math.PI) / 4, tilt: -0.4, radius: 240, speed: 0.0065, color: "#8b5cf6" },
    { id: "git", name: "GitHub", angleOffset: Math.PI, tilt: 0.15, radius: 270, speed: 0.0035, color: "#3B82F6" },
    { id: "os", name: "Open Source", angleOffset: (5 * Math.PI) / 4, tilt: -0.15, radius: 220, speed: 0.008, color: "#14b8a6" },
    { id: "ml", name: "Machine Learning", angleOffset: (3 * Math.PI) / 2, tilt: 0.55, radius: 250, speed: 0.005, color: "#ec4899" },
    { id: "prompt", name: "Prompt Engineering", angleOffset: (7 * Math.PI) / 4, tilt: -0.5, radius: 280, speed: 0.004, color: "#10b981" },
  ]);

  // Track cursor coordinates relative to center of the visual core
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTargetMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setTargetMouse({ x: 0, y: 0 });
  };

  // Interpolation helper for smooth spring-like feel
  useEffect(() => {
    let interpolateId: number;
    const smoothMouse = () => {
      setMousePos(prev => ({
        x: prev.x + (targetMouse.x - prev.x) * 0.1,
        y: prev.y + (targetMouse.y - prev.y) * 0.1
      }));
      interpolateId = requestAnimationFrame(smoothMouse);
    };
    interpolateId = requestAnimationFrame(smoothMouse);
    return () => cancelAnimationFrame(interpolateId);
  }, [targetMouse]);

  // Comprehensive 3D Coordinate rotation iteration
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      angleRef.current.time += 0.015;
      
      // Calculate dynamic speed rotation including cursor offsets (Jarvis style response)
      const yawSpeed = 0.003 + mousePos.x * 0.012;
      const pitchSpeed = 0.0025 + mousePos.y * 0.012;
      
      angleRef.current.yaw = yawSpeed;
      angleRef.current.pitch = pitchSpeed;

      const cosY = Math.cos(yawSpeed);
      const sinY = Math.sin(yawSpeed);
      const cosP = Math.cos(pitchSpeed);
      const sinP = Math.sin(pitchSpeed);

      // Organic slow breathing pulse factor
      const breathScale = 1.0 + 0.08 * Math.sin(angleRef.current.time * 2.0);

      // Rotate nodes in 3D
      coreNodesRef.current = coreNodesRef.current.map(pt => {
        // Yaw (Rotation around Y axis)
        let x1 = pt.x * cosY - pt.z * sinY;
        let z1 = pt.z * cosY + pt.x * sinY;

        // Pitch (Rotation around X axis)
        let y2 = pt.y * cosP - z1 * sinP;
        let z2 = z1 * cosP + pt.y * sinP;

        return { ...pt, x: x1, y: y2, z: z2 };
      });

      // Project core nodes to 2D
      const projectionDistance = 450;
      const flatPoints = coreNodesRef.current.map(pt => {
        // Breath & offset scaling
        const bx = pt.x * breathScale;
        const by = pt.y * breathScale;
        const bz = pt.z * breathScale;

        // Perspective ratio formula
        const depthRatio = (bz + projectionDistance) / projectionDistance;
        
        // Size scales based on depth & pulse phase
        const pulseEffect = 1.0 + 0.3 * Math.sin(angleRef.current.time * 4 + pt.pulsePhase);
        const size = Math.max(0.8, Math.min(6.5, 2.2 * depthRatio * pt.sizeMultiplier * pulseEffect));
        const alpha = Math.max(0.12, Math.min(1.0, 0.35 + (bz / sphereRadius) * 0.55));

        return {
          x: bx * depthRatio + mousePos.x * 35 * depthRatio, // Mouse dependency parallax shift
          y: by * depthRatio + mousePos.y * 35 * depthRatio,
          z: bz,
          size,
          alpha,
          id: pt.id,
          color: pt.color
        };
      });

      setProjectedPoints(flatPoints);

      // Project Orbit nodes
      const flatOrbits = orbitNodesRef.current.map(orbit => {
        const currentAngle = angleRef.current.time * orbit.speed * 30 + orbit.angleOffset;
        
        // Initial coordinates of orbit path
        let x3 = orbit.radius * Math.cos(currentAngle);
        let y3 = 0;
        let z3 = orbit.radius * Math.sin(currentAngle);

        // Apply specific orbit structural tilt
        const cosT = Math.cos(orbit.tilt);
        const sinT = Math.sin(orbit.tilt);
        let yTilt = y3 * cosT - z3 * sinT;
        let zTilt = z3 * cosT + y3 * sinT;

        // Rotate in coordination with overall core
        let rx = x3 * cosY - zTilt * sinY;
        let rz1 = zTilt * cosY + x3 * sinY;
        let ry = yTilt * cosP - rz1 * sinP;
        let rz = rz1 * cosP + yTilt * sinP;

        // Scale factors
        const depthRatio = (rz + projectionDistance) / projectionDistance;

        // Mouse organic attraction pull multiplier
        const attractionX = mousePos.x * 25 * depthRatio;
        const attractionY = mousePos.y * 25 * depthRatio;

        return {
          id: orbit.id,
          name: orbit.name,
          x: rx * depthRatio + attractionX,
          y: ry * depthRatio + attractionY,
          z: rz,
          color: orbit.color
        };
      });

      setProjectedOrbits(flatOrbits);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full h-[520px] md:h-[630px] cursor-crosshair overflow-visible select-none"
    >
      {/* Absolute futuristic holographic diagnostic widgets on borders (Jarvis style) */}
      <AnimatePresence>
        {fadeProgress > 0.8 && (
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 text-[9px] font-mono text-gray-500 max-w-full">
            {/* Top row diagnostics */}
            <div className="flex justify-between items-start">
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 0.7, x: 0 }} 
                className="space-y-1"
              >
                <div className="text-violet-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                  <span>NUCLEUS COGNITIVE CORE</span>
                </div>
                <div>SECURE LEVEL: COMPLY PROJECTION</div>
                <div className="text-teal-400 text-[10px]">STABILITY: {sysStability}%</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 0.7, x: 0 }} 
                className="text-right space-y-0.5"
              >
                <div>NEURAL SYNC DETECT: ACTIVE</div>
                <div>PING TIMEOUT: {sysLatency}ms</div>
                <div className="text-xs font-bold text-violet-300">JARVIS V.4.9</div>
              </motion.div>
            </div>

            {/* Bottom row metrics */}
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Radar className="w-3 h-3 text-cyan-400 animate-spin" />
                  <span>PARALLAX CORRECTION: {Number((mousePos.x * 100).toFixed(1))}°</span>
                </div>
                <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-violet-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(10, (sysStability - 90) * 10))}%` }}
                  />
                </div>
              </div>

              <div className="text-right text-[8px] text-gray-600 tracking-wider">
                COGNITIVE CHOPSTREAM • GEMINI LIVE INTERACTIVE
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Layered glowing aurora backdrops */}
      <div 
        style={{ opacity: fadeProgress * 0.85 }}
        className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-violet-600/10 via-blue-600/10 to-teal-500/10 blur-[110px] pointer-events-none transition-all duration-500"
      />
      
      {/* High-contrast neon target scanners */}
      <div 
        style={{ 
          transform: `scale(${scaleProgress * 1.15}) rotateX(75deg) rotateY(10deg)`,
          opacity: fadeProgress * 0.1 
        }}
        className="absolute w-[490px] h-[490px] border border-cyan-400 rounded-full animate-slow-spin pointer-events-none"
      />
      <div 
        style={{ 
          transform: `scale(${scaleProgress * 0.95}) rotateX(-60deg) rotateY(-30deg)`,
          opacity: fadeProgress * 0.08 
        }}
        className="absolute w-[390px] h-[390px] border border-violet-500 rounded-full animate-slow-reverse-spin pointer-events-none"
      />

      {/* Primary vector neural mesh Canvas */}
      <svg
        width="100%"
        height="100%"
        viewBox="-350 -350 700 700"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ 
          transform: `scale(${scaleProgress})`,
          transition: "transform 100ms ease-out"
        }}
      >
        <defs>
          <radialGradient id="jarvisPulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#0d0d20" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#030309" stopOpacity="0" />
          </radialGradient>
          <filter id="vectorGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Brain radial underlay */}
        <circle r="195" fill="url(#jarvisPulseGlow)" />

        {/* Particle connections vector grid */}
        {projectedPoints.map((p1, idx) => {
          // Optimize inner lines matrix loops for rendering performance, only link proximate particles
          const searchRange = Math.min(coreParticlesCount, idx + 14);
          return projectedPoints.slice(idx + 1, searchRange).map((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.hypot(dx, dy);

            if (distance < 78) {
              const midZ = (p1.z + p2.z) / 2;
              
              // Map connection intensity to depth and proximities
              const alphaFactor = (1.0 - distance / 78) * 0.28 * ((midZ + sphereRadius) / (2 * sphereRadius)) * fadeProgress;
              if (alphaFactor <= 0) return null;

              // Color energy matching depth parameters
              const strokeColor = p1.z > 0 ? (p2.id % 2 === 0 ? "#7C3AED" : "#14B8A6") : "#3B82F6";

              return (
                <line
                  key={`vector-line-${p1.id}-${p2.id}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={strokeColor}
                  strokeWidth={p1.z > 50 ? "1.15" : "0.75"}
                  strokeOpacity={alphaFactor}
                />
              );
            }
            return null;
          });
        })}

        {/* Center glowing nuclear reactor design */}
        <g filter="url(#vectorGlow)" opacity={fadeProgress}>
          {/* Concentric high tech geometric rings */}
          <circle r="40" fill="none" stroke="#7C3AED" strokeWidth="0.8" strokeDasharray="3,15" opacity="0.4" />
          <circle r="22" fill="none" stroke="#14B8A6" strokeWidth="1.2" strokeDasharray="5,5" opacity="0.5" />
          <circle r="9" fill="#14B8A6" opacity="0.7" />
          <circle r="3" fill="#FFFFFF" />
        </g>

        {/* Orbit indicators linkages */}
        {projectedOrbits.map((orbit) => {
          // Tie each outer orbiting concept directly to deep corresponding core nodes
          const closestNodeIndex = Math.abs(orbit.name.charCodeAt(0) % coreParticlesCount);
          const anchor = projectedPoints[closestNodeIndex] || projectedPoints[0];
          
          if (!anchor) return null;
          const linkAlpha = 0.12 * fadeProgress;

          return (
            <g key={`orbit-line-g-${orbit.id}`} opacity={linkAlpha}>
              {/* Dynamic target lock vectors */}
              <line
                x1={orbit.x}
                y1={orbit.y}
                x2={anchor.x}
                y2={anchor.y}
                stroke={orbit.color}
                strokeWidth="0.9"
                strokeDasharray="3,6"
              />
              <circle cx={orbit.x} cy={orbit.y} r="18" fill="none" stroke={orbit.color} strokeWidth="0.5" strokeDasharray="1,2" />
            </g>
          );
        })}

        {/* Solid Particle cores projection */}
        {projectedPoints.map((p) => {
          // Depth variables
          const sizeGlow = p.size;
          return (
            <g key={`pt-projection-${p.id}`} opacity={p.alpha * fadeProgress}>
              <circle
                cx={p.x}
                cy={p.y}
                r={sizeGlow}
                fill={p.color}
                filter={p.z > 80 ? "url(#vectorGlow)" : undefined}
              />
              {/* Extra white core point for intense bright sparks */}
              {p.z > 100 && (
                <circle cx={p.x} cy={p.y} r={sizeGlow * 0.45} fill="#FFFFFF" />
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating Interactive Skill Cards Orbiting around Core */}
      <AnimatePresence>
        {projectedOrbits.map((orbit) => {
          const zScale = 0.72 + (orbit.z + sphereRadius) / (2 * sphereRadius) * 0.52;
          const itemOpacity = Math.max(0.18, Math.min(1.0, 0.45 + (orbit.z + 100) / 250 * 0.55)) * fadeProgress;
          const isFront = orbit.z > -30;

          return (
            <div
              key={`orbit-html-label-${orbit.id}`}
              style={{
                position: "absolute",
                transform: `translate(${orbit.x}px, ${orbit.y}px) scale(${zScale * scaleProgress})`,
                zIndex: isFront ? 35 : 10,
                opacity: itemOpacity,
                transition: "transform 120ms ease-out, opacity 150ms ease-out",
                pointerEvents: itemOpacity > 0.35 ? "auto" : "none",
              }}
              className="absolute pointer-events-auto"
            >
              <div
                onClick={() => onSelectTopic(orbit.name)}
                onMouseEnter={() => setHoveredOrbitId(orbit.id)}
                onMouseLeave={() => setHoveredOrbitId(null)}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/85 backdrop-blur-xl shadow-2xl transition-all duration-300 transform select-none cursor-pointer"
                style={{
                  border: hoveredOrbitId === orbit.id ? `1px solid ${orbit.color}` : "1px solid rgba(255, 255, 255, 0.07)",
                  boxShadow: hoveredOrbitId === orbit.id ? `0 0 25px -3px ${orbit.color}50` : "0 8px 18px rgba(0,0,0,0.6)"
                }}
              >
                {/* Visual Glow energy wave inside hover */}
                {hoveredOrbitId === orbit.id && (
                  <div className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]" />
                )}

                <div 
                  className="w-3 h-3 rounded-full relative" 
                  style={{ 
                    backgroundColor: orbit.color,
                    boxShadow: hoveredOrbitId === orbit.id ? `0 0 12px ${orbit.color}` : `0 0 4px ${orbit.color}`
                  }}
                >
                  {/* Pulse active ping */}
                  <span className="absolute inset-0 rounded-full bg-inherit animate-ping opacity-75" />
                </div>
                
                <span className="text-xs md:text-sm font-bold tracking-wider text-gray-200 group-hover:text-white font-sans uppercase">
                  {orbit.name}
                </span>

                {/* Micro tech coordinate labels inside box */}
                <span className="text-[7px] text-gray-600 font-mono hidden group-hover:inline">
                  [{Math.round(orbit.x)},{Math.round(orbit.z)}]
                </span>
                
                {hoveredOrbitId === orbit.id && (
                  <motion.div
                    layoutId="coreGlowOverlay"
                    className="absolute inset-0 -z-10 rounded-xl blur-md opacity-25"
                    style={{ backgroundColor: orbit.color }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </AnimatePresence>

      {/* Center Brain holographic indicator overlay */}
      <AnimatePresence>
        {fadeProgress > 0.85 && (
          <div className="absolute flex flex-col justify-center items-center pointer-events-none select-none">
            {/* Spinning radar targets */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="w-16 h-16 border-t border-b border-violet-500/30 rounded-full blur-[0.5px]"
            />
            <div className="absolute text-violet-400 flex flex-col items-center">
              <Brain className="w-9 h-9 text-violet-400 animate-pulse drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
              <span className="text-[7px] text-teal-400 font-mono tracking-widest mt-1">SYS: OPERATIONAL</span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

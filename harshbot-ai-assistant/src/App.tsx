import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Brain, ArrowRight, Github, Linkedin, Mail, 
  BookOpen, Code, Cpu, Binary, GitBranch, Terminal, Shield, Award, HelpCircle
} from "lucide-react";

// Components
import NeuralCore from "./components/NeuralCore";
import Features from "./components/Features";
import LearningModules from "./components/LearningModules";
import ChatInterface from "./components/ChatInterface";

// Quick hitech sound synthesis trigger
const playHitechTick = (freq: number) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioContext.currentTime + 0.06);
    gainNode.gain.setValueAtTime(0.015, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.06);
    osc.start();
    osc.stop(audioContext.currentTime + 0.06);
  } catch (e) {}
};

// Pure React Star/Particle background simulator
function ParticleBackground() {
  const [particles, setParticles] = useState<{ id: number; top: number; left: number; scale: number; speed: number }[]>([]);

  useEffect(() => {
    // Generate 45 randomized static points
    const points = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      speed: 4 + Math.random() * 8
    }));
    setParticles(points);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: ["0px", "-120px", "0px"],
            opacity: [0.15, 0.7, 0.15]
          }}
          transition={{
            duration: p.speed,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.scale * 3}px`,
            height: `${p.scale * 3}px`,
            borderRadius: "50%",
            backgroundColor: p.id % 2 === 0 ? "#14b8a6" : "#8b5cf6",
            boxShadow: `0 0 10px ${p.id % 2 === 0 ? "rgba(20,184,166,0.5)" : "rgba(139,92,246,0.5)"}`
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [activeChatMessage, setActiveChatMessage] = useState<string | undefined>(undefined);
  const [scrollY, setScrollY] = useState(0);

  // Scroll targets
  const homeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map chosen floating skill orb badge to correct predefined assistant query
  const handleSelectTopicFromOrb = (tag: string) => {
    playHitechTick(1400);
    const badgeToPredefined: Record<string, string> = {
      "Python": "Explain Python Decorators",
      "React": "What is React?",
      "AI": "Prompt Engineering",
      "DSA": "What is DSA?",
      "GitHub": "Git vs GitHub",
      "Open Source": "Open Source Guide",
      "Machine Learning": "What is Machine Learning?",
      "Prompt Engineering": "Prompt Engineering"
    };

    const targetQuery = badgeToPredefined[tag] || "What is DSA?";
    setActiveChatMessage(targetQuery);
    
    // Smooth scroll straight down to the Assistant Chat Section
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectQueryFromCard = (queryStr: string) => {
    playHitechTick(1600);
    setActiveChatMessage(queryStr);
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    playHitechTick(1000);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Shrink ratio parameters of Neural Sphere on scrolling down
  const sphereScale = Math.max(0.48, 1 - scrollY / 720);
  const sphereFade = Math.max(0.08, 1 - scrollY / 520);

  return (
    <div className="relative min-h-screen bg-[#030309] text-gray-100 selection:bg-violet-600/30 selection:text-white overflow-x-hidden font-sans">
      {/* Immersive background stars & light glow fields */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Particle Stars */}
        <ParticleBackground />

        {/* Dynamic Vercel/Linear slate neon mesh circles */}
        <div className="absolute top-[-10%] left-[10%] w-[550px] h-[550px] rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] rounded-full bg-cyan-600/5 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[140px]" />
      </div>

      {/* FIXED NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#030309]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16.5 flex items-center justify-between">
          
          {/* Brand Logo with developer credit */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-[1px] flex items-center justify-center relative shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <div className="w-full h-full bg-[#030309] rounded-[11px] flex items-center justify-center">
                <Brain className="w-5.5 h-5.5 text-violet-400" />
              </div>
            </div>
            <div>
              <span className="text-sm font-extrabold text-white tracking-widest font-mono uppercase">
                HARSHBOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-teal-400">AI</span>
              </span>
              <p className="text-[9px] font-mono text-gray-500 leading-none">CREATED BY HARSH BHADORIYA</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 select-none text-xs font-bold uppercase tracking-wider text-gray-400">
            <button 
              onClick={() => scrollToRef(homeRef)}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/[0.02] transition-all cursor-pointer pointer-events-auto"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToRef(featuresRef)}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/[0.02] transition-all cursor-pointer pointer-events-auto"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToRef(modulesRef)}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/[0.02] transition-all cursor-pointer pointer-events-auto"
            >
              Learning Modules
            </button>
            <button 
              onClick={() => scrollToRef(aboutRef)}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/[0.02] transition-all cursor-pointer pointer-events-auto"
            >
              About
            </button>
          </nav>

          {/* Glowing CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToRef(modulesRef)}
              className="relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest overflow-hidden group border border-violet-500/30 bg-violet-600/10 text-violet-300 hover:text-white transition-all cursor-pointer pointer-events-auto shadow-[0_0_15px_rgba(139,92,246,0.15)] active:scale-95"
            >
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent blur-[1px] animate-pulse" />
              <span>Start Learning</span>
            </button>
          </div>
        </div>
      </header>

      {/* CORE FRAME LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 pt-6 pb-20 relative z-10 space-y-36">
        
        {/* HERO SECTION */}
        <section 
          ref={homeRef} 
          id="hero" 
          className="relative pt-12 md:pt-20 flex flex-col items-center justify-center overflow-visible"
        >
          {/* Content Headings block */}
          <div className="text-center max-w-3xl space-y-5 select-none relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-400/20 bg-sky-500/5 text-[#22d3ee] text-[10px] font-bold uppercase tracking-widest animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jarvis-Inspired Educational Architecture</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1] font-sans">
              Your AI Learning <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-400 to-teal-400">
                Companion
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
              Master Python, DSA, AI, Machine Learning, Git and Open Source through interactive guided learning experiences.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <button
                onClick={() => scrollToRef(chatRef)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(124,58,237,0.35)] transition-all cursor-pointer pointer-events-auto active:scale-95"
              >
                Start Learning
              </button>
              
              <button
                onClick={() => scrollToRef(modulesRef)}
                className="px-6 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/10 text-xs font-black uppercase tracking-widest text-[#22d3ee] transition-all cursor-pointer pointer-events-auto active:scale-95"
              >
                Explore Modules
              </button>
            </div>
          </div>

          {/* ANIMATED NEURAL ORB/CORE IN HERO SECTION */}
          <div className="relative w-full max-w-4xl mx-auto mt-4 overflow-visible flex items-center justify-center">
            {/* Massive rotating particle projection network */}
            <NeuralCore 
              onSelectTopic={handleSelectTopicFromOrb}
              scaleProgress={sphereScale}
              fadeProgress={sphereFade}
            />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section ref={featuresRef} id="features" className="scroll-mt-24 space-y-10">
          <div className="text-center max-w-2xl mx-auto select-none">
            <p className="text-[10px] text-violet-400 font-mono tracking-widest uppercase font-extrabold select-none">
              COGNITIVE CURRICULUM
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Engineered For High-Performance Learning
            </h2>
            <p className="text-xs text-gray-400 mt-2">
              Explore dynamic animated portals to quickly configure specialized software concepts.
            </p>
          </div>

          {/* Cards collection */}
          <Features onSelectQuery={handleSelectQueryFromCard} />
        </section>

        {/* LEARNING MODULES SECTION */}
        <section ref={modulesRef} id="modules" className="scroll-mt-24 space-y-6">
          <div className="relative">
            <LearningModules />
          </div>
        </section>

        {/* CHAT SECTION (QUICK LEARNING ASSISTANT) */}
        <section ref={chatRef} id="chat" className="scroll-mt-24 space-y-10">
          <div className="text-center max-w-2xl mx-auto select-none">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-600/5 text-[#c084fc] text-[9px] font-bold uppercase tracking-widest mb-2.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Pre-compiled Terminal Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Quick Learning Assistant
            </h2>
            <p className="text-xs text-gray-400 mt-2 max-w-lg mx-auto">
              Query HarshBot's offline compilation database below for instant, beautifully detailed explanations on dynamic core technologies. No server lag.
            </p>
          </div>

          {/* Pure React Interactive Terminal */}
          <ChatInterface 
            selectedTopicPrompt={activeChatMessage} 
          />
        </section>

        {/* ABOUT SECTION */}
        <section ref={aboutRef} id="about" className="scroll-mt-24">
          <div className="relative p-8 md:p-12 rounded-2xl border border-white/5 bg-[#050512]/50 backdrop-blur-3xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.05)]">
            {/* Visual glow backdrop */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-5">
                <p className="text-[10px] text-teal-400 font-mono tracking-widest uppercase font-extrabold">
                  MISSION PROTOCOLS
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  About HarshBot AI
                </h2>
                
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  HarshBot AI is a modern educational platform designed to help students and developers learn Python, DSA, AI, Machine Learning, Git and Open Source through interactive learning experiences. It pairs the high-tech aesthetics of Iron Man's Jarvis terminal with hyper-polished documentation, giving learners clear visual roadmaps and instantly copyable blueprints.
                </p>

                <p className="text-xs text-gray-400 leading-relaxed">
                  Engineered using React, Vite, Tailwind CSS, and Framer Motion, it maintains a completely offline-ready, responsive, glassmorphic UI setup that runs client-side with compile speeds matching first-class development workspaces.
                </p>
              </div>

              {/* Contact / Links widget */}
              <div className="lg:col-span-4 p-5 md:p-6.5 rounded-xl border border-white/5 bg-[#03030d] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white font-mono border-b border-white/5 pb-2.5">
                  Secure Communication
                </h3>
                
                <div className="space-y-3">
                  <a 
                    href="mailto:harshbhadoriya456@gmail.com" 
                    className="flex items-center gap-3 text-xs text-gray-400 hover:text-white transition-colors p-2.5 rounded-lg hover:bg-white/[0.02] cursor-pointer"
                  >
                    <Mail className="w-4.5 h-4.5 text-violet-400" />
                    <div>
                      <p className="text-[8px] font-mono text-gray-500 uppercase leading-none">Email address</p>
                      <p className="font-sans mt-0.5 font-medium">harshbhadoriya456@gmail.com</p>
                    </div>
                  </a>

                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-3 text-xs text-gray-400 hover:text-white transition-colors p-2.5 rounded-lg hover:bg-white/[0.02] cursor-pointer"
                  >
                    <Github className="w-4.5 h-4.5 text-sky-400" />
                    <div>
                      <p className="text-[8px] font-mono text-gray-500 uppercase leading-none">Github Portfolio</p>
                      <p className="font-sans mt-0.5 font-medium">github.com</p>
                    </div>
                  </a>

                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-3 text-xs text-gray-400 hover:text-white transition-colors p-2.5 rounded-lg hover:bg-white/[0.02] cursor-pointer"
                  >
                    <Linkedin className="w-4.5 h-4.5 text-[#10b981]" />
                    <div>
                      <p className="text-[8px] font-mono text-gray-500 uppercase leading-none">LinkedIn contact</p>
                      <p className="font-sans mt-0.5 font-medium">linkedin.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/5 bg-[#020207] py-12 relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 text-xs text-gray-500">
            <Brain className="w-4 h-4 text-violet-500 animate-pulse" />
            <span>© {new Date().getFullYear()} HarshBot AI. All rights copy secure.</span>
          </div>

          <div className="text-xs text-gray-400 font-sans tracking-wide">
            Built with ❤️ by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400 font-bold font-mono">Harsh Bhadoriya</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            <span>TERMS LOCK</span>
            <span>•</span>
            <span>PRIVACY GUARD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

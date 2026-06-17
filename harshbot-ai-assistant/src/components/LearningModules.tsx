import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code, Layers, Network, GitBranch, Cpu, Binary, 
  Terminal, Sparkles, HelpCircle, X, Check, Copy, BookOpen, Clock, ChevronRight
} from "lucide-react";
import { LEARNING_MODULES, LearningModule } from "../data/learningData";

// Native Web Audio Synthesizer for high fidelity modal feedback
const playModalSound = (frequency: number, duration: number, type: OscillatorType = "sine") => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, audioContext.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {}
};

export default function LearningModules() {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "foundation" | "advanced">("all");
  const [copiedCode, setCopiedCode] = useState(false);

  // Map icon Name (string) to Lucide component
  const getIcon = (name: string) => {
    switch (name) {
      case "Code": return <Code className="w-5 h-5" />;
      case "Layers": return <Layers className="w-5 h-5" />;
      case "Network": return <Network className="w-5 h-5" />;
      case "GitBranch": return <GitBranch className="w-5 h-5" />;
      case "Cpu": return <Cpu className="w-5 h-5" />;
      case "Binary": return <Binary className="w-5 h-5" />;
      case "Terminal": return <Terminal className="w-5 h-5" />;
      case "Sparkles": return <Sparkles className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleOpenModule = (mod: LearningModule) => {
    playModalSound(900, 0.15, "sine");
    setSelectedModule(mod);
    setCopiedCode(false);
  };

  const handleCloseModule = () => {
    playModalSound(450, 0.1, "sine");
    setSelectedModule(null);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    playModalSound(2200, 0.05, "sine");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Filter modules lists
  const filteredModules = LEARNING_MODULES.filter(mod => {
    if (activeTab === "all") return true;
    if (activeTab === "foundation") return mod.difficulty === "Beginner";
    if (activeTab === "advanced") return mod.difficulty === "Intermediate" || mod.difficulty === "Advanced";
    return true;
  });

  return (
    <div id="learning-modules" className="w-full">
      {/* Dynamic Module categorization tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-violet-400 font-mono uppercase tracking-widest font-black">
            STRUCTURAL PATHWAYS
          </p>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Pre-curated Core Knowledge Nodes
          </h3>
        </div>

        <div className="flex bg-[#080816] p-1.5 rounded-xl border border-white/5 select-none gap-1.5">
          {[
            { label: "All Packages", id: "all" },
            { label: "Foundational core", id: "foundation" },
            { label: "Advanced solvers", id: "advanced" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playModalSound(1200, 0.04); setActiveTab(tab.id as any); }}
              className={`text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-md shadow-violet-600/10"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 10 dynamic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((mod, index) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => handleOpenModule(mod)}
            className="group relative p-5.5 rounded-2xl bg-[#03030d]/85 backdrop-blur-3xl border border-white/5 hover:border-violet-500/25 transition-all duration-300 cursor-pointer pointer-events-auto"
          >
            {/* Interactive linear top bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent group-hover:via-violet-400/80 transition-all duration-300" />

            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-gray-400 group-hover:text-violet-400 group-hover:bg-violet-600/10 transition-colors`}>
                {getIcon(mod.icon)}
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] ${
                  mod.difficulty === "Advanced" ? "text-rose-400" : mod.difficulty === "Intermediate" ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {mod.difficulty}
                </span>
                <span className="text-[9px] text-gray-500 font-mono">{mod.timeToRead}</span>
              </div>
            </div>

            <h4 className="text-sm font-extrabold text-white group-hover:text-violet-300 transition-colors leading-snug">
              {mod.title}
            </h4>
            
            <p className="text-xs text-gray-400 leading-relaxed mt-2.5 mb-5 group-hover:text-gray-300 transition-colors">
              {mod.shortDesc}
            </p>

            <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-3 border-t border-white/5 group-hover:border-violet-500/10 transition-colors">
              <span>MODULE ID: #{mod.id.substring(0, 6)}</span>
              <span className="text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>View schematics</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium Glassmorphism Modal window */}
      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Dark background blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModule}
              className="fixed inset-0 bg-[#020207]/90 backdrop-blur-xl"
            />

            {/* Modal Body Card container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#050512]/95 backdrop-blur-[40px] shadow-[0_0_80px_rgba(139,92,246,0.3)] overflow-hidden z-10 flex flex-col max-h-[85vh] select-text"
            >
              {/* Top aesthetic glowing bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-sky-400 to-teal-400" />

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6.5 py-5 border-b border-white/5 bg-[#08081a]/95">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400">
                    {getIcon(selectedModule.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-violet-400">
                        EDUCATIONAL CORE MATRIX
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      {selectedModule.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleCloseModule}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#ef4444]/15 hover:border-[#ef4444]/20 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable contents compartment */}
              <div className="flex-1 overflow-y-auto px-6.5 py-6.5 space-y-6">
                
                {/* Visual metadata stats row */}
                <div className="grid grid-cols-3 gap-3 bg-[#08081a]/60 p-4 rounded-xl border border-white/5 text-xs text-center">
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 font-mono">Difficulty level</p>
                    <p className="font-extrabold text-white mt-0.5">{selectedModule.difficulty}</p>
                  </div>
                  <div className="border-x border-white/5">
                    <p className="text-[10px] uppercase text-gray-500 font-mono font-bold">Latency reading</p>
                    <p className="font-extrabold text-white mt-0.5">{selectedModule.timeToRead}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 font-mono font-bold">Package structure</p>
                    <p className="font-extrabold text-violet-400 mt-0.5 font-mono">#{selectedModule.category.toUpperCase()}</p>
                  </div>
                </div>

                {/* Section 1: Detailed conceptual explanation */}
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#14b8a6] uppercase">
                    I. Structural Explanations & Tracing
                  </h4>
                  <div className="text-xs sm:text-sm text-gray-300 leading-relaxed space-y-3 whitespace-pre-line font-sans">
                    {selectedModule.explanation}
                  </div>
                </div>

                {/* Section 2: Concrete interactive code snippet */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#14b8a6] uppercase">
                      II. Production Blueprint Code
                    </h4>
                    <button
                      onClick={() => handleCopyCode(selectedModule.codeExample)}
                      className="text-[10px] font-mono text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? "Copied schematic" : "Copy blueprint"}</span>
                    </button>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#020206] overflow-hidden">
                    <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-300 bg-black/40 leading-6 max-h-[300px]">
                      <code>{selectedModule.codeExample}</code>
                    </pre>
                  </div>
                </div>

                {/* Section 3: Pro level development Tips */}
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#14b8a6] uppercase">
                    III. Senior Architect Pro-Tips
                  </h4>
                  <div className="space-y-2">
                    {selectedModule.proTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 bg-white/[0.01] border border-white/5 p-3 rounded-lg hover:border-violet-500/25 transition-colors">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0 animate-pulse" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Systematic learning Roadmap */}
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#14b8a6] uppercase text-sky-400 border-none">
                    IV. Targeted Learning Milestones
                  </h4>
                  <div className="space-y-2">
                    {selectedModule.roadmap.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 font-sans pl-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4] shrink-0" />
                        <span className="font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6.5 py-4 border-t border-white/5 bg-[#050512]">
                <p className="text-[9px] text-gray-500 font-mono">
                  Engineered offline package matrix // Harsh Bhadoriya
                </p>
                <button
                  onClick={handleCloseModule}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-xs text-white font-bold uppercase tracking-wider transition-all cursor-pointer pointer-events-auto"
                >
                  Resume Master Track
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

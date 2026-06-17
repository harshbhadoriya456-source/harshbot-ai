import React from "react";
import { motion } from "motion/react";
import { 
  Code, Binary, Sparkles, Cpu, GitBranch, Terminal, 
  ArrowRight, Heart, Award, ArrowUpRight
} from "lucide-react";

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  quickQuery: string;
}

const FEATURE_TEMPLATES: FeatureItem[] = [
  {
    id: "python",
    title: "Python Learning",
    subtitle: "Dynamic & OOP Paradigms",
    description: "Master first-class function structures, lambda closure scopes, variable decorators, list-comprehension trees, and custom metaclasses.",
    icon: Code,
    colorClass: "from-violet-500/10 to-indigo-500/10 border-violet-500/20 text-violet-400",
    quickQuery: "Explain Python Decorators"
  },
  {
    id: "dsa",
    title: "DSA Roadmaps",
    subtitle: "Logical Complexity Solvers",
    description: "Formulate bottom-up dynamic programming tables, optimize amortized space complexities, and trace graph traversals step by step.",
    icon: Binary,
    colorClass: "from-sky-500/10 to-blue-500/10 border-sky-500/20 text-sky-400",
    quickQuery: "What is DSA?"
  },
  {
    id: "ai",
    title: "AI Fundamentals",
    subtitle: "Intelligent Prompts & Systems",
    description: "Deep dive contextual boundary inputs, structure logic models via Chain of Thought, ReAct techniques, and logical security parameters.",
    icon: Sparkles,
    colorClass: "from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-400",
    quickQuery: "Prompt Engineering"
  },
  {
    id: "ml",
    title: "Machine Learning Basics",
    subtitle: "High Dimensional Math Engines",
    description: "Learn supervised vectors, linear matrices, convolutional filter maps, forward activations, activation shapes, and continuous gradients.",
    icon: Cpu,
    colorClass: "from-pink-500/10 to-rose-500/10 border-pink-500/20 text-pink-400",
    quickQuery: "What is Machine Learning?"
  },
  {
    id: "git",
    title: "Git & GitHub",
    subtitle: "Version Control Hygiene",
    description: "Command branch rebase workflows, resolve team merge splits securely, execute cherry-picks, and automate test action triggers.",
    icon: GitBranch,
    colorClass: "from-teal-500/10 to-emerald-500/10 border-teal-500/20 text-teal-400",
    quickQuery: "Git vs GitHub"
  },
  {
    id: "os",
    title: "Open Source Guide",
    subtitle: "Upstream Portfolio Credits",
    description: "Master upstream pull requests, fork rules, repository triage etiquettes, collaborative branch codes, and licensing choices.",
    icon: Terminal,
    colorClass: "from-violet-500/10 to-teal-500/10 border-indigo-500/20 text-[#14b8a6]",
    quickQuery: "Open Source Guide"
  }
];

interface FeaturesProps {
  onSelectQuery: (query: string) => void;
}

export default function Features({ onSelectQuery }: FeaturesProps) {
  const triggerTick = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, audioContext.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
      osc.start();
      osc.stop(audioContext.currentTime + 0.05);
    } catch (e) {}
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURE_TEMPLATES.map((feat, index) => {
          const IconComp = feat.icon;
          return (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ 
                y: -6, 
                scale: 1.015,
                borderColor: "rgba(139, 92, 246, 0.35)",
                boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.15)"
              }}
              className="group relative flex flex-col justify-between p-6.5 rounded-2xl bg-[#080816]/60 backdrop-blur-3xl border border-white/5 transition-all duration-300"
            >
              {/* Vercel style top-corner decorative highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent to-violet-500/5 rounded-tr-2xl blur-xl" />
              
              {/* Clean left-margin vertical indicator */}
              <div className="absolute top-6 left-0 w-[3px] h-10 bg-gradient-to-b from-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div>
                {/* Header Icon container */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feat.colorClass} border border-white/10 flex items-center justify-center relative overflow-hidden shadow-lg`}>
                    <IconComp className="w-5.5 h-5.5 animate-pulse" />
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-violet-400 transition-colors">
                    <span className="text-[9px] font-mono tracking-widest font-extrabold uppercase">
                      ACTIVE DESTRUCT
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold tracking-tight text-white mb-1 group-hover:text-violet-300 transition-colors">
                  {feat.title}
                </h3>
                <h4 className="text-[10px] font-mono tracking-widest text-[#06b6d4] uppercase font-bold mb-3.5">
                  {feat.subtitle}
                </h4>
                
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {feat.description}
                </p>
              </div>

              {/* Action query button */}
              <button
                onClick={() => {
                  triggerTick();
                  onSelectQuery(feat.quickQuery);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.02] group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-indigo-600 text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-all cursor-pointer pointer-events-auto shadow-md"
              >
                <span>Initialize query trace</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

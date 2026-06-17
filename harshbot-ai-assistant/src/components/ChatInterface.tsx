import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, Sparkles, Brain, Code, Cpu, Terminal, 
  ArrowRight, CornerDownLeft, RotateCcw, User, 
  Check, Copy, Mic, Volume2, VolumeX, TerminalSquare, Heart, Award, Flame, Laptop
} from "lucide-react";
import { CHAT_PRESET_ANSWERS } from "../data/learningData";

// Native Web Audio Synthesizer for high-tech terminal feedback
const playTerminalChirp = (frequency: number, duration: number, type: OscillatorType = "sine") => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
    if (type === "sawtooth") {
      osc.frequency.linearRampToValueAtTime(frequency / 2, audioContext.currentTime + duration);
    } else {
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.6, audioContext.currentTime + duration);
    }
    
    gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {
    // Fail safe for browser constraints
  }
};

interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  onMessageAdded?: (messagesCount: number) => void;
  selectedTopicPrompt?: string; 
}

const PREDEFINED_QUESTIONS = [
  "Explain Python Decorators",
  "What is React?",
  "What is Machine Learning?",
  "Git vs GitHub",
  "How APIs Work?",
  "Explain Docker",
  "What is DSA?",
  "Open Source Guide",
  "Prompt Engineering",
  "SQL vs NoSQL"
];

export default function ChatInterface({ onMessageAdded, selectedTopicPrompt }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<string | null>(null);
  const [sysStability, setSysStability] = useState(100);
  const [latency, setLatency] = useState(1);
  const [reactions, setReactions] = useState<{ [msgId: string]: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load welcome dialogue on initial load
  useEffect(() => {
    const defaultLogs: MessageItem[] = [
      {
        id: "sys-init",
        role: "assistant",
        content: `⚡ **HARSHBOT AI: QUICK LEARNING CLIENT v5.0**
[DIAGNOSTICS: OPTIMAL] [LATENCY: 1ms] [SYSTEM COMPILER: ONLINE]

Greetings, Developer! I am **HarshBot AI**, your high-performance, offline-ready educational intelligence framework designed and engineered by **Harsh Bhadoriya**. 

Select any of the predefined interactive queries below to query my local knowledge matrix. I will instantly compile beautifully formatted tutorials, code paradigms, space-time analysis grids, and expert engineering blueprints.

What concept shall we deconstruct first?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(defaultLogs);
    if (onMessageAdded) onMessageAdded(1);
  }, []);

  // Sync scroll focus to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Listen to external triggers (such as clicking floating badges or nodes)
  useEffect(() => {
    if (selectedTopicPrompt) {
      // Find closest Match
      const matchedQuestion = PREDEFINED_QUESTIONS.find(
        q => q.toLowerCase().includes(selectedTopicPrompt.toLowerCase()) || 
             selectedTopicPrompt.toLowerCase().includes(q.toLowerCase())
      );
      if (matchedQuestion) {
        handleTriggerQuestion(matchedQuestion);
      } else {
        // Fallback for custom topic strings
        handleCustomPrompt(selectedTopicPrompt);
      }
    }
  }, [selectedTopicPrompt]);

  const speakTextRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Client-side speak support
  const executeVoiceSynthesis = (textToSpeak: string) => {
    if (!voiceActive) return;
    try {
      window.speechSynthesis.cancel();
      // Filter out markdown punctuation for clean narration
      const cleanText = textToSpeak
        .replace(/[#*`~_]/g, "")
        .replace(/\[.*?\]/g, "")
        .substring(0, 220); // Speak the highlight overview

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      speakTextRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("TTS initialization blocked on host browser.");
    }
  };

  const handleTriggerQuestion = (qTitle: string) => {
    if (isTyping) return;
    playTerminalChirp(1200, 0.08, "sine");

    // Push User Query
    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: qTitle,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const presetAnswer = CHAT_PRESET_ANSWERS[qTitle] || `I'm sorry, I couldn't locate a pre-configured solution for "${qTitle}" inside our offline educational database. Select another course below!`;

    // High fidelity simulated progressive typing effect (makes the living AI feel reactive and responsive!)
    setTimeout(() => {
      setIsTyping(false);
      const assistantMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: presetAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      playTerminalChirp(1800, 0.15, "triangle");

      // Narrate if voice mode is activated
      if (voiceActive) {
        executeVoiceSynthesis(presetAnswer);
      }
    }, 1100);
  };

  const handleCustomPrompt = (promptText: string) => {
    if (!promptText.trim() || isTyping) return;
    playTerminalChirp(1100, 0.08, "sine");

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Dynamic search for keywords
    let matchedAnswer = "";
    const lower = promptText.toLowerCase();
    
    if (lower.includes("python") || lower.includes("decorator")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["Explain Python Decorators"];
    } else if (lower.includes("react") || lower.includes("hook")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["What is React?"];
    } else if (lower.includes("machine learning") || lower.includes("ml")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["What is Machine Learning?"];
    } else if (lower.includes("git") || lower.includes("github")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["Git vs GitHub"];
    } else if (lower.includes("api") || lower.includes("rest")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["How APIs Work?"];
    } else if (lower.includes("docker") || lower.includes("container")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["Explain Docker"];
    } else if (lower.includes("dsa") || lower.includes("algorithm") || lower.includes("binary search")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["What is DSA?"];
    } else if (lower.includes("open source") || lower.includes("contribution")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["Open Source Guide"];
    } else if (lower.includes("prompt")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["Prompt Engineering"];
    } else if (lower.includes("sql") || lower.includes("nosql") || lower.includes("database")) {
      matchedAnswer = CHAT_PRESET_ANSWERS["SQL vs NoSQL"];
    } else {
      matchedAnswer = `🛡️ **HarshBot AI offline Query Dispatcher**
      
I parsed your input: "${promptText}".
To ensure instantaneous compile times without external server dependency lags, I run using pre-curated matrices. Try utilizing one of our optimized buttons such as:
1. **Explain Python Decorators**
2. **What is DSA?**
3. **What is Machine Learning?**
4. **Git vs GitHub**
5. **SQL vs NoSQL**`;
    }

    setTimeout(() => {
      setIsTyping(false);
      const assistantMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: matchedAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      playTerminalChirp(1600, 0.12, "triangle");

      if (voiceActive) {
        executeVoiceSynthesis(matchedAnswer);
      }
    }, 1200);
  };

  const handleResetLogs = () => {
    playTerminalChirp(350, 0.35, "sawtooth");
    window.speechSynthesis.cancel();
    setMessages([
      {
        id: "sys-reinit",
        role: "assistant",
        content: `🔄 **HARSHBOT ENGINE: SWEEPS FLUSHED**
System state flushed. Ready to map next cognitive directive. Select a question below to start compiled tracing!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleToggleVoice = () => {
    const nextVoice = !voiceActive;
    setVoiceActive(nextVoice);
    if (nextVoice) {
      playTerminalChirp(880, 0.15, "sine");
      // Read out latest assistant response if available
      const lastAss = [...messages].reverse().find(m => m.role === "assistant");
      if (lastAss) {
        setTimeout(() => executeVoiceSynthesis(lastAss.content), 200);
      }
    } else {
      playTerminalChirp(440, 0.15, "sine");
      window.speechSynthesis.cancel();
    }
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    playTerminalChirp(2000, 0.05, "sine");
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const copyCodeSeg = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(key);
    playTerminalChirp(2000, 0.05, "sine");
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const applyReaction = (msgId: string, label: string) => {
    playTerminalChirp(1400, 0.04, "sine");
    setReactions(prev => ({ ...prev, [msgId]: label }));
  };

  return (
    <div id="quick-learning-assistant" className="w-full flex flex-col h-[750px] rounded-2xl border border-white/5 bg-[#04040d]/90 backdrop-blur-3xl overflow-hidden relative shadow-[0_0_50px_rgba(30,58,138,0.25)]">
      {/* Decorative Vercel & Stripe style linear flow bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 via-sky-400 to-indigo-500" />
      
      {/* Interactive terminal state tracking headers */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4.5 border-b border-white/5 bg-[#070719]/90 relative z-10 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-sky-500 p-[1px] flex items-center justify-center relative shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <div className="w-full h-full bg-[#050512] rounded-[11px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-widest font-mono uppercase">
                HARSHBOT AI // LEARNING ENGINE
              </h4>
              <span className="text-[8px] bg-sky-500/10 text-sky-400 font-mono font-bold px-1.5 py-0.5 rounded border border-sky-400/20 uppercase tracking-widest animate-pulse">
                OFFLINE CACHE ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono mt-0.5">
              <span>HOST SECTOR: LOCAL PORT 3000</span>
              <span className="text-violet-500 font-bold mx-1.5">|</span>
              <span className="text-emerald-400 font-bold">LATENCY: {latency}ms</span>
            </p>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-2">
          {/* TTS Toggle Voice mode */}
          <button
            onClick={handleToggleVoice}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 pointer-events-auto cursor-pointer ${
              voiceActive
                ? "bg-sky-500/20 border-sky-400 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
            }`}
          >
            {voiceActive ? <Mic className="w-3.5 h-3.5 text-sky-400 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
            <span>TTS VOICE {voiceActive ? "ACTIVE" : "OFF"}</span>
          </button>

          {/* Refresh system logs */}
          <button
            onClick={handleResetLogs}
            title="Reset active logs matrix"
            className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-violet-600/20 hover:border-violet-500/30 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary chat window logs */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative select-text bg-[#03030b]/30">
        {/* Futuristic layout coordinates grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-25" />

        <AnimatePresence>
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <motion.div
                key={m.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex gap-4 max-w-4xl relative z-10 ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Visual indicator profile avatar */}
                <div className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0 border relative ${
                  isUser 
                    ? "bg-violet-600/10 border-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(124,58,237,0.15)]"
                    : "bg-slate-900/90 border-white/5 text-sky-400 shadow-inner"
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Brain className="w-4.5 h-4.5 text-violet-400" />}
                  {!isUser && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#04040d] rounded-full animate-pulse" />
                  )}
                </div>

                <div className="space-y-1 sm:max-w-xl md:max-w-2xl">
                  {/* Metadata labels */}
                  <div className={`text-[9px] text-gray-500 font-mono tracking-widest uppercase flex items-center gap-2 ${isUser ? "justify-end" : ""}`}>
                    <span>{isUser ? "LEARNER USER" : "HARSHBOT CORE"}</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </div>

                  {/* Body Speech Balloon */}
                  <div className={`p-5 rounded-2xl text-[13px] leading-relaxed relative border ${
                    isUser 
                      ? "bg-gradient-to-tr from-violet-950/70 to-indigo-950/70 border-violet-500/20 text-violet-100 rounded-tr-none shadow-[0_4px_20px_rgba(124,58,237,0.05)]"
                      : "bg-[#080816]/90 border-white/5 text-gray-200 rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  }`}>
                    <div className="space-y-3.5 select-text">
                      {m.content.split("\n\n").map((chunk, chunkIdx) => {
                        
                        // Render full coding snippet layouts
                        if (chunk.includes("```")) {
                          const blocks = chunk.split("```");
                          return blocks.map((subText, subIdx) => {
                            if (subIdx % 2 === 1) {
                              const lines = subText.split("\n");
                              const possibleLanguage = lines[0] || "code";
                              const codeLines = lines.slice(1).join("\n").trim();
                              const codeKey = `${m.id}-${chunkIdx}-${subIdx}`;

                              return (
                                <div key={subIdx} className="rounded-xl border border-white/10 bg-black/90 overflow-hidden font-mono text-xs my-3 relative shadow-2xl">
                                  <div className="bg-white/[0.03] px-4 py-2 flex justify-between items-center text-[10px] text-gray-400 border-b border-white/5">
                                    <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sky-400">
                                      <Code className="w-3.5 h-3.5" />
                                      <span>{possibleLanguage} blueprint</span>
                                    </div>
                                    <button
                                      onClick={() => copyCodeSeg(codeKey, codeLines)}
                                      className="flex items-center gap-1 hover:text-white transition-all cursor-pointer py-1 px-2 rounded hover:bg-white/5"
                                    >
                                      {copiedCodeIdx === codeKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                      <span>{copiedCodeIdx === codeKey ? "COPIED" : "COPY CODE"}</span>
                                    </button>
                                  </div>
                                  <pre className="p-4 overflow-x-auto text-emerald-300 bg-[#020207] leading-6 max-h-[300px]">
                                    <code>{codeLines}</code>
                                  </pre>
                                </div>
                              );
                            }
                            return <p key={subIdx} className="text-gray-300 leading-relaxed font-sans">{subText}</p>;
                          });
                        }

                        // Parse standard markdown tables inside pre-configured answers
                        if (chunk.trim().startsWith("|") && chunk.includes("\n|")) {
                          const rows = chunk.split("\n").filter(r => r.trim() !== "");
                          return (
                            <div key={chunkIdx} className="overflow-x-auto my-4 border border-white/5 rounded-xl shadow-lg bg-black/40">
                              <table className="min-w-full text-left text-xs font-sans">
                                <thead>
                                  <tr className="bg-white/5 border-b border-white/10 text-gray-300 uppercase tracking-wider text-[10px] font-bold">
                                    {rows[0].split("|").slice(1, -1).map((cell, cIdx) => (
                                      <th key={cIdx} className="px-4 py-2.5 font-bold">{cell.trim()}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-300">
                                  {rows.slice(2).map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors">
                                      {row.split("|").slice(1, -1).map((cell, cIdx) => (
                                        <td key={cIdx} className="px-4 py-2.5 whitespace-pre-wrap leading-relaxed">{cell.trim()}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        // Parse simple markdown lists
                        if (chunk.trim().startsWith("- ") || chunk.trim().startsWith("1. ") || chunk.trim().startsWith("🐍 ") || chunk.trim().startsWith("📐 ")) {
                          const records = chunk.split("\n").filter(l => l.trim() !== "");
                          return (
                            <ul key={chunkIdx} className="space-y-2 pl-1 my-3">
                              {records.map((rawLine, lIdx) => {
                                const cleanText = rawLine.replace(/^[-\*\s]+/, "").replace(/^\d\.\s+/, "").replace(/\*\*/g, "");
                                return (
                                  <li key={lIdx} className="flex items-start gap-2.5 text-gray-300 my-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0 shadow-[0_0_6px_#38bdf8]" />
                                    <span className="font-sans text-[13px]">{cleanText}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          );
                        }

                        // Bold Tag formatter helper
                        return (
                          <p key={chunkIdx} className="text-gray-300 leading-relaxed font-sans">
                            {chunk.split("**").map((subStr, bIdx) => {
                              if (bIdx % 2 === 1) {
                                return (
                                  <strong key={bIdx} className="text-violet-300 font-extrabold tracking-tight">
                                    {subStr}
                                  </strong>
                                );
                              }
                              return subStr;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    {/* Bottom message tools */}
                    {!isUser && (
                      <div className="flex flex-wrap items-center justify-between mt-4.5 pt-3 border-t border-white/5 text-[10px] text-gray-500 font-mono gap-3 z-10">
                        {/* Static/Active reaction parameters */}
                        <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                          <span className="text-[9px] text-gray-400 font-extrabold tracking-widest mr-1">RATING:</span>
                          {["🔥 Log optimized", "🎯 Master standard", "⚡ Amortized O(1)"].map((labelVal) => {
                            const isSelected = reactions[m.id] === labelVal;
                            return (
                              <button
                                key={labelVal}
                                onClick={() => applyReaction(m.id, labelVal)}
                                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer select-none active:scale-95 ${
                                  isSelected 
                                    ? "text-sky-400 bg-sky-500/10 border border-sky-400/25 font-bold" 
                                    : "text-gray-400 hover:bg-white/5"
                                }`}
                              >
                                {labelVal}
                              </button>
                            );
                          })}
                        </div>

                        {/* Copy details */}
                        <button
                          onClick={() => copyMessage(m.id, m.content)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white/5 hover:text-white transition-colors cursor-pointer select-none active:scale-95 text-gray-300"
                        >
                          {copiedMessageId === m.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedMessageId === m.id ? "COPIED TEXT" : "COPY TEXT"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Typing simulated delay animation */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 max-w-4xl mr-auto relative z-10"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                <Brain className="w-4.5 h-4.5 text-violet-400 animate-spin" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-sky-400 font-mono tracking-widest animate-pulse">
                  [SYSTEM COMPILING INTERFACE SCHEMA...]
                </div>
                <div className="px-5 py-3.5 rounded-2xl bg-[#09091b]/90 rounded-tl-none border border-white/5 flex items-center gap-2 w-72 h-14">
                  <div className="flex items-end gap-1 h-4">
                    {[1.1, 0.4, 1.5, 0.8, 1.2].map((timeVal, barIdx) => (
                      <motion.div
                        key={barIdx}
                        animate={{ height: ["20%", "95%", "20%"] }}
                        transition={{ repeat: Infinity, duration: timeVal, ease: "easeInOut" }}
                        className={`w-1 rounded-sm ${barIdx % 2 === 0 ? "bg-violet-500" : "bg-sky-450"}`}
                        style={{ height: "30%" }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 ml-3">Mining educational vectors...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Grid of Predefined Question Buttons requested by User */}
      <div className="px-6 py-5 border-t border-white/5 bg-[#050512]">
        <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>Select Predefined Question to Query Terminal Matrix</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pb-2">
          {PREDEFINED_QUESTIONS.map((qText, index) => {
            const isLatestQuery = messages.length > 1 && messages[messages.length - 1].role === "user" && messages[messages.length - 1].content === qText;
            return (
              <button
                key={qText}
                onClick={() => handleTriggerQuestion(qText)}
                disabled={isTyping}
                className={`py-2 px-3 rounded-xl border text-left text-xs transition-all duration-300 pointer-events-auto cursor-pointer flex items-center justify-between select-none active:scale-[0.98] truncate ${
                  isLatestQuery 
                    ? "bg-violet-600/20 border-violet-500/50 text-white shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                    : "bg-[#080816] border-white/5 hover:border-violet-500/20 text-gray-400 hover:text-white"
                }`}
              >
                <span className="truncate pr-1">{qText}</span>
                <ArrowRight className="w-3 h-3 text-gray-500 group-hover:text-white shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom information telemetry bar */}
      <div className="px-6 py-3.5 border-t border-white/5 bg-[#030310]/80 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-500 font-mono gap-2">
          <div className="flex items-center gap-1.5 text-gray-400">
            <CornerDownLeft className="w-3.5 h-3.5 text-violet-400" />
            <span>Pre-configured responsive assistant created by <span className="text-white font-extrabold font-sans">Harsh Bhadoriya</span></span>
          </div>
          <p className="text-[9px] text-[#ffffff30] font-sans">OPTIMIZED CLIENT SECURE // NO EXTERNAL REST CALLS</p>
        </div>
      </div>
    </div>
  );
}

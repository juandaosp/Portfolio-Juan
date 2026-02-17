"use client";
import { Terminal } from 'lucide-react';

const HeroSection = () => {
  return (
    // pointer-events-none makes the container "invisible" to clicks
    <div className="flex flex-col space-y-8 pointer-events-none">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5 text-[14px] font-medium text-zinc-400 tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Vue 3 Platform Engineer · NVIDIA Certified AI
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Frontend Platform <br />
          <span className="text-gradient">Engineer & Architect</span>
        </h1>

        <p className="max-w-xl text-xl text-zinc-200 leading-relaxed font-light">
          Modernizing enterprise-scale financial systems for{" "}
          <span className="text-white font-medium">2M+ users</span>{" "}
          — and building the AI infrastructure that powers what comes next.
        </p>
      </header>

      {/* pointer-events-auto turns clicks back ON for the buttons */}
      <div className="flex flex-wrap gap-4 items-center pt-4 pointer-events-auto">
        <button
          onClick={() => scrollToSection('strategic-architecture')}
          className="px-6 py-3 bg-white text-black font-bold rounded-sm hover:bg-blue-600 hover:text-white transition-all uppercase tracking-tighter text-xs">
          View Case Studies
        </button>
        <button
          onClick={() => scrollToSection('strategic-log')}
          className="px-6 py-3 bg-transparent border border-white/10 text-zinc-300 font-bold rounded-sm hover:bg-zinc-900 transition-all uppercase tracking-tighter text-xs inline-flex items-center gap-2">
          <Terminal size={14} /> Architecture Log
        </button>
      </div>

      {/* METRICS STRIP - Addressing the "What to How Much" critique */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-900 pt-8">
        <div>
          <div className="text-white text-xl font-bold font-mono">2M+</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-widest">Active Users Supported</div>
        </div>
        <div>
          <div className="text-white text-xl font-bold font-mono">45%</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-widest">Velocity Increase</div>
        </div>
        <div>
          <div className="text-white text-xl font-bold font-mono">30%</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-widest">Efficiency Gains</div>
        </div>
        <div>
          <div className="text-blue-500 text-xl font-bold font-mono">NVIDIA</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-widest">AI Certified</div>
        </div>
      </div>
    </div>
  );
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default HeroSection;
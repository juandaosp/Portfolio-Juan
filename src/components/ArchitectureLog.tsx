"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ShieldCheck, Activity, Cpu, ChevronRight } from 'lucide-react';
import Badge from "@/components/Badge";
import data from '@/data/portfolio_data.json';


export default function ArchitectureLog() {
  const [selectedId, setSelectedId] = useState(data.pillars[0].id);
  const activeLog = data.pillars.find(p => p.id === selectedId);

  return (
    <div className="flex h-[600px] bg-[#0a0a0a] border border-slate-800 rounded-sm overflow-hidden font-mono">
      {/* Sidebar: ADR List */}
      <div className="w-1/3 border-r border-slate-800 bg-[#0d0d0d]">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest">
          <Book size={14} /> Decision_Records
        </div>
        <div className="overflow-y-auto h-full">
          {data.pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setSelectedId(pillar.id)}
              className={`w-full text-left p-4 transition-all border-b border-slate-800/50 group ${
                selectedId === pillar.id ? 'bg-blue-500/5 border-l-2 border-l-blue-500' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[12px] text-blue-500 font-bold">{pillar.id}</span>
                <span className="text-[12px] text-slate-500">{pillar.date}</span>
              </div>
              <div className="text-xs text-slate-200 font-bold group-hover:text-blue-400 transition-colors">
                {pillar.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-[#0a0a0a] overflow-y-auto p-8 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[12px] uppercase font-bold tracking-tighter">
                  {activeLog?.status}
                </span>
                <span className="text-slate-300 text-[12px] tracking-widest">VERIFIED_ARCH_DECISION</span>
              </div>
              <h2 className="text-2xl font-bold text-white italic">{activeLog?.title}</h2>
              <p className="text-blue-400 text-xs mt-1">{activeLog?.subtitle}</p>
            </div>

            {/* Sections */}
            <div className="grid gap-6">
              <section className="space-y-2">
                <h3 className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] border-b border-slate-800 pb-1 flex items-center gap-2">
                  <ShieldCheck size={12} /> Context
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">{activeLog?.context}</p>
              </section>

              <section className="space-y-2">
                <h3 className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] border-b border-slate-800 pb-1 flex items-center gap-2">
                  <Cpu size={12} /> Decision
                </h3>
                <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-sm text-blue-100 text-sm italic">
                  "{activeLog?.decision}"
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] border-b border-slate-800 pb-1 flex items-center gap-2">
                  <Activity size={12} /> Consequences & Metrics
                </h3>
                <ul className="space-y-2">
                  {activeLog?.consequences.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <ChevronRight size={14} className="text-blue-500 shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Stack */}
              <div className="pt-4 flex flex-wrap gap-2">
                {activeLog?.techStack.map(tech => (
                  <Badge key={tech} label={tech} className="opacity-80" />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
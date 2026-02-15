'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Award, GraduationCap, Sparkles, ShieldCheck,
  Zap, ArrowUpRight, X, Activity, Clock, Terminal, Layers,
  CheckCircle2, Microscope
} from 'lucide-react';
import data from '@/data/portfolio_data.json';
import { PortfolioData } from '@/types/metrics';

const typedData = data as PortfolioData;

export const BentoGrid = () => {
  const [activeItem, setActiveItem] = useState<{
    type: 'skill' | 'pillar',
    data: any
  } | null>(null);

  const cardBase = "bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl transition-all duration-500 overflow-hidden relative group cursor-pointer";

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 relative font-sans">

      <AnimatePresence>
        {activeItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 p-10 z-[70] shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setActiveItem(null)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors group">
                  <X className="text-zinc-500 group-hover:text-white" size={24} />
                </button>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter uppercase italic leading-none">
                {activeItem.type === 'skill' ? activeItem.data.skill : activeItem.data.title}
              </h2>
              <p className="text-blue-500 font-mono text-[14px] uppercase tracking-widest font-bold">
                {activeItem.type === 'skill' ? 'Verified Case Study' : activeItem.data.subtitle}
              </p>

              <div className="mt-10 space-y-8 flex-grow">
                {/* 1. DESCRIPTION BOX */}
                <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Microscope size={12} /> {activeItem.type === 'skill' ? 'Execution Details' : 'Strategic Overview'}
                  </h4>
                  <p className="text-zinc-300 text-lg font-light leading-relaxed">
                    {activeItem.data.description || activeItem.data.content}
                  </p>
                </div>

                {/* 2. TECH STACK (Only for Skills) */}
                {activeItem.type === 'skill' && activeItem.data.projects && (
                  <div className="space-y-3">
                    <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Environment & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.data.projects.map((proj: string) => (
                        <span key={proj} className="px-3 py-1.5 rounded-md bg-blue-500/5 border border-blue-500/10 text-[11px] font-mono text-blue-400 uppercase font-bold">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. METRICS (For Pillars or Skills) */}
                {activeItem.data.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    {activeItem.data.metrics.map((m: any) => (
                      <div key={m.label} className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/50">
                        <p className="text-[10px] text-zinc-600 uppercase font-bold mb-1">{m.label}</p>
                        <p className="text-white font-mono font-bold text-xl">{m.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. CERT LIST (Specific to Cert Pillar) */}
                {activeItem.data.items && (
                  <div className="space-y-3">
                    {activeItem.data.items.map((item: string) => (
                      <div key={item} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <CheckCircle2 size={16} className="text-blue-500" />
                        <span className="text-sm text-zinc-300 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. RAW TICKETS (Only for Skills) */}
                {activeItem.type === 'skill' && activeItem.data.highlights && (
                  <div className="space-y-4">
                    <h4 className="text-zinc-500 text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Terminal size={12} /> Architectural Evidence
                    </h4>
                    <div className="space-y-2">
                      {activeItem.data.highlights.map((ticket: any) => (
                        <div key={ticket["Issue key"]} className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/30 flex justify-between items-center group/ticket hover:border-zinc-700 transition-colors">
                          <div className="max-w-[80%]">
                            <span className="text-[14px] font-mono text-blue-500/80 group-hover/ticket:text-blue-500 transition-colors font-bold">
                              {ticket["Issue key"]}
                            </span>
                            <p className="text-sm text-zinc-400 mt-1 line-clamp-1 italic">{ticket.summary}</p>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-600 font-bold">+{ticket.points} SP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* HERO CARDS REMAIN THE SAME... */}
        <motion.div className={`${cardBase} md:col-span-7 rounded-[1.5rem] p-8 flex flex-col justify-between min-h-[380px]`}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-zinc-200" size={14} />
              <span className="text-[14px] uppercase text-zinc-200 font-bold">Senior Software Engineer</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tighter mb-6">
              {typedData.profile.role}
            </h2>
            <p className="text-zinc-300 text-xl font-light leading-relaxed max-w-xl">{typedData.profile.summary}</p>
          </div>
          <div className="relative z-10 mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
            <ShieldCheck className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <p className="text-md text-zinc-300 italic">"{typedData.profile.key_achievement}"</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} md:col-span-5 rounded-[1.5rem] p-8 flex flex-col justify-center items-center text-center`}>
          <p className="text-zinc-200 text-[12px] uppercase font-bold tracking-[0.3em] mb-2 flex items-center justify-center gap-2">
            <Activity size={12} className="text-blue-500 animate-pulse" /> Career Velocity
          </p>
          <h3 className="text-[10rem] font-black text-white tracking-tighter italic leading-none">
            {typedData.metadata.total_story_points}
          </h3>
          <p className="text-zinc-300 font-mono text-[12px] uppercase tracking-[0.2em] mt-2">Authenticated Story Points Delivered</p>
        </motion.div>

        {/* PILLARS - Strategic Epics */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'strangler', icon: Cpu, label: "Strangler Pattern", sub: "Monolith Decoupling" },
            { id: 'certs', icon: Award, label: "Certifications", sub: "NVIDIA • AWS • GCP" },
            { id: 'education', icon: GraduationCap, label: "Education", sub: "B.S. Systems Eng." }
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveItem({ type: 'pillar', data: (typedData as any).pillars[item.id] })}
              className={`${cardBase} rounded-xl p-5 flex items-center gap-4 hover:border-blue-500/30 active:scale-[0.98]`}
            >
              <div className="h-10 w-10 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-white/5 shrink-0 transition-colors group-hover:bg-blue-500/10">
                <item.icon className="text-zinc-400 group-hover:text-blue-400 transition-colors" size={20} />
              </div>
              <div>
                <p className="text-white text-[16px] font-bold uppercase tracking-widest leading-tight">{item.label}</p>
                <p className="text-[14px] text-zinc-500 font-medium leading-tight">{item.sub}</p>
              </div>
              <ArrowUpRight className="ml-auto text-zinc-800 group-hover:text-zinc-500 transition-colors" size={14} />
            </div>
          ))}
        </div>

        {/* SKILLS - Implementation Details */}
        {typedData.skills_hierarchy.map((skill, i) => (
          <motion.div
            key={skill.skill}
            onClick={() => setActiveItem({ type: 'skill', data: skill })}
            className={`${cardBase} md:col-span-3 rounded-xl p-6 flex flex-col justify-between min-h-[160px] group/skill`}
          >
            <div className="flex justify-between items-start">
              <div className="w-6 h-6 rounded bg-zinc-800/50 border border-white/5 flex items-center justify-center">
                <Terminal size={12} className="text-zinc-500 group-hover/skill:text-blue-500 transition-colors" />
              </div>
              <span className="text-[12px] font-mono text-zinc-600 font-bold uppercase tracking-tighter">Verified Logs</span>
            </div>

            <div className="mt-4">
              <h3 className="text-zinc-200 font-bold text-[14px] uppercase tracking-[0.15em] mb-3 group-hover/skill:text-blue-400 transition-colors">
                {skill.skill}
              </h3>
              <div className="flex items-center gap-3">
                <div className="h-1 flex-1 bg-zinc-800/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((skill.total_points / 220) * 100, 100)}%` }}
                    className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                  />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono font-bold">{skill.total_points}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
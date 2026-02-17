"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SkillLogCard from '@/components/SkillLogCard'
import JiraDrawer from '@/components/JiraDrawer';
import PillarCard from '@/components/PillarCard';
import data from '@/data/portfolio_data.json';
import PillarDrawer from '@/components/PilarDrawer';
import ArchitectureLog from '@/components/ArchitectureLog';





export default function PortfolioDashboard() {
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<any | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  // Helper to safely handle different JSON formats for pillars
  const pillarItems = Array.isArray(data?.pillars)
    ? data.pillars
    : Object.values(data?.pillars || {});

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-blue-500/30 relative">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 space-y-20 relative z-0">

        {/* HERO & GLOBAL ANALYTICS */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HeroSection />
          </div>
          <div className="bg-[#050505] border border-slate-800 p-12 flex flex-col items-center justify-center text-center rounded-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all" />
            <div className="text-blue-500 mb-4 uppercase tracking-[0.4em] text-[14px] font-black">Velocity Index</div>
            <h2 className="text-9xl font-black text-white tracking-tighter mb-4 relative z-10">
              {data.metadata.total_story_points}
            </h2>
            <p className="text-slate-500 uppercase tracking-widest text-[12px] font-mono">Story Points Verified</p>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 id="strategic-architecture" className="text-white uppercase tracking-[0.1em] text-xl font-black">01. Strategic_Architecture</h3>
            <div className="h-[1px] flex-grow bg-slate-900"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {pillarItems.map((pillar: any, i: number) => (
              <PillarCard
                key={i}
                title={pillar.title}
                subtitle={pillar.subtitle}
                content={pillar.content}
                metrics={pillar.metrics}
                onClick={() => setSelectedPillar(pillar)} // Trigger Drawer
              />
            ))}
          </div>
        </div>

        {/* SKILLS - ENGINEERING TAXONOMY */}

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-white uppercase tracking-[0.1em] text-xl font-black">02. Technical_Taxonomy</h3>
            <div className="h-[1px] flex-grow bg-slate-900"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.skills_hierarchy.map((skill, idx) => (
              <SkillLogCard
                key={idx}
                skillData={skill}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </div>
        </div>

        {/* AI & DATA LABORATORY */}
        <section className="space-y-8 relative">
          <div className="flex items-center gap-4">
            <h3 className="text-white uppercase tracking-[0.1em] text-xl font-black">03. AI_&_DATA_LABORATORY</h3>
            <div className="h-[1px] flex-grow bg-blue-500/20"></div>
            <span className="text-blue-500 font-mono text-[12px] border border-blue-500/90 px-2 py-0.5 animate-pulse">NVIDIA_SYSTEMS_ACTIVE</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Terminal Window */}
            <div className="bg-[#050505] border border-slate-800 rounded-sm overflow-hidden font-mono shadow-2xl group hover:border-blue-500/30 transition-all">
              <div className="bg-slate-900 px-4 py-2 flex gap-1.5 items-center border-b border-slate-800">
                <div className="w-2 h-2 rounded-full bg-red-500/40" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                <span className="ml-2 text-[9px] text-slate-500 uppercase tracking-widest">inference_engine.py</span>
              </div>
              <div className="p-8 text-[11px] leading-relaxed">
                <p className="text-slate-600 mb-2"># Booting NVIDIA GenAI Pipeline for Financial Advisory</p>
                <p className="text-white"><span className="text-purple-500">from</span> langchain_nvidia <span className="text-purple-500">import</span> ChatNVIDIA</p>
                <p className="text-white"><span className="text-purple-500">import</span> modernizer <span className="text-purple-500">as</span> legacy_fix</p>
                <br />
                <p className="text-slate-500">@infrastructure.deploy</p>
                <p className="text-white"><span className="text-blue-400">async def</span> <span className="text-yellow-400">optimize_retirement_manager</span>():</p>
                <p className="text-white pl-4">app = legacy_fix.strangler_pattern(mode=<span className="text-emerald-400">"module_federation"</span>)</p>
                <p className="text-white pl-4">yield <span className="text-blue-400">await</span> app.process(source=<span className="text-emerald-400">"Ember.js"</span>, target=<span className="text-emerald-400">"Vue 3"</span>)</p>
                <br />
                <p className="text-blue-500 animate-pulse cursor tracking-tighter text-lg font-bold">{`>`}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-3xl font-bold text-white tracking-tight leading-none">Generative AI & Infrastructure</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Utilizing my <span className="text-white font-medium italic underline decoration-blue-500/50">NVIDIA Certification</span> to build the next generation of financial advisory tools. Specialized in architecting <span className="text-white">FastAPI</span> backends that bridge massive legacy datasets with modern LLM inference capabilities on <span className="text-white">AWS</span>.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.02] border border-slate-800 p-6 rounded-sm">
                  <div className="text-white font-mono font-black text-2xl tracking-tighter">30%</div>
                  <div className="text-[9px] text-slate-200 uppercase tracking-[0.2em] mt-1">Efficiency_Gain</div>
                </div>
                <div className="bg-white/[0.02] border border-slate-800 p-6 rounded-sm">
                  <div className="text-white font-mono font-black text-2xl tracking-tighter uppercase">AWS</div>
                  <div className="text-[9px] text-slate-200 uppercase tracking-[0.2em] mt-1">Core_Hosting</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: ARCHITECTURE LOG (ADR Explorer) */}
        <section className="space-y-8 pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3
                id="strategic-log"
                className="text-white uppercase tracking-[0.1em] text-xl font-black">
                  04. ARCHITECTURE_DESICION_RECORDS
              </h3>
              <div className="h-[1px] w-32 bg-blue-500/20"></div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <span>Status: Synchronized</span>
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-ping"></span>
            </div>
          </div>

          {/* This is the component you shared */}
          <div className="shadow-2xl shadow-blue-500/5">
            <ArchitectureLog />
          </div>

          <p className="text-slate-300 text-[12px] font-mono italic text-center uppercase tracking-widest">
            // End of Audit Trail - All records encrypted and verified by Morningstar Eng standards
          </p>
        </section>
      </div>
      {/* DRAWERS LAYER */}
      {/* DRAWERS LAYER */}
      <AnimatePresence mode="wait">
        {/* Jira Skill Drawer */}
        {selectedSkill && (
          <JiraDrawer
            skillData={selectedSkill}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter} // Pass the setter function
            onClose={() => {
              setSelectedSkill(null);
              setCurrentFilter(null); // Reset filter when closing
            }}
          />
        )}

        {/* Pillar Strategy Drawer */}
        {selectedPillar && (
          <PillarDrawer
            pillar={selectedPillar}
            onClose={() => setSelectedPillar(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
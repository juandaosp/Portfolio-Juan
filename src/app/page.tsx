"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/Hero/HeroSection';
import JiraDrawer from '@/components/JiraDrawer/JiraDrawer';
import PillarCard from '@/components/PillarCard/PillarCard';
import data from '@/data/portfolio_data.json';
import PillarDrawer from '@/components/PillarDrawer/PilarDrawer';

function SkillLogCard({ skillData, onClick }: { skillData: any, onClick: () => void }) {
  // Scale percentage based on a senior-level point target (e.g., 300 SP)
  const percentage = Math.min((skillData.total_points / 300) * 100, 100);

  return (
    <div
      onClick={onClick}
      className="bg-[#0c0c0c] border border-slate-800 p-6 hover:border-blue-500/50 hover:bg-[#111] transition-all group flex flex-col justify-between h-full rounded-sm cursor-pointer active:scale-[0.98] relative z-10 overflow-hidden"
    >
      {/* Subtle scanline effect for senior technical feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div>
        <div className="flex justify-between items-start mb-8">
          <div className="p-2 bg-slate-900 border border-slate-300 text-slate-200 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
            <code className="text-[10px] font-mono">{`>_`}</code>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-slate-200 tracking-widest uppercase">Verified_Audit</span>
            <span className="text-[10px] font-bold text-green-500/40 font-mono">OK</span>
          </div>
        </div>
        <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">{skillData.skill}</h3>
        <p className="text-slate-300 text-[14px] leading-relaxed mb-6 italic line-clamp-2">
          {skillData.description}
        </p>
      </div>

      <div className="space-y-3">
        <div className="h-[2px] w-full bg-slate-900 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_10px_#2563eb]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[14px] font-mono">
          <div className="flex gap-2 text-slate-200 uppercase">
            <span>{skillData.count} Logs</span>
          </div>
          <span className="text-slate-400 font-bold">{skillData.total_points} SP</span>
        </div>
      </div>
    </div>
  );
}



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
            <h3 className="text-white uppercase tracking-[0.1em] text-xl font-black">01. Strategic Architecture</h3>
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
            <h2 className="text-white text-xl font-bold tracking-tighter uppercase italic">03. AI & Data Laboratory</h2>
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
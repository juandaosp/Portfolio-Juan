"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Database, 
  Activity, 
  ShieldCheck, 
  TestTube, 
  BarChart3 
} from 'lucide-react';
import data from '@/data/portfolio_data.json';
import { PortfolioData } from '@/types/metrics';
import JiraDrawer from '@/components/JiraDrawer/JiraDrawer';

const typedData = data as unknown as PortfolioData;

const getIcon = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('vue') || s.includes('front')) return <Terminal className="text-blue-400" size={20} />;
  if (s.includes('ai') || s.includes('llm')) return <Cpu className="text-purple-400" size={20} />;
  if (s.includes('cloud') || s.includes('devops')) return <Layers className="text-emerald-400" size={20} />;
  if (s.includes('backend') || s.includes('api')) return <Database className="text-amber-400" size={20} />;
  if (s.includes('systems')) return <Activity className="text-rose-400" size={20} />;
  if (s.includes('visualization')) return <BarChart3 className="text-indigo-400" size={20} />;
  if (s.includes('security')) return <ShieldCheck className="text-cyan-400" size={20} />;
  return <TestTube className="text-slate-400" size={20} />;
};

export const BentoGrid = () => {
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null);

  return (
    <div className="p-6 lg:p-12 bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-12">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">
              Engineering <span className="text-blue-600">Matrix</span>
            </h1>
            <p className="text-slate-500 font-mono mt-2 uppercase tracking-widest text-xs">
              Platform Architecture & Performance Metrics
            </p>
          </div>
          <div className="flex gap-8 text-right font-mono">
            <div>
              <div className="text-2xl text-white font-bold">{typedData.metadata.total_story_points}</div>
              <div className="text-[10px] text-slate-500 uppercase">Velocity_Points</div>
            </div>
            <div>
              <div className="text-2xl text-white font-bold">{typedData.metadata.total_tasks}</div>
              <div className="text-[10px] text-slate-500 uppercase">Tickets_Resolved</div>
            </div>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {typedData.skills_hierarchy.map((item, i) => (
            <motion.div
              key={item.skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedSkill(item)}
              className="group relative bg-[#0a0a0a] border border-white/5 p-6 cursor-pointer hover:border-blue-500/50 transition-all overflow-hidden"
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-white/5 rounded-sm group-hover:bg-blue-500/10 transition-colors">
                    {getIcon(item.skill)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-blue-400 transition-colors">
                    {item.total_points} SP
                  </span>
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight group-hover:text-blue-200 uppercase">
                    {item.skill}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 line-clamp-2 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2">
                  {item.projects.slice(0, 2).map(p => (
                    <span key={p} className="text-[8px] font-mono px-1.5 py-0.5 border border-white/10 text-slate-500 uppercase">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Drawer Overlay */}
      <AnimatePresence>
        {selectedSkill && (
          <JiraDrawer 
            skillData={selectedSkill} 
            onClose={() => setSelectedSkill(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Hash, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import trends from '@/data/skill_trends.json';
import Badge from "@/components/Badge";

const getTypeColor = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'architecture': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    case 'bugfix': return 'text-red-400 bg-red-500/10 border-red-500/20';
    case 'feature': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'infrastructure': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    case 'optimization': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  }
};

export default function JiraDrawer({ skillData, onClose, currentFilter, setCurrentFilter }: any) {
  const [activeProject, setActiveProject] = useState('All');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const skillTrendData = useMemo(() => {
    const trendKey = Object.keys(trends).find(
      key => key.toLowerCase() === skillData.skill.toLowerCase()
    );
    console.log('trendKey', trendKey);

    const rawData = trendKey ? (trends as any)[trendKey] : [];
    if (rawData.length === 0) return [];

    // 1. Sort the raw data by date
    const sortedData = [...rawData].sort((a, b) => a.date.localeCompare(b.date));
    console.log('sortedData', sortedData);
    // 2. Create a Map for fast lookup
    const dataMap = new Map(sortedData.map(d => [d.date, d.points]));
    // 3. Generate a continuous timeline from start date to end date
    const filledData = [];
    const start = new Date(sortedData[0].date + "-01");
    const end = new Date(sortedData[sortedData.length - 1].date + "-01");

    let current = new Date(start);
    while (current <= end) {
      // Format current date to YYYY-MM using UTC to avoid timezone shifts
      const y = current.getUTCFullYear();
      const m = String(current.getUTCMonth() + 1).padStart(2, '0');
      const monthKey = `${y}-${m}`;

      filledData.push({
        date: monthKey,
        points: dataMap.get(monthKey) || 0 // If no data for this month, use 0
      });

      current.setUTCMonth(current.getUTCMonth() + 1);
    }

    // NOTE: We don't filter trends by project here because trends.json 
    // represents your global skill velocity. 
    return filledData;
  }, [skillData.skill]); // Removed activeProject dependency since JSON doesn't support it
  // Project Filtering Logic
  // Project & Tech Filtering Logic
  const filteredHighlights = useMemo(() => {
    let list = skillData.highlights || [];

    // 1. Filter by Project first (unless 'All' is selected)
    if (activeProject !== 'All') {
      list = list.filter((h: any) => h.project === activeProject);
    }

    // 2. Filter by Tech Badge
    if (currentFilter) {
      list = list.filter((h: any) =>
        h.techStack?.includes(currentFilter)
      );
    }

    return list;
    // Added currentFilter to dependencies so it triggers a re-render
  }, [skillData.highlights, activeProject, currentFilter]);

  const typeStats = useMemo(() => {
    const stats: Record<string, number> = {};
    filteredHighlights?.forEach((h: any) => {
      const type = h.type || 'Task';
      stats[type] = (stats[type] || 0) + 1;
    });
    return Object.entries(stats);
  }, [filteredHighlights]);

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl h-full bg-[#0d0d0d] border-l border-slate-800 shadow-2xl overflow-y-auto flex flex-col"
      >
        <div className="p-8 space-y-8 flex-1">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight italic">{skillData.skill}</h2>
              <div className="flex gap-2">
                {['All', 'CorpWeb', 'WealthPlatform'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setActiveProject(p)}
                    className={`px-3 py-1 text-[12px] font-mono border transition-all ${activeProject === p ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-800 text-slate-400 hover:border-slate-600'}`}
                  >
                    {p === 'All' ? 'FULL_STACK' : p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-white"><X size={24} /></button>
          </div>

          {/* Velocity Chart Section */}
          <div className="space-y-4">
            <h3 className="text-[12px] font-bold text-slate-300 uppercase flex items-center gap-2 tracking-[0.2em]">
              <TrendingUp size={12} /> Performance Velocity
            </h3>

            {/* Ensure this div has a stable height (h-40 instead of h-32) and overflow-hidden */}
            <div className="h-40 w-full bg-blue-500/[0.02] border border-blue-500/10 p-4 overflow-hidden">
              {skillTrendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={skillTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    {/* Show a minimal X-Axis so you can see the timeline */}
                    <XAxis
                      dataKey="date"
                      hide={false}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'white', fontSize: 9 }}
                      minTickGap={20}
                    />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }}
                      itemStyle={{ color: 'white' }}
                      labelStyle={{ color: 'white', marginBottom: '4px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="points"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPoints)"
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-[10px] text-slate-600 font-mono">
                  NO_VELOCITY_DATA_FOUND
                </div>
              )}
            </div>
          </div>

          {/* Impact Distribution */}
          <div className="flex flex-wrap gap-2">
            {typeStats.map(([type, count]) => (
              <div key={type} className={`px-3 py-1 border rounded-full text-[12px] font-mono flex items-center gap-2 ${getTypeColor(type)}`}>
                {type}: {count}
              </div>
            ))}
          </div>

          {/* Engineering Logs with Tech Breadcrumbs */}
          <div className="space-y-4 pb-20">
            <h3 className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-2 tracking-[0.2em]"><Hash size={12} /> Work Logs ({filteredHighlights.length})</h3>
            <div className="grid gap-4">
              {filteredHighlights?.map((ticket: any, i: number) => (
                <div key={i} className="group bg-[#111] border border-slate-800 p-4 hover:border-blue-500/50 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded-sm border text-[12px] font-bold uppercase tracking-tighter ${getTypeColor(ticket.type)}`}>
                      {ticket.type}
                    </span>
                    <span className="text-[12px] font-mono text-slate-200 italic">{ticket["Issue key"]}</span>
                  </div>

                  <p className="text-slate-200 text-md leading-relaxed font-light mb-3">{ticket.summary}</p>

                  {/* Tech Breadcrumb Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {ticket.techStack.map((tech: string) => (
                      <Badge
                        key={tech}
                        label={tech}
                        isActive={currentFilter === tech}
                        onClick={(value) => {
                          setCurrentFilter(currentFilter === value ? null : value);
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest">{ticket.project}</span>
                    <span className="text-[12px] text-slate-500 font-mono">{ticket.points} SP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
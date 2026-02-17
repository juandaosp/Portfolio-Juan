"use client";
import React from 'react';
import { Layers, Cpu, Award } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
}

interface PillarCardProps {
  title: string;
  subtitle: string;
  content: string;
  metrics?: Metric[];
  onClick: () => void; // 1. Added to interface
}

const getPillarIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('strangler') || t.includes('architecture')) return <Layers size={18} />;
  if (t.includes('ai') || t.includes('nvidia')) return <Cpu size={18} />;
  return <Award size={18} />;
};

// 2. Destructured onClick from props
const PillarCard = ({ title, subtitle, content, metrics, onClick }: PillarCardProps) => {
  return (
    <div
      onClick={onClick} // 3. Now it can find the name 'onClick'
      className="bg-[#0c0c0c] border border-slate-800 p-6 flex flex-col justify-between group cursor-pointer hover:border-blue-500/50 hover:bg-[#111] transition-all min-h-[220px] relative overflow-hidden"
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/5 blur-[50px] group-hover:bg-blue-600/10 transition-all" />

      <div>
        <div className="flex items-center gap-4 mb-5">
          <div className="p-2.5 bg-slate-900 border border-slate-800 text-blue-500 group-hover:scale-110 transition-transform duration-500">
            {getPillarIcon(title)}
          </div>
          <div>
            <h4 className="text-white text-[14px] font-black tracking-widest uppercase">{title}</h4>
            <p className="text-blue-500 text-[12px] uppercase tracking-widest font-mono font-bold">{subtitle}</p>
          </div>
        </div>

        <p className="text-slate-200 text-[16px] leading-relaxed mb-6 font-light">
          {content}
        </p>
      </div>

      <div className="space-y-4">
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[12px] text-slate-200 uppercase tracking-tighter">{metric.label}</span>
                <span className="text-[14px] text-blue-200 font-mono font-bold">{metric.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-slate-300 group-hover:text-blue-500/50 transition-colors">
          <div className="text-[10px] font-mono uppercase tracking-[0.1em]">Verified_Module</div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PillarCard;
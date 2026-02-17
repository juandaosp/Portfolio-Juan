export default function SkillLogCard({ skillData, onClick }: { skillData: any, onClick: () => void }) {
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
          <p className="text-slate-300 text-[14px] leading-relaxed mb-6 italic">
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
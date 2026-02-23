"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Cpu, Activity, ExternalLink, ChevronRight } from 'lucide-react';
import Badge from "@/components/Badge";

export default function PillarDrawer({ pillar, onClose }: { pillar: any; onClose: () => void }) {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex justify-end">

            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
            />

            {/* Drawer Panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl overflow-y-auto z-10"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-white/10 transition-all rounded-full z-[100]"
                    aria-label="Close drawer"
                >
                    <X size={20} />
                </button>

                <div className="p-8 lg:p-12 space-y-8">

                    {/* Header */}
                    <header className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[11px] uppercase font-bold tracking-tighter">
                                {pillar.status}
                            </span>
                            <span className="text-slate-500 text-[11px] font-mono tracking-widest">{pillar.id} · {pillar.date}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[11px] font-mono uppercase tracking-widest">
                            <ShieldCheck size={12} /> Strategic_Pillar_Verified
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-tight">
                            {pillar.title}
                        </h2>
                        <p className="text-blue-500 font-mono text-sm tracking-widest">{pillar.subtitle}</p>
                    </header>

                    {/* Context */}
                    <section className="space-y-2">
                        <h3 className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] border-b border-slate-800 pb-1 flex items-center gap-2">
                            <ShieldCheck size={12} /> Context
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">{pillar.context}</p>
                    </section>

                    {/* Decision */}
                    <section className="space-y-2">
                        <h3 className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] border-b border-slate-800 pb-1 flex items-center gap-2">
                            <Cpu size={12} /> Decision
                        </h3>
                        <div className="bg-blue-500/5 border border-blue-500/20 p-4 text-blue-100 text-sm italic leading-relaxed">
                            "{pillar.decision}"
                        </div>
                    </section>

                    {/* Consequences */}
                    {pillar.consequences && pillar.consequences.length > 0 && (
                        <section className="space-y-2">
                            <h3 className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] border-b border-slate-800 pb-1 flex items-center gap-2">
                                <Activity size={12} /> Consequences & Metrics
                            </h3>
                            <ul className="space-y-2">
                                {pillar.consequences.map((c: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                                        <ChevronRight size={14} className="text-blue-500 shrink-0 mt-0.5" />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Metrics */}
                    {pillar.metrics && pillar.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {pillar.metrics.map((m: any, i: number) => (
                                <div key={i} className="border border-slate-800 p-4 bg-[#050505]">
                                    <div className="text-[11px] text-slate-400 uppercase font-mono mb-1 tracking-widest">{m.label}</div>
                                    <div className="text-2xl font-black text-white">{m.value}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tech Stack */}
                    {pillar.techStack && pillar.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {pillar.techStack.map((tech: string) => (
                                <Badge key={tech} label={tech} className="opacity-80" />
                            ))}
                        </div>
                    )}

                    {/* Live URL */}
                    {pillar.liveUrl && (
                        <div className="border-t border-slate-800 pt-6">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-3">
                                Production_Deployment
                            </p>
                            <a
                                href={pillar.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 px-5 py-3 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all w-full"
                            >
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-emerald-400 font-mono text-[12px] uppercase tracking-widest flex-grow">
                                    View Live Project
                                </span>
                                <ExternalLink size={14} className="text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
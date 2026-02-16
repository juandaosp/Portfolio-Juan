"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

export default function PillarDrawer({ pillar, onClose }: { pillar: any; onClose: () => void }) {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        // Fixed: pointer-events-none on the root wrapper allows the backdrop to be interactive
        <div className="fixed inset-0 z-[9999] flex justify-end pointer-events-none">

            {/* Backdrop: clicking this triggers onClose */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out pointer-events-auto"
            />

            {/* Drawer Panel: pointer-events-auto ensures content is clickable */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative max-w-xl h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl p-8 lg:p-12 overflow-y-auto pointer-events-auto"
            >
                {/* Close Button  */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-white/10 transition-all rounded-full z-[100]"
                    aria-label="Close drawer"
                >
                    <X size={20} />
                </button>

                <div className="space-y-10 relative">
                    <header className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[12px] font-mono uppercase tracking-widest">
                            <ShieldCheck size={12} /> Strategic_Pillar_Verified
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">
                            {pillar.title}
                        </h2>
                        <p className="text-blue-500 font-mono text-lg tracking-widest">{pillar.subtitle}</p>
                    </header>

                    <section className="bg-white/[0.02] border border-white/5 p-6 font-light leading-relaxed text-slate-200 text-lg">
                        {pillar.content}
                    </section>

                    {pillar.metrics && (
                        <div className="grid grid-cols-2 gap-4">
                            {pillar.metrics.map((m: any, i: number) => (
                                <div key={i} className="border border-slate-200 p-4 bg-[#050505]">
                                    <div className="text-12px text-slate-200 uppercase font-mono mb-1">{m.label}</div>
                                    <div className="text-2xl font-black text-white">{m.value}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
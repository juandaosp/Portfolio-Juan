"use client";
import { motion } from 'framer-motion';
import { Share2, Layout, Database, ShieldCheck } from 'lucide-react';

export default function MfeDiagram() {
    return (
        <div className="glass-card p-8 bg-slate-900/20 border border-white/5 rounded-sm overflow-hidden relative">
            <div className="flex items-center gap-3 mb-8">
                <Share2 className="text-blue-500" size={20} />
                <h3 className="text-white text-xs font-bold uppercase tracking-widest">Architectural Pattern: Module Federation</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around gap-8 relative">
                {/* The Host Shell */}
                <div className="z-10 flex flex-col items-center gap-2">
                    <div className="w-24 h-24 rounded-sm border-2 border-blue-500 bg-blue-500/10 flex items-center justify-center relative">
                        <Layout className="text-blue-400" />
                        <div className="absolute -top-2 px-2 bg-blue-500 text-[8px] font-bold text-black uppercase">Host Shell</div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Legacy Ember.js</span>
                </div>

                {/* The Connection Lines */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -translate-y-1/2" />

                {/* Remote MFE 1 */}
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="z-10 flex flex-col items-center gap-2"
                >
                    <div className="w-20 h-20 rounded-sm border border-emerald-500/50 bg-emerald-500/5 flex items-center justify-center relative">
                        <Database className="text-emerald-400" />
                        <div className="absolute -top-2 px-2 bg-emerald-500 text-[8px] font-bold text-black uppercase">Vue 3 Remote</div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Income Secure 2.0</span>
                </motion.div>

                {/* Remote MFE 2 */}
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="z-10 flex flex-col items-center gap-2"
                >
                    <div className="w-20 h-20 rounded-sm border border-purple-500/50 bg-purple-500/5 flex items-center justify-center relative">
                        <ShieldCheck className="text-purple-400" />
                        <div className="absolute -top-2 px-2 bg-purple-500 text-[8px] font-bold text-black uppercase">Auth Bridge</div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Shared Pinia Store</span>
                </motion.div>
            </div>

            <p className="mt-8 text-[11px] text-slate-500 leading-relaxed italic max-w-lg">
                "Implemented the Strangler Pattern by embedding modern Vue 3 remotes into the legacy .NET/Ember host.
                Achieved granular migration without service downtime for 300k+ advisory users."
            </p>
        </div>
    );
}
"use client";

import { motion } from "framer-motion";

const CONTACT_LINKS = [
    {
        label: "EMAIL",
        value: "juandaosp12@gmail.com",
        href: "mailto:juandaosp12@gmail.com",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
            </svg>
        ),
    },
    {
        label: "LINKEDIN",
        value: "in/juandavidospinav",
        href: "https://linkedin.com/in/juandavidospinav",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
            </svg>
        ),
    },
    {
        label: "GITHUB",
        value: "github.com/juandaosp",
        href: "https://github.com/juandaosp",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
] as const;

export default function ContactSection() {
    return (
        <section id="contact" className="space-y-8 pt-10 scroll-mt-20">

            {/* Section header — matches the pattern of every other section */}
            <div className="flex items-center gap-4">
                <h3 className="text-white uppercase tracking-[0.1em] text-xl font-black">
                    05. CONTACT_PROTOCOL
                </h3>
                <div className="h-[1px] flex-grow bg-slate-900" />
                {/* Blinking availability indicator */}
                <div className="flex items-center gap-2 font-mono text-[12px] text-emerald-400 uppercase tracking-widest">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    OPEN_TO_WORK
                </div>
            </div>

            {/* Content grid */}
            <div className="grid lg:grid-cols-2 gap-6">

                {/* Left — intent statement */}
                <div className="bg-[#050505] border border-slate-800 p-8 space-y-4">
                    <p className="font-mono text-[10px] text-slate-300 uppercase tracking-[0.3em]">
                        transmission.init
                    </p>
                    <p className="text-white text-2xl font-black tracking-tight leading-relax">
                        Open to Senior Frontend<br />
                        <span className="text-slate-400 font-ligh leading-relaxt">
                            & Fullstack roles
                        </span>
                    </p>
                    <p className="text-slate-300 text-md leading-relaxed">
                        Remote-first. Based in{" "}
                        <span className="text-white">Cali, Colombia.</span>{" "}
                        Available for international teams across any timezone.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                        {["Vue 3", "Next.js", "FastAPI", "AWS", "AI Infrastructure"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[10px] text-blue-400 border border-blue-500/30 bg-blue-500/5 px-2 py-1 uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                </div>

                {/* Right — contact links */}
                <div className="space-y-3">
                    {CONTACT_LINKS.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, x: 12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: i * 0.08, duration: 0.3 }}
                            className="group flex items-center justify-between bg-[#050505] border border-slate-800 p-5 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200 cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-slate-500 group-hover:text-blue-400 transition-colors">
                                    {link.icon}
                                </span>
                                <div>
                                    <p className="font-mono text-[12px] text-blue-400 uppercase tracking-[0.25em] mb-0.5">
                                        {link.label}
                                    </p>
                                    <p className="text-white text-md font-medium">{link.value}</p>
                                </div>
                            </div>
                            {/* Arrow — signals it's clickable */}
                            <span className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200 font-mono text-lg" >
                                →
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Footer audit line — matches the ADR section's closing line */}
            <p className="text-slate-400 text-[11px] font-mono italic text-center uppercase tracking-widest pt-4 border-t border-slate-900">
                // End of transmission — juan david ospina · senior software engineer
            </p>
        </section>
    );
}
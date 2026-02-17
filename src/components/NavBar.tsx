"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "hero",                   label: "00_JUAN",    short: "00" },
  { id: "strategic-architecture", label: "01_ARCH",    short: "01" },
  { id: "technical-taxonomy",     label: "02_STACK",   short: "02" },
  { id: "ai-laboratory",          label: "03_AI_LAB",  short: "03" },
  { id: "strategic-log",          label: "04_ADR",     short: "04" },
  { id: "contact",                label: "05_CONTACT", short: "05" },
] as const;

type NavId = typeof NAV_ITEMS[number]["id"];

// How many px from the bottom of the page counts as "at contact section"
const BOTTOM_THRESHOLD = 100;

export default function NavBar() {
  const [activeId, setActiveId] = useState<NavId>("hero");

  useEffect(() => {
    const visibleIds = new Set<string>();

    const pickActive = () => {
      // Special case: if user is near the bottom of the page,
      // always highlight the last section regardless of intersection.
      const distFromBottom =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;

      if (distFromBottom < BOTTOM_THRESHOLD) {
        setActiveId("contact");
        return;
      }

      if (visibleIds.size === 0) return;

      let closestId = "";
      let closestDist = Infinity;

      visibleIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top);
        if (dist < closestDist) {
          closestDist = dist;
          closestId = id;
        }
      });

      if (closestId) setActiveId(closestId as NavId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        });
        pickActive();
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", pickActive, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
    };
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 bg-[#050505]/90 backdrop-blur-md border border-slate-800 px-3 py-2">
        {NAV_ITEMS.map(({ id, label, short }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-white bg-blue-500/20 border border-blue-500/40"
                  : "text-slate-500 hover:text-slate-300 border border-transparent"
              }`}
            >
              <span className="hidden md:inline">{label}</span>
              <span className="inline md:hidden">{short}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
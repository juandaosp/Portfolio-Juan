"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper for clean Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  label: string;
  onClick?: (label: string) => void;
  isActive?: boolean;
  className?: string;
}

export default function Badge({ label, onClick, isActive, className }: BadgeProps) {
  const isClickable = !!onClick;

  return (
    <motion.button
      whileHover={isClickable ? { scale: 1.05 } : {}}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      onClick={() => onClick?.(label)}
      disabled={!isClickable}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors select-none",
        // Interactive vs Static styles
        isClickable ? "cursor-pointer" : "cursor-default",
        // Active vs Inactive styles
        isActive
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-white text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
        className="text-[12px] font-mono px-2 rounded-sm uppercase"
      )}
    >
      {label}
    </motion.button>
  );
}
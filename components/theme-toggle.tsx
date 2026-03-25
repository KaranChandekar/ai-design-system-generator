"use client";

import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center h-9 w-[72px] rounded-full border border-border bg-muted/50 backdrop-blur-sm transition-colors hover:bg-muted"
      aria-label="Toggle theme"
    >
      <Sun className="absolute left-2 w-3.5 h-3.5 text-amber-400 opacity-40" />
      <Moon className="absolute right-2 w-3.5 h-3.5 text-indigo-300 opacity-40" />
      <motion.div
        className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
        animate={{ x: isDark ? 38 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-white" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-white" />
        )}
      </motion.div>
    </button>
  );
}

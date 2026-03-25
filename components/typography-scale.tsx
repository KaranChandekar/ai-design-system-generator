"use client";

import { motion } from "framer-motion";
import type { DesignSystem } from "@/types";

interface TypographyScaleProps {
  typography: DesignSystem["typography"];
}

export function TypographyScale({ typography }: TypographyScaleProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
          <h3 className="text-xl font-bold">Font Families</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(typography.fontFamily).map(([role, font]) => (
            <div
              key={role}
              className="p-5 bg-card rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-2">
                {role}
              </p>
              <p className="text-xl font-medium" style={{ fontFamily: font }}>
                {font}
              </p>
              <p
                className="text-sm text-muted-foreground mt-3 leading-relaxed"
                style={{ fontFamily: font }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
          <h3 className="text-xl font-bold">Type Scale</h3>
        </div>
        <div className="space-y-2">
          {typography.scale.map((level, i) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-baseline gap-4 p-4 bg-card rounded-xl border border-border group hover:border-indigo-500/20 transition-colors"
            >
              <div className="w-16 sm:w-20 shrink-0">
                <p className="text-xs font-mono text-indigo-400 font-semibold">
                  {level.name}
                </p>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p
                  style={{
                    fontSize: level.fontSize,
                    lineHeight: level.lineHeight,
                    fontWeight: level.fontWeight,
                    letterSpacing: level.letterSpacing || "normal",
                    fontFamily: level.name.startsWith("h")
                      ? typography.fontFamily.heading
                      : typography.fontFamily.body,
                  }}
                  className="truncate"
                >
                  Design systems empower teams
                </p>
              </div>
              <div className="hidden sm:flex shrink-0 gap-3 text-[10px] text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-muted px-1.5 py-0.5 rounded">{level.fontSize}</span>
                <span className="bg-muted px-1.5 py-0.5 rounded">{level.fontWeight}</span>
                <span className="bg-muted px-1.5 py-0.5 rounded">{level.lineHeight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import type { DesignSystem } from "@/types";

interface SpacingScaleProps {
  spacing: DesignSystem["spacing"];
}

export function SpacingScale({ spacing }: SpacingScaleProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
        <div>
          <h3 className="text-xl font-bold">Spacing Scale</h3>
          <p className="text-sm text-muted-foreground">
            Base unit: {spacing.baseUnit}px
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {spacing.scale.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border hover:border-indigo-500/20 transition-colors"
          >
            <span className="w-10 sm:w-12 text-xs font-mono font-semibold text-indigo-400">
              {s.name}
            </span>
            <div className="flex-1">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all"
                style={{ width: `${Math.min(s.pixels * 2, 100)}%` }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-14 text-right">
              {s.value}
            </span>
            <span className="text-xs text-muted-foreground w-10 text-right">
              {s.pixels}px
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

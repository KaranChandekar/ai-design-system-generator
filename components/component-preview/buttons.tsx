"use client";

import type { DesignSystem } from "@/types";

interface ButtonsPreviewProps {
  system: DesignSystem;
}

export function ButtonsPreview({ system }: ButtonsPreviewProps) {
  const primary = system.colors.primary.hex;
  const secondary = system.colors.secondary.hex;
  const radius = system.borderRadius.md;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Buttons
      </h4>
      <div className="flex flex-wrap gap-3">
        <button
          className="px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{
            backgroundColor: primary,
            borderRadius: radius,
          }}
        >
          Primary Action
        </button>
        <button
          className="px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{
            backgroundColor: secondary,
            borderRadius: radius,
          }}
        >
          Secondary
        </button>
        <button
          className="px-5 py-2.5 text-sm font-medium border-2 transition-colors hover:bg-white/5"
          style={{
            borderColor: primary,
            color: primary,
            borderRadius: radius,
          }}
        >
          Outline
        </button>
        <button
          className="px-5 py-2.5 text-sm font-medium transition-colors hover:underline"
          style={{ color: primary }}
        >
          Ghost
        </button>
        <button
          className="px-5 py-2.5 text-sm font-medium text-white opacity-50 cursor-not-allowed"
          style={{
            backgroundColor: primary,
            borderRadius: radius,
          }}
          disabled
        >
          Disabled
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className="px-3 py-1.5 text-xs font-medium text-white"
          style={{ backgroundColor: primary, borderRadius: radius }}
        >
          Small
        </button>
        <button
          className="px-5 py-2.5 text-sm font-medium text-white"
          style={{ backgroundColor: primary, borderRadius: radius }}
        >
          Medium
        </button>
        <button
          className="px-7 py-3 text-base font-medium text-white"
          style={{ backgroundColor: primary, borderRadius: radius }}
        >
          Large
        </button>
      </div>
    </div>
  );
}

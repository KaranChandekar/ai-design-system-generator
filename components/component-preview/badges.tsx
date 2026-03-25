"use client";

import type { DesignSystem } from "@/types";

interface BadgesPreviewProps {
  system: DesignSystem;
}

export function BadgesPreview({ system }: BadgesPreviewProps) {
  const radius = system.borderRadius.full;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Badges & Tags
      </h4>
      <div className="flex flex-wrap gap-2">
        <span
          className="px-3 py-1 text-xs font-medium text-white"
          style={{
            backgroundColor: system.colors.primary.hex,
            borderRadius: radius,
          }}
        >
          Primary
        </span>
        <span
          className="px-3 py-1 text-xs font-medium text-white"
          style={{
            backgroundColor: system.colors.secondary.hex,
            borderRadius: radius,
          }}
        >
          Secondary
        </span>
        <span
          className="px-3 py-1 text-xs font-medium text-white"
          style={{
            backgroundColor: system.colors.accent.hex,
            borderRadius: radius,
          }}
        >
          Accent
        </span>
        <span
          className="px-3 py-1 text-xs font-medium text-white"
          style={{
            backgroundColor: system.colors.success,
            borderRadius: radius,
          }}
        >
          Success
        </span>
        <span
          className="px-3 py-1 text-xs font-medium text-white"
          style={{
            backgroundColor: system.colors.warning,
            borderRadius: radius,
          }}
        >
          Warning
        </span>
        <span
          className="px-3 py-1 text-xs font-medium text-white"
          style={{
            backgroundColor: system.colors.error,
            borderRadius: radius,
          }}
        >
          Error
        </span>
        <span
          className="px-3 py-1 text-xs font-medium text-white"
          style={{
            backgroundColor: system.colors.info,
            borderRadius: radius,
          }}
        >
          Info
        </span>
      </div>

      {/* Outline badges */}
      <div className="flex flex-wrap gap-2">
        <span
          className="px-3 py-1 text-xs font-medium border-2"
          style={{
            borderColor: system.colors.primary.hex,
            color: system.colors.primary.hex,
            borderRadius: radius,
          }}
        >
          Outline
        </span>
        <span
          className="px-3 py-1 text-xs font-medium border-2"
          style={{
            borderColor: system.colors.secondary.hex,
            color: system.colors.secondary.hex,
            borderRadius: radius,
          }}
        >
          Outline
        </span>
        <span
          className="px-3 py-1 text-xs font-medium border-2"
          style={{
            borderColor: system.colors.accent.hex,
            color: system.colors.accent.hex,
            borderRadius: radius,
          }}
        >
          Outline
        </span>
      </div>

      {/* Status dots */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: "Active", color: system.colors.success },
          { label: "Pending", color: system.colors.warning },
          { label: "Inactive", color: system.colors.error },
        ].map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 text-sm">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

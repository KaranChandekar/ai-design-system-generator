"use client";

import type { DesignSystem } from "@/types";

interface CardsPreviewProps {
  system: DesignSystem;
}

export function CardsPreview({ system }: CardsPreviewProps) {
  const radius = system.borderRadius.lg;
  const shadow = system.shadows[0]?.value || "0 1px 3px rgba(0,0,0,0.1)";
  const primary = system.colors.primary.hex;
  const accent = system.colors.accent.hex;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Cards
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="p-5 border border-border bg-card"
          style={{ borderRadius: radius, boxShadow: shadow }}
        >
          <div
            className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: primary }}
          >
            A
          </div>
          <h5
            className="font-semibold mb-1"
            style={{ fontFamily: system.typography.fontFamily.heading }}
          >
            Feature Card
          </h5>
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: system.typography.fontFamily.body }}
          >
            A simple card with an icon, heading, and description text.
          </p>
        </div>

        <div
          className="overflow-hidden border border-border bg-card"
          style={{ borderRadius: radius, boxShadow: shadow }}
        >
          <div className="h-24" style={{ backgroundColor: accent }} />
          <div className="p-4">
            <h5
              className="font-semibold mb-1"
              style={{ fontFamily: system.typography.fontFamily.heading }}
            >
              Media Card
            </h5>
            <p
              className="text-sm text-muted-foreground"
              style={{ fontFamily: system.typography.fontFamily.body }}
            >
              Card with a colored header area for media content.
            </p>
          </div>
        </div>

        <div
          className="p-5 text-white"
          style={{
            backgroundColor: primary,
            borderRadius: radius,
            boxShadow: shadow,
          }}
        >
          <h5
            className="font-semibold mb-1"
            style={{ fontFamily: system.typography.fontFamily.heading }}
          >
            Elevated Card
          </h5>
          <p
            className="text-sm text-white/70"
            style={{ fontFamily: system.typography.fontFamily.body }}
          >
            A filled card for high-emphasis content blocks.
          </p>
          <button
            className="mt-3 px-4 py-1.5 text-sm font-medium rounded-md bg-white/20 hover:bg-white/30 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

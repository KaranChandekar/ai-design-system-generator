"use client";

import { contrastMatrix } from "@/lib/color-utils";
import { AccessibilityBadge } from "./accessibility-badge";

interface ContrastMatrixProps {
  colors: Record<string, string>;
}

export function ContrastMatrix({ colors }: ContrastMatrixProps) {
  const matrix = contrastMatrix(colors);
  const colorNames = Object.keys(colors);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
          <h3 className="text-xl font-bold">WCAG Contrast Matrix</h3>
        </div>
        <p className="text-sm text-muted-foreground ml-4">
          AA requires 4.5:1 for normal text. AAA requires 7:1. Check which color
          combinations are accessible.
        </p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-left text-xs text-muted-foreground font-semibold">
                BG \ FG
              </th>
              {colorNames.map((name) => (
                <th key={name} className="p-2 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-7 h-7 rounded-lg border border-border shadow-sm"
                      style={{ backgroundColor: colors[name] }}
                    />
                    <span className="text-[10px] text-muted-foreground capitalize font-medium">
                      {name}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.color} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg border border-border shadow-sm"
                      style={{ backgroundColor: row.hex }}
                    />
                    <span className="text-xs capitalize font-medium">{row.color}</span>
                  </div>
                </td>
                {row.contrasts.map((c) => (
                  <td key={c.against} className="p-2 text-center">
                    {row.color === c.against ? (
                      <span className="text-xs text-muted-foreground/40">--</span>
                    ) : (
                      <AccessibilityBadge
                        rating={c.rating}
                        ratio={c.ratio}
                        size="sm"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

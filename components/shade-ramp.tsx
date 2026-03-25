"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { ColorShades } from "@/types";
import { isLightColor } from "@/lib/color-utils";

interface ShadeRampProps {
  name: string;
  shades: ColorShades;
}

export function ShadeRamp({ name, shades }: ShadeRampProps) {
  const [copiedShade, setCopiedShade] = useState<string | null>(null);

  const copy = (hex: string, shade: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedShade(shade);
    setTimeout(() => setCopiedShade(null), 1500);
  };

  const shadeEntries = Object.entries(shades) as [string, string][];

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <p className="text-sm font-semibold mb-3 capitalize">{name}</p>
      <div className="flex rounded-xl overflow-hidden">
        {shadeEntries.map(([shade, hex]) => {
          const light = isLightColor(hex);
          return (
            <button
              key={shade}
              onClick={() => copy(hex, shade)}
              className="flex-1 h-16 sm:h-14 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg relative"
              style={{ backgroundColor: hex }}
              title={`${shade}: ${hex}`}
            >
              <span
                className={`text-[10px] font-semibold ${light ? "text-gray-900" : "text-white"}`}
              >
                {shade}
              </span>
              {copiedShade === shade ? (
                <Check
                  className={`w-3 h-3 ${light ? "text-gray-900" : "text-white"}`}
                />
              ) : (
                <span
                  className={`text-[8px] sm:text-[9px] font-mono hidden sm:block ${light ? "text-gray-700" : "text-white/70"}`}
                >
                  {hex}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

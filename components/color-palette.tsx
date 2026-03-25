"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import type { DesignColor } from "@/types";
import { hexToRgb, hexToHsl, isLightColor } from "@/lib/color-utils";
import { ShadeRamp } from "./shade-ramp";

interface ColorPaletteProps {
  colors: {
    primary: DesignColor;
    secondary: DesignColor;
    accent: DesignColor;
    neutral: DesignColor;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

function ColorCard({ color, index }: { color: DesignColor; index: number }) {
  const light = isLightColor(color.hex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div
        className="h-32 p-4 flex flex-col justify-between relative overflow-hidden"
        style={{ backgroundColor: color.hex }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" />
        <span
          className={`text-lg font-bold relative z-10 ${light ? "text-gray-900" : "text-white"}`}
        >
          {color.name}
        </span>
        <span
          className={`text-xs leading-relaxed relative z-10 ${light ? "text-gray-700" : "text-white/80"}`}
        >
          {color.usage}
        </span>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex items-center justify-between group">
          <span className="text-xs text-muted-foreground font-mono">
            {color.hex.toUpperCase()}
          </span>
          <CopyButton text={color.hex} />
        </div>
        <div className="flex items-center justify-between group">
          <span className="text-xs text-muted-foreground font-mono">
            {hexToRgb(color.hex)}
          </span>
          <CopyButton text={hexToRgb(color.hex)} />
        </div>
        <div className="flex items-center justify-between group">
          <span className="text-xs text-muted-foreground font-mono">
            {hexToHsl(color.hex)}
          </span>
          <CopyButton text={hexToHsl(color.hex)} />
        </div>
      </div>
    </motion.div>
  );
}

function SemanticColor({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="group flex items-center gap-3 p-2 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer"
    >
      <div
        className="w-10 h-10 rounded-xl shrink-0 shadow-inner"
        style={{ backgroundColor: hex }}
      />
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-semibold capitalize">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">
          {copied ? "Copied!" : hex}
        </p>
      </div>
    </button>
  );
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  const mainColors = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.neutral,
  ];

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
          <h3 className="text-xl font-bold">Core Palette</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainColors.map((color, i) => (
            <ColorCard key={color.name} color={color} index={i} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
          <h3 className="text-xl font-bold">Shade Ramps</h3>
        </div>
        <div className="space-y-4">
          {mainColors.map((color) => (
            <ShadeRamp key={color.name} name={color.name} shades={color.shades} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-pink-500 to-rose-500" />
          <h3 className="text-xl font-bold">Semantic Colors</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4 bg-card rounded-2xl border border-border">
          <SemanticColor name="success" hex={colors.success} />
          <SemanticColor name="warning" hex={colors.warning} />
          <SemanticColor name="error" hex={colors.error} />
          <SemanticColor name="info" hex={colors.info} />
        </div>
      </div>
    </div>
  );
}

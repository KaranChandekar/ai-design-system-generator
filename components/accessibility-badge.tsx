"use client";

import type { WCAGRating } from "@/lib/color-utils";

interface AccessibilityBadgeProps {
  rating: WCAGRating;
  ratio: number;
  size?: "sm" | "md";
}

export function AccessibilityBadge({
  rating,
  ratio,
  size = "md",
}: AccessibilityBadgeProps) {
  const colors = {
    AAA: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    AA: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Fail: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${colors[rating]} ${sizeClasses[size]}`}
    >
      <span>{rating}</span>
      <span className="opacity-70">{ratio}:1</span>
    </span>
  );
}

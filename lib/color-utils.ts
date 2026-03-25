import chroma from "chroma-js";

export function getContrastRatio(color1: string, color2: string): number {
  try {
    return chroma.contrast(color1, color2);
  } catch {
    return 0;
  }
}

export type WCAGRating = "AAA" | "AA" | "Fail";

export function getWCAGRating(ratio: number): WCAGRating {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
}

export interface ContrastResult {
  against: string;
  againstHex: string;
  ratio: number;
  rating: WCAGRating;
}

export interface ContrastRow {
  color: string;
  hex: string;
  contrasts: ContrastResult[];
}

export function contrastMatrix(
  colors: Record<string, string>
): ContrastRow[] {
  const entries = Object.entries(colors);
  return entries.map(([name1, hex1]) => ({
    color: name1,
    hex: hex1,
    contrasts: entries.map(([name2, hex2]) => {
      const ratio = getContrastRatio(hex1, hex2);
      return {
        against: name2,
        againstHex: hex2,
        ratio: Math.round(ratio * 100) / 100,
        rating: getWCAGRating(ratio),
      };
    }),
  }));
}

export function hexToRgb(hex: string): string {
  try {
    const [r, g, b] = chroma(hex).rgb();
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return "rgb(0, 0, 0)";
  }
}

export function hexToHsl(hex: string): string {
  try {
    const [h, s, l] = chroma(hex).hsl();
    return `hsl(${Math.round(h || 0)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  } catch {
    return "hsl(0, 0%, 0%)";
  }
}

export function isLightColor(hex: string): boolean {
  try {
    return chroma(hex).luminance() > 0.5;
  } catch {
    return false;
  }
}

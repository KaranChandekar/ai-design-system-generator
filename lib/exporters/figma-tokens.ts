import type { DesignSystem, ColorShades } from "@/types";

function colorShadesToTokens(name: string, shades: ColorShades) {
  const tokens: Record<string, { value: string; type: string }> = {};
  Object.entries(shades).forEach(([shade, hex]) => {
    tokens[`${name}-${shade}`] = { value: hex, type: "color" };
  });
  return tokens;
}

export function generateFigmaTokens(system: DesignSystem): string {
  const tokens = {
    color: {
      ...colorShadesToTokens("primary", system.colors.primary.shades),
      ...colorShadesToTokens("secondary", system.colors.secondary.shades),
      ...colorShadesToTokens("accent", system.colors.accent.shades),
      ...colorShadesToTokens("neutral", system.colors.neutral.shades),
      success: { value: system.colors.success, type: "color" },
      warning: { value: system.colors.warning, type: "color" },
      error: { value: system.colors.error, type: "color" },
      info: { value: system.colors.info, type: "color" },
    },
    fontFamily: {
      heading: { value: system.typography.fontFamily.heading, type: "fontFamilies" },
      body: { value: system.typography.fontFamily.body, type: "fontFamilies" },
      mono: { value: system.typography.fontFamily.mono, type: "fontFamilies" },
    },
    fontSize: Object.fromEntries(
      system.typography.scale.map((level) => [
        level.name,
        { value: level.fontSize, type: "fontSizes" },
      ])
    ),
    lineHeight: Object.fromEntries(
      system.typography.scale.map((level) => [
        level.name,
        { value: level.lineHeight, type: "lineHeights" },
      ])
    ),
    spacing: Object.fromEntries(
      system.spacing.scale.map((s) => [
        s.name,
        { value: s.value, type: "spacing" },
      ])
    ),
    borderRadius: Object.fromEntries(
      Object.entries(system.borderRadius).map(([name, value]) => [
        name,
        { value, type: "borderRadius" },
      ])
    ),
    boxShadow: Object.fromEntries(
      system.shadows.map((s) => [
        s.name,
        { value: s.value, type: "boxShadow" },
      ])
    ),
  };

  return JSON.stringify(tokens, null, 2);
}

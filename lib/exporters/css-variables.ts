import type { DesignSystem, ColorShades } from "@/types";

function colorShadeVars(prefix: string, shades: ColorShades): string {
  return Object.entries(shades)
    .map(([shade, hex]) => `  --color-${prefix}-${shade}: ${hex};`)
    .join("\n");
}

export function generateCSSVariables(system: DesignSystem): string {
  let css = `:root {\n`;
  css += `  /* Primary */\n`;
  css += colorShadeVars("primary", system.colors.primary.shades) + "\n\n";
  css += `  /* Secondary */\n`;
  css += colorShadeVars("secondary", system.colors.secondary.shades) + "\n\n";
  css += `  /* Accent */\n`;
  css += colorShadeVars("accent", system.colors.accent.shades) + "\n\n";
  css += `  /* Neutral */\n`;
  css += colorShadeVars("neutral", system.colors.neutral.shades) + "\n\n";
  css += `  /* Semantic */\n`;
  css += `  --color-success: ${system.colors.success};\n`;
  css += `  --color-warning: ${system.colors.warning};\n`;
  css += `  --color-error: ${system.colors.error};\n`;
  css += `  --color-info: ${system.colors.info};\n\n`;
  css += `  /* Typography */\n`;
  css += `  --font-heading: "${system.typography.fontFamily.heading}", sans-serif;\n`;
  css += `  --font-body: "${system.typography.fontFamily.body}", sans-serif;\n`;
  css += `  --font-mono: "${system.typography.fontFamily.mono}", monospace;\n\n`;

  system.typography.scale.forEach((level) => {
    css += `  --text-${level.name}-size: ${level.fontSize};\n`;
    css += `  --text-${level.name}-line-height: ${level.lineHeight};\n`;
    css += `  --text-${level.name}-weight: ${level.fontWeight};\n`;
  });

  css += `\n  /* Spacing */\n`;
  system.spacing.scale.forEach((s) => {
    css += `  --spacing-${s.name}: ${s.value};\n`;
  });

  css += `\n  /* Border Radius */\n`;
  Object.entries(system.borderRadius).forEach(([name, value]) => {
    css += `  --radius-${name}: ${value};\n`;
  });

  css += `\n  /* Shadows */\n`;
  system.shadows.forEach((s) => {
    css += `  --shadow-${s.name}: ${s.value};\n`;
  });

  css += `}\n\n`;

  css += `/* Dark Mode */\n`;
  css += `.dark {\n`;
  css += `  --color-background: ${system.darkMode.background};\n`;
  css += `  --color-surface: ${system.darkMode.surface};\n`;
  css += `  --color-text: ${system.darkMode.text};\n`;
  css += `  --color-text-muted: ${system.darkMode.textMuted};\n`;
  css += `}\n`;

  return css;
}

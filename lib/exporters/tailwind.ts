import type { DesignSystem } from "@/types";

export function generateTailwindConfig(system: DesignSystem): string {
  return `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: ${JSON.stringify(system.colors.primary.shades, null, 8)},
        secondary: ${JSON.stringify(system.colors.secondary.shades, null, 8)},
        accent: ${JSON.stringify(system.colors.accent.shades, null, 8)},
        neutral: ${JSON.stringify(system.colors.neutral.shades, null, 8)},
        success: "${system.colors.success}",
        warning: "${system.colors.warning}",
        error: "${system.colors.error}",
        info: "${system.colors.info}",
      },
      fontFamily: {
        heading: ["${system.typography.fontFamily.heading}", "sans-serif"],
        body: ["${system.typography.fontFamily.body}", "sans-serif"],
        mono: ["${system.typography.fontFamily.mono}", "monospace"],
      },
      borderRadius: ${JSON.stringify(system.borderRadius, null, 6)},
      boxShadow: {
${system.shadows.map((s) => `        "${s.name}": "${s.value}",`).join("\n")}
      },
    },
  },
  plugins: [],
};

export default config;`;
}

---
name: ai-design-system-generator
description: "Build an AI design system generator that creates complete design systems from brand descriptions — color palettes with accessibility ratings, typography scales, component previews, and exportable Tailwind configs. Use this skill whenever the user wants to work on the design system generator project, mentions design system, color palette generator, typography scale, WCAG accessibility, Tailwind config generator, CSS variables, design tokens, or wants to build/extend/debug any part of this application. Also trigger when the user mentions component library preview, color contrast, or Figma tokens in the context of this project."
---

# AI Design System Generator

## What You're Building

A Next.js application where users describe their brand or upload existing assets, and the AI generates a complete design system: color palette with WCAG accessibility ratings, typography scale, component library preview, spacing system, dark/light modes, and exportable Tailwind config / CSS variables / Figma tokens.

This is inherently a visual project — the output IS the design. Perfect for a portfolio.

## Architecture Overview

```
app/
├── layout.tsx
├── page.tsx                      # Brand input form
├── preview/[id]/page.tsx        # Full design system preview
├── api/
│   ├── generate/route.ts        # AI design system generation
│   └── export/route.ts          # Export configs
├── components/
│   ├── brand-input.tsx          # Brand description + preferences
│   ├── color-palette.tsx        # Color swatches with hex/rgb
│   ├── contrast-matrix.tsx      # WCAG AA/AAA contrast grid
│   ├── typography-scale.tsx     # Type specimens
│   ├── spacing-scale.tsx        # Visual spacing reference
│   ├── component-preview/
│   │   ├── buttons.tsx          # Button variants
│   │   ├── cards.tsx            # Card styles
│   │   ├── forms.tsx            # Input/select/checkbox
│   │   ├── navigation.tsx       # Nav/tabs/breadcrumbs
│   │   └── badges.tsx           # Tags and badges
│   ├── theme-toggle.tsx         # Light/dark switch
│   ├── export-panel.tsx         # Download configs
│   └── accessibility-badge.tsx  # AA/AAA rating display
├── lib/
│   ├── ai.ts
│   ├── schemas.ts              # Design system Zod schema
│   ├── color-utils.ts          # Color manipulation + contrast
│   ├── typography.ts           # Type scale calculations
│   └── exporters/
│       ├── tailwind.ts         # Generate tailwind.config.ts
│       ├── css-variables.ts    # Generate :root CSS variables
│       └── figma-tokens.ts     # Figma token format
└── types/
    └── index.ts
```

## Tech Stack & Setup

```bash
npx create-next-app@latest design-system-gen --typescript --tailwind --eslint --app
cd design-system-gen

# Core AI
npm install ai @ai-sdk/google zod

# Color manipulation
npm install chroma-js @types/chroma-js     # Color science library
npm install colord                          # Lightweight color utils

# UI
npm install framer-motion lucide-react
npx shadcn@latest init
npx shadcn@latest add button card input select tabs badge toggle separator slider
```

### Environment Variables

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
```

## Core Implementation Strategy

### 1. Design System Schema

```typescript
// lib/schemas.ts
import { z } from "zod";

const ColorSchema = z.object({
  name: z.string(),
  hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  usage: z.string().describe("When to use this color"),
  shades: z.object({
    50: z.string(), 100: z.string(), 200: z.string(), 300: z.string(),
    400: z.string(), 500: z.string(), 600: z.string(), 700: z.string(),
    800: z.string(), 900: z.string(), 950: z.string(),
  }),
});

const TypographySchema = z.object({
  fontFamily: z.object({
    heading: z.string(),
    body: z.string(),
    mono: z.string(),
  }),
  scale: z.array(z.object({
    name: z.string(),        // "h1", "h2", "body-lg", "body", "caption"
    fontSize: z.string(),     // "2.25rem"
    lineHeight: z.string(),
    fontWeight: z.string(),
    letterSpacing: z.string().optional(),
    usage: z.string(),
  })),
});

export const DesignSystemSchema = z.object({
  name: z.string(),
  description: z.string(),
  colors: z.object({
    primary: ColorSchema,
    secondary: ColorSchema,
    accent: ColorSchema,
    neutral: ColorSchema,
    success: z.string(),
    warning: z.string(),
    error: z.string(),
    info: z.string(),
  }),
  typography: TypographySchema,
  spacing: z.object({
    baseUnit: z.number().describe("Base spacing unit in pixels"),
    scale: z.array(z.object({
      name: z.string(),      // "xs", "sm", "md", "lg", "xl", "2xl"
      value: z.string(),      // "0.25rem", "0.5rem", etc.
      pixels: z.number(),
    })),
  }),
  borderRadius: z.object({
    sm: z.string(), md: z.string(), lg: z.string(), xl: z.string(), full: z.string(),
  }),
  shadows: z.array(z.object({
    name: z.string(),
    value: z.string(),
    usage: z.string(),
  })),
  darkMode: z.object({
    background: z.string(),
    surface: z.string(),
    text: z.string(),
    textMuted: z.string(),
  }),
});
```

### 2. AI Generation Endpoint

```typescript
// app/api/generate/route.ts
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { DesignSystemSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  const { brandDescription, industry, mood, existingColors } = await req.json();

  const { object: system } = await generateObject({
    model: google("gemini-2.5-flash"),
    schema: DesignSystemSchema,
    prompt: `You are a senior design system architect. Create a complete design system.

Brand: ${brandDescription}
Industry: ${industry}
Mood: ${mood}
${existingColors ? `Existing brand colors to incorporate: ${existingColors}` : ""}

Requirements:
- Generate a harmonious color palette using color theory (complementary, analogous, or triadic)
- All color combinations must pass WCAG AA contrast ratio (4.5:1 for text)
- Typography should use Google Fonts (freely available)
- Include a modular spacing scale based on a consistent base unit
- Generate full shade ramps (50-950) for each semantic color
- Dark mode must maintain readability and visual hierarchy
- Border radius and shadows should match the brand mood

Color theory principles:
- Primary: brand recognition, CTAs
- Secondary: supporting elements, less prominent actions
- Accent: highlights, focus states, decorative elements
- Neutral: text, backgrounds, borders`,
  });

  return Response.json(system);
}
```

### 3. WCAG Contrast Checker

```typescript
// lib/color-utils.ts
import chroma from "chroma-js";

export function getContrastRatio(color1: string, color2: string): number {
  return chroma.contrast(color1, color2);
}

export function getWCAGRating(ratio: number): "AAA" | "AA" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
}

// Generate a contrast matrix for all color pairs
export function contrastMatrix(colors: Record<string, string>) {
  const entries = Object.entries(colors);
  return entries.map(([name1, hex1]) => ({
    color: name1,
    contrasts: entries.map(([name2, hex2]) => ({
      against: name2,
      ratio: getContrastRatio(hex1, hex2),
      rating: getWCAGRating(getContrastRatio(hex1, hex2)),
    })),
  }));
}
```

### 4. Contrast Matrix Component

A grid showing which color combinations are accessible.

```typescript
// components/contrast-matrix.tsx
export function ContrastMatrix({ colors }) {
  const matrix = contrastMatrix(colors);

  return (
    <div className="grid" style={{ gridTemplateColumns: `auto repeat(${Object.keys(colors).length}, 1fr)` }}>
      {/* Header row */}
      {/* For each pair, show ratio + AA/AAA badge with green/red background */}
    </div>
  );
}
```

### 5. Exporters

```typescript
// lib/exporters/tailwind.ts
export function generateTailwindConfig(system: DesignSystem): string {
  return `import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: ${JSON.stringify(system.colors.primary.shades, null, 8)},
        secondary: ${JSON.stringify(system.colors.secondary.shades, null, 8)},
        accent: ${JSON.stringify(system.colors.accent.shades, null, 8)},
      },
      fontFamily: {
        heading: ["${system.typography.fontFamily.heading}", "sans-serif"],
        body: ["${system.typography.fontFamily.body}", "sans-serif"],
        mono: ["${system.typography.fontFamily.mono}", "monospace"],
      },
      borderRadius: ${JSON.stringify(system.borderRadius, null, 6)},
    },
  },
};

export default config;`;
}

// lib/exporters/css-variables.ts
export function generateCSSVariables(system: DesignSystem): string {
  let css = ":root {\n";
  // Primary shades
  Object.entries(system.colors.primary.shades).forEach(([shade, hex]) => {
    css += `  --color-primary-${shade}: ${hex};\n`;
  });
  // ... typography, spacing, etc.
  css += "}\n";
  return css;
}
```

## Implementation Phases

### Phase 1: Core Generation (Week 1)
- Brand description input form (name, industry, mood, keywords)
- AI design system generation with structured output
- Color palette display with hex codes
- Typography scale preview with specimen text
- Basic light theme preview

### Phase 2: Accessibility & Components (Week 2)
- WCAG contrast matrix for all color pairs
- AA/AAA badges on every color combination
- Component preview gallery (buttons, cards, forms, nav)
- Dark mode generation with contrast validation
- Live theme toggle to switch between light/dark

### Phase 3: Export & Polish (Week 3)
- Export as Tailwind config file
- Export as CSS custom properties
- Export as Figma design tokens (JSON)
- Copy individual values (click to copy hex, font stack, etc.)
- Shareable design system URL
- Responsive preview (mobile, tablet, desktop)

## Free Resources

| Resource | Purpose | Free Tier |
|----------|---------|-----------|
| Google Gemini API | Design system generation | ~1M tokens/day |
| Chroma.js | Color science | Open source |
| Google Fonts | Typography | Free, 1500+ fonts |
| shadcn/ui | Component base | Open source |
| Vercel | Hosting | 100GB bandwidth |

## Resume Talking Points

- **Visually stunning portfolio piece**: The output is inherently beautiful — a complete design system.
- **Accessibility expertise**: WCAG contrast validation. The European Accessibility Act (2025) makes this legally required.
- **Practical output**: Generating Tailwind configs and CSS variables that devs can actually use.
- **Color theory**: Explain complementary, analogous, and triadic color relationships.
- **Design-engineering bridge**: You speak both languages — rare and valuable.

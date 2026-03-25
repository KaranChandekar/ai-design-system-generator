# AI Design System Generator

A Next.js 15 application that generates complete, production-ready design systems from natural language brand descriptions using Google Gemini AI. Describe your brand — get colors, typography, components, and exportable configs in seconds.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?logo=google)

## What It Does

1. **You describe your brand** — name, industry, mood, keywords, and optional existing colors
2. **AI generates a full design system** — structured output via Vercel AI SDK's `generateObject` with Zod validation
3. **You preview everything** — interactive, tabbed UI with 6 sections
4. **You export** — download Tailwind config, CSS variables, or Figma tokens

## Features

### Color System
- **Core palette** — Primary, Secondary, Accent, and Neutral colors with AI-chosen harmony
- **Full shade ramps** — 50 through 950 for each color, click any swatch to copy
- **Semantic colors** — Success, Warning, Error, Info
- **WCAG contrast matrix** — Every color pair rated AA/AAA/Fail with contrast ratios

### Typography
- **Font families** — Heading, Body, Mono (Google Fonts)
- **Type scale** — Full specimen from h1 down to caption, with font size, weight, and line height

### Spacing & Layout
- **Modular spacing scale** — Visual bars with rem and pixel values
- **Border radius** — sm through full, rendered as shapes
- **Shadows** — Named shadow tokens with usage descriptions

### Component Preview
- **Buttons** — Primary, secondary, outline, ghost, disabled; small/medium/large
- **Cards** — Feature, media, and elevated variants
- **Forms** — Text input, select, checkbox, radio, textarea with focus rings
- **Navigation** — Tabs, breadcrumbs, pill navigation
- **Badges** — Filled, outline, and status dots
- **Independent theme toggle** — Preview components in light or dark mode

### Accessibility
- **WCAG contrast matrix** — Grid of all color pairs with AA (4.5:1) and AAA (7:1) ratings
- **Accessibility badges** — Visual pass/fail indicators on every combination

### Export
- **Tailwind Config** — Ready-to-use `tailwind.config.ts` with colors, fonts, radius, shadows
- **CSS Variables** — `:root` and `.dark` custom properties
- **Figma Tokens** — JSON format compatible with Figma token plugins
- **Copy or download** any format

### App Theme
- **Light and dark mode** — Toggle the app's own theme independently from the design system preview
- **Persisted** — Theme preference saved to localStorage
- **Smooth transitions** — CSS transitions on background and text color changes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, TypeScript strict) |
| AI | Vercel AI SDK + Google Gemini 2.5 Flash |
| Validation | Zod (structured AI output) |
| Color Science | Chroma.js (contrast ratios, shade generation, color conversion) |
| Styling | Tailwind CSS 4.1 |
| Animation | Framer Motion |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI API key](https://aistudio.google.com/apikey)

### Setup

```bash
# Clone the repo
git clone https://github.com/KaranChandekar/ai-design-system-generator.git
cd ai-design-system-generator

# Install dependencies
npm install

# Add your API key
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_key_here" > .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start generating.

## How It Works

```
┌─────────────────┐     POST /api/generate      ┌──────────────────┐
│   Brand Input    │ ──────────────────────────▶ │  Gemini 2.5 Flash │
│   Form (page)    │                              │  generateObject() │
└─────────────────┘                              └────────┬─────────┘
                                                          │
                                              Zod-validated JSON
                                                          │
                                                          ▼
┌─────────────────┐     sessionStorage          ┌──────────────────┐
│  Preview Page    │ ◀──────────────────────── │  DesignSystem      │
│  (6 sections)    │                              │  object            │
└────────┬────────┘                              └──────────────────┘
         │
         ├── Colors (palette + shade ramps + semantic)
         ├── Typography (families + scale)
         ├── Spacing (scale + radius + shadows)
         ├── Components (buttons, cards, forms, nav, badges)
         ├── Accessibility (WCAG contrast matrix)
         └── Export (Tailwind / CSS / Figma tokens)
```

### Data Flow

1. User fills in brand name, selects industry and mood, optionally adds keywords and existing colors
2. Form POSTs to `/api/generate` which calls `generateObject()` with the `DesignSystemSchema`
3. Gemini returns a structured JSON object validated against the Zod schema
4. The design system is stored in `sessionStorage` and the user is redirected to `/preview/generated`
5. The preview page renders all 6 sections from the stored design system
6. Export generates config files client-side from the design system data

## Project Structure

```
app/
├── layout.tsx                    # Root layout with ThemeProvider
├── page.tsx                      # Brand input form
├── preview/[id]/page.tsx         # Design system preview (6 tabs)
├── api/
│   ├── generate/route.ts         # AI generation endpoint
│   └── export/route.ts           # Export endpoint
components/
├── brand-input.tsx               # Brand description form
├── color-palette.tsx             # Color swatches + copy
├── shade-ramp.tsx                # 50-950 shade visualization
├── contrast-matrix.tsx           # WCAG contrast grid
├── accessibility-badge.tsx       # AA/AAA/Fail badge
├── typography-scale.tsx          # Type specimens
├── spacing-scale.tsx             # Spacing bars
├── theme-provider.tsx            # App-level dark/light context
├── theme-toggle.tsx              # Toggle switch component
├── export-panel.tsx              # Multi-format export UI
├── component-preview/
│   ├── buttons.tsx
│   ├── cards.tsx
│   ├── forms.tsx
│   ├── navigation.tsx
│   └── badges.tsx
lib/
├── ai.ts                         # Gemini model init
├── schemas.ts                    # Zod design system schema
├── color-utils.ts                # Contrast, conversion, luminance
├── utils.ts                      # cn() helper
├── exporters/
│   ├── tailwind.ts               # Tailwind config generator
│   ├── css-variables.ts          # CSS custom properties generator
│   └── figma-tokens.ts           # Figma token JSON generator
types/
└── index.ts                      # TypeScript interfaces
```

## License

MIT

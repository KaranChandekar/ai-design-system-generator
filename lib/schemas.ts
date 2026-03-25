import { z } from "zod";

const ColorShadesSchema = z.object({
  50: z.string(),
  100: z.string(),
  200: z.string(),
  300: z.string(),
  400: z.string(),
  500: z.string(),
  600: z.string(),
  700: z.string(),
  800: z.string(),
  900: z.string(),
  950: z.string(),
});

const ColorSchema = z.object({
  name: z.string(),
  hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  usage: z.string().describe("When to use this color"),
  shades: ColorShadesSchema,
});

const TypographyLevelSchema = z.object({
  name: z.string(),
  fontSize: z.string(),
  lineHeight: z.string(),
  fontWeight: z.string(),
  letterSpacing: z.string().optional(),
  usage: z.string(),
});

const SpacingLevelSchema = z.object({
  name: z.string(),
  value: z.string(),
  pixels: z.number(),
});

const ShadowSchema = z.object({
  name: z.string(),
  value: z.string(),
  usage: z.string(),
});

export const DesignSystemSchema = z.object({
  name: z.string(),
  description: z.string(),
  colors: z.object({
    primary: ColorSchema,
    secondary: ColorSchema,
    accent: ColorSchema,
    neutral: ColorSchema,
    success: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    warning: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    error: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    info: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  }),
  typography: z.object({
    fontFamily: z.object({
      heading: z.string(),
      body: z.string(),
      mono: z.string(),
    }),
    scale: z.array(TypographyLevelSchema),
  }),
  spacing: z.object({
    baseUnit: z.number().describe("Base spacing unit in pixels"),
    scale: z.array(SpacingLevelSchema),
  }),
  borderRadius: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
    full: z.string(),
  }),
  shadows: z.array(ShadowSchema),
  darkMode: z.object({
    background: z.string(),
    surface: z.string(),
    text: z.string(),
    textMuted: z.string(),
  }),
});

export type DesignSystemOutput = z.infer<typeof DesignSystemSchema>;

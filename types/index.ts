export interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface DesignColor {
  name: string;
  hex: string;
  usage: string;
  shades: ColorShades;
}

export interface TypographyLevel {
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing?: string;
  usage: string;
}

export interface SpacingLevel {
  name: string;
  value: string;
  pixels: number;
}

export interface Shadow {
  name: string;
  value: string;
  usage: string;
}

export interface DesignSystem {
  name: string;
  description: string;
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
  typography: {
    fontFamily: {
      heading: string;
      body: string;
      mono: string;
    };
    scale: TypographyLevel[];
  };
  spacing: {
    baseUnit: number;
    scale: SpacingLevel[];
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: Shadow[];
  darkMode: {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
  };
}

export interface BrandInput {
  name: string;
  industry: string;
  mood: string;
  keywords: string;
  existingColors: string;
}

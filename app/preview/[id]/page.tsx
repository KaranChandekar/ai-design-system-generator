"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Palette, Type, Grid3X3, Box, Download, Shield, Sun, Moon } from "lucide-react";
import type { DesignSystem } from "@/types";
import { useTheme } from "@/components/theme-provider";
import { ColorPalette } from "@/components/color-palette";
import { ContrastMatrix } from "@/components/contrast-matrix";
import { TypographyScale } from "@/components/typography-scale";
import { SpacingScale } from "@/components/spacing-scale";
import { ExportPanel } from "@/components/export-panel";
import { ButtonsPreview } from "@/components/component-preview/buttons";
import { CardsPreview } from "@/components/component-preview/cards";
import { FormsPreview } from "@/components/component-preview/forms";
import { NavigationPreview } from "@/components/component-preview/navigation";
import { BadgesPreview } from "@/components/component-preview/badges";

type Section = "colors" | "typography" | "spacing" | "components" | "accessibility" | "export";

const sections: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "colors", label: "Colors", icon: <Palette className="w-4 h-4" /> },
  { id: "typography", label: "Typography", icon: <Type className="w-4 h-4" /> },
  { id: "spacing", label: "Spacing", icon: <Grid3X3 className="w-4 h-4" /> },
  { id: "components", label: "Components", icon: <Box className="w-4 h-4" /> },
  { id: "accessibility", label: "Accessibility", icon: <Shield className="w-4 h-4" /> },
  { id: "export", label: "Export", icon: <Download className="w-4 h-4" /> },
];

export default function PreviewPage() {
  const [system, setSystem] = useState<DesignSystem | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("colors");
  const [componentTheme, setComponentTheme] = useState<"dark" | "light">("dark");
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("designSystem");
    if (stored) {
      setSystem(JSON.parse(stored));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!system) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading design system...</p>
        </div>
      </div>
    );
  }

  const previewBg = componentTheme === "dark" ? system.darkMode.background : "#ffffff";
  const previewText = componentTheme === "dark" ? system.darkMode.text : "#111111";

  const flatColors: Record<string, string> = {
    "primary-500": system.colors.primary.shades[500],
    "secondary-500": system.colors.secondary.shades[500],
    "accent-500": system.colors.accent.shades[500],
    "neutral-50": system.colors.neutral.shades[50],
    "neutral-900": system.colors.neutral.shades[900],
    white: "#FFFFFF",
    black: "#000000",
    success: system.colors.success,
    warning: system.colors.warning,
    error: system.colors.error,
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold truncate">{system.name}</h1>
              <p className="text-xs text-muted-foreground truncate hidden sm:block">{system.description}</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-sm font-medium hover:bg-muted/50 transition-all"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar nav */}
        <nav className="hidden md:block w-52 shrink-0">
          <div className="sticky top-24 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-indigo-500/15 to-purple-500/10 text-foreground border border-indigo-500/20 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span className={activeSection === section.id ? "text-indigo-400" : ""}>
                  {section.icon}
                </span>
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border safe-area-pb">
          <div className="flex overflow-x-auto px-2 py-2 gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-[10px] font-medium shrink-0 transition-all ${
                  activeSection === section.id
                    ? "bg-gradient-to-b from-indigo-500/15 to-purple-500/10 text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <span className={activeSection === section.id ? "text-indigo-400" : ""}>
                  {section.icon}
                </span>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-24 md:pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === "colors" && (
                <ColorPalette colors={system.colors} />
              )}

              {activeSection === "typography" && (
                <TypographyScale typography={system.typography} />
              )}

              {activeSection === "spacing" && (
                <div className="space-y-8">
                  <SpacingScale spacing={system.spacing} />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Border Radius</h3>
                    <div className="flex flex-wrap gap-4">
                      {Object.entries(system.borderRadius).map(([name, value]) => (
                        <div key={name} className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl border border-border">
                          <div
                            className="w-16 h-16 border-2 border-indigo-400/50 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                            style={{ borderRadius: value }}
                          />
                          <span className="text-xs font-mono font-medium">{name}</span>
                          <span className="text-[10px] text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Shadows</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {system.shadows.map((shadow) => (
                        <div
                          key={shadow.name}
                          className="p-4 bg-card rounded-xl border border-border"
                          style={{ boxShadow: shadow.value }}
                        >
                          <p className="text-sm font-medium">{shadow.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{shadow.usage}</p>
                          <p className="text-[10px] font-mono text-muted-foreground mt-2 break-all">{shadow.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "components" && (
                <div className="space-y-4">
                  {/* Component theme toggle */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Component Preview</h3>
                    <div className="inline-flex items-center gap-1 p-1 bg-muted/50 rounded-xl border border-border">
                      <button
                        onClick={() => setComponentTheme("light")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          componentTheme === "light"
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Sun className="w-3 h-3" />
                        Light
                      </button>
                      <button
                        onClick={() => setComponentTheme("dark")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          componentTheme === "dark"
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Moon className="w-3 h-3" />
                        Dark
                      </button>
                    </div>
                  </div>

                  <div
                    className="space-y-8 p-4 sm:p-6 rounded-2xl border border-border transition-colors duration-300"
                    style={{
                      backgroundColor: previewBg,
                      color: previewText,
                    }}
                  >
                    <ButtonsPreview system={system} />
                    <hr style={{ borderColor: componentTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
                    <CardsPreview system={system} />
                    <hr style={{ borderColor: componentTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
                    <FormsPreview system={system} />
                    <hr style={{ borderColor: componentTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
                    <NavigationPreview system={system} />
                    <hr style={{ borderColor: componentTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
                    <BadgesPreview system={system} />
                  </div>
                </div>
              )}

              {activeSection === "accessibility" && (
                <ContrastMatrix colors={flatColors} />
              )}

              {activeSection === "export" && (
                <ExportPanel system={system} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

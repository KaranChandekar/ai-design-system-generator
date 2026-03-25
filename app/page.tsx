"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandInputForm } from "@/components/brand-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";
import type { BrandInput } from "@/types";
import type { DesignSystem } from "@/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (input: BrandInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandDescription: input.name,
          industry: input.industry,
          mood: input.mood,
          keywords: input.keywords,
          existingColors: input.existingColors,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate design system");

      const system: DesignSystem = await res.json();

      sessionStorage.setItem("designSystem", JSON.stringify(system));
      router.push("/preview/generated");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle isDark={theme === "dark"} onToggle={toggleTheme} />
      </div>
      <BrandInputForm onSubmit={handleSubmit} isLoading={isLoading} />
      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm backdrop-blur-sm">
          {error}
        </div>
      )}
    </main>
  );
}

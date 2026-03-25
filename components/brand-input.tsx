"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Palette, ArrowRight, Zap } from "lucide-react";
import type { BrandInput } from "@/types";

interface BrandInputFormProps {
  onSubmit: (input: BrandInput) => void;
  isLoading: boolean;
}

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Food & Beverage",
  "Travel",
  "Entertainment",
  "Real Estate",
  "Fashion",
  "Fitness",
  "SaaS",
];

const moods = [
  "Professional",
  "Playful",
  "Elegant",
  "Bold",
  "Minimal",
  "Warm",
  "Futuristic",
  "Natural",
  "Luxurious",
  "Friendly",
  "Corporate",
  "Creative",
];

export function BrandInputForm({ onSubmit, isLoading }: BrandInputFormProps) {
  const [form, setForm] = useState<BrandInput>({
    name: "",
    industry: "",
    mood: "",
    keywords: "",
    existingColors: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.industry || !form.mood) return;
    onSubmit(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/10 blur-3xl animate-glow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-500/15 to-cyan-500/10 blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-6 shadow-2xl shadow-indigo-500/25 animate-float"
          >
            <Palette className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Design System
            </span>
            <br />
            <span>Generator</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-lg mx-auto"
          >
            Describe your brand and get a complete design system with accessible
            color palettes, typography, and exportable configs.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6 backdrop-blur-sm bg-card/50 rounded-2xl p-6 sm:p-8 border border-border shadow-xl"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">
              Brand Name <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Acme Corp"
              className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">
              Industry <span className="text-indigo-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setForm({ ...form, industry: ind })}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    form.industry === ind
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20"
                      : "bg-background/60 border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-muted/50"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">
              Brand Mood <span className="text-indigo-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setForm({ ...form, mood: m })}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    form.mood === m
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-purple-500/20"
                      : "bg-background/60 border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-muted/50"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Brand Description / Keywords
            </label>
            <textarea
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              placeholder="Describe your brand personality, target audience, or add keywords like 'innovative, trustworthy, eco-friendly'..."
              rows={3}
              className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Existing Brand Colors{" "}
              <span className="text-muted-foreground font-normal text-xs">
                (optional)
              </span>
            </label>
            <input
              type="text"
              value={form.existingColors}
              onChange={(e) =>
                setForm({ ...form, existingColors: e.target.value })
              }
              placeholder="e.g., #FF6B35, #004E89, or 'navy blue and coral'"
              className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !form.name || !form.industry || !form.mood}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 text-white font-semibold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                Generating Design System...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Generate Design System
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          Powered by Google Gemini AI &middot; WCAG accessible &middot; Export to Tailwind, CSS & Figma
        </motion.p>
      </motion.div>
    </div>
  );
}

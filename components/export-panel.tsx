"use client";

import { useState } from "react";
import { Download, FileCode, FileJson, Copy, Check } from "lucide-react";
import type { DesignSystem } from "@/types";
import { generateTailwindConfig } from "@/lib/exporters/tailwind";
import { generateCSSVariables } from "@/lib/exporters/css-variables";
import { generateFigmaTokens } from "@/lib/exporters/figma-tokens";

interface ExportPanelProps {
  system: DesignSystem;
}

type ExportFormat = "tailwind" | "css" | "figma";

export function ExportPanel({ system }: ExportPanelProps) {
  const [activeFormat, setActiveFormat] = useState<ExportFormat>("tailwind");
  const [copied, setCopied] = useState(false);

  const exports: Record<ExportFormat, { label: string; icon: React.ReactNode; filename: string; content: string }> = {
    tailwind: {
      label: "Tailwind Config",
      icon: <FileCode className="w-4 h-4" />,
      filename: "tailwind.config.ts",
      content: generateTailwindConfig(system),
    },
    css: {
      label: "CSS Variables",
      icon: <FileCode className="w-4 h-4" />,
      filename: "design-tokens.css",
      content: generateCSSVariables(system),
    },
    figma: {
      label: "Figma Tokens",
      icon: <FileJson className="w-4 h-4" />,
      filename: "figma-tokens.json",
      content: generateFigmaTokens(system),
    },
  };

  const active = exports[activeFormat];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(active.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([active.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = active.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-blue-500" />
        <h3 className="text-xl font-bold">Export</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(exports) as ExportFormat[]).map((format) => (
          <button
            key={format}
            onClick={() => {
              setActiveFormat(format);
              setCopied(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
              activeFormat === format
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {exports[format].icon}
            {exports[format].label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <span className="text-xs font-mono text-muted-foreground">
            {active.filename}
          </span>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={downloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
            >
              <Download className="w-3 h-3" />
              Download
            </button>
          </div>
        </div>
        <pre className="p-4 overflow-x-auto text-xs font-mono text-muted-foreground bg-background/50 max-h-[500px]">
          <code>{active.content}</code>
        </pre>
      </div>
    </div>
  );
}

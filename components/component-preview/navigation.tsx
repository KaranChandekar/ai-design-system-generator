"use client";

import { useState } from "react";
import type { DesignSystem } from "@/types";

interface NavigationPreviewProps {
  system: DesignSystem;
}

export function NavigationPreview({ system }: NavigationPreviewProps) {
  const [activeTab, setActiveTab] = useState(0);
  const primary = system.colors.primary.hex;
  const radius = system.borderRadius.md;

  const tabs = ["Overview", "Analytics", "Settings", "Billing"];
  const breadcrumbs = ["Home", "Products", "Electronics", "Headphones"];

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Navigation
      </h4>

      {/* Tabs */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Tabs</p>
        <div className="flex border-b border-border">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className="px-4 py-2.5 text-sm font-medium transition-colors relative"
              style={{
                color: activeTab === i ? primary : undefined,
              }}
            >
              {tab}
              {activeTab === i && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: primary }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumbs */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Breadcrumbs</p>
        <nav className="flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((item, i) => (
            <span key={item} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-muted-foreground">/</span>
              )}
              <span
                className={
                  i === breadcrumbs.length - 1
                    ? "font-medium"
                    : "text-muted-foreground hover:underline cursor-pointer"
                }
                style={
                  i < breadcrumbs.length - 1 ? { color: primary } : undefined
                }
              >
                {item}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Pills */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Pill Navigation</p>
        <div className="inline-flex gap-1 p-1 bg-card rounded-lg border border-border">
          {["Day", "Week", "Month", "Year"].map((item, i) => (
            <button
              key={item}
              className="px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: i === 0 ? primary : "transparent",
                color: i === 0 ? "white" : undefined,
                borderRadius: radius,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

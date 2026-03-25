"use client";

import type { DesignSystem } from "@/types";

interface FormsPreviewProps {
  system: DesignSystem;
}

export function FormsPreview({ system }: FormsPreviewProps) {
  const primary = system.colors.primary.hex;
  const radius = system.borderRadius.md;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Form Elements
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ fontFamily: system.typography.fontFamily.body }}
          >
            Text Input
          </label>
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full px-3 py-2 text-sm border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none transition-shadow"
            style={{
              borderRadius: radius,
              boxShadow: `0 0 0 0px ${primary}`,
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = `0 0 0 2px ${primary}`)
            }
            onBlur={(e) =>
              (e.target.style.boxShadow = `0 0 0 0px ${primary}`)
            }
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ fontFamily: system.typography.fontFamily.body }}
          >
            Select
          </label>
          <select
            className="w-full px-3 py-2 text-sm border border-border bg-card text-foreground focus:outline-none"
            style={{ borderRadius: radius }}
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="check-preview"
            className="w-4 h-4 rounded accent-current"
            style={{ accentColor: primary }}
          />
          <label htmlFor="check-preview" className="text-sm">
            Checkbox label
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="radio-preview"
            name="radio-group"
            className="w-4 h-4 accent-current"
            style={{ accentColor: primary }}
          />
          <label htmlFor="radio-preview" className="text-sm">
            Radio option
          </label>
        </div>

        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ fontFamily: system.typography.fontFamily.body }}
          >
            Textarea
          </label>
          <textarea
            placeholder="Enter longer text..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
            style={{ borderRadius: radius }}
          />
        </div>
      </div>
    </div>
  );
}

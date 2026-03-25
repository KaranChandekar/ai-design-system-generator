import { NextRequest, NextResponse } from "next/server";
import type { DesignSystem } from "@/types";
import { generateTailwindConfig } from "@/lib/exporters/tailwind";
import { generateCSSVariables } from "@/lib/exporters/css-variables";
import { generateFigmaTokens } from "@/lib/exporters/figma-tokens";

export async function POST(req: NextRequest) {
  const { system, format } = (await req.json()) as {
    system: DesignSystem;
    format: "tailwind" | "css" | "figma";
  };

  const generators = {
    tailwind: {
      content: generateTailwindConfig(system),
      filename: "tailwind.config.ts",
      contentType: "text/typescript",
    },
    css: {
      content: generateCSSVariables(system),
      filename: "design-tokens.css",
      contentType: "text/css",
    },
    figma: {
      content: generateFigmaTokens(system),
      filename: "figma-tokens.json",
      contentType: "application/json",
    },
  };

  const result = generators[format];
  if (!result) {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  return new NextResponse(result.content, {
    headers: {
      "Content-Type": result.contentType,
      "Content-Disposition": `attachment; filename="${result.filename}"`,
    },
  });
}

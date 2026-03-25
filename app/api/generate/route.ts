import { generateObject } from "ai";
import { model } from "@/lib/ai";
import { DesignSystemSchema } from "@/lib/schemas";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { brandDescription, industry, mood, keywords, existingColors } =
    await req.json();

  const { object: system } = await generateObject({
    model,
    schema: DesignSystemSchema,
    prompt: `You are a senior design system architect. Create a complete, production-ready design system.

Brand Name: ${brandDescription}
Industry: ${industry}
Mood/Personality: ${mood}
${keywords ? `Keywords/Description: ${keywords}` : ""}
${existingColors ? `Existing brand colors to incorporate: ${existingColors}` : ""}

Requirements:
- Generate a harmonious color palette using color theory (complementary, analogous, or triadic relationships)
- All primary color combinations with white/black text MUST pass WCAG AA contrast ratio (4.5:1 for normal text)
- Typography should use freely available Google Fonts that match the brand mood
- Include a modular spacing scale based on a consistent base unit (4px or 8px)
- Generate full shade ramps (50-950) for each semantic color, where 500 is the base color
- Shades should be perceptually uniform: 50 is very light, 950 is very dark
- Dark mode colors must maintain readability and visual hierarchy
- Border radius and shadows should match the brand mood
- All hex values must be valid 6-digit hex codes starting with #

Color assignment guidelines:
- Primary: main brand color for CTAs, links, key UI elements
- Secondary: supporting color for less prominent actions and elements
- Accent: highlight color for focus states, decorative elements, emphasis
- Neutral: grays for text, backgrounds, borders
- Success/Warning/Error/Info: standard semantic colors

Typography scale should include at minimum:
h1, h2, h3, h4, body-lg, body, body-sm, caption

Spacing scale should include: xs, sm, md, lg, xl, 2xl, 3xl, 4xl`,
  });

  return Response.json(system);
}

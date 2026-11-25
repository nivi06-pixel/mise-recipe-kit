import { defineTheme, extendTheme } from "@hyper-elements/react";
import type { Recipe } from "./kitchen";

/**
 * The Mise kitchen theme: warm paper, dark ink, a serif for dishes and a sans
 * for instructions. Written once, shared by the web page, the email, the PDF
 * kitchen card and the share images. Each recipe swaps only its accent.
 */
export const mise = defineTheme({
  colors: {
    background: "#FBF6EE",
    foreground: "#2B2118",
    primary: "#B8462A",
    primaryForeground: "#FFFFFF",
    muted: "#7A6A5A",
    border: "#E6D9C6",
    paper: "#FFFDF8",
    soft: "#F3EADB",
    ink: "#2B2118",
  },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Fraunces, Georgia, 'Times New Roman', serif",
  },
  elements: {
    Heading: {
      fontWeight: 600,
      by: {
        level: {
          1: { fontSize: 52, lineHeight: 1.05, letterSpacing: -1, mobile: { fontSize: 36 } },
          2: { fontSize: 26, lineHeight: 1.2 },
          3: { fontSize: 17, lineHeight: 1.3 },
        },
      },
    },
    Button: {
      borderRadius: 999,
      padding: [13, 24],
      fontSize: 15,
      fontWeight: 600,
      hover: { backgroundColor: "#2B2118" },
      variants: {
        ghost: {
          backgroundColor: "transparent",
          color: "{colors.foreground}",
          border: "1.5px solid #2B2118",
          hover: { backgroundColor: "#F3EADB" },
        },
      },
    },
    Divider: { borderTop: "1px solid #E6D9C6" },
  },
  styles: {
    card: { backgroundColor: "{colors.paper}", border: "1px solid #E6D9C6", borderRadius: 18, padding: 28, gap: 14 },
    eyebrow: { fontSize: 12, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: "{colors.primary}" },
    chip: { fontSize: 12, fontWeight: 600, padding: [5, 11], borderRadius: 999, backgroundColor: "{colors.soft}", color: "{colors.foreground}" },
  },
});

/** The theme for one recipe: the shared kitchen theme in that dish's colour. */
export function themeFor(recipe: Pick<Recipe, "accent">) {
  return extendTheme(mise, { colors: { primary: recipe.accent } });
}

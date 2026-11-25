import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** Font files from the @fontsource packages: one per family, weight and style the designs use. */
const FACES = [
  { family: "Fraunces", pkg: "@fontsource/fraunces", file: "fraunces-latin-400-normal", weight: 400, style: "normal" },
  { family: "Fraunces", pkg: "@fontsource/fraunces", file: "fraunces-latin-400-italic", weight: 400, style: "italic" },
  { family: "Fraunces", pkg: "@fontsource/fraunces", file: "fraunces-latin-600-normal", weight: 600, style: "normal" },
  { family: "Fraunces", pkg: "@fontsource/fraunces", file: "fraunces-latin-700-normal", weight: 700, style: "normal" },
  { family: "Inter", pkg: "@fontsource/inter", file: "inter-latin-400-normal", weight: 400, style: "normal" },
  { family: "Inter", pkg: "@fontsource/inter", file: "inter-latin-500-normal", weight: 500, style: "normal" },
  { family: "Inter", pkg: "@fontsource/inter", file: "inter-latin-600-normal", weight: 600, style: "normal" },
  { family: "Inter", pkg: "@fontsource/inter", file: "inter-latin-700-normal", weight: 700, style: "normal" },
] as const;

const VERSION = { "@fontsource/fraunces": "5.3.0", "@fontsource/inter": "5.3.0" } as const;

/** For a Page or an Email: the same files from a public CDN, which browsers and mail apps can fetch. */
export const webFonts = FACES.map((f) => ({
  family: f.family,
  src: `https://cdn.jsdelivr.net/npm/${f.pkg}@${VERSION[f.pkg]}/files/${f.file}.woff2`,
  format: "woff2" as const,
  weight: f.weight,
  style: f.style,
}));

/**
 * For a Document or a Canvas root: WOFF (the PDF and image renderers don't draw WOFF2). The CLI
 * (`hyper-elements dev`, `render`) fetches and caches these; the build passes the same files as bytes.
 */
export const printFonts = FACES.map((f) => ({
  family: f.family,
  src: `https://cdn.jsdelivr.net/npm/${f.pkg}@${VERSION[f.pkg]}/files/${f.file}.woff`,
  format: "woff" as const,
  weight: f.weight,
  style: f.style,
}));

/** For renderPdf() and renderImage(): the bytes, read from node_modules (nothing is fetched). */
export function fileFonts() {
  return FACES.map((f) => ({
    family: f.family,
    src: readFileSync(require.resolve(`${f.pkg}/files/${f.file}.woff`)),
    weight: f.weight,
    style: f.style,
  }));
}

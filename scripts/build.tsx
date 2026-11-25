// npm run build                         every recipe, every format, into docs/
// npm run build -- --serves 8 --us      cook for 8, in cups and ounces
// npm run build -- --recipe tomato-rasam

import { mkdir, readdir, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { ElementsError, formatDiagnostics, render } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import type { ReactElement } from "react";

import RecipePage from "../designs/recipe-page";
import KitchenCard from "../designs/kitchen-card";
import RecipeEmail from "../designs/recipe-email";
import { ShareCard } from "../src/share-card";
import { prepare, type Recipe } from "../src/kitchen";
import { fileFonts } from "../src/fonts";
import { recipes } from "../recipes";

const { values: args } = parseArgs({
  options: {
    serves: { type: "string" },
    us: { type: "boolean", default: false },
    recipe: { type: "string" },
    out: { type: "string", default: "docs" },
  },
});

const fonts = fileFonts();
const system = args.us ? "us" : "metric";
const serves = args.serves ? Number(args.serves) : undefined;
if (serves !== undefined && !(serves > 0)) throw new Error("--serves takes a number above 0");

let problems = 0;

/** Runs one render, prints what Hyper Elements found, and keeps going on errors. */
async function step<T extends { diagnostics: readonly { severity?: string }[] }>(label: string, run: () => Promise<T>): Promise<T | undefined> {
  try {
    const result = await run();
    const noted = result.diagnostics.filter((d) => d.severity !== "info");
    console.log(`  ✓ ${label}${noted.length ? `\n${formatDiagnostics(noted as never)}` : ""}`);
    return result;
  } catch (e) {
    problems++;
    if (!(e instanceof ElementsError)) throw e;
    console.error(`  ✗ ${label}\n${formatDiagnostics(e.diagnostics)}`);
  }
}

/** The values the share-card template takes, from a recipe. */
export function shareValues(recipe: Recipe, s?: number) {
  const p = prepare(recipe, { serves: s });
  return {
    title: recipe.title,
    kicker: recipe.cuisine,
    hook: recipe.subtitle.endsWith(".") ? recipe.subtitle : `${recipe.subtitle}.`,
    totalTime: p.totalTime,
    serves: `${p.serves} ${recipe.yieldNoun}`,
    tags: recipe.tags.slice(0, 2),
    seed: recipe.slug,
    accent: recipe.accent,
    base: recipe.dish.base,
    food: recipe.dish.food,
    garnish: recipe.dish.garnish,
  };
}

const built: Array<{ recipe: Recipe; dir: string }> = [];

for (const recipe of recipes.filter((r) => !args.recipe || r.slug === args.recipe)) {
  const suffix = serves || args.us ? `-for-${serves ?? recipe.serves}${args.us ? "-us" : ""}` : "";
  const dir = `${recipe.slug}${suffix}`;
  const out = `${args.out}/${dir}`;
  await mkdir(out, { recursive: true });
  console.log(`\n${recipe.title}${suffix ? ` (${suffix.slice(1)})` : ""} → ${out}/`);

  const links = { card: "kitchen-card.pdf", email: "email.html", pin: "pin.png", page: "index.html" };
  const opts = { recipe, serves, system } as const;

  const page = await step("web page          index.html", () => render(<RecipePage {...opts} links={links} />));
  if (page) await writeFile(`${out}/index.html`, page.html);

  const email = await step("newsletter email  email.html + email.txt", () => render(<RecipeEmail {...opts} links={links} />));
  if (email) {
    await writeFile(`${out}/email.html`, email.html);
    await writeFile(`${out}/email.txt`, email.text);
  }

  const card = await step("kitchen card      kitchen-card.pdf", () => renderPdf(<KitchenCard {...opts} />, { fonts }));
  if (card) await writeFile(`${out}/kitchen-card.pdf`, card.pdf);

  // The share images go through the template: its check first, then each format.
  const values = shareValues(recipe, serves);
  const checked = ShareCard.check(values);
  if (!checked.valid) {
    problems++;
    console.error(`  ✗ share card values\n${formatDiagnostics(checked.diagnostics)}`);
  } else {
    for (const format of ["pin", "square", "story"] as const) {
      const img = await step(`share image       ${format}.png`, () =>
        renderImage(<ShareCard format={format} {...values} /> as ReactElement, { fonts, scale: 1 }),
      );
      if (img) await writeFile(`${out}/${format}.png`, img.image);
    }
  }
  built.push({ recipe, dir });
}

// What the share-card template asks for, as JSON: for a CMS form or an agent filling it in.
await writeFile(`${args.out}/share-card.template.json`, JSON.stringify(ShareCard.describe(), null, 2));

// A gallery page linking everything in the output folder, this build's and earlier ones'
// (a scaled build adds to it). It is what GitHub Pages serves.
const dirs = (await readdir(args.out, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
const listed = dirs
  .map((dir) => ({ dir, recipe: recipes.find((r) => dir === r.slug || dir.startsWith(`${r.slug}-for-`)) }))
  .filter((x): x is { dir: string; recipe: Recipe } => !!x.recipe)
  .sort((a, b) => recipes.indexOf(a.recipe) - recipes.indexOf(b.recipe) || a.dir.length - b.dir.length);
await writeFile(`${args.out}/index.html`, gallery(listed));
console.log(`\n${problems ? `✗ ${problems} problem(s)` : "✓ all outputs rendered"}. Open ${args.out}/index.html`);
process.exitCode = problems ? 1 : 0;

function gallery(items: typeof built) {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const cards = items
    .map(
      ({ recipe, dir }) => `
    <article>
      <a href="${dir}/index.html"><img src="${dir}/pin.png" alt="${esc(recipe.title)} share image" loading="lazy"></a>
      <div>
        <p class="k">${esc(recipe.cuisine)}</p>
        <h2>${esc(recipe.title)}${dir === recipe.slug ? "" : ` <small>${esc(dir.slice(recipe.slug.length + 1).replace(/-/g, " ").replace(" us", ", US units"))}</small>`}</h2>
        <p>${esc(recipe.subtitle)}</p>
        <nav>
          <a href="${dir}/index.html">Web page</a>
          <a href="${dir}/email.html">Email</a>
          <a href="${dir}/kitchen-card.pdf">Kitchen card PDF</a>
          <a href="${dir}/pin.png">Pin</a>
          <a href="${dir}/square.png">Square</a>
          <a href="${dir}/story.png">Story</a>
        </nav>
      </div>
    </article>`,
    )
    .join("");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mise · one recipe, every format</title>
<style>
  :root{--bg:#FBF6EE;--ink:#2B2118;--muted:#7A6A5A;--line:#E6D9C6;--accent:#B8462A}
  *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 Inter,system-ui,sans-serif}
  main{max-width:1040px;margin:0 auto;padding:56px 20px}
  h1{font:700 44px/1.05 Fraunces,Georgia,serif;margin:0 0 8px;letter-spacing:-1px}h1 span{color:var(--accent)}
  .lede{color:var(--muted);font-size:18px;max-width:620px;margin:0 0 40px}
  article{display:grid;grid-template-columns:220px 1fr;gap:28px;align-items:center;padding:24px 0;border-top:1px solid var(--line)}
  article img{width:100%;border-radius:12px;box-shadow:0 8px 24px rgba(43,33,24,.12)}
  h2{font:600 28px/1.15 Fraunces,Georgia,serif;margin:0 0 6px}h2 small{font:500 14px Inter,sans-serif;color:var(--muted);background:#F3EADB;padding:3px 10px;border-radius:999px;vertical-align:middle}.k{color:var(--accent);font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px}
  nav{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}nav a{color:var(--ink);text-decoration:none;font-size:14px;font-weight:600;padding:7px 14px;border-radius:999px;background:#F3EADB}
  nav a:hover{background:var(--ink);color:#FFFDF8}
  @media (max-width:640px){article{grid-template-columns:1fr}article img{max-width:260px}}
</style></head>
<body><main>
  <h1>mise<span>.</span></h1>
  <p class="lede">Write a recipe once. Get a web page, a newsletter email, a printable kitchen card with a shopping list, and share images for every feed. Rendered with Hyper Elements.</p>
  ${cards}
</main></body></html>
`;
}

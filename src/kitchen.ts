// Kitchen math: the part of Mise that isn't layout.
// A recipe is written once at its own yield; everything here turns it into what
// a cook needs at the stove: scaled amounts, readable fractions, the cook's own
// units, and a shopping list grouped the way a shop is laid out.

export type Unit =
  | "g" | "kg" | "ml" | "l"
  | "tsp" | "tbsp" | "cup"
  | "pinch" | "clove" | "sprig" | "can" | "piece";

export type Aisle = "produce" | "dairy" | "bakery" | "pantry" | "spices" | "meat" | "frozen";

export interface Ingredient {
  qty?: number;
  unit?: Unit;
  item: string;
  /** "finely chopped", "at room temperature" */
  note?: string;
  aisle: Aisle;
  /** Section of the ingredient list: "For the tempering". */
  group?: string;
  /** Something you probably have (salt, water): left off the shopping list. */
  staple?: boolean;
}

export interface Step {
  text: string;
  /** Active minutes for this step: drawn on the timeline. */
  minutes?: number;
  tip?: string;
}

export interface Recipe {
  slug: string;
  title: string;
  /** One line under the title. */
  subtitle: string;
  author: string;
  cuisine: string;
  serves: number;
  /** What one "serving" is: "bowls", "slices". */
  yieldNoun: string;
  time: { prep: number; cook: number; rest?: number };
  difficulty: "Easy" | "Medium" | "Weekend project";
  tags: string[];
  /** The headnote: why this recipe, in the author's voice. */
  story: string;
  ingredients: Ingredient[];
  steps: Step[];
  notes?: string[];
  /** Brand colour for this recipe: buttons, accents, the illustration. */
  accent: string;
  /** The dish's colours, top to bottom, for the generated plate illustration. */
  dish: { base: string; food: string; garnish: string[] };
  url: string;
}

export type System = "metric" | "us";

export interface Options {
  /** Cook for this many instead of the recipe's own yield. */
  serves?: number;
  system?: System;
}

// ---------------------------------------------------------------------------
// Fractions

// ¼ ½ ¾ are in Latin-1, so every font subset has them; thirds and eighths are
// written out ("1/3"), since web-font subsets and PDF fonts often lack ⅓ and ⅛.
const FRACTIONS: Array<[number, string]> = [
  [0, ""], [1 / 8, "1/8"], [1 / 4, "¼"], [1 / 3, "1/3"], [3 / 8, "3/8"], [1 / 2, "½"],
  [5 / 8, "5/8"], [2 / 3, "2/3"], [3 / 4, "¾"], [7 / 8, "7/8"], [1, ""],
];

/** 1.5 → "1½", 0.333 → "1/3", 2.97 → "3". Rounds to the nearest cook-friendly fraction. */
export function fraction(n: number): string {
  let whole = Math.floor(n);
  const rest = n - whole;
  let best = FRACTIONS[0];
  for (const f of FRACTIONS) if (Math.abs(f[0] - rest) < Math.abs(best[0] - rest)) best = f;
  if (best[0] === 1) whole += 1;
  const glyph = best[0] === 1 ? "" : best[1];
  if (whole === 0 && !glyph) return "a little";
  if (glyph.includes("/")) return whole ? `${whole} ${glyph}` : glyph;
  return `${whole || ""}${glyph}`;
}

// ---------------------------------------------------------------------------
// Units

const ML_PER: Record<"tsp" | "tbsp" | "cup", number> = { tsp: 5, tbsp: 15, cup: 240 };

/** Grams to the nearest sensible step: 3 g stays 3 g, 237 g becomes 235 g, 1 240 g becomes 1.25 kg. */
function metricMass(g: number): [number, Unit] {
  if (g >= 1000) return [Math.round(g / 50) / 20, "kg"];
  if (g >= 100) return [Math.round(g / 5) * 5, "g"];
  if (g >= 10) return [Math.round(g), "g"];
  return [Math.round(g * 2) / 2, "g"];
}

function metricVolume(ml: number): [number, Unit] {
  if (ml >= 1000) return [Math.round(ml / 50) / 20, "l"];
  if (ml >= 50) return [Math.round(ml / 5) * 5, "ml"];
  // small volumes read better as spoons, even in metric kitchens
  if (ml >= 15) return [ml / 15, "tbsp"];
  return [ml / 5, "tsp"];
}

/** US cooks measure by volume: millilitres become cups and spoons. */
function usVolume(ml: number): [number, Unit] {
  if (ml >= 60) return [ml / 240, "cup"];
  if (ml >= 15) return [ml / 15, "tbsp"];
  return [ml / 5, "tsp"];
}

export interface Amount {
  /** "1½", "250", "" for "to taste". */
  qty: string;
  /** "tbsp", "g", "cloves". */
  unit: string;
}

function plural(unit: Unit, qty: number): string {
  if (unit === "clove" || unit === "sprig" || unit === "can" || unit === "pinch") return qty > 1 ? `${unit}${unit === "pinch" ? "es" : "s"}` : unit;
  if (unit === "piece") return "";
  if (unit === "cup") return qty > 1 ? "cups" : "cup";
  return unit;
}

/** One ingredient's amount, scaled and written in the cook's units. */
export function amount(ing: Ingredient, factor: number, system: System): Amount {
  if (ing.qty === undefined) return { qty: "", unit: "" };
  let q = ing.qty * factor;
  let unit: Unit = ing.unit ?? "piece";

  if (unit === "kg") { q *= 1000; unit = "g"; }
  if (unit === "l") { q *= 1000; unit = "ml"; }

  if (unit === "g") {
    if (system === "us") {
      const oz = q / 28.35;
      if (oz >= 16) return { qty: fraction(Math.round((oz / 16) * 4) / 4), unit: "lb" };
      return { qty: oz < 1 ? fraction(oz) : fraction(Math.round(oz * 2) / 2), unit: "oz" };
    }
    [q, unit] = metricMass(q);
    return { qty: unit === "kg" ? String(q) : String(q), unit };
  }

  if (unit === "ml" || unit === "tsp" || unit === "tbsp" || unit === "cup") {
    const ml = unit === "ml" ? q : q * ML_PER[unit];
    [q, unit] = system === "us" ? usVolume(ml) : metricVolume(ml);
    if (unit === "ml" || unit === "l") return { qty: String(q), unit };
    return { qty: fraction(q), unit: plural(unit, q) };
  }

  // counted things: half an onion is fine, 0.37 of an egg is not
  return { qty: fraction(q), unit: plural(unit, q) };
}

/** "1½ tbsp ghee, melted": the line as it's printed. */
export function line(ing: Ingredient, factor: number, system: System): { amount: string; item: string; note?: string } {
  const a = amount(ing, factor, system);
  return { amount: [a.qty, a.unit].filter(Boolean).join(" "), item: ing.item, note: ing.note };
}

// ---------------------------------------------------------------------------
// The recipe, prepared

export interface Prepared {
  recipe: Recipe;
  serves: number;
  factor: number;
  system: System;
  /** Ingredient lines by group, in the order written. */
  groups: Array<{ name?: string; lines: ReturnType<typeof line>[] }>;
  shopping: Array<{ aisle: Aisle; label: string; lines: ReturnType<typeof line>[] }>;
  totalMinutes: number;
  /** "1 hr 10 min" */
  totalTime: string;
  scaledNote?: string;
}

export const AISLES: Record<Aisle, string> = {
  produce: "Fruit & veg",
  dairy: "Dairy & eggs",
  bakery: "Bakery",
  meat: "Meat & fish",
  pantry: "Pantry",
  spices: "Spices",
  frozen: "Frozen",
};

export function duration(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export function prepare(recipe: Recipe, options: Options = {}): Prepared {
  const serves = options.serves ?? recipe.serves;
  const system = options.system ?? "metric";
  const factor = serves / recipe.serves;

  const groups: Prepared["groups"] = [];
  for (const ing of recipe.ingredients) {
    let g = groups.find((x) => x.name === ing.group);
    if (!g) groups.push((g = { name: ing.group, lines: [] }));
    g.lines.push(line(ing, factor, system));
  }

  const order = Object.keys(AISLES) as Aisle[];
  const shopping = order
    .map((aisle) => ({
      aisle,
      label: AISLES[aisle],
      lines: recipe.ingredients.filter((i) => i.aisle === aisle && !i.staple).map((i) => line(i, factor, system)),
    }))
    .filter((s) => s.lines.length > 0);

  const totalMinutes = recipe.time.prep + recipe.time.cook + (recipe.time.rest ?? 0);
  return {
    recipe,
    serves,
    factor,
    system,
    groups,
    shopping,
    totalMinutes,
    totalTime: duration(totalMinutes),
    scaledNote:
      factor === 1 ? undefined : `Scaled from ${recipe.serves} to ${serves} ${recipe.yieldNoun}. Cooking times stay the same; pans may need to be bigger.`,
  };
}

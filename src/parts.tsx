import type { ReactElement } from "react";
import { Circle, Column, Ellipse, Path, Rect, Row, Svg, Text, token } from "@hyper-elements/react";
import type { Prepared, Recipe } from "./kitchen";

/** A small, stable random generator: the same recipe always gets the same plate. */
function seeded(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * The dish, from above: a generated illustration drawn with Hyper Elements' Svg
 * shapes, so no food photo is needed and it renders the same on the web page,
 * the PDF and the PNG. Its colours and garnish come from the recipe.
 */
export function Plate({ recipe, size }: { recipe: Pick<Recipe, "slug" | "dish" | "accent">; size: number }) {
  const rand = seeded(recipe.slug);
  const { base, food, garnish } = recipe.dish;
  const bits: ReactElement[] = [];
  for (let i = 0; i < 26; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * 46;
    const cx = 100 + Math.cos(a) * d;
    const cy = 100 + Math.sin(a) * d;
    const color = garnish[i % garnish.length];
    if (i % 3 === 0) {
      // a leaf
      const r = 3 + rand() * 4;
      bits.push(<Ellipse key={i} cx={cx} cy={cy} rx={r * 1.8} ry={r} style={{ fill: color, opacity: 0.92 }} />);
    } else {
      bits.push(<Circle key={i} cx={cx} cy={cy} r={1.4 + rand() * 3} style={{ fill: color, opacity: 0.9 }} />);
    }
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" title={`Illustration of the dish`}>
      <Ellipse cx={104} cy={108} rx={92} ry={90} style={{ fill: "#2B2118", opacity: 0.08 }} />
      <Circle cx={100} cy={100} r={90} style={{ fill: "#FFFDF8", stroke: "#E6D9C6", strokeWidth: 1.5 }} />
      <Circle cx={100} cy={100} r={74} style={{ fill: base, stroke: "#E6D9C6", strokeWidth: 1 }} />
      <Circle cx={100} cy={100} r={60} style={{ fill: food }} />
      <Circle cx={88} cy={86} r={34} style={{ fill: "#FFFFFF", opacity: 0.08 }} />
      {bits}
      {/* a spoon resting on the rim */}
      <Path d="M150 152 L182 184" style={{ fill: "transparent", stroke: recipe.accent, strokeWidth: 7, opacity: 0.85 }} />
      <Ellipse cx={146} cy={148} rx={11} ry={8} style={{ fill: recipe.accent, opacity: 0.85 }} />
    </Svg>
  );
}

/**
 * Where the time goes: prep, cook and rest as one proportional bar, with its
 * labels laid out under each part. Svg has no text, so the labels are Text in
 * a Row whose columns are the segments' widths.
 */
export function TimeBar({ prepared, width, labelSize = 12 }: { prepared: Prepared; width: number; labelSize?: number }) {
  const { prep, cook, rest = 0 } = prepared.recipe.time;
  const total = prep + cook + rest;
  const parts = [
    { label: "Prep", min: prep, color: prepared.recipe.accent },
    { label: "Cook", min: cook, color: "#2B2118" },
    { label: "Rest", min: rest, color: "#D9C6A8" },
  ].filter((p) => p.min > 0);
  const gap = 4;
  const usable = width - gap * (parts.length - 1);
  let x = 0;
  const segs = parts.map((p) => {
    const w = Math.max(28, Math.round((p.min / total) * usable));
    const seg = { ...p, x, w };
    x += w + gap;
    return seg;
  });
  // the rounding can leave a pixel or two: give it to the longest part
  const over = x - gap - width;
  if (over !== 0) {
    const longest = segs.reduce((a, b) => (b.w > a.w ? b : a));
    longest.w -= over;
    let nx = 0;
    for (const s of segs) { s.x = nx; nx += s.w + gap; }
  }
  return (
    <Column style={{ gap: 8, width }}>
      <Svg width={width} height={12} viewBox={`0 0 ${width} 12`} title={`Prep ${prep} min, cook ${cook} min${rest ? `, rest ${rest} min` : ""}`}>
        {segs.map((s) => (
          <Rect key={s.label} x={s.x} y={0} width={s.w} height={12} rx={6} style={{ fill: s.color }} />
        ))}
      </Svg>
      <Row stackOnMobile={false} style={{ gap }}>
        {segs.map((s) => (
          <Text key={s.label} style={{ width: s.w, flex: "none", fontSize: labelSize, color: token("colors.muted"), lineHeight: 1.3 }}>
            {s.label} · {s.min} min
          </Text>
        ))}
      </Row>
    </Column>
  );
}

/** A tick box for a printed list. */
export function Tick({ size = 11 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" style={{ flex: "none" }}>
      <Rect x={0.75} y={0.75} width={10.5} height={10.5} rx={2.5} style={{ fill: "#FFFFFF", stroke: "#2B2118", strokeWidth: 1.2 }} />
    </Svg>
  );
}

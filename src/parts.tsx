import type { ReactElement } from "react";
import { Circle, Column, Ellipse, Path, Rect, Row, Svg, Text, token } from "@hyper-elements/react";
import type { Prepared, Recipe } from "./kitchen";

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

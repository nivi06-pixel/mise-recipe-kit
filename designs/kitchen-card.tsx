import {
  Column, Divider, Document, Grid, Heading, PageBreak, PageFooter, PageNumber, Row, Span, Text, token,
} from "@hyper-elements/react";
import { prepare, type Options, type Recipe } from "../src/kitchen";
import { Plate, Tick, TimeBar } from "../src/parts";
import { themeFor } from "../src/theme";
import { printFonts } from "../src/fonts";
import rasam from "../recipes/tomato-rasam";

export interface KitchenCardProps extends Options {
  recipe: Recipe;
}

// A5 is about 552 x 794 px at 96 dpi; inside 36 px margins the content is 480 px wide.
const CONTENT = 480;

/**
 * The kitchen card: an A5 PDF to print and pin above the stove. Page one is
 * the recipe at the size you're cooking; the last page is the shopping list,
 * grouped by aisle, with boxes to tick.
 */
export default function KitchenCard({ recipe, serves, system }: KitchenCardProps) {
  const p = prepare(recipe, { serves, system });
  return (
    <Document
      lang="en"
      fonts={printFonts}
      theme={themeFor(recipe)}
      size="A5"
      margin={36}
      title={`${recipe.title}: kitchen card`}
      style={{ fontSize: 10.5, lineHeight: 1.45, gap: 14, backgroundColor: "#FFFDF8" }}
    >
      <PageFooter style={{ fontSize: 8, color: token("colors.muted"), border: { top: { width: 0.75, style: "solid", color: token("colors.border") } }, padding: [6, 0, 0] }}>
        <Row stackOnMobile={false} style={{ justifyContent: "space-between" }}>
          <Text style={{ flex: "none" }}>
            <Span style={{ fontFamily: token("fonts.heading"), fontWeight: 700, color: token("colors.foreground") }}>mise.</Span> {recipe.title} · serves {p.serves}
          </Text>
          <Text style={{ flex: "none", textAlign: "right" }}>
            <PageNumber /> / <PageNumber total />
          </Text>
        </Row>
      </PageFooter>

      {/* Title block */}
      <Row stackOnMobile={false} style={{ gap: 16, alignItems: "center" }}>
        <Column style={{ gap: 6 }}>
          <Text style={{ apply: ["eyebrow"], fontSize: 8, letterSpacing: 1.4 }}>
            {recipe.cuisine} · {recipe.difficulty}
          </Text>
          <Heading level={1} style={{ fontSize: 30, letterSpacing: -0.5, lineHeight: 1.05 }}>{recipe.title}</Heading>
          <Text style={{ fontFamily: token("fonts.heading"), fontStyle: "italic", fontSize: 11.5, color: token("colors.muted") }}>{recipe.subtitle}</Text>
        </Column>
        <Column style={{ width: 104, flex: "none" }}>
          <Plate recipe={recipe} size={104} />
        </Column>
      </Row>

      {/* The numbers */}
      <Row stackOnMobile={false} style={{ padding: [8, 0], border: { top: { width: 0.75, style: "solid", color: token("colors.border") }, bottom: { width: 0.75, style: "solid", color: token("colors.border") } } }}>
        {[
          ["Serves", `${p.serves} ${recipe.yieldNoun}`],
          ["Prep", `${recipe.time.prep} min`],
          ["Cook", `${recipe.time.cook} min`],
          ["Total", p.totalTime],
        ].map(([k, v]) => (
          <Column key={k} style={{ gap: 0 }}>
            <Text style={{ fontSize: 7, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: token("colors.muted") }}>{k}</Text>
            <Text style={{ fontFamily: token("fonts.heading"), fontSize: 13, fontWeight: 600 }}>{v}</Text>
          </Column>
        ))}
      </Row>
      <TimeBar prepared={p} width={CONTENT} labelSize={7.5} />
      {p.scaledNote ? (
        <Text style={{ fontSize: 9, backgroundColor: token("colors.soft"), padding: [6, 10], borderRadius: 6 }}>
          <Span style={{ fontWeight: 700 }}>Scaled: </Span>
          {p.scaledNote}
        </Text>
      ) : null}

      {/* Ingredients, two columns */}
      <Heading level={2} style={{ fontSize: 15, padding: [4, 0, 0] }}>Ingredients</Heading>
      {p.groups.map((g) => (
        <Column key={g.name ?? "main"} style={{ gap: 4 }}>
          {g.name ? <Text style={{ fontFamily: token("fonts.heading"), fontWeight: 600, fontSize: 10.5, color: token("colors.primary") }}>{g.name}</Text> : null}
          <Grid columns={2} style={{ gap: 14, rowGap: 3 }}>
            {g.lines.map((l, i) => (
              <Text key={i} style={{ fontSize: 9.5 }}>
                <Span style={{ fontWeight: 700 }}>{l.amount ? `${l.amount} ` : ""}</Span>
                {l.item}
                {l.note ? <Span style={{ color: token("colors.muted") }}>, {l.note}</Span> : null}
              </Text>
            ))}
          </Grid>
        </Column>
      ))}

      {/* The headnote fills the rest of the first page */}
      <Column style={{ gap: 4, padding: [10, 14], backgroundColor: token("colors.soft"), borderRadius: 8 }}>
        <Text style={{ fontFamily: token("fonts.heading"), fontWeight: 600, fontSize: 10.5, color: token("colors.primary") }}>Why this recipe works</Text>
        <Text style={{ fontFamily: token("fonts.heading"), fontSize: 10, lineHeight: 1.55 }}>{recipe.story}</Text>
      </Column>

      {/* Method */}
      <PageBreak />
      <Row stackOnMobile={false} style={{ alignItems: "end", justifyContent: "space-between" }}>
        <Heading level={2} style={{ fontSize: 22 }}>Method</Heading>
        <Text style={{ width: 200, flex: "none", fontSize: 9, color: token("colors.muted"), textAlign: "right" }}>
          {recipe.title} · {p.totalTime}
        </Text>
      </Row>
      <Divider />
      <Column style={{ gap: 12 }}>
        {recipe.steps.map((s, i) => (
          <Row key={i} stackOnMobile={false} style={{ gap: 10, alignItems: "start" }}>
            <Text style={{ width: 22, flex: "none", fontFamily: token("fonts.heading"), fontSize: 16, fontWeight: 600, lineHeight: 1.1, color: token("colors.primary") }}>
              {i + 1}
            </Text>
            <Column style={{ gap: 3 }}>
              <Text style={{ fontSize: 10.5, lineHeight: 1.55 }}>{s.text}</Text>
              {s.tip ? <Text style={{ fontSize: 9, fontFamily: token("fonts.heading"), fontStyle: "italic", color: token("colors.muted") }}>Tip: {s.tip}</Text> : null}
            </Column>
          </Row>
        ))}
      </Column>
      {recipe.notes?.length ? (
        <Column style={{ gap: 4, padding: [10, 12], border: { width: 0.75, style: "dashed", color: token("colors.border") }, borderRadius: 6 }}>
          <Text style={{ fontFamily: token("fonts.heading"), fontWeight: 600, fontSize: 10 }}>Cook's notes</Text>
          {recipe.notes.map((n) => (
            <Text key={n} style={{ fontSize: 9.5, color: token("colors.muted") }}>· {n}</Text>
          ))}
        </Column>
      ) : null}

      {/* Shopping list */}
      <PageBreak />
      <Row stackOnMobile={false} style={{ alignItems: "end", justifyContent: "space-between" }}>
        <Column style={{ gap: 2 }}>
          <Text style={{ apply: ["eyebrow"], fontSize: 8, letterSpacing: 1.4 }}>Shopping list</Text>
          <Heading level={1} style={{ fontSize: 26, lineHeight: 1.1 }}>{recipe.title}</Heading>
        </Column>
        <Text style={{ width: 140, flex: "none", fontSize: 9, color: token("colors.muted"), textAlign: "right" }}>
          for {p.serves} {recipe.yieldNoun}
        </Text>
      </Row>
      <Text style={{ fontSize: 9, color: token("colors.muted") }}>
        Grouped the way a shop is laid out. Salt, water and other staples are left off.
      </Text>
      <Divider />
      <Grid columns={2} style={{ gap: 22, rowGap: 16, alignItems: "start" }}>
        {p.shopping.map((s) => (
          <Column key={s.aisle} style={{ gap: 6 }}>
            <Text style={{ fontFamily: token("fonts.heading"), fontWeight: 600, fontSize: 12, color: token("colors.primary") }}>{s.label}</Text>
            {s.lines.map((l, i) => (
              <Row key={i} stackOnMobile={false} style={{ gap: 7, alignItems: "start" }}>
                <Tick />
                <Text style={{ fontSize: 9.5, lineHeight: 1.3 }}>
                  {l.item}
                  {l.amount ? <Span style={{ color: token("colors.muted") }}> · {l.amount}</Span> : null}
                </Text>
              </Row>
            ))}
          </Column>
        ))}
      </Grid>
      <Column style={{ gap: 6, padding: [12, 0, 0] }}>
        <Text style={{ fontSize: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: token("colors.muted") }}>Also need</Text>
        {[0, 1, 2].map((i) => (
          <Row key={i} stackOnMobile={false} style={{ gap: 7, alignItems: "center" }}>
            <Tick />
            <Column style={{ gap: 0 }}><Divider style={{ borderTop: { width: 0.75, style: "solid", color: token("colors.border") }, padding: [8, 0, 0] }} /></Column>
          </Row>
        ))}
      </Column>
    </Document>
  );
}

KitchenCard.PreviewProps = { recipe: rasam } satisfies KitchenCardProps;

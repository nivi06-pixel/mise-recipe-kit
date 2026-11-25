import {
  Button, Column, Divider, Heading, Link, List, ListItem, Menu, Page, Row, Section, Span, Text, token,
} from "@hyper-elements/react";
import { prepare, type Options, type Recipe } from "../src/kitchen";
import { Plate, TimeBar } from "../src/parts";
import { themeFor } from "../src/theme";
import { webFonts } from "../src/fonts";
import cookies from "../recipes/cookie-pie";

export interface RecipePageProps extends Options {
  recipe: Recipe;
  /** Where the other outputs are, relative to the page. */
  links?: { card?: string; email?: string; pin?: string };
}

const WIDTH = 1120;

/** The recipe's web page: a headnote, the numbers that matter, ingredients beside the method. */
const DEFAULT_LINKS = { card: "kitchen-card.pdf", email: "email.html", pin: "pin.png" };

export default function RecipePage({ recipe, serves, system, links = DEFAULT_LINKS }: RecipePageProps) {
  const p = prepare(recipe, { serves, system });
  const meta = [
    { label: "Prep", value: `${recipe.time.prep} min` },
    { label: "Cook", value: `${recipe.time.cook} min` },
    { label: "Total", value: p.totalTime },
    { label: "Serves", value: `${p.serves} ${recipe.yieldNoun}` },
  ];

  return (
    <Page
      lang="en"
      theme={themeFor(recipe)}
      width={WIDTH}
      title={`${recipe.title} · Mise`}
      description={recipe.subtitle}
      fonts={webFonts}
      breakpoints={{ mobile: 720 }}
    >
      {/* Top bar */}
      <Section style={{ padding: [20, 32], border: { bottom: { width: 1, style: "solid", color: token("colors.border") } }, mobile: { padding: [16, 20] } }}>
        <Row style={{ alignItems: "center", justifyContent: "space-between" }} stackOnMobile={false}>
          <Text style={{ fontFamily: token("fonts.heading"), fontSize: 26, fontWeight: 700, letterSpacing: -0.5, flex: "none" }}>
            mise<Span style={{ color: token("colors.primary") }}>.</Span>
          </Text>
          <Menu
            hidden={{ mobile: true }}
            items={[
              { text: "Recipe", href: "#method" },
              { text: "Kitchen card (PDF)", href: links.card ?? DEFAULT_LINKS.card },
              { text: "Share image", href: links.pin ?? DEFAULT_LINKS.pin },
            ]}
            style={{ color: token("colors.foreground"), fontSize: 14, fontWeight: 500, justifyContent: "end", padding: [4, 0, 4, 24] }}
          />
        </Row>
      </Section>

      {/* Hero */}
      <Section style={{ padding: [64, 32, 48], mobile: { padding: [36, 20, 28] } }}>
        <Row style={{ gap: 56, alignItems: "center", mobile: { gap: 28 } }}>
          <Column style={{ gap: 22 }}>
            <Text style={{ apply: ["eyebrow"] }}>
              {recipe.cuisine} · {recipe.difficulty}
            </Text>
            <Heading level={1}>{recipe.title}</Heading>
            <Text style={{ fontFamily: token("fonts.heading"), fontStyle: "italic", fontSize: 21, lineHeight: 1.4, color: token("colors.muted"), mobile: { fontSize: 18 } }}>
              {recipe.subtitle}
            </Text>
            <Row stackOnMobile={false} style={{ gap: 8, flexWrap: "wrap" }}>
              {recipe.tags.map((t) => (
                <Text key={t} style={{ apply: ["chip"], flex: "none" }}>{t}</Text>
              ))}
            </Row>
            <Row stackOnMobile={false} style={{ gap: 0, padding: [18, 0], border: { top: { width: 1, style: "solid", color: token("colors.border") }, bottom: { width: 1, style: "solid", color: token("colors.border") } }, flexWrap: "wrap" }}>
              {meta.map((m) => (
                <Column key={m.label} style={{ gap: 2, padding: [4, 20, 4, 0], minWidth: 110 }}>
                  <Text style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: token("colors.muted") }}>{m.label}</Text>
                  <Text style={{ fontFamily: token("fonts.heading"), fontSize: 20, fontWeight: 600 }}>{m.value}</Text>
                </Column>
              ))}
            </Row>
            <Row stackOnMobile={false} style={{ gap: 12, flexWrap: "wrap" }}>
              <Button href={links.card ?? DEFAULT_LINKS.card} style={{ flex: "none" }}>Print the kitchen card</Button>
              <Button href="#method" variant="ghost" style={{ flex: "none" }}>Jump to method</Button>
            </Row>
          </Column>
          <Column style={{ width: 420, alignItems: "center", flex: "none", mobile: { width: "100%" } }}>
            <Plate recipe={recipe} size={400} />
          </Column>
        </Row>
      </Section>

      {/* Headnote and timeline */}
      <Section style={{ padding: [0, 32, 48], mobile: { padding: [0, 20, 32] } }}>
        <Column style={{ apply: ["card"], padding: [32, 36], gap: 24, mobile: { padding: 22 } }}>
          <Text style={{ fontFamily: token("fonts.heading"), fontSize: 19, lineHeight: 1.6 }}>
            <Span style={{ fontWeight: 700, color: token("colors.primary") }}>Why this recipe works. </Span>
            {recipe.story}
          </Text>
          <Column hidden={{ mobile: true }} style={{ gap: 10 }}>
            <Text style={{ apply: ["eyebrow"], color: token("colors.muted") }}>Where the {p.totalTime} goes</Text>
            <TimeBar prepared={p} width={WIDTH - 64 - 72 - 2} />
          </Column>
        </Column>
      </Section>

      {/* Ingredients beside the method */}
      <Section id="method" style={{ padding: [0, 32, 72], mobile: { padding: [0, 20, 40] } }}>
        <Row style={{ gap: 48, alignItems: "start", mobile: { gap: 36 } }}>
          <Column style={{ width: 360, flex: "none", gap: 20, mobile: { width: "100%" } }}>
            <Heading level={2}>Ingredients</Heading>
            <Text style={{ fontSize: 14, color: token("colors.muted") }}>
              For {p.serves} {recipe.yieldNoun}
              {p.system === "us" ? ", in US cups and ounces" : ", in metric"}.{p.scaledNote ? ` ${p.scaledNote}` : ""}
            </Text>
            {p.groups.map((g) => (
              <Column key={g.name ?? "main"} style={{ gap: 0 }}>
                {g.name ? <Heading level={3} style={{ padding: [10, 0, 6], color: token("colors.primary") }}>{g.name}</Heading> : null}
                {g.lines.map((l, i) => (
                  <Row key={i} stackOnMobile={false} style={{ gap: 14, padding: [11, 0], border: { bottom: { width: 1, style: "solid", color: token("colors.border") } } }}>
                    <Text style={{ width: 92, flex: "none", fontWeight: 600, fontSize: 15 }}>{l.amount || "—"}</Text>
                    <Text style={{ fontSize: 15 }}>
                      {l.item}
                      {l.note ? <Span style={{ color: token("colors.muted") }}>, {l.note}</Span> : null}
                    </Text>
                  </Row>
                ))}
              </Column>
            ))}
          </Column>

          <Column style={{ gap: 26 }}>
            <Heading level={2}>Method</Heading>
            {recipe.steps.map((s, i) => (
              <Row key={i} stackOnMobile={false} style={{ gap: 18, alignItems: "start" }}>
                <Text style={{ width: 40, flex: "none", fontFamily: token("fonts.heading"), fontSize: 30, fontWeight: 600, lineHeight: 1, color: token("colors.primary") }}>
                  {i + 1}
                </Text>
                <Column style={{ gap: 10 }}>
                  <Text style={{ fontSize: 17, lineHeight: 1.65 }}>{s.text}</Text>
                  {s.tip ? (
                    <Text style={{ fontSize: 14, lineHeight: 1.5, backgroundColor: token("colors.soft"), padding: [10, 14], borderRadius: 10 }}>
                      <Span style={{ fontWeight: 700 }}>Tip: </Span>
                      {s.tip}
                    </Text>
                  ) : null}
                </Column>
              </Row>
            ))}

            {recipe.notes?.length ? (
              <Column style={{ apply: ["card"], gap: 10, padding: 24 }}>
                <Heading level={3}>Cook's notes</Heading>
                <List style={{ gap: 6, fontSize: 15 }}>
                  {recipe.notes.map((n) => (
                    <ListItem key={n}>{n}</ListItem>
                  ))}
                </List>
              </Column>
            ) : null}
          </Column>
        </Row>
      </Section>

      {/* Footer */}
      <Section tokens={{ colors: { foreground: "#F3EADB", muted: "#BBA98F", border: "#4A3B2E" } }} style={{ backgroundColor: "#2B2118", padding: [40, 32], mobile: { padding: [32, 20] } }}>
        <Row style={{ gap: 24, alignItems: "center" }}>
          <Column style={{ gap: 6 }}>
            <Text style={{ fontFamily: token("fonts.heading"), fontSize: 22, fontWeight: 700 }}>
              mise<Span style={{ color: recipe.accent === "#B8462A" ? "#E58A63" : "#E8C27A" }}>.</Span>
            </Text>
            <Text style={{ fontSize: 13, color: token("colors.muted") }}>
              {recipe.author}. Everything in its place: one recipe file, rendered with{" "}
              <Link href="https://www.hyperelements.dev/" style={{ color: "#F3EADB" }}>Hyper Elements</Link>.
            </Text>
          </Column>
          <Text style={{ fontSize: 13, color: token("colors.muted"), textAlign: "right", mobile: { textAlign: "left" } }}>
            {links.card ? <Link href={links.card} style={{ color: "#F3EADB" }}>Kitchen card</Link> : null}
            {links.email ? <> · <Link href={links.email} style={{ color: "#F3EADB" }}>Newsletter</Link></> : null}
          </Text>
        </Row>
      </Section>
    </Page>
  );
}

RecipePage.PreviewProps = { recipe: cookies } satisfies RecipePageProps;

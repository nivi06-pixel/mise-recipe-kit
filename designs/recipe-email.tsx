import {
  Button, Column, Divider, Email, Heading, Link, MergeTag, Row, Section, Span, Text, token,
} from "@hyper-elements/react";
import { prepare, type Options, type Recipe } from "../src/kitchen";
import { themeFor } from "../src/theme";
import { webFonts } from "../src/fonts";
import cookies from "../recipes/chocolate-chip-cookies";

export interface RecipeEmailProps extends Options {
  recipe: Recipe;
  /** "Sunday supper", "This week's recipe" */
  issue?: string;
  links?: { page?: string; card?: string };
}

/**
 * "This week's recipe": the newsletter that sends people to the stove.
 * Email has no Svg, so the dish is a colour block and the numbers do the work;
 * a few ingredients tease the list, and the buttons lead to the page and the PDF.
 */
export default function RecipeEmail({ recipe, serves, system, issue = "This week's recipe", links = {} }: RecipeEmailProps) {
  const p = prepare(recipe, { serves, system });
  const all = p.groups.flatMap((g) => g.lines);
  const teaser = all.slice(0, 6);
  const page = links.page ?? recipe.url;

  return (
    <Email
      lang="en"
      theme={themeFor(recipe)}
      width={600}
      fonts={webFonts}
      title={`${recipe.title} · Mise`}
      previewText={`${recipe.title}: ${p.totalTime}, serves ${p.serves}. ${recipe.subtitle}.`}
      style={{ gap: 0 }}
    >
      <Section style={{ padding: [28, 24, 20] }}>
        <Row stackOnMobile={false} style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: token("fonts.heading"), fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
            mise<Span style={{ color: token("colors.primary") }}>.</Span>
          </Text>
          <Text style={{ fontSize: 12, color: token("colors.muted"), textAlign: "right" }}>{issue}</Text>
        </Row>
      </Section>

      {/* The dish: a band in its own colour */}
      <Section style={{ padding: [0, 16] }}>
        <Column style={{ backgroundColor: recipe.accent, borderRadius: [20, 20, 0, 0], padding: [44, 36, 40], gap: 14, mobile: { padding: [32, 22] } }}>
          <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#FFFDF8" }}>
            {recipe.cuisine} · {recipe.difficulty}
          </Text>
          <Heading level={1} style={{ color: "#FFFDF8", fontSize: 44, mobile: { fontSize: 34 } }}>{recipe.title}</Heading>
          <Text style={{ fontFamily: token("fonts.heading"), fontStyle: "italic", fontSize: 19, lineHeight: 1.4, color: "#FFFFFF" }}>
            {recipe.subtitle}
          </Text>
        </Column>
        <Row stackOnMobile={false} style={{ backgroundColor: "#2B2118", borderRadius: [0, 0, 20, 20], padding: [18, 36], mobile: { padding: [16, 22] } }}>
          {[
            ["Time", p.totalTime],
            ["Serves", `${p.serves}`],
            ["Level", recipe.difficulty],
          ].map(([k, val]) => (
            <Column key={k} style={{ gap: 0 }}>
              <Text style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", color: "#BBA98F" }}>{k}</Text>
              <Text style={{ fontFamily: token("fonts.heading"), fontSize: 18, fontWeight: 600, color: "#FFFDF8", mobile: { fontSize: 16 } }}>{val}</Text>
            </Column>
          ))}
        </Row>
      </Section>

      <Section style={{ padding: [32, 40, 8], gap: 18, mobile: { padding: [24, 22, 8] } }}>
        <Text style={{ fontSize: 17, lineHeight: 1.6 }}>
          Hi <MergeTag name="first_name" />,
        </Text>
        <Text style={{ fontFamily: token("fonts.heading"), fontSize: 18, lineHeight: 1.65 }}>{recipe.story}</Text>
      </Section>

      <Section style={{ padding: [16, 40], mobile: { padding: [16, 22] } }}>
        <Column style={{ apply: ["card"], padding: [24, 28], gap: 4 }}>
          <Heading level={2} style={{ fontSize: 22, padding: [0, 0, 8] }}>What you'll need</Heading>
          {teaser.map((l, i) => (
            <Row key={i} stackOnMobile={false} style={{ gap: 12, padding: [7, 0], border: { bottom: { width: 1, style: "solid", color: token("colors.border") } } }}>
              <Text style={{ width: 84, flex: "none", fontWeight: 600, fontSize: 15 }}>{l.amount || "—"}</Text>
              <Text style={{ fontSize: 15 }}>{l.item}</Text>
            </Row>
          ))}
          {all.length > teaser.length ? (
            <Text style={{ fontSize: 14, color: token("colors.muted"), padding: [10, 0, 0] }}>
              …and {all.length - teaser.length} more, all on the{" "}
              <Link href={page} style={{ color: token("colors.primary"), fontWeight: 600 }}>full recipe</Link>.
            </Text>
          ) : null}
        </Column>
      </Section>

      <Section style={{ padding: [16, 40, 36], gap: 14, alignItems: "center", mobile: { padding: [16, 22, 28] } }}>
        <Button href={page} style={{ width: "100%", padding: [16, 24], fontSize: 16 }}>Cook it tonight</Button>
        {links.card ? (
          <Text style={{ fontSize: 14, textAlign: "center", color: token("colors.muted") }}>
            Cooking offline? <Link href={links.card} style={{ color: token("colors.foreground"), fontWeight: 600 }}>Print the kitchen card and shopping list (PDF)</Link>
          </Text>
        ) : null}
      </Section>

      <Section style={{ padding: [0, 40, 40], gap: 12, mobile: { padding: [0, 22, 32] } }}>
        <Divider />
        <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted"), textAlign: "center" }}>
          You're getting this because you signed up for one good recipe a week from Mise.{" "}
          <Link href="{{unsubscribe_url}}" style={{ color: token("colors.muted") }}>Unsubscribe</Link>
        </Text>
      </Section>
    </Email>
  );
}

RecipeEmail.PreviewProps = { recipe: cookies, links: { page: "index.html", card: "kitchen-card.pdf" } } satisfies RecipeEmailProps;

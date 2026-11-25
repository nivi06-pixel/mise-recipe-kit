import { Canvas, Column, Heading, Row, Span, Text, prop, token } from "@hyper-elements/react";
import { template } from "@hyper-elements/react/template";
import { Plate } from "./parts";
import { themeFor } from "./theme";
import { printFonts } from "./fonts";

const FORMATS = {
  /** Pinterest's 2:3 pin. */
  pin: { width: 1000, height: 1500 },
  /** An Instagram or feed post. */
  square: { width: 1080, height: 1080 },
  /** Stories and reels: 9:16. */
  story: { width: 1080, height: 1920 },
} as const;

/**
 * The share image, as a Hyper Elements template: its fixed parts (the paper,
 * the wordmark, the plate), its open fields (each typed, with limits), and
 * three formats. `ShareCard.check(values)` refuses a dish name that won't fit
 * before anything is drawn; `ShareCard.describe()` tells an agent or a CMS
 * exactly what it may fill in.
 */
export const ShareCard = template({
  id: "mise.ShareCard",
  version: "1.0.0",
  label: "Recipe share image",
  description: "A recipe's share image for Pinterest, feeds and stories: the dish, drawn, with its name and the numbers that matter.",
  guidance: "Lead with the dish's name as people would search for it. Keep the hook to one sentence a friend would say.",
  root: "Canvas",
  formats: FORMATS,
  fields: {
    title: prop.text({ label: "Dish name", required: true, maxLength: 48, guidance: "The name people search for: 'Chocolate Chip Cookies', not 'Little bites of joy'." }),
    kicker: prop.text({ label: "Kicker", maxLength: 32, description: "Small line above the name: a cuisine, a course." }),
    hook: prop.text({ label: "Hook", required: true, maxLength: 110, guidance: "One sentence: why cook this tonight." }),
    totalTime: prop.text({ label: "Total time", required: true, maxLength: 14 }),
    serves: prop.text({ label: "Serves", required: true, maxLength: 14 }),
    tags: prop.list(prop.text({ label: "Tag", maxLength: 18 }), { label: "Tags", max: 3 }),
    seed: prop.text({ label: "Illustration seed", required: true, description: "Places the garnish: the recipe's slug keeps every format's plate the same." }),
    accent: prop.color({ label: "Accent", required: true }),
    base: prop.color({ label: "Bowl colour", required: true }),
    food: prop.color({ label: "Food colour", required: true }),
    garnish: prop.list(prop.color({ label: "Garnish colour" }), { label: "Garnish colours", min: 1, max: 4 }),
  },
  example: {
    title: "Chocolate Chip Cookie Pie",
    kicker: "American",
    hook: "One giant cookie baked in a skillet, crackly on top and molten in the middle.",
    totalTime: "58 min",
    serves: "8 slices",
    tags: ["Vegetarian", "Crowd-pleaser"],
    seed: "cookie-pie",
    accent: "#8A3E17",
    base: "#2F2A27",
    food: "#C68A4E",
    garnish: ["#3B2314", "#5A3520", "#FFF8EE"],
  },
  render(v, { format }) {
    const { width, height } = FORMATS[format];
    const dish = { slug: v.seed, accent: v.accent, dish: { base: v.base, food: v.food, garnish: v.garnish } };
    const square = format === "square";
    const pad = square ? 72 : 80;
    const plate = square ? 440 : format === "story" ? 840 : 580;

    const words = (
      <Column style={{ gap: square ? 22 : 28 }}>
        {v.kicker ? (
          <Text style={{ fontSize: 26, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: v.accent }}>{v.kicker}</Text>
        ) : null}
        <Heading level={1} fit={{ sizes: square ? [104, 92, 80, 68, 58] : [132, 116, 100, 88, 76], maxLines: square ? 3 : 2 }} style={{ lineHeight: 1.02, letterSpacing: -2, color: "#2B2118" }}>
          {v.title}
        </Heading>
        <Text fit={{ sizes: [36, 32, 28], maxLines: 3 }} style={{ fontFamily: token("fonts.heading"), fontStyle: "italic", lineHeight: 1.3, color: "#7A6A5A" }}>
          {v.hook}
        </Text>
        <Row style={{ gap: 14 }}>
          {/* an image can't wrap a row: the square, narrower, keeps to the numbers */}
          {(square ? [v.totalTime, v.serves] : [v.totalTime, v.serves, ...v.tags]).map((t, i) => (
            <Text
              key={t}
              style={{
                flex: "none",
                fontSize: square ? 24 : 26,
                fontWeight: 600,
                padding: square ? [10, 22] : [12, 26],
                borderRadius: 999,
                backgroundColor: i < 2 ? "#2B2118" : "#F3EADB",
                color: i < 2 ? "#FFFDF8" : "#2B2118",
              }}
            >
              {t}
            </Text>
          ))}
        </Row>
      </Column>
    );

    const mark = (
      <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ flex: "none", fontFamily: token("fonts.heading"), fontSize: 44, fontWeight: 700, letterSpacing: -1, color: "#2B2118" }}>
          mise<Span style={{ color: v.accent }}>.</Span>
        </Text>
        <Text style={{ flex: "none", fontSize: 22, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: v.accent }}>Save it · cook it tonight</Text>
      </Row>
    );

    const footer = (
      <Text style={{ fontSize: 22, fontWeight: 500, color: "#7A6A5A", padding: [22, 0, 0], border: { top: { width: 2, style: "solid", color: "#E6D9C6" } } }}>
        Full recipe, printable kitchen card and shopping list inside
      </Text>
    );

    return (
      <Canvas
        theme={themeFor({ accent: v.accent })}
        width={width}
        height={height}
        title={v.title}
        lang="en"
        fonts={printFonts}
        style={{ backgroundColor: "#FBF6EE", padding: pad, gap: 40, justifyContent: "space-between" }}
      >
        {mark}
        {square ? (
          <Row style={{ gap: 48, alignItems: "center" }}>
            <Column style={{ width: plate, flex: "none" }}>
              <Plate recipe={dish} size={plate} />
            </Column>
            {words}
          </Row>
        ) : (
          <>
            <Column style={{ alignItems: "center" }}>
              <Plate recipe={dish} size={plate} />
            </Column>
            {words}
          </>
        )}
        {footer}
      </Canvas>
    );
  },
});
export default ShareCard;

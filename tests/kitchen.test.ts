import { test } from "node:test";
import assert from "node:assert/strict";
import { amount, fraction, line, prepare } from "../src/kitchen";
import cookies from "../recipes/chocolate-chip-cookies";
import bread from "../recipes/banana-bread";

test("fractions a cook can read", () => {
  assert.equal(fraction(1.5), "1½");
  assert.equal(fraction(0.75), "¾");
  assert.equal(fraction(0.333), "1/3");
  assert.equal(fraction(8.33), "8 1/3");
  assert.equal(fraction(2.97), "3");
  assert.equal(fraction(0.01), "a little");
});

test("scaling doubles amounts and keeps times", () => {
  const p = prepare(cookies, { serves: 48 });
  assert.equal(p.factor, 2);
  assert.equal(p.groups[0].lines[0].amount, "340 g");
  assert.equal(p.totalTime, "1 hr 2 min");
  assert.match(p.scaledNote ?? "", /from 24 to 48 cookies/);
});

test("metric grams roll over to kilograms", () => {
  assert.deepEqual(amount({ qty: 400, unit: "g", item: "x", aisle: "produce" }, 3, "metric"), { qty: "1.2", unit: "kg" });
});

test("US units: grams to ounces and pounds, millilitres to cups and spoons", () => {
  assert.deepEqual(amount({ qty: 400, unit: "g", item: "x", aisle: "produce" }, 2, "us"), { qty: "1¾", unit: "lb" });
  assert.deepEqual(amount({ qty: 60, unit: "ml", item: "x", aisle: "dairy" }, 1, "us"), { qty: "¼", unit: "cup" });
  assert.deepEqual(amount({ qty: 2, unit: "tbsp", item: "x", aisle: "dairy" }, 2, "us"), { qty: "¼", unit: "cup" });
});

test("counted things pluralise and halve sensibly", () => {
  assert.deepEqual(amount({ qty: 4, unit: "clove", item: "garlic", aisle: "produce" }, 0.5, "metric"), { qty: "2", unit: "cloves" });
  assert.deepEqual(amount({ qty: 1, unit: "pinch", item: "hing", aisle: "spices" }, 2, "metric"), { qty: "2", unit: "pinches" });
  assert.deepEqual(amount({ qty: 2, unit: "piece", item: "eggs", aisle: "dairy" }, 0.5, "metric"), { qty: "1", unit: "" });
});

test("shopping list leaves staples off and groups by aisle", () => {
  const p = prepare(bread);
  const items = p.shopping.flatMap((s) => s.lines.map((l) => l.item));
  assert.ok(!items.includes("fine salt"));
  assert.deepEqual(p.shopping.map((s) => s.aisle), ["produce", "dairy", "pantry", "spices"]);
});

test("counted items are pluralised after scaling", () => {
  const egg = { qty: 1, unit: "piece" as const, item: "large egg", aisle: "dairy" as const };
  assert.equal(line(egg, 1, "metric").item, "large egg");
  assert.equal(line(egg, 2, "metric").item, "large eggs");
  assert.equal(line({ ...egg, item: "dried red chilli" }, 2, "metric").item, "dried red chillies");
});

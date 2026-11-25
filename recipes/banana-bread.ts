import type { Recipe } from "../src/kitchen";

const bananaBread: Recipe = {
  slug: "brown-butter-banana-bread",
  title: "Brown Butter Banana Bread",
  subtitle: "Toasty, nutty, and the reason to let your bananas go fully black",
  author: "Mise Test Kitchen",
  cuisine: "Bakes",
  serves: 10,
  yieldNoun: "slices",
  time: { prep: 20, cook: 60, rest: 30 },
  difficulty: "Medium",
  tags: ["Vegetarian", "Make ahead", "Freezes well"],
  story:
    "Browning the butter takes four extra minutes and changes everything: the milk solids toast into something that tastes like hazelnuts and caramel. Use the ugliest bananas you can find. If they are not spotted black, wait two more days; the loaf will thank you.",
  ingredients: [
    { qty: 115, unit: "g", item: "unsalted butter", aisle: "dairy" },
    { qty: 4, unit: "piece", item: "very ripe banana", note: "about 450 g peeled", aisle: "produce" },
    { qty: 150, unit: "g", item: "light brown sugar", aisle: "pantry" },
    { qty: 2, unit: "piece", item: "large egg", note: "at room temperature", aisle: "dairy" },
    { qty: 60, unit: "ml", item: "plain yoghurt", aisle: "dairy" },
    { qty: 1, unit: "tsp", item: "vanilla extract", aisle: "pantry" },
    { qty: 220, unit: "g", item: "plain flour", aisle: "pantry" },
    { qty: 1, unit: "tsp", item: "bicarbonate of soda", aisle: "pantry" },
    { qty: 0.75, unit: "tsp", item: "fine salt", aisle: "pantry", staple: true },
    { qty: 1, unit: "tsp", item: "ground cinnamon", aisle: "spices" },
    { qty: 75, unit: "g", item: "walnuts", note: "toasted and chopped", aisle: "pantry", group: "Optional" },
    { qty: 1, unit: "tbsp", item: "demerara sugar", note: "for the crust", aisle: "pantry", group: "Optional" },
  ],
  steps: [
    { text: "Heat the oven to 175°C (350°F). Butter a 900 g (2 lb) loaf tin and line it with a sling of baking paper.", minutes: 5 },
    { text: "Melt the butter in a light-coloured pan over medium heat, swirling, until it smells nutty and the specks on the bottom turn brown. Pour into a large bowl, specks and all, and cool for 10 minutes.", minutes: 6, tip: "Watch it closely after it stops foaming: brown turns to burnt in about 30 seconds." },
    { text: "Mash the bananas into the butter with a fork, leaving a few lumps. Whisk in the sugar, eggs, yoghurt and vanilla.", minutes: 4 },
    { text: "Whisk the flour, bicarbonate of soda, salt and cinnamon in another bowl, then fold into the wet mix until just combined. Fold in the walnuts.", minutes: 3, tip: "Stop while you can still see a streak of flour. Overmixing makes it tough." },
    { text: "Scrape into the tin, scatter with demerara sugar and bake for 55 to 65 minutes, until a skewer comes out with only a few moist crumbs.", minutes: 60 },
    { text: "Cool in the tin for 15 minutes, then lift out by the paper and cool on a rack before slicing.", minutes: 2 },
  ],
  notes: [
    "Wrapped tightly, it keeps for 4 days at room temperature or 3 months in the freezer.",
    "Slices toast beautifully from frozen. Serve with salted butter.",
  ],
  accent: "#9A5B13",
  dish: { base: "#F4EBDD", food: "#A8692A", garnish: ["#6B3E14", "#E8C27A", "#F6E6C4"] },
  url: "https://github.com/",
};

export default bananaBread;

import type { Recipe } from "../src/kitchen";

const cookies: Recipe = {
  slug: "chocolate-chip-cookies",
  title: "Chocolate Chip Cookies",
  subtitle: "Crisp at the edges, gooey in the middle, with a little flaky salt on top",
  author: "Mise Test Kitchen",
  cuisine: "American",
  serves: 24,
  yieldNoun: "cookies",
  time: { prep: 20, cook: 12, rest: 30 },
  difficulty: "Easy",
  tags: ["Vegetarian", "Kid-friendly", "Freezes well"],
  story:
    "Everyone has a cookie they're chasing: the one from a school bake sale or a grandmother's tin. This one gets there with two small tricks. Melted butter makes the centres chewy instead of cakey, and thirty minutes in the fridge lets the dough turn toffee-sweet and stops it spreading into puddles. Pull them out while they still look a little underdone.",
  ingredients: [
    { qty: 170, unit: "g", item: "unsalted butter", note: "melted and cooled", aisle: "dairy" },
    { qty: 200, unit: "g", item: "light brown sugar", aisle: "pantry" },
    { qty: 100, unit: "g", item: "granulated sugar", aisle: "pantry" },
    { qty: 1, unit: "piece", item: "large egg", aisle: "dairy" },
    { qty: 1, unit: "piece", item: "egg yolk", aisle: "dairy" },
    { qty: 2, unit: "tsp", item: "vanilla extract", aisle: "pantry" },
    { qty: 280, unit: "g", item: "all-purpose flour", aisle: "pantry" },
    { qty: 1, unit: "tsp", item: "baking soda", aisle: "pantry" },
    { qty: 1, unit: "tsp", item: "fine salt", aisle: "pantry", staple: true },
    { qty: 340, unit: "g", item: "semisweet chocolate chips", aisle: "pantry" },
    { qty: 1, unit: "pinch", item: "flaky sea salt", note: "for the tops", aisle: "spices", group: "To finish" },
  ],
  steps: [
    { text: "Whisk the melted butter with both sugars until glossy, about 1 minute. Whisk in the egg, the yolk and the vanilla until smooth and a shade lighter.", minutes: 4, tip: "Melted butter gives chewy centres; softened, creamed butter gives cakier cookies." },
    { text: "Fold in the flour, baking soda and salt with a spatula until no dry streaks remain, then fold in the chocolate chips.", minutes: 3 },
    { text: "Cover the bowl and chill the dough for 30 minutes, or up to 3 days.", minutes: 1, tip: "Resting lets the flour soak up moisture: less spread, deeper toffee flavour." },
    { text: "Heat the oven to 180°C (350°F) and line two baking sheets with baking paper. Scoop 2-tablespoon balls of dough, 5 cm (2 in) apart.", minutes: 8 },
    { text: "Bake one sheet at a time for 10 to 12 minutes, until the edges are golden but the centres still look soft. Sprinkle with flaky salt straight away.", minutes: 12 },
    { text: "Leave on the sheet for 5 minutes to set, then move to a rack. Eat at least one warm.", minutes: 2 },
  ],
  notes: [
    "Keeps for 5 days in an airtight tin.",
    "Freeze scooped dough balls and bake from frozen: add 2 minutes.",
  ],
  accent: "#9B4A1C",
  dish: { base: "#F4EBDD", food: "#C98A4B", garnish: ["#3B2314", "#5A3520", "#FFF8EE"] },
  url: "https://nivi06-pixel.github.io/mise-recipe-kit/chocolate-chip-cookies/",
};

export default cookies;

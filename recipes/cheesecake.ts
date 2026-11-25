import type { Recipe } from "../src/kitchen";

const cheesecake: Recipe = {
  slug: "cheesecake",
  title: "New York Cheesecake",
  subtitle: "Dense, creamy and tall, on a buttery biscuit base, with a sour cream top",
  author: "Mise Test Kitchen",
  cuisine: "Bakes",
  serves: 12,
  yieldNoun: "slices",
  time: { prep: 30, cook: 75, rest: 360 },
  difficulty: "Weekend project",
  tags: ["Vegetarian", "Make ahead"],
  story:
    "A good cheesecake is patience more than skill. Room-temperature cream cheese beats smooth without lumps, a low oven keeps the top from cracking, and an hour cooling in the switched-off oven lets it settle gently. Then it needs a night in the fridge, which makes it the perfect dessert to finish the day before.",
  ingredients: [
    { qty: 200, unit: "g", item: "digestive biscuits", note: "or graham crackers", aisle: "pantry", group: "For the base" },
    { qty: 90, unit: "g", item: "unsalted butter", note: "melted", aisle: "dairy", group: "For the base" },
    { qty: 1, unit: "tbsp", item: "granulated sugar", aisle: "pantry", group: "For the base" },
    { qty: 900, unit: "g", item: "full-fat cream cheese", note: "at room temperature", aisle: "dairy", group: "For the filling" },
    { qty: 250, unit: "g", item: "caster sugar", aisle: "pantry", group: "For the filling" },
    { qty: 3, unit: "tbsp", item: "plain flour", aisle: "pantry", group: "For the filling" },
    { qty: 2, unit: "tsp", item: "vanilla extract", aisle: "pantry", group: "For the filling" },
    { qty: 1, unit: "tsp", item: "lemon zest", aisle: "produce", group: "For the filling" },
    { qty: 4, unit: "piece", item: "large egg", note: "at room temperature", aisle: "dairy", group: "For the filling" },
    { qty: 1, unit: "pinch", item: "fine salt", aisle: "pantry", staple: true, group: "For the filling" },
    { qty: 240, unit: "ml", item: "sour cream", aisle: "dairy", group: "For the top" },
    { qty: 2, unit: "tbsp", item: "icing sugar", aisle: "pantry", group: "For the top" },
  ],
  steps: [
    { text: "Heat the oven to 160°C (325°F). Line the base of a 23 cm (9 in) springform tin with baking paper.", minutes: 3 },
    { text: "Crush the biscuits to fine crumbs, stir in the melted butter and sugar, and press firmly into the tin. Bake for 10 minutes, then cool. Turn the oven down to 140°C (285°F).", minutes: 15 },
    { text: "Beat the cream cheese on low speed until smooth, then beat in the sugar, flour, vanilla, lemon zest and salt.", minutes: 4, tip: "Keep the mixer on low. Beating in air is what makes the top crack." },
    { text: "Add the eggs one at a time, mixing only until each disappears. Pour over the base and tap the tin on the counter to pop any bubbles.", minutes: 4 },
    { text: "Bake for 60 to 65 minutes, until the edges are set but the centre still wobbles like jelly. Turn off the oven, prop the door open and leave it inside for 1 hour.", minutes: 65 },
    { text: "Stir the sour cream with the icing sugar and spread it over the top. Chill for at least 6 hours, or overnight, before releasing the tin and slicing.", minutes: 4, tip: "Cut with a long knife dipped in hot water and wiped between slices." },
  ],
  notes: [
    "Keeps for 5 days in the fridge, covered.",
    "Freezes well in slices: wrap each one and thaw overnight in the fridge.",
  ],
  accent: "#A8562E",
  dish: { base: "#F4EBDD", food: "#F7E7C6", garnish: ["#C98A4B", "#B3213A", "#FFFDF5"] },
  url: "https://nivi06-pixel.github.io/mise-recipe-kit/cheesecake/",
};

export default cheesecake;

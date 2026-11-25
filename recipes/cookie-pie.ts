import type { Recipe } from "../src/kitchen";

const cookiePie: Recipe = {
  slug: "cookie-pie",
  title: "Chocolate Chip Cookie Pie",
  subtitle: "One giant cookie baked in a skillet, crackly on top and molten in the middle",
  author: "Mise Test Kitchen",
  cuisine: "American",
  serves: 8,
  yieldNoun: "slices",
  time: { prep: 15, cook: 28, rest: 15 },
  difficulty: "Easy",
  tags: ["Vegetarian", "Crowd-pleaser", "One pan"],
  story:
    "This is a cookie for people who can't wait for a tray of cookies. Everything goes into one bowl and then one cast-iron skillet, and it comes out with crisp, caramelised edges and a centre that is barely set. Serve it warm, in wedges, with a scoop of vanilla ice cream melting into the middle.",
  ingredients: [
    { qty: 170, unit: "g", item: "unsalted butter", note: "melted and cooled", aisle: "dairy" },
    { qty: 200, unit: "g", item: "light brown sugar", aisle: "pantry" },
    { qty: 50, unit: "g", item: "granulated sugar", aisle: "pantry" },
    { qty: 1, unit: "piece", item: "large egg", aisle: "dairy" },
    { qty: 1, unit: "piece", item: "egg yolk", aisle: "dairy" },
    { qty: 2, unit: "tsp", item: "vanilla extract", aisle: "pantry" },
    { qty: 250, unit: "g", item: "all-purpose flour", aisle: "pantry" },
    { qty: 0.5, unit: "tsp", item: "baking soda", aisle: "pantry" },
    { qty: 1, unit: "tsp", item: "fine salt", aisle: "pantry", staple: true },
    { qty: 225, unit: "g", item: "dark chocolate", note: "roughly chopped", aisle: "pantry" },
    { qty: 1, unit: "pinch", item: "flaky sea salt", aisle: "spices", group: "To serve" },
    { qty: 500, unit: "ml", item: "vanilla ice cream", aisle: "frozen", group: "To serve" },
  ],
  steps: [
    { text: "Heat the oven to 180°C (350°F) and butter a 25 cm (10 in) cast-iron skillet or pie dish.", minutes: 3 },
    { text: "Whisk the melted butter with both sugars until glossy. Whisk in the egg, the yolk and the vanilla until smooth.", minutes: 3, tip: "Melted butter is what makes the middle fudgy rather than cakey." },
    { text: "Fold in the flour, baking soda and salt until just combined, then fold in two-thirds of the chocolate.", minutes: 3 },
    { text: "Press the dough evenly into the skillet and scatter the rest of the chocolate over the top.", minutes: 2 },
    { text: "Bake for 25 to 28 minutes, until the edges are deep golden and the centre still wobbles slightly. Sprinkle with flaky salt.", minutes: 28, tip: "Take it out while the middle looks underdone: the hot pan keeps cooking it." },
    { text: "Rest for 15 minutes so it sets enough to slice, then cut into wedges and serve warm with ice cream.", minutes: 2 },
  ],
  notes: [
    "Covered, it keeps for 3 days. Warm slices in a low oven for 5 minutes.",
    "No skillet? A 23 cm (9 in) round cake tin works; start checking at 22 minutes.",
  ],
  accent: "#8A3E17",
  photo: { file: "cookie-pie.jpg", width: 1600, height: 1067, alt: "A cast-iron skillet of chocolate chip cookie pie with a scoop of melting vanilla ice cream and a wedge spooned out", credit: "Salm Dans", creditUrl: "https://unsplash.com/@salmdans" },
  url: "https://nivi06-pixel.github.io/mise-recipe-kit/cookie-pie/",
};

export default cookiePie;

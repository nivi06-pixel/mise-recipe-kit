import type { Recipe } from "../src/kitchen";

const cheeseburger: Recipe = {
  slug: "cheeseburger",
  title: "Smash Cheeseburgers",
  subtitle: "Thin, crusty patties, melted cheddar and a tangy burger sauce on a toasted bun",
  author: "Mise Test Kitchen",
  cuisine: "American",
  serves: 4,
  yieldNoun: "burgers",
  time: { prep: 15, cook: 10 },
  difficulty: "Easy",
  tags: ["Weeknight", "Crowd-pleaser"],
  story:
    "A smash burger is mostly about heat. Press a ball of beef hard into a very hot pan and the whole surface turns brown and crisp in about two minutes, which a thick patty never manages. Two thin patties with cheese melted between them beat one fat one every time, and the sauce takes a minute to stir together.",
  ingredients: [
    { qty: 600, unit: "g", item: "beef mince", note: "20% fat, cold", aisle: "meat" },
    { qty: 1, unit: "tsp", item: "fine salt", aisle: "pantry", staple: true },
    { qty: 0.5, unit: "tsp", item: "black pepper", aisle: "spices" },
    { qty: 8, unit: "piece", item: "cheddar slice", aisle: "dairy" },
    { qty: 4, unit: "piece", item: "brioche bun", note: "split", aisle: "bakery" },
    { qty: 1, unit: "tbsp", item: "butter", note: "softened, for the buns", aisle: "dairy" },
    { qty: 1, unit: "piece", item: "small onion", note: "very thinly sliced", aisle: "produce", group: "To build" },
    { qty: 4, unit: "piece", item: "lettuce leaf", aisle: "produce", group: "To build" },
    { qty: 2, unit: "piece", item: "dill pickle", note: "sliced", aisle: "pantry", group: "To build" },
    { qty: 4, unit: "tbsp", item: "mayonnaise", aisle: "pantry", group: "Burger sauce" },
    { qty: 1, unit: "tbsp", item: "ketchup", aisle: "pantry", group: "Burger sauce" },
    { qty: 1, unit: "tsp", item: "yellow mustard", aisle: "pantry", group: "Burger sauce" },
    { qty: 1, unit: "tbsp", item: "pickle brine", aisle: "pantry", group: "Burger sauce" },
  ],
  steps: [
    { text: "Stir the mayonnaise, ketchup, mustard and pickle brine together for the sauce and set aside.", minutes: 2 },
    { text: "Divide the beef into 8 loose balls of about 75 g. Keep them in the fridge until the pan is ready.", minutes: 3, tip: "Handle the meat as little as possible; packed beef cooks up tough." },
    { text: "Butter the cut sides of the buns and toast them in a large dry pan or griddle until golden. Set aside.", minutes: 3 },
    { text: "Heat the pan over high heat until it smokes. Add 2 or 3 balls, then smash each one flat and thin with a sturdy spatula. Season with salt and pepper.", minutes: 2, tip: "Press hard in the first 30 seconds only. After that, leave them alone." },
    { text: "Cook for 2 minutes, until the edges are deep brown and crisp. Scrape them up, flip, lay a slice of cheddar on each and cook 1 minute more. Repeat with the rest.", minutes: 6 },
    { text: "Spread sauce on both halves of each bun, then stack lettuce, two patties, onion and pickles. Eat straight away.", minutes: 3 },
  ],
  notes: [
    "A cast-iron pan or a flat griddle gives the best crust; non-stick won't get hot enough.",
    "The sauce keeps for a week in the fridge.",
  ],
  accent: "#B23A1F",
  photo: { file: "cheeseburger.jpg", width: 1600, height: 1067, alt: "A double smash cheeseburger with melted cheddar and sliced red onion in a glossy bun", credit: "Manu Ros", creditUrl: "https://unsplash.com/@manuros" },
  url: "https://nivi06-pixel.github.io/mise-recipe-kit/cheeseburger/",
};

export default cheeseburger;

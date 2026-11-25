import type { Recipe } from "../src/kitchen";

const rasam: Recipe = {
  slug: "tomato-rasam",
  title: "Tomato Rasam",
  subtitle: "A peppery, tamarind-sour broth for rainy evenings and slow recoveries",
  author: "Mise Test Kitchen",
  cuisine: "South Indian",
  serves: 4,
  yieldNoun: "bowls",
  time: { prep: 10, cook: 20, rest: 5 },
  difficulty: "Easy",
  tags: ["Vegan", "Gluten-free", "One pot"],
  story:
    "Every South Indian home has its own rasam, and every cook swears theirs is the right one. This is the weeknight version: no dal to cook, nothing to soak, just ripe tomatoes, tamarind and a fistful of black pepper, finished with a sizzling tempering. Drink it from a cup, or pour it over hot rice with a spoonful of ghee.",
  ingredients: [
    { qty: 400, unit: "g", item: "ripe tomatoes", note: "roughly chopped", aisle: "produce" },
    { qty: 15, unit: "g", item: "tamarind pulp", note: "soaked in 120 ml warm water", aisle: "pantry" },
    { qty: 1, unit: "tsp", item: "black peppercorns", aisle: "spices" },
    { qty: 1, unit: "tsp", item: "cumin seeds", aisle: "spices" },
    { qty: 4, unit: "clove", item: "garlic", note: "lightly crushed", aisle: "produce" },
    { qty: 0.5, unit: "tsp", item: "ground turmeric", aisle: "spices" },
    { qty: 1, unit: "l", item: "water", aisle: "pantry", staple: true },
    { qty: 1.5, unit: "tsp", item: "fine salt", note: "or to taste", aisle: "pantry", staple: true },
    { qty: 2, unit: "tbsp", item: "ghee", note: "or coconut oil to keep it vegan", aisle: "dairy", group: "For the tempering" },
    { qty: 1, unit: "tsp", item: "black mustard seeds", aisle: "spices", group: "For the tempering" },
    { qty: 2, unit: "piece", item: "dried red chillies", note: "broken in half", aisle: "spices", group: "For the tempering" },
    { qty: 2, unit: "sprig", item: "curry leaves", aisle: "produce", group: "For the tempering" },
    { qty: 1, unit: "pinch", item: "asafoetida (hing)", aisle: "spices", group: "For the tempering" },
    { qty: 15, unit: "g", item: "coriander leaves", note: "chopped, to finish", aisle: "produce", group: "To finish" },
  ],
  steps: [
    { text: "Squeeze the soaked tamarind and strain the liquid into a jug. Throw away the fibres and seeds.", minutes: 3 },
    { text: "Pound the peppercorns, cumin and garlic to a coarse paste in a mortar, or pulse a few times in a spice grinder.", minutes: 4, tip: "Coarse is the point: you want little bursts of pepper, not a smooth powder." },
    { text: "Put the tomatoes, turmeric, salt and the pepper paste in a pot with the water. Simmer for 10 minutes, mashing the tomatoes against the side of the pot.", minutes: 12 },
    { text: "Pour in the tamarind water and bring it just to a froth. Take it off the heat the moment it rises: boiled rasam turns bitter.", minutes: 5 },
    { text: "Heat the ghee in a small pan. Add the mustard seeds; when they pop, add the chillies, curry leaves and asafoetida. Pour it, sizzling, over the rasam.", minutes: 2 },
    { text: "Cover and leave for 5 minutes so the tempering steeps, then scatter with coriander and serve.", minutes: 5 },
  ],
  notes: [
    "Keeps for 3 days in the fridge and tastes better on day two.",
    "For a fuller rasam, stir in 100 g of cooked, mashed toor dal at step 3.",
  ],
  accent: "#B8462A",
  dish: { base: "#F3E7D3", food: "#C2502E", garnish: ["#3E7B3A", "#E9B44C", "#5A2A1A"] },
  url: "https://github.com/",
};

export default rasam;

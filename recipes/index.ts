import type { Recipe } from "../src/kitchen";
import cookiePie from "./cookie-pie";
import cheeseburger from "./cheeseburger";
import cheesecake from "./cheesecake";

/** Every recipe the build renders. Add a file here to add a recipe. */
export const recipes: Recipe[] = [cookiePie, cheeseburger, cheesecake];

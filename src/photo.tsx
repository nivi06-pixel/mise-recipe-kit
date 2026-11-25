import { readFileSync } from "node:fs";
import { Image, Layer, Text } from "@hyper-elements/react";
import type { Photo, Recipe } from "./kitchen";

/** Where the site is published: GitHub Pages serves docs/, photos included. */
export const SITE = "https://nivi06-pixel.github.io/mise-recipe-kit/";

/** An image as Hyper Elements takes it: its source and its size in px. */
export interface PhotoAsset {
  src: string;
  width: number;
  height: number;
}

/**
 * A recipe's photo as an asset. "url" points at the published copy, for the web
 * page and the email, which a browser or mail client fetches. "inline" embeds
 * the file's bytes, for the PDF and the PNGs, which are drawn on this machine.
 */
export function photoAsset(photo: Photo, how: "url" | "inline" = "url"): PhotoAsset {
  const src =
    how === "url"
      ? `${SITE}photos/${photo.file}`
      : `data:image/jpeg;base64,${readFileSync(new URL(`../photos/${photo.file}`, import.meta.url)).toString("base64")}`;
  return { src, width: photo.width, height: photo.height };
}

/**
 * The dish's photo, filling a box of the given height: a Layer covers it with
 * the image, cut at its sides or top and bottom, and the credit sits over the
 * bottom-right corner.
 */
export function DishPhoto({
  recipe,
  src,
  height,
  radius = 20,
  creditSize = 12,
}: {
  recipe: Pick<Recipe, "title" | "photo">;
  src: PhotoAsset;
  height: number;
  radius?: number;
  creditSize?: number;
}) {
  return (
    <Layer style={{ height, borderRadius: radius, alignItems: "end", justifyItems: "end", backgroundColor: "#2B2118" }}>
      <Image src={src} alt={recipe.photo.alt} />
      <Text
        style={{
          fontSize: creditSize,
          color: "#FFFDF8",
          backgroundColor: "rgba(43, 33, 24, 0.7)",
          padding: [creditSize * 0.35, creditSize * 0.8],
          borderRadius: [radius * 0.6, 0, radius, 0],
        }}
      >
        Photo: {recipe.photo.credit} / Unsplash
      </Text>
    </Layer>
  );
}

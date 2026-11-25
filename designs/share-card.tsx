import { ShareCard } from "../src/share-card";
import { photoAsset } from "../src/photo";
import cookiePie from "../recipes/cookie-pie";

/**
 * The share image's pin format, with the template's example values: `npm run dev` previews it.
 * The image renderer draws offline, so the example's photo goes in as the file's bytes.
 */
export default () => <ShareCard format="pin" {...ShareCard.example} photo={photoAsset(cookiePie.photo, "inline")} />;

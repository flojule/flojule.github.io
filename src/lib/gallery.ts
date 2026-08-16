import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "../config";

// Photos are pre-optimized webp served straight from /public, so the list is
// read from disk at build time instead of being maintained by hand. Drop a
// file in (or delete one) and rebuild; nothing else has to be edited.
const GALLERY_DIR = "gallery";
const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const galleryPhotos: string[] = fs
  .readdirSync(path.join(process.cwd(), "public", GALLERY_DIR))
  .filter((file) => file.endsWith(".webp"))
  .sort()
  .map((file) => `${base}${GALLERY_DIR}/${file}`);

// A handful of photos are also linked by name from the About text. Deleting
// one of those would otherwise leave a link that opens an empty viewer, so the
// build fails loudly instead.
const linked = [...siteConfig.description.join(" ").matchAll(/['"]([^'"]*\/gallery\/[^'"]+)['"]/g)]
  .map((match) => match[1])
  .filter((src) => !galleryPhotos.includes(src));

if (linked.length > 0) {
  throw new Error(
    `About text links to missing gallery photos: ${linked.join(", ")}. ` +
      `Restore them in public/${GALLERY_DIR}/ or update src/config.ts.`,
  );
}

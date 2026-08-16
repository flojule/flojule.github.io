import type { APIRoute } from "astro";
import { galleryPhotos } from "../lib/gallery";

// The lightbox fetches this on first open, so the ~4 KB photo list is not
// inlined into every page of the site.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(galleryPhotos), {
    headers: { "Content-Type": "application/json" },
  });

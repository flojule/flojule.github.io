# CLAUDE.md

Personal portfolio (Florian Julé), GitHub Pages: <https://flojule.github.io>. Astro 7 static site, Tailwind CSS 4 + DaisyUI 5, MDX projects, LaTeX via `remark-math` + `rehype-katex` (MathML output, no KaTeX CSS/fonts; needs `@astrojs/markdown-remark` `unified()`).

## Commands

```bash
npm run dev      # localhost:4321
npm run build    # ./dist
npm run check    # astro check (type check)
```

## Content

- Schemas: [src/content.config.ts](src/content.config.ts). Drafts are excluded via `getCollection("projects", ({ data }) => !data.draft)`.
- Projects are `.md` or `.mdx` in `src/content/projects/<slug>/`. Import co-located images via Astro's image pipeline, not `/public/...`.
- Skills in frontmatter: reuse existing capitalization ("ROS 2", "C++", "Robotic Manipulation"); check existing entries first.
- Videos: `public/videos/projects/<slug>/<name>.webm` (VP9, see [video.ts](src/lib/video.ts)).
- Gallery photos: `public/gallery/*.webp`, max side 1800 px, quality 75, EXIF rotation baked in, lowercase-kebab names. Picked up automatically.
- Figures in MDX: `<figure class="mx-auto my-6 w-fit max-w-full">` + `<Image>` + `<figcaption>` (see [flowheely.mdx](src/content/projects/flowheely/flowheely.mdx)).
- Block diagrams: write `src/content/projects/<slug>/diagrams/<name>.mmd`, run `tools/render_diagrams.sh` (outputs `<name>-light.svg` + `<name>-dark.svg`). Include both in one figure, each `<Image>` wrapped in `<a data-photo-lightbox="diagram-<name>" data-photo-lightbox-natural data-theme-media="light|dark">`.

## Styling

Tailwind utilities, then DaisyUI components, then component-scoped `<style>`. Prefer DaisyUI semantic tokens (`primary`, `base-content`, `base-200`) over raw colors. MDX prose styles live in [ProjectLayout.astro](src/layouts/ProjectLayout.astro).

## Photo viewer

[PhotoLightbox.astro](src/components/PhotoLightbox.astro) is mounted once in `Layout.astro`.

| Opener | Playlist |
|---|---|
| `<a href="<src>" data-photo-lightbox="<group>">` | visible anchors with the same group, document order |
| `<button data-photo-gallery-open>` | all of `public/gallery/` (from [gallery.json.ts](src/pages/gallery.json.ts)), reshuffled per open |

- `data-photo-lightbox-natural`: natural size, scrollable, `bg-base-200` (diagrams).
- Photo and PDF viewers share [overlay.ts](src/lib/overlay.ts).

## Docs lookup

- Astro: `mcp__astro-docs__search_astro_docs`.
- DaisyUI: `mcp__context7__resolve-library-id`, then `mcp__context7__get-library-docs`.

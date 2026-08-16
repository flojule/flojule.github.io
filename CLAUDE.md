# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project overview

Personal portfolio for Florian Julé, deployed to GitHub Pages at <https://flojule.github.io>. Astro 5 static site with Tailwind CSS 4 + DaisyUI for styling, MDX for project pages, and KaTeX for math rendering.

## Development commands

```bash
npm install
npm run dev      # localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serve the production build locally
npm run astro -- <command>
npm run check    # type check (astro check)
```

## Architecture

### Stack

- **Astro 5.x**: static site generator, component islands.
- **Tailwind CSS 4.x**: integrated via the `@tailwindcss/vite` plugin.
- **DaisyUI 5.x**: loaded as a Tailwind plugin from `src/styles/global.css`.
- **MDX**: project pages with `remark-math` + `rehype-katex` for inline LaTeX.
- **TypeScript**: strict mode (`astro/tsconfigs/strict`).

### Project structure

```
src/
├── components/   # Reusable Astro components
│   └── icons/    # Shared inline SVG icon components (e.g. GithubIcon.astro)
├── content/      # Content collections (markdown / mdx)
│   ├── education/
│   └── projects/
├── layouts/      # Layout.astro, ProjectLayout.astro
├── lib/          # Framework-agnostic helpers (date.ts, video.ts, gallery.ts, overlay.ts)
├── pages/        # File-based routing
├── styles/       # global.css (Tailwind + DaisyUI)
├── config.ts        # Site config (name, title, description, social links)
└── content.config.ts  # Content collection schemas
public/
├── images/, videos/, gallery/   # Static media served by URL
├── *.svg, *.pdf                  # Favicon, resume, patent
```

### Content collections

Schemas live in [src/content.config.ts](src/content.config.ts):

- **`education`** (md only): title, subtitle, startDate, endDate?, link?, graduationLabel?
- **`projects`** (md + mdx): title, description, image, startDate, endDate?, skills, demoLink?, demoLabel?, sourceLink?, video?, draft?

Drafts are filtered out everywhere via `getCollection("projects", ({ data }) => !data.draft)`.

Project pages may be `.md` (simple body) or `.mdx` (custom components, math, video). Images are co-located with content and imported via Astro's image pipeline (`./image.webp`). The `video` field is a URL string pointing into `/public/videos/...`.

### Styling

- Use Tailwind utilities first, then DaisyUI components, and component-scoped `<style>` only for custom styling that doesn't fit either.
- DaisyUI semantic tokens (`primary`, `base-content`, `base-200`, etc.) are preferred over raw color classes for theme consistency.
- Layout-level styles are in [Layout.astro](src/layouts/Layout.astro); the prose-content styles for MDX are in [ProjectLayout.astro](src/layouts/ProjectLayout.astro).

### Photo viewer

[PhotoLightbox.astro](src/components/PhotoLightbox.astro) is rendered once by `Layout.astro`, so any page can open a photo. Two openers:

| Opener | Playlist |
|---|---|
| `<a href="<src>" data-photo-lightbox="<group>">` | every anchor sharing that group name, in document order |
| `<button data-photo-gallery-open>` | all of `public/gallery/`, reshuffled on each open |

A one-photo playlist hides the prev/next arrows. Clicking anything that is not the photo or a control closes the viewer. The gallery list comes from [gallery.json.ts](src/pages/gallery.json.ts) (built from `public/gallery/` by [gallery.ts](src/lib/gallery.ts)) and is fetched on first open.

Both full-screen overlays (photo viewer, PDF viewer) share the show/hide helpers in [overlay.ts](src/lib/overlay.ts).

### Layouts

- **`Layout.astro`**: base HTML, head/meta tags, header/footer, view transitions (`<ClientRouter />`).
- **`ProjectLayout.astro`**: wraps `Layout.astro` and renders the per-project header (title, dates, links, skills) + featured image/video, then `<slot />` for the body. Used by `pages/projects/[...slug].astro`.

### Pages

- `index.astro` — home: Projects grid.
- `about.astro` — full About page.
- `projects/index.astro` — projects index.
- `projects/[...slug].astro` — dynamic project routes from the `projects` collection.
- `404.astro`, `500.astro` — error pages.

## Conventions

- Project pages should import images via Astro's image pipeline rather than referencing `/public/...` so they get optimized.
- Videos go to `public/videos/projects/<slug>/<name>.webm` (VP9; see [video.ts](src/lib/video.ts)).
- Gallery photos are served straight from `public/gallery/*.webp` — pre-optimized to a max side of 1800 px at quality 75, EXIF rotation baked in, lowercase-kebab filenames. Add new ones already encoded that way; they are picked up automatically.
- New skills in project frontmatter should match existing capitalization (e.g. "ROS 2", "C++", "Robotic Manipulation"). Check existing entries before adding.
- When adding figures inside MDX, use the `<figure class="mx-auto my-6 w-fit max-w-full">` + `<Image>` + `<figcaption>` pattern from existing files (e.g. [flowheely.mdx](src/content/projects/flowheely/flowheely.mdx)).

## MCP tools for documentation

When working with framework specifics, prefer the MCP-served docs:

- **Astro**: `mcp__astro-docs__search_astro_docs` for routing, content collections, image API, etc.
- **DaisyUI**: `mcp__context7__resolve-library-id` then `mcp__context7__get-library-docs` for component APIs and theming.

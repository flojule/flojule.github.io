// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: "https://flojule.github.io",
  // The home page *is* the projects grid, so /projects is not a separate page.
  // Kept as a redirect so older links and /projects/<slug> parents still resolve.
  redirects: {
    "/projects": "/",
  },
  // Math renders as MathML, so no KaTeX CSS or fonts. Top level so .md pages get it too;
  // the MDX integration inherits this config (extendMarkdownConfig defaults to true).
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { output: "mathml" }]],
    }),
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});

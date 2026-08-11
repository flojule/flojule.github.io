// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
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
  // Declared at the top level so .md project pages get math too; the MDX
  // integration inherits this config (extendMarkdownConfig defaults to true).
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});

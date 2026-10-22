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
  // Old URLs: projects moved from /projects/<slug> to /<slug>; /about is the home page's side column.
  redirects: {
    "/projects": "/",
    "/projects/[slug]": "/[slug]",
    "/about": "/#about",
  },
  // Math renders as MathML, so no KaTeX CSS or fonts. Top level so .md pages get it too;
  // the MDX integration inherits this config (extendMarkdownConfig defaults to true).
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { output: "mathml" }]],
    }),
  },
  // Emitted as a <meta> CSP (GitHub Pages cannot set headers); Astro hashes its own inline scripts/styles.
  security: {
    csp: {
      algorithm: "SHA-384",
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://flojule.goatcounter.com",
        "media-src 'self'",
        "connect-src 'self' https://flojule.goatcounter.com",
        // 'self': Chromium checks the PDF <object> against frame-src.
        "frame-src 'self' https://www.youtube-nocookie.com",
        "object-src 'self'",
        "base-uri 'self'",
        "form-action 'none'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: {
        resources: ["'self'", "https://gc.zgo.at"],
      },
      styleDirective: {
        // Card/banner images set `object-position` through a style attribute.
        resources: ["'self'", { resource: "'unsafe-inline'", kind: "attribute" }],
      },
    },
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});

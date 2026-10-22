import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// One folder per project: src/content/<slug>/index.md(x), served at /<slug>.
const projects = defineCollection({
  loader: glob({ pattern: "*/index.{md,mdx}", base: "./src/content" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    imagePosition: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    skills: z.array(z.string()),
    demoLink: z.url().optional(),
    demoLabel: z.string().optional(),
    sourceLink: z.url().optional(),
    // Team size; 1 shows "Individual" on the card.
    team: z.number().int().positive().optional(),
    video: z.string().optional(),
    // Card thumbnails render at ~350x200 CSS px, so they get their own
    // downscaled encode instead of pulling the full-size `video`.
    cardVideo: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  projects,
};

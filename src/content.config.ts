import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    link: z.string().url().optional(),
    graduationLabel: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    imagePosition: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    skills: z.array(z.string()),
    demoLink: z.string().url().optional(),
    demoLabel: z.string().optional(),
    sourceLink: z.string().url().optional(),
    video: z.string().optional(),
    // Card thumbnails render at ~350x200 CSS px, so they get their own
    // downscaled encode instead of pulling the full-size `video`.
    cardVideo: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  education,
  projects,
};

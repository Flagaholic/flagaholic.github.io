import { defineCollection, z } from "astro:content";

const writeups = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    event: z.string(),
    category: z.string(),
    author: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    attachments: z.array(
      z.object({
        name: z.string(),
        href: z.string(),
        type: z.string(),
      })
    ).default([]),
  }),
});

export const collections = { writeups };

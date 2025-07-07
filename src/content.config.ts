// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    author: z.string().default("Anonymous"),
    language: z.enum(["en", "es", "ru", "ge"]),
    tags: z.array(z.string()),
    publishDate: z.string().transform((str) => new Date(str)),
    authorContact: z.string().email(),
    readTime: z.string().default("5 min"),
    excerpt: z.string().max(200),
    featured: z.boolean().default(false),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog };

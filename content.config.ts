import { defineCollection, defineContentConfig, property, z } from '@nuxt/content'

const shortText = z.string().min(1)
const longText = property(z.string().min(1)).editor({ input: 'textarea' })
const imagePath = property(z.string().min(1)).editor({ input: 'media' })
const slugText = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only')
const publicationDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use the date format YYYY-MM-DD')
const titleAndText = z.tuple([shortText, longText])
const seoEntry = z.tuple([shortText, longText])

const seoSchema = z.object({
  home: seoEntry,
  about: seoEntry,
  services: seoEntry,
  how: seoEntry,
  why: seoEntry,
  faq: seoEntry,
  blog: seoEntry,
  contact: seoEntry,
})

const homeSchema = z.object({
  eyebrow: shortText,
  title: shortText,
  lead: longText,
  trust: shortText,
  categories: z.array(titleAndText),
  introTitle: shortText,
  introText: longText,
  servicesTitle: shortText,
  whyTitle: shortText,
  whyText: longText,
  processTitle: shortText,
  process: z.array(z.tuple([shortText, shortText, longText])),
})

const aboutSchema = z.object({
  eyebrow: shortText,
  title: shortText,
  lead: longText,
  storyTitle: shortText,
  story: longText,
  values: z.array(titleAndText),
  networkTitle: shortText,
})

const servicesSchema = z.object({
  eyebrow: shortText,
  title: shortText,
  lead: longText,
  groups: z.array(z.tuple([shortText, z.array(shortText)])),
  disclaimerTitle: shortText,
  disclaimer: longText,
  partners: z.array(shortText),
})

const whySchema = z.object({
  eyebrow: shortText,
  title: shortText,
  lead: longText,
  reasons: z.array(titleAndText),
  sectorsTitle: shortText,
  sectors: z.array(shortText),
})

const faqSchema = z.object({
  eyebrow: shortText,
  title: shortText,
  lead: longText,
  items: z.array(titleAndText),
})

const siteSchema = z.object({
  locale: z.enum(['cs', 'hr', 'en']),
  seo: seoSchema,
  home: homeSchema,
  about: aboutSchema,
  how: z.object({
    eyebrow: shortText,
    title: shortText,
    lead: longText,
  }),
  services: servicesSchema,
  why: whySchema,
  faq: faqSchema,
  contact: z.object({
    eyebrow: shortText,
    title: shortText,
    lead: longText,
    hours: shortText,
    response: longText,
  }),
  blog: z.object({
    eyebrow: shortText,
    title: shortText,
    lead: longText,
  }),
})

const blogSchema = z.object({
  translationKey: shortText.optional(),
  slug: slugText.optional(),
  title: shortText,
  category: shortText.optional(),
  summary: longText.optional(),
  cover: imagePath.optional(),
  publishedAt: publicationDate.optional(),
  draft: z.boolean().default(true),
  seoTitle: shortText.optional(),
  seoDescription: longText.optional(),
  ctaText: longText.optional(),
})

const settingsSchema = z.object({
  companyName: shortText,
  publicEmail: z.string().email(),
  directEmail: z.string().email(),
  phone: z.string(),
  images: z.object({
    coast: imagePath,
    meeting: imagePath,
    property: imagePath,
    lifestyle: imagePath,
    tourism: imagePath,
    insurance: imagePath,
    partnership: imagePath,
    portrait: imagePath,
  }),
})

export default defineContentConfig({
  collections: {
    site: defineCollection({
      type: 'data',
      source: 'site/*.yml',
      schema: siteSchema,
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: blogSchema,
    }),
    settings: defineCollection({
      type: 'data',
      source: 'settings.yml',
      schema: settingsSchema,
    }),
  },
})

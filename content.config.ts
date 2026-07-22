import { defineCollection, defineContentConfig, property, z } from '@nuxt/content'

const shortText = z.string().trim().min(1).max(240)
const longText = z.string().trim().min(1).max(5_000)
const safeImagePath = z.string()
  .max(240)
  .regex(/^\/images\/[a-zA-Z0-9/_-]+\.(?:avif|jpe?g|png|webp)$/i, 'Odaberite JPG, PNG, WebP ili AVIF datoteku iz mape images')

const requiredText = (label: string, description?: string) => property(shortText).editor({ label, description })
const requiredArea = (label: string, description?: string) => property(longText).editor({ input: 'textarea', label, description })
const imageField = (label: string, description?: string) => property(safeImagePath).editor({ input: 'media', label, description })
const group = <T extends z.ZodTypeAny>(schema: T, label: string, description?: string) => property(schema).editor({ label, description })
const slugText = z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Koristite samo mala slova, brojeve i crtice')
const publicationDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Datum mora biti u formatu GGGG-MM-DD')

const optionalImagePath = property(z.union([safeImagePath, z.literal('')]).optional()).editor({
  input: 'media',
  label: 'Naslovna fotografija',
  description: 'Odaberite fotografiju koja će se prikazati na kartici i na vrhu članka.',
})
const optionalSlug = property(z.union([slugText, z.literal('')]).optional()).editor({
  label: 'Adresa članka (slug)',
  description: 'Primjer: kupnja-nekretnine. Koristite samo mala slova, brojeve i crtice.',
})
const optionalPublicationDate = property(z.union([publicationDate, z.literal('')]).optional()).editor({
  label: 'Datum objave',
  description: 'Upišite datum u formatu GGGG-MM-DD, primjerice 2026-07-22.',
})
const titleAndText = z.tuple([
  requiredText('Naslov'),
  requiredArea('Opis'),
])
const seoEntry = z.tuple([
  requiredText('SEO naslov', 'Naslov koji se prikazuje u rezultatima pretraživanja.'),
  requiredArea('SEO opis', 'Kratak opis stranice za Google i druge tražilice.'),
])

const seoSchema = z.object({
  home: group(seoEntry, 'Početna stranica'),
  about: group(seoEntry, 'O CROBIZ-u'),
  services: group(seoEntry, 'Usluge'),
  how: group(seoEntry, 'Kako radimo'),
  why: group(seoEntry, 'Zašto Hrvatska'),
  faq: group(seoEntry, 'Česta pitanja'),
  blog: group(seoEntry, 'Blog'),
  contact: group(seoEntry, 'Kontakt'),
})

const homeSchema = z.object({
  eyebrow: requiredText('Mali naslov iznad glavnog naslova'),
  title: requiredText('Glavni naslov'),
  lead: requiredArea('Uvodni tekst'),
  trust: requiredText('Poruka povjerenja'),
  categories: group(z.array(titleAndText), 'Glavne kategorije', 'Kartice koje se prikazuju ispod početnog dijela.'),
  introTitle: requiredText('Naslov odjeljka O CROBIZ-u'),
  introText: requiredArea('Tekst odjeljka O CROBIZ-u'),
  servicesTitle: requiredText('Naslov odjeljka Usluge'),
  whyTitle: requiredText('Naslov odjeljka Zašto Hrvatska'),
  whyText: requiredArea('Tekst odjeljka Zašto Hrvatska'),
  processTitle: requiredText('Naslov odjeljka Kako radimo'),
  process: group(z.array(z.tuple([
    requiredText('Broj koraka', 'Primjer: 01'),
    requiredText('Naslov koraka'),
    requiredArea('Opis koraka'),
  ])), 'Koraci suradnje'),
})

const aboutSchema = z.object({
  eyebrow: requiredText('Mali naslov iznad glavnog naslova'),
  title: requiredText('Glavni naslov'),
  lead: requiredArea('Uvodni tekst'),
  storyTitle: requiredText('Naslov priče'),
  story: requiredArea('Priča o CROBIZ-u'),
  values: group(z.array(titleAndText), 'Prednosti i vrijednosti'),
  networkTitle: requiredText('Naslov odjeljka Partneri'),
})

const servicesSchema = z.object({
  eyebrow: requiredText('Mali naslov iznad glavnog naslova'),
  title: requiredText('Glavni naslov'),
  lead: requiredArea('Uvodni tekst'),
  groups: group(z.array(z.tuple([
    requiredText('Naziv grupe usluga'),
    group(z.array(requiredText('Usluga')), 'Popis usluga'),
  ])), 'Grupe usluga'),
  disclaimerTitle: requiredText('Naslov važne napomene'),
  disclaimer: requiredArea('Tekst važne napomene'),
  partners: group(z.array(requiredText('Naziv partnera ili struke')), 'Mreža partnera'),
})

const whySchema = z.object({
  eyebrow: requiredText('Mali naslov iznad glavnog naslova'),
  title: requiredText('Glavni naslov'),
  lead: requiredArea('Uvodni tekst'),
  reasons: group(z.array(titleAndText), 'Razlozi za Hrvatsku'),
  sectorsTitle: requiredText('Naslov odjeljka Sektori'),
  sectors: group(z.array(requiredText('Naziv sektora')), 'Sektori'),
})

const faqSchema = z.object({
  eyebrow: requiredText('Mali naslov iznad glavnog naslova'),
  title: requiredText('Glavni naslov'),
  lead: requiredArea('Uvodni tekst'),
  items: group(z.array(z.tuple([
    requiredText('Pitanje'),
    requiredArea('Odgovor'),
  ])), 'Pitanja i odgovori'),
})

const siteSchema = z.object({
  locale: property(z.enum(['cs', 'hr', 'en', 'sk'])).editor({ hidden: true }),
  seo: group(seoSchema, 'SEO postavke', 'Naslovi i opisi koji se prikazuju u rezultatima pretraživanja.'),
  home: group(homeSchema, 'Početna stranica'),
  about: group(aboutSchema, 'O CROBIZ-u'),
  how: group(z.object({
    eyebrow: requiredText('Mali naslov iznad glavnog naslova'),
    title: requiredText('Glavni naslov'),
    lead: requiredArea('Uvodni tekst'),
  }), 'Kako radimo'),
  services: group(servicesSchema, 'Usluge'),
  why: group(whySchema, 'Zašto Hrvatska'),
  faq: group(faqSchema, 'Česta pitanja'),
  contact: group(z.object({
    eyebrow: requiredText('Mali naslov iznad glavnog naslova'),
    title: requiredText('Glavni naslov'),
    lead: requiredArea('Uvodni tekst'),
    hours: requiredText('Radno vrijeme'),
    response: requiredArea('Poruka o vremenu odgovora'),
  }), 'Kontakt'),
  blog: group(z.object({
    eyebrow: requiredText('Mali naslov iznad glavnog naslova'),
    title: requiredText('Glavni naslov'),
    lead: requiredArea('Uvodni tekst'),
  }), 'Blog stranica'),
})

const blogSchema = z.object({
  translationKey: property(slugText.optional()).editor({
    label: 'ID grupe prijevoda',
    description: 'Za prijevode istog članka upotrijebite potpuno isti ID u sva četiri jezika.',
  }),
  slug: optionalSlug,
  title: property(z.string().trim().min(1).max(160)).editor({
    label: 'Naslov članka',
    description: 'Glavni naslov koji će čitatelji vidjeti.',
  }),
  category: property(z.string().trim().min(1).max(80).optional()).editor({
    label: 'Kategorija',
    description: 'Kratka oznaka teme, primjerice Nekretnine ili Poslovanje.',
  }),
  summary: property(z.string().trim().min(1).max(600).optional()).editor({
    input: 'textarea',
    label: 'Kratki sažetak',
    description: 'Dvije ili tri rečenice koje se prikazuju na kartici članka.',
  }),
  cover: optionalImagePath,
  publishedAt: optionalPublicationDate,
  seoTitle: property(z.string().trim().min(1).max(100).optional()).editor({
    label: 'SEO naslov',
    description: 'Može biti jednak naslovu članka. Preporučena duljina je do približno 60 znakova.',
  }),
  seoDescription: property(z.string().trim().min(1).max(320).optional()).editor({
    input: 'textarea',
    label: 'SEO opis',
    description: 'Kratak opis za tražilice, idealno približno 140–160 znakova.',
  }),
  ctaText: property(z.string().trim().min(1).max(1_000).optional()).editor({
    input: 'textarea',
    label: 'Završna kontaktna poruka',
    description: 'Tekst poziva na kontakt koji se prikazuje na kraju članka.',
  }),
  published: property(z.boolean().optional()).editor({
    label: 'Objavi članak',
    description: 'Uključite tek kada su naslov, adresa, kategorija, sažetak, fotografija, datum i sadržaj spremni.',
  }),
  draft: property(z.boolean().optional()).editor({ hidden: true }),
})

const settingsSchema = z.object({
  companyName: requiredText('Naziv tvrtke'),
  publicEmail: property(z.string().email()).editor({ label: 'Javna e-mail adresa' }),
  directEmail: property(z.string().email()).editor({ label: 'Izravna e-mail adresa' }),
  phone: property(z.string().max(40).regex(/^[0-9+().\s-]*$/, 'Koristite samo brojke i telefonske znakove')).editor({ label: 'Telefon ili WhatsApp', description: 'Polje može ostati prazno.' }),
  images: group(z.object({
    coast: imageField('Hrvatska obala'),
    meeting: imageField('Poslovni sastanak'),
    property: imageField('Nekretnine'),
    lifestyle: imageField('Život u Hrvatskoj'),
    tourism: imageField('Turistički najam'),
    insurance: imageField('Osiguranje i administracija'),
    partnership: imageField('Češko-hrvatsko partnerstvo'),
    portrait: imageField('Portret Ivane Pisac'),
  }), 'Fotografije web-stranice', 'Ovdje možete zamijeniti fotografije bez mijenjanja dizajna stranice.'),
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

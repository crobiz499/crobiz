const SITE_URL = 'https://www.crobiz.cz'

const localeDetails = {
  cs: { language: 'cs-CZ', ogLocale: 'cs_CZ' },
  hr: { language: 'hr-HR', ogLocale: 'hr_HR' },
  en: { language: 'en-GB', ogLocale: 'en_GB' },
}

const resolveValue = (value) => typeof value === 'function' ? value() : unref(value)

const useSeoBase = (options) => {
  const { locale } = useI18n()
  const route = useRoute()
  const site = useSiteContent()
  const settings = useSiteSettings()
  const localePath = useLocalePath()

  const language = computed(() => localeDetails[locale.value]?.language || 'cs-CZ')
  const canonical = computed(() => `${SITE_URL}${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`)
  const title = computed(() => resolveValue(options.title) || 'CROBIZ')
  const description = computed(() => resolveValue(options.description) || site.value.home.lead)
  const pageType = computed(() => resolveValue(options.pageType) || 'WebPage')

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    author: 'CROBIZ',
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogType: () => resolveValue(options.ogType) || (pageType.value === 'Article' ? 'article' : 'website'),
    ogUrl: () => canonical.value,
    ogSiteName: 'CROBIZ',
    ogLocale: () => localeDetails[locale.value]?.ogLocale || 'cs_CZ',
    twitterCard: 'summary',
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
  })

  useHead(() => {
    const organization = {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: settings.value?.companyName || 'CROBIZ',
      url: SITE_URL,
      email: settings.value?.publicEmail || 'info@crobiz.cz',
      ...(settings.value?.phone ? { telephone: settings.value.phone } : {}),
      founder: { '@type': 'Person', name: 'Ivana Pisac' },
      areaServed: [
        { '@type': 'Country', name: 'Czechia' },
        { '@type': 'Country', name: 'Croatia' },
      ],
      knowsLanguage: ['cs', 'hr', 'en'],
      description: description.value,
    }
    const website = {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'CROBIZ',
      inLanguage: ['cs-CZ', 'hr-HR', 'en-GB'],
      publisher: { '@id': `${SITE_URL}/#organization` },
    }
    const webpage = {
      '@type': pageType.value,
      '@id': `${canonical.value}#webpage`,
      url: canonical.value,
      name: title.value,
      description: description.value,
      inLanguage: language.value,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
    }

    if (options.section === 'faq') {
      webpage.mainEntity = site.value.faq.items.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      }))
    }

    if (options.section === 'services') {
      webpage.mainEntity = {
        '@type': 'ItemList',
        itemListElement: site.value.services.groups.map(([name], index) => ({
          '@type': 'ListItem', position: index + 1, name,
        })),
      }
    }

    if (options.section === 'blog') {
      const posts = resolveValue(options.items) || []
      webpage.mainEntity = {
        '@type': 'ItemList',
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: post.title,
          url: `${SITE_URL}${localePath(`/blog/${post.slug}`)}`,
        })),
      }
    }

    const extraSchema = resolveValue(options.schema)
    const graph = [organization, website, webpage, ...(Array.isArray(extraSchema) ? extraSchema : extraSchema ? [extraSchema] : [])]

    return {
      htmlAttrs: { lang: language.value },
      meta: [
        { property: 'og:locale:alternate', content: 'cs_CZ' },
        { property: 'og:locale:alternate', content: 'hr_HR' },
        { property: 'og:locale:alternate', content: 'en_GB' },
      ].filter((item) => item.content !== localeDetails[locale.value]?.ogLocale),
      script: [{ key: 'crobiz-structured-data', type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }],
    }
  })
}

export const usePageSeo = (section, overrides = {}) => {
  const site = useSiteContent()
  const fallback = computed(() => site.value[section])
  const localized = computed(() => site.value.seo?.[section])

  useSeoBase({
    section,
    title: () => resolveValue(overrides.title) || localized.value?.[0] || fallback.value?.title,
    description: () => resolveValue(overrides.description) || localized.value?.[1] || fallback.value?.lead,
    pageType: overrides.pageType || (section === 'about' ? 'AboutPage' : section === 'contact' ? 'ContactPage' : section === 'faq' ? 'FAQPage' : section === 'blog' ? 'CollectionPage' : 'WebPage'),
    ogType: overrides.ogType,
    schema: overrides.schema,
    items: overrides.items,
  })
}

export const useCustomPageSeo = (options) => useSeoBase(options)

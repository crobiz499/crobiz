const SITE_URL = 'https://www.crobiz.cz'

const localeDetails = {
  cs: { language: 'cs-CZ', ogLocale: 'cs_CZ' },
  hr: { language: 'hr-HR', ogLocale: 'hr_HR' },
  en: { language: 'en-GB', ogLocale: 'en_GB' },
}

const seoCopy = {
  cs: {
    home: ['Podnikání, nemovitosti a život v Chorvatsku', 'CROBIZ pomáhá Čechům s podnikáním, koupí nemovitosti, administrativou a životem v Chorvatsku. Česky, osobně a s prověřenými partnery.'],
    about: ['Český partner v Chorvatsku', 'Poznejte CROBIZ a Ivanu Pisac. Propojujeme Česko s Chorvatskem, komunikujeme česky i chorvatsky a koordinujeme prověřené místní odborníky.'],
    services: ['Služby v Chorvatsku pro Čechy', 'Pomoc Čechům s podnikáním, nemovitostmi, administrativou, turismem, pojištěním a komunikací v Chorvatsku. Vše koordinuje CROBIZ.'],
    why: ['Proč investovat a žít v Chorvatsku', 'Zjistěte, proč Chorvatsko přitahuje české občany a investory: euro, členství v EU, stabilní trh, silný turismus a vysoká kvalita života.'],
    faq: ['Chorvatsko pro Čechy: časté otázky', 'Odpovědi na časté otázky Čechů o koupi nemovitosti, založení firmy, dokumentech, vyřízení na dálku a životě v Chorvatsku.'],
    blog: ['Chorvatsko: nemovitosti, podnikání a život', 'Praktické články pro Čechy o koupi nemovitosti, podnikání, administrativě, turismu, pojištění a každodenním životě v Chorvatsku.'],
    contact: ['Konzultace pro vaše plány v Chorvatsku', 'Kontaktujte CROBIZ v češtině nebo chorvatštině. Probereme váš plán v Chorvatsku a navrhneme jasný další krok a vhodné odborníky.'],
  },
  hr: {
    home: ['Poslovanje, nekretnine i život u Hrvatskoj', 'CROBIZ pomaže češkim građanima s poslovanjem, kupnjom nekretnina, administracijom i životom u Hrvatskoj uz provjerene lokalne partnere.'],
    about: ['Partner između Češke i Hrvatske', 'Upoznajte CROBIZ i Ivanu Pisac. Povezujemo Češku i Hrvatsku, komuniciramo na oba jezika i koordiniramo mrežu provjerenih stručnjaka.'],
    services: ['Usluge u Hrvatskoj za češke klijente', 'Podrška češkim građanima pri poslovanju, kupnji nekretnina, administraciji, turizmu, osiguranju i komunikaciji u Hrvatskoj.'],
    why: ['Zašto ulagati i živjeti u Hrvatskoj', 'Saznajte zašto Hrvatska privlači češke građane i ulagače: euro, članstvo u EU, stabilno tržište, razvijen turizam i visoka kvaliteta života.'],
    faq: ['Hrvatska za češke građane: česta pitanja', 'Odgovori o kupnji nekretnine, osnivanju tvrtke, dokumentaciji, postupcima na daljinu i životu čeških građana u Hrvatskoj.'],
    blog: ['Hrvatska: nekretnine, poslovanje i život', 'Praktični članci o kupnji nekretnina, poslovanju, administraciji, turizmu, osiguranju i životu čeških građana u Hrvatskoj.'],
    contact: ['Konzultacije za vaše planove u Hrvatskoj', 'Kontaktirajte CROBIZ na hrvatskom ili češkom jeziku. Razmotrit ćemo vaš plan u Hrvatskoj i predložiti jasan sljedeći korak.'],
  },
  en: {
    home: ['Business, property and life in Croatia', 'CROBIZ helps Czech citizens with business, property purchases, administration and life in Croatia through clear guidance and trusted local partners.'],
    about: ['Your Czech–Croatian partner', 'Meet CROBIZ and Ivana Pisac. We bridge Czechia and Croatia, communicate in both languages and coordinate a trusted professional network.'],
    services: ['Croatia services for Czech clients', 'Support with business, property, administration, tourism, insurance and communication for Czech citizens planning a move or investment in Croatia.'],
    why: ['Why invest and live in Croatia', 'Explore why Croatia appeals to Czech citizens and investors: the euro, EU membership, a stable market, developed tourism and quality of life.'],
    faq: ['Croatia for Czech citizens: FAQs', 'Answers about buying property, starting a company, documentation, remote procedures and everyday life for Czech citizens in Croatia.'],
    blog: ['Croatia: property, business and living guides', 'Practical guides to property, business, administration, tourism, insurance and everyday life in Croatia for Czech citizens and investors.'],
    contact: ['Consultation for your plans in Croatia', 'Contact CROBIZ in Czech, Croatian or English. We will review your plans in Croatia and suggest a clear next step and suitable specialists.'],
  },
}

const resolveValue = (value) => typeof value === 'function' ? value() : unref(value)

const useSeoBase = (options) => {
  const { locale } = useI18n()
  const route = useRoute()
  const site = useSiteContent()
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
      name: 'CROBIZ',
      url: SITE_URL,
      email: 'info@crobiz.cz',
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
      webpage.mainEntity = {
        '@type': 'ItemList',
        itemListElement: site.value.blog.posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: post[1],
          url: `${SITE_URL}${localePath(`/blog/${post[0]}`)}`,
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
  const { locale } = useI18n()
  const site = useSiteContent()
  const fallback = computed(() => site.value[section])
  const localized = computed(() => seoCopy[locale.value]?.[section])

  useSeoBase({
    section,
    title: () => resolveValue(overrides.title) || localized.value?.[0] || fallback.value?.title,
    description: () => resolveValue(overrides.description) || localized.value?.[1] || fallback.value?.lead,
    pageType: overrides.pageType || (section === 'about' ? 'AboutPage' : section === 'contact' ? 'ContactPage' : section === 'faq' ? 'FAQPage' : section === 'blog' ? 'CollectionPage' : 'WebPage'),
    ogType: overrides.ogType,
    schema: overrides.schema,
  })
}

export const useCustomPageSeo = (options) => useSeoBase(options)

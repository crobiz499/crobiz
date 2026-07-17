export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=UTF-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  const base = 'https://www.crobiz.cz'
  const pages = ['', 'about', 'services', 'how-we-work', 'why-croatia', 'faq', 'blog', 'contact', 'privacy', 'cookies']
  const posts = [
    { cs: 'koupe-nemovitosti', hr: 'kupnja-nekretnine', en: 'buying-property' },
    { cs: 'zalozeni-firmy', hr: 'osnivanje-tvrtke', en: 'starting-company' },
    { cs: 'zivot-v-chorvatsku', hr: 'zivot-u-hrvatskoj', en: 'living-croatia' },
    { cs: 'turisticky-pronajem', hr: 'turisticki-najam', en: 'tourism-rental' },
    { cs: 'pojisteni', hr: 'osiguranja', en: 'insurance-croatia' },
    { cs: 'cesko-chorvatsko', hr: 'ceska-hrvatska', en: 'czech-croatian-business' },
  ]
  const localize = (locale, path) => `${base}${locale === 'cs' ? '' : `/${locale}`}${path ? `/${path}` : ''}`
  const groups = [
    ...pages.map((path) => ({ cs: localize('cs', path), hr: localize('hr', path), en: localize('en', path) })),
    ...posts.map((post) => ({
      cs: localize('cs', `blog/${post.cs}`),
      hr: localize('hr', `blog/${post.hr}`),
      en: localize('en', `blog/${post.en}`),
    })),
  ]
  const alternates = (group) => [
    ['x-default', group.cs], ['cs', group.cs], ['cs-CZ', group.cs],
    ['hr', group.hr], ['hr-HR', group.hr],
    ['en', group.en], ['en-GB', group.en],
  ].map(([language, href]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${href}" />`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${groups.flatMap((group) => ['cs', 'hr', 'en'].map((locale) => `  <url>
    <loc>${group[locale]}</loc>
${alternates(group)}
  </url>`)).join('\n')}
</urlset>`
})

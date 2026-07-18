export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'application/xml; charset=UTF-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  const base = 'https://www.crobiz.cz'
  const pages = ['', 'about', 'services', 'how-we-work', 'why-croatia', 'faq', 'blog', 'contact', 'privacy', 'cookies']
  const articles = await queryCollection(event, 'blog')
    .select('id', 'path', 'translationKey', 'slug', 'published', 'draft')
    .all()

  const localize = (locale, path) => `${base}${locale === 'cs' ? '' : `/${locale}`}${path ? `/${path}` : ''}`
  const articleGroups = Object.values(
    articles
      .filter((article) => {
        return article.published === true
          || (article.published == null && article.draft === false)
      })
      .reduce((groups, article) => {
      const articleLocale = String(article.path || article.id).match(/\/(cs|hr|en)\//)?.[1]
      const articleSlug = article.slug || String(article.path || '').split('/').pop()
      groups[article.translationKey] ||= {}
      groups[article.translationKey][articleLocale] = articleSlug
      return groups
      }, {}),
  )
    .filter((group) => group.cs && group.hr && group.en)
    .map((group) => ({
      cs: localize('cs', `blog/${group.cs}`),
      hr: localize('hr', `blog/${group.hr}`),
      en: localize('en', `blog/${group.en}`),
    }))

  const groups = [
    ...pages.map((path) => ({
      cs: localize('cs', path),
      hr: localize('hr', path),
      en: localize('en', path),
    })),
    ...articleGroups,
  ]

  const alternates = (group) => [
    ['x-default', group.cs],
    ['cs', group.cs],
    ['cs-CZ', group.cs],
    ['hr', group.hr],
    ['hr-HR', group.hr],
    ['en', group.en],
    ['en-GB', group.en],
  ]
    .map(([language, href]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${href}" />`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${groups.flatMap((group) => ['cs', 'hr', 'en'].map((locale) => `  <url>
    <loc>${group[locale]}</loc>
${alternates(group)}
  </url>`)).join('\n')}
</urlset>`
})

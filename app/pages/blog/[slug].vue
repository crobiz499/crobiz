<script setup>
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const setI18nParams = useSetI18nParams()

const articleQueryKey = computed(() => `crobiz-article-${locale.value}-${route.params.slug}`)
const { data: post } = await useAsyncData(articleQueryKey, () => {
  let query = queryCollection('blog')
  if (!import.meta.dev) query = query.where('draft', '=', false)

  return query.all().then((documents) => documents.find((document) => {
    const folderLocale = String(document.path || document.id).match(/\/(cs|hr|en)\//)?.[1]
    return folderLocale === locale.value
      && document.slug === String(route.params.slug)
  }))
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const translationQueryKey = computed(() => `crobiz-article-translations-${post.value.translationKey}`)
const { data: translations } = await useAsyncData(translationQueryKey, () => {
  return queryCollection('blog')
    .where('translationKey', '=', post.value.translationKey)
    .where('draft', '=', false)
    .select('id', 'path', 'slug')
    .all()
})

setI18nParams(
  Object.fromEntries((translations.value || []).map((translation) => [
    String(translation.path || translation.id).match(/\/(cs|hr|en)\//)?.[1],
    { slug: translation.slug },
  ])),
)

const formattedDate = computed(() => {
  const language = locale.value === 'cs' ? 'cs-CZ' : locale.value === 'hr' ? 'hr-HR' : 'en-GB'
  return new Intl.DateTimeFormat(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${post.value.publishedAt}T12:00:00`))
})

useCustomPageSeo({
  section: 'article',
  title: () => post.value.seoTitle || post.value.title,
  description: () => post.value.seoDescription || post.value.summary,
  pageType: 'Article',
  ogType: 'article',
  schema: () => ({
    '@type': 'Article',
    '@id': `https://www.crobiz.cz${route.path}#article`,
    headline: post.value.title,
    description: post.value.summary,
    image: `https://www.crobiz.cz${post.value.cover}`,
    datePublished: post.value.publishedAt,
    inLanguage: locale.value === 'cs' ? 'cs-CZ' : locale.value === 'hr' ? 'hr-HR' : 'en-GB',
    mainEntityOfPage: { '@id': `https://www.crobiz.cz${route.path}#webpage` },
    author: { '@id': 'https://www.crobiz.cz/#organization' },
    publisher: { '@id': 'https://www.crobiz.cz/#organization' },
  }),
})
</script>

<template>
  <article>
    <section class="section surface-sand">
      <div class="container article-shell">
        <p class="eyebrow">{{ post.category }}</p>
        <h1 class="page-title">{{ post.title }}</h1>
        <p class="page-lead">{{ post.summary }}</p>
        <p class="article-date">
          <time :datetime="post.publishedAt">{{ formattedDate }}</time>
        </p>
        <div class="article-hero-image">
          <ImagePlaceholder :label="post.category" :src="post.cover" tall eager />
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container article-shell article-content">
        <ContentRenderer :value="post" />
        <aside class="notice">
          <strong>i</strong>
          <div>
            <h2>CROBIZ</h2>
            <p>{{ post.ctaText }}</p>
          </div>
        </aside>
        <div class="button-row">
          <NuxtLink class="button button--primary" :to="localePath('/contact')">
            {{ t('actions.consultation') }}
          </NuxtLink>
          <NuxtLink class="button button--outline" :to="localePath('/blog')">
            {{ t('actions.allPosts') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </article>
</template>

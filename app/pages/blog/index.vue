<script setup>
const site = useSiteContent()
const { locale } = useI18n()
const route = useRoute()
const postsPerPage = 9

const { data: blogDocuments } = await useAsyncData('crobiz-blog-index', () => {
  return queryCollection('blog')
    .select('id', 'path', 'translationKey', 'slug', 'title', 'category', 'summary', 'cover', 'publishedAt', 'published', 'draft')
    .order('publishedAt', 'DESC')
    .all()
})

const posts = computed(() => {
  return (blogDocuments.value || [])
    .map((post) => ({
      ...post,
      slug: post.slug || String(post.path || '').split('/').pop(),
    }))
    .filter((post) => {
      const folderLocale = String(post.path || post.id).match(/\/(cs|hr|en)\//)?.[1]
      return folderLocale === locale.value
        && (post.published === true || (post.published == null && post.draft === false))
        && post.slug
        && post.summary
    })
})

const totalPages = computed(() => Math.max(1, Math.ceil(posts.value.length / postsPerPage)))
const currentPage = computed(() => {
  const requestedPage = Number.parseInt(String(route.query.page || '1'), 10)
  if (!Number.isFinite(requestedPage) || requestedPage < 1) return 1
  return Math.min(requestedPage, totalPages.value)
})
const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  return posts.value.slice(start, start + postsPerPage)
})
const paginationText = computed(() => ({
  cs: { label: 'Stránkování blogu', previous: 'Předchozí', next: 'Další' },
  hr: { label: 'Stranice bloga', previous: 'Prethodna', next: 'Sljedeća' },
  en: { label: 'Blog pagination', previous: 'Previous', next: 'Next' },
})[locale.value] || { label: 'Blog pagination', previous: 'Previous', next: 'Next' })
const pageLink = (page) => {
  const query = { ...route.query }
  if (page === 1) delete query.page
  else query.page = String(page)
  return { path: route.path, query }
}

usePageSeo('blog', { items: posts })
</script>

<template>
  <div>
    <PageHero :eyebrow="site.blog.eyebrow" :title="site.blog.title" :lead="site.blog.lead" />
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="blog-grid">
          <BlogCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
        </div>
        <nav v-if="totalPages > 1" class="blog-pagination" :aria-label="paginationText.label">
          <NuxtLink
            v-if="currentPage > 1"
            class="blog-pagination__direction"
            :to="pageLink(currentPage - 1)"
            rel="prev"
          >
            ‹ {{ paginationText.previous }}
          </NuxtLink>
          <span v-else class="blog-pagination__direction blog-pagination__direction--disabled" aria-hidden="true">
            ‹ {{ paginationText.previous }}
          </span>

          <div class="blog-pagination__pages">
            <NuxtLink
              v-for="page in pageNumbers"
              :key="page"
              class="blog-pagination__page"
              :class="{ 'blog-pagination__page--active': page === currentPage }"
              :to="pageLink(page)"
              :aria-current="page === currentPage ? 'page' : undefined"
              :aria-label="`${paginationText.label}: ${page}`"
            >
              {{ page }}
            </NuxtLink>
          </div>

          <NuxtLink
            v-if="currentPage < totalPages"
            class="blog-pagination__direction"
            :to="pageLink(currentPage + 1)"
            rel="next"
          >
            {{ paginationText.next }} ›
          </NuxtLink>
          <span v-else class="blog-pagination__direction blog-pagination__direction--disabled" aria-hidden="true">
            {{ paginationText.next }} ›
          </span>
        </nav>
      </div>
    </section>
  </div>
</template>

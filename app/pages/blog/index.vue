<script setup>
const site = useSiteContent()
const { locale } = useI18n()

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

usePageSeo('blog', { items: posts })
</script>

<template>
  <div>
    <PageHero :eyebrow="site.blog.eyebrow" :title="site.blog.title" :lead="site.blog.lead" />
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="blog-grid">
          <BlogCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
    </section>
  </div>
</template>

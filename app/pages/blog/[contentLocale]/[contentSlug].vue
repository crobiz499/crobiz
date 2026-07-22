<script setup>
const route = useRoute()
const contentLocale = String(route.params.contentLocale)
const contentSlug = String(route.params.contentSlug)

if (!['cs', 'sk', 'hr', 'en'].includes(contentLocale)) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const { data: previewDocument } = await useAsyncData(
  `crobiz-studio-preview-${contentLocale}-${contentSlug}`,
  () => queryCollection('blog').all().then((documents) => documents.find((document) => {
    return document.path === `/blog/${contentLocale}/${contentSlug}`
  })),
)

if (!previewDocument.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const articleLocale = contentLocale
const articleSlug = previewDocument.value.slug || contentSlug
const localizedPrefix = articleLocale === 'cs' ? '' : `/${articleLocale}`

await navigateTo(`${localizedPrefix}/blog/${articleSlug}`, {
  redirectCode: 302,
  replace: true,
})
</script>

<template>
  <div />
</template>

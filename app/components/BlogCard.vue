<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const formattedDate = computed(() => {
  if (!props.post.publishedAt) return ''
  const language = locale.value === 'cs' ? 'cs-CZ' : locale.value === 'hr' ? 'hr-HR' : 'en-GB'
  return new Intl.DateTimeFormat(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${props.post.publishedAt}T12:00:00`))
})
</script>

<template>
  <article class="blog-card">
    <ImagePlaceholder :label="post.category" :src="post.cover" />
    <div class="blog-card__body">
      <div class="blog-meta">
        <span>{{ post.category }}</span>
      <time v-if="post.publishedAt" :datetime="post.publishedAt">{{ formattedDate }}</time>
      </div>
      <h2>{{ post.title }}</h2>
      <p>{{ post.summary }}</p>
      <NuxtLink class="text-link" :to="localePath(`/blog/${post.slug}`)">
        {{ t('actions.read') }} <span>→</span>
      </NuxtLink>
    </div>
  </article>
</template>

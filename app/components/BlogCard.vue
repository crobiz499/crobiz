<script setup>
defineProps({ post:Array, index:Number })
const { t } = useI18n()
const localePath = useLocalePath()
const images = useSiteImages()
</script>
<template><article class="blog-card"><ImagePlaceholder :label="post[2]" :src="images.blog[index]"/><div class="blog-card__body"><div class="blog-meta"><span>{{ post[2] }}</span><span>0{{ index + 1 }}</span></div><h2>{{ post[1] }}</h2><p>{{ post[3] }}</p><NuxtLink class="text-link" :to="localePath(`/blog/${post[0]}`)">{{ t('actions.read') }} <span>→</span></NuxtLink></div></article></template>

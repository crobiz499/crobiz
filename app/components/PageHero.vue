<script setup>
defineProps({ eyebrow:String, title:String, lead:String, image:String, imageSrc:String, portrait:Boolean })
</script>

<template>
  <section class="page-hero section" :class="{ 'page-hero--text': !image }">
    <div class="container page-hero__grid">
      <div><p class="eyebrow">{{ eyebrow }}</p><h1 class="page-title">{{ title }}</h1><p class="page-lead">{{ lead }}</p><slot /></div>
      <ImagePlaceholder v-if="image" :label="image" :src="imageSrc" :portrait="portrait" tall eager />
    </div>
  </section>
</template>

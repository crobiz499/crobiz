<script setup>
const props = defineProps({ label: { type:String, default:'' }, src:String, portrait:Boolean, tall:Boolean, eager:Boolean })
const image = useImage()
const mobileSrc = computed(() => props.src
  ? image(props.src, { width:640, quality:68, format:'webp' })
  : '')
</script>

<template>
  <div
    class="image-placeholder"
    :class="{ 'image-placeholder--portrait':portrait, 'image-placeholder--tall':tall, 'image-placeholder--filled':src }"
    :role="src ? undefined : 'img'"
    :aria-label="src ? undefined : label"
  >
    <picture v-if="src">
      <source media="(max-width: 620px)" :srcset="mobileSrc">
      <NuxtImg
        class="image-placeholder__image"
        :src="src"
        :alt="label"
        :width="portrait ? 720 : 1280"
        :height="portrait ? 900 : 853"
        sizes="xs:100vw sm:100vw md:100vw lg:50vw xl:620px"
        format="webp"
        quality="68"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
      />
    </picture>
    <template v-else>
      <div class="image-placeholder__horizon" />
      <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="7" width="38" height="34" rx="5"/><circle cx="17" cy="18" r="4"/><path d="m9 35 10-10 7 7 5-5 8 8"/></svg>
      <span>{{ label }}</span>
    </template>
  </div>
</template>

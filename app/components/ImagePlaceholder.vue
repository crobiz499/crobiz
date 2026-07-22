<script setup>
defineProps({ label: { type:String, default:'' }, src:String, portrait:Boolean, tall:Boolean, eager:Boolean })
</script>

<template>
  <div class="image-placeholder" :class="{ 'image-placeholder--portrait':portrait, 'image-placeholder--tall':tall, 'image-placeholder--filled':src }" role="img" :aria-label="label">
    <NuxtImg v-if="src" class="image-placeholder__image" :src="src" :alt="label" :width="portrait ? 1024 : 1536" :height="portrait ? 1280 : 1024" format="webp" quality="84" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : 'auto'" />
    <template v-else>
      <div class="image-placeholder__horizon" />
      <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="7" width="38" height="34" rx="5"/><circle cx="17" cy="18" r="4"/><path d="m9 35 10-10 7 7 5-5 8 8"/></svg>
      <span>{{ label }}</span>
    </template>
  </div>
</template>

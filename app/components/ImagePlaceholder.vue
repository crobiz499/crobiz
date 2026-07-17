<script setup>
defineProps({ label: { type:String, default:'' }, portrait:Boolean, tall:Boolean })
</script>

<template>
  <div class="image-placeholder" :class="{ 'image-placeholder--portrait':portrait, 'image-placeholder--tall':tall }" role="img" :aria-label="label">
    <div class="image-placeholder__horizon" />
    <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="7" width="38" height="34" rx="5"/><circle cx="17" cy="18" r="4"/><path d="m9 35 10-10 7 7 5-5 8 8"/></svg>
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({ light: Boolean, compact: Boolean })
</script>

<template>
  <span class="brand" :class="{ 'brand--light': light, 'brand--compact': compact }">
    <NuxtImg
      src="/images/crobiz-logo-transparent.png"
      alt="CroBiz — Your trusted partner in Croatia"
      :width="compact ? 180 : 260"
      :height="compact ? 55 : 80"
      :sizes="compact ? '140px sm:180px' : '220px sm:260px'"
      densities="1x 2x"
      format="webp"
      quality="100"
      :loading="compact ? 'eager' : 'lazy'"
      :fetchpriority="compact ? 'high' : 'low'"
      decoding="async"
    />
  </span>
</template>

<style scoped>
.brand { display:inline-flex; align-items:center; }
.brand img { width:260px; height:auto; display:block; }
.brand--compact img { width:180px; height:auto; max-width:none; }
@media (max-width:620px){ .brand--compact img{width:140px;height:auto;max-width:none} }
</style>

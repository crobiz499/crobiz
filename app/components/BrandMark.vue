<script setup>
defineProps({ light: Boolean, compact: Boolean })
</script>

<template>
  <span class="brand" :class="{ 'brand--light': light, 'brand--compact': compact }">
    <img src="/images/crobiz-logo-transparent.png" alt="CroBiz — Your trusted partner in Croatia">
  </span>
</template>

<style scoped>
.brand { display:inline-flex; align-items:center; }
.brand img { width:260px; height:auto; display:block; }
.brand--compact img { width:180px; height:auto; max-width:none; }
@media (max-width:620px){ .brand--compact img{width:140px;height:auto;max-width:none} }
</style>

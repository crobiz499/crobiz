<script setup>
defineProps({ eyebrow:String, title:String, text:String, centered:Boolean })
</script>
<template><header class="section-heading" :class="{ 'section-heading--centered':centered }"><p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p><h2 class="section-title">{{ title }}</h2><p v-if="text" class="section-copy">{{ text }}</p></header></template>

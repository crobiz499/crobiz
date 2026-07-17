<script setup>
const site = useSiteContent(); const { t } = useI18n(); const localePath = useLocalePath(); usePageSeo('faq')
</script>
<template><div><PageHero :eyebrow="site.faq.eyebrow" :title="site.faq.title" :lead="site.faq.lead"/><section class="section" style="padding-top:20px"><div class="container"><div class="faq-list"><details v-for="item in site.faq.items" :key="item[0]" class="faq-item"><summary>{{ item[0] }}<span>+</span></summary><p>{{ item[1] }}</p></details></div></div></section><section class="section section--compact surface-navy cta-band"><div class="container cta-inner"><h2>{{ site.contact.title }}</h2><NuxtLink class="button button--light" :to="localePath('/contact')">{{ t('actions.contact') }}</NuxtLink></div></section></div></template>

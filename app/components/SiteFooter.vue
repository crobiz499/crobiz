<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const { openSettings } = useConsent()
const nav = [['home','/'],['about','/about'],['services','/services'],['how','/how-we-work'],['blog','/blog'],['faq','/faq'],['contact','/contact']]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main container">
      <div class="footer-intro"><BrandMark light /><p>{{ t('footer.tagline') }}</p><span class="footer-location">{{ t('footer.location') }}</span></div>
      <div class="footer-column"><h2>{{ t('footer.navigation') }}</h2><NuxtLink v-for="item in nav.slice(0,4)" :key="item[0]" :to="localePath(item[1])">{{ t(`nav.${item[0]}`) }}</NuxtLink></div>
      <div class="footer-column"><h2>{{ t('footer.services') }}</h2><NuxtLink v-for="item in nav.slice(4)" :key="item[0]" :to="localePath(item[1])">{{ t(`nav.${item[0]}`) }}</NuxtLink><NuxtLink :to="localePath('/why-croatia')">{{ t('nav.why') }}</NuxtLink></div>
      <div class="footer-column"><h2>{{ t('footer.contact') }}</h2><a href="mailto:info@crobiz.cz">info@crobiz.cz</a><a href="mailto:ivana.pisac@crobiz.info">ivana.pisac@crobiz.info</a><span>WhatsApp · {{ t('nav.contact') }}</span></div>
    </div>
    <div class="footer-bottom container"><span>© {{ new Date().getFullYear() }} CROBIZ. {{ t('footer.rights') }}</span><div><NuxtLink :to="localePath('/privacy')">{{ t('footer.privacy') }}</NuxtLink><NuxtLink :to="localePath('/cookies')">{{ t('footer.cookies') }}</NuxtLink><button class="footer-consent-button" type="button" @click="openSettings">{{ t('footer.cookieSettings') }}</button></div></div>
  </footer>
</template>

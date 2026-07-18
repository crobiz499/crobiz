<script setup>
const { locale } = useI18n()
const localeHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: localeHead.value.link,
  meta: localeHead.value.meta,
}))
</script>

<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <main id="main-content">
      <NuxtPage />
    </main>
    <SiteFooter />
    <CookieBanner />
    <StudioMobileExit />
  </div>
</template>

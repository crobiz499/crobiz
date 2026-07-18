<script setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const mobileOpen = ref(false)
const languageOpen = ref(false)
const languagePicker = ref(null)
const scrolled = ref(false)

const languageOptions = [
  { code:'hr', name:'Hrvatski' },
  { code:'en', name:'English' },
  { code:'cs', name:'Čeština' },
]
const activeLanguage = computed(() => languageOptions.find((item) => item.code === locale.value) || languageOptions[0])

const nav = computed(() => [
  ['home', '/'], ['about', '/about'], ['services', '/services'], ['why', '/why-croatia'],
  ['blog', '/blog'], ['faq', '/faq'], ['contact', '/contact'],
])

const close = () => { mobileOpen.value = false; languageOpen.value = false }
const changeLanguage = async (code) => {
  languageOpen.value = false
  const path = switchLocalePath(code)
  if (path) await navigateTo(path)
}
const onScroll = () => { scrolled.value = window.scrollY > 16 }
const onKey = (event) => { if (event.key === 'Escape') close() }
const onPointerDown = (event) => {
  if (languageOpen.value && !languagePicker.value?.contains(event.target)) languageOpen.value = false
}

watch(() => route.fullPath, close)
watch(mobileOpen, (open) => { if (import.meta.client) document.body.classList.toggle('menu-open', open) })
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive:true }); window.addEventListener('keydown', onKey); window.addEventListener('pointerdown', onPointerDown) })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onPointerDown); document.body.classList.remove('menu-open') })
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'menu-is-open': mobileOpen }">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <nav class="header-inner container" :aria-label="t('nav.home')">
      <NuxtLink class="header-brand" :to="localePath('/')" :aria-label="`CROBIZ · ${t('nav.home')}`"><BrandMark compact /></NuxtLink>
      <div class="desktop-nav">
        <NuxtLink v-for="item in nav" :key="item[0]" :to="localePath(item[1])">{{ t(`nav.${item[0]}`) }}</NuxtLink>
      </div>
      <div class="header-actions">
        <div ref="languagePicker" class="language-picker">
          <button class="language-picker__trigger" type="button" :aria-label="`${t('common.language')}: ${activeLanguage.name}`" :aria-expanded="languageOpen" aria-controls="language-menu" @click="languageOpen = !languageOpen">
            <LanguageFlag :code="activeLanguage.code"/>
            <svg class="language-picker__chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg>
          </button>
          <Transition name="language-menu">
            <div v-if="languageOpen" id="language-menu" class="language-menu" role="menu">
              <button v-for="item in languageOptions" :key="item.code" type="button" role="menuitem" :class="{ 'is-active':item.code === locale }" @click="changeLanguage(item.code)">
                <LanguageFlag :code="item.code"/><span>{{ item.name }}</span><span class="language-menu__check">{{ item.code === locale ? '✓' : '' }}</span>
              </button>
            </div>
          </Transition>
        </div>
        <NuxtLink class="header-cta" :to="localePath('/contact')">{{ t('actions.consultation') }}</NuxtLink>
        <button class="menu-button" type="button" :aria-expanded="mobileOpen" aria-controls="mobile-menu" :aria-label="mobileOpen ? t('common.close') : t('common.menu')" @click="mobileOpen = !mobileOpen">
          <span :class="{ open:mobileOpen }"><i/><i/><i/></span>
        </button>
      </div>
    </nav>
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" id="mobile-menu" class="mobile-panel">
        <nav class="mobile-nav container">
          <NuxtLink v-for="item in nav" :key="item[0]" :to="localePath(item[1])"><span>{{ t(`nav.${item[0]}`) }}</span><span>→</span></NuxtLink>
          <NuxtLink class="button button--primary" :to="localePath('/contact')">{{ t('actions.consultation') }}</NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

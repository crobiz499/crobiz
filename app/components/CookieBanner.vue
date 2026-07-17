<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const { consent, bannerOpen, settingsOpen, init, save, acceptAll, rejectOptional, openSettings, closeSettings } = useConsent()
const analyticsDraft = ref(false)

watch(settingsOpen, (open) => {
  if (open) analyticsDraft.value = consent.value?.categories?.analytics === true
})

const savePreferences = () => save({ analytics:analyticsDraft.value })
const onKeydown = (event) => { if (event.key === 'Escape' && settingsOpen.value) closeSettings() }

onMounted(() => { init(); window.addEventListener('keydown', onKeydown) })
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition name="cookie">
    <aside v-if="bannerOpen" class="cookie-banner" aria-live="polite" aria-label="Cookie consent">
      <div class="cookie-banner__copy">
        <strong>{{ t('cookie.title') }}</strong>
        <p>{{ t('cookie.text') }} <NuxtLink :to="localePath('/cookies')">{{ t('cookie.learnMore') }}</NuxtLink></p>
      </div>
      <div class="cookie-actions">
        <button class="button button--outline button--small" type="button" @click="rejectOptional">{{ t('cookie.reject') }}</button>
        <button class="button button--outline button--small" type="button" @click="openSettings">{{ t('cookie.settings') }}</button>
        <button class="button button--primary button--small" type="button" @click="acceptAll">{{ t('cookie.accept') }}</button>
      </div>
    </aside>
  </Transition>

  <Transition name="consent-modal">
    <div v-if="settingsOpen" class="consent-overlay" @click.self="closeSettings">
      <section class="consent-dialog" role="dialog" aria-modal="true" :aria-labelledby="'consent-title'">
        <button class="consent-dialog__close" type="button" :aria-label="t('common.close')" @click="closeSettings">×</button>
        <p class="eyebrow">CROBIZ · GDPR</p>
        <h2 id="consent-title">{{ t('cookie.settingsTitle') }}</h2>
        <p class="consent-dialog__intro">{{ t('cookie.settingsText') }}</p>

        <div class="consent-category">
          <div><strong>{{ t('cookie.necessaryTitle') }}</strong><p>{{ t('cookie.necessaryText') }}</p></div>
          <label class="consent-switch"><span class="sr-only">{{ t('cookie.necessaryTitle') }}</span><input type="checkbox" checked disabled><span aria-hidden="true"/></label>
        </div>
        <div class="consent-category">
          <div><strong>{{ t('cookie.analyticsTitle') }}</strong><p>{{ t('cookie.analyticsText') }}</p></div>
          <label class="consent-switch"><span class="sr-only">{{ t('cookie.analyticsTitle') }}</span><input v-model="analyticsDraft" type="checkbox"><span aria-hidden="true"/></label>
        </div>

        <NuxtLink class="consent-policy-link" :to="localePath('/cookies')" @click="closeSettings">{{ t('cookie.learnMore') }} →</NuxtLink>
        <div class="consent-dialog__actions">
          <button class="button button--outline button--small" type="button" @click="rejectOptional">{{ t('cookie.reject') }}</button>
          <button class="button button--primary button--small" type="button" @click="savePreferences">{{ t('cookie.save') }}</button>
        </div>
      </section>
    </div>
  </Transition>
</template>

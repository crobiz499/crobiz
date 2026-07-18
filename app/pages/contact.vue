<script setup>
const site = useSiteContent()
const settings = useSiteSettings()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const images = useSiteImages()
const config = useRuntimeConfig()
const form = ref(null)
const status = ref('idle')

usePageSeo('contact')

const submitForm = async (event) => {
  const data = new FormData(event.currentTarget)
  const subject = `CROBIZ · ${data.get('topic')} · ${data.get('name')}`
  const formId = config.public.formspreeFormId

  data.set('_subject', subject)
  data.set('locale', locale.value)

  if (!formId) {
    const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}\n${data.get('phone') || ''}`
    window.location.href = `mailto:${settings.value.publicEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return
  }

  status.value = 'sending'

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) throw new Error('Formspree rejected the submission')

    status.value = 'success'
    form.value?.reset()
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div>
    <PageHero :eyebrow="site.contact.eyebrow" :title="site.contact.title" :lead="site.contact.lead"/>
    <section class="section" style="padding-top:20px">
      <div class="container contact-grid">
        <div>
          <p class="eyebrow">CROBIZ</p>
          <h2 class="section-title">{{ t('footer.contact') }}</h2>
          <div class="contact-details">
            <div class="contact-card"><small>E-mail</small><a :href="`mailto:${settings.publicEmail}`">{{ settings.publicEmail }}</a></div>
            <div class="contact-card"><small>Direct</small><a :href="`mailto:${settings.directEmail}`">{{ settings.directEmail }}</a></div>
            <div class="contact-card"><small>Phone · WhatsApp</small><a v-if="settings.phone" :href="`tel:${settings.phone.replace(/\s/g, '')}`">{{ settings.phone }}</a><span v-else>—</span></div>
            <div class="contact-card"><small>Working hours</small><span>{{ site.contact.hours }}</span></div>
          </div>
          <p class="section-copy">{{ site.contact.response }}</p>
        </div>

        <form ref="form" class="contact-form" @submit.prevent="submitForm">
          <div class="form-field"><label for="name">{{ t('form.name') }}</label><input id="name" name="name" autocomplete="name" required></div>
          <div class="form-field"><label for="email">{{ t('form.email') }}</label><input id="email" name="email" type="email" autocomplete="email" required></div>
          <div class="form-field"><label for="phone">{{ t('form.phone') }}</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div>
          <div class="form-field"><label for="topic">{{ t('form.topic') }}</label><select id="topic" name="topic"><option v-for="key in ['general','business','property','admin','tourism']" :key="key">{{ t(`form.topics.${key}`) }}</option></select></div>
          <div class="form-field form-field--full"><label for="message">{{ t('form.message') }}</label><textarea id="message" name="message" required></textarea></div>
          <input class="form-honeypot" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
          <label class="form-consent"><input type="checkbox" required><span>{{ t('form.privacy') }} <NuxtLink :to="localePath('/privacy')">{{ t('footer.privacy') }}</NuxtLink></span></label>
          <p v-if="status !== 'idle'" class="form-status" :class="`form-status--${status}`" role="status" aria-live="polite">{{ t(`form.status.${status}`) }}</p>
          <button class="button button--primary" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? t('form.status.sending') : t('actions.send') }}</button>
          <p v-if="!config.public.formspreeFormId" class="form-fallback-note">{{ t('form.fallback') }}</p>
        </form>
      </div>
      <div class="container"><ImagePlaceholder class="map-placeholder" :label="t('common.photoCoast')" :src="images.lifestyle"/></div>
    </section>
  </div>
</template>

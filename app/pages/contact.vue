<script setup>
const site = useSiteContent()
const settings = useSiteSettings()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const images = useSiteImages()
const form = ref(null)
const status = ref('idle')

usePageSeo('contact')

const submitForm = async (event) => {
  if (status.value === 'sending') return

  const data = new FormData(event.currentTarget)
  data.set('form-name', 'crobiz-contact')
  data.set('subject', 'Novi CROBIZ upit s web-stranice')
  data.set('language', locale.value)

  const encodedData = new URLSearchParams()
  for (const [key, value] of data.entries()) encodedData.append(key, String(value))

  status.value = 'sending'

  if (import.meta.dev) {
    status.value = 'error'
    return
  }

  try {
    const response = await fetch('/', {
      method: 'POST',
      body: encodedData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
    })

    if (!response.ok) throw new Error('Netlify rejected the submission')

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

        <form ref="form" class="contact-form" name="crobiz-contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" @submit.prevent="submitForm">
          <input type="hidden" name="form-name" value="crobiz-contact">
          <input type="hidden" name="subject" value="Novi CROBIZ upit s web-stranice" data-remove-prefix>
          <input type="hidden" name="language" :value="locale">
          <p class="form-honeypot" aria-hidden="true"><label>Do not fill this field<input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
          <div class="form-field"><label for="name">{{ t('form.name') }}</label><input id="name" name="name" autocomplete="name" maxlength="120" required></div>
          <div class="form-field"><label for="email">{{ t('form.email') }}</label><input id="email" name="email" type="email" autocomplete="email" maxlength="254" required></div>
          <div class="form-field"><label for="phone">{{ t('form.phone') }}</label><input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="40"></div>
          <div class="form-field"><label for="topic">{{ t('form.topic') }}</label><select id="topic" name="topic"><option v-for="key in ['general','business','property','admin','tourism']" :key="key">{{ t(`form.topics.${key}`) }}</option></select></div>
          <div class="form-field form-field--full"><label for="message">{{ t('form.message') }}</label><textarea id="message" name="message" maxlength="5000" required></textarea></div>
          <label class="form-consent"><input name="privacyConsent" type="checkbox" value="accepted" required><span>{{ t('form.privacy') }} <NuxtLink :to="localePath('/privacy')">{{ t('footer.privacy') }}</NuxtLink></span></label>
          <p v-if="status !== 'idle'" class="form-status" :class="`form-status--${status}`" role="status" aria-live="polite">{{ t(`form.status.${status}`) }}</p>
          <button class="button button--primary" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? t('form.status.sending') : t('actions.send') }}</button>
        </form>
      </div>
      <div class="container"><ImagePlaceholder class="map-placeholder" :label="t('common.photoCoast')" :src="images.lifestyle"/></div>
    </section>
  </div>
</template>

<script setup>
const site = useSiteContent()
const { t } = useI18n()
const localePath = useLocalePath()
const images = useSiteImages()

usePageSeo('how')
</script>

<template>
  <div>
    <PageHero
      :eyebrow="site.how.eyebrow"
      :title="site.how.title"
      :lead="site.how.lead"
      :image="t('common.photoMeeting')"
      :image-src="images.meeting"
    >
      <div class="button-row">
        <NuxtLink class="button button--primary" :to="localePath('/contact')">
          {{ t('actions.consultation') }}
        </NuxtLink>
      </div>
    </PageHero>

    <section class="section">
      <div class="container">
        <SectionHeading :title="site.home.processTitle" centered />
        <div class="process-grid">
          <article v-for="step in site.home.process" :key="step[0]" class="process-step">
            <span>{{ step[0] }}</span>
            <h3>{{ step[1] }}</h3>
            <p>{{ step[2] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--compact surface-navy cta-band">
      <div class="container cta-inner">
        <h2>{{ site.contact.title }}</h2>
        <NuxtLink class="button button--light" :to="localePath('/contact')">
          {{ t('actions.contact') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const site = useSiteContent()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const images = useSiteImages()
usePageSeo('home')
const services = computed(() => site.value.services.groups.slice(0, 6))

const { data: blogDocuments } = await useAsyncData('crobiz-blog-index', () => {
  return queryCollection('blog')
    .select('id', 'path', 'translationKey', 'slug', 'title', 'category', 'summary', 'cover', 'publishedAt', 'published', 'draft')
    .order('publishedAt', 'DESC')
    .all()
})

const latestPosts = computed(() => {
  return (blogDocuments.value || [])
    .map((post) => ({
      ...post,
      slug: post.slug || String(post.path || '').split('/').pop(),
    }))
    .filter((post) => {
      const folderLocale = String(post.path || post.id).match(/\/(cs|sk|hr|en)\//)?.[1]
      return folderLocale === locale.value
        && (post.published === true || (post.published == null && post.draft === false))
        && post.slug
        && post.summary
    })
    .slice(0, 3)
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-grid container">
        <div class="hero-copy">
          <p class="eyebrow">{{ site.home.eyebrow }}</p>
          <h1 class="display-title">{{ site.home.title }}</h1>
          <p class="page-lead">{{ site.home.lead }}</p>
          <div class="button-row"><NuxtLink class="button button--primary" :to="localePath('/contact')">{{ t('actions.consultation') }}</NuxtLink><NuxtLink class="button button--outline" :to="localePath('/services')">{{ t('actions.services') }}</NuxtLink></div>
          <p class="trust-line">{{ site.home.trust }}</p>
        </div>
        <div class="hero-visual"><ImagePlaceholder :label="t('common.photoCoast')" :src="images.coast" tall eager/><div class="hero-badge"><strong>CZ · HR</strong><span>{{ t('footer.tagline') }}</span></div></div>
      </div>
    </section>

    <div class="category-grid container"><article v-for="(item,index) in site.home.categories" :key="item[0]" class="category-card"><div class="category-icon">0{{ index+1 }}</div><h2>{{ item[0] }}</h2><p>{{ item[1] }}</p></article></div>

    <section class="section"><div class="container grid-2"><div class="about-preview__visual"><ImagePlaceholder :label="t('common.photoMeeting')" :src="images.meeting" tall/><ImagePlaceholder :label="t('common.photoPortrait')" :src="images.portrait" portrait/></div><div><p class="eyebrow">CROBIZ</p><h2 class="section-title">{{ site.home.introTitle }}</h2><p class="section-copy">{{ site.home.introText }}</p><div class="feature-list"><div v-for="(item,index) in site.about.values.slice(0,3)" :key="item[0]" class="feature-item"><span>0{{ index+1 }}</span><div><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p></div></div></div><div class="button-row"><NuxtLink class="button button--primary" :to="localePath('/about')">{{ t('actions.discover') }}</NuxtLink></div></div></div></section>

    <section class="section surface-sand"><div class="container"><SectionHeading eyebrow="CROBIZ" :title="site.home.servicesTitle" :text="site.services.lead"/><div class="service-preview-grid"><article v-for="(service,index) in services" :key="service[0]" class="service-preview"><div class="service-icon">{{ index+1 }}</div><h3>{{ service[0] }}</h3><p>{{ service[1].slice(0,2).join(' · ') }}</p><NuxtLink class="text-link" :to="localePath('/services')">{{ t('common.learnMore') }} <span>→</span></NuxtLink></article></div></div></section>

    <section class="section surface-navy"><div class="container grid-2"><div><p class="eyebrow">EU · EURO · ADRIATIC</p><h2 class="section-title">{{ site.home.whyTitle }}</h2><p class="section-copy" style="color:rgba(255,255,255,.7)">{{ site.home.whyText }}</p><div class="button-row"><NuxtLink class="button button--light" :to="localePath('/why-croatia')">{{ t('actions.discover') }}</NuxtLink></div></div><div class="stats-row"><div class="stat"><strong>EU</strong><span>European Union</span></div><div class="stat"><strong>€</strong><span>Euro currency</span></div><div class="stat"><strong>1,700+</strong><span>km coastline</span></div><div class="stat"><strong>365</strong><span>days of opportunity</span></div></div></div></section>

    <section class="section"><div class="container"><SectionHeading :title="site.home.processTitle" centered/><div class="process-grid"><article v-for="step in site.home.process" :key="step[0]" class="process-step"><span>{{ step[0] }}</span><h3>{{ step[1] }}</h3><p>{{ step[2] }}</p></article></div></div></section>

    <section class="section surface-sand"><div class="container"><SectionHeading :eyebrow="site.blog.eyebrow" :title="site.blog.title" :text="site.blog.lead"/><div class="blog-grid"><BlogCard v-for="post in latestPosts" :key="post.id" :post="post"/></div><div class="button-row"><NuxtLink class="button button--outline" :to="localePath('/blog')">{{ t('actions.allPosts') }}</NuxtLink></div></div></section>

    <section class="section section--compact surface-navy cta-band"><div class="container cta-inner"><h2>{{ site.contact.title }}</h2><NuxtLink class="button button--light" :to="localePath('/contact')">{{ t('actions.consultation') }}</NuxtLink></div></section>
  </div>
</template>

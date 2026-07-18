// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID || '',
      formspreeFormId: process.env.NUXT_PUBLIC_FORMSPREE_FORM_ID || '',
    },
  },
  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/image', 'nuxt-studio'],
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'Marko496',
      repo: 'crobiz',
      branch: 'main',
      private: true,
    },
  },
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  experimental: {
    appManifest: true,
    checkOutdatedBuildInterval: false,
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      titleTemplate: '%s | CROBIZ',
      htmlAttrs: { lang: 'cs' },
      meta: [
        { name: 'theme-color', content: '#0b2341' },
        { name: 'format-detection', content: 'telephone=yes' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap' },
      ],
    },
  },
  i18n: {
    baseUrl: 'https://www.crobiz.cz',
    locales: [
      { code: 'cs', name: 'Čeština', language: 'cs-CZ', file: 'cs.json' },
      { code: 'hr', name: 'Hrvatski', language: 'hr-HR', file: 'hr.json' },
      { code: 'en', name: 'English', language: 'en-GB', file: 'en.json' },
    ],
    defaultLocale: 'cs',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: false,
  },
})

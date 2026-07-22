// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID || '',
    },
  },
  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/image', 'nuxt-studio'],
  studio: {
    route: '/_studio',
    auth: {
      github: {
        clientId: process.env.STUDIO_GITHUB_CLIENT_ID,
        clientSecret: process.env.STUDIO_GITHUB_CLIENT_SECRET,
        redirectURL: process.env.STUDIO_GITHUB_REDIRECT_URL,
      },
    },
    repository: {
      provider: 'github',
      owner: 'crobiz499',
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
  routeRules: {
    '/': { prerender: true },
    '/en/': { prerender: true },
    '/hr/': { prerender: true },
    '/sk/': { prerender: true },
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
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap', media: 'print', onload: "this.media='all'" },
      ],
    },
  },
  i18n: {
    baseUrl: 'https://www.crobiz.cz',
    locales: [
      { code: 'cs', name: 'Čeština', language: 'cs-CZ', file: 'cs.json' },
      { code: 'sk', name: 'Slovenčina', language: 'sk-SK', file: 'sk.json' },
      { code: 'hr', name: 'Hrvatski', language: 'hr-HR', file: 'hr.json' },
      { code: 'en', name: 'English', language: 'en-GB', file: 'en.json' },
    ],
    defaultLocale: 'cs',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: false,
  },
})

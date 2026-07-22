// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID || '',
    },
  },
  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/image', 'nuxt-security', 'nuxt-studio'],
  security: {
    // Nuxt Security hashes prerendered scripts and adds a nonce to SSR pages.
    // This keeps Studio's repository token from being exfiltrated by injected
    // inline scripts while still allowing Nuxt hydration and Google Analytics.
    nonce: true,
    sri: true,
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false,
      nitroHeaders: true,
      exportToPresets: true,
    },
    headers: {
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      crossOriginResourcePolicy: 'same-origin',
      referrerPolicy: 'strict-origin-when-cross-origin',
      xFrameOptions: 'DENY',
      contentSecurityPolicy: {
        'base-uri': ["'none'"],
        'default-src': ["'none'"],
        'connect-src': [
          "'self'",
          'https://api.github.com',
          'https://api.iconify.design',
          'https://api.simplesvg.com',
          'https://api.unisvg.com',
          'https://*.google-analytics.com',
        ],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'frame-src': ["'self'", 'https://accounts.google.com'],
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'https://avatars.githubusercontent.com',
          'https://*.googleusercontent.com',
          'https://cdn.jsdelivr.net',
          'https://*.google-analytics.com',
        ],
        'manifest-src': ["'self'"],
        'media-src': ["'self'", 'blob:'],
        'object-src': ["'none'"],
        'script-src': [
          "'self'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          'https://www.googletagmanager.com',
        ],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'worker-src': ["'self'", 'blob:'],
        'upgrade-insecure-requests': true,
      },
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 1_000_000,
      maxUploadFileRequestInBytes: 6_000_000,
      throwError: true,
    },
    rateLimiter: {
      tokensPerInterval: 120,
      interval: 300_000,
      headers: true,
      throwError: true,
    },
    xssValidator: {
      methods: ['GET', 'POST'],
      throwError: true,
    },
    corsHandler: false,
    allowedMethodsRestricter: {
      methods: ['GET', 'HEAD', 'POST', 'DELETE', 'OPTIONS'],
      throwError: true,
    },
    csrf: false,
    // Keep Nitro's default transformer path. Enabling logger removal here makes
    // Nuxt configure both OXC and esbuild and can crash the Windows build worker.
    removeLoggers: false,
  },
  content: {
    build: {
      markdown: {
        // Raw HTML from CMS-authored Markdown is not needed for CROBIZ posts.
        // Disabling it removes the most direct stored-XSS injection surface.
        rehypePlugins: {
          'rehype-raw': false,
        },
      },
    },
  },
  image: {
    quality: 100,
  },
  studio: {
    route: '/_studio',
    auth: {
      google: {
        clientId: process.env.STUDIO_GOOGLE_CLIENT_ID,
        clientSecret: process.env.STUDIO_GOOGLE_CLIENT_SECRET,
        redirectURL: process.env.STUDIO_GOOGLE_REDIRECT_URL,
      },
    },
    repository: {
      provider: 'github',
      owner: 'crobiz499',
      repo: 'crobiz',
      branch: 'main',
      private: true,
    },
    media: {
      maxFileSize: 5 * 1024 * 1024,
      // SVG and document uploads are intentionally excluded because they can
      // contain active content. Studio is only used for raster web images.
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    },
    editor: {
      commands: {
        exclude: ['video', 'codeBlock'],
      },
      components: {
        include: [],
        ungrouped: 'omit',
      },
    },
  },
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  experimental: {
    appManifest: true,
    checkOutdatedBuildInterval: false,
  },
  hooks: {
    'build:manifest': (manifest) => {
      // Studio is loaded on demand after an authenticated editor activates it.
      // Keep its large host bundle out of public-page resource hints so normal
      // visitors do not download editor-only JavaScript in the background.
      const studioResources = new Set<string>()
      for (const [key, entry] of Object.entries(manifest)) {
        if (!key.includes('/nuxt-studio/')) continue
        studioResources.add(key)
        for (const imported of entry.imports || []) studioResources.add(imported)
      }

      for (const entry of Object.values(manifest)) {
        if (!entry.isEntry || !entry.dynamicImports) continue
        entry.dynamicImports = entry.dynamicImports.filter((key) => !studioResources.has(key))
      }
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/en/': { prerender: true },
    '/hr/': { prerender: true },
    '/sk/': { prerender: true },
    '/_studio': {
      headers: {
        'cache-control': 'private, no-store, max-age=0',
        pragma: 'no-cache',
        'x-robots-tag': 'noindex, nofollow, noarchive',
        'referrer-policy': 'no-referrer',
      },
    },
    '/__nuxt_studio/**': {
      headers: {
        'cache-control': 'private, no-store, max-age=0',
        pragma: 'no-cache',
        'x-robots-tag': 'noindex, nofollow, noarchive',
        'referrer-policy': 'no-referrer',
      },
    },
    '/sw.js': {
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate',
      },
    },
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

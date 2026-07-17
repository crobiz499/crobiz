export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const measurementId = config.public.gaMeasurementId
  const { analyticsAllowed, init } = useConsent()
  let scriptLoading = false
  let analyticsReady = false

  init()

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments) }
  window.gtag('consent', 'default', {
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    analytics_storage:'denied',
  })

  const clearAnalyticsCookies = () => {
    const names = document.cookie.split(';').map((item) => item.split('=')[0].trim()).filter((name) => name === '_ga' || name.startsWith('_ga_'))
    for (const name of names) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}; SameSite=Lax`
    }
  }

  const trackPageView = () => {
    if (!analyticsReady || !analyticsAllowed.value || !measurementId) return
    window.gtag('event', 'page_view', {
      page_title:document.title,
      page_location:location.href,
      page_path:location.pathname + location.search,
    })
  }

  const enableAnalytics = () => {
    if (!measurementId || scriptLoading || analyticsReady || !analyticsAllowed.value) return
    window[`ga-disable-${measurementId}`] = false
    window.gtag('consent', 'update', {
      analytics_storage:'granted',
      ad_storage:'denied',
      ad_user_data:'denied',
      ad_personalization:'denied',
    })
    scriptLoading = true
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    script.dataset.crobizAnalytics = 'true'
    script.onload = () => {
      window.gtag('js', new Date())
      window.gtag('config', measurementId, { send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false })
      analyticsReady = true
      scriptLoading = false
      trackPageView()
    }
    document.head.appendChild(script)
  }

  const disableAnalytics = () => {
    window.gtag('consent', 'update', {
      analytics_storage:'denied',
      ad_storage:'denied',
      ad_user_data:'denied',
      ad_personalization:'denied',
    })
    if (measurementId) window[`ga-disable-${measurementId}`] = true
    clearAnalyticsCookies()
  }

  watch(analyticsAllowed, (allowed) => allowed ? enableAnalytics() : disableAnalytics(), { immediate:true })
  nuxtApp.hook('page:finish', trackPageView)
})

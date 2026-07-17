const CONSENT_KEY = 'crobiz-consent'
const LEGACY_KEY = 'crobiz-cookie-choice'
const CONSENT_VERSION = '2026-07-17-v1'

export const useConsent = () => {
  const initialized = useState('consent-initialized', () => false)
  const consent = useState('consent-record', () => null)
  const bannerOpen = useState('consent-banner-open', () => false)
  const settingsOpen = useState('consent-settings-open', () => false)

  const analyticsAllowed = computed(() => consent.value?.categories?.analytics === true)

  const readStoredConsent = () => {
    if (!import.meta.client) return null
    try {
      const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null')
      if (saved?.version === CONSENT_VERSION && typeof saved?.categories?.analytics === 'boolean') return saved
    } catch {}

    const legacy = localStorage.getItem(LEGACY_KEY)
    if (legacy === 'all' || legacy === 'essential') {
      return {
        version: CONSENT_VERSION,
        updatedAt: new Date().toISOString(),
        categories: { necessary:true, analytics:legacy === 'all' },
        migrated: true,
      }
    }
    return null
  }

  const init = () => {
    if (!import.meta.client || initialized.value) return
    const saved = readStoredConsent()
    consent.value = saved
    bannerOpen.value = !saved
    if (saved?.migrated) {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...saved, migrated:undefined }))
      localStorage.removeItem(LEGACY_KEY)
    }
    initialized.value = true
  }

  const save = (categories) => {
    if (!import.meta.client) return
    const record = {
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
      categories: { necessary:true, analytics:categories.analytics === true },
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
    localStorage.removeItem(LEGACY_KEY)
    consent.value = record
    bannerOpen.value = false
    settingsOpen.value = false
    window.dispatchEvent(new CustomEvent('crobiz:consent-changed', { detail:record }))
  }

  const acceptAll = () => save({ analytics:true })
  const rejectOptional = () => save({ analytics:false })
  const openSettings = () => { settingsOpen.value = true; bannerOpen.value = false }
  const closeSettings = () => { settingsOpen.value = false; if (!consent.value) bannerOpen.value = true }

  return { consent, analyticsAllowed, bannerOpen, settingsOpen, init, save, acceptAll, rejectOptional, openSettings, closeSettings, version:CONSENT_VERSION }
}

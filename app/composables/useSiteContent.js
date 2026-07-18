export const useSiteContent = () => {
  const { locale } = useI18n()
  const documents = useState('crobiz-site-documents', () => [])

  return computed(() => {
    const localized = documents.value.find((document) => document.locale === locale.value)
    const fallback = documents.value.find((document) => document.locale === 'cs')
    return localized || fallback || {}
  })
}

export const useSiteSettings = () => {
  return useState('crobiz-site-settings', () => null)
}

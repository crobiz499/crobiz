export default defineNuxtPlugin(async () => {
  const { data, error } = await useAsyncData('crobiz-bootstrap-content', async () => {
    const [site, settings] = await Promise.all([
      queryCollection('site').all(),
      queryCollection('settings').first(),
    ])

    return { site, settings }
  })

  if (error.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Website content could not be loaded',
      cause: error.value,
    })
  }

  useState('crobiz-site-documents', () => data.value?.site || [])
  useState('crobiz-site-settings', () => data.value?.settings || null)
})

export const useSiteImages = () => {
  const settings = useSiteSettings()
  const images = settings.value?.images || {}

  return {
    ...images,
    blog: [
      images.property,
      images.meeting,
      images.lifestyle,
      images.tourism,
      images.insurance,
      images.partnership,
    ],
  }
}

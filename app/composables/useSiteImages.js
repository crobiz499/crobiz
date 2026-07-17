const siteImages = {
  coast: '/images/ai/croatia-coast.png',
  meeting: '/images/ai/business-meeting.png',
  property: '/images/ai/croatia-property.png',
  lifestyle: '/images/ai/croatia-lifestyle.png',
  tourism: '/images/ai/tourism-rental.png',
  insurance: '/images/ai/insurance-admin.png',
  partnership: '/images/ai/cross-border-partnership.png',
}

siteImages.blog = [siteImages.property, siteImages.meeting, siteImages.lifestyle, siteImages.tourism, siteImages.insurance, siteImages.partnership]

export const useSiteImages = () => siteImages

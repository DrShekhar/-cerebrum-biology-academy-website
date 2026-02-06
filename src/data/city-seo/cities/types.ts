export interface CityHubData {
  slug: string
  cityName: string
  stateName: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  hasOfflineCenter: boolean
  nearestCenter?: {
    name: string
    address: string
    distance: string
  }
  localities: Array<{ name: string; url: string }>
  relatedCities: Array<{ name: string; url: string }>
  faqs: Array<{ question: string; answer: string }>
  stats: {
    studentsFromCity: string
    successRate: string
    rating: string
  }
  geoCoordinates: {
    lat: string
    lng: string
  }
  localContext?: {
    nearbyLandmarks?: string
    transportOptions?: string
  }
  areaSpecificContent?: {
    whyThisArea?: string
  }
  studentSuccessStory?: {
    name: string
    area: string
    achievement: string
    quote: string
  }
  competitorComparison?: {
    localAlternatives: string
    differentiator: string
  }
}

import {
  offlineLocations,
  onlineRegions,
  primaryContact,
  type OnlineRegion,
} from '@/data/locations'

export interface NearMeCenter {
  name: string
  address: string
  phone: string
  mapUrl: string
  features: string[]
  timing: string
  locationId: string
  city: string
}

export interface NearMePageConfig {
  keyword: string
  title: string
  description: string
  h1: string
  faqs: Array<{ question: string; answer: string }>
}

export function getOfflineCenters(): NearMeCenter[] {
  return offlineLocations.map((loc) => ({
    name: loc.name,
    address: `${loc.address}, ${loc.city} - ${loc.pincode}`,
    phone: loc.phone[0],
    mapUrl: loc.googleMapsUrl,
    features: loc.features,
    timing: loc.timing,
    locationId: loc.id,
    city: loc.city,
  }))
}

export function getOnlineRegions(): OnlineRegion[] {
  return onlineRegions
}

export function getPrimaryContact() {
  return primaryContact
}

export function generateLocalBusinessSchema(keyword: string, centers: NearMeCenter[]): object[] {
  return centers.map((center) => ({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `https://cerebrumbiologyacademy.com/locations/${center.locationId}`,
    name: `Cerebrum Biology Academy - ${center.name}`,
    description: `${keyword} in ${center.city}. Expert NEET biology coaching with proven results.`,
    url: `https://cerebrumbiologyacademy.com/locations/${center.city.toLowerCase().replace(/\s+/g, '-')}`,
    telephone: center.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: center.address,
      addressLocality: center.city,
      addressRegion:
        center.city === 'Gurugram' || center.city === 'Faridabad' ? 'Haryana' : 'Delhi',
      addressCountry: 'IN',
    },
    geo: getCoordinates(center.locationId),
    openingHours: 'Mo-Su 00:00-23:59',
    image: 'https://cerebrumbiologyacademy.com/images/centers/center-exterior.jpg',
    priceRange: '₹45,000 - ₹1,80,000',
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Course',
          name: 'NEET Biology Coaching',
          description: 'Comprehensive NEET biology preparation course',
          provider: {
            '@type': 'Organization',
            name: 'Cerebrum Biology Academy',
          },
        },
      ],
    },
  }))
}

function getCoordinates(
  locationId: string
): { '@type': string; latitude: number; longitude: number } | undefined {
  const coords: Record<string, { lat: number; lng: number }> = {
    rohini: { lat: 28.7041, lng: 77.1025 },
    gurugram: { lat: 28.4595, lng: 77.0266 },
    'south-extension': { lat: 28.5827, lng: 77.2218 },
    faridabad: { lat: 28.4089, lng: 77.3178 },
  }

  const coord = coords[locationId]
  if (!coord) return undefined

  return {
    '@type': 'GeoCoordinates',
    latitude: coord.lat,
    longitude: coord.lng,
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function getCityLocalityPath(city: string): string {
  const citySlugMap: Record<string, string> = {
    'New Delhi': 'delhi',
    Delhi: 'delhi',
    Gurugram: 'gurugram',
    Gurgaon: 'gurugram',
    Faridabad: 'faridabad',
    Noida: 'noida',
    'Greater Noida': 'greater-noida',
  }

  return `/locations/${citySlugMap[city] || city.toLowerCase().replace(/\s+/g, '-')}`
}

export function getNearbyLocalitiesForCenter(locationId: string): string[] {
  const localitiesMap: Record<string, string[]> = {
    rohini: [
      'rohini-sector-7',
      'rohini-sector-9',
      'rohini-sector-11',
      'pitampura',
      'shalimar-bagh',
      'ashok-vihar',
    ],
    gurugram: [
      'gurugram-sector-51',
      'gurugram-sector-56',
      'mayfield-garden',
      'golf-course-road',
      'dlf-phase-4',
      'sohna-road',
    ],
    'south-extension': [
      'south-extension-1',
      'south-extension-2',
      'greater-kailash',
      'defence-colony',
      'lajpat-nagar',
      'saket',
    ],
    faridabad: [
      'faridabad-sector-15',
      'faridabad-sector-16',
      'faridabad-sector-21',
      'ballabgarh',
      'greater-faridabad',
    ],
  }

  return localitiesMap[locationId] || []
}

export const NEAR_ME_KEYWORDS = [
  // High-volume generic "near me" (40K+ monthly)
  'biology-tutor-near-me',
  'biology-tutors-near-me',
  'biology-teacher-near-me',
  'biology-classes-near-me',
  'biology-coaching-near-me',
  // NEET-specific "near me"
  'neet-biology-coaching-near-me',
  'neet-biology-tutor-near-me',
  'neet-coaching-near-me',
  'best-neet-coaching-near-me',
  // Zoology (specialty)
  'zoology-classes',
  'zoology-teacher',
  'zoology-teacher-near-me',
  'zoology-tutor-near-me',
  // Botany (specialty)
  'botany-classes-near-me',
  'botany-tutor-near-me',
] as const

export type NearMeKeyword = (typeof NEAR_ME_KEYWORDS)[number]

export function getWhatsAppEnquiryUrl(keyword: string, location?: string): string {
  const message = encodeURIComponent(
    `Hi! I'm looking for ${keyword.replace(/-/g, ' ')}${location ? ` in ${location}` : ''}. Can you share course details?`
  )
  return `https://wa.me/${primaryContact.whatsapp.replace('+', '')}?text=${message}`
}

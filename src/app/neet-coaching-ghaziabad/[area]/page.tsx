import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getGhaziabadAreaBySlug,
  getAllGhaziabadAreaSlugs,
  getNearbyGhaziabadAreas,
  getAICitationFacts,
} from '@/data/ghaziabad-areas'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { AreaPageContent } from './AreaPageContent'

type Props = {
  params: Promise<{ area: string }>
}

export function generateStaticParams() {
  return getAllGhaziabadAreaSlugs().map((area) => ({ area }))
}

function getTitleByType(area: ReturnType<typeof getGhaziabadAreaBySlug>): string {
  if (!area) return 'NEET Coaching Ghaziabad | Cerebrum Biology Academy'

  const typePrefix: Record<string, string> = {
    premium: 'Premium',
    residential: 'Top',
    commercial: 'Best',
    township: 'Best',
    industrial: 'Affordable',
    'trans-hindon': 'Quality',
  }

  const prefix = typePrefix[area.type] || 'Best'
  return `${prefix} NEET Coaching in ${area.name}, Ghaziabad | ${CEREBRUM_METRICS.successRateText} Success | Cerebrum Academy`
}

function getMetaDescriptionByType(area: ReturnType<typeof getGhaziabadAreaBySlug>): string {
  if (!area) return ''

  const schoolsText = area.schools.slice(0, 2).join(', ')
  const metroText = area.nearbyMetro[0] || ''

  switch (area.type) {
    case 'premium':
      return `Premium NEET Biology coaching for ${area.name} families. ${CEREBRUM_METRICS.successRateText} success rate. Students from ${schoolsText}. Near ${metroText}. Personalized ${CEREBRUM_METRICS.batchSizeText} batches. Book free demo!`

    case 'township':
      return `Best NEET coaching for ${area.name} residents. ${CEREBRUM_METRICS.successRateText} success rate. Students from ${schoolsText}. Expert AIIMS faculty, small batches. Book free demo!`

    case 'trans-hindon':
      return `Quality NEET Biology coaching near ${area.name}. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Near ${metroText}. Book free demo!`

    case 'residential':
      return `Best NEET Biology coaching near ${area.name}, Ghaziabad. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. ${area.distanceFromCenter} from our center. Book free demo!`

    case 'commercial':
      return `NEET coaching near ${area.name} for Ghaziabad families. ${CEREBRUM_METRICS.successRateText} success rate. Convenient location. Students from ${schoolsText}. Flexible timings!`

    case 'industrial':
      return `Affordable NEET Biology coaching for ${area.name} families. ${CEREBRUM_METRICS.successRateText} success rate, experienced faculty. Students from ${schoolsText}. EMI options available!`

    default:
      return `Best NEET Biology coaching near ${area.name}. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Small batches, personal mentorship. Book free demo!`
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: areaSlug } = await params
  const area = getGhaziabadAreaBySlug(areaSlug)

  if (!area) {
    return {
      title: 'Area Not Found',
    }
  }

  const title = getTitleByType(area)
  const description = getMetaDescriptionByType(area)

  const typeKeywords: Record<string, string[]> = {
    premium: [
      'premium NEET coaching Ghaziabad',
      'best NEET institute Ghaziabad',
      'private school students NEET',
    ],
    township: [
      'township NEET coaching Ghaziabad',
      'society NEET classes',
      'integrated township NEET prep',
    ],
    'trans-hindon': [
      'Trans Hindon NEET coaching',
      'old Ghaziabad NEET classes',
      'local NEET coaching',
    ],
    residential: [
      'residential area NEET coaching',
      'sector NEET classes Ghaziabad',
      'local NEET coaching',
    ],
    commercial: [
      'central Ghaziabad NEET coaching',
      'convenient NEET coaching Ghaziabad',
      'commercial hub NEET classes',
    ],
    industrial: [
      'affordable NEET classes Ghaziabad',
      'industrial area NEET coaching',
      'budget NEET coaching',
    ],
  }

  return {
    title,
    description,
    keywords: [
      `NEET coaching ${area.name}`,
      `NEET coaching near ${area.name}`,
      `Best NEET coaching ${area.fullName}`,
      `Biology coaching ${area.name} Ghaziabad`,
      `NEET preparation ${area.name}`,
      `Medical coaching ${area.name}`,
      ...area.schools.map((school) => `NEET coaching for ${school} students`),
      ...area.nearbyMetro.map((metro) => `NEET coaching near ${metro}`),
      ...area.societies.slice(0, 2).map((society) => `NEET coaching for ${society} residents`),
      ...(typeKeywords[area.type] || []),
    ],
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${areaSlug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://cerebrumbiologyacademy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Coaching in ${area.name}, Ghaziabad`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${areaSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function GhaziabadAreaPage({ params }: Props) {
  const { area } = await params
  const areaData = getGhaziabadAreaBySlug(area)

  if (!areaData) {
    notFound()
  }

  const nearbyAreas = getNearbyGhaziabadAreas(area)
  const aiCitationFacts = getAICitationFacts(area)

  // Schema 1: EducationalOrganization
  const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}#organization`,
    name: `Cerebrum Biology Academy - NEET Coaching ${areaData.name}`,
    description: areaData.description,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}`,
    telephone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 62',
      addressLocality: 'Ghaziabad',
      addressRegion: 'Uttar Pradesh',
      postalCode: areaData.pincode,
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Place',
      name: areaData.fullName,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '38',
      bestRating: '5',
    },
  }

  // Schema 2: LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}#localbusiness`,
    name: `NEET Coaching in ${areaData.name}, Ghaziabad`,
    description: `Best NEET Biology coaching in ${areaData.name}. ${CEREBRUM_METRICS.successRateText} success rate. AIIMS faculty.`,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}`,
    telephone: CONTACT_INFO.phone.primary,
    priceRange: '\u20B9\u20B9-\u20B9\u20B9\u20B9',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 62',
      addressLocality: 'Ghaziabad',
      addressRegion: 'Uttar Pradesh',
      postalCode: areaData.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.627,
      longitude: 77.372,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
    ],
  }

  // Schema 3: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching Ghaziabad',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching ${areaData.name}`,
        item: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}`,
      },
    ],
  }

  // Schema 4: FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the fee for NEET coaching in ${areaData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our NEET Biology coaching fees for ${areaData.name} students range from Rs 45,000 to Rs 1,56,000 per year depending on the program. EMI options available.`,
        },
      },
      {
        '@type': 'Question',
        name: `How far is ${areaData.name} from your Noida center?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${areaData.name} is ${areaData.distanceFromCenter} from our Sector 62 Noida center. ${areaData.nearbyMetro.length > 0 ? `Students can reach via ${areaData.nearbyMetro[0]}.` : 'Online classes also available.'}`,
        },
      },
      {
        '@type': 'Question',
        name: `Which schools do you serve from ${areaData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We have students from ${areaData.schools.join(', ')} and other schools in ${areaData.name}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do you offer online classes for ${areaData.name} students?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! Live interactive online classes via Zoom available. Many students from ${areaData.societies.slice(0, 2).join(' and ')} prefer online coaching to save commute time.`,
        },
      },
    ],
  }

  // Schema 5: Course
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `NEET Biology Coaching - ${areaData.name}, Ghaziabad`,
    description: `Comprehensive NEET Biology preparation for ${areaData.name} students. ${CEREBRUM_METRICS.successRateText} success rate.`,
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['online', 'onsite'],
      duration: 'P1Y',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '45000',
      highPrice: '156000',
      priceCurrency: 'INR',
    },
  }

  // Schema 6: Event (Free Demo)
  const nextSaturday = new Date()
  nextSaturday.setDate(nextSaturday.getDate() + ((6 - nextSaturday.getDay() + 7) % 7 || 7))
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Free NEET Biology Demo Class for ${areaData.name} Students`,
    description: `Experience our teaching methodology. Free 2-hour demo for ${areaData.name} NEET aspirants.`,
    startDate: `${nextSaturday.toISOString().split('T')[0]}T10:00:00+05:30`,
    endDate: `${nextSaturday.toISOString().split('T')[0]}T12:00:00+05:30`,
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy - Noida',
      address: { streetAddress: 'Sector 62', addressLocality: 'Noida', addressRegion: 'UP' },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    organizer: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
  }

  // Schema 7: HowTo (Enrollment)
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Enroll for NEET Coaching in ${areaData.name}`,
    description: `Step-by-step guide for ${areaData.name} students to join Cerebrum Biology Academy.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Book Free Demo',
        text: 'Book a free demo class online or call us.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Attend Demo',
        text: 'Experience our teaching methodology.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Batch',
        text: 'Select morning, evening, or weekend batch.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Complete Enrollment',
        text: 'Pay fees and start learning.',
      },
    ],
  }

  // Schema 8: SpeakableSpecification (AEO - Voice Search)
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `NEET Coaching in ${areaData.name}, Ghaziabad`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#speakable-intro', '#speakable-contact'],
    },
    url: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}`,
  }

  // Schema 9: AggregateOffer
  const aggregateOfferSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    name: `NEET Coaching Programs in ${areaData.name}`,
    lowPrice: '45000',
    highPrice: '156000',
    priceCurrency: 'INR',
    offerCount: '4',
    offers: [
      { '@type': 'Offer', name: 'Class 11 NEET Biology', price: '48000', priceCurrency: 'INR' },
      { '@type': 'Offer', name: 'Class 12 NEET Biology', price: '70000', priceCurrency: 'INR' },
      { '@type': 'Offer', name: 'Dropper Program', price: '98000', priceCurrency: 'INR' },
      { '@type': 'Offer', name: 'Crash Course', price: '45000', priceCurrency: 'INR' },
    ],
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateOfferSchema) }}
      />

      <AreaPageContent
        area={areaData}
        slug={area}
        nearbyAreaSlugs={nearbyAreas}
        aiCitationFacts={aiCitationFacts}
      />
    </>
  )
}

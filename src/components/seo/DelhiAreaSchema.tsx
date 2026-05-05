import { CONTACT_INFO } from '@/lib/constants/contactInfo'

/**
 * Emits Service + Place + ContactPoint schema for Delhi/NCR landing pages.
 *
 * Why a separate ContactPoint: enables click-to-call surfacing in Google
 * Knowledge Panel and Maps for Delhi-area queries. Includes Hindi as an
 * available language (~60% of Delhi search volume is Hindi).
 *
 * Auto-detects sub-region (south/north/east/west/central/ncr) from slug
 * so each page anchors to the right Delhi sub-area without per-page wiring.
 */

interface DelhiAreaSchemaProps {
  pageSlug: string
  /** Sub-area like "Defence Colony" or "CR Park". Defaults to deriving
   *  a label from the slug if omitted. */
  subArea?: string
  /** Override for the auto-detected sub-region. */
  subRegion?: 'south' | 'north' | 'east' | 'west' | 'central' | 'ncr'
  serviceName?: string
  description?: string
}

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const SUB_REGION_NAMES: Record<NonNullable<DelhiAreaSchemaProps['subRegion']>, string> = {
  south: 'South Delhi',
  north: 'North Delhi',
  east: 'East Delhi',
  west: 'West Delhi',
  central: 'Central Delhi',
  ncr: 'Delhi NCR',
}

function detectSubRegion(slug: string): NonNullable<DelhiAreaSchemaProps['subRegion']> {
  if (slug.includes('south-delhi')) return 'south'
  if (slug.includes('north-delhi')) return 'north'
  if (
    slug.includes('east-delhi') ||
    slug.includes('shahdara') ||
    slug.includes('yamuna-vihar') ||
    slug.includes('dilshad-garden')
  ) {
    return 'east'
  }
  if (slug.includes('west-delhi') || slug.includes('dwarka') || slug.includes('rohini'))
    return 'west'
  if (
    slug.includes('central-delhi') ||
    slug.includes('connaught-place') ||
    slug.includes('chandni-chowk') ||
    slug.includes('civil-lines') ||
    slug.includes('modern-school')
  ) {
    return 'central'
  }
  if (slug.includes('delhi-ncr')) return 'ncr'
  // South Delhi sub-localities
  if (
    slug.includes('defence-colony') ||
    slug.includes('cr-park') ||
    slug.includes('vasant-kunj') ||
    slug.includes('vasant-vihar') ||
    slug.includes('saket') ||
    slug.includes('green-park') ||
    slug.includes('panchsheel-park') ||
    slug.includes('safdarjung-enclave') ||
    slug.includes('east-of-kailash')
  ) {
    return 'south'
  }
  return 'ncr'
}

export function DelhiAreaSchema({
  pageSlug,
  subArea,
  subRegion,
  serviceName,
  description,
}: DelhiAreaSchemaProps) {
  const region = subRegion || detectSubRegion(pageSlug)
  const regionLabel = SUB_REGION_NAMES[region]
  const pageUrl = `${BASE_URL}/${pageSlug}`
  const areaLabel = subArea ? `${subArea}, ${regionLabel}` : regionLabel

  const resolvedServiceName = serviceName || `NEET Biology Coaching ${areaLabel}`
  const resolvedDescription =
    description ||
    `NEET Biology coaching for ${areaLabel} students. Cerebrum Biology Academy's flagship South Extension center serves ${areaLabel} families with AIIMS-trained faculty, small-batch classroom + online programs, and 98% NEET success rate.`

  const center = CONTACT_INFO.centers.southExtension

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: resolvedServiceName,
    alternateName: [
      `NEET Coaching ${areaLabel}`,
      `Biology Coaching ${areaLabel}`,
      subArea ? `Biology Tutor ${subArea}` : `NEET Coaching Delhi NCR`,
    ],
    description: resolvedDescription,
    url: pageUrl,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: BASE_URL,
      telephone: CONTACT_INFO.phone.primary,
      address: {
        '@type': 'PostalAddress',
        streetAddress: center.streetAddress,
        addressLocality: center.addressLocality,
        addressRegion: center.addressRegion,
        postalCode: center.postalCode,
        addressCountry: center.addressCountry,
      },
    },
    serviceType: 'NEET Biology Coaching',
    category: 'Educational Services',
    areaServed: [
      {
        '@type': 'City',
        name: 'New Delhi',
        alternateName: 'Delhi',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Delhi' },
      },
      {
        '@type': 'AdministrativeArea',
        name: regionLabel,
        containedInPlace: { '@type': 'City', name: 'New Delhi' },
      },
      ...(subArea
        ? [
            {
              '@type': 'Place',
              name: `${subArea}, New Delhi`,
              alternateName: `${subArea} ${regionLabel}`,
            },
          ]
        : []),
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: pageUrl,
      servicePhone: CONTACT_INFO.phone.primary,
      availableLanguage: ['English', 'Hindi'],
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone.primary,
        contactType: 'customer service',
        areaServed: ['IN-DL', 'IN'],
        availableLanguage: ['English', 'Hindi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '07:00',
          closes: '21:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone.primary,
        contactType: 'admissions',
        areaServed: ['IN-DL', 'IN'],
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  }

  const placeData = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${pageUrl}#place`,
    name: areaLabel,
    address: {
      '@type': 'PostalAddress',
      addressLocality: subArea || regionLabel,
      addressRegion: 'Delhi',
      addressCountry: 'IN',
    },
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: regionLabel,
      containedInPlace: { '@type': 'City', name: 'New Delhi' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeData) }}
      />
    </>
  )
}

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface CityAreaSchemaProps {
  /** Primary city name, e.g. "Noida" */
  city: string
  /** State the city sits in, e.g. "Uttar Pradesh" */
  state: string
  /** Page slug (without leading slash) this schema is rendered on */
  pageSlug: string
  /** Alternate spellings / names the city is searched as */
  altNames?: string[]
  /** Optional sub-locality, e.g. "Sector 62" */
  subArea?: string
  /** Human service name; defaults to "NEET Biology Coaching <area>" */
  serviceName?: string
  /** Service description; sensible default derived from city */
  description?: string
  /** Service type label */
  serviceType?: string
}

const BASE_URL = 'https://cerebrumbiologyacademy.com'

/**
 * Service-area schema for a city Cerebrum serves online (no physical center).
 * Emits a Service (areaServed = City) + a geographic Place node. Deliberately
 * asserts NO streetAddress — Cerebrum reaches these cities via live online
 * classes, so a physical-location node would be inaccurate.
 */
export function CityAreaSchema({
  city,
  state,
  pageSlug,
  altNames = [],
  subArea,
  serviceName,
  description,
  serviceType = 'Online NEET Biology Coaching',
}: CityAreaSchemaProps) {
  const pageUrl = `${BASE_URL}/${pageSlug}`
  const areaLabel = subArea ? `${subArea}, ${city}` : city

  const resolvedServiceName = serviceName || `NEET Biology Coaching ${areaLabel}`
  const resolvedDescription =
    description ||
    `NEET & CBSE biology coaching for ${areaLabel} students. Cerebrum Biology Academy serves ${city} families with AIIMS-trained faculty, small-batch live online classes, and a 98% NEET qualification rate.`

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: resolvedServiceName,
    alternateName: [
      `NEET Coaching ${areaLabel}`,
      `Biology Coaching ${areaLabel}`,
      ...altNames.map((n) => `NEET Coaching ${n}`),
    ],
    description: resolvedDescription,
    url: pageUrl,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: BASE_URL,
      telephone: CONTACT_INFO.phone.primary,
    },
    serviceType,
    category: 'Educational Services',
    areaServed: [
      {
        '@type': 'City',
        name: city,
        ...(altNames.length ? { alternateName: altNames } : {}),
        containedInPlace: {
          '@type': 'State',
          name: state,
        },
      },
      ...(subArea
        ? [
            {
              '@type': 'Place',
              name: `${subArea}, ${city}`,
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
  }

  const placeData = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${pageUrl}#place`,
    name: areaLabel,
    ...(altNames.length ? { alternateName: altNames } : {}),
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: city,
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

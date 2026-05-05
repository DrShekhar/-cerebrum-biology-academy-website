import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface GurgaonGurugramAreaSchemaProps {
  spelling: 'gurgaon' | 'gurugram'
  pageSlug: string
  subArea?: string
  serviceName?: string
  description?: string
  serviceType?: string
}

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export function GurgaonGurugramAreaSchema({
  spelling,
  pageSlug,
  subArea,
  serviceName,
  description,
  serviceType = 'Online NEET Coaching',
}: GurgaonGurugramAreaSchemaProps) {
  const isGurgaon = spelling === 'gurgaon'
  const primaryName = isGurgaon ? 'Gurgaon' : 'Gurugram'
  const aliasName = isGurgaon ? 'Gurugram' : 'Gurgaon'
  const pageUrl = `${BASE_URL}/${pageSlug}`
  const areaLabel = subArea ? `${subArea}, ${primaryName}` : primaryName

  const resolvedServiceName = serviceName || `NEET Biology Coaching ${areaLabel}`
  const resolvedDescription =
    description ||
    `NEET Biology coaching for ${areaLabel} students. Cerebrum Biology Academy serves both ${primaryName} and ${aliasName} families with AIIMS-trained faculty, small-batch classroom + online programs, and 98% NEET success rate.`

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: resolvedServiceName,
    alternateName: [
      `NEET Coaching ${areaLabel}`,
      `Biology Coaching ${areaLabel}`,
      subArea ? `NEET Coaching ${subArea}, ${aliasName}` : `NEET Coaching ${aliasName}`,
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
        name: primaryName,
        alternateName: aliasName,
        containedInPlace: {
          '@type': 'State',
          name: 'Haryana',
        },
      },
      ...(subArea
        ? [
            {
              '@type': 'Place',
              name: `${subArea}, ${primaryName}`,
              alternateName: `${subArea}, ${aliasName}`,
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
    alternateName: subArea
      ? [`${subArea}, ${aliasName}`, `${subArea} ${aliasName}`]
      : [aliasName, `${aliasName} City`],
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: primaryName,
      alternateName: aliasName,
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

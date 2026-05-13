import { CONTACT_INFO } from '@/lib/constants/contactInfo'

/**
 * Site-wide canonical EducationalOrganization schema with all Cerebrum
 * Delhi NCR centres expressed as `branch[]` entries. Injected in the
 * root layout so every page in the site shares the same Org entity.
 *
 * Designed to enable:
 *  - Google Knowledge Panel with multi-location call buttons
 *  - Local Pack (3-pack) eligibility for "near me" Delhi NCR queries
 *  - Branch-specific geo + telephone surfacing in Maps
 */

const BASE_URL = 'https://cerebrumbiologyacademy.com'

type CentreKey = 'southExtension' | 'rohini' | 'greenPark' | 'gurugram' | 'faridabad' | 'noida'

const CENTRE_ORDER: CentreKey[] = [
  'southExtension',
  'rohini',
  'greenPark',
  'gurugram',
  'faridabad',
  'noida',
]

function buildBranch(key: CentreKey) {
  const c = CONTACT_INFO.centers[key]
  return {
    '@type': 'EducationalOrganization' as const,
    '@id': `${BASE_URL}/#centre-${key}`,
    name: c.name,
    url: BASE_URL,
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.streetAddress,
      addressLocality: c.addressLocality,
      addressRegion: c.addressRegion,
      postalCode: c.postalCode,
      addressCountry: c.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: c.geo.latitude,
      longitude: c.geo.longitude,
    },
    telephone: '+918826444334',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
    hasMap: c.mapUrl,
    sameAs: c.googleBusinessUrl ? [c.googleBusinessUrl] : undefined,
  }
}

export function CerebrumOrgSchema() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    alternateName: ['Cerebrum', 'Cerebrum NEET Biology'],
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "India's only biology-only specialist NEET coaching brand. AIIMS-trained faculty led by Dr. Shekhar C Singh. 6 Delhi NCR centres + pan-India online. 680+ medical college selections, 98% NEET qualification rate.",
    foundingDate: '2014',
    founder: {
      '@type': 'Person',
      '@id': `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person`,
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Lead Biology Faculty',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
        url: 'https://www.aiims.edu/',
      },
    },
    telephone: '+918826444334',
    email: 'info@cerebrumbiologyacademy.com',
    sameAs: [
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
      'https://www.instagram.com/cerebrumbiologyacademy/',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '485',
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.centers.southExtension.streetAddress,
      addressLocality: CONTACT_INFO.centers.southExtension.addressLocality,
      addressRegion: CONTACT_INFO.centers.southExtension.addressRegion,
      postalCode: CONTACT_INFO.centers.southExtension.postalCode,
      addressCountry: CONTACT_INFO.centers.southExtension.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT_INFO.centers.southExtension.geo.latitude,
      longitude: CONTACT_INFO.centers.southExtension.geo.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'New Delhi' },
      { '@type': 'City', name: 'Gurugram' },
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Greater Noida' },
      { '@type': 'City', name: 'Faridabad' },
      { '@type': 'City', name: 'Ghaziabad' },
      { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'City', name: 'Kolkata' },
      { '@type': 'City', name: 'Pune' },
      { '@type': 'City', name: 'Kota' },
      { '@type': 'Country', name: 'India' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+918826444334',
        contactType: 'admissions',
        availableLanguage: ['English', 'Hindi'],
        areaServed: ['IN', 'IN-DL', 'IN-HR', 'IN-UP'],
        contactOption: ['HearingImpairedSupported', 'TollFree'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+918826444334',
        contactType: 'customer support',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
      },
    ],
    department: CENTRE_ORDER.map(buildBranch),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  )
}

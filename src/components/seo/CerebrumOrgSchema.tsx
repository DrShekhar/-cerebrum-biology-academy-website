import { CONTACT_INFO } from '@/lib/constants/contactInfo'

/**
 * Site-wide canonical EducationalOrganization schema — the ONLY Organization
 * node the site may emit (#organization). Injected in the root layout so
 * every page shares the same Org entity. Other schemas must reference it by
 * @id, never declare a second Organization.
 *
 * Identity: global biology education brand (NEET + NEET-NRI + IB/AP/A-Level/
 * GCSE/MCAT/GAMSAT/USMLE/DAT + olympiads in 75+ countries), headquartered in
 * New Delhi with Delhi NCR centres expressed as `department[]` branches.
 *
 * Designed to enable:
 *  - Google Knowledge Panel with multi-location call buttons
 *  - Local Pack (3-pack) eligibility for "near me" Delhi NCR queries
 *  - Correct global brand descriptions in AI engines (ChatGPT/Perplexity/AIO)
 */

const BASE_URL = 'https://cerebrumbiologyacademy.com'

type CentreKey = 'southExtension' | 'rohini' | 'greenPark' | 'gurugram' | 'faridabad' | 'noida'

// NOTE: 'noida' is deliberately NOT emitted as a department branch — it is
// online-only (no physical address), and emitting an EducationalOrganization
// branch with an empty streetAddress is the fake-location pattern Google
// penalizes (LocalBusinessSchema excludes it for the same reason). This keeps
// the 5 real centres aligned with the "5 Delhi NCR centres" description below.
const CENTRE_ORDER: CentreKey[] = ['southExtension', 'rohini', 'greenPark', 'gurugram', 'faridabad']

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
    // Only emit a per-centre GBP link when it is a real, resolving URL — the
    // legacy `g.page/*` shortlinks are dead, and a non-resolving sameAs is a
    // negative trust signal. A verified GBP URL (owner to add) flows in.
    sameAs:
      c.googleBusinessUrl && !c.googleBusinessUrl.includes('g.page/')
        ? [c.googleBusinessUrl]
        : undefined,
  }
}

export function CerebrumOrgSchema() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    alternateName: ['Cerebrum', 'Cerebrum Academy', 'Cerebrum Biology', 'Cerebrum NEET Biology'],
    legalName: 'Cerebrum Biology Academy Private Limited',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    slogan: 'Where Biology Meets Excellence',
    description:
      'Global biology education academy founded in New Delhi (2014). AIIMS-trained faculty led by Dr. Shekhar C Singh teach NEET (in India and for students abroad), IB Biology, AP Biology, A-Level, GCSE/IGCSE, MCAT Biology & Biochemistry, GAMSAT, USMLE Step 1, DAT, and biology olympiad pathways (USABO, BBO, INBO, IBO and 75+ national olympiads). 5 Delhi NCR centres + live online classes worldwide. 680+ medical college selections.',
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
      sameAs: [
        `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty`,
        'https://www.youtube.com/@drshekharcsingh',
        'https://www.linkedin.com/in/drshekharsingh',
      ],
    },
    telephone: '+918826444334',
    email: 'info@cerebrumbiologyacademy.com',
    // sameAs sourced from the single NAP source of truth (CONTACT_INFO.social) so
    // every schema component points at the SAME real, resolving profiles. The
    // previous hardcoded set had wrong FB/YouTube/Twitter handles that defeated
    // entity corroboration (AI/Google couldn't confirm they were the same brand).
    sameAs: Object.values(CONTACT_INFO.social),
    knowsAbout: [
      'NEET Biology',
      'NEET-UG Preparation',
      'NEET Coaching for NRI Students',
      'IB Biology (HL & SL)',
      'AP Biology',
      'A-Level Biology',
      'GCSE & IGCSE Biology',
      'MCAT Biology & Biochemistry',
      'GAMSAT Section III Biology',
      'USMLE Step 1 Biology',
      'DAT Biology',
      'USABO (USA Biology Olympiad)',
      'BBO (British Biology Olympiad)',
      'NSEB & INBO (India Biology Olympiad)',
      'International Biology Olympiad (IBO)',
      'Medical Entrance Exams',
      'Human Physiology',
      'Genetics and Evolution',
      'Botany',
      'Zoology',
      'NCERT Biology',
    ],
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
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Singapore' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Kuwait' },
      { '@type': 'Country', name: 'Oman' },
      { '@type': 'Country', name: 'Bahrain' },
      { '@type': 'Country', name: 'Malaysia' },
      { '@type': 'Country', name: 'Nepal' },
      { '@type': 'Place', name: 'Worldwide' },
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
        contactType: 'international admissions',
        availableLanguage: 'English',
        areaServed: 'Worldwide',
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

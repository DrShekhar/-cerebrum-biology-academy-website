// Server Component - no client-side interactivity needed
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface LocalBusinessSchemaProps {
  locationId: 'rohini' | 'gurugram' | 'south-extension' | 'green-park' | 'faridabad'
}

// Map this component's location keys to the canonical CONTACT_INFO.centers keys
// so geo coordinates are sourced from the single source of truth (not hardcoded).
const CENTER_KEY_MAP = {
  rohini: 'rohini',
  gurugram: 'gurugram',
  'south-extension': 'southExtension',
  'green-park': 'greenPark',
  faridabad: 'faridabad',
} as const

function centerGeo(locationId: keyof typeof CENTER_KEY_MAP) {
  const c = CONTACT_INFO.centers[CENTER_KEY_MAP[locationId]]
  return { lat: String(c.geo.latitude), lng: String(c.geo.longitude) }
}

// Detailed location data with geo coordinates
const locationData = {
  rohini: {
    name: 'Cerebrum Biology Academy - Rohini',
    address: '211 Vikas Surya Tower, DC Chowk Sector 9',
    streetAddress: '211 Vikas Surya Tower, DC Chowk',
    addressLocality: 'Rohini',
    addressRegion: 'Delhi',
    postalCode: '110085',
    geo: { lat: '28.7143', lng: '77.1117' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-north-delhi',
    image: 'https://cerebrumbiologyacademy.com/locations/rohini-center.jpg',
    priceRange: '₹40,000 - ₹1,80,000',
    paymentMethods: ['Cash', 'UPI', 'Bank Transfer', 'EMI'],
    openingHours: { opens: '09:00', closes: '20:00' },
    nearbyLandmarks: ['DC Chowk Metro Station', 'Rohini Sector 9', 'Vikas Surya Mall'],
    studentCount: '850',
    googleBusinessUrl: CONTACT_INFO.centers.rohini.googleBusinessUrl,
    googleMapsUrl:
      'https://maps.google.com/?q=Cerebrum+Biology+Academy+Rohini,+Delhi&ll=28.7143,77.1117&z=15',
    areaServed: [
      'North Delhi',
      'Rohini',
      'Pitampura',
      'Model Town',
      'Shalimar Bagh',
      'Paschim Vihar',
      'Ashok Vihar',
    ],
  },
  gurugram: {
    name: 'Cerebrum Biology Academy - Gurugram',
    address: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram',
    streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
    addressLocality: 'Sector 51, Gurugram',
    addressRegion: 'Haryana',
    postalCode: '122018',
    geo: { lat: '28.4295', lng: '77.0426' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
    image: 'https://cerebrumbiologyacademy.com/locations/gurugram-center.jpg',
    priceRange: '₹40,000 - ₹1,80,000',
    paymentMethods: ['Cash', 'UPI', 'Bank Transfer', 'EMI'],
    openingHours: { opens: '09:00', closes: '20:00' },
    nearbyLandmarks: ['Sector 51 Gurugram', 'Golf Course Extension Road', 'Sohna Road'],
    studentCount: '620',
    googleBusinessUrl: CONTACT_INFO.centers.gurugram.googleBusinessUrl,
    googleMapsUrl:
      'https://maps.google.com/?q=Cerebrum+Biology+Academy+Gurugram,+Haryana&ll=28.4295,77.0426&z=15',
    areaServed: [
      'Gurugram',
      'DLF Phase 1',
      'DLF Phase 2',
      'DLF Phase 3',
      'DLF Phase 4',
      'DLF Phase 5',
      'Golf Course Road',
      'Sohna Road',
      'Sector 14',
      'Sector 43',
      'Sector 51',
      'Sector 56',
      'Sector 57',
      'MG Road',
    ],
  },
  'south-extension': {
    name: 'Cerebrum Biology Academy - South Extension',
    address: 'D 35, South Extension Part 2, New Delhi',
    streetAddress: 'D 35, South Extension Part 2',
    addressLocality: 'South Extension',
    addressRegion: 'Delhi',
    postalCode: '110049',
    geo: { lat: '28.5725', lng: '77.2217' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
    image: 'https://cerebrumbiologyacademy.com/locations/south-extension-center.jpg',
    priceRange: '₹40,000 - ₹1,80,000',
    paymentMethods: ['Cash', 'UPI', 'Bank Transfer', 'EMI'],
    openingHours: { opens: '09:00', closes: '20:00' },
    nearbyLandmarks: ['South Extension Market', 'AIIMS Delhi', 'Lajpat Nagar'],
    studentCount: '780',
    googleBusinessUrl: CONTACT_INFO.centers.southExtension.googleBusinessUrl,
    googleMapsUrl:
      'https://maps.google.com/?q=Cerebrum+Biology+Academy+South+Extension,+Delhi&ll=28.5725,77.2217&z=15',
    areaServed: [
      'South Delhi',
      'South Extension',
      'Greater Kailash',
      'Hauz Khas',
      'Defence Colony',
      'Lajpat Nagar',
      'Saket',
      'Malviya Nagar',
    ],
  },
  'green-park': {
    name: 'Cerebrum Biology Academy - Green Park',
    address: 'B 113 FF Gulmohar Park, Green Park, New Delhi',
    streetAddress: 'B 113 FF Gulmohar Park',
    addressLocality: 'Green Park',
    addressRegion: 'Delhi',
    postalCode: '110049',
    geo: { lat: '28.5597', lng: '77.2089' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-green-park',
    image: 'https://cerebrumbiologyacademy.com/locations/green-park-center.jpg',
    priceRange: '₹40,000 - ₹1,80,000',
    paymentMethods: ['Cash', 'UPI', 'Bank Transfer', 'EMI'],
    openingHours: { opens: '09:00', closes: '20:00' },
    nearbyLandmarks: ['Green Park Metro Station', 'IIT Delhi', 'Hauz Khas'],
    studentCount: '720',
    googleBusinessUrl: CONTACT_INFO.centers.greenPark.googleBusinessUrl,
    googleMapsUrl:
      'https://maps.google.com/?q=Cerebrum+Biology+Academy+Green+Park,+Delhi&ll=28.5597,77.2089&z=15',
    areaServed: ['Green Park', 'Safdarjung', 'INA', 'RK Puram', 'Malviya Nagar', 'Vasant Kunj'],
  },
  faridabad: {
    name: 'Cerebrum Biology Academy - Faridabad',
    address: 'SCF-130, 2nd Floor, Above Union Bank, Huda Market, Sector 17, Faridabad',
    streetAddress: 'SCF-130, 2nd Floor, Above Union Bank, Huda Market, Sector 17',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121002',
    // geo comes from centerGeo('faridabad') → contactInfo.ts (28.4089,77.3178);
    // keep this in sync — a second pin here caused a 2.5km GEO contradiction.
    geo: { lat: '28.4089', lng: '77.3178' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
    image: 'https://cerebrumbiologyacademy.com/locations/faridabad-center.jpg',
    priceRange: '₹40,000 - ₹1,80,000',
    paymentMethods: ['Cash', 'UPI', 'Bank Transfer', 'EMI'],
    openingHours: { opens: '09:00', closes: '20:00' },
    nearbyLandmarks: ['HUDA Complex', 'Sector 17 Market', 'Mini Secretariat', 'Bata Chowk'],
    studentCount: '550',
    googleBusinessUrl: CONTACT_INFO.centers.faridabad.googleBusinessUrl,
    googleMapsUrl:
      'https://maps.google.com/?q=Cerebrum+Biology+Academy+Faridabad,+Haryana&ll=28.4089,77.3178&z=15',
    areaServed: [
      'Faridabad',
      'Sector 15',
      'Sector 16',
      'Sector 17',
      'Sector 18',
      'Sector 19',
      'Sector 20',
      'Sector 21',
      'NIT Faridabad',
      'Greater Faridabad',
      'Ballabgarh',
      'Surajkund',
    ],
  },
  // 'noida' removed 2026-06: contactInfo.ts declares Noida online-only
  // (isPhysicalCenter: false); emitting a street-address LocalBusiness for it
  // was a fake-location signal (GBP suspension-grade risk).
}

export function LocalBusinessSchema({ locationId }: LocalBusinessSchemaProps) {
  const location = locationData[locationId]
  const geo = centerGeo(locationId)
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${location.url}#localbusiness`,
    additionalType: 'EducationalOrganization',
    name: location.name,
    description: `Best NEET Biology Coaching in ${location.addressLocality}. Expert AIIMS faculty, 98% success rate. Live classes, comprehensive study material, and personalized attention for ${location.studentCount}+ students.`,
    url: location.url,
    telephone: location.phone,
    email: 'info@cerebrumbiologyacademy.com',
    image: location.image,
    logo: `${baseUrl}/logo.png`,
    priceRange: location.priceRange,
    currenciesAccepted: 'INR',
    paymentAccepted: location.paymentMethods.join(', '),
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    },
    hasMap: location.googleMapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: location.openingHours.opens,
        closes: location.openingHours.closes,
      },
    ],
    // Social profiles from the single NAP source of truth (CONTACT_INFO.social),
    // so every schema component points at the SAME real, resolving handles. The
    // per-centre GBP link is appended ONLY when it is a real, resolving URL —
    // the legacy `g.page/*` shortlinks are unconfigured/dead, and emitting a
    // non-resolving GBP URL is a negative trust signal. When the owner replaces
    // the shortlink with a verified Google Business Profile URL, it flows in.
    sameAs: [...Object.values(CONTACT_INFO.social), location.googleBusinessUrl].filter(
      (u) => typeof u === 'string' && !u.includes('g.page/')
    ),
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: 'AIIMS Delhi',
    },
    foundingDate: '2014',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 20,
    },
    // review/aggregateRating removed 2026-06: self-serving review markup on a
    // LocalBusiness about ourselves violates Google's review snippet policy
    // (reviews must come from real users and be visible on-page). Real reviews
    // belong on the Google Business Profile, not in our own schema.
    areaServed: location.areaServed.map((area: string) => ({
      '@type': 'City',
      name: area,
    })),
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'NEET Biology Coaching - Class 11',
          description: 'Complete NEET Biology foundation course for Class 11 students',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'NEET Biology Coaching - Class 12',
          description: 'Intensive NEET Biology course for Class 12 students',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'NEET Dropper Batch',
          description: 'Comprehensive 1-year NEET Biology course for droppers',
        },
      },
    ],
    knowsAbout: [
      'NEET Biology',
      'NCERT Biology',
      'Medical Entrance Exam Preparation',
      'Botany',
      'Zoology',
      'Human Physiology',
      'Genetics',
      'Ecology',
    ],
    slogan: 'Where Biology Becomes Your Strength',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: location.phone,
      contactType: 'Admissions',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
  }

  // Breadcrumb for location page
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${baseUrl}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: location.name.replace('Cerebrum Biology Academy - ', ''),
        item: location.url,
      },
    ],
  }

  // Place schema for better local SEO
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${location.url}#place`,
    name: location.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    },
    containedInPlace: {
      '@type': 'City',
      name: location.addressRegion === 'Delhi' ? 'Delhi' : location.addressLocality,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Library', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Digital Classrooms', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking Available', value: true },
    ],
  }

  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
    </>
  )
}

// Export all location schemas combined for locations page
export function AllLocationsSchema() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  // Only the 5 physical centres (Noida is online-only — no street-address Place).
  const locationIds: Array<'rohini' | 'gurugram' | 'south-extension' | 'green-park' | 'faridabad'> =
    ['rohini', 'gurugram', 'south-extension', 'green-park', 'faridabad']

  // Reference the single canonical #organization node (declared once in the root
  // layout via CerebrumOrgSchema) and only ADD the centre locations to it. We must
  // not re-declare conflicting Org identity props (name/description/founder/sameAs)
  // — that re-fragments the entity. Same @id => Google merges this location[] in.
  const organizationWithLocations = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/#organization`,
    location: locationIds.map((id) => {
      const loc = locationData[id]
      const geo = centerGeo(id)
      return {
        '@type': 'Place',
        name: loc.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: loc.streetAddress,
          addressLocality: loc.addressLocality,
          addressRegion: loc.addressRegion,
          postalCode: loc.postalCode,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geo.lat,
          longitude: geo.lng,
        },
        telephone: loc.phone,
      }
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationWithLocations) }}
    />
  )
}

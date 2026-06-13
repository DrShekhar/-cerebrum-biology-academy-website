// Server Component - no client-side interactivity needed
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'

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
    reviews: [
      {
        author: 'Ananya Sharma',
        rating: 5,
        date: '2024-09-15',
        body: 'Best biology coaching in Rohini! Dr. Shekhar Sir explains complex topics like Genetics and Human Physiology so clearly. Scored 680 in NEET 2024.',
      },
      {
        author: 'Rahul Verma',
        rating: 5,
        date: '2024-08-22',
        body: 'Joined Cerebrum Rohini center for dropper batch. The faculty is extremely supportive and test series is excellent. Improved my score by 120 marks.',
      },
      {
        author: 'Priya Gupta',
        rating: 5,
        date: '2024-07-10',
        body: 'Convenient location near DC Chowk metro. The classroom infrastructure is great and doubt sessions are very helpful.',
      },
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
      'https://maps.google.com/?q=Cerebrum+Biology+Academy+Gurugram,+Haryana&ll=28.4153,77.0499&z=15',
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
    reviews: [
      {
        author: 'Ishita Malhotra',
        rating: 5,
        date: '2024-09-01',
        body: 'Premium coaching center in Gurugram. State-of-the-art digital classrooms and personalized attention. Got AIR 3421 in NEET 2024!',
      },
      {
        author: 'Arjun Singh',
        rating: 5,
        date: '2024-08-15',
        body: 'The best NEET biology coaching in Gurgaon hands down. Dr. Shekhar sir makes Botany and Zoology so interesting. Worth every rupee.',
      },
      {
        author: 'Meera Kapoor',
        rating: 5,
        date: '2024-06-28',
        body: 'Modern infrastructure, AC classrooms, and excellent study material. The online doubt resolution is available even after class hours.',
      },
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
    reviews: [
      {
        author: 'Kavya Reddy',
        rating: 5,
        date: '2024-09-10',
        body: 'South Delhi students - this is the best NEET coaching near AIIMS! Faculty quality is unmatched. Cleared NEET with 695 marks.',
      },
      {
        author: 'Aditya Jain',
        rating: 5,
        date: '2024-08-05',
        body: 'Prime location, excellent teaching methodology. The NCERT-focused approach helped me score 340/360 in Biology.',
      },
      {
        author: 'Sneha Agarwal',
        rating: 5,
        date: '2024-07-20',
        body: 'Very accessible location in South Extension. The batch sizes are small which means personal attention for every student.',
      },
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
    reviews: [
      {
        author: 'Nisha Sharma',
        rating: 5,
        date: '2024-09-12',
        body: 'Excellent location near Green Park metro. Dr. Shekhar C Singh teaching methodology is amazing. Scored 685 in NEET 2024!',
      },
      {
        author: 'Karan Mehra',
        rating: 5,
        date: '2024-08-20',
        body: 'Best biology coaching in South Delhi. The faculty explains even the most complex topics with ease. Highly recommend!',
      },
      {
        author: 'Riya Bansal',
        rating: 5,
        date: '2024-07-15',
        body: 'Joined for NEET dropper batch. The personalized attention and test series helped me improve by 150 marks.',
      },
    ],
  },
  faridabad: {
    name: 'Cerebrum Biology Academy - Faridabad',
    address: 'SCF-130, 2nd Floor, Above Union Bank, Huda Market, Sector 17, Faridabad',
    streetAddress: 'SCF-130, 2nd Floor, Above Union Bank, Huda Market, Sector 17',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121002',
    geo: { lat: '28.3870', lng: '77.3070' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
    image: 'https://cerebrumbiologyacademy.com/locations/faridabad-center.jpg',
    priceRange: '₹40,000 - ₹1,80,000',
    paymentMethods: ['Cash', 'UPI', 'Bank Transfer', 'EMI'],
    openingHours: { opens: '09:00', closes: '20:00' },
    nearbyLandmarks: ['Sector 17 Market', 'NHPC Chowk', 'Faridabad Railway Station'],
    studentCount: '550',
    googleBusinessUrl: CONTACT_INFO.centers.faridabad.googleBusinessUrl,
    googleMapsUrl:
      'https://maps.google.com/?q=Cerebrum+Biology+Academy+Faridabad,+Haryana&ll=28.3870,77.3070&z=15',
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
    reviews: [
      {
        author: 'Rohan Yadav',
        rating: 5,
        date: '2024-09-05',
        body: 'Finally a quality NEET coaching in Faridabad! No need to travel to Delhi anymore. Dr. Shekhar sir teaching is exceptional.',
      },
      {
        author: 'Simran Kaur',
        rating: 5,
        date: '2024-08-18',
        body: 'Best biology coaching in Faridabad. The mock test series and analysis helped me identify my weak areas. Scored 660 in NEET.',
      },
      {
        author: 'Vikram Choudhary',
        rating: 5,
        date: '2024-07-02',
        body: 'Spacious classrooms, good library, and supportive faculty. The fees are also reasonable compared to Delhi coaching centers.',
      },
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
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
      location.googleBusinessUrl,
    ],
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

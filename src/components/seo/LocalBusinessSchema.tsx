// Server Component - no client-side interactivity needed
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface LocalBusinessSchemaProps {
  locationId: 'rohini' | 'gurugram' | 'south-extension' | 'green-park' | 'faridabad'
}

// Detailed location data with geo coordinates
const locationData = {
  rohini: {
    name: 'Cerebrum Biology Academy - Rohini',
    address: '211 Vikas Surya Tower, DC Chauk Sector 9',
    streetAddress: '211 Vikas Surya Tower, DC Chauk',
    addressLocality: 'Rohini',
    addressRegion: 'Delhi',
    postalCode: '110085',
    geo: { lat: '28.7143', lng: '77.1117' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-north-delhi',
    image: 'https://cerebrumbiologyacademy.com/locations/rohini-center.jpg',
    priceRange: '₹₹',
    nearbyLandmarks: ['DC Chauk Metro Station', 'Rohini Sector 9', 'Vikas Surya Mall'],
    studentCount: '850',
    googleBusinessUrl: CONTACT_INFO.centers.rohini.googleBusinessUrl,
    areaServed: [
      'Rohini',
      'Pitampura',
      'Shalimar Bagh',
      'Netaji Subhash Place',
      'North Delhi',
      'Ashok Vihar',
      'Prashant Vihar',
      'Paschim Vihar',
      'Rajouri Garden',
      'Punjabi Bagh',
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
        body: 'Convenient location near DC Chauk metro. The classroom infrastructure is great and doubt sessions are very helpful.',
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
    geo: { lat: '28.4153', lng: '77.0499' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
    image: 'https://cerebrumbiologyacademy.com/locations/gurugram-center.jpg',
    priceRange: '₹₹',
    nearbyLandmarks: ['Sector 51 Gurugram', 'Golf Course Extension Road', 'Sohna Road'],
    studentCount: '620',
    googleBusinessUrl: CONTACT_INFO.centers.gurugram.googleBusinessUrl,
    areaServed: [
      'Gurugram',
      'DLF Phase 1',
      'DLF Phase 4',
      'Golf Course Road',
      'Sushant Lok',
      'Sector 14',
      'Sector 43',
      'Sector 51',
      'Sector 56',
      'Sector 57',
      'South City',
      'New Gurugram',
      'Sohna Road',
      'Manesar',
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
    address: 'Block D, South Extension 2, New Delhi',
    streetAddress: 'Block D, South Extension Part 2',
    addressLocality: 'South Extension',
    addressRegion: 'Delhi',
    postalCode: '110049',
    geo: { lat: '28.5725', lng: '77.2217' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
    image: 'https://cerebrumbiologyacademy.com/locations/south-extension-center.jpg',
    priceRange: '₹₹',
    nearbyLandmarks: ['South Extension Market', 'AIIMS Delhi', 'Lajpat Nagar'],
    studentCount: '780',
    googleBusinessUrl: CONTACT_INFO.centers.southExtension.googleBusinessUrl,
    areaServed: [
      'South Extension',
      'South Delhi',
      'Greater Kailash',
      'Defence Colony',
      'Lajpat Nagar',
      'Saket',
      'Malviya Nagar',
      'Hauz Khas',
      'New Friends Colony',
      'Green Park',
      'Safdarjung',
      'Gulmohar Park',
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
    priceRange: '₹₹',
    nearbyLandmarks: ['Green Park Metro Station', 'IIT Delhi', 'Hauz Khas'],
    studentCount: '720',
    googleBusinessUrl: CONTACT_INFO.centers.greenPark.googleBusinessUrl,
    areaServed: [
      'Green Park',
      'Hauz Khas',
      'South Delhi',
      'Greater Kailash',
      'Defence Colony',
      'Lajpat Nagar',
      'Noida',
      'Greater Noida',
      'Ghaziabad',
      'Gulmohar Park',
      'Panchsheel Park',
      'Jor Bagh',
      'Kalu Sarai',
      'New Moti Bagh',
    ],
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
    address: 'Sector 17, Faridabad',
    streetAddress: 'Sector 17',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121002',
    geo: { lat: '28.3870', lng: '77.3070' },
    phone: CONTACT_INFO.phone.primary,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
    image: 'https://cerebrumbiologyacademy.com/locations/faridabad-center.jpg',
    priceRange: '₹₹',
    nearbyLandmarks: ['Sector 17 Market', 'NHPC Chowk', 'Faridabad Railway Station'],
    studentCount: '550',
    googleBusinessUrl: CONTACT_INFO.centers.faridabad.googleBusinessUrl,
    areaServed: [
      'Faridabad',
      'Palwal',
      'Ballabgarh',
      'NIT Faridabad',
      'Old Faridabad',
      'Greater Faridabad',
      'Sector 15-21',
      'BPTP Parklands',
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
}

export function LocalBusinessSchema({ locationId }: LocalBusinessSchemaProps) {
  const location = locationData[locationId]
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
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
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
      latitude: location.geo.lat,
      longitude: location.geo.lng,
    },
    hasMap: `https://www.google.com/maps?q=${location.geo.lat},${location.geo.lng}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '32',
      reviewCount: '32',
    },
    review: location.reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.body,
    })),
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
      latitude: location.geo.lat,
      longitude: location.geo.lng,
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

  const locationIds: Array<'rohini' | 'gurugram' | 'south-extension' | 'green-park' | 'faridabad'> =
    ['rohini', 'gurugram', 'south-extension', 'green-park', 'faridabad']

  const organizationWithLocations = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}#organization`,
    name: 'Cerebrum Biology Academy',
    description:
      'Best NEET Biology Coaching in Delhi NCR with 5 offline centers and pan-India online classes. Expert AIIMS faculty, 98% success rate.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    foundingDate: '2014',
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: 'AIIMS Delhi',
    },
    location: locationIds.map((id) => {
      const loc = locationData[id]
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
          latitude: loc.geo.lat,
          longitude: loc.geo.lng,
        },
        telephone: loc.phone,
      }
    }),
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationWithLocations) }}
    />
  )
}

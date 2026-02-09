import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Neeti Bagh | Elite South Delhi | Cerebrum Academy',
  description:
    'Exclusive NEET Biology coaching for Neeti Bagh students. Near Panchsheel & Andrews Ganj. AIIMS faculty, small batches, 98% success rate. Premium learning environment.',
  keywords: [
    'NEET coaching Neeti Bagh',
    'Biology tuition Neeti Bagh Delhi',
    'NEET Biology classes Neeti Bagh',
    'Biology coaching near Panchsheel',
    'NEET preparation Neeti Bagh',
    'Best Biology teacher Neeti Bagh',
    'Premium NEET coaching South Delhi',
    'Biology tutor Neeti Bagh',
    'NEET coaching Andrews Ganj',
    'Biology classes South Extension area',
    'Elite NEET coaching Delhi',
    'NEET Biology coaching fees Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Neeti Bagh | Cerebrum Academy',
    description:
      'Elite NEET Biology coaching for Neeti Bagh families. AIIMS faculty, personalized attention.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/locations/neeti-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/neeti-bagh',
  },
}

export default function NeetiBaghLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Neeti Bagh Students',
            description:
              'Elite NEET Biology coaching serving Neeti Bagh and Panchsheel area. 98% success rate, AIIMS faculty.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
              founder: {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
                honorificPrefix: 'Dr.',
                jobTitle: 'Founder & Head Faculty',
                alumniOf: 'AIIMS Delhi',
                knowsAbout: [
                  'NEET Biology',
                  'Human Physiology',
                  'Genetics',
                  'Cell Biology',
                  'Ecology',
                ],
              },
            },
            areaServed: [
              'Neeti Bagh',
              'Panchsheel Park',
              'Panchsheel Enclave',
              'Andrews Ganj',
              'South Extension',
              'Greater Kailash 1',
              'Chirag Delhi',
              'Kailash Colony',
            ],
            serviceType: 'NEET Biology Coaching',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '380',
              bestRating: '5',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Cerebrum Biology Academy - Neeti Bagh',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/neeti-bagh',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Neeti Bagh',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5598,
              'longitude': 77.2068,
            },
            'openingHoursSpecification': [
              {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                'opens': '08:00',
                'closes': '20:00',
              },
            ],
            'priceRange': '₹45,000 - ₹1,80,000',
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '485',
              'bestRating': '5',
            },
            'sameAs': [
              'https://www.youtube.com/@CerebrumBiologyAcademy',
              'https://www.instagram.com/cerebrumbiologyacademy/',
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

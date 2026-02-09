import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Safdarjung Enclave | Near AIIMS | Cerebrum Academy',
  description:
    'Expert NEET Biology coaching for Safdarjung Enclave students. Near AIIMS & Green Park. AIIMS faculty, small batches, 98% success rate. Medical aspirants welcome!',
  keywords: [
    'NEET coaching Safdarjung Enclave',
    'Biology tuition Safdarjung Enclave Delhi',
    'NEET Biology classes Safdarjung Enclave',
    'Biology coaching near AIIMS Delhi',
    'NEET preparation Safdarjung Enclave',
    'Best Biology teacher Safdarjung Enclave',
    'Premium NEET coaching South Delhi',
    'Biology tutor Safdarjung Enclave',
    'NEET coaching near Green Park',
    'Biology classes AIIMS area',
    'Medical entrance coaching Delhi',
    'NEET Biology coaching fees Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Safdarjung Enclave | Cerebrum Academy',
    description:
      'Expert NEET Biology coaching for Safdarjung Enclave families. Near AIIMS Delhi.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/locations/safdarjung-enclave',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/safdarjung-enclave',
  },
}

export default function SafdarjungEnclaveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Safdarjung Enclave Students',
            description:
              'Expert NEET Biology coaching serving Safdarjung Enclave near AIIMS Delhi. 98% success rate, AIIMS faculty.',
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
              'Safdarjung Enclave',
              'Green Park',
              'Hauz Khas',
              'SDA',
              'IIT Delhi Area',
              'Katwaria Sarai',
              'Yusuf Sarai',
              'Jia Sarai',
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
            'name': 'Cerebrum Biology Academy - Safdarjung Enclave',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/safdarjung-enclave',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Safdarjung Enclave',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5628,
              'longitude': 77.2032,
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

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Safdarjung Enclave | Near AIIMS',
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
    title: 'NEET Biology Coaching Safdarjung Enclave',
    description:
      'Expert NEET Biology coaching for Safdarjung Enclave families. Near AIIMS Delhi.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/locations/safdarjung-enclave',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Safdarjung Enclave | Near AIIMS',
    description: 'Expert NEET Biology coaching for Safdarjung Enclave students. Near AIIMS & Green Park.',
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
              ratingValue: '5.0',
              reviewCount: '38',
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
            'telephone': '+91-88264-44334',
            'email': 'info@cerebrumbiologyacademy.com',
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
              'ratingValue': '5.0',
              'reviewCount': '38',
              'bestRating': '5',
            },
            'sameAs': [
              'https://www.youtube.com/@CerebrumBiologyAcademy',
              'https://www.instagram.com/cerebrumbiologyacademy/',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How far is Cerebrum Academy from Safdarjung Enclave?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is just 10-12 minutes from Safdarjung Enclave. Our South Extension center is very close to this premium locality near AIIMS Delhi and Green Park, making it the most convenient option for Safdarjung Enclave students.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why should Safdarjung Enclave students choose Cerebrum Academy for NEET?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the best choice for Safdarjung Enclave students with AIIMS Delhi trained faculty, personalized attention in small batches, 98% success rate, and premium learning environment. Our center near AIIMS ensures expert guidance from medical professionals.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings for Safdarjung Enclave students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We operate Monday to Saturday from 8:00 AM to 8:00 PM with flexible batch options including morning, afternoon, and evening sessions. Safdarjung Enclave students can choose timings that work best for their schedule. Call +91-88264-44334 for batch details.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Safdarjung Enclave students reach our coaching center?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Safdarjung Enclave, students can reach our South Extension center easily via auto-rickshaw (10-12 minutes) or personal vehicle. The nearest metro station is Lajpat Nagar, which is a short walk from our center. The location is highly accessible for Safdarjung residents.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees for Safdarjung Enclave students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer customized packages and flexible payment plans for Safdarjung Enclave families. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for detailed fee structure.',
                },
              },
            ],
          }),
        }}
      />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Safdarjung Enclave', item: 'https://cerebrumbiologyacademy.com/locations/safdarjung-enclave' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

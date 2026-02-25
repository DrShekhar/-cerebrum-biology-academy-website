import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Golf Links | Ultra-Premium Delhi',
  description:
    'Exclusive NEET Biology coaching for Golf Links families. Elite locality near India Gate. AIIMS faculty, personalized attention, 98% success rate. Discrete, premium learning environment.',
  keywords: [
    'NEET coaching Golf Links',
    'Biology tuition Golf Links Delhi',
    'NEET Biology classes Golf Links',
    'Biology coaching near India Gate',
    'NEET preparation Golf Links',
    'Best Biology teacher Golf Links',
    'Premium NEET coaching Delhi',
    'Biology tutor Golf Links',
    'NEET coaching Lutyens Delhi',
    'Biology classes near Khan Market',
    'Elite NEET coaching Delhi',
    'NEET Biology coaching fees Delhi',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Golf Links | Ultra-Premium Delhi',
    description: 'Exclusive NEET Biology coaching for Golf Links families. Elite locality near India Gate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/golf-links',
  },
  openGraph: {
    title: 'NEET Biology Coaching Golf Links',
    description:
      'Exclusive NEET Biology coaching for Golf Links elite families. AIIMS faculty, premium facilities.',
    type: 'website',
  },
}

export default function GolfLinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Golf Links Students',
            description:
              'Exclusive NEET Biology coaching serving Golf Links and Lutyens Delhi elite families. 98% success rate, AIIMS faculty.',
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
              'Golf Links',
              'Jor Bagh',
              'Sundar Nagar',
              'Khan Market',
              'India Gate',
              'Lodhi Estate',
              'Prithviraj Road',
              'Amrita Shergill Marg',
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
            'name': 'Cerebrum Biology Academy - Golf Links',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/golf-links',
            'telephone': '+91-88264-44334',
            'email': 'info@cerebrumbiologyacademy.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Golf Links',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5965,
              'longitude': 77.2301,
            },
            'openingHoursSpecification': [
              {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                'opens': '00:00',
                'closes': '23:59',
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
                name: 'How far is Cerebrum Academy from Golf Links?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy is located in South Extension Part 2, New Delhi, very close to Golf Links area. Students from Golf Links, Khan Market, India Gate, and Lodhi Estate can reach our center within 10 minutes, making it the most convenient NEET coaching for elite central Delhi.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum the best premium NEET coaching for Golf Links?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum is the best premium NEET coaching for Golf Links families with AIIMS Delhi faculty, exclusive small batches of 15 students, personalized teaching, 98% success rate, and elite learning environment suitable for high-achiever students from ultra-premium Lutyens Delhi locations.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum for Golf Links students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center is open 24/7 with online classes available for students worldwide. We offer flexible batch timings including morning and evening batches suited for Golf Links students. Our personalized schedule accommodates busy families. Call +91-88264-44334 for exclusive timing options.',
                },
              },
              {
                '@type': 'Question',
                name: 'How to reach Cerebrum from Golf Links, Khan Market, or India Gate area?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our South Extension center is very close to Golf Links and can be reached easily by personal vehicle in 5-10 minutes. It is also accessible by metro and other transport. The discrete location in South Extension is ideal for Golf Links and Lutyens Delhi residents.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the fees for NEET coaching at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and course duration. We offer premium small batch options. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for customized pricing and special arrangements for Golf Links families.',
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
              { '@type': 'ListItem', position: 3, name: 'Golf Links', item: 'https://cerebrumbiologyacademy.com/locations/golf-links' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Shanti Niketan | Premium Delhi',
  description:
    'Premium NEET Biology coaching for Shanti Niketan families. Affluent locality near Chanakyapuri. AIIMS faculty, personalized attention, 98% success rate.',
  keywords: [
    'NEET coaching Shanti Niketan',
    'Biology tuition Shanti Niketan Delhi',
    'NEET Biology classes Shanti Niketan',
    'Biology coaching near Chanakyapuri',
    'NEET preparation Shanti Niketan',
    'Best Biology teacher Shanti Niketan',
    'Premium NEET coaching Delhi',
    'Biology tutor Shanti Niketan',
    'NEET coaching Diplomatic Enclave',
    'Biology classes West Delhi premium',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Shanti Niketan | Premium Delhi',
    description: 'Premium NEET Biology coaching for Shanti Niketan families. Affluent locality near Chanakyapuri.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/shanti-niketan',
  },
  openGraph: {
    title: 'NEET Biology Coaching Shanti Niketan',
    description:
      'Premium NEET Biology coaching for Shanti Niketan families. AIIMS faculty, personalized attention.',
    type: 'website',
  },
}

export default function ShantiNiketanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Shanti Niketan Students',
            description:
              'Premium NEET Biology coaching serving Shanti Niketan and nearby affluent areas. AIIMS faculty, 98% success rate.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Shanti Niketan',
              'Anand Niketan',
              'Chanakyapuri',
              'Vasant Vihar',
              'Westend',
              'Diplomatic Enclave',
            ],
            serviceType: 'NEET Biology Coaching',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Cerebrum Biology Academy - Shanti Niketan',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/shanti-niketan',
            'telephone': '+91-88264-44334',
            'email': 'info@cerebrumbiologyacademy.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Shanti Niketan',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5817,
              'longitude': 77.173,
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
                name: 'How far is Cerebrum Academy from Shanti Niketan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is approximately 15-20 minutes from Shanti Niketan. Our South Extension center is conveniently accessible from this premium diplomatic area near Chanakyapuri. We serve Shanti Niketan and nearby affluent localities with world-class coaching.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is Cerebrum Academy the best for NEET coaching in Shanti Niketan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy stands out for Shanti Niketan students with AIIMS Delhi trained faculty, premium learning environment, small personalized batches, 98% success rate, and individual mentoring. We match the high expectations of Shanti Niketan families with excellence.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum Academy for Shanti Niketan students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We operate open 24/7 with online classes available for students worldwide with flexible batch options including morning, afternoon, and evening sessions. Shanti Niketan students can choose timings that suit their schedule. Call +91-88264-44334 to book your preferred batch.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Shanti Niketan students reach our coaching center?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Shanti Niketan, students can reach our South Extension center via personal vehicle (15-20 minutes) or auto-rickshaw. Lajpat Nagar Metro Station is the nearest metro stop. The center is highly accessible for daily attendance from Shanti Niketan and diplomatic area.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees for Shanti Niketan students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer customized packages and flexible payment options for Shanti Niketan families. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for personalized fee consultation.',
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
              { '@type': 'ListItem', position: 3, name: 'Shanti Niketan', item: 'https://cerebrumbiologyacademy.com/locations/shanti-niketan' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

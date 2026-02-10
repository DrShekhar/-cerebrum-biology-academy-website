import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Westend | Near Vasant Vihar | Cerebrum Academy',
  description:
    'Premium NEET Biology coaching for Westend & Vasant Vihar students. Near DPS RK Puram. AIIMS faculty, small batches, 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching Westend',
    'Biology tuition Westend Delhi',
    'NEET Biology classes Westend',
    'Biology coaching near Vasant Vihar',
    'NEET preparation Westend',
    'Best Biology teacher Westend',
    'Premium NEET coaching South Delhi',
    'Biology tutor Westend',
    'NEET coaching near DPS RK Puram',
    'Biology classes Vasant Vihar area',
    'Elite NEET coaching Delhi',
    'NEET Biology coaching fees Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Westend | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Westend families. AIIMS faculty, near DPS RK Puram.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/locations/westend',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/westend',
  },
}

export default function WestendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Westend Students',
            description:
              'Premium NEET Biology coaching serving Westend and Vasant Vihar area. 98% success rate, AIIMS faculty.',
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
              'Westend',
              'Vasant Vihar',
              'RK Puram',
              'Munirka',
              'Vasant Kunj',
              'Shantipath',
              'Satya Niketan',
              'Moti Bagh',
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
            'name': 'Cerebrum Biology Academy - Westend',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/westend',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Westend',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5642,
              'longitude': 77.1589,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How close is Cerebrum Academy to Westend?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is approximately 12-18 minutes from Westend. Our South Extension center is conveniently accessible from Westend and Vasant Vihar, serving this affluent diplomatic area with world-class NEET coaching.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why should Westend students choose Cerebrum Academy for NEET preparation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the best choice for Westend students with AIIMS Delhi trained faculty, premium learning environment, small personalized batches, 98% success rate, and individual mentoring. We provide excellence matching the expectations of Westend families.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum Academy for Westend students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center operates Monday to Saturday from 8:00 AM to 8:00 PM with flexible batch options including morning, afternoon, and evening sessions. Westend students can choose timings that suit their schedule. Call +91-9870-424-442 to book your preferred batch.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Westend students reach Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Westend, students can reach our South Extension center via personal vehicle (12-18 minutes) or auto-rickshaw. The nearest metro station is Lajpat Nagar, which provides good connectivity. The center is easily accessible for daily attendance from Westend.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the fee structure for NEET coaching at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer customized packages and flexible payment options for Westend families. Contact cerebrumacademy@gmail.com or +91-9870-424-442 for detailed fee information.',
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
              { '@type': 'ListItem', position: 3, name: 'Westend', item: 'https://cerebrumbiologyacademy.com/locations/westend' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

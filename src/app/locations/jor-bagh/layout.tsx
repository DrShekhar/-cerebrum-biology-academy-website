import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Jor Bagh | Near Safdarjung',
  description:
    'Premium NEET Biology coaching for Jor Bagh students. Ultra-elite locality near Safdarjung Tomb, Lodhi Gardens. Expert AIIMS faculty, personalized attention.',
  keywords: [
    'NEET coaching Jor Bagh',
    'Biology tuition Jor Bagh',
    'NEET Biology classes Jor Bagh',
    'Biology coaching near Safdarjung',
    'NEET preparation Jor Bagh Delhi',
    'Best Biology teacher Jor Bagh',
    'NEET coaching near Lodhi Gardens',
    'Biology tutor Jor Bagh',
    'NEET Biology coaching Central Delhi',
    'Premium NEET coaching Delhi',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Jor Bagh | Near Safdarjung',
    description: 'Premium NEET Biology coaching for Jor Bagh students. Ultra-elite locality near Safdarjung Tomb, Lodhi Gardens.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/jor-bagh',
  },
  openGraph: {
    title: 'NEET Biology Coaching Jor Bagh',
    description:
      'Premium NEET Biology coaching for Jor Bagh students. Near Safdarjung, Lodhi Gardens.',
    type: 'website',
  },
}

export default function JorBaghLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Jor Bagh Students',
            description:
              'Premium NEET Biology coaching serving Jor Bagh and central Delhi elite localities.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Jor Bagh',
              'Lodhi Colony',
              'Safdarjung',
              'Sundar Nagar',
              'Khan Market',
              'Golf Links',
              'Prithviraj Road',
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
            'name': 'Cerebrum Biology Academy - Jor Bagh',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/jor-bagh',
            'telephone': '+91-88264-44334',
            'email': 'info@cerebrumbiologyacademy.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Jor Bagh',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5889,
              'longitude': 77.2233,
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
                name: 'How far is Cerebrum Academy from Jor Bagh?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy is located in South Extension Part 2, New Delhi, very close to Jor Bagh. Students from Jor Bagh can reach our center within 10 minutes by personal vehicle or metro, making it the most convenient premium NEET coaching for ultra-elite central Delhi residents.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum the best NEET coaching for Jor Bagh students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum is the best premium NEET coaching for Jor Bagh with AIIMS Delhi faculty, exclusive small batches of 15 students, personalized teaching, 98% success rate, and an elite learning environment suited for high-achiever families in ultra-premium Lodhi Colony and Jor Bagh areas.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum for Jor Bagh students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center is open 24/7 with online classes available for students worldwide with flexible batch timings. We customize schedules for Jor Bagh students with morning and evening options. Call +91-88264-44334 to arrange exclusive timings for your family.',
                },
              },
              {
                '@type': 'Question',
                name: 'How to reach Cerebrum from Jor Bagh near Safdarjung and Lodhi Gardens?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our South Extension center is very close to Jor Bagh, Safdarjung, and Lodhi Gardens. You can reach in 5-10 minutes by personal vehicle. The discrete location near South Extension is ideal for Jor Bagh and Lutyens Delhi families preferring privacy and convenience.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the fees for NEET coaching at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and course duration. We offer premium small batch options. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for exclusive pricing and special arrangements for Jor Bagh families.',
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
              { '@type': 'ListItem', position: 3, name: 'Jor Bagh', item: 'https://cerebrumbiologyacademy.com/locations/jor-bagh' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

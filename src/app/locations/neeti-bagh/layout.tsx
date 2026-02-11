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
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Neeti Bagh | Elite South Delhi | Cerebrum Academy',
    description: 'Exclusive NEET Biology coaching for Neeti Bagh students. Near Panchsheel & Andrews Ganj.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How far is Cerebrum Academy from Neeti Bagh?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is just 5-10 minutes from Neeti Bagh. Our main center is located at South Extension Part 2, very close to Panchsheel Park and Andrews Ganj. It is easily accessible from Neeti Bagh via short distance travel.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum Academy the best NEET coaching for Neeti Bagh students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the best choice for Neeti Bagh students because of our AIIMS Delhi trained faculty led by Dr. Shekhar C Singh, small personalized batches of 15 students, 98% success rate, and premium learning environment. We focus on conceptual clarity and provide individualized attention to every student.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum Academy for Neeti Bagh students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our coaching center operates Monday to Saturday, 8:00 AM to 8:00 PM. We offer flexible batch timings in the morning, afternoon, and evening to suit students from Neeti Bagh and nearby areas. Contact us at +91-9870-424-442 to know the best timing for your schedule.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Neeti Bagh students reach Cerebrum Academy using public transport?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Neeti Bagh, students can easily reach our South Extension center via auto-rickshaw (5-10 minutes) or personal vehicle. The area is well-connected by the metro system. Lajpat Nagar Metro Station is the nearest metro stop, from which the center is just a short walk away.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees at Cerebrum Academy for Neeti Bagh students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on the course duration and batch type. We offer flexible payment options and scholarships for deserving students. Call us at +91-9870-424-442 for detailed fee structure and personalized guidance.',
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
              { '@type': 'ListItem', position: 3, name: 'Neeti Bagh', item: 'https://cerebrumbiologyacademy.com/locations/neeti-bagh' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

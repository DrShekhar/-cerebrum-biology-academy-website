import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Maharani Bagh | Premium South Delhi | Cerebrum Academy',
  description:
    'Expert NEET Biology coaching for Maharani Bagh students. Near Sundar Nagar & Friends Colony. AIIMS faculty, small batches, 98% success rate. Book free demo today!',
  keywords: [
    'NEET coaching Maharani Bagh',
    'Biology tuition Maharani Bagh Delhi',
    'NEET Biology classes Maharani Bagh',
    'Biology coaching near Friends Colony',
    'NEET preparation Maharani Bagh',
    'Best Biology teacher Maharani Bagh',
    'Premium NEET coaching South Delhi',
    'Biology tutor Maharani Bagh',
    'NEET coaching near Ashram',
    'Biology classes Sundar Nagar area',
    'Elite NEET coaching Delhi',
    'NEET Biology coaching fees Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Maharani Bagh | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Maharani Bagh families. AIIMS faculty, personalized attention.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/locations/maharani-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/maharani-bagh',
  },
}

export default function MaharaniBaghLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Maharani Bagh Students',
            description:
              'Premium NEET Biology coaching serving Maharani Bagh and surrounding elite areas. 98% success rate, AIIMS faculty.',
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
              'Maharani Bagh',
              'Sundar Nagar',
              'Friends Colony East',
              'Friends Colony West',
              'Ashram',
              'Nizamuddin East',
              'Jangpura Extension',
              'New Friends Colony',
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
            'name': 'Cerebrum Biology Academy - Maharani Bagh',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/maharani-bagh',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Maharani Bagh',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5691,
              'longitude': 77.2548,
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
                name: 'How far is Cerebrum Academy from Maharani Bagh?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy is located in South Extension Part 2, New Delhi, very close to Maharani Bagh. Students from Maharani Bagh, Sundar Nagar, Friends Colony, and Ashram area can reach our center within 12 minutes, making it the most convenient NEET coaching for premium central Delhi.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is Cerebrum the best NEET coaching for Maharani Bagh students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum is the best NEET coaching for Maharani Bagh with AIIMS Delhi trained faculty, small batches of 15 students, 98% success rate, personalized teaching, and elite learning environment suited for high-achiever families in premium Maharani Bagh and surrounding elite areas.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum for Maharani Bagh students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum operates Monday to Saturday from 8:00 AM to 8:00 PM with flexible batch options. We offer morning, afternoon, and evening batches for Maharani Bagh students. Call +91-9870-424-442 to know current available batches and arrange timings.',
                },
              },
              {
                '@type': 'Question',
                name: 'How to reach Cerebrum from Maharani Bagh near Ashram?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our South Extension center is very close to Maharani Bagh and can be reached in 10-12 minutes by personal vehicle or auto. It is also accessible by metro and public transport. The convenient location near Ashram and Sundar Nagar makes it ideal for Maharani Bagh students.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the fees for NEET coaching at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and course duration. We offer flexible payment options and EMI. Contact cerebrumacademy@gmail.com or +91-9870-424-442 for customized pricing for Maharani Bagh families.',
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
              { '@type': 'ListItem', position: 3, name: 'Maharani Bagh', item: 'https://cerebrumbiologyacademy.com/locations/maharani-bagh' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

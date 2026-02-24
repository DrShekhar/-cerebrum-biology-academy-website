import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Anand Niketan | Near Diplomatic Enclave',
  description:
    'Premium NEET Biology coaching for Anand Niketan families. Near Diplomatic Enclave and Chanakyapuri. AIIMS faculty, small batches, 98% success rate.',
  keywords: [
    'NEET coaching Anand Niketan',
    'Biology tuition Anand Niketan Delhi',
    'NEET Biology classes Anand Niketan',
    'Biology coaching near Diplomatic Enclave',
    'NEET preparation Anand Niketan',
    'Best Biology teacher Anand Niketan',
    'Premium NEET coaching West Delhi',
    'Biology tutor Anand Niketan',
    'NEET coaching Chanakyapuri area',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Anand Niketan | Near Diplomatic Enclave',
    description: 'Premium NEET Biology coaching for Anand Niketan families. Near Diplomatic Enclave and Chanakyapuri.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/anand-niketan',
  },
  openGraph: {
    title: 'NEET Biology Coaching Anand Niketan',
    description:
      'Premium NEET Biology coaching for Anand Niketan families. AIIMS faculty, personalized attention.',
    type: 'website',
  },
}

export default function AnandNiketanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Anand Niketan Students',
            description:
              'Premium NEET Biology coaching serving Anand Niketan and nearby diplomatic areas. AIIMS faculty, 98% success rate.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Anand Niketan',
              'Shanti Niketan',
              'Chanakyapuri',
              'Vasant Vihar',
              'Diplomatic Enclave',
              'Moti Bagh',
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
            'name': 'Cerebrum Biology Academy - Anand Niketan',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/anand-niketan',
            'telephone': '+91-88264-44334',
            'email': 'info@cerebrumbiologyacademy.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Anand Niketan',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5789,
              'longitude': 77.1759,
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
                name: 'How far is Cerebrum Biology Academy from Anand Niketan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy main center is located in South Extension Part 2, New Delhi, just 8-10 minutes away from Anand Niketan. Our location near South Extension provides easy access for students from Diplomatic Enclave, Chanakyapuri, and surrounding areas.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum the best NEET coaching for Anand Niketan students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy is the best NEET coaching for Anand Niketan students because we have AIIMS Delhi trained faculty, small batch sizes of 15 students maximum, a 98% success rate, and personalized attention to every student. Our premium coaching environment suits the high-achiever students from elite localities like Anand Niketan.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings for Anand Niketan students at Cerebrum?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We offer flexible batch timings Monday to Saturday from 8:00 AM to 8:00 PM to accommodate students from Anand Niketan and surrounding areas. We have morning batches, afternoon batches, and evening batches available. Contact us at +91-88264-44334 for specific batch timings.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there metro access to reach Cerebrum from Anand Niketan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Cerebrum is well-connected by metro. From Anand Niketan, you can take the Blue Line or other metro options to reach South Extension area. Our center is also accessible by car, auto, and other modes of transport. It is a convenient location for students from Diplomatic Enclave and Chanakyapuri.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the fees for NEET coaching at Cerebrum Academy for Anand Niketan students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy offers NEET Biology coaching with fees ranging from Rs. 45,000 to Rs. 1,80,000 depending on the batch type, course duration, and study material provided. We offer flexible payment options including EMI. Contact us at info@cerebrumbiologyacademy.com or +91-88264-44334 for detailed fee structure.',
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
              { '@type': 'ListItem', position: 3, name: 'Anand Niketan', item: 'https://cerebrumbiologyacademy.com/locations/anand-niketan' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

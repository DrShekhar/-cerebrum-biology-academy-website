import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Saket | Near Select Citywalk | Cerebrum Academy',
  description:
    'Best NEET Biology coaching for Saket students. 10 min from Select Citywalk, near Max Hospital. Expert AIIMS faculty, small batches, 98% success rate. Free demo class.',
  keywords: [
    'NEET coaching Saket',
    'Biology tuition Saket',
    'NEET Biology classes Saket',
    'Biology coaching near Select Citywalk',
    'NEET coaching near Max Hospital Saket',
    'Best Biology teacher Saket',
    'NEET preparation Saket Delhi',
    'Biology classes Saket',
    'NEET coaching near Saket Metro',
    'Biology tutor Saket',
    'NEET Biology coaching South Delhi',
    'Medical coaching Saket',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Saket | Near Select Citywalk | Cerebrum Academy',
    description: 'Best NEET Biology coaching for Saket students. 10 min from Select Citywalk, near Max Hospital.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/saket',
  },
  openGraph: {
    title: 'NEET Biology Coaching Saket | Cerebrum Academy',
    description:
      'Expert NEET Biology coaching for Saket students. Near Select Citywalk, 10 min to South Extension center.',
    type: 'website',
  },
}

export default function SaketLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Saket Students',
            description:
              'Expert NEET Biology coaching serving Saket and nearby areas. Close to Select Citywalk and Max Hospital.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Saket',
              'Malviya Nagar',
              'Hauz Khas',
              'Pushp Vihar',
              'Mehrauli',
              'Qutub Institutional Area',
              'Vasant Kunj',
              'Munirka',
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
            'name': 'Cerebrum Biology Academy - Saket',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/saket',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Saket',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5222,
              'longitude': 77.2064,
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
                name: 'How far is Cerebrum Academy from Saket?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is approximately 10-15 minutes from Saket. Our South Extension center is easily accessible from Saket residents via Saket Metro Station and nearby roads. It is very convenient for students from Saket and Select Citywalk area.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum Academy the best NEET coaching choice for Saket students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the premier choice for Saket students with AIIMS Delhi trained faculty, small personalized batches, 98% success rate, and premium learning infrastructure. We provide individual mentoring and structured curriculum ensuring every Saket student achieves their NEET goals.',
                },
              },
              {
                '@type': 'Question',
                name: 'What batch timings are available at Cerebrum Academy for Saket students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center operates Monday to Saturday from 8:00 AM to 8:00 PM with multiple batch options. We offer morning, afternoon, and evening sessions to accommodate Saket students flexible schedules. Contact +91-9870-424-442 to book your preferred batch time.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Saket students reach Cerebrum Academy using metro?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Saket, students can take the metro to Saket Metro Station and reach our South Extension center in about 15 minutes via connecting auto or metro to Lajpat Nagar. Alternatively, personal vehicles and auto-rickshaws provide direct routes from Saket to our center.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the NEET coaching fee structure for Saket students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer flexible payment options and personalized packages for Saket students. Call cerebrumacademy@gmail.com or +91-9870-424-442 for detailed pricing information.',
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
              { '@type': 'ListItem', position: 3, name: 'Saket', item: 'https://cerebrumbiologyacademy.com/locations/saket' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

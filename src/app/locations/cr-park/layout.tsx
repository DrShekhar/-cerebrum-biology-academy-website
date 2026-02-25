import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching CR Park | Chittaranjan Park',
  description:
    'Best NEET Biology coaching for CR Park (Chittaranjan Park) students. Expert AIIMS faculty, small batches, 98% success rate. Serving Bengali community in South Delhi.',
  keywords: [
    'NEET coaching CR Park',
    'Biology tuition Chittaranjan Park',
    'NEET Biology classes CR Park',
    'Biology coaching CR Park Delhi',
    'NEET preparation CR Park',
    'Best Biology teacher CR Park',
    'NEET coaching near CR Park Market',
    'Biology tutor Chittaranjan Park',
    'NEET Biology coaching South Delhi',
    'Medical coaching CR Park',
    'NEET coaching Alaknanda',
    'Biology classes Kalkaji',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching CR Park | Chittaranjan Park',
    description: 'Best NEET Biology coaching for CR Park (Chittaranjan Park) students.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/cr-park',
  },
  openGraph: {
    title: 'NEET Biology Coaching CR Park',
    description:
      'Expert NEET Biology coaching for CR Park students. 15 min to South Extension center. Serving South Delhi Bengali community.',
    type: 'website',
  },
}

export default function CRParkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for CR Park Students',
            description:
              'Expert NEET Biology coaching serving Chittaranjan Park and nearby areas in South Delhi.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'CR Park',
              'Chittaranjan Park',
              'Alaknanda',
              'Kalkaji',
              'Greater Kailash',
              'Nehru Place',
              'East of Kailash',
              'Govindpuri',
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
            'name': 'Cerebrum Biology Academy - CR Park',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/cr-park',
            'telephone': '+91-88264-44334',
            'email': 'info@cerebrumbiologyacademy.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'CR Park',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5399,
              'longitude': 77.2482,
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
                name: 'How far is Cerebrum from CR Park (Chittaranjan Park)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy main center is in South Extension Part 2, New Delhi, just 15 minutes away from CR Park (Chittaranjan Park). The commute is convenient and accessible by metro, auto, and personal vehicles from CR Park.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is Cerebrum the best NEET coaching for CR Park students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum is the best NEET coaching for CR Park students because we offer AIIMS Delhi trained faculty, small batches of 15 students, 98% success rate, and specialized teaching methods. We understand the unique needs of the Bengali community and provide personalized attention to every student.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum for CR Park students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our batch timings are open 24/7 with online classes available for students worldwide. We offer multiple batches including morning, afternoon, and evening options to suit students from CR Park and surrounding areas like Alaknanda, Kalkaji, and Govindpuri. Contact us at +91-88264-44334 for details.',
                },
              },
              {
                '@type': 'Question',
                name: 'How to reach Cerebrum Academy from CR Park using metro?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From CR Park, you can take the nearest metro station and reach South Extension within 15-20 minutes. Our center is well-connected by public transport and is easily accessible. Students from CR Park, Alaknanda, and Govindpuri metro stations can reach us conveniently.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees at Cerebrum for CR Park students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on the batch type and course duration. We offer flexible payment options and EMI facilities. Email us at info@cerebrumbiologyacademy.com or call +91-88264-44334 for a detailed fee breakdown and discounts for CR Park students.',
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
              { '@type': 'ListItem', position: 3, name: 'CR Park', item: 'https://cerebrumbiologyacademy.com/locations/cr-park' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

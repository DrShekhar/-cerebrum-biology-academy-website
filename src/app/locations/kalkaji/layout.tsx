import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Kalkaji | Near Nehru Place | Cerebrum Academy',
  description:
    'Best NEET Biology coaching for Kalkaji students. Near Nehru Place, Govindpuri, Kalkaji Temple. Expert AIIMS faculty, small batches, 98% success rate.',
  keywords: [
    'NEET coaching Kalkaji',
    'Biology tuition Kalkaji',
    'NEET Biology classes Kalkaji',
    'Biology coaching near Nehru Place',
    'NEET preparation Kalkaji Delhi',
    'Best Biology teacher Kalkaji',
    'NEET coaching Govindpuri',
    'Biology tutor Kalkaji',
    'NEET coaching near Kalkaji Metro',
    'Biology classes Nehru Place',
    'NEET coaching Okhla',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/kalkaji',
  },
  openGraph: {
    title: 'NEET Biology Coaching Kalkaji | Cerebrum Academy',
    description:
      'Expert NEET Biology coaching for Kalkaji students. Near Nehru Place, convenient metro access.',
    type: 'website',
  },
}

export default function KalkajiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Kalkaji Students',
            description:
              'Expert NEET Biology coaching serving Kalkaji, Nehru Place, and nearby areas.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Kalkaji',
              'Nehru Place',
              'Govindpuri',
              'CR Park',
              'Okhla',
              'Greater Kailash',
              'East of Kailash',
              'Alaknanda',
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
            'name': 'Cerebrum Biology Academy - Kalkaji',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/kalkaji',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Kalkaji',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5345,
              'longitude': 77.2558,
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
                name: 'How close is Cerebrum Academy to Kalkaji?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy is located in South Extension Part 2, New Delhi, just 10-12 minutes away from Kalkaji. Our center is very convenient for students from Kalkaji, Nehru Place, Govindpuri, and Okhla areas, offering the most accessible premium NEET coaching in South Delhi.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is Cerebrum the best NEET coaching for Kalkaji students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum is the best NEET coaching for Kalkaji students with AIIMS Delhi trained faculty, small batches of 15 students, 98% success rate, personalized attention, and convenient location near Nehru Place. We specialize in coaching dedicated Kalkaji students targeting NEET success.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings for Kalkaji students at Cerebrum?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum operates Monday to Saturday from 8:00 AM to 8:00 PM with multiple batch options. We offer morning, afternoon, and evening batches suitable for Kalkaji students. Call +91-9870-424-442 to know current available batches for your schedule.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there metro access from Kalkaji to reach Cerebrum?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, from Kalkaji you can take the metro from Kalkaji Metro station to reach our South Extension center. The journey takes 10-12 minutes. Our center is also accessible by auto and personal vehicles. It is conveniently located near Nehru Place for Kalkaji students.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees at Cerebrum for Kalkaji students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and duration. We offer flexible EMI options for Kalkaji students. Contact cerebrumacademy@gmail.com or +91-9870-424-442 for detailed fee structure and special discounts.',
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
              { '@type': 'ListItem', position: 3, name: 'Kalkaji', item: 'https://cerebrumbiologyacademy.com/locations/kalkaji' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Malviya Nagar | Near Saket',
  description:
    'Best NEET Biology coaching for Malviya Nagar students. High student population area near Saket. AIIMS faculty, small batches, 98% success rate. Affordable fees with EMI options.',
  keywords: [
    'NEET coaching Malviya Nagar',
    'Biology tuition Malviya Nagar',
    'NEET Biology classes Malviya Nagar',
    'Biology coaching near Saket',
    'NEET preparation Malviya Nagar Delhi',
    'Best Biology teacher Malviya Nagar',
    'NEET coaching Hauz Khas',
    'Biology tutor Malviya Nagar',
    'NEET coaching near IIT Delhi',
    'Biology classes South Delhi',
    'NEET Biology coaching fees Delhi',
    'Affordable NEET coaching Delhi',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Malviya Nagar | Near Saket',
    description: 'Best NEET Biology coaching for Malviya Nagar students. High student population area near Saket.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/malviya-nagar',
  },
  openGraph: {
    title: 'NEET Biology Coaching Malviya Nagar',
    description:
      'Best NEET Biology coaching for Malviya Nagar students. Near Saket Metro, affordable fees.',
    type: 'website',
  },
}

export default function MalviyaNagarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Malviya Nagar Students',
            description:
              'Expert NEET Biology coaching serving Malviya Nagar and nearby areas. Affordable fees, AIIMS faculty, 98% success rate.',
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
              },
            },
            areaServed: [
              'Malviya Nagar',
              'Saket',
              'Hauz Khas',
              'Sarvapriya Vihar',
              'SDA',
              'Khirki Extension',
              'Sheikh Sarai',
              'Panchsheel Park',
            ],
            serviceType: 'NEET Biology Coaching',
            priceRange: '₹45,000 - ₹1,80,000',
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
            'name': 'Cerebrum Biology Academy - Malviya Nagar',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/malviya-nagar',
            'telephone': '+91-88264-44334',
            'email': 'info@cerebrumbiologyacademy.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Malviya Nagar',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5282,
              'longitude': 77.2095,
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
                name: 'How far is Cerebrum Academy from Malviya Nagar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy has a center very close to Malviya Nagar in Green Park area near Yellow Line Metro. Students from Malviya Nagar, Saket, Hauz Khas, and IIT Delhi can reach our Green Park center within 10-15 minutes, making it the most accessible NEET coaching for South Delhi students.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum the best NEET coaching for Malviya Nagar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum is the best NEET coaching for Malviya Nagar students with AIIMS Delhi trained faculty, small batches of 15 students, 98% success rate, personalized attention, nearby Green Park center, and affordable fees. We specialize in coaching high-density student population areas like Malviya Nagar.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum for Malviya Nagar students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum operates Monday to Saturday from 8:00 AM to 8:00 PM and Sunday from 9:00 AM to 6:00 PM. We offer multiple batch options including morning, afternoon, and evening batches. Call +91-88264-44334 for specific available timings for Malviya Nagar students.',
                },
              },
              {
                '@type': 'Question',
                name: 'How to reach Cerebrum from Malviya Nagar by metro?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our Green Park center is just 5 minutes from Green Park Metro station on the Yellow Line. From Malviya Nagar, you can reach via Saket Metro or take local transport to Green Park center. It is also accessible by personal vehicle and auto from Malviya Nagar.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees at Cerebrum for Malviya Nagar students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and duration. We offer affordable fees with flexible EMI options for Malviya Nagar students. Email info@cerebrumbiologyacademy.com or call +91-88264-44334 for detailed fee structure.',
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
              { '@type': 'ListItem', position: 3, name: 'Malviya Nagar', item: 'https://cerebrumbiologyacademy.com/locations/malviya-nagar' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

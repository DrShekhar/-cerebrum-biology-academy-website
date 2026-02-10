import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Sundar Nagar | Near Khan Market | Cerebrum Academy',
  description:
    'Premium NEET Biology coaching for Sundar Nagar students. Elite locality near Khan Market, art galleries. Expert AIIMS faculty, personalized coaching.',
  keywords: [
    'NEET coaching Sundar Nagar',
    'Biology tuition Sundar Nagar',
    'NEET Biology classes Sundar Nagar',
    'Biology coaching near Khan Market',
    'NEET preparation Sundar Nagar Delhi',
    'Best Biology teacher Sundar Nagar',
    'NEET coaching Nizamuddin',
    'Biology tutor Sundar Nagar',
    'Premium NEET coaching Delhi',
    'NEET coaching near India Gate',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/sundar-nagar',
  },
  openGraph: {
    title: 'NEET Biology Coaching Sundar Nagar | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Sundar Nagar students. Near Khan Market, India Gate.',
    type: 'website',
  },
}

export default function SundarNagarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Sundar Nagar Students',
            description:
              'Premium NEET Biology coaching serving Sundar Nagar and central Delhi elite localities.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Sundar Nagar',
              'Khan Market',
              'Nizamuddin',
              'Jor Bagh',
              'Golf Links',
              'Lodhi Colony',
              'Pandara Road',
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
            'name': 'Cerebrum Biology Academy - Sundar Nagar',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/sundar-nagar',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Sundar Nagar',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5955,
              'longitude': 77.238,
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
                name: 'How far is Cerebrum Academy from Sundar Nagar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is approximately 8-12 minutes from Sundar Nagar. Our South Extension center is very close to this elite central Delhi locality near Khan Market and India Gate. It is one of the most convenient locations for Sundar Nagar students.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is Cerebrum Academy the best NEET coaching for Sundar Nagar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the premier choice for Sundar Nagar students with AIIMS Delhi trained faculty, premium learning environment, small personalized batches, 98% success rate, and individual mentoring. We cater to the high standards expected by Sundar Nagar families.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum Academy for Sundar Nagar students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center operates Monday to Saturday from 8:00 AM to 8:00 PM with flexible batch options including morning, afternoon, and evening sessions. Sundar Nagar students can choose timings suitable for their schedule. Call +91-9870-424-442 for available batch timings.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Sundar Nagar students reach Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Sundar Nagar, students can reach our South Extension center via auto-rickshaw (8-12 minutes) or personal vehicle. The nearest metro station is Lajpat Nagar, which is a short walk from our center. The location is highly accessible for Sundar Nagar residents.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the NEET coaching fee structure at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer customized packages and flexible payment options for Sundar Nagar students. Contact cerebrumacademy@gmail.com or +91-9870-424-442 for personalized fee details.',
                },
              },
            ],
          }),
        }}
      />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Sundar Nagar', item: 'https://cerebrumbiologyacademy.com/locations/sundar-nagar' },
            ],
          }})
        }}
      />

      {children}
    </>
  )
}

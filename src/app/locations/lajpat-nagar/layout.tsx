import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Lajpat Nagar | Walking Distance',
  description:
    'Best NEET Biology coaching in Lajpat Nagar - walking distance from our flagship center. AIIMS faculty, small batches, 98% success rate. Most convenient location for South Delhi students.',
  keywords: [
    'NEET coaching Lajpat Nagar',
    'Biology tuition Lajpat Nagar',
    'NEET Biology classes Lajpat Nagar',
    'Biology coaching near Lajpat Nagar Metro',
    'NEET preparation Lajpat Nagar Delhi',
    'Best Biology teacher Lajpat Nagar',
    'NEET coaching Defence Colony',
    'Biology tutor Lajpat Nagar',
    'NEET coaching near Central Market',
    'Biology classes South Extension',
    'NEET Biology coaching fees Delhi',
    'Best NEET coaching near me',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Lajpat Nagar | Walking Distance',
    description: 'Best NEET Biology coaching in Lajpat Nagar - walking distance from our flagship center.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/lajpat-nagar',
  },
  openGraph: {
    title: 'NEET Biology Coaching Lajpat Nagar',
    description:
      'Best NEET Biology coaching in Lajpat Nagar. Walking distance from metro, affordable fees.',
    type: 'website',
  },
}

export default function LajpatNagarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Lajpat Nagar Students',
            description:
              'Expert NEET Biology coaching in Lajpat Nagar area. Walking distance from metro, AIIMS faculty, 98% success rate.',
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
              'Lajpat Nagar',
              'Defence Colony',
              'South Extension',
              'Jangpura',
              'Andrews Ganj',
              'Amar Colony',
              'Moolchand',
              'Bhogal',
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
            'name': 'Cerebrum Biology Academy - Lajpat Nagar',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/lajpat-nagar',
            'telephone': '+91-88264-44334',
            'email': 'info@cerebrumbiologyacademy.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Lajpat Nagar',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5685,
              'longitude': 77.2373,
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
                name: 'How close is Cerebrum Academy to Lajpat Nagar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy is located in South Extension Part 2, New Delhi, walking distance from Lajpat Nagar. Our flagship center is just 2-3 minutes away from Lajpat Nagar Central Market and Lajpat Nagar Metro station, making it the most convenient NEET coaching center for Lajpat Nagar students.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum the best NEET coaching for Lajpat Nagar students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum is the best NEET coaching for Lajpat Nagar with AIIMS Delhi faculty, small batches of 15 students, 98% success rate, personalized attention, and walking distance accessibility. Our location at South Extension is unmatched for Lajpat Nagar and Defence Colony students.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum for Lajpat Nagar students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum operates Monday to Saturday from 8:00 AM to 8:00 PM with multiple batch options. We offer morning, afternoon, and evening batches for Lajpat Nagar students. Call +91-88264-44334 to know current available batches and customize timings.',
                },
              },
              {
                '@type': 'Question',
                name: 'How to reach Cerebrum from Lajpat Nagar by metro?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Lajpat Nagar Metro station (Yellow and Pink Lines), Cerebrum is just 2-3 minutes walk away. This makes it the most metro-accessible NEET center for Lajpat Nagar, Defence Colony, and South Extension students. No commute hassle or travel time needed.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees at Cerebrum for Lajpat Nagar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and course duration. We offer flexible EMI options for Lajpat Nagar students. Email info@cerebrumbiologyacademy.com or call +91-88264-44334 for detailed fee structure and special offers.',
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
              { '@type': 'ListItem', position: 3, name: 'Lajpat Nagar', item: 'https://cerebrumbiologyacademy.com/locations/lajpat-nagar' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}

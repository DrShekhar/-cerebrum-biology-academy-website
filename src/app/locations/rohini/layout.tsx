import { Metadata } from 'next'

function RohiniServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/locations/rohini',
    name: 'Cerebrum Biology Academy - Rohini',
    description:
      'NEET Biology coaching center in Rohini, Delhi at DC Chowk. AIIMS faculty, small batches, near Rohini West Metro. Best Biology coaching in North Delhi.',
    image: 'https://cerebrumbiologyacademy.com/images/rohini-center.jpg',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
      addressLocality: 'Rohini, Delhi',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.7041,
      longitude: 77.1025,
    },
    url: 'https://cerebrumbiologyacademy.com/locations/rohini',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '850',
    },
    areaServed: [
      'Rohini',
      'Pitampura',
      'Shalimar Bagh',
      'Paschim Vihar',
      'Punjabi Bagh',
      'Model Town',
      'Ashok Vihar',
      'GTB Nagar',
      'Mukherjee Nagar',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Rohini Delhi | DC Chowk | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Rohini at DC Chowk. 211 Vikas Surya Tower, near Rohini West Metro. AIIMS faculty, small batches, 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching Rohini',
    'NEET coaching DC Chowk',
    'Biology coaching Rohini',
    'NEET preparation North Delhi',
    'Best Biology teacher Rohini',
    'NEET classes Pitampura',
    'Biology tuition Shalimar Bagh',
    'NEET coaching near Rohini West Metro',
    'Vikas Surya Tower coaching',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Rohini Delhi | DC Chowk Center',
    description:
      'Premium NEET Biology coaching at DC Chowk, Rohini. Near Rohini West Metro. Small batches, AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/rohini',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/rohini',
  },
}

export default function RohiniLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RohiniServiceSchema />
      {children}
    </>
  )
}

import { Metadata } from 'next'

function GreenParkServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/locations/green-park',
    name: 'Cerebrum Biology Academy - Green Park',
    description:
      'NEET Biology coaching center in Green Park, Delhi. Near Yellow Line Metro, Hauz Khas, IIT Delhi. AIIMS faculty, small batches, weekend batches available.',
    image: 'https://cerebrumbiologyacademy.com/images/green-park-center.jpg',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Green Park Main',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110016',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.56,
      longitude: 77.209,
    },
    url: 'https://cerebrumbiologyacademy.com/locations/green-park',
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
      reviewCount: '650',
    },
    areaServed: [
      'Green Park',
      'Hauz Khas',
      'IIT Delhi',
      'Safdarjung',
      'Malviya Nagar',
      'Saket',
      'Panchsheel',
      'SDA',
      'Munirka',
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
  title: 'NEET Biology Coaching Green Park Delhi | Near Hauz Khas | Cerebrum',
  description:
    'NEET Biology coaching in Green Park, Delhi. Near Green Park Metro (Yellow Line), Hauz Khas, IIT Delhi. AIIMS faculty, small batches, weekend batches. Book free demo!',
  keywords: [
    'NEET coaching Green Park',
    'NEET coaching Hauz Khas',
    'Biology coaching Green Park Delhi',
    'NEET preparation near IIT Delhi',
    'Best Biology teacher Green Park',
    'NEET classes Safdarjung',
    'Biology tuition Malviya Nagar',
    'NEET coaching near Green Park Metro',
    'Weekend NEET classes Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Green Park Delhi | Near Hauz Khas',
    description:
      'Premium NEET Biology coaching in Green Park. Near Yellow Line Metro, Hauz Khas. Small batches, AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/green-park',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/green-park',
  },
}

export default function GreenParkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GreenParkServiceSchema />
      {children}
    </>
  )
}

import { Metadata } from 'next'

function SouthExtensionServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/locations/south-extension',
    name: 'Cerebrum Biology Academy - South Extension (Flagship)',
    description:
      'Flagship NEET Biology coaching center in South Extension, Delhi. AIIMS faculty, small batches, near Lajpat Nagar Metro. Dr. Shekhar personally conducts classes.',
    image: 'https://cerebrumbiologyacademy.com/images/south-extension-center.jpg',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Block D, South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5678,
      longitude: 77.2234,
    },
    url: 'https://cerebrumbiologyacademy.com/locations/south-extension',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
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
      reviewCount: '2500',
    },
    areaServed: [
      'South Extension',
      'Lajpat Nagar',
      'Greater Kailash',
      'GK 1',
      'GK 2',
      'Defence Colony',
      'Kalkaji',
      'CR Park',
      'AIIMS',
      'Green Park',
      'Hauz Khas',
      'Malviya Nagar',
      'Saket',
      'Gulmohar Park',
      'Panchsheel Park',
      'Panchsheel Enclave',
      'Safdarjung Enclave',
      'SDA',
      'Vasant Vihar',
      'Shanti Niketan',
      'Anand Lok',
      'Jor Bagh',
      'Sundar Nagar',
      'New Friends Colony',
      'Friends Colony East',
      'Friends Colony West',
      'Maharani Bagh',
      'Kailash Colony',
      'East of Kailash',
      'Nehru Place',
      'Moolchand',
      'Jangpura',
      'Vasant Kunj',
      'Chirag Delhi',
      'Chirag Enclave',
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export const metadata: Metadata = {
  title: 'NEET Biology Coaching South Extension Delhi | Flagship Center | Cerebrum',
  description:
    'Cerebrum Biology Academy flagship center in South Extension Part 2, Delhi. AIIMS faculty led by Dr. Shekhar. Near Lajpat Nagar Metro. Small batches, 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching South Extension',
    'NEET coaching Lajpat Nagar',
    'NEET Biology classes South Delhi',
    'Biology coaching near AIIMS',
    'NEET preparation South Extension',
    'Best Biology teacher South Delhi',
    'NEET coaching Defence Colony',
    'Biology tuition Greater Kailash',
    'NEET classes near Lajpat Nagar Metro',
  ],
  openGraph: {
    title: 'NEET Biology Coaching South Extension Delhi | Flagship Center',
    description:
      'Our flagship center near AIIMS where Dr. Shekhar personally teaches. Small batches, AIIMS faculty, 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/south-extension',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/south-extension',
  },
}

export default function SouthExtensionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SouthExtensionServiceSchema />
      {children}
    </>
  )
}

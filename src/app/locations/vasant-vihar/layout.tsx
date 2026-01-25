import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Vasant Vihar | IB Biology Tutor | Cerebrum',
  description:
    'Best NEET Biology & IB Biology coaching for Vasant Vihar students. Near diplomatic area, international schools. AIIMS faculty, small batches. South Extension center 10 min away. Book demo!',
  keywords: [
    'NEET coaching Vasant Vihar',
    'Biology coaching Vasant Vihar',
    'IB Biology tutor Vasant Vihar',
    'IGCSE Biology coaching Vasant Vihar',
    'NEET Biology classes Vasant Vihar',
    'Biology tuition Vasant Vihar',
    'Best Biology teacher Vasant Vihar',
    'NEET preparation Vasant Vihar',
    'Medical coaching Vasant Vihar',
    'Biology tutor near Vasant Vihar',
  ],
  openGraph: {
    title: 'NEET & IB Biology Coaching for Vasant Vihar Students',
    description:
      'Expert NEET and IB Biology coaching for Vasant Vihar residents. Join our South Extension flagship center.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/vasant-vihar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/vasant-vihar',
  },
}

function VasantViharSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET & IB Biology Coaching for Vasant Vihar Students',
    description:
      'Premium NEET and IB Biology coaching for students from Vasant Vihar, Chanakyapuri, and diplomatic area. Expert faculty from AIIMS.',
    url: 'https://cerebrumbiologyacademy.com/locations/vasant-vihar',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Vasant Vihar',
      'Chanakyapuri',
      'Shanti Niketan',
      'Westend',
      'Anand Niketan',
      'Diplomatic Enclave',
      'RK Puram',
      'Munirka',
      'JNU',
    ],
    serviceType: ['NEET Biology Coaching', 'IB Biology Tutoring', 'IGCSE Biology Coaching'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '250',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function VasantViharLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VasantViharSchema />
      {children}
    </>
  )
}

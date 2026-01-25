import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Panchsheel Park & Enclave | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching for Panchsheel Park & Panchsheel Enclave students. Diplomat area, premium locality. AIIMS faculty, small batches. Book free demo!',
  keywords: [
    'NEET coaching Panchsheel Park',
    'NEET coaching Panchsheel Enclave',
    'Biology coaching Panchsheel',
    'NEET Biology classes Panchsheel Park',
    'Biology tuition Panchsheel Enclave',
    'Best Biology teacher Panchsheel',
    'NEET preparation Panchsheel',
    'Medical coaching Panchsheel Park',
    'Biology tutor near Panchsheel',
    'NEET classes Chirag Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Panchsheel Students',
    description:
      'Expert NEET Biology coaching for Panchsheel Park and Enclave residents. Premium coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/panchsheel',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/panchsheel',
  },
}

function PanchsheelSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Panchsheel Students',
    description:
      'Premium NEET Biology coaching for students from Panchsheel Park and Panchsheel Enclave. Expert AIIMS faculty, personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/locations/panchsheel',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Panchsheel Park',
      'Panchsheel Enclave',
      'Chirag Delhi',
      'Sheikh Sarai',
      'Greater Kailash',
      'Hauz Khas',
      'Malviya Nagar',
    ],
    serviceType: 'NEET Biology Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '220',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function PanchsheelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PanchsheelSchema />
      {children}
    </>
  )
}

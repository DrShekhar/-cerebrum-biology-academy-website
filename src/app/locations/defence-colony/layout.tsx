import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Defence Colony Delhi | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching for Defence Colony students. AIIMS faculty, small batches, 98% success rate. Near Lajpat Nagar Metro. South Extension center 3 min away. Book free demo!',
  keywords: [
    'NEET coaching Defence Colony',
    'Biology coaching Defence Colony',
    'NEET Biology classes Defence Colony',
    'Biology tuition Defence Colony',
    'Best Biology teacher Defence Colony',
    'NEET preparation Defence Colony',
    'Medical coaching Defence Colony',
    'Biology tutor near Defence Colony',
    'CBSE Biology coaching Defence Colony',
    'ICSE Biology tuition Defence Colony',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Defence Colony Students',
    description:
      'Expert NEET Biology coaching for Defence Colony residents. Join our flagship South Extension center, just 3 min away.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
  },
}

function DefenceColonySchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Defence Colony Students',
    description:
      'Premium NEET Biology coaching for students from Defence Colony and Lajpat Nagar area. Expert AIIMS faculty, personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Defence Colony',
      'Lajpat Nagar',
      'Jangpura',
      'Nizamuddin',
      'Andrews Ganj',
      'Amar Colony',
      'Moolchand',
    ],
    serviceType: 'NEET Biology Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '380',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function DefenceColonyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefenceColonySchema />
      {children}
    </>
  )
}

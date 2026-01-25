import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Maharani Bagh | Premium South Delhi | Cerebrum Academy',
  description:
    'Expert NEET Biology coaching for Maharani Bagh students. Near Sundar Nagar & Friends Colony. AIIMS faculty, small batches, 98% success rate. Book free demo today!',
  keywords: [
    'NEET coaching Maharani Bagh',
    'Biology tuition Maharani Bagh Delhi',
    'NEET Biology classes Maharani Bagh',
    'Biology coaching near Friends Colony',
    'NEET preparation Maharani Bagh',
    'Best Biology teacher Maharani Bagh',
    'Premium NEET coaching South Delhi',
    'Biology tutor Maharani Bagh',
    'NEET coaching near Ashram',
    'Biology classes Sundar Nagar area',
    'Elite NEET coaching Delhi',
    'NEET Biology coaching fees Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Maharani Bagh | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Maharani Bagh families. AIIMS faculty, personalized attention.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/locations/maharani-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/maharani-bagh',
  },
}

export default function MaharaniBaghLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Maharani Bagh Students',
            description:
              'Premium NEET Biology coaching serving Maharani Bagh and surrounding elite areas. 98% success rate, AIIMS faculty.',
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
                knowsAbout: [
                  'NEET Biology',
                  'Human Physiology',
                  'Genetics',
                  'Cell Biology',
                  'Ecology',
                ],
              },
            },
            areaServed: [
              'Maharani Bagh',
              'Sundar Nagar',
              'Friends Colony East',
              'Friends Colony West',
              'Ashram',
              'Nizamuddin East',
              'Jangpura Extension',
              'New Friends Colony',
            ],
            serviceType: 'NEET Biology Coaching',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '380',
              bestRating: '5',
            },
          }),
        }}
      />
      {children}
    </>
  )
}

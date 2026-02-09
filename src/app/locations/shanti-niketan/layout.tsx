import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Shanti Niketan | Premium Delhi | Cerebrum Academy',
  description:
    'Premium NEET Biology coaching for Shanti Niketan families. Affluent locality near Chanakyapuri. AIIMS faculty, personalized attention, 98% success rate.',
  keywords: [
    'NEET coaching Shanti Niketan',
    'Biology tuition Shanti Niketan Delhi',
    'NEET Biology classes Shanti Niketan',
    'Biology coaching near Chanakyapuri',
    'NEET preparation Shanti Niketan',
    'Best Biology teacher Shanti Niketan',
    'Premium NEET coaching Delhi',
    'Biology tutor Shanti Niketan',
    'NEET coaching Diplomatic Enclave',
    'Biology classes West Delhi premium',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/shanti-niketan',
  },
  openGraph: {
    title: 'NEET Biology Coaching Shanti Niketan | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Shanti Niketan families. AIIMS faculty, personalized attention.',
    type: 'website',
  },
}

export default function ShantiNiketanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Shanti Niketan Students',
            description:
              'Premium NEET Biology coaching serving Shanti Niketan and nearby affluent areas. AIIMS faculty, 98% success rate.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Shanti Niketan',
              'Anand Niketan',
              'Chanakyapuri',
              'Vasant Vihar',
              'Westend',
              'Diplomatic Enclave',
            ],
            serviceType: 'NEET Biology Coaching',
          }),
        }}
      />
      {children}
    </>
  )
}

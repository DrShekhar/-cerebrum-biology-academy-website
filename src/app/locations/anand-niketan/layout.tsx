import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Anand Niketan | Near Diplomatic Enclave | Cerebrum Academy',
  description:
    'Premium NEET Biology coaching for Anand Niketan families. Near Diplomatic Enclave and Chanakyapuri. AIIMS faculty, small batches, 98% success rate.',
  keywords: [
    'NEET coaching Anand Niketan',
    'Biology tuition Anand Niketan Delhi',
    'NEET Biology classes Anand Niketan',
    'Biology coaching near Diplomatic Enclave',
    'NEET preparation Anand Niketan',
    'Best Biology teacher Anand Niketan',
    'Premium NEET coaching West Delhi',
    'Biology tutor Anand Niketan',
    'NEET coaching Chanakyapuri area',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Anand Niketan | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Anand Niketan families. AIIMS faculty, personalized attention.',
    type: 'website',
  },
}

export default function AnandNiketanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Anand Niketan Students',
            description:
              'Premium NEET Biology coaching serving Anand Niketan and nearby diplomatic areas. AIIMS faculty, 98% success rate.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Anand Niketan',
              'Shanti Niketan',
              'Chanakyapuri',
              'Vasant Vihar',
              'Diplomatic Enclave',
              'Moti Bagh',
            ],
            serviceType: 'NEET Biology Coaching',
          }),
        }}
      />
      {children}
    </>
  )
}

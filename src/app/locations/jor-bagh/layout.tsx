import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Jor Bagh | Near Safdarjung | Cerebrum Academy',
  description:
    'Premium NEET Biology coaching for Jor Bagh students. Ultra-elite locality near Safdarjung Tomb, Lodhi Gardens. Expert AIIMS faculty, personalized attention.',
  keywords: [
    'NEET coaching Jor Bagh',
    'Biology tuition Jor Bagh',
    'NEET Biology classes Jor Bagh',
    'Biology coaching near Safdarjung',
    'NEET preparation Jor Bagh Delhi',
    'Best Biology teacher Jor Bagh',
    'NEET coaching near Lodhi Gardens',
    'Biology tutor Jor Bagh',
    'NEET Biology coaching Central Delhi',
    'Premium NEET coaching Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Jor Bagh | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Jor Bagh students. Near Safdarjung, Lodhi Gardens.',
    type: 'website',
  },
}

export default function JorBaghLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Jor Bagh Students',
            description:
              'Premium NEET Biology coaching serving Jor Bagh and central Delhi elite localities.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Jor Bagh',
              'Lodhi Colony',
              'Safdarjung',
              'Sundar Nagar',
              'Khan Market',
              'Golf Links',
              'Prithviraj Road',
            ],
            serviceType: 'NEET Biology Coaching',
          }),
        }}
      />
      {children}
    </>
  )
}

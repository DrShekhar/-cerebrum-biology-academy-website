import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Sundar Nagar | Near Khan Market | Cerebrum Academy',
  description:
    'Premium NEET Biology coaching for Sundar Nagar students. Elite locality near Khan Market, art galleries. Expert AIIMS faculty, personalized coaching.',
  keywords: [
    'NEET coaching Sundar Nagar',
    'Biology tuition Sundar Nagar',
    'NEET Biology classes Sundar Nagar',
    'Biology coaching near Khan Market',
    'NEET preparation Sundar Nagar Delhi',
    'Best Biology teacher Sundar Nagar',
    'NEET coaching Nizamuddin',
    'Biology tutor Sundar Nagar',
    'Premium NEET coaching Delhi',
    'NEET coaching near India Gate',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Sundar Nagar | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Sundar Nagar students. Near Khan Market, India Gate.',
    type: 'website',
  },
}

export default function SundarNagarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Sundar Nagar Students',
            description:
              'Premium NEET Biology coaching serving Sundar Nagar and central Delhi elite localities.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Sundar Nagar',
              'Khan Market',
              'Nizamuddin',
              'Jor Bagh',
              'Golf Links',
              'Lodhi Colony',
              'Pandara Road',
            ],
            serviceType: 'NEET Biology Coaching',
          }),
        }}
      />
      {children}
    </>
  )
}

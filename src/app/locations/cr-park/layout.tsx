import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching CR Park | Chittaranjan Park | Cerebrum Academy',
  description:
    'Best NEET Biology coaching for CR Park (Chittaranjan Park) students. Expert AIIMS faculty, small batches, 98% success rate. Serving Bengali community in South Delhi.',
  keywords: [
    'NEET coaching CR Park',
    'Biology tuition Chittaranjan Park',
    'NEET Biology classes CR Park',
    'Biology coaching CR Park Delhi',
    'NEET preparation CR Park',
    'Best Biology teacher CR Park',
    'NEET coaching near CR Park Market',
    'Biology tutor Chittaranjan Park',
    'NEET Biology coaching South Delhi',
    'Medical coaching CR Park',
    'NEET coaching Alaknanda',
    'Biology classes Kalkaji',
  ],
  openGraph: {
    title: 'NEET Biology Coaching CR Park | Cerebrum Academy',
    description:
      'Expert NEET Biology coaching for CR Park students. 15 min to South Extension center. Serving South Delhi Bengali community.',
    type: 'website',
  },
}

export default function CRParkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for CR Park Students',
            description:
              'Expert NEET Biology coaching serving Chittaranjan Park and nearby areas in South Delhi.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'CR Park',
              'Chittaranjan Park',
              'Alaknanda',
              'Kalkaji',
              'Greater Kailash',
              'Nehru Place',
              'East of Kailash',
              'Govindpuri',
            ],
            serviceType: 'NEET Biology Coaching',
          }),
        }}
      />
      {children}
    </>
  )
}

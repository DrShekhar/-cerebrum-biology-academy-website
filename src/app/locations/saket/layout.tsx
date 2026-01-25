import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Saket | Near Select Citywalk | Cerebrum Academy',
  description:
    'Best NEET Biology coaching for Saket students. 10 min from Select Citywalk, near Max Hospital. Expert AIIMS faculty, small batches, 98% success rate. Free demo class.',
  keywords: [
    'NEET coaching Saket',
    'Biology tuition Saket',
    'NEET Biology classes Saket',
    'Biology coaching near Select Citywalk',
    'NEET coaching near Max Hospital Saket',
    'Best Biology teacher Saket',
    'NEET preparation Saket Delhi',
    'Biology classes Saket',
    'NEET coaching near Saket Metro',
    'Biology tutor Saket',
    'NEET Biology coaching South Delhi',
    'Medical coaching Saket',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Saket | Cerebrum Academy',
    description:
      'Expert NEET Biology coaching for Saket students. Near Select Citywalk, 10 min to South Extension center.',
    type: 'website',
  },
}

export default function SaketLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Saket Students',
            description:
              'Expert NEET Biology coaching serving Saket and nearby areas. Close to Select Citywalk and Max Hospital.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Saket',
              'Malviya Nagar',
              'Hauz Khas',
              'Pushp Vihar',
              'Mehrauli',
              'Qutub Institutional Area',
              'Vasant Kunj',
              'Munirka',
            ],
            serviceType: 'NEET Biology Coaching',
          }),
        }}
      />
      {children}
    </>
  )
}

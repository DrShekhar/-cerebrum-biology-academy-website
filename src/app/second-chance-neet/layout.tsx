import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Failed NEET 2024? 90% Success Rate in Second Attempt | Cerebrum Biology',
  description:
    'Specialized NEET Biology coaching for repeaters by AIIMS faculty. 90% of our students clear NEET in second attempt. Small batches, personal attention, emotional support.',
  keywords: [
    'NEET repeater',
    'failed NEET 2024',
    'second attempt NEET',
    'Biology coaching',
    'AIIMS faculty',
    'medical college admission',
    'NEET dropper course',
    'NEET 2nd attempt',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Failed NEET 2024? 90% Success Rate in Second Attempt',
    description:
      'Transform your NEET failure into medical college success. Specialized coaching for repeaters with proven results.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/second-chance-neet',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/api/og?title=NEET+Second+Chance&subtitle=90%25+Success+Rate+in+Second+Attempt',
        width: 1200,
        height: 630,
        alt: 'NEET Second Chance - Transform Failure into Success',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Failed NEET 2024? 90% Success Rate in Second Attempt',
    description:
      'Transform your NEET failure into medical college success. Specialized coaching for repeaters with proven results.',
    images: ['/api/og?title=NEET+Second+Chance&subtitle=90%25+Success+Rate+in+Second+Attempt'],
  },
}

export default function SecondChanceNEETLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

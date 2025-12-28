import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Tutor Online | Live Classes by AIIMS Faculty | Cerebrum Academy',
  description:
    'Best NEET Biology tutor online - Dr. Shekhar C Singh, AIIMS Alumnus. Live interactive classes with 98% success rate. Join from anywhere in India.',
  keywords: [
    'neet biology tutor online',
    'online neet biology classes',
    'neet biology online coaching',
    'best online neet biology tutor',
    'neet biology live classes',
    'online biology coaching for neet',
    'neet biology tutor india',
    'online neet biology faculty',
    'neet biology video classes',
    'neet biology online course',
  ],
  openGraph: {
    title: 'NEET Biology Tutor Online | Live Classes by AIIMS Faculty',
    description:
      'Best NEET Biology tutor online - Dr. Shekhar C Singh, AIIMS Alumnus. Live interactive classes.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Tutor Online | AIIMS Faculty',
    description: 'Live online NEET Biology classes by AIIMS Faculty. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-online',
  },
}

export default function NEETBiologyTutorOnlineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

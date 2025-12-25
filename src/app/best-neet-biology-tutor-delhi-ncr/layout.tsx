import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Biology Tutor in Delhi NCR | AIIMS Faculty | Cerebrum Academy',
  description:
    'Find the best NEET Biology tutor in Delhi NCR - Dr. Shekhar C Singh, AIIMS Alumnus. Top NEET coaching in Delhi, Noida, Greater Noida, Ghaziabad, Faridabad.',
  keywords: [
    'neet biology tutor delhi',
    'neet biology tutor noida',
    'neet biology tutor delhi ncr',
    'best neet tutor delhi',
    'neet biology coaching delhi',
    'neet biology faculty greater noida',
    'neet biology teacher ghaziabad',
    'neet coaching faridabad',
    'delhi ncr neet coaching',
    'neet biology classes delhi',
  ],
  openGraph: {
    title: 'Best NEET Biology Tutor in Delhi NCR | AIIMS Faculty',
    description:
      'Find the best NEET Biology tutor in Delhi NCR - Dr. Shekhar C Singh, AIIMS Alumnus. Coaching in Delhi, Noida, Greater Noida.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/best-neet-biology-tutor-delhi-ncr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Biology Tutor in Delhi NCR',
    description: 'Top NEET Biology coaching in Delhi NCR by AIIMS Faculty.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/best-neet-biology-tutor-delhi-ncr',
  },
}

export default function BestNEETBiologyTutorDelhiNCRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

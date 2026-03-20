import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Tuition in South Delhi 2026 | Class 11, 12 | CBSE, NEET | South Extension',
  description:
    'Top biology tuition in South Delhi. CBSE Board + NEET at South Extension center. GK, Defence Colony, Hauz Khas covered. AIIMS faculty. Call 88264-44334.',
  keywords:
    'biology tuition south delhi, biology home tuition south delhi, biology tutor south delhi, CBSE biology tuition south extension, biology tuition near me south delhi, biology coaching south delhi, biology classes GK south delhi, biology tuition defence colony, biology tuition hauz khas, DPS RK Puram biology tuition',
  openGraph: {
    title: 'Best Biology Tuition in South Delhi 2026 | CBSE, NEET',
    description:
      'Top biology tuition in South Delhi. CBSE + NEET at South Extension. GK, Defence Colony, Hauz Khas. AIIMS faculty. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition in South Delhi 2026',
    description:
      'Top biology tuition in South Delhi. CBSE + NEET at South Extension. Call 88264-44334.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi',
  },
}

export default function BiologyTuitionSouthDelhiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

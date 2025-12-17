import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Teacher for NEET 2025 [2500+ Selections] | Cerebrum',
  description:
    'Learn NEET Biology from AIIMS-trained faculty who helped 2500+ students crack NEET. 98% success rate, proven results. Book your FREE demo class today!',
  keywords: [
    'best biology teacher for neet',
    'neet biology teacher',
    'best teacher for neet biology',
    'best teacher for biology neet',
    'bio teacher for neet',
    'best teacher in biology for neet',
    'best teacher of biology for neet',
    'neet biology faculty',
    'top biology teacher neet',
    'best neet biology coaching',
  ],
  openGraph: {
    title: 'Best Biology Teacher for NEET 2025 [2500+ Selections]',
    description: 'Learn from AIIMS-trained faculty with 98% success rate. Book FREE demo today!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/best-biology-teacher-for-neet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Teacher for NEET',
    description: 'AIIMS-trained faculty, 2500+ selections, 98% success rate!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/best-biology-teacher-for-neet',
  },
}

export default function BestBiologyTeacherForNeetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

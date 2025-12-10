import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Teacher for NEET 2025 | Top NEET Biology Faculty',
  description:
    'Looking for the best biology teacher for NEET? AIIMS-trained faculty with 2500+ NEET selections. Expert teaching methodology for NEET Biology. 98% success rate, proven results.',
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
    title: 'Best Biology Teacher for NEET | AIIMS-Trained Faculty',
    description: 'AIIMS-trained faculty with 2500+ NEET selections. Expert NEET Biology teaching.',
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

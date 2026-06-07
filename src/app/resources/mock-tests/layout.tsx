import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Mock Tests | Free + Premium 720-Mark Mocks | Cerebrum',
  description:
    'NEET Biology mock tests at Cerebrum — free chapter-wise MCQ tests + premium full-length 720-mark mocks (NEET-pattern question mix), AIIMS-faculty-set papers, detailed solutions with NCERT page references, performance dashboard with rank-band projection. Class 11, 12, dropper, repeater.',
  keywords: [
    'NEET biology mock test',
    'NEET biology mock test free',
    'NEET mock test 720 marks',
    'NEET biology MCQ test',
    'NEET chapter wise mock test',
    'NEET full length mock test',
    'NEET biology test series',
    'NEET 2026 mock test',
    'best NEET mock test',
    'NEET biology practice test',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/resources/mock-tests' },
  openGraph: {
    title: 'NEET Biology Mock Tests | Cerebrum',
    description:
      'Free chapter-wise + premium 720-mark mocks. AIIMS-faculty-set papers, rank projection.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/resources/mock-tests',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Mock Tests | Cerebrum',
    description: 'Chapter-wise + 720-mark mocks. Rank projection.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

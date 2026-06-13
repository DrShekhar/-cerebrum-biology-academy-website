import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Test Series Schedule 2026 | Weekly + Full-Length Mocks | Cerebrum Biology Academy',
  description:
    'NEET 2026 test series schedule from Cerebrum Biology Academy — weekly chapter-wise biology MCQ tests (Class 11 + 12), monthly full-length 720-mark mocks, NEET-pattern question mix, detailed performance dashboard with rank-band projection. AIIMS-faculty-set papers, free for enrolled students.',
  keywords: [
    'NEET test series 2026',
    'NEET biology test series',
    'NEET mock test schedule',
    'NEET full length mock 2026',
    'weekly NEET test series',
    'AIIMS faculty test series',
    'NEET 720 mock test',
    'NEET test series free',
    'best NEET test series 2026',
    'NEET test series Cerebrum',
    'NEET rank prediction test',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/test-series-schedule' },
  openGraph: {
    title: 'NEET Test Series Schedule 2026 | Cerebrum',
    description: 'Weekly + full-length 720-mark mocks. AIIMS-faculty papers + rank projection.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/test-series-schedule',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Test Series Schedule 2026 | Cerebrum',
    description: 'Weekly + full-length mocks from AIIMS faculty.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

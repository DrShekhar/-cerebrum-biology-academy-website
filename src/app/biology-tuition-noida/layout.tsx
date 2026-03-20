import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Noida 2026 | Class 11, 12 | CBSE, NEET | Home & Online',
  description:
    'Top biology tuition in Noida for Class 11-12. CBSE Board + NEET preparation by AIIMS faculty. Sector 18, 62, 137 covered. Small batches 15 students. \u20B948K/year. Call 88264-44334.',
  keywords:
    'biology tuition noida, biology tuition near me noida, biology home tuition noida, CBSE biology tuition noida, biology tutor noida, class 11 biology tuition noida, class 12 biology tuition noida, biology coaching noida, biology classes noida sector 18, biology tuition noida sector 62, online biology tuition noida',
  openGraph: {
    title: 'Best Biology Tuition in Noida 2026 | Class 11, 12 | CBSE, NEET',
    description:
      'Top biology tuition in Noida. CBSE Board + NEET by AIIMS faculty. Sector 18, 62, 137. Small batches. \u20B948K/year. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-noida',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition in Noida 2026',
    description:
      'Top biology tuition in Noida. CBSE + NEET by AIIMS faculty. Sector 18, 62, 137. Call 88264-44334.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-noida',
  },
}

export default function BiologyTuitionNoidaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

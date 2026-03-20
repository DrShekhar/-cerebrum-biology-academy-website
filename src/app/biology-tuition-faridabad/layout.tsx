import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Faridabad 2026 | Class 11, 12 | CBSE, NEET | Sector 17 Center',
  description:
    'Top biology tuition in Faridabad. CBSE Board + NEET prep by AIIMS faculty. Visit our Sector 17 center. 15 students/batch. \u20B948K/year. Call 88264-44334.',
  keywords:
    'biology tuition faridabad, biology home tuition faridabad, CBSE biology tuition faridabad, biology tutor faridabad, class 11 biology tuition faridabad, class 12 biology tuition faridabad, biology coaching faridabad, biology classes faridabad sector 15, biology tuition near me faridabad, NEET biology tuition faridabad',
  openGraph: {
    title: 'Best Biology Tuition in Faridabad 2026 | CBSE, NEET',
    description:
      'Top biology tuition in Faridabad. CBSE + NEET by AIIMS faculty. Visit Sector 17 center. \u20B948K/year. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-faridabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition in Faridabad 2026',
    description:
      'Top biology tuition in Faridabad. CBSE + NEET. Visit Sector 17 center. Call 88264-44334.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-faridabad',
  },
}

export default function BiologyTuitionFaridabadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

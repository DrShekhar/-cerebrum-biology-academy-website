import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Rohini 2026 | Class 11, 12 | CBSE, NEET | DC Chowk Center',
  description:
    'Top biology tuition in Rohini, Delhi. CBSE Board + NEET by AIIMS Alumnus at DC Chowk center. Sector 3, 7, 9 covered. 15 students/batch. Call 88264-44334.',
  keywords:
    'biology tuition rohini, biology home tuition rohini, CBSE biology tuition rohini, biology tutor rohini, class 11 biology tuition rohini sector 9, biology coaching rohini, biology classes rohini delhi, biology tuition pitampura, biology tuition prashant vihar, biology tuition shalimar bagh',
  openGraph: {
    title: 'Best Biology Tuition in Rohini 2026 | CBSE, NEET',
    description:
      'Top biology tuition in Rohini. CBSE + NEET at DC Chowk center. Sector 3, 7, 9, Pitampura, Shalimar Bagh. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-rohini',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition in Rohini 2026',
    description:
      'Top biology tuition in Rohini. CBSE + NEET at DC Chowk center. Call 88264-44334.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-rohini',
  },
}

export default function BiologyTuitionRohiniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

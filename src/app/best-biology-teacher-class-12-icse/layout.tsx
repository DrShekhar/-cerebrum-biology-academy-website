import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Teacher for Class 12 ICSE 2027 | ISC Board + NEET',
  description:
    'Find the best biology teacher for Class 12 ICSE/ISC. Expert ISC syllabus coverage with NCERT for NEET. Genetics, Biotechnology mastery. AIIMS-trained faculty.',
  keywords: [
    'best biology teacher for class 12 icse',
    'icse class 12 biology teacher',
    'isc biology teacher class 12',
    'class 12 isc biology',
    'icse biology teacher 12th',
    'best isc biology faculty',
    'isc biology coaching',
    'isc board biology',
  ],
  openGraph: {
    title: 'Best Biology Teacher for Class 12 ICSE',
    description: 'Expert ISC Biology teaching. Complete ISC + NCERT for board and NEET success.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-biology-teacher-class-12-icse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Teacher Class 12 ICSE',
    description: 'Expert Class 12 ISC Biology teaching. ISC + NEET dual preparation!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-teacher-class-12-icse',
  },
}

export default function BestBiologyTeacherClass12ICSELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

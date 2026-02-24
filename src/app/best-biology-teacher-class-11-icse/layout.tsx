import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Teacher for Class 11 ICSE 2027 | ISC Biology Expert',
  description:
    'Find the best biology teacher for Class 11 ICSE/ISC. Expert ISC syllabus coverage with NCERT integration for NEET. AIIMS-trained faculty, 98% success rate.',
  keywords: [
    'best biology teacher for class 11 icse',
    'icse class 11 biology teacher',
    'isc biology teacher',
    'class 11 isc biology',
    'icse biology teacher',
    'best icse biology faculty',
    'icse biology coaching',
    'isc class 11 biology',
  ],
  openGraph: {
    title: 'Best Biology Teacher for Class 11 ICSE',
    description: 'Expert ISC Biology teaching. Complete ISC syllabus + NCERT for NEET.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-biology-teacher-class-11-icse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Teacher Class 11 ICSE',
    description: 'Expert Class 11 ICSE Biology teaching. ISC + NEET dual preparation!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-teacher-class-11-icse',
  },
}

export default function BestBiologyTeacherClass11ICSELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

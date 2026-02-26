import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor for Class 9 ICSE | Expert Biology Classes',
  description:
    'Expert biology tutor for Class 9 ICSE students. Build a strong foundation for NEET with AIIMS-trained faculty. Interactive classes, ICSE-aligned curriculum. Free demo!',
  openGraph: {
    title: 'Biology Tutor for Class 9 ICSE | Expert Biology Classes',
    description:
      'Expert biology tutor for Class 9 ICSE students. Build a strong foundation for NEET with AIIMS-trained faculty. Interactive classes, ICSE-aligned curriculum. Free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-class-9-icse',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-class-9-icse',
  },
}

export default function BiologyTutorClass9ICSELayout({ children }: { children: React.ReactNode }) {
  return children
}

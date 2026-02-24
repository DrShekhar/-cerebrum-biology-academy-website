import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Zoology Teacher for NEET | Top Zoology Faculty 2027',
  description:
    'Best zoology teacher for NEET preparation. AIIMS-trained faculty covering Human Physiology (20%), Animal Kingdom (8%), Reproduction (12%). Master 50% of NEET Biology!',
  keywords: [
    'best zoology teacher for neet',
    'best teacher of zoology for neet',
    'best zoology teacher',
    'zoology teacher for neet',
    'neet zoology teacher',
    'top zoology faculty',
    'zoology expert for neet',
    'animal biology neet teacher',
  ],
  openGraph: {
    title: 'Best Zoology Teacher for NEET | 50% Biology Weightage',
    description:
      'Expert zoology faculty for NEET. Human Physiology, Animal Kingdom, Reproduction - complete coverage!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-zoology-teacher-for-neet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Zoology Teacher for NEET',
    description: 'Master 50% of NEET Biology with our expert zoology faculty!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-zoology-teacher-for-neet',
  },
}

export default function BestZoologyTeacherForNeetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Botany Teacher for NEET | Top Botany Faculty 2027',
  description:
    'Best botany teacher for NEET preparation. AIIMS-trained faculty covering Plant Physiology (12%), Ecology (12%), Plant Kingdom (6%). Master 45% of NEET Biology!',
  keywords: [
    'best botany teacher for neet',
    'best teacher for botany for neet',
    'best teacher of botany for neet',
    'best botany teacher',
    'botany teacher for neet',
    'neet botany teacher',
    'top botany faculty',
    'botany expert for neet',
    'plant biology neet teacher',
  ],
  openGraph: {
    title: 'Best Botany Teacher for NEET | 45% Biology Weightage',
    description:
      'Expert botany faculty for NEET. Plant Physiology, Ecology, Plant Kingdom - complete coverage!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-botany-teacher-for-neet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Botany Teacher for NEET',
    description: 'Master 45% of NEET Biology with our expert botany faculty!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-botany-teacher-for-neet',
  },
}

export default function BestBotanyTeacherForNeetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

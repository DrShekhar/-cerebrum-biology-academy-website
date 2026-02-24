import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Tutor for Droppers | Intensive Repeater Course',
  description:
    'Best NEET Biology tutor for droppers - Dr. Shekhar C Singh, AIIMS Alumnus. Intensive 1-year dropper course with personalized attention. Score 650+ in NEET.',
  keywords: [
    'neet biology tutor for droppers',
    'neet dropper course',
    'neet repeater batch',
    'neet biology for droppers',
    'dropper course for neet',
    'neet dropper coaching',
    'best coaching for neet droppers',
    'neet biology repeater',
    'one year neet dropper course',
    'neet second attempt coaching',
  ],
  openGraph: {
    title: 'NEET Biology Tutor for Droppers | Intensive Repeater Course',
    description:
      'Best NEET Biology tutor for droppers - Dr. Shekhar C Singh, AIIMS Alumnus. Intensive 1-year course.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-for-droppers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Tutor for Droppers',
    description: 'Intensive NEET dropper course by AIIMS Faculty. Score 650+ in your next attempt.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-for-droppers',
  },
}

export default function NEETBiologyTutorDroppersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Tuition South Delhi | Classes 9-12 | Cerebrum Biology Academy',
  description:
    'Top biology tuition in South Delhi for Classes 9-12. Expert AIIMS faculty, CBSE/ICSE/State board syllabus, NEET foundation. Near Hauz Khas, GK, Defence Colony. Book free demo!',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi',
  },
  openGraph: {
    title: 'Best Biology Tuition South Delhi | Classes 9-12 | Cerebrum Academy',
    description:
      'Premium biology tuition for Classes 9-12 in South Delhi. Expert AIIMS faculty, all boards covered. Book demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function BiologyTuitionSouthDelhiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

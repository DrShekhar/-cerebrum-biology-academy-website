import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Tuition South Delhi | Classes 9-12',
  description:
    'Top Biology tuition in South Delhi for Classes 9-12 — AIIMS faculty, CBSE/ICSE board coverage, NEET foundation. Near GK, Defence Colony. Book a free demo!',
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition South Delhi | Classes 9-12',
    description: 'Top biology tuition in South Delhi for Classes 9-12.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi',
  },
  openGraph: {
    title: 'Best Biology Tuition South Delhi | Classes 9-12',
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

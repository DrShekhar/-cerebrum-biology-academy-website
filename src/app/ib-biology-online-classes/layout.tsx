import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IB Biology Online Classes | HL & SL Tutoring | IA Support',
  description:
    'Expert IB Biology tutoring for Higher Level (HL) and Standard Level (SL). Get personalized coaching for Internal Assessment, Extended Essay, and exam preparation aligned with Campbell Biology.',
  keywords: [
    'IB Biology tutor',
    'IB Biology online classes',
    'IB Biology HL tutoring',
    'IB Biology SL tutoring',
    'IB Biology IA help',
    'IB Biology Internal Assessment',
    'IB Biology Extended Essay',
    'IB Biology exam prep',
    'International Baccalaureate Biology',
    'IB Diploma Biology',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology Online Classes | HL & SL Tutoring | IA Support',
    description: 'Expert IB Biology tutoring for Higher Level (HL) and Standard Level (SL).',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ib-biology-online-classes/',
  },
  openGraph: {
    title: 'IB Biology Online Classes | HL & SL Tutoring',
    description:
      'Expert IB Biology tutoring for HL and SL students. Personalized coaching for IA, Extended Essay, and exam preparation.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function IBBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

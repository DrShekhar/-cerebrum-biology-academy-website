import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'International Biology Online Classes | A-Level, IB, AP, IGCSE | Cerebrum Academy',
  description:
    'Expert online biology classes for international curricula. A-Level, IB Biology (HL/SL), AP Biology, IGCSE. 12,000+ students from 50+ countries. Global timezone support.',
  keywords: [
    'international biology online classes',
    'A-Level biology tutor',
    'IB biology online classes',
    'AP biology tutoring',
    'IGCSE biology help',
    'Cambridge biology online',
    'international curriculum biology',
    'online biology classes for NRI',
  ],
  openGraph: {
    title: 'International Biology Online Classes | A-Level, IB, AP, IGCSE',
    description:
      'Expert online biology classes for international curricula. 12,000+ students from 50+ countries.',
    url: 'https://cerebrumbiologyacademy.com/online-biology-classes-international',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Biology Online Classes',
    description: 'A-Level, IB, AP, IGCSE Biology tutoring for global students',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-classes-international',
  },
}

export default function InternationalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'International Biology Tutor | IB, AP, IGCSE, A-Level, MCAT, GAMSAT | Cerebrum',
  description:
    'International Biology tutor covering IB Biology, AP Biology, IGCSE Biology, A-Level Biology, MCAT B/B section, GAMSAT Section 3 Biology, USABO, IBO, BBO, CBO, SBO Olympiads. AIIMS-trained Dr. Shekhar C Singh leads 51-school network across 27 cities, 6 continents. Time-zone-aligned online live batches.',
  keywords: [
    'international biology tutor',
    'overseas biology tutor',
    'IB Biology tutor international',
    'AP Biology tutor international',
    'IGCSE Biology tutor international',
    'A-Level Biology tutor international',
    'MCAT Biology tutor',
    'GAMSAT Biology tutor',
    'USABO coach international',
    'IBO coach',
    'NRI biology tutor',
    'expat biology tutor',
    'best biology tutor worldwide',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/international-biology-tutor' },
  openGraph: {
    title: 'International Biology Tutor | IB / AP / IGCSE / A-Level / MCAT | Cerebrum',
    description:
      'Multi-curriculum biology tutoring — 51 schools, 27 cities, 6 continents. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/international-biology-tutor',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'International Biology Tutor | Cerebrum',
    description: 'IB, AP, IGCSE, A-Level, MCAT, GAMSAT, Olympiads.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

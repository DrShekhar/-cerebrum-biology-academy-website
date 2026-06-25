import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IGCSE Biology Tutor | Cambridge 0610 + Edexcel | Cerebrum Biology Academy',
  description:
    'IGCSE Biology tutor — Cambridge IGCSE Biology (0610) and Edexcel IGCSE Biology specialists. AIIMS-trained Dr. Shekhar C Singh and AIIMS-trained faculty deliver paper-pattern coaching, practical skills (Paper 6 / ATP) preparation, mark-scheme calibration. Bridge module for IB Biology / A-Level Biology / NEET transition.',
  keywords: [
    'IGCSE Biology tutor',
    'Cambridge IGCSE Biology 0610 tutor',
    'Edexcel IGCSE Biology tutor',
    'IGCSE Biology online classes',
    'IGCSE Biology Paper 6 practical',
    'IGCSE Biology ATP tutor',
    'IGCSE Biology grade 9 A* tutor',
    'IGCSE to IB Biology bridge',
    'IGCSE to A-Level Biology bridge',
    'IGCSE to NEET bridge',
    'best IGCSE Biology tutor',
    'IGCSE Biology examiner',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/igcse-biology-tutor' },
  openGraph: {
    title: 'IGCSE Biology Tutor | Cambridge 0610 + Edexcel | Cerebrum',
    description: 'Cambridge + Edexcel IGCSE Biology specialists. Bridges into IB / A-Level / NEET.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/igcse-biology-tutor',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'IGCSE Biology Tutor | Cerebrum',
    description: 'Cambridge 0610 + Edexcel + practical skills (ATP).',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

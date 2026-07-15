import type { Metadata } from 'next'
import { IBLevelTutorPage } from '@/components/seo/IBLevelTutorPage'
import { IB_LEVELS } from '@/data/ib-biology/levels'

const config = IB_LEVELS.SL

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  keywords: config.keywords.join(', '),
  alternates: { canonical: `https://cerebrumbiologyacademy.com${config.path}` },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    type: 'website',
    locale: 'en_IN',
    url: `https://cerebrumbiologyacademy.com${config.path}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology SL Tutor | Cerebrum Biology Academy',
    description:
      'Standard Level IB Biology tutoring — 2025 syllabus, core themes, Paper 1 & 2, IA.',
  },
}

export default function Page() {
  return <IBLevelTutorPage config={config} />
}

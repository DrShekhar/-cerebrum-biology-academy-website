import type { Metadata } from 'next'
import { IBLevelTutorPage } from '@/components/seo/IBLevelTutorPage'
import { IB_LEVELS } from '@/data/ib-biology/levels'

const config = IB_LEVELS.HL

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
    title: 'IB Biology HL Tutor | Cerebrum Biology Academy',
    description: 'Higher Level IB Biology tutoring — 2025 syllabus, AHL depth, Paper 2, IA.',
  },
}

export default function Page() {
  return <IBLevelTutorPage config={config} />
}

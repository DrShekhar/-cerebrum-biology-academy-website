import { Metadata } from 'next'
import { TopAPBiologyUSAContent } from './Content'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'

export const metadata: Metadata = {
  title: 'Top 8 AP Biology Coaching / Tutors USA 2026 | Honest Ranking',
  description:
    'Honest 2026 ranking of the top AP Biology coaching and tutors in USA. Cerebrum Biology Academy #1 with documented score-5 outcomes across 10+ US metros, AAMC-to-NCERT crosswalk, best per-section pricing.',
  keywords: [
    'top ap biology tutor usa',
    'best ap biology coaching usa',
    'top ap biology tutors',
    'best ap biology tutor online',
    'ap biology coaching usa',
    'best ap bio tutor 2026',
    'ap biology score 5 prep',
  ],
  openGraph: {
    locale: 'en_US',
    title: 'Top 8 AP Biology Coaching / Tutors USA 2026',
    description:
      'Cerebrum Biology Academy ranked #1 in USA for AP Biology — documented score-5 outcomes, best per-section pricing.',
    url: 'https://cerebrumbiologyacademy.com/top-ap-biology-coaching-usa',
    type: 'article',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-ap-biology-coaching-usa',
  },
}

export default function TopAPBiologyCoachingUSAPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-ap-biology-coaching-usa"
        pageName="Top AP Biology Coaching USA"
        parentHub={{
          name: 'Best AP Biology Tutor USA',
          url: 'https://cerebrumbiologyacademy.com/best-ap-biology-tutor-usa',
        }}
        personKnowsAbout={[
          'AP Biology',
          'AP Biology CED',
          'AAMC to NCERT crosswalk',
          'AP Biology Score 5',
          'AP Biology FRQs',
        ]}
      />
      <TopAPBiologyUSAContent />
    </>
  )
}

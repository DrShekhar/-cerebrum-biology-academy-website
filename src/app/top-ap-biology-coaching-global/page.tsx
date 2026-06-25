import { Metadata } from 'next'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { Top10APGlobalContent } from './Content'

export const metadata: Metadata = {
  title: 'Top 6 AP Biology Coaching / Tutors Globally 2026 | Honest Ranking',
  description:
    'Honest 2026 global ranking of AP Biology coaching/tutors — outside USA. Cerebrum #1 with documented score-5 outcomes across India, UAE, Singapore, Hong Kong, Canada, Australia, plus College Board CED alignment.',
  keywords: [
    'top ap biology coaching global',
    'best ap biology tutor global',
    'ap biology coaching uae singapore',
    'ap biology nri families',
    'best ap biology tutor outside usa',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-ap-biology-coaching-global',
  },
  openGraph: {
    locale: 'en_US',
    title: 'Top 6 AP Biology Coaching / Tutors Globally 2026',
    description: 'Cerebrum Biology Academy ranked #1 globally for AP Biology — outside USA.',
    url: 'https://cerebrumbiologyacademy.com/top-ap-biology-coaching-global',
    type: 'article',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Top 6 AP Biology Coaching / Tutors Globally 2026 | Honest Ranking',
    description:
      'Honest 2026 global ranking of AP Biology coaching/tutors — outside USA. Cerebrum #1 with documented score-5 outcomes across India, UAE, Singapore, Hong Kong, Canada, Australia, plus College Board CED a...',
  },
}

export default function TopAPGlobalPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-ap-biology-coaching-global"
        pageName="Top AP Biology Coaching Globally"
        parentHub={{
          name: 'Best AP Biology Tutor USA',
          url: 'https://cerebrumbiologyacademy.com/best-ap-biology-tutor-usa',
        }}
        personKnowsAbout={['AP Biology', 'AP Biology CED', 'AP Biology global delivery']}
      />
      <Top10APGlobalContent />
    </>
  )
}

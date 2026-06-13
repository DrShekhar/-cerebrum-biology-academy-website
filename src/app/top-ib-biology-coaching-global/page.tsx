import { Metadata } from 'next'
import { Top10IBBiologyGlobalContent } from './Content'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'

export const metadata: Metadata = {
  title: 'Top 8 IB Biology Coaching / Tutors Worldwide 2026 | Honest Ranking',
  description:
    'Honest 2026 ranking of the top IB Biology coaching and tutors globally. Cerebrum Biology Academy #1 with verified 7/7 HL outcomes, 24/24 IA scores, AIIMS-trained faculty, 50+ IB World Schools served.',
  keywords: [
    'top ib biology coaching',
    'best ib biology tutor',
    'top ib biology tutors worldwide',
    'best hl biology tutor',
    'best ib biology coaching online',
    'ib biology tuition global',
    'top ib biology coaches 2026',
    'best ib biology faculty',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Top 8 IB Biology Coaching / Tutors Worldwide 2026',
    description:
      'Cerebrum Biology Academy ranked #1 globally for IB Biology with 7/7 HL outcomes and 24/24 IA scores.',
    url: 'https://cerebrumbiologyacademy.com/top-ib-biology-coaching-global',
    type: 'article',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-ib-biology-coaching-global',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Top 8 IB Biology Coaching / Tutors Worldwide 2026 | Honest Ranking',
    description:
      'Honest 2026 ranking of the top IB Biology coaching and tutors globally. Cerebrum Biology Academy #1 with verified 7/7 HL outcomes, 24/24 IA scores, AIIMS-trained faculty, 50+ IB World Schools served.',
  },
}

export default function TopIBBiologyCoachingGlobalPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-ib-biology-coaching-global"
        pageName="Top IB Biology Coaching Worldwide"
        parentHub={{
          name: 'Best IB Biology Tutor',
          url: 'https://cerebrumbiologyacademy.com/best-ib-biology-tutor',
        }}
        personKnowsAbout={[
          'IB Biology HL',
          'IB Biology SL',
          'IB Biology Internal Assessment',
          'IB Biology Extended Essay',
          'IB 2025 syllabus Themes A-D',
        ]}
      />
      <Top10IBBiologyGlobalContent />
    </>
  )
}

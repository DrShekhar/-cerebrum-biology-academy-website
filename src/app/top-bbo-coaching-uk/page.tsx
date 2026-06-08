import { Metadata } from 'next'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { TopBBOContent } from './Content'

export const metadata: Metadata = {
  title: 'Top 4 BBO Coaching in UK 2026 | British Biology Olympiad Honest Ranking',
  description:
    'Honest 2026 ranking of BBO (British Biology Olympiad) coaching in UK. Cerebrum #1 with documented BBO Gold/Silver outcomes and direct IBO UK national-team funnel.',
  keywords: [
    'top bbo coaching uk',
    'best bbo coach',
    'british biology olympiad tutor',
    'bbo gold prep',
    'best a-level biology olympiad coach',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-bbo-coaching-uk',
  },
  openGraph: {
    locale: 'en_GB',
    title: 'Top 4 BBO Coaching in UK 2026',
    description:
      'Cerebrum Biology Academy ranked #1 in UK for BBO with documented Gold/Silver outcomes.',
    url: 'https://cerebrumbiologyacademy.com/top-bbo-coaching-uk',
    type: 'article',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Top 4 BBO Coaching in UK 2026 | British Biology Olympiad Honest Ranking',
    description: 'Honest 2026 ranking of BBO (British Biology Olympiad) coaching in UK. Cerebrum #1 with documented BBO Gold/Silver outcomes and direct IBO UK national-team funnel.',
  },
}

export default function TopBBOPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-bbo-coaching-uk"
        pageName="Top BBO Coaching UK"
        parentHub={{
          name: 'Best BBO Coach',
          url: 'https://cerebrumbiologyacademy.com/best-bbo-coach',
        }}
        personKnowsAbout={['BBO', 'British Biology Olympiad', 'IBO UK team']}
      />
      <TopBBOContent />
    </>
  )
}

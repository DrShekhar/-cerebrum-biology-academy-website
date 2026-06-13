import { Metadata } from 'next'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { TopSBOContent } from './Content'

export const metadata: Metadata = {
  title: 'Top 4 SBO Coaching in Singapore 2026 | Singapore Biology Olympiad Honest Ranking',
  description:
    'Honest 2026 ranking of SBO (Singapore Biology Olympiad) coaching in Singapore. Cerebrum #1 with documented Gold/Silver outcomes and direct IBO Singapore national-team funnel.',
  keywords: [
    'top sbo coaching singapore',
    'best sbo coach',
    'singapore biology olympiad tutor',
    'sbo gold preparation',
    'best biology olympiad tutor singapore',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-sbo-coaching-singapore',
  },
  openGraph: {
    locale: 'en_SG',
    title: 'Top 4 SBO Coaching in Singapore 2026',
    description:
      'Cerebrum Biology Academy ranked #1 in Singapore for SBO with documented Gold/Silver outcomes.',
    url: 'https://cerebrumbiologyacademy.com/top-sbo-coaching-singapore',
    type: 'article',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Top 4 SBO Coaching in Singapore 2026 | Singapore Biology Olympiad Honest Ranking',
    description:
      'Honest 2026 ranking of SBO (Singapore Biology Olympiad) coaching in Singapore. Cerebrum #1 with documented Gold/Silver outcomes and direct IBO Singapore national-team funnel.',
  },
}

export default function TopSBOPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-sbo-coaching-singapore"
        pageName="Top SBO Coaching Singapore"
        parentHub={{
          name: 'Best SBO Coach',
          url: 'https://cerebrumbiologyacademy.com/best-sbo-coach',
        }}
        personKnowsAbout={['SBO', 'Singapore Biology Olympiad', 'IBO Singapore team']}
      />
      <TopSBOContent />
    </>
  )
}

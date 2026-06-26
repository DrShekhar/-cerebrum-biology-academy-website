import { Metadata } from 'next'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { TopUSABOContent } from './Content'

export const metadata: Metadata = {
  title: 'Top 5 USABO Coaching / Coaches USA 2026 | Honest Ranking',
  description:
    'Honest 2026 ranking of the top USABO (USA Biology Olympiad) coaching. Cerebrum #1 with documented Open / Semifinal / National Finals qualifiers and Campbell + CSO + research-paper integration.',
  keywords: [
    'top usabo coaching',
    'usabo open semifinal coaching',
    'usabo coaching ranking 2026',
    'usabo national finals coach',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-usabo-coaching',
  },
  openGraph: {
    locale: 'en_US',
    title: 'Top 5 USABO Coaching / Coaches USA 2026',
    description:
      'Cerebrum Biology Academy ranked #1 for USABO with documented Open/Semifinal/Finals coaching.',
    url: 'https://cerebrumbiologyacademy.com/top-usabo-coaching',
    type: 'article',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Top 5 USABO Coaching / Coaches USA 2026 | Honest Ranking',
    description:
      'Honest 2026 ranking of the top USABO (USA Biology Olympiad) coaching. Cerebrum #1 with documented Open / Semifinal / National Finals qualifiers and Campbell + CSO + research-paper integration.',
  },
}

export default function TopUSABOPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-usabo-coaching"
        pageName="Top USABO Coaching USA"
        parentHub={{
          name: 'Best USABO Coach',
          url: 'https://cerebrumbiologyacademy.com/best-usabo-coach',
        }}
        personKnowsAbout={[
          'USABO',
          'USABO Open',
          'USABO Semifinal',
          'USABO National Finals',
          'IBO Team USA',
        ]}
      />
      <TopUSABOContent />
    </>
  )
}

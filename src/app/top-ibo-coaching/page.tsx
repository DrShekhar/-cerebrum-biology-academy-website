import { Metadata } from 'next'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { TopIBOContent } from './Content'

export const metadata: Metadata = {
  title: 'Top 5 IBO Coaching Globally 2026 | International Biology Olympiad Honest Ranking',
  description:
    'Honest 2026 global ranking of IBO (International Biology Olympiad) coaching. Cerebrum #1 across India / USA / UK / Singapore / Canada national-team selection funnels.',
  keywords: [
    'top ibo coaching',
    'best ibo preparation',
    'international biology olympiad coach',
    'best ibo coaching global',
    'ibo national team selection coaching',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-ibo-coaching',
  },
  openGraph: {
    locale: 'en_IN',
    title: 'Top 5 IBO Coaching Globally 2026',
    description:
      'Cerebrum Biology Academy ranked #1 globally for IBO preparation across all major national-team funnels.',
    url: 'https://cerebrumbiologyacademy.com/top-ibo-coaching',
    type: 'article',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function TopIBOPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-ibo-coaching"
        pageName="Top IBO Coaching Globally"
        parentHub={{
          name: 'Best IBO Preparation',
          url: 'https://cerebrumbiologyacademy.com/best-ibo-preparation',
        }}
        personKnowsAbout={[
          'International Biology Olympiad',
          'IBO Theory',
          'IBO Practical',
          'IBO India team',
          'IBO USA team',
          'IBO UK team',
          'IBO Singapore team',
          'IBO Canada team',
        ]}
      />
      <TopIBOContent />
    </>
  )
}

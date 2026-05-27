import { Metadata } from 'next'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { TopCBOContent } from './Content'

export const metadata: Metadata = {
  title: 'Top 4 CBO Coaching in Canada 2026 | Canadian Biology Olympiad Honest Ranking',
  description:
    'Honest 2026 ranking of CBO (Canadian Biology Olympiad) coaching in Canada. Cerebrum #1 with documented CBO Stage qualifiers and direct IBO national-team funnel coaching.',
  keywords: [
    'top cbo coaching canada',
    'best cbo coach',
    'canadian biology olympiad tutor',
    'cbo toronto vancouver',
    'best cbo prep',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-cbo-coaching-canada',
  },
  openGraph: {
    locale: 'en_CA',
    title: 'Top 4 CBO Coaching in Canada 2026',
    description:
      'Cerebrum Biology Academy ranked #1 in Canada for CBO with documented Stage qualifiers.',
    url: 'https://cerebrumbiologyacademy.com/top-cbo-coaching-canada',
    type: 'article',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function TopCBOPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-cbo-coaching-canada"
        pageName="Top CBO Coaching Canada"
        parentHub={{
          name: 'Best CBO Coach',
          url: 'https://cerebrumbiologyacademy.com/best-cbo-coach',
        }}
        personKnowsAbout={['CBO', 'Canadian Biology Olympiad', 'IBO Canada team']}
      />
      <TopCBOContent />
    </>
  )
}

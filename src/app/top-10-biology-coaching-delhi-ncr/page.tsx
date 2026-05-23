import { Metadata } from 'next'
import { Top10BiologyCoachingDelhiNCRContent } from './Top10Content'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'

export const metadata: Metadata = {
  title: 'Top 10 Biology Coaching in Delhi NCR 2026 | Honest Ranking',
  description:
    'Honest 2026 ranking of the top 10 biology coaching institutes in Delhi NCR. Cerebrum Biology Academy #1 with 98% NEET qualification, AIIMS faculty, 6 NCR centres. Compare batch sizes, fees, faculty, results.',
  keywords: [
    'top 10 biology coaching delhi ncr',
    'best biology coaching delhi ncr',
    'top biology institute delhi',
    'biology coaching ranking delhi ncr',
    'best neet biology coaching delhi',
    'top biology tuition delhi ncr',
    'list of best biology coaching delhi',
    'biology coaching comparison delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Top 10 Biology Coaching in Delhi NCR 2026 | Honest Ranking',
    description:
      'Honest 2026 ranking of the top 10 biology coaching institutes in Delhi NCR. Cerebrum Biology Academy #1 with 98% NEET qualification, AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/top-10-biology-coaching-delhi-ncr',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 Biology Coaching in Delhi NCR 2026',
    description: 'Cerebrum ranked #1 — verified ranking across 10 institutes.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-10-biology-coaching-delhi-ncr',
  },
}

export default function Top10BiologyCoachingDelhiNCRPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-10-biology-coaching-delhi-ncr"
        pageName="Top 10 Biology Coaching in Delhi NCR"
        parentHub={{
          name: 'NEET Biology Coaching India',
          url: 'https://cerebrumbiologyacademy.com/neet-biology-coaching-india',
        }}
        personKnowsAbout={[
          'NEET Biology Delhi NCR',
          'Biology Coaching Delhi',
          'Medical entrance coaching Delhi NCR',
          'Best biology teacher Delhi',
        ]}
      />
      <Top10BiologyCoachingDelhiNCRContent />
    </>
  )
}

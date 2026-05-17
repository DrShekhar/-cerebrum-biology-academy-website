import { Metadata } from 'next'
import { Top10NEETCoachingContent } from './Top10Content'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'

export const metadata: Metadata = {
  title: 'Top 10 NEET Coaching in Gurugram 2026 | Ranking & Comparison',
  description:
    'Honest ranking of top 10 NEET coaching institutes in Gurugram (Gurgaon) 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate. 88264-44334!',
  keywords: [
    'top 10 neet coaching gurugram',
    'best 10 neet coaching gurgaon',
    'neet coaching ranking gurugram',
    'neet coaching list gurugram',
    'top neet institutes gurugram',
    'neet coaching comparison gurugram',
    'best neet coaching gurugram 2026',
    'neet biology coaching gurugram',
  ],
  openGraph: {
    title: 'Top 10 NEET Coaching in Gurugram 2026 | Ranking & Comparison',
    description:
      'Honest ranking of top 10 NEET coaching institutes in Gurugram 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-gurugram',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 NEET Coaching in Gurugram 2026',
    description: 'Comprehensive ranking of best NEET coaching institutes in Gurugram.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-gurugram',
  },
}

export default function Top10NEETCoachingGurugramPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/top-10-neet-coaching-gurugram"
        pageName="Top 10 NEET Coaching in Gurugram"
        parentHub={{ name: 'NEET Biology Coaching India', url: 'https://cerebrumbiologyacademy.com/neet-biology-coaching-india' }}
        personKnowsAbout={['NEET Gurugram', 'NEET Biology Gurugram', 'Medical entrance coaching Gurugram']}
      />
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="top-10-neet-coaching-gurugram" />
      <Top10NEETCoachingContent />
    </>
  )
}

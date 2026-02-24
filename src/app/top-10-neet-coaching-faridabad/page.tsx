import { Metadata } from 'next'
import { Top10NEETCoachingContent } from './Top10Content'

export const metadata: Metadata = {
  title: 'Top 10 NEET Coaching in Faridabad 2026 | Ranking & Comparison',
  description:
    'Honest ranking of top 10 NEET coaching institutes in Faridabad 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate. 88264-44334!',
  keywords: [
    'top 10 neet coaching faridabad',
    'best 10 neet coaching faridabad',
    'neet coaching ranking faridabad',
    'neet coaching list faridabad',
    'top neet institutes faridabad',
    'neet coaching comparison faridabad',
    'best neet coaching faridabad 2026',
    'neet biology coaching faridabad',
  ],
  openGraph: {
    title: 'Top 10 NEET Coaching in Faridabad 2026 | Ranking & Comparison',
    description:
      'Honest ranking of top 10 NEET coaching institutes in Faridabad 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-faridabad',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 NEET Coaching in Faridabad 2026',
    description: 'Comprehensive ranking of best NEET coaching institutes in Faridabad.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-faridabad',
  },
}

export default function Top10NEETCoachingFaridabadPage() {
  return <Top10NEETCoachingContent />
}

import { Metadata } from 'next'
import { Top10NEETCoachingContent } from './Top10Content'

export const metadata: Metadata = {
  title: 'Top 10 NEET Coaching in Gurugram 2026 | Ranking & Comparison | Cerebrum',
  description:
    'Honest ranking of top 10 NEET coaching institutes in Gurugram 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate. 88264-44334!',
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
  return <Top10NEETCoachingContent />
}

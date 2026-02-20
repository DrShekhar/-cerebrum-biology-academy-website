import { Metadata } from 'next'
import { Top10NEETCoachingNoidaContent } from './Top10NoidaContent'

export const metadata: Metadata = {
  title: 'Top 10 NEET Coaching in Noida 2026 | Ranking & Comparison | Cerebrum',
  description:
    'Honest ranking of top 10 NEET coaching institutes in Noida 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate. 99536-43938!',
  keywords: [
    'top 10 neet coaching noida',
    'best 10 neet coaching noida',
    'neet coaching ranking noida',
    'neet coaching list noida',
    'top neet institutes noida',
    'neet coaching comparison noida',
    'best neet coaching noida 2026',
    'neet biology coaching noida',
  ],
  openGraph: {
    title: 'Top 10 NEET Coaching in Noida 2026 | Ranking & Comparison',
    description:
      'Honest ranking of top 10 NEET coaching institutes in Noida 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-noida',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 NEET Coaching in Noida 2026',
    description: 'Comprehensive ranking of best NEET coaching institutes in Noida.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-noida',
  },
}

export default function Top10NEETCoachingNoidaPage() {
  return <Top10NEETCoachingNoidaContent />
}

import { Metadata } from 'next'
import { Top10NEETCoachingGhaziabadContent } from './Top10GhaziabadContent'

export const metadata: Metadata = {
  title: 'Top 10 NEET Coaching in Ghaziabad 2026 | Ranking & Comparison',
  description:
    'Honest ranking of top 10 NEET coaching institutes in Ghaziabad 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate. 99536-43938!',
  keywords: [
    'top 10 neet coaching ghaziabad',
    'best 10 neet coaching ghaziabad',
    'neet coaching ranking ghaziabad',
    'neet coaching list ghaziabad',
    'top neet institutes ghaziabad',
    'neet coaching comparison ghaziabad',
    'best neet coaching ghaziabad 2026',
    'neet biology coaching ghaziabad',
  ],
  openGraph: {
    title: 'Top 10 NEET Coaching in Ghaziabad 2026 | Ranking & Comparison',
    description:
      'Honest ranking of top 10 NEET coaching institutes in Ghaziabad 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-ghaziabad',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 NEET Coaching in Ghaziabad 2026',
    description: 'Comprehensive ranking of best NEET coaching institutes in Ghaziabad.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-ghaziabad',
  },
}

export default function Top10NEETCoachingGhaziabadPage() {
  return <Top10NEETCoachingGhaziabadContent />
}

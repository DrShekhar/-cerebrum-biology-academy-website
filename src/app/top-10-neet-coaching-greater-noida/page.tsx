import { Metadata } from 'next'
import { Top10GreaterNoidaContent } from './Top10GreaterNoidaContent'

export const metadata: Metadata = {
  title: 'Top 10 NEET Coaching in Greater Noida 2026 | Ranking & Comparison | Cerebrum',
  description:
    'Honest ranking of top 10 NEET coaching institutes in Greater Noida 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate. 99536-43938!',
  keywords: [
    'top 10 neet coaching greater noida',
    'best 10 neet coaching greater noida',
    'neet coaching ranking greater noida',
    'neet coaching list greater noida',
    'top neet institutes greater noida',
    'neet coaching comparison greater noida',
    'best neet coaching greater noida 2026',
    'neet biology coaching greater noida',
  ],
  openGraph: {
    title: 'Top 10 NEET Coaching in Greater Noida 2026 | Ranking & Comparison',
    description:
      'Honest ranking of top 10 NEET coaching institutes in Greater Noida 2026. Based on results, faculty, fees, reviews. Cerebrum #1 with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-greater-noida',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 NEET Coaching in Greater Noida 2026',
    description: 'Comprehensive ranking of best NEET coaching institutes in Greater Noida.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-greater-noida',
  },
}

export default function Top10NEETCoachingGreaterNoidaPage() {
  return <Top10GreaterNoidaContent />
}

import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('how-to-score-360-neet-biology')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'how to score 360 in neet biology',
    'neet biology topper strategy',
    'neet biology tips',
    'score full marks neet biology',
    'neet biology preparation strategy',
    'best way to study neet biology',
    'neet biology high score tips',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/how-to-score-360-neet-biology',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/how-to-score-360-neet-biology',
  },
}

export default function HowToScore360NEETBiologyPage() {
  return <IntentLandingPage data={pageData} />
}

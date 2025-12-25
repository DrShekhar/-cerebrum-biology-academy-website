import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('is-coaching-necessary-for-neet')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'is coaching necessary for neet',
    'neet without coaching',
    'self study for neet',
    'can i crack neet without coaching',
    'neet preparation self study',
    'coaching vs self study neet',
    'do i need coaching for neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/is-coaching-necessary-for-neet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/is-coaching-necessary-for-neet',
  },
}

export default function IsCoachingNecessaryForNEETPage() {
  return <IntentLandingPage data={pageData} />
}

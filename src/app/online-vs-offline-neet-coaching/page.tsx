import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('online-vs-offline-neet-coaching')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'online vs offline neet coaching',
    'which is better online or offline coaching',
    'online neet coaching',
    'offline neet coaching',
    'hybrid neet coaching',
    'online coaching effective for neet',
    'best mode for neet preparation',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/online-vs-offline-neet-coaching',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-vs-offline-neet-coaching',
  },
}

export default function OnlineVsOfflineNEETCoachingPage() {
  return <IntentLandingPage data={pageData} />
}
